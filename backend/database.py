import os
from sqlmodel import Session, create_engine

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./app.db")

# Supabase/Render give "postgres://" or "postgresql://"; point SQLAlchemy at psycopg 3
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)


def get_session():
    with Session(engine) as session:
        yield session
