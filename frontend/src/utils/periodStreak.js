function getWeekKey(dateStr) {
  const d = new Date(dateStr);
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

function getMonthKey(dateStr) {
  return dateStr.slice(0, 7); // "YYYY-MM"
}

export function calculatePeriodStreak(datesDone, repetition) {
  if (repetition.period === "daily") {
    // fall back to simple consecutive-day counting
    const doneSet = new Set(datesDone);
    let streak = 0;
    let day = new Date();
    while (doneSet.has(day.toISOString().split("T")[0])) {
      streak += 1;
      day.setDate(day.getDate() - 1);
    }
    return streak;
  }

  const groupFn = repetition.period === "weekly" ? getWeekKey : getMonthKey;
  const counts = {};
  datesDone.forEach((d) => {
    const key = groupFn(d);
    counts[key] = (counts[key] || 0) + 1;
  });

  let streak = 0;
  let cursor = new Date();
  while (true) {
    const key = groupFn(cursor.toISOString().split("T")[0]);
    if ((counts[key] || 0) >= repetition.target) {
      streak += 1;
      if (repetition.period === "weekly") cursor.setDate(cursor.getDate() - 7);
      else cursor.setMonth(cursor.getMonth() - 1);
    } else break;
  }
  return streak;
}

export function currentPeriodProgress(datesDone, repetition) {
  const today = new Date().toISOString().split("T")[0];
  if (repetition.period === "daily") {
    return datesDone.includes(today) ? 1 : 0;
  }
  const groupFn = repetition.period === "weekly" ? getWeekKey : getMonthKey;
  const key = groupFn(today);
  return datesDone.filter((d) => groupFn(d) === key).length;
}
