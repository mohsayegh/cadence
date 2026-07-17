import { useState } from "react";
import Calendar from "../components/Calendar";
import { toDateStr } from "../utils/calendarGrid";

const TasksPage = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [selectedDate, setSelectedDate] = useState(toDateStr(new Date()));
  const [newTitle, setNewTitle] = useState("");

  const dayTasks = tasks.filter((t) => t.date === selectedDate);

  function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddTask(newTitle.trim(), selectedDate);
    setNewTitle("");
  }

  const displayDate = new Date(selectedDate + "T00:00:00").toLocaleDateString(
    "default",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
      <Calendar
        tasks={tasks}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div>
        <h1 className="text-2xl font-serif text-paper mb-1">{displayDate}</h1>
        <p className="text-fog text-sm mb-6">
          {dayTasks.filter((t) => t.done).length} of {dayTasks.length} done
        </p>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a task for this day"
            className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-2 text-paper placeholder:text-fog/50 outline-none focus:border-ember"
          />
          <button
            type="submit"
            className="bg-ember text-ink font-medium rounded-lg px-4 py-2 text-sm hover:opacity-90"
          >
            Add
          </button>
        </form>

        <div className="flex flex-col gap-2">
          {dayTasks.length === 0 && (
            <p className="text-fog text-sm">No tasks for this day.</p>
          )}
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center justify-between rounded-xl bg-surface border border-white/5 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs shrink-0 ${
                    task.done
                      ? "bg-ember border-ember text-ink"
                      : "border-fog/40 text-transparent"
                  }`}
                >
                  ✓
                </button>
                <span
                  className={`text-sm ${task.done ? "text-fog line-through" : "text-paper"}`}
                >
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 text-fog hover:text-red-400 transition-opacity text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
