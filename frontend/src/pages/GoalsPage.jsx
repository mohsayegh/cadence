import { useState } from "react";
import GoalCard from "../components/GoalCard";
import AddGoalModal from "../components/AddGoalModal";

const GoalsPage = ({ goals, onAddProgress, onAddGoal, onDeleteGoal }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-serif text-paper">Goal Tracker</h1>
        <p className="text-fog mt-1">{goals.length} active goals</p>
      </div>

      <div className="flex flex-col gap-3">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            name={goal.name}
            targetNum={goal.targetNum}
            currentProgress={goal.currentProgress}
            deadline={goal.deadline}
            onAddProgress={() => onAddProgress(goal.id)}
            onDelete={() => onDeleteGoal(goal.id)}
          />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="mt-6 w-full rounded-2xl border border-dashed border-fog/30 text-fog py-4 hover:border-ember/50 hover:text-ember transition-colors"
      >
        + New goal
      </button>

      {showModal && (
        <AddGoalModal onAdd={onAddGoal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default GoalsPage;
