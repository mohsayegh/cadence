from datetime import datetime, timedelta, timezone
import jwt
from jwt import PyJWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from database import get_session
from models import User
import bcrypt


# --- config ---
SECRET_KEY = "change-this-to-a-long-random-string"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MINUTES = 60 * 24  # one day

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# --- password helpers ---
def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

# --- token helpers ---
def create_token(user_id: int) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=TOKEN_EXPIRE_MINUTES)
    payload = {"sub": str(user_id), "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


# --- the dependency that protects endpoints ---
def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
) -> User:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except (PyJWTError, TypeError, ValueError):
        raise credentials_error

    user = session.get(User, user_id)
    if not user:
        raise credentials_error
    return user