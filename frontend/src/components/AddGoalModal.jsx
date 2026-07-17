import { useState } from "react";

const AddGoalModal = ({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [targetNum, setTargetNum] = useState(1);
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd({
      name: name.trim(),
      targetNum: Number(targetNum),
      deadline: deadline || null,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-ink/70 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-surface rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4 border border-white/5"
      >
        <h2 className="text-paper font-serif text-xl">New goal</h2>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Read 12 books"
          className="bg-ink border border-white/10 rounded-lg px-4 py-2 text-paper placeholder:text-fog/50 outline-none focus:border-ember"
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-fog text-xs">Target number</label>
            <input
              type="number"
              min="1"
              value={targetNum}
              onChange={(e) => setTargetNum(e.target.value)}
              className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-paper mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="text-fog text-xs">Deadline (optional)</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full bg-ink border border-white/10 rounded-lg px-3 py-2 text-paper mt-1"
            />
          </div>
        </div>
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
            Add goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalModal;
