from datetime import date
from pydantic import BaseModel
from sqlmodel import SQLModel, Field


# --- Habit ---
class Habit(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    isDone: bool
    streak: int


class HabitCreate(BaseModel):
    name: str


# --- Goal ---
class Goal(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    current: int
    target: int
    dueDate: date | None = None


class GoalCreate(BaseModel):
    title: str
    target: int
    dueDate: date | None = None
    
    
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    isDone: bool

class TaskCreate(BaseModel):
    title: str