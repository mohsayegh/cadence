# get    -> give me data
# post   -> create something new
# patch  -> change part of something
# delete -> remove something

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from time import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Habit(BaseModel):
    id: int
    name: str
    isDone: bool
    streak: int
    
habits: list[Habit] = [
    Habit(id=1, name="Prayer", isDone=True, streak=5),
    Habit(id=2, name="Eat Healthy", isDone=False, streak=2),
]


@app.get("/habits")
def get_habits():
    return habits

class HabitCreate(BaseModel):
    name: str

@app.post("/habits", status_code=201)
def create_habit(payload: HabitCreate) -> Habit:
    habit = Habit(id=int(time() * 1000), name=payload.name, isDone=False, streak=0)
    habits.append(habit)
    return habit


@app.patch("/habits/{habit_id}/toggle")
def toggle_habit(habit_id: int) -> Habit:
    for habit in habits:
        if habit.id == habit_id:
            habit.isDone = not habit.isDone
            return habit
    raise HTTPException(status_code=404, detail="Habit not found")


@app.delete("/habits/{habit_id}", status_code=204)
def delete_habit(habit_id: int):
    global habits
    habits = [habit for habit in habits if habit.id != habit_id]