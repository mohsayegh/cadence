function GoalCard({ goal, onIncrement, onDelete }) {
  const percent = goal.target
    ? Math.round((goal.current / goal.target) * 100)
    : 0;
  const isComplete = goal.current >= goal.target;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span
          className={`text-[15px] ${
            isComplete ? "text-stone-400 line-through" : "text-stone-900"
          }`}
        >
          {goal.title}
        </span>
        {goal.dueDate && (
          <span className="text-xs text-stone-400">due {goal.dueDate}</span>
        )}
        <button
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete ${goal.title}`}
          className="text-stone-300 transition hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full rounded-full bg-stone-900 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs tabular-nums text-stone-500">
          {goal.current} / {goal.target}
        </span>
        <button
          onClick={() => onIncrement(goal.id)}
          disabled={isComplete}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default GoalCard;
