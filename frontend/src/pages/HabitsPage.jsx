import { useState } from "react";
import HabitTracker from "../components/HabitTracker";

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink water",
      datesDone: ["2026-07-15", "2026-07-16", "2026-07-17"],
    },
    {
      id: 2,
      name: "Read",
      datesDone: ["2026-07-14", "2026-07-17"],
    },
    {
      id: 3,
      name: "Workout",
      datesDone: [],
    },
  ]);

  function markDone(habitId) {
    const today = new Date().toISOString().split("T")[0];

    setHabits(
      habits.map((h) => {
        if (h.id !== habitId) return h;
        if (h.datesDone.includes(today)) return h; // already marked today, don't duplicate
        return { ...h, datesDone: [...h.datesDone, today] };
      }),
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif text-paper mb-6">Habit Tracker</h1>
      <div className="flex flex-col gap-4">
        {habits.map((habit) => (
          <HabitTracker
            key={habit.id}
            name={habit.name}
            datesDone={habit.datesDone}
            onMarkDone={() => markDone(habit.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitsPage;
