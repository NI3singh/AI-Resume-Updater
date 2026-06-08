"""Authentication routes: signup, login, logout, current-user."""

import uuid
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Cookie, Depends, HTTPException, Response, status
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db
from ..deps import get_current_user
from ..models import AuthSession, Resume, User, UserProfile
from ..schemas import LoginIn, SignupIn, UserOut
from ..security import (
    COOKIE_NAME,
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from ..template_data import initial_resume_data, initial_section_config

router = APIRouter(prefix="/auth", tags=["auth"])


def _utcnow_naive() -> datetime:
    # Naive UTC to match the TIMESTAMP columns.
    return datetime.now(timezone.utc).replace(tzinfo=None)


def _start_session_and_set_cookie(db: Session, response: Response, user_id) -> None:
    """Create a server-side session row and set the JWT cookie carrying its id."""
    session = AuthSession(
        user_id=user_id,
        expires_at=_utcnow_naive() + timedelta(hours=settings.access_token_ttl_hours),
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    response.set_cookie(
        key=COOKIE_NAME,
        value=create_access_token(str(user_id), str(session.id)),
        max_age=settings.access_token_ttl_hours * 3600,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        path="/",
    )


def _user_out(user: User) -> UserOut:
    return UserOut(
        id=user.id,
        email=user.email,
        display_name=user.profile.display_name if user.profile else None,
    )


@router.post("/signup", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupIn, response: Response, db: Session = Depends(get_db)) -> UserOut:
    if db.scalar(select(User).where(User.email == payload.email)):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists.",
        )

    user = User(email=payload.email, password_hash=hash_password(payload.password))
    user.profile = UserProfile(display_name=payload.display_name or payload.email.split("@")[0])
    # Seed the master resume from the neutral template — never another user's data.
    user.resumes.append(
        Resume(
            name="Master Resume",
            is_master=True,
            resume_data=initial_resume_data(),
            section_config=initial_section_config(),
        )
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    _start_session_and_set_cookie(db, response, user.id)
    return _user_out(user)


@router.post("/login", response_model=UserOut)
def login(payload: LoginIn, response: Response, db: Session = Depends(get_db)) -> UserOut:
    user = db.scalar(select(User).where(User.email == payload.email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
        )

    # Opportunistically purge this user's expired sessions.
    db.execute(
        delete(AuthSession).where(
            AuthSession.user_id == user.id,
            AuthSession.expires_at < _utcnow_naive(),
        )
    )
    db.commit()

    _start_session_and_set_cookie(db, response, user.id)
    return _user_out(user)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    response: Response,
    access_token: str | None = Cookie(default=None, alias=COOKIE_NAME),
    db: Session = Depends(get_db),
) -> None:
    # Delete the session row so the token is revoked server-side, then clear cookie.
    if access_token:
        payload = decode_access_token(access_token)
        sid = payload.get("sid") if payload else None
        if sid:
            try:
                session_uuid = uuid.UUID(sid)
            except ValueError:
                session_uuid = None
            if session_uuid is not None:
                db.execute(delete(AuthSession).where(AuthSession.id == session_uuid))
                db.commit()
    response.delete_cookie(key=COOKIE_NAME, path="/")


@router.get("/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)) -> UserOut:
    return _user_out(current_user)
