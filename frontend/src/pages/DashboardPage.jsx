import { Link } from "react-router";
import StatCard from "../components/StatCard";

// fake for now, replaced with real state later
const summary = {
  habitsTotal: 4,
  habitsDone: 2,
  longestStreak: 5,
  goalsActive: 3,
};

function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const percent = summary.habitsTotal
    ? Math.round((summary.habitsDone / summary.habitsTotal) * 100)
    : 0;

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          {today}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
          Dashboard
        </h1>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="Today"
          value={`${percent}%`}
          sub={`${summary.habitsDone} of ${summary.habitsTotal} habits done`}
        />
        <StatCard
          label="Longest streak"
          value={summary.longestStreak}
          sub="days in a row"
        />
        <StatCard label="Active goals" value={summary.goalsActive} />
      </div>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-stone-900">
            Still to do today
          </h2>
          <Link
            to="/habits"
            className="text-xs text-stone-500 hover:text-stone-900"
          >
            View all
          </Link>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-500">
          {/* habit preview list goes here */}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
