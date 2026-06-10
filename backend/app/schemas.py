"""Pydantic request/response models for the API."""

import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr, Field


class SignupIn(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    display_name: str | None = Field(default=None, max_length=120)


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: uuid.UUID
    email: str
    display_name: str | None = None


class ResumeOut(BaseModel):
    id: uuid.UUID
    name: str
    is_master: bool
    resume_data: dict[str, Any]
    section_config: list[Any]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ResumeUpdateIn(BaseModel):
    resume_data: dict[str, Any]
    section_config: list[Any]


class RenameIn(BaseModel):
    name: str = Field(min_length=1, max_length=200)


class ForkIn(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    # Optional content overrides: when provided, the new branch is created with
    # this data instead of a copy of the master (used by the Transform feature).
    resume_data: dict[str, Any] | None = None
    section_config: list[Any] | None = None


class CompileIn(BaseModel):
    latex: str = Field(min_length=1)


# ── Resume Upload pipeline (extract → parse → verify) ───────────────────────


class ExtractOut(BaseModel):
    text: str


class ParseIn(BaseModel):
    text: str = Field(min_length=1)


class ParseOut(BaseModel):
    data: dict[str, Any]


class VerifySummary(BaseModel):
    sections_found: list[str] = Field(default_factory=list)
    missing: list[str] = Field(default_factory=list)


class VerifyIn(BaseModel):
    text: str = Field(min_length=1)
    data: dict[str, Any]


class VerifyOut(BaseModel):
    data: dict[str, Any]
    warnings: list[str] = Field(default_factory=list)
    summary: VerifySummary = Field(default_factory=VerifySummary)


# ── Transform (tailor the resume to a job description) ──────────────────────


class TransformIn(BaseModel):
    job_description: str = Field(min_length=1)
    job_title: str = Field(default="", max_length=200)
    company: str = Field(default="", max_length=200)
    data: dict[str, Any]


class MatchSummary(BaseModel):
    covered_keywords: list[str] = Field(default_factory=list)
    missing_keywords: list[str] = Field(default_factory=list)


class TransformOut(BaseModel):
    data: dict[str, Any]
    changes: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    match: MatchSummary = Field(default_factory=MatchSummary)
