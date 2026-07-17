import { useState } from "react";

const AddHabitModal = ({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [period, setPeriod] = useState("daily");
  const [target, setTarget] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), { period, target: Number(target) });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-surface rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 border border-white/5"
      >
        <h2 className="text-paper font-serif text-xl">New habit</h2>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Meditate"
          className="bg-ink border border-white/10 rounded-lg px-4 py-2 text-paper placeholder:text-fog/50 outline-none focus:border-ember"
        />

        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-ink border border-white/10 rounded-lg px-3 py-2 text-paper flex-1"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>

          {period !== "daily" && (
            <input
              type="number"
              min="1"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="bg-ink border border-white/10 rounded-lg px-3 py-2 text-paper w-20"
            />
          )}
        </div>
        {period !== "daily" && (
          <p className="text-fog text-xs -mt-2">
            times per {period.replace("ly", "")}
          </p>
        )}

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-fog hover:text-paper px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-ember text-ink font-medium rounded-lg px-4 py-2 text-sm hover:opacity-90"
          >
            Add habit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabitModal;
