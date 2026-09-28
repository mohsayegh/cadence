import { apiFetch } from "../api";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import StatCard from "../components/StatCard";

function DashboardPage() {
  const [habits, setHabits] = useState([]);
  const [goals, setGoals] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    async function loadData() {
      const [habitsRes, goalsRes] = await Promise.all([
        apiFetch("/habits"),
        apiFetch("/goals"),
      ]);
      setHabits(await habitsRes.json());
      setGoals(await goalsRes.json());
    }
    loadData();
  }, []);

  const habitsDone = habits.filter((h) => h.isDone).length;
  const percent = habits.length
    ? Math.round((habitsDone / habits.length) * 100)
    : 0;
  const longestStreak = habits.reduce((max, h) => Math.max(max, h.streak), 0);
  const activeGoals = goals.filter((g) => g.current < g.target).length;
  const remaining = habits.filter((h) => !h.isDone);

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
          sub={`${habitsDone} of ${habits.length} habits done`}
        />
        <StatCard
          label="Longest streak"
          value={longestStreak}
          sub="days in a row"
        />
        <StatCard label="Active goals" value={activeGoals} />
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
        <div className="rounded-xl border border-stone-200 bg-white p-4">
          {remaining.length === 0 ? (
            <p className="text-sm text-stone-500">All habits done. Nice.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {remaining.map((h) => (
                <li key={h.id} className="text-sm text-stone-700">
                  {h.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
