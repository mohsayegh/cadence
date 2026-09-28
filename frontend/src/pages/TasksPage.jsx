import { apiFetch } from "../api";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function loadTasks() {
      const res = await apiFetch("/tasks");
      const data = await res.json();
      setTasks(data);
    }
    loadTasks();
  }, []);

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.isDone) - Number(b.isDone),
  );
  const doneCount = tasks.filter((task) => task.isDone).length;

  async function handleToggle(id) {
    const res = await apiFetch(`/tasks/${id}/toggle`, {
      method: "PATCH",
    });
    const updated = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? updated : task)));
  }

  async function handleDelete(id) {
    await apiFetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  }

  async function handleAdd() {
    const title = newTitle.trim();
    if (!title) return;

    const res = await apiFetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const created = await res.json();
    setTasks([...tasks, created]);
    setNewTitle("");
  }

  return (
    <div className="mx-auto max-w-md">
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          {today}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
          Tasks
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          {doneCount} of {tasks.length} done
        </p>
      </header>

      <div className="flex flex-col gap-2">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="py-10 text-center text-sm text-stone-500">
          No tasks for today. Add one below.
        </p>
      )}

      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={newTitle}
          placeholder="Add a task"
          onChange={(e) => setNewTitle(e.target.value)}
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
  );
}

export default TasksPage;
