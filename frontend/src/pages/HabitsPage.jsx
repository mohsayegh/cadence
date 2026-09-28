import HabitCard from "../components/HabitCard";
import { useEffect, useState } from "react";
import { apiFetch } from "../api";

function HabitsPage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    async function loadHabits() {
      const res = await apiFetch("/habits");
      const data = await res.json();
      setHabits(data);
    }
    loadHabits();
  }, []);

  const [newName, setNewName] = useState("");
  const sortedHabits = [...habits].sort(
    (a, b) => Number(a.isDone) - Number(b.isDone),
  );
  const doneCount = habits.filter((habit) => habit.isDone).length;
  const percent = habits.length
    ? Math.round((doneCount / habits.length) * 100)
    : 0;

  async function handleToggle(id) {
    const res = await apiFetch(`/habits/${id}/toggle`, { method: "PATCH" });

    const updated = await res.json();
    setHabits(habits.map((habit) => (habit.id === id ? updated : habit)));
  }

  async function handleDelete(id) {
    await apiFetch(`/habits/${id}`, { method: "DELETE" });
    setHabits(habits.filter((habit) => habit.id !== id));
  }

  async function handleAdd() {
    const name = newName.trim();
    if (!name) return;

    const res = await apiFetch("/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const updated = await res.json();
    setHabits([...habits, updated]);
    setNewName("");
  }

  return (
    <div className="min-h-screen bg-stone-100 px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Today
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
            Habits
          </h1>

          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-sm text-stone-600">
              {doneCount} of {habits.length} done
            </span>
            <span className="text-sm font-medium tabular-nums text-stone-900">
              {percent}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full bg-stone-900 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </header>

        <div className="flex flex-col gap-2">
          {sortedHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {habits.length === 0 && (
          <p className="py-10 text-center text-sm text-stone-500">
            No habits yet. Add one below to get started.
          </p>
        )}

        <div className="mt-6 flex gap-2">
          <input
            type="text"
            value={newName}
            placeholder="Add a habit"
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
          />
          <button
            onClick={handleAdd}
            className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default HabitsPage;
