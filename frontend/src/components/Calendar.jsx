import { useState } from "react";
import { getMonthGrid, toDateStr } from "../utils/calendarGrid";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

const Calendar = ({ tasks, selectedDate, onSelectDate }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid = getMonthGrid(year, month);
  const todayStr = toDateStr(new Date());

  const taskDates = new Set(tasks.map((t) => t.date));

  function changeMonth(delta) {
    setViewDate(new Date(year, month + delta, 1));
  }

  return (
    <div className="rounded-2xl bg-surface border border-white/5 p-5">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => changeMonth(-1)}
          className="text-fog hover:text-paper px-2"
        >
          ‹
        </button>
        <p className="text-paper font-medium">
          {viewDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          onClick={() => changeMonth(1)}
          className="text-fog hover:text-paper px-2"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-fog text-xs mb-2">
        {WEEKDAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((date, i) => {
          if (!date) return <div key={i} />;
          const dateStr = toDateStr(date);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const hasTasks = taskDates.has(dateStr);

          return (
            <button
              key={i}
              onClick={() => onSelectDate(dateStr)}
              className={`relative aspect-square rounded-lg text-sm flex items-center justify-center transition-colors ${
                isSelected
                  ? "bg-ember text-ink font-medium"
                  : isToday
                    ? "text-ember"
                    : "text-paper hover:bg-fog/10"
              }`}
            >
              {date.getDate()}
              {hasTasks && !isSelected && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-ember" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
