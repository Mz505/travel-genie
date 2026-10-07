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
import { motion } from "framer-motion";
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

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F3A]/95 text-white shadow-xl backdrop-blur-md border-b border-white/10"
          : "bg-[#0B1F3A] text-white border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 shrink-0 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#F58220] flex items-center justify-center text-white shadow-md shadow-[#F58220]/30 group-hover:scale-105 transition">
            <Plane size={22} className="transform -rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-white leading-none">
              KAM<span className="text-[#F58220]">AIR</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-amber-400/90 uppercase mt-0.5">
              AI Passenger Platform
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-gray-200">
          
          <Link
            to="/flights"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/flights")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <Plane size={15} />
            <span>Search Flights</span>
          </Link>

          <Link
            to="/flight-status"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/flight-status")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <Clock size={15} />
            <span>Flight Status</span>
          </Link>

          <Link
            to="/assistant"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/assistant")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-amber-400 hover:text-amber-300 font-bold"
            }`}
          >
            <Sparkles size={15} className="text-amber-400" />
            <span>AI Assistant</span>
          </Link>

          <Link
            to="/my-trip"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/my-trip")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <Ticket size={15} />
            <span>My Trips</span>
          </Link>

          <Link
            to="/destinations"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/destinations")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <MapPin size={15} />
            <span>Destinations</span>
          </Link>

          <Link
            to="/travel-info"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/travel-info")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <Luggage size={15} />
            <span>Baggage & Info</span>
          </Link>

          <Link
            to="/support"
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition ${
              isActive("/support")
                ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                : "hover:bg-white/10 text-gray-200 hover:text-white"
            }`}
          >
            <Headphones size={15} />
            <span>Support</span>
          </Link>

          {/* Staff Analytics Link (If staff/admin) */}
          {(user?.is_staff || user?.is_superuser) && (
            <Link
              to="/dashboard/kam-air-analytics"
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 hover:bg-amber-500/30 transition"
            >
              <ShieldCheck size={14} />
              <span>Staff Portal</span>
            </Link>
          )}
        </div>

        {/* ================= DESKTOP UTILITIES & USER ================= */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition border border-white/10"
              >
                <LayoutDashboard size={15} className="text-[#F58220]" />
                <span>Passenger Hub</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="p-2.5 rounded-xl border border-red-400/30 text-red-400 hover:bg-red-500/10 transition"
                title="Log Out"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white text-xs font-bold shadow-md shadow-[#F58220]/25 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <div className="flex items-center gap-2 xl:hidden">
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="p-2 text-white hover:text-[#F58220] transition"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="xl:hidden bg-[#0B1F3A] border-t border-white/10 px-5 py-6 space-y-3"
        >
          <Link
            to="/flights"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <Plane size={18} className="text-[#F58220]" />
            <span>Search Flights</span>
          </Link>

          <Link
            to="/flight-status"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <Clock size={18} className="text-[#F58220]" />
            <span>Flight Status</span>
          </Link>

          <Link
            to="/assistant"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-500/10 text-amber-300 text-sm font-bold border border-amber-500/20"
          >
            <Sparkles size={18} className="text-amber-400" />
            <span>Kam Air AI Assistant</span>
          </Link>

          <Link
            to="/my-trip"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <Ticket size={18} className="text-[#F58220]" />
            <span>My Trips & E-Ticket</span>
          </Link>

          <Link
            to="/destinations"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <MapPin size={18} className="text-[#F58220]" />
            <span>Destinations & Routes</span>
          </Link>

          <Link
            to="/travel-info"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <Luggage size={18} className="text-[#F58220]" />
            <span>Baggage Policy & Travel Info</span>
          </Link>

          <Link
            to="/support"
            onClick={closeMenu}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 text-white text-sm font-semibold"
          >
            <Headphones size={18} className="text-[#F58220]" />
            <span>Customer Support</span>
          </Link>

          {/* User Auth Controls on Mobile */}
          <div className="pt-4 mt-2 border-t border-white/10 space-y-2">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-white/10 text-white font-bold text-sm"
                >
                  <LayoutDashboard size={18} />
                  <span>Passenger Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl border border-red-400/30 text-red-400 font-bold text-sm"
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center p-3 rounded-xl border border-white/20 text-white font-bold text-sm"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center p-3 rounded-xl bg-[#F58220] text-white font-bold text-sm shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
