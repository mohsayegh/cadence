from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Goal, GoalCreate, User
from database import get_session
from auth import get_current_user

router = APIRouter(prefix="/goals", tags=["goals"])


@router.get("")
def get_goals(
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    return session.exec(select(Goal).where(Goal.user_id == user.id)).all()


@router.post("", status_code=201)
def create_goal(
    payload: GoalCreate,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Goal:
    goal = Goal(
        title=payload.title,
        current=0,
        target=payload.target,
        dueDate=payload.dueDate,
        user_id=user.id,
    )
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return goal


@router.patch("/{goal_id}/increment")
def increment_goal(
    goal_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
) -> Goal:
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    if goal.current < goal.target:
        goal.current += 1
    session.add(goal)
    session.commit()
    session.refresh(goal)
    return goal


@router.delete("/{goal_id}", status_code=204)
def delete_goal(
    goal_id: int,
    session: Session = Depends(get_session),
    user: User = Depends(get_current_user),
):
    goal = session.get(Goal, goal_id)
    if not goal or goal.user_id != user.id:
        raise HTTPException(status_code=404, detail="Goal not found")
    session.delete(goal)
    session.commit()