import { useState } from "react";
import HabitTracker from "../components/HabitTracker";
import AddHabitModal from "../components/AddHabitModal";

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Drink water",
      datesDone: ["2026-07-15", "2026-07-16", "2026-07-17"],
      repetition: { period: "daily", target: 1 },
    },
    {
      id: 2,
      name: "Read",
      datesDone: ["2026-07-14", "2026-07-17"],
      repetition: { period: "weekly", target: 3 },
    },
    {
      id: 3,
      name: "Workout",
      datesDone: [],
      repetition: { period: "weekly", target: 4 },
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  function toggleDone(habitId) {
    const today = new Date().toISOString().split("T")[0];
    setHabits(
      habits.map((h) => {
        if (h.id !== habitId) return h;
        const isDone = h.datesDone.includes(today);
        return {
          ...h,
          datesDone: isDone
            ? h.datesDone.filter((d) => d !== today)
            : [...h.datesDone, today],
        };
      }),
    );
  }

  function addHabit(name, repetition) {
    setHabits([...habits, { id: Date.now(), name, datesDone: [], repetition }]);
  }

  function deleteHabit(habitId) {
    setHabits(habits.filter((h) => h.id !== habitId));
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
            repetition={habit.repetition}
            onToggleDone={() => toggleDone(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 w-full rounded-2xl border border-dashed border-fog/30 text-fog py-4 hover:border-ember/50 hover:text-ember transition-colors"
      >
        + New habit
      </button>

      {showModal && (
        <AddHabitModal onAdd={addHabit} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HabitsPage;
