import calculateStreak from "../utils/calculateStreak";

const HabitTracker = ({ name, datesDone, onMarkDone }) => {
  const streak = calculateStreak(datesDone);
  const today = new Date().toISOString().split("T")[0];
  const doneToday = datesDone.includes(today);

  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const str = d.toISOString().split("T")[0];
    return { str, done: datesDone.includes(str) };
  });

  return (
    <div className="group flex items-center justify-between gap-6 rounded-2xl bg-surface border border-white/5 px-6 py-5 hover:border-ember/30 transition-colors">
      <div className="flex items-center gap-4">
        <button
          onClick={onMarkDone}
          className={`w-11 h-11 shrink-0 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
            doneToday
              ? "bg-ember border-ember text-ink"
              : "border-fog/40 text-transparent hover:border-ember"
          }`}
        >
          ✓
        </button>

        <div>
          <h2 className="text-paper font-medium">{name}</h2>
          <p className="text-fog text-sm">
            🔥 {streak} day{streak === 1 ? "" : "s"} streak
          </p>
        </div>
      </div>

      <div className="flex gap-1.5">
        {last7.map((day) => (
          <span
            key={day.str}
            className={`w-2.5 h-2.5 rounded-full ${
              day.done ? "bg-ember" : "bg-fog/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;
