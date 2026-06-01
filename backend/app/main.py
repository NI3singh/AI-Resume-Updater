from datetime import datetime, timezone
from uuid import UUID

from fastapi import Cookie, Depends, FastAPI, Header, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.config import settings
from app.database import get_db, init_db
from app.deps import REFRESH_COOKIE, clear_auth_cookies, create_session, current_user
from app.models import AuthSession, MasterResume, ResumeVersion, User, UserProfile
from app.schemas import (
    AuthRequest,
    AuthResponse,
    ForkRequest,
    RenameRequest,
    ResumeRecordOut,
    ResumesResponse,
    ResumeUpdateRequest,
    UserOut,
)
from app.security import hash_password, hash_token, verify_password
from app.template_data import initial_resume_data, initial_section_config


app = FastAPI(title="ResumeTeX Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


def user_out(user: User) -> UserOut:
    return UserOut(
        id=user.id,
        email=user.email,
        display_name=user.profile.display_name if user.profile else None,
    )


def master_out(master: MasterResume) -> ResumeRecordOut:
    return ResumeRecordOut(
        id=master.id,
        user_id=master.user_id,
        name=master.name,
        is_master=True,
        resume_data=master.resume_data,
        section_config=master.section_config,
        created_at=master.created_at,
        updated_at=master.updated_at,
    )


def version_out(version: ResumeVersion) -> ResumeRecordOut:
    return ResumeRecordOut(
        id=version.id,
        user_id=version.user_id,
        name=version.name,
        is_master=False,
        resume_data=version.resume_data,
        section_config=version.section_config,
        created_at=version.created_at,
        updated_at=version.updated_at,
    )


def get_master(db: Session, user_id: UUID) -> MasterResume:
    master = db.scalar(select(MasterResume).where(MasterResume.user_id == user_id))
    if not master:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Master resume not found")
    return master


def get_record(db: Session, user_id: UUID, record_id: UUID) -> tuple[MasterResume | ResumeVersion, bool]:
    master = db.scalar(
        select(MasterResume)
        .where(MasterResume.user_id == user_id)
        .where(MasterResume.id == record_id)
    )
    if master:
        return master, True

    version = db.scalar(
        select(ResumeVersion)
        .where(ResumeVersion.user_id == user_id)
        .where(ResumeVersion.id == record_id)
    )
    if version:
        return version, False

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/auth/signup", response_model=AuthResponse)
def signup(
    payload: AuthRequest,
    response: Response,
    db: Session = Depends(get_db),
    user_agent: str | None = Header(default=None),
) -> AuthResponse:
    email = payload.email.lower().strip()
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with this email already exists.")

    user = User(email=email, password_hash=hash_password(payload.password))
    profile = UserProfile(user=user, display_name=email.split("@")[0])
    master = MasterResume(
        user=user,
        name="Master Resume",
        resume_data=initial_resume_data(),
        section_config=initial_section_config(),
    )
    db.add_all([user, profile, master])
    db.flush()
    create_session(db, user, response, user_agent)
    db.commit()
    db.refresh(user)
    return AuthResponse(user=user_out(user))


@app.post("/auth/login", response_model=AuthResponse)
def login(
    payload: AuthRequest,
    response: Response,
    db: Session = Depends(get_db),
    user_agent: str | None = Header(default=None),
) -> AuthResponse:
    email = payload.email.lower().strip()
    user = db.scalar(select(User).options(joinedload(User.profile)).where(User.email == email))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    create_session(db, user, response, user_agent)
    db.commit()
    return AuthResponse(user=user_out(user))


@app.post("/auth/logout")
def logout(
    response: Response,
    db: Session = Depends(get_db),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
) -> dict[str, bool]:
    if refresh_token:
        token_hash = hash_token(refresh_token)
        session = db.scalar(select(AuthSession).where(AuthSession.refresh_token_hash == token_hash))
        if session:
            session.revoked_at = datetime.now(timezone.utc)
            db.commit()
    clear_auth_cookies(response)
    return {"ok": True}


@app.get("/auth/me", response_model=AuthResponse)
def me(user: User = Depends(current_user)) -> AuthResponse:
    return AuthResponse(user=user_out(user))


@app.get("/resumes", response_model=ResumesResponse)
def list_resumes(
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> ResumesResponse:
    master = get_master(db, user.id)
    versions = db.scalars(
        select(ResumeVersion)
        .where(ResumeVersion.user_id == user.id)
        .order_by(ResumeVersion.created_at.asc())
    ).all()
    return ResumesResponse(resumes=[master_out(master), *[version_out(version) for version in versions]])


@app.patch("/resumes/{record_id}", response_model=ResumeRecordOut)
def update_resume(
    record_id: UUID,
    payload: ResumeUpdateRequest,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> ResumeRecordOut:
    record, is_master = get_record(db, user.id, record_id)
    record.resume_data = payload.resume_data
    record.section_config = payload.section_config
    db.commit()
    db.refresh(record)
    return master_out(record) if is_master else version_out(record)


@app.patch("/resumes/{record_id}/name", response_model=ResumeRecordOut)
def rename_resume(
    record_id: UUID,
    payload: RenameRequest,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> ResumeRecordOut:
    record, is_master = get_record(db, user.id, record_id)
    record.name = payload.name.strip()
    db.commit()
    db.refresh(record)
    return master_out(record) if is_master else version_out(record)


@app.post("/resumes/fork", response_model=ResumeRecordOut)
def fork_resume(
    payload: ForkRequest,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> ResumeRecordOut:
    master = get_master(db, user.id)
    version = ResumeVersion(
        user_id=user.id,
        master_resume_id=master.id,
        name=payload.name.strip(),
        resume_data=master.resume_data,
        section_config=master.section_config,
    )
    db.add(version)
    db.commit()
    db.refresh(version)
    return version_out(version)


@app.post("/resumes/{record_id}/restore-from-master", response_model=ResumeRecordOut)
def restore_version_from_master(
    record_id: UUID,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> ResumeRecordOut:
    master = get_master(db, user.id)
    version = db.scalar(
        select(ResumeVersion)
        .where(ResumeVersion.user_id == user.id)
        .where(ResumeVersion.id == record_id)
    )
    if not version:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Version not found")

    version.resume_data = master.resume_data
    version.section_config = master.section_config
    db.commit()
    db.refresh(version)
    return version_out(version)


@app.delete("/resumes/{record_id}")
def delete_resume(
    record_id: UUID,
    user: User = Depends(current_user),
    db: Session = Depends(get_db),
) -> dict[str, bool]:
    version = db.scalar(
        select(ResumeVersion)
        .where(ResumeVersion.user_id == user.id)
        .where(ResumeVersion.id == record_id)
    )
    if not version:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Version not found")

    db.delete(version)
    db.commit()
    return {"ok": True}
