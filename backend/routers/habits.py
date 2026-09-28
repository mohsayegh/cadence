from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Habit, HabitCreate, User
from database import get_session
from auth import get_current_user

router = APIRouter(prefix="/habits", tags=["habits"])


@router.get("")
def get_habits(
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    return session.exec(select(Habit).where(Habit.user_id == user.id)).all()


@router.post("", status_code=201)
def create_habit(
    payload: HabitCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Habit:
    habit = Habit(name=payload.name, isDone=False, streak=0, user_id=user.id)
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.patch("/{habit_id}/toggle")
def toggle_habit(
    habit_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Habit:
    habit = session.get(Habit, habit_id)
    if not habit or habit.user_id != user.id:
        raise HTTPException(status_code=404, detail="Habit not found")
    habit.isDone = not habit.isDone
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.delete("/{habit_id}", status_code=204)
def delete_habit(
    habit_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    habit = session.get(Habit, habit_id)
    if not habit or habit.user_id != user.id:
        raise HTTPException(status_code=404, detail="Habit not found")
    session.delete(habit)
    session.commit()