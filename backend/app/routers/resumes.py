"""Resume routes — all scoped to the authenticated user (per-user isolation)."""

import copy
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import Resume, User
from ..schemas import ForkIn, RenameIn, ResumeOut, ResumeUpdateIn

router = APIRouter(prefix="/resumes", tags=["resumes"])


def _get_owned_resume(db: Session, user: User, resume_id: uuid.UUID) -> Resume:
    resume = db.get(Resume, resume_id)
    if resume is None or resume.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found")
    return resume


def _get_master(db: Session, user: User) -> Resume:
    master = db.scalar(
        select(Resume).where(Resume.user_id == user.id, Resume.is_master.is_(True))
    )
    if master is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Master resume not found")
    return master


@router.get("", response_model=list[ResumeOut])
def list_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Resume]:
    return list(
        db.scalars(
            select(Resume)
            .where(Resume.user_id == current_user.id)
            .order_by(Resume.is_master.desc(), Resume.created_at.asc())
        ).all()
    )


@router.patch("/{resume_id}", response_model=ResumeOut)
def update_resume(
    resume_id: uuid.UUID,
    payload: ResumeUpdateIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Resume:
    resume = _get_owned_resume(db, current_user, resume_id)
    resume.resume_data = payload.resume_data
    resume.section_config = payload.section_config
    db.commit()
    db.refresh(resume)
    return resume


@router.patch("/{resume_id}/name", response_model=ResumeOut)
def rename_resume(
    resume_id: uuid.UUID,
    payload: RenameIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Resume:
    resume = _get_owned_resume(db, current_user, resume_id)
    resume.name = payload.name
    db.commit()
    db.refresh(resume)
    return resume


@router.post("/fork", response_model=ResumeOut, status_code=status.HTTP_201_CREATED)
def fork_from_master(
    payload: ForkIn,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Resume:
    # By default the branch copies the master; the Transform feature passes
    # explicit resume_data/section_config to branch with tailored content.
    master = _get_master(db, current_user)
    version = Resume(
        user_id=current_user.id,
        name=payload.name,
        is_master=False,
        resume_data=copy.deepcopy(
            payload.resume_data if payload.resume_data is not None else master.resume_data
        ),
        section_config=copy.deepcopy(
            payload.section_config if payload.section_config is not None else master.section_config
        ),
    )
    db.add(version)
    db.commit()
    db.refresh(version)
    return version


@router.post("/{resume_id}/restore-from-master", response_model=ResumeOut)
def restore_from_master(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Resume:
    resume = _get_owned_resume(db, current_user, resume_id)
    if resume.is_master:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot restore the master resume onto itself.",
        )
    master = _get_master(db, current_user)
    resume.resume_data = copy.deepcopy(master.resume_data)
    resume.section_config = copy.deepcopy(master.section_config)
    db.commit()
    db.refresh(resume)
    return resume


@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resume(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> None:
    resume = _get_owned_resume(db, current_user, resume_id)
    if resume.is_master:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The master resume cannot be deleted.",
        )
    db.delete(resume)
    db.commit()
