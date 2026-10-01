import { useState, useRef, useEffect } from "react";
import { Globe, DollarSign, ChevronDown } from "lucide-react";
import { useLocalization, CURRENCIES, LANGUAGES } from "../../context/LocalizationContext";

export default function CurrencyAndLangSwitcher({ compact = false }) {
  const { currency, setCurrency, language, setLanguage } = useLocalization();
  const [langOpen, setLangOpen] = useState(false);
  const [currOpen, setCurrOpen] = useState(false);

  const langRef = useRef(null);
  const currRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (currRef.current && !currRef.current.contains(e.target)) {
        setCurrOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
      {/* Currency Switcher */}
      <div className="relative shrink-0" ref={currRef}>
        <button
          type="button"
          onClick={() => setCurrOpen(!currOpen)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/70 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-white backdrop-blur-md hover:border-cyan-400 transition shadow-sm whitespace-nowrap shrink-0"
          title="Change Currency"
        >
          <span className="text-cyan-500 font-extrabold">
            {CURRENCIES[currency]?.symbol || "$"}
          </span>
          <span>{currency}</span>
          <ChevronDown size={12} className={`opacity-60 transition ${currOpen ? "rotate-180" : ""}`} />
        </button>

        {currOpen && (
          <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-white/95 dark:bg-[#071625]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl p-1.5 z-50">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setCurrOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  currency === c.code
                    ? "bg-cyan-500 text-white"
                    : "text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                <span>{c.code}</span>
                <span className="opacity-80">{c.symbol}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Language Switcher */}
      <div className="relative shrink-0" ref={langRef}>
        <button
          type="button"
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/70 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-800 dark:text-white backdrop-blur-md hover:border-cyan-400 transition shadow-sm whitespace-nowrap shrink-0"
          title="Change Language"
        >
          <Globe size={13} className="text-cyan-500" />
          <span>{LANGUAGES[language]?.nativeName || "EN"}</span>
          <ChevronDown size={12} className={`opacity-60 transition ${langOpen ? "rotate-180" : ""}`} />
        </button>

        {langOpen && (
          <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-white/95 dark:bg-[#071625]/95 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-xl p-1.5 z-50">
            {Object.values(LANGUAGES).map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setLangOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  language === l.code
                    ? "bg-cyan-500 text-white"
                    : "text-gray-700 dark:text-white/80 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                <span>{l.nativeName}</span>
                <span className="text-[10px] opacity-70">({l.code.toUpperCase()})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
