import { useState } from "react";
import HabitTracker from "../components/HabitTracker";
import AddHabitModal from "../components/AddHabitModal";

const HabitsPage = ({ habits, onToggleDone, onAddHabit, onDeleteHabit }) => {
  const [showModal, setShowModal] = useState(false);

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
            onToggleDone={() => onToggleDone(habit.id)}
            onDelete={() => onDeleteHabit(habit.id)}
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
        <AddHabitModal onAdd={onAddHabit} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default HabitsPage;
