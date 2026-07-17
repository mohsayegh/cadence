import calculateStreak from "../utils/calculateStreak";
const HabitTracker = ({ name, datesDone, onMarkDone }) => {
  const streak = calculateStreak(datesDone);
  return (
    <div>
      <input type="radio" onClick={onMarkDone} />
      <h2>
        {name} you did completed it for {streak} days
      </h2>
    </div>
  );
};

export default HabitTracker;
