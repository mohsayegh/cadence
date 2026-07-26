from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Task, TaskCreate
from database import get_session

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("")
def get_tasks(session: Session = Depends(get_session)):
    return session.exec(select(Task)).all()


@router.post("", status_code=201)
def create_task(payload: TaskCreate, session: Session = Depends(get_session)) -> Task:
    task = Task(title=payload.title, isDone=False)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.patch("/{task_id}/toggle")
def toggle_task(task_id: int, session: Session = Depends(get_session)) -> Task:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.isDone = not task.isDone
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()