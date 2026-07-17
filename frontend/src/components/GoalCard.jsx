const GoalCard = ({
  name,
  targetNum,
  currentProgress,
  deadline,
  onAddProgress,
  onDelete,
}) => {
  const pct = Math.min(100, Math.round((currentProgress / targetNum) * 100));
  const daysLeft = deadline
    ? Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="group relative rounded-2xl bg-surface border border-white/5 px-6 py-5 hover:border-ember/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-paper font-medium">{name}</h2>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 text-fog hover:text-red-400 transition-opacity text-sm"
        >
          ✕
        </button>
      </div>

      <div className="w-full h-2 rounded-full bg-fog/15 overflow-hidden mb-2">
        <div
          className="h-full bg-ember transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-fog">
          {currentProgress} / {targetNum} ({pct}%)
        </p>
        {daysLeft !== null && (
          <p className="text-fog">
            {daysLeft >= 0 ? `${daysLeft} days left` : "Past deadline"}
          </p>
        )}
      </div>

      <button
        onClick={onAddProgress}
        disabled={currentProgress >= targetNum}
        className="mt-4 w-full rounded-lg border border-ember/40 text-ember py-2 text-sm hover:bg-ember/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        + Add progress
      </button>
    </div>
  );
};

export default GoalCard;
