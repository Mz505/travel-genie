import { useState, useEffect } from "react";
import { Menu, X, LogOut, LayoutDashboard, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "../Common/ThemeSwitcher";
import CurrencyAndLangSwitcher from "../Common/CurrencyAndLangSwitcher";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleGetStarted = () => {
    closeMenu();
    navigate("/signup");
  };

  return (
    <motion.nav
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className={`
        sticky
        top-0
        z-50
        w-full
        transition-all
        duration-500

        ${
          scrolled
            ? `
          bg-white/80
          dark:bg-[#07111F]/80
          backdrop-blur-xl
          shadow-lg
          border-b
          border-gray-200
          dark:border-white/10
          `
            : `
          bg-white/60
          dark:bg-[#07111F]/60
          backdrop-blur-lg
          `
        }
      `}
    >
      <div
        className="
          w-full
          h-20
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
          flex
          items-center
          justify-between
          gap-4
        "
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
            transition-colors
            shrink-0
            whitespace-nowrap
          "
        >
          Travel
          <span className="text-cyan-500">Genie</span>
        </Link>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-3
            xl:gap-5
            2xl:gap-7
            text-xs
            xl:text-sm
            font-medium
            text-gray-700
            dark:text-gray-300
            whitespace-nowrap
          "
        >
          <Link
            to="/flights"
            className="
              whitespace-nowrap
              inline-flex
              items-center
              gap-1.5
              px-2.5
              xl:px-3
              py-1.5
              rounded-full
              bg-amber-500/10
              border
              border-amber-500/25
              text-amber-500
              hover:text-amber-400
              hover:bg-amber-500/20
              font-semibold
              transition-all
            "
          >
            <Plane size={15} />
            <span><span className="hidden xl:inline">Kam Air </span>Flights</span>
          </Link>

          <Link
            to="/kam-air"
            className="
              whitespace-nowrap
              hover:text-cyan-500
              transition-colors
            "
          >
            <span className="hidden xl:inline">Kam Air </span>Directory
          </Link>

          <a
            href="/#guide"
            className="
              whitespace-nowrap
              hover:text-cyan-500
              transition-colors
            "
          >
            Guide
          </a>

          <a
            href="/#destinations"
            className="
              whitespace-nowrap
              hover:text-cyan-500
              transition-colors
            "
          >
            Destinations
          </a>

          <a
            href="/#features"
            className="
              whitespace-nowrap
              hover:text-cyan-500
              transition-colors
            "
          >
            Features
          </a>

          <a
            href="/#about"
            className="
              whitespace-nowrap
              hover:text-cyan-500
              transition-colors
            "
          >
            About
          </a>
        </div>

        {/* ==================================================
            DESKTOP BUTTONS
        ================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2.5
            xl:gap-3
            shrink-0
            whitespace-nowrap
          "
        >
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="
                  whitespace-nowrap
                  flex
                  items-center
                  gap-2
                  px-4
                  xl:px-5
                  py-2.5
                  rounded-full
                  bg-cyan-500/10
                  text-cyan-600
                  dark:text-cyan-400
                  font-semibold
                  text-sm
                  hover:bg-cyan-500/20
                  transition
                "
              >
                <LayoutDashboard size={17} />
                <span>Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  whitespace-nowrap
                  flex
                  items-center
                  gap-2
                  px-4
                  xl:px-5
                  py-2.5
                  rounded-full
                  border
                  border-red-500/20
                  text-red-500
                  hover:bg-red-500/10
                  font-semibold
                  text-sm
                  transition
                "
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="
                  whitespace-nowrap
                  px-3
                  xl:px-4
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-gray-200
                  hover:text-cyan-500
                  transition
                "
              >
                Login
              </Link>

              <button
                type="button"
                onClick={handleGetStarted}
                className="
                  whitespace-nowrap
                  px-4
                  xl:px-5
                  py-2.5
                  rounded-full
                  bg-cyan-500
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-cyan-400
                  hover:scale-105
                  transition
                "
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* ==================================================
            MOBILE BUTTONS
        ================================================== */}

        <div
          className="
            flex
            items-center
            gap-2
            lg:hidden
          "
        >
          <CurrencyAndLangSwitcher />
          <ThemeSwitcher />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              text-gray-900
              dark:text-white
            "
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      {open && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            lg:hidden
            bg-white/90
            dark:bg-[#07111F]/90
            backdrop-blur-xl
            border-t
            border-gray-200
            dark:border-white/10
          "
        >
          <div
            className="
              px-5
              py-6
              flex
              flex-col
              gap-5
              text-gray-700
              dark:text-gray-200
            "
          >
            <Link
              to="/flights"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-2
                font-semibold
                text-amber-500
                hover:text-amber-400
                transition
              "
            >
              <Plane size={18} />
              <span>Kam Air Flights</span>
            </Link>

            <Link
              to="/kam-air"
              onClick={closeMenu}
              className="
                hover:text-cyan-500
                transition
              "
            >
              Kam Air Directory
            </Link>

            {/* Guide */}

            <a
              href="/#guide"
              onClick={closeMenu}
              className="
                hover:text-cyan-500
                transition
              "
            >
              Guide
            </a>

            {/* Destinations */}

            <a
              href="/#destinations"
              onClick={closeMenu}
              className="
                hover:text-cyan-500
                transition
              "
            >
              Destinations
            </a>

            {/* Features */}

            <a
              href="/#features"
              onClick={closeMenu}
              className="
                hover:text-cyan-500
                transition
              "
            >
              Features
            </a>

            {/* About */}

            <a
              href="/#about"
              onClick={closeMenu}
              className="
                hover:text-cyan-500
                transition
              "
            >
              About
            </a>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-center
                    rounded-full
                    bg-cyan-500/10
                    text-cyan-600
                    dark:text-cyan-400
                    py-3
                    font-semibold
                    transition
                  "
                >
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    rounded-full
                    border
                    border-red-500/20
                    text-red-500
                    hover:bg-red-500/10
                    py-3
                    font-semibold
                    transition
                  "
                >
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="
                    text-center
                    rounded-full
                    border
                    border-gray-200
                    dark:border-white/10
                    py-3
                    font-medium
                    hover:text-cyan-500
                    transition
                  "
                >
                  Login
                </Link>

                <button
                  type="button"
                  onClick={handleGetStarted}
                  className="
                    rounded-full
                    bg-cyan-500
                    py-3
                    text-white
                    font-semibold
                    hover:bg-cyan-400
                    transition
                  "
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
