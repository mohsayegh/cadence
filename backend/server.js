const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let habits = [
  { id: 1, name: "Drink water", datesDone: [], repetition: { period: "daily", target: 1 } },
];

app.get("/", (req, res) => {
  res.send("Cadence API is running");
});

app.get("/habits", (req, res) => {
  res.json(habits);
});

app.post("/habits", (req, res) => {
  const { name, repetition } = req.body;
  const newHabit = { id: Date.now(), name, datesDone: [], repetition };
  habits.push(newHabit);
  res.status(201).json(newHabit);
});

app.patch("/habits/:id", (req, res) => {
  const id = Number(req.params.id);
  const habit = habits.find((h) => h.id === id);
  if (!habit) return res.status(404).json({ error: "Habit not found" });

  const today = new Date().toISOString().split("T")[0];
  const isDone = habit.datesDone.includes(today);
  habit.datesDone = isDone
    ? habit.datesDone.filter((d) => d !== today)
    : [...habit.datesDone, today];

  res.json(habit);
});

app.delete("/habits/:id", (req, res) => {
  const id = Number(req.params.id);
  habits = habits.filter((h) => h.id !== id);
  res.status(204).send();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});