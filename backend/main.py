# get    -> give me data
# post   -> create something new
# patch  -> change part of something
# delete -> remove something

from fastapi import FastAPI, HTTPException
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from time import time
from math import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
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
    
    
    
# Goals Functions 

class Goal(BaseModel):
    id: int
    title: str 
    current: int 
    target: int 

class GoalCreate(BaseModel):
    title: str 
    target: int 
    
    
    
goals: list[Goal]=[ 
                Goal(id=1, title="finish project", current=0, target= 5),
                Goal(id=2, title="End a bad habit", current=7, target = 7)
                   ]


@app.patch("/goals/{goal_id}/increment")
def increment_goal(goal_id: int) -> Goal:
    for goal in goals:
        if goal.id == goal_id:
            if goal.current < goal.target:
                goal.current += 1
            return goal
    raise HTTPException(status_code=404, detail="Goal not found")


@app.get("/goals")
def get_goals():
    return goals



@app.post("/goals", status_code=201)
def create_goal(payload: GoalCreate):
    goal = Goal(id=int(time() * 1000), title=payload.title, current=0, target = payload.target)
    goals.append(goal)
    return goal




@app.delete("/goals/{goal_id}", status_code=204)
def delete_goal(goal_id: int):
    global goals
    goals = [goal for goal in goals if goal.id != goal_id]        