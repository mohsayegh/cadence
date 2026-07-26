function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 transition-colors ${
        task.isDone ? "bg-stone-50" : "bg-white"
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.isDone ? "not done" : "done"}`}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
          task.isDone
            ? "border-stone-900 bg-stone-900 text-white"
            : "border-stone-300 hover:border-stone-500"
        }`}
      >
        {task.isDone && "✓"}
      </button>

      <span
        className={`flex-1 text-[15px] ${
          task.isDone ? "text-stone-400 line-through" : "text-stone-900"
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="text-stone-300 opacity-0 transition group-hover:opacity-100 focus:opacity-100 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
}

export default TaskCard;
