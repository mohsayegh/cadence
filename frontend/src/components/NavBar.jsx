import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const linkStyles = ({ isActive }) =>
  `text-sm font-medium pb-1 border-b-2 transition-colors whitespace-nowrap ${
    isActive
      ? "text-paper border-ember"
      : "text-fog border-transparent hover:text-paper"
  }`;

const mobileLinkStyles = ({ isActive }) =>
  `block py-3 text-base ${isActive ? "text-ember font-medium" : "text-fog"}`;

const NavBar = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/tasks", label: "Tasks" },
    { to: "/habits", label: "Habit Tracker" },
    { to: "/goals", label: "Goal Tracker" },
  ];

  return (
    <>
      <nav className="bg-surface/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 px-6 md:px-8 py-4 items-center justify-between grid grid-cols-3">
        <span className="text-paper font-serif text-xl">Cadence</span>

        <ul className="hidden md:flex gap-8 justify-self-center">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkStyles}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 justify-self-end">
          <button onClick={() => setIsDark(!isDark)}>
            {isDark ? "☀️" : "🌙"}
          </button>
          <button className="w-8 h-8 rounded-full bg-ember/20 border border-ember/40 overflow-hidden">
            <img
              src="/placeholder-avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            className="md:hidden text-paper text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-white/5 px-6 py-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={mobileLinkStyles}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default NavBar;
