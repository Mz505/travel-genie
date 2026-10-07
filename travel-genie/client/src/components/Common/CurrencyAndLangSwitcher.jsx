import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
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
    <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
      {/* Currency Switcher */}
      <div className="relative shrink-0" ref={currRef}>
        <button
          type="button"
          onClick={() => {
            setCurrOpen(!currOpen);
            setLangOpen(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:border-[#F58220] transition duration-200 cursor-pointer shadow-sm"
          title="Select Currency"
        >
          <span className="text-[#F58220] font-black">
            {CURRENCIES[currency]?.symbol || "$"}
          </span>
          <span>{currency}</span>
          <ChevronDown size={12} className={`opacity-60 transition-transform duration-200 ${currOpen ? "rotate-180" : ""}`} />
        </button>

        {currOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#0B1F3A] border border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {Object.values(CURRENCIES).map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code);
                  setCurrOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  currency === c.code
                    ? "bg-[#F58220] text-white font-bold"
                    : "text-gray-200 hover:bg-white/10"
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
          onClick={() => {
            setLangOpen(!langOpen);
            setCurrOpen(false);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white hover:border-[#F58220] transition duration-200 cursor-pointer shadow-sm"
          title="Select Language"
        >
          <Globe size={13} className="text-[#F58220]" />
          <span>{LANGUAGES[language]?.nativeName || "EN"}</span>
          <ChevronDown size={12} className={`opacity-60 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
        </button>

        {langOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#0B1F3A] border border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            {Object.values(LANGUAGES).map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setLangOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  language === l.code
                    ? "bg-[#F58220] text-white font-bold"
                    : "text-gray-200 hover:bg-white/10"
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
