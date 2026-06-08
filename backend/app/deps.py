"""Shared FastAPI dependencies."""

import uuid

from fastapi import Cookie, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .database import get_db
from .models import AuthSession, User
from .security import COOKIE_NAME, decode_access_token


def get_current_user(
    access_token: str | None = Cookie(default=None, alias=COOKIE_NAME),
    db: Session = Depends(get_db),
) -> User:
    """Resolve the authenticated user from the JWT cookie, or raise 401.

    Beyond a valid signature/expiry, the token's session row must still exist —
    logout deletes it, so this is what makes revocation instant.
    """
    cred_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
    )
    if not access_token:
        raise cred_error

    payload = decode_access_token(access_token)
    if not payload:
        raise cred_error

    try:
        user_id = uuid.UUID(payload.get("sub", ""))
        session_id = uuid.UUID(payload.get("sid", ""))
    except ValueError:
        raise cred_error

    # Session must still exist (revoked/logged-out tokens have no row).
    if db.get(AuthSession, session_id) is None:
        raise cred_error

    user = db.get(User, user_id)
    if user is None:
        raise cred_error
    return user
