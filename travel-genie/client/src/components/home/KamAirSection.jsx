import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane,
  ArrowRight,
  ShieldCheck,
  Luggage,
  Sparkles,
  Calendar,
  Compass,
  ArrowLeftRight,
} from "lucide-react";
import { POPULAR_KAM_AIR_ROUTES, KAM_AIR_CITIES } from "../../data/kamAirRoutes";
import { useLocalization } from "../../context/LocalizationContext";

export default function KamAirSection() {
  const navigate = useNavigate();
  const { t, formatPrice } = useLocalization();

  const [origin, setOrigin] = useState("KBL");
  const [destination, setDestination] = useState("DXB");
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split("T")[0];
  });
  const [cabin, setCabin] = useState("economy");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/flights?origin=${origin}&destination=${destination}&date=${departureDate}&cabin=${cabin}`
    );
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <section className="relative overflow-hidden py-20 px-5 sm:px-10 lg:px-20 bg-gradient-to-b from-[#0b1c2d] to-[#07111F] text-white">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Plane size={14} className="rotate-45" />
            <span>TravelGenie × Kam Air Special Integration</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black tracking-tight"
          >
            Direct Flights from Kabul to the World
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300"
          >
            Search official Kam Air flight schedules, generate AI-tailored itineraries with visa guidance, and preview boarding passes — designed specifically for Afghan travelers.
          </motion.p>
        </div>

        {/* Search Widget */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl mb-12"
        >
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  {t("departureCity")}
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/15 text-white rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-400 [&>option]:bg-white [&>option]:text-gray-900 cursor-pointer"
                >
                  {KAM_AIR_CITIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-gray-900">
                      {c.name || c.city} ({c.code}) - {c.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-amber-400 transition hover:rotate-180 duration-300 cursor-pointer"
                  title="Swap Origin & Destination"
                >
                  <ArrowLeftRight size={16} />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  {t("destination")}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/15 text-white rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-400 [&>option]:bg-white [&>option]:text-gray-900 cursor-pointer"
                >
                  {KAM_AIR_CITIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-white text-gray-900">
                      {c.name || c.city} ({c.code}) - {c.country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="md:col-span-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  {t("departureDate")}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/15 text-white rounded-xl px-3 py-3 text-sm font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2 pt-2 md:pt-5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plane size={16} />
                  <span>{t("searchFlights")}</span>
                </button>
              </div>
            </div>

            {/* Popular Route Chips */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">{t("popularRoutes")}:</span>
              {POPULAR_KAM_AIR_ROUTES.slice(0, 5).map((route) => (
                <button
                  key={`${route.from}-${route.to}`}
                  type="button"
                  onClick={() => {
                    setOrigin(route.from);
                    setDestination(route.to);
                    navigate(
                      `/flights?origin=${route.from}&destination=${route.to}&date=${departureDate}`
                    );
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-slate-200 transition"
                >
                  {route.label} • {formatPrice(route.priceUSD)}
                </button>
              ))}
            </div>
          </form>
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-amber-500/30 transition">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Luggage size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Generous Afghan Baggage Allowance</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standard 30kg checked baggage + 7kg hand luggage on international routes, plus complimentary 5L Zamzam water allowance on Jeddah flights.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/30 transition">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Kam Air AI Travel Architect</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ask AI to craft complete trip itineraries aligned with Kam Air flight timetables, terminal tips at Kabul International, and real hotel/attraction ideas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/30 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold mb-2">Visa & Travel Advisory</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Real-time travel requirements, passport validity rules, and visa protocols for Afghan passport holders flying to Dubai, Istanbul, Delhi, and Tashkent.
            </p>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
          <div>
            <h4 className="font-bold text-lg text-white">Explore Full Timetables & Fleet Directory</h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse weekly schedules, Airbus A340 & Boeing 737 specifications, and ticketing offices in Kabul.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/kam-air"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-semibold text-white transition"
            >
              Flight Directory
            </Link>
            <Link
              to="/flights"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5"
            >
              <span>Search Flights</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
