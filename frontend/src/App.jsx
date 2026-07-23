import { Routes, Route } from "react-router";
import HabitsPage from "./pages/HabitsPage";
import Dashboard from "./pages/DashboardPage";
import GoalsPage from "./pages/GoalsPage";
import TasksPage from "./pages/TasksPages";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  );
};

export default App;
