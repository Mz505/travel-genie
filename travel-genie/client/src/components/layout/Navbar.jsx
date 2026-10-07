import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Plane,
  Clock,
  Sparkles,
  Luggage,
  MapPin,
  Headphones,
  Ticket,
  ShieldCheck,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import CurrencyAndLangSwitcher from "../Common/CurrencyAndLangSwitcher";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    closeMenu();
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Book Flights", path: "/flights" },
    { name: "Flight Status", path: "/flight-status" },
    { name: "AI Assistant", path: "/assistant", highlight: true },
    { name: "My Trips", path: "/my-trip" },
    { name: "Destinations", path: "/destinations" },
    { name: "Travel Info", path: "/travel-info" },
    { name: "Support", path: "/support" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F3A]/98 text-white shadow-2xl backdrop-blur-xl border-b border-white/10"
          : "bg-[#0B1F3A] text-white border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* ================= BRAND LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 shrink-0 group py-1"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F58220] to-amber-500 flex items-center justify-center text-white shadow-lg shadow-[#F58220]/30 group-hover:scale-105 transition-transform duration-200">
            <Plane size={22} className="transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black tracking-tight text-white leading-none">
                KAM<span className="text-[#F58220]">AIR</span>
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase mt-0.5">
              AI Passenger Platform
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden xl:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2.5 transition duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  active
                    ? "text-[#F58220] font-bold"
                    : link.highlight
                    ? "text-amber-400 hover:text-amber-300 font-semibold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.highlight && <Sparkles size={14} className="text-amber-400" />}
                <span>{link.name}</span>
                {active && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F58220] rounded-full shadow-[0_0_8px_#F58220]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Staff Analytics Link (If staff/admin) */}
          {(user?.is_staff || user?.is_superuser) && (
            <Link
              to="/dashboard/kam-air-analytics"
              className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1 hover:bg-amber-500/25 transition"
            >
              <ShieldCheck size={13} />
              <span>Staff Portal</span>
            </Link>
          )}
        </div>

        {/* ================= DESKTOP UTILITIES & USER ================= */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-white/10">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] hover:brightness-110 text-white font-bold text-xs shadow-md shadow-[#F58220]/25 transition duration-200"
              >
                <LayoutDashboard size={15} />
                <span>Passenger Portal</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl border border-white/15 text-gray-300 hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/10 transition duration-200 cursor-pointer"
                title="Log Out"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-1 border-l border-white/10">
              <Link
                to="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition duration-200"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] hover:brightness-110 text-white text-xs font-bold shadow-md shadow-[#F58220]/25 transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ================= MOBILE TOGGLE & COMPACT UTILS ================= */}
        <div className="flex items-center gap-2 xl:hidden">
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 rounded-xl bg-white/10 border border-white/15 text-white hover:text-[#F58220] transition duration-200 cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-[#071625] border-t border-white/10 px-5 py-6 space-y-3 overflow-hidden shadow-2xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition ${
                      active
                        ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                        : link.highlight
                        ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.highlight && <Sparkles size={16} className="text-amber-400" />}
                  </Link>
                );
              })}
            </div>

            {/* User Auth Controls on Mobile */}
            <div className="pt-4 mt-2 border-t border-white/10 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] text-white font-bold text-sm shadow-md shadow-[#F58220]/25"
                  >
                    <LayoutDashboard size={18} />
                    <span>Passenger Portal</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-red-400/30 text-red-400 font-bold text-sm hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center p-3 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#F58220] text-white font-bold text-sm shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
