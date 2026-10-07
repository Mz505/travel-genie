import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

function ThemeSwitcher() {
  const { theme, changeTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    changeTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        p-2
        rounded-xl
        bg-white/10
        border
        border-white/15
        text-white/80
        hover:text-white
        hover:border-[#F58220]
        transition
        duration-200
        cursor-pointer
        flex
        items-center
        justify-center
        shrink-0
      "
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun size={16} className="text-amber-400 animate-in spin-in-180 duration-300" />
      ) : (
        <Moon size={16} className="text-blue-300 animate-in spin-in-180 duration-300" />
      )}
    </button>
  );
}

export default ThemeSwitcher;
