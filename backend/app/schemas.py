from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class UserOut(BaseModel):
    id: UUID
    email: EmailStr
    display_name: str | None = None


class AuthRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=256)


class AuthResponse(BaseModel):
    user: UserOut


class ResumeRecordOut(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    is_master: bool
    resume_data: dict
    section_config: list[dict]
    created_at: datetime
    updated_at: datetime


class ResumesResponse(BaseModel):
    resumes: list[ResumeRecordOut]


class ResumeUpdateRequest(BaseModel):
    resume_data: dict
    section_config: list[dict]


class RenameRequest(BaseModel):
    name: str = Field(min_length=1, max_length=180)


class ForkRequest(BaseModel):
    name: str = Field(min_length=1, max_length=180)
