import { Link, NavLink } from "react-router";
import { useAuth } from "../AuthContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/habits", label: "Habits" },
  { to: "/goals", label: "Goals" },
  { to: "/tasks", label: "Tasks" },
];

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-100/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-stone-900"
        >
          CADENCE
        </Link>

        <nav className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-2 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm ${
                  isActive
                    ? "bg-stone-900 text-white"
                    : "text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-xs text-stone-500 hover:text-stone-900"
          >
            Log out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
