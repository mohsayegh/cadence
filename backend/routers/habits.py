from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Habit, HabitCreate
from database import get_session

router = APIRouter(prefix="/habits", tags=["habits"])


@router.get("")
def get_habits(session: Session = Depends(get_session)):
    return session.exec(select(Habit)).all()


@router.post("", status_code=201)
def create_habit(payload: HabitCreate, session: Session = Depends(get_session)) -> Habit:
    habit = Habit(name=payload.name, isDone=False, streak=0)
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.patch("/{habit_id}/toggle")
def toggle_habit(habit_id: int, session: Session = Depends(get_session)) -> Habit:
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    habit.isDone = not habit.isDone
    session.add(habit)
    session.commit()
    session.refresh(habit)
    return habit


@router.delete("/{habit_id}", status_code=204)
def delete_habit(habit_id: int, session: Session = Depends(get_session)):
    habit = session.get(Habit, habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    session.delete(habit)
    session.commit()