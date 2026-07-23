function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-stone-900">
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-stone-500">{sub}</p>}
    </div>
  );
}

export default StatCard;
