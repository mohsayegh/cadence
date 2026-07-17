import { useState } from "react";
import HabitTracker from "../components/HabitTracker";

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink water",
      datesDone: ["2026-07-15", "2026-07-16", "2026-07-17"],
    },
    { id: 2, name: "Read", datesDone: ["2026-07-14", "2026-07-17"] },
    { id: 3, name: "Workout", datesDone: [] },
  ]);

  function markDone(habitId) {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((h) => {
        if (h.id !== habitId) return h;
        if (h.datesDone.includes(today)) return h;
        return { ...h, datesDone: [...h.datesDone, today] };
      }),
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const doneTodayCount = habits.filter((h) =>
    h.datesDone.includes(today),
  ).length;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-paper">Habit Tracker</h1>
        <p className="text-fog mt-1">
          {doneTodayCount} of {habits.length} done today
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {habits.map((habit) => (
          <HabitTracker
            key={habit.id}
            name={habit.name}
            datesDone={habit.datesDone}
            onMarkDone={() => markDone(habit.id)}
          />
        ))}
      </div>

      <button className="mt-6 w-full rounded-2xl border border-dashed border-fog/30 text-fog py-4 hover:border-ember/50 hover:text-ember transition-colors">
        + New habit
      </button>
    </div>
  );
};

export default HabitsPage;
