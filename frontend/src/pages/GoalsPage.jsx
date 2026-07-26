import GoalCard from "../components/GoalCard";
import { useEffect, useState } from "react";

function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTarget, setNewTarget] = useState("");

  useEffect(() => {
    async function loadGoals() {
      const res = await fetch("http://127.0.0.1:8000/goals");
      const data = await res.json();
      setGoals(data);
    }
    loadGoals();
  }, []);

  async function handleIncrement(id) {
    const res = await fetch(`http://127.0.0.1:8000/goals/${id}/increment`, {
      method: "PATCH",
    });
    const updated = await res.json();
    setGoals(goals.map((goal) => (goal.id === id ? updated : goal)));
  }

  async function handleDelete(id) {
    await fetch(`http://127.0.0.1:8000/goals/${id}`, {
      method: "DELETE",
    });
    setGoals(goals.filter((goal) => goal.id !== id));
  }

  async function handleAdd() {
    const title = newTitle.trim();
    const target = Number(newTarget);
    if (!title || !target) return;

    const res = await fetch("http://127.0.0.1:8000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, target }),
    });

    const created = await res.json();
    setGoals([...goals, created]);
    setNewTitle("");
    setNewTarget("");
  }

  return (
    <div className="mx-auto max-w-md">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Progress
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
          Goals
        </h1>
      </header>

      <div className="flex flex-col gap-2">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onIncrement={handleIncrement}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {goals.length === 0 && (
        <p className="py-10 text-center text-sm text-stone-500">
          No goals yet. Add one below to get started.
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          placeholder="Goal title"
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
        />
        <input
          type="number"
          value={newTarget}
          placeholder="Target"
          onChange={(e) => setNewTarget(e.target.value)}
          className="w-20 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
        />
        <button
          onClick={handleAdd}
          className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default GoalsPage;
