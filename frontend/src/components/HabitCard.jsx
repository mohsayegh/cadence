function HabitCard({ habit, onToggle, onDelete }) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 transition-colors ${
        habit.isDone ? "bg-stone-50" : "bg-white"
      }`}
    >
      <button
        onClick={() => onToggle(habit.id)}
        aria-label={`Mark ${habit.name} as ${habit.isDone ? "not done" : "done"}`}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs transition-colors ${
          habit.isDone
            ? "border-stone-900 bg-stone-900 text-white"
            : "border-stone-300 hover:border-stone-500"
        }`}
      >
        {habit.isDone && "✓"}
      </button>

      <span
        className={`flex-1 text-[15px] ${
          habit.isDone ? "text-stone-400 line-through" : "text-stone-900"
        }`}
      >
        {habit.name}
      </span>

      {habit.streak > 0 && (
        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium tabular-nums text-amber-700">
          🔥 {habit.streak}
        </span>
      )}

      <button
        onClick={() => onDelete(habit.id)}
        aria-label={`Delete ${habit.name}`}
        className="text-stone-300 opacity-0 transition group-hover:opacity-100 focus:opacity-100 hover:text-red-500"
      >
        ✕
      </button>
    </div>
  );
}

export default HabitCard;
