import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plane,
  Clock,
  Sparkles,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Search,
  ShieldCheck,
  Luggage,
  Compass,
} from "lucide-react";
import { KAM_AIR_CITIES } from "../../data/kamAirRoutes";

export default function Hero() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("flight"); // 'flight', 'status', 'assistant'

  // Flight search widget state
  const [origin, setOrigin] = useState("KBL");
  const [destination, setDestination] = useState("DXB");
  const [departureDate, setDepartureDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split("T")[0];
  });
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");

  // Flight status widget state
  const [statusFlightNo, setStatusFlightNo] = useState("RQ-901");

  // AI query widget state
  const [aiQuery, setAiQuery] = useState("");

  const handleFlightSearch = (e) => {
    e.preventDefault();
    navigate(
      `/flights?origin=${origin}&destination=${destination}&date=${departureDate}&passengers=${passengers}&cabin=${cabinClass}`
    );
  };

  const handleStatusSearch = (e) => {
    e.preventDefault();
    navigate(`/flight-status?flight=${encodeURIComponent(statusFlightNo)}`);
  };

  const handleAiAssistantSubmit = (e) => {
    e.preventDefault();
    const q = aiQuery.trim() || "What flights are available from Kabul to Dubai?";
    navigate(`/assistant?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] text-white py-10 sm:py-14 lg:py-20 px-3.5 sm:px-6 lg:px-8">
      {/* Subtle Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F58220]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">
        
        {/* Main Headline & Supporting Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#F58220]/15 border border-[#F58220]/30 text-[#F58220] text-xs font-bold"
          >
            <Plane size={15} className="transform -rotate-45" />
            <span>Official Digital Passenger Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]"
          >
            Your Journey Starts with <span className="text-[#F58220]">Kam Air</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Search flights, manage your journey, check flight information, and get personalized travel assistance in one place.
          </motion.p>

          {/* Primary Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-2"
          >
            <Link
              to="/flights"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white font-bold text-sm shadow-lg shadow-[#F58220]/30 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plane size={18} />
              <span>Search Flights</span>
            </Link>

            <Link
              to="/assistant"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={18} className="text-amber-400" />
              <span>AI Travel Assistant</span>
            </Link>
          </motion.div>
        </div>

        {/* ================= HERO INTERACTIVE WIDGET ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto rounded-3xl bg-white text-gray-900 dark:bg-[#071625] dark:text-white p-4 sm:p-8 shadow-2xl border border-gray-100 dark:border-white/10"
        >
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-3 mb-5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("flight")}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === "flight"
                  ? "bg-[#0B1F3A] text-white dark:bg-[#F58220]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <Plane size={15} />
              <span>Book Flight</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("status")}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === "status"
                  ? "bg-[#0B1F3A] text-white dark:bg-[#F58220]"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <Clock size={15} />
              <span>Flight Status</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("assistant")}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 ${
                activeTab === "assistant"
                  ? "bg-[#0B1F3A] text-white dark:bg-[#F58220]"
                  : "text-amber-600 dark:text-amber-400 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              <Sparkles size={15} />
              <span>AI Concierge</span>
            </button>
          </div>

          {/* TAB 1: FLIGHT SEARCH WIDGET */}
          {activeTab === "flight" && (
            <form onSubmit={handleFlightSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* From */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    From (Origin)
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-3 py-3 text-xs font-bold outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                    >
                      <option value="KBL">Kabul (KBL) - Hub</option>
                      <option value="DXB">Dubai (DXB)</option>
                      <option value="IST">Istanbul (IST)</option>
                      <option value="JED">Jeddah (JED)</option>
                      <option value="DEL">Delhi (DEL)</option>
                      <option value="TAS">Tashkent (TAS)</option>
                      <option value="HEA">Herat (HEA)</option>
                      <option value="MZR">Mazar (MZR)</option>
                    </select>
                  </div>
                </div>

                {/* To */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    To (Destination)
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F58220]" />
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-3 py-3 text-xs font-bold outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                    >
                      <option value="DXB">Dubai (DXB) - UAE</option>
                      <option value="IST">Istanbul (IST) - Turkey</option>
                      <option value="JED">Jeddah (JED) - Umrah</option>
                      <option value="DEL">Delhi (DEL) - India</option>
                      <option value="TAS">Tashkent (TAS) - Uzbekistan</option>
                      <option value="ISB">Islamabad (ISB) - Pakistan</option>
                      <option value="KBL">Kabul (KBL)</option>
                      <option value="HEA">Herat (HEA)</option>
                      <option value="MZR">Mazar-i-Sharif (MZR)</option>
                    </select>
                  </div>
                </div>

                {/* Departure Date */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-3 py-2.5 text-xs font-bold outline-none focus:border-[#F58220]"
                    />
                  </div>
                </div>

                {/* Passengers & Class */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Passengers & Class
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-2 py-3 text-xs font-bold outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4+ Family</option>
                    </select>

                    <select
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-2 py-3 text-xs font-bold outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                    >
                      <option value="Economy">Economy</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Luggage size={14} className="text-[#F58220]" />
                    <span>30 kg Checked Baggage Included</span>
                  </span>
                  <span className="flex items-center gap-1 hidden sm:flex">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Verified Schedule</span>
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white font-bold text-sm shadow-md shadow-[#F58220]/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search size={16} />
                  <span>Search Kam Air Flights</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: FLIGHT STATUS WIDGET */}
          {activeTab === "status" && (
            <form onSubmit={handleStatusSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-8">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                    Enter Flight Number
                  </label>
                  <input
                    type="text"
                    value={statusFlightNo}
                    onChange={(e) => setStatusFlightNo(e.target.value)}
                    placeholder="e.g. RQ-901 (Dubai) or RQ-101 (Istanbul)"
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm font-semibold outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0B1F3A] dark:bg-[#F58220] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Clock size={16} />
                    <span>Check Live Status</span>
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Track departure time, estimated arrival, boarding gate, and terminal information for today's flights.
              </p>
            </form>
          )}

          {/* TAB 3: AI ASSISTANT WIDGET */}
          {activeTab === "assistant" && (
            <form onSubmit={handleAiAssistantSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask anything: baggage allowance, Dubai visa rules, Zamzam water, flight times..."
                  className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                />

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Sparkles size={16} />
                  <span>Ask Assistant</span>
                </button>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Try:</span>
                {["Kabul to Dubai schedule", "Umrah Zamzam allowance", "Baggage for Business"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => {
                      setAiQuery(chip);
                      navigate(`/assistant?q=${encodeURIComponent(chip)}`);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 hover:text-[#F58220] transition whitespace-nowrap cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </form>
          )}
        </motion.div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 text-center">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <h4 className="font-black text-lg sm:text-xl text-[#F58220]">30 kg + 7 kg</h4>
            <p className="text-[11px] sm:text-xs text-gray-300">Generous Economy Baggage</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <h4 className="font-black text-lg sm:text-xl text-amber-400">5 Liters</h4>
            <p className="text-[11px] sm:text-xs text-gray-300">Complimentary Zamzam Water</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <h4 className="font-black text-lg sm:text-xl text-white">Daily Flights</h4>
            <p className="text-[11px] sm:text-xs text-gray-300">Kabul ↔ Dubai & Istanbul</p>
          </div>
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <h4 className="font-black text-lg sm:text-xl text-emerald-400">24/7 AI Desk</h4>
            <p className="text-[11px] sm:text-xs text-gray-300">Instant Passenger Support</p>
          </div>
        </div>

      </div>
    </section>
  );
}
