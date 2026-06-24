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
    github_username: str | None = None


class ProfileUpdateIn(BaseModel):
    display_name: str | None = Field(default=None, max_length=120)
    github_username: str | None = Field(default=None, max_length=100)


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


# ── Interactive Transform (section-by-section, grounded tailoring) ───────────


class TransformPlanIn(BaseModel):
    job_description: str = Field(min_length=1)
    job_title: str = Field(default="", max_length=200)
    company: str = Field(default="", max_length=200)
    data: dict[str, Any]
    section_config: list[Any] = Field(default_factory=list)  # [{id,label}] — to advise on whole-section drops


class TransformSectionAdvice(BaseModel):
    section: str                  # section id (e.g. 'publications', 'custom_…')
    label: str
    keep: bool = True
    reason: str = ""


class TransformStep(BaseModel):
    kind: str                       # 'summary' | 'experience' | 'projects' | 'extracurricular' | 'education'
    entry_id: str = ""              # '' for the summary step
    section: str                    # owning section key ('personal' for summary)
    label: str
    asks_readme: bool = False       # project steps may request the project's README (Phase 2 UI)
    asks_related_work: bool = False # experience steps may request JD-related work notes (Phase 2 UI)
    recommend_change: bool = True
    reason: str = ""


class TransformPlanOut(BaseModel):
    steps: list[TransformStep] = Field(default_factory=list)
    section_advice: list[TransformSectionAdvice] = Field(default_factory=list)
    missing_keywords: list[str] = Field(default_factory=list)


class TransformSectionIn(BaseModel):
    job_description: str = Field(min_length=1)
    job_title: str = Field(default="", max_length=200)
    company: str = Field(default="", max_length=200)
    kind: str
    entry: dict[str, Any] = Field(default_factory=dict)   # the single original unit (summary -> {"summary": "..."})
    sources: list[str] = Field(default_factory=list)      # README / notes text — grounds allowed facts & numbers
    instruction: str = Field(default="", max_length=2000) # optional user refine comment for a regeneration


class TransformSectionOut(BaseModel):
    proposal: dict[str, Any] = Field(default_factory=dict)   # tailorable fields only (bullets/text/summary/items)
    rationale: str = ""
    covered_keywords: list[str] = Field(default_factory=list)
    missing_keywords: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    no_change_recommended: bool = False


# ── GitHub integration (Profile page) ───────────────────────────────────────


class GithubReposIn(BaseModel):
    username: str = Field(min_length=1, max_length=100)


class GithubRepoOut(BaseModel):
    name: str = ""
    full_name: str = ""           # "owner/repo"
    description: str = ""
    language: str = ""
    topics: list[str] = Field(default_factory=list)
    stars: int = 0
    html_url: str = ""
    homepage: str = ""
    updated_at: str = ""
    fork: bool = False
    archived: bool = False


class GithubReposOut(BaseModel):
    repos: list[GithubRepoOut] = Field(default_factory=list)


class GithubTreeIn(BaseModel):
    full_name: str = Field(min_length=1, max_length=200)  # "owner/repo"


class GithubTreeFile(BaseModel):
    path: str
    size: int = 0
    suggested: bool = False   # pre-checked in the UI (manifests, entrypoints, key src)


class GithubTreeOut(BaseModel):
    default_branch: str = ""
    truncated: bool = False   # GitHub omitted some files (very large repo)
    files: list[GithubTreeFile] = Field(default_factory=list)


class GithubProjectIn(BaseModel):
    full_name: str = Field(min_length=1, max_length=200)   # "owner/repo"
    file_paths: list[str] = Field(default_factory=list)    # files to read (empty -> auto-pick)
    instruction: str = Field(default="", max_length=2000)  # optional refine comment
    notes: str = Field(default="", max_length=4000)        # optional extra context (allowed facts)


class GithubProjectOut(BaseModel):
    # ProjectEntry shape minus id (the client assigns one): name, techStack,
    # githubUrl, liveUrl, bullets[].
    project: dict[str, Any] = Field(default_factory=dict)
    warnings: list[str] = Field(default_factory=list)
    analyzed_files: list[str] = Field(default_factory=list)  # files actually read
    digest: str = ""          # the code/README digest — passed back to /refine
    rationale: str = ""


class GithubRefineIn(BaseModel):
    full_name: str = Field(min_length=1, max_length=200)
    digest: str = Field(default="", max_length=200000)     # reused from analyze (no re-fetch)
    instruction: str = Field(default="", max_length=2000)
    notes: str = Field(default="", max_length=4000)
    current_bullets: list[str] = Field(default_factory=list)


class GithubRefineOut(BaseModel):
    bullets: list[str] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    rationale: str = ""
