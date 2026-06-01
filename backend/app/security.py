"""Password hashing (bcrypt) and JWT access-token helpers."""

from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

from .config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Name of the HttpOnly cookie carrying the JWT access token.
COOKIE_NAME = "access_token"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_access_token(subject: str, session_id: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": subject,
        "sid": session_id,
        "iat": now,
        "exp": now + timedelta(hours=settings.access_token_ttl_hours),
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict | None:
    """Return the token payload (incl. `sub` and `sid`) if valid, else None.

    jose validates the `exp` claim, so an expired token returns None.
    """
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None
