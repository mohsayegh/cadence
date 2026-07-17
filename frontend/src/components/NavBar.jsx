import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// handling the active state function
const linkStyles = ({ isActive }) =>
  `text-sm font-medium pb-1 border-b-2 transition-colors ${
    isActive
      ? "text-paper border-ember"
      : "text-fog border-transparent hover:text-paper"
  }`;

const NavBar = () => {
  // managing the dark mode function
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-8 py-4 items-center justify-between grid grid-cols-3">
      <span className="text-paper font-serif text-xl">Cadence</span>

      <ul className="flex gap-8 justify-self-end">
        <li>
          <NavLink to="/" className={linkStyles}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" className={linkStyles}>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/habits" className={linkStyles}>
            Habit Tracker
          </NavLink>
        </li>
        <li>
          <NavLink to="/goals" className={linkStyles}>
            Goal Tracker
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-4 justify-self-end cursor-pointer">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️" : "🌙"}
        </button>

        <button className="w-8 h-8 rounded-full bg-ember/20 border border-ember/40 overflow-hidden cursor-pointer">
          <img
            src="/placeholder-avatar.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>

        <button className="md:hidden cursor-pointer">☰</button>
      </div>
    </nav>
  );
};

export default NavBar;
