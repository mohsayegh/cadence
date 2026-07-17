import { calculatePeriodStreak } from "../utils/periodStreak";

const DashboardPage = ({ habits, goals }) => {
  const today = new Date().toISOString().split("T")[0];
  const doneTodayCount = habits.filter((h) =>
    h.datesDone.includes(today),
  ).length;
  const bestStreak = habits.reduce(
    (max, h) => Math.max(max, calculatePeriodStreak(h.datesDone, h.repetition)),
    0,
  );
  const avgGoalPct =
    goals.length === 0
      ? 0
      : Math.round(
          (goals.reduce((sum, g) => sum + g.currentProgress / g.targetNum, 0) /
            goals.length) *
            100,
        );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-serif text-paper mb-10">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl bg-surface border border-white/5 px-6 py-5">
          <p className="text-fog text-sm">Done today</p>
          <p className="text-paper text-2xl font-medium mt-1">
            {doneTodayCount}/{habits.length}
          </p>
        </div>
        <div className="rounded-2xl bg-surface border border-white/5 px-6 py-5">
          <p className="text-fog text-sm">Best streak</p>
          <p className="text-paper text-2xl font-medium mt-1">
            🔥 {bestStreak}
          </p>
        </div>
        <div className="rounded-2xl bg-surface border border-white/5 px-6 py-5">
          <p className="text-fog text-sm">Avg. goal progress</p>
          <p className="text-paper text-2xl font-medium mt-1">{avgGoalPct}%</p>
        </div>
      </div>

      <h2 className="text-paper font-medium mb-4">Habits</h2>
      <div className="flex flex-col gap-2 mb-10">
        {habits.map((h) => {
          const streak = calculatePeriodStreak(h.datesDone, h.repetition);
          const doneToday = h.datesDone.includes(today);
          return (
            <div
              key={h.id}
              className="flex items-center justify-between rounded-xl bg-surface border border-white/5 px-5 py-3"
            >
              <span className="text-paper text-sm">{h.name}</span>
              <span className="text-fog text-sm">
                {doneToday ? "✅" : "—"} 🔥 {streak}
              </span>
            </div>
          );
        })}
      </div>

      <h2 className="text-paper font-medium mb-4">Goals</h2>
      <div className="flex flex-col gap-2">
        {goals.map((g) => {
          const pct = Math.min(
            100,
            Math.round((g.currentProgress / g.targetNum) * 100),
          );
          return (
            <div
              key={g.id}
              className="rounded-xl bg-surface border border-white/5 px-5 py-3"
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-paper">{g.name}</span>
                <span className="text-fog">{pct}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-fog/15 overflow-hidden">
                <div className="h-full bg-ember" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
