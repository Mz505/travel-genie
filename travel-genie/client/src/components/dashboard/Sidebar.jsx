import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Plane,
  Map,
  Wallet,
  Sparkles,
  Brain,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Kam Air Flights",
    path: "/dashboard/flights",
    icon: Plane,
  },
  {
    name: "Trips",
    path: "/dashboard/trips",
    icon: Map,
  },
  {
    name: "Budget",
    path: "/dashboard/budget",
    icon: Wallet,
  },
  {
    name: "Recommendations",
    path: "/dashboard/recommendations",
    icon: Sparkles,
  },
  {
    name: "Memory",
    path: "/dashboard/memory",
    icon: Brain,
  },
];

function Sidebar({ close }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (close) close();
    logout();
    navigate("/login");
  };

  const isAdmin = Boolean(user?.is_staff || user?.is_superuser);

  return (
    <aside
      className="
        fixed
        z-50
        top-6
        left-6
        w-[240px]
        h-[calc(100vh-48px)]
        rounded-[28px]
        p-5
        flex
        flex-col
        bg-white/80
        dark:bg-[#071625]/80
        backdrop-blur-3xl
        border
        border-gray-200
        dark:border-white/10
        shadow-xl
        transition-all
        duration-300
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-between">
        <h1
          className="
            text-2xl
            font-bold
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
            bg-clip-text
            text-transparent
          "
        >
          TravelGenie
        </h1>
        {isAdmin && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            Admin
          </span>
        )}
      </div>

      {/* Main Menu */}
      <nav
        className="
          mt-6
          flex-1
          space-y-1
          overflow-y-auto
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              onClick={() => close && close()}
              className={({ isActive }) =>
                `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  transition-all
                  duration-300
                  hover:translate-x-1
                  ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
                  }
                `
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div
        className="
          my-3
          border-t
          border-gray-200
          dark:border-white/10
        "
      />

      {/* Account Menu */}
      <div className="space-y-1">
        {isAdmin && (
          <>
            <NavLink
              to="/dashboard/kam-air-analytics"
              onClick={() => close && close()}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300 hover:translate-x-1 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                    : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                }`
              }
            >
              <BarChart3 size={18} />
              <span>Kam Air Analytics</span>
            </NavLink>

            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs transition-all duration-300 hover:translate-x-1 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 border border-cyan-500/20 mb-1"
            >
              <ShieldCheck size={16} />
              <span>Django Portal</span>
            </a>
          </>
        )}

        <NavLink
          to="/dashboard/profile"
          onClick={() => close && close()}
          className={({ isActive }) =>
            `
              w-full
              flex
              items-center
              gap-3
              px-4
              py-2.5
              rounded-xl
              text-sm
              transition-all
              duration-300
              hover:translate-x-1
              ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
              }
            `
          }
        >
          <User size={18} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/dashboard/settings"
          onClick={() => close && close()}
          className={({ isActive }) =>
            `
              w-full
              flex
              items-center
              gap-3
              px-4
              py-2.5
              rounded-xl
              text-sm
              transition-all
              duration-300
              hover:translate-x-1
              ${
                isActive
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-gray-100 dark:text-white/70 dark:hover:bg-white/10"
              }
            `
          }
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-2.5
            rounded-xl
            text-sm
            font-medium
            transition-all
            duration-300
            hover:translate-x-1
            text-red-500
            hover:bg-red-500/10
            dark:text-red-400
            dark:hover:bg-red-500/10
          "
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
