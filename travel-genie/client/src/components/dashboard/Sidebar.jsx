import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  Plane,
  Clock,
  Sparkles,
  Ticket,
  Map,
  Wallet,
  Brain,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  BarChart3,
  ExternalLink,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Book Flights",
    path: "/dashboard/flights",
    icon: Plane,
  },
  {
    name: "Flight Status",
    path: "/dashboard/flight-status",
    icon: Clock,
  },
  {
    name: "AI Concierge",
    path: "/dashboard/assistant",
    icon: Sparkles,
  },
  {
    name: "My E-Tickets",
    path: "/dashboard/my-trip",
    icon: Ticket,
  },
  {
    name: "Trip Plans",
    path: "/dashboard/trips",
    icon: Map,
  },
  {
    name: "Budget",
    path: "/dashboard/budget",
    icon: Wallet,
  },
  {
    name: "Memories",
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
        w-[248px]
        h-[calc(100vh-48px)]
        rounded-[28px]
        p-5
        flex
        flex-col
        bg-white/90
        dark:bg-[#071625]/90
        backdrop-blur-3xl
        border
        border-gray-200
        dark:border-white/10
        shadow-2xl
        transition-all
        duration-300
      "
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58220] to-amber-500 flex items-center justify-center text-white shadow-md shadow-[#F58220]/25">
            <Plane size={18} className="transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-[#0B1F3A] dark:text-white">
                KAM<span className="text-[#F58220]">AIR</span>
              </span>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-white/40">
              Passenger Portal
            </div>
          </div>
        </div>
        {isAdmin && (
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Admin
          </span>
        )}
      </div>

      {/* Main Menu */}
      <nav
        className="
          mt-4
          flex-1
          space-y-1
          overflow-y-auto
          pr-1
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
                  px-3.5
                  py-2.5
                  rounded-xl
                  text-xs
                  font-semibold
                  transition-all
                  duration-200
                  hover:translate-x-1
                  ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                      : "text-gray-700 hover:bg-amber-500/10 hover:text-[#F58220] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                  }
                `
              }
            >
              <Icon size={17} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div
        className="
          my-2.5
          border-t
          border-gray-200
          dark:border-white/10
        "
      />

      {/* Account Menu */}
      <div className="space-y-1 pt-1">
        {isAdmin && (
          <>
            <NavLink
              to="/dashboard/kam-air-analytics"
              onClick={() => close && close()}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 hover:translate-x-1 ${
                  isActive
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
                    : "text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                }`
              }
            >
              <BarChart3 size={16} />
              <span>Executive Analytics</span>
            </NavLink>

            <a
              href="http://127.0.0.1:8000/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl text-[11px] font-medium transition-all duration-200 hover:translate-x-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 mb-1"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#F58220]" />
                <span>Django Admin</span>
              </div>
              <ExternalLink size={12} />
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
              px-3.5
              py-2
              rounded-xl
              text-xs
              font-semibold
              transition-all
              duration-200
              hover:translate-x-1
              ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-[#F58220] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 dark:text-white/75 dark:hover:bg-white/10"
              }
            `
          }
        >
          <User size={16} />
          <span>Passenger Profile</span>
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
              px-3.5
              py-2
              rounded-xl
              text-xs
              font-semibold
              transition-all
              duration-200
              hover:translate-x-1
              ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-[#F58220] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 dark:text-white/75 dark:hover:bg-white/10"
              }
            `
          }
        >
          <Settings size={16} />
          <span>Preferences</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-3.5
            py-2
            rounded-xl
            text-xs
            font-semibold
            transition-all
            duration-200
            hover:translate-x-1
            text-red-500
            hover:bg-red-500/10
            dark:text-red-400
            dark:hover:bg-red-500/10
            cursor-pointer
          "
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
