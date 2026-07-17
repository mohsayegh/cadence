import { useState } from "react";
import NavBar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage.jsx";
import HabitsPage from "./pages/HabitsPage.jsx";
import GoalsPage from "./pages/GoalsPage.jsx";
import TasksPages from "./pages/TasksPages.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import { Routes, Route } from "react-router-dom";
import { toDateStr } from "./utils/calendarGrid";

const App = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink water",
      datesDone: ["2026-07-15", "2026-07-16", "2026-07-17"],
      repetition: { period: "daily", target: 1 },
    },
    {
      id: 2,
      name: "Read",
      datesDone: ["2026-07-14", "2026-07-17"],
      repetition: { period: "weekly", target: 3 },
    },
    {
      id: 3,
      name: "Workout",
      datesDone: [],
      repetition: { period: "weekly", target: 4 },
    },
  ]);

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Read 12 books",
      targetNum: 12,
      currentProgress: 4,
      deadline: "2026-12-31",
    },
    {
      id: 2,
      name: "Save $5000",
      targetNum: 5000,
      currentProgress: 1200,
      deadline: "2026-10-01",
    },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Team standup", date: toDateStr(new Date()), done: false },
  ]);

  function addTask(title, date) {
    setTasks([...tasks, { id: Date.now(), title, date, done: false }]);
  }
  function toggleTask(taskId) {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)));
  }
  function deleteTask(taskId) {
    setTasks(tasks.filter((t) => t.id !== taskId));
  }
  function toggleDone(habitId) {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((h) => {
        if (h.id !== habitId) return h;
        const isDone = h.datesDone.includes(today);
        return {
          ...h,
          datesDone: isDone
            ? h.datesDone.filter((d) => d !== today)
            : [...h.datesDone, today],
        };
      }),
    );
  }
  function addHabit(name, repetition) {
    setHabits([...habits, { id: Date.now(), name, datesDone: [], repetition }]);
  }
  function deleteHabit(habitId) {
    setHabits(habits.filter((h) => h.id !== habitId));
  }

  function addProgress(goalId) {
    setGoals(
      goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              currentProgress: Math.min(g.targetNum, g.currentProgress + 1),
            }
          : g,
      ),
    );
  }
  function addGoal({ name, targetNum, deadline }) {
    setGoals([
      ...goals,
      { id: Date.now(), name, targetNum, currentProgress: 0, deadline },
    ]);
  }
  function deleteGoal(goalId) {
    setGoals(goals.filter((g) => g.id !== goalId));
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<DashboardPage habits={habits} goals={goals} />}
        />
        <Route
          path="/habits"
          element={
            <HabitsPage
              habits={habits}
              onToggleDone={toggleDone}
              onAddHabit={addHabit}
              onDeleteHabit={deleteHabit}
            />
          }
        />
        <Route
          path="/goals"
          element={
            <GoalsPage
              goals={goals}
              onAddProgress={addProgress}
              onAddGoal={addGoal}
              onDeleteGoal={deleteGoal}
            />
          }
        />
        <Route
          path="/tasks"
          element={
            <TasksPages
              tasks={tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          }
        />{" "}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
