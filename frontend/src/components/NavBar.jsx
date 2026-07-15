import { Link } from "react-router-dom";

const NavBar = ({ path }) => {
  return (
    <ul>
      <Link to={path || "/"}>
        <li>Dashboard</li>
      </Link>
      <Link to={path || "/tasks"}>
        <li>Tasks</li>
      </Link>
      <Link to={path || "habits"}>
        <li>Habit Tracker</li>
      </Link>
      <Link to={path || "goals"}>
        <li>Goal Tracker</li>
      </Link>
    </ul>
  );
};

export default NavBar;
