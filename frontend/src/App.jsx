import NavBar from "./components/NavBar";
import DashboardPage from "./pages/DashboardPage.jsx";
import HabitsPage from "./pages/HabitsPage.jsx";
import GoalsPage from "./pages/GoalsPage.jsx";
import TasksPages from "./pages/TasksPages.jsx";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/tasks" element={<TasksPages />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
};

export default App;
