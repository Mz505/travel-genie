import { useState, useRef, useEffect } from "react";
import { Plane, Calendar, Users, ArrowRightLeft, Search, Sparkles, ChevronDown, Check } from "lucide-react";
import { KAM_AIR_CITIES } from "../../data/kamAirRoutes";
import { useLocalization } from "../../context/LocalizationContext";

export default function FlightSearchCard({ onSearch, initialParams = {} }) {
  const { t } = useLocalization();

  const [tripType, setTripType] = useState(initialParams.tripType || "roundTrip");
  const [origin, setOrigin] = useState(initialParams.origin || "KBL");
  const [destination, setDestination] = useState(initialParams.destination || "DXB");
  const [departureDate, setDepartureDate] = useState(
    initialParams.departureDate || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    initialParams.returnDate || new Date(Date.now() + 86400000 * 9).toISOString().split("T")[0]
  );
  const [passengers, setPassengers] = useState(initialParams.passengers || 1);
  const [cabinClass, setCabinClass] = useState(initialParams.cabinClass || "Economy");

  // Custom dropdown open states
  const [isCabinOpen, setIsCabinOpen] = useState(false);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);

  // Search queries for city dropdowns
  const [originQuery, setOriginQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");

  const cabinRef = useRef(null);
  const passengersRef = useRef(null);
  const originRef = useRef(null);
  const destRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cabinRef.current && !cabinRef.current.contains(e.target)) {
        setIsCabinOpen(false);
      }
      if (passengersRef.current && !passengersRef.current.contains(e.target)) {
        setIsPassengersOpen(false);
      }
      if (originRef.current && !originRef.current.contains(e.target)) {
        setIsOriginOpen(false);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setIsDestOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({
        origin,
        destination,
        departureDate,
        returnDate: tripType === "roundTrip" ? returnDate : null,
        passengers: Number(passengers),
        cabinClass,
        tripType,
      });
    }
  };

  const cabinClassOptions = [
    { value: "Economy", label: t("economy") || "Economy" },
    { value: "Business", label: t("business") || "Business Class" },
  ];

  const passengerOptions = [
    { value: 1, label: "1 Passenger" },
    { value: 2, label: "2 Passengers" },
    { value: 3, label: "3 Passengers" },
    { value: 4, label: "4+ Passengers" },
  ];

  const selectedOriginCity = KAM_AIR_CITIES.find((c) => c.code === origin) || {
    name: origin,
    code: origin,
    country: "",
  };

  const selectedDestCity = KAM_AIR_CITIES.find((c) => c.code === destination) || {
    name: destination,
    code: destination,
    country: "",
  };

  const filteredOriginCities = KAM_AIR_CITIES.filter((c) => {
    const q = originQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      (c.country && c.country.toLowerCase().includes(q))
    );
  });

  const filteredDestCities = KAM_AIR_CITIES.filter((c) => {
    const q = destQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      (c.country && c.country.toLowerCase().includes(q))
    );
  });

  const popularRoutes = [
    { from: "KBL", to: "DXB", label: "Kabul → Dubai" },
    { from: "KBL", to: "IST", label: "Kabul → Istanbul" },
    { from: "KBL", to: "JED", label: "Kabul → Jeddah" },
    { from: "KBL", to: "DEL", label: "Kabul → Delhi" },
    { from: "KBL", to: "HEA", label: "Kabul → Herat" },
  ];

  return (
    <div className="w-full rounded-3xl bg-white/80 dark:bg-[#071625]/85 backdrop-blur-2xl border border-gray-200 dark:border-white/10 p-6 sm:p-8 shadow-2xl">
      {/* Top Controls: Trip Type & Cabin & Passengers */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold">
          <button
            type="button"
            onClick={() => setTripType("roundTrip")}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              tripType === "roundTrip"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t("round_trip")}
          </button>
          <button
            type="button"
            onClick={() => setTripType("oneWay")}
            className={`px-4 py-2 rounded-xl transition cursor-pointer ${
              tripType === "oneWay"
                ? "bg-amber-500 text-white shadow-sm"
                : "text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {t("one_way")}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Cabin Class Dropdown */}
          <div className="relative" ref={cabinRef}>
            <button
              type="button"
              onClick={() => {
                setIsCabinOpen(!isCabinOpen);
                setIsPassengersOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/15 transition cursor-pointer"
            >
              <span>{cabinClassOptions.find((o) => o.value === cabinClass)?.label || cabinClass}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCabinOpen ? "rotate-180 text-amber-500" : "text-gray-400 dark:text-white/60"}`}
              />
            </button>

            {isCabinOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {cabinClassOptions.map((opt) => {
                  const isSelected = cabinClass === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCabinClass(opt.value);
                        setIsCabinOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-white shadow-sm"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-amber-600 dark:hover:text-amber-400"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={14} className="text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Custom Passengers Dropdown */}
          <div className="relative" ref={passengersRef}>
            <button
              type="button"
              onClick={() => {
                setIsPassengersOpen(!isPassengersOpen);
                setIsCabinOpen(false);
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/15 transition cursor-pointer"
            >
              <span>{passengerOptions.find((p) => p.value === passengers)?.label || `${passengers} Passenger${passengers > 1 ? "s" : ""}`}</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isPassengersOpen ? "rotate-180 text-amber-500" : "text-gray-400 dark:text-white/60"}`}
              />
            </button>

            {isPassengersOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {passengerOptions.map((opt) => {
                  const isSelected = passengers === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setPassengers(opt.value);
                        setIsPassengersOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left cursor-pointer ${
                        isSelected
                          ? "bg-amber-500 text-white shadow-sm"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-amber-600 dark:hover:text-amber-400"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check size={14} className="text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Search Inputs */}
      <form onSubmit={handleSearchSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Origin Custom Dropdown */}
          <div className="md:col-span-3 relative" ref={originRef}>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1">
              {t("origin")}
            </label>
            <button
              type="button"
              onClick={() => {
                setIsOriginOpen(!isOriginOpen);
                setIsDestOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition font-bold text-sm text-gray-900 dark:text-white outline-none cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 truncate">
                <Plane size={15} className="text-amber-500 shrink-0" />
                <span className="truncate">
                  {selectedOriginCity.name}{" "}
                  <span className="text-amber-500 font-extrabold">({selectedOriginCity.code})</span>
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${isOriginOpen ? "rotate-180 text-amber-500" : ""}`}
              />
            </button>

            {isOriginOpen && (
              <div className="absolute left-0 mt-2 w-full min-w-[280px] max-w-[340px] rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 mb-1.5 border-b border-gray-100 dark:border-white/5">
                  <input
                    type="text"
                    value={originQuery}
                    onChange={(e) => setOriginQuery(e.target.value)}
                    placeholder="Search departure city or code..."
                    autoFocus
                    className="w-full px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 outline-none focus:border-amber-500"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                  {filteredOriginCities.length === 0 ? (
                    <div className="py-4 text-center text-xs text-gray-400 dark:text-white/40">
                      No matching cities found
                    </div>
                  ) : (
                    filteredOriginCities.map((c) => {
                      const isSelected = c.code === origin;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setOrigin(c.code);
                            setIsOriginOpen(false);
                            setOriginQuery("");
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                            isSelected
                              ? "bg-amber-500 text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-amber-600 dark:hover:text-amber-400"
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-bold">{c.name}</span>
                            <span className={`ml-1.5 font-bold ${isSelected ? "text-amber-100" : "text-amber-500"}`}>
                              ({c.code})
                            </span>
                            <span className={`ml-1 text-[11px] ${isSelected ? "text-white/80" : "text-gray-400 dark:text-white/40"}`}>
                              · {c.country}
                            </span>
                          </div>
                          {isSelected && <Check size={14} className="text-white shrink-0 ml-2" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center -my-2 md:my-0">
            <button
              type="button"
              onClick={handleSwap}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-white/80 hover:bg-amber-500 hover:text-white transition shadow-sm cursor-pointer"
              title="Swap origin and destination"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* Destination Custom Dropdown */}
          <div className="md:col-span-3 relative" ref={destRef}>
            <label className="block text-[11px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1">
              {t("destination")}
            </label>
            <button
              type="button"
              onClick={() => {
                setIsDestOpen(!isDestOpen);
                setIsOriginOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-amber-500/50 dark:hover:border-amber-500/50 transition font-bold text-sm text-gray-900 dark:text-white outline-none cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 truncate">
                <Plane size={15} className="text-amber-500 shrink-0" />
                <span className="truncate">
                  {selectedDestCity.name}{" "}
                  <span className="text-amber-500 font-extrabold">({selectedDestCity.code})</span>
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${isDestOpen ? "rotate-180 text-amber-500" : ""}`}
              />
            </button>

            {isDestOpen && (
              <div className="absolute left-0 mt-2 w-full min-w-[280px] max-w-[340px] rounded-2xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/15 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 mb-1.5 border-b border-gray-100 dark:border-white/5">
                  <input
                    type="text"
                    value={destQuery}
                    onChange={(e) => setDestQuery(e.target.value)}
                    placeholder="Search arrival city or code..."
                    autoFocus
                    className="w-full px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/40 outline-none focus:border-amber-500"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                  {filteredDestCities.length === 0 ? (
                    <div className="py-4 text-center text-xs text-gray-400 dark:text-white/40">
                      No matching cities found
                    </div>
                  ) : (
                    filteredDestCities.map((c) => {
                      const isSelected = c.code === destination;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setDestination(c.code);
                            setIsDestOpen(false);
                            setDestQuery("");
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition text-left cursor-pointer ${
                            isSelected
                              ? "bg-amber-500 text-white"
                              : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-amber-600 dark:hover:text-amber-400"
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-bold">{c.name}</span>
                            <span className={`ml-1.5 font-bold ${isSelected ? "text-amber-100" : "text-amber-500"}`}>
                              ({c.code})
                            </span>
                            <span className={`ml-1 text-[11px] ${isSelected ? "text-white/80" : "text-gray-400 dark:text-white/40"}`}>
                              · {c.country}
                            </span>
                          </div>
                          {isSelected && <Check size={14} className="text-white shrink-0 ml-2" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="md:col-span-3 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1 truncate">
                {t("departure_date")}
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full px-3 py-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-500 dark:text-white/50 uppercase tracking-wider mb-1 truncate">
                {t("return_date")}
              </label>
              <input
                type="date"
                value={returnDate}
                disabled={tripType === "oneWay"}
                onChange={(e) => setReturnDate(e.target.value)}
                className={`w-full px-3 py-3 rounded-2xl border font-bold text-xs sm:text-sm text-gray-900 dark:text-white outline-none ${
                  tripType === "oneWay"
                    ? "bg-gray-100 dark:bg-white/[0.02] border-transparent opacity-40 cursor-not-allowed"
                    : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 focus:border-amber-500"
                }`}
              />
            </div>
          </div>

          {/* Search CTA */}
          <div className="md:col-span-2 pt-2 md:pt-4">
            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-sm shadow-lg shadow-amber-500/25 hover:scale-[1.02] transition cursor-pointer"
            >
              <Search size={18} />
              <span>{t("search_flights")}</span>
            </button>
          </div>
        </div>
      </form>

      {/* Popular Route Shortcuts */}
      <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-gray-400 dark:text-white/40 font-medium">Popular Kam Air Routes:</span>
        {popularRoutes.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => {
              setOrigin(r.from);
              setDestination(r.to);
              if (onSearch) {
                onSearch({
                  origin: r.from,
                  destination: r.to,
                  departureDate,
                  returnDate: tripType === "roundTrip" ? returnDate : null,
                  passengers,
                  cabinClass,
                  tripType,
                });
              }
            }}
            className="px-3 py-1 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-amber-500/10 hover:text-amber-500 text-gray-700 dark:text-white/70 font-semibold transition cursor-pointer"
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
