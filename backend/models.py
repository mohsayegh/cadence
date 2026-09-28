from datetime import date
from pydantic import BaseModel
from sqlmodel import SQLModel, Field


# --- User ---
class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str


class UserCreate(BaseModel):
    email: str
    password: str


# --- Habit ---
class Habit(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    isDone: bool
    streak: int
    user_id: int = Field(foreign_key="user.id")


class HabitCreate(BaseModel):
    name: str


# --- Goal ---
class Goal(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    current: int
    target: int
    dueDate: date | None = None
    user_id: int = Field(foreign_key="user.id")


class GoalCreate(BaseModel):
    title: str
    target: int
    dueDate: date | None = None


# --- Task ---
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    isDone: bool
    user_id: int = Field(foreign_key="user.id")


class TaskCreate(BaseModel):
    title: str