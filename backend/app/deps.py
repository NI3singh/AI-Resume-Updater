from datetime import datetime, timedelta, timezone

from fastapi import Cookie, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import AuthSession, User
from app.security import create_access_token, decode_access_token, hash_token, new_refresh_token


ACCESS_COOKIE = "resume_access_token"
REFRESH_COOKIE = "resume_refresh_token"


def set_auth_cookies(response: Response, access_token: str, refresh_token: str) -> None:
    response.set_cookie(
        ACCESS_COOKIE,
        access_token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=settings.access_token_expire_minutes * 60,
        path="/",
    )
    response.set_cookie(
        REFRESH_COOKIE,
        refresh_token,
        httponly=True,
        secure=settings.cookie_secure,
        samesite="lax",
        max_age=settings.refresh_token_expire_days * 24 * 60 * 60,
        path="/",
    )


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie(ACCESS_COOKIE, path="/")
    response.delete_cookie(REFRESH_COOKIE, path="/")


def create_session(db: Session, user: User, response: Response, user_agent: str | None = None) -> None:
    access_token = create_access_token(user.id)
    refresh_token = new_refresh_token()
    expires_at = datetime.now(timezone.utc) + timedelta(days=settings.refresh_token_expire_days)
    db.add(AuthSession(
        user_id=user.id,
        refresh_token_hash=hash_token(refresh_token),
        user_agent=user_agent,
        expires_at=expires_at,
    ))
    set_auth_cookies(response, access_token, refresh_token)


def current_user(
    response: Response,
    db: Session = Depends(get_db),
    access_token: str | None = Cookie(default=None, alias=ACCESS_COOKIE),
    refresh_token: str | None = Cookie(default=None, alias=REFRESH_COOKIE),
) -> User:
    if access_token:
        user_id = decode_access_token(access_token)
        if user_id:
            user = db.get(User, user_id)
            if user and user.is_active:
                return user

    if refresh_token:
        token_hash = hash_token(refresh_token)
        auth_session = db.scalar(
            select(AuthSession)
            .where(AuthSession.refresh_token_hash == token_hash)
            .where(AuthSession.revoked_at.is_(None))
            .where(AuthSession.expires_at > datetime.now(timezone.utc))
        )
        if auth_session:
            user = db.get(User, auth_session.user_id)
            if user and user.is_active:
                response.set_cookie(
                    ACCESS_COOKIE,
                    create_access_token(user.id),
                    httponly=True,
                    secure=settings.cookie_secure,
                    samesite="lax",
                    max_age=settings.access_token_expire_minutes * 60,
                    path="/",
                )
                return user

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
