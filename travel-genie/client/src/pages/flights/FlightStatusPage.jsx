import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import { Plane, Search, Clock, MapPin, AlertCircle, CheckCircle2, ShieldAlert, RefreshCw } from "lucide-react";
import { KAM_AIR_SCHEDULES, KAM_AIR_CITIES } from "../../data/kamAirRoutes";

export default function FlightStatusPage() {
  const [searchParams] = useSearchParams();
  const initialFlight = searchParams.get("flight") || "";

  const [flightNumber, setFlightNumber] = useState(initialFlight);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusResults, setStatusResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      let filtered = [...KAM_AIR_SCHEDULES];

      if (flightNumber.trim()) {
        const clean = flightNumber.trim().toUpperCase().replace(/\s+/g, "");
        filtered = filtered.filter(
          (f) =>
            f.flightNumber.toUpperCase().replace("-", "") === clean.replace("-", "") ||
            f.flightNumber.toUpperCase() === clean
        );
      } else if (selectedRoute) {
        const [orig, dest] = selectedRoute.split("-");
        filtered = filtered.filter((f) => f.origin === orig && f.destination === dest);
      }

      // Enrich with status telemetry simulation
      const enriched = filtered.map((f, idx) => {
        const statuses = ["On Time", "On Time", "Scheduled", "Boarding", "Departed"];
        const simStatus = f.status || statuses[idx % statuses.length];
        return {
          ...f,
          status: simStatus,
          gate: `Gate 0${(idx % 4) + 1}`,
          baggageBelt: `Belt 0${(idx % 3) + 1}`,
          terminal: f.origin === "DXB" ? "Terminal 2" : f.origin === "DEL" ? "Terminal 3" : "Main Terminal",
          date: selectedDate,
        };
      });

      setStatusResults(enriched);
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    if (initialFlight) {
      handleSearch();
    } else {
      // Default load
      handleSearch();
    }
  }, [initialFlight]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "On Time":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "Boarding":
        return "bg-[#F58220]/15 text-[#F58220] border-[#F58220]/30 font-bold animate-pulse";
      case "Departed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "Delayed":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <Clock size={14} />
            <span>Real-Time Flight Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Kam Air Flight Status
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Check departure times, arrival updates, gates, and operational status for all Kam Air domestic and international flights.
          </p>
        </div>

        {/* Prototype Transparency Alert */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
          <ShieldAlert size={18} className="shrink-0 mt-0.5 text-[#F58220]" />
          <div>
            <span className="font-bold">Prototype Proposal Demonstration:</span> Flight telemetry, boarding times, and gates displayed are simulated prototype service-layer data. Operational schedules are aligned with Kam Air's published network.
          </div>
        </div>

        {/* Search Filter Card */}
        <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/80 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* By Flight Number */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Flight Number
              </label>
              <div className="relative">
                <Plane size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => {
                    setFlightNumber(e.target.value);
                    if (e.target.value) setSelectedRoute("");
                  }}
                  placeholder="e.g. RQ-901 or RQ-101"
                  className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-10 pr-4 py-3 text-sm font-semibold outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20"
                />
              </div>
            </div>

            {/* By Route */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Or Select Route
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => {
                  setSelectedRoute(e.target.value);
                  if (e.target.value) setFlightNumber("");
                }}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm font-semibold outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 text-gray-900 dark:text-white"
              >
                <option value="">All Kam Air Routes</option>
                <option value="KBL-DXB">Kabul (KBL) → Dubai (DXB)</option>
                <option value="DXB-KBL">Dubai (DXB) → Kabul (KBL)</option>
                <option value="KBL-IST">Kabul (KBL) → Istanbul (IST)</option>
                <option value="IST-KBL">Istanbul (IST) → Kabul (KBL)</option>
                <option value="KBL-JED">Kabul (KBL) → Jeddah (JED)</option>
                <option value="KBL-DEL">Kabul (KBL) → Delhi (DEL)</option>
                <option value="KBL-TAS">Kabul (KBL) → Tashkent (TAS)</option>
                <option value="KBL-ISB">Kabul (KBL) → Islamabad (ISB)</option>
                <option value="KBL-HEA">Kabul (KBL) → Herat (HEA)</option>
                <option value="KBL-MZR">Kabul (KBL) → Mazar (MZR)</option>
              </select>
            </div>

            {/* Date */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1.5">
                Flight Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-3 text-sm font-semibold outline-none focus:border-[#F58220]"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white py-3.5 px-4 font-bold text-sm shadow-md shadow-[#F58220]/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />}
                <span>Check Status</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
              Flight Status Results ({statusResults.length})
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Live Updates for {selectedDate}
            </span>
          </div>

          {statusResults.length === 0 ? (
            <div className="text-center py-12 rounded-3xl bg-white dark:bg-[#0B1F3A]/50 border border-gray-100 dark:border-white/10 p-8 space-y-3">
              <AlertCircle size={36} className="mx-auto text-gray-400" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">No Matching Flights Found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No scheduled Kam Air flights matched your query for this date. Try searching for "RQ-901" (Dubai) or "RQ-101" (Istanbul).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {statusResults.map((flight) => (
                <div
                  key={`${flight.flightNumber}-${flight.origin}-${flight.destination}`}
                  className="rounded-2xl bg-white dark:bg-[#0B1F3A]/90 p-5 sm:p-6 shadow-md border border-gray-100 dark:border-white/10 hover:border-[#F58220]/30 transition space-y-4"
                >
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-white/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#0B1F3A] dark:text-white">
                        {flight.flightNumber}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        Kam Air • {flight.aircraft}
                      </span>
                    </div>

                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(flight.status)}`}>
                      {flight.status}
                    </div>
                  </div>

                  {/* Flight Timing & Route */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Origin */}
                    <div className="md:col-span-4 space-y-1">
                      <span className="text-2xl font-black text-[#0B1F3A] dark:text-white">
                        {flight.departureTime}
                      </span>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        {flight.originCity || flight.origin} ({flight.origin})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {flight.terminalDeparture || "Main Terminal"}
                      </div>
                    </div>

                    {/* Duration / Arrow */}
                    <div className="md:col-span-4 text-center space-y-1">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        {flight.duration} Non-Stop
                      </span>
                      <div className="relative flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-200 dark:bg-white/15" />
                        <Plane size={16} className="text-[#F58220] absolute bg-white dark:bg-[#0B1F3A] px-0.5 transform rotate-90" />
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                        {flight.gate}
                      </span>
                    </div>

                    {/* Destination */}
                    <div className="md:col-span-4 space-y-1 md:text-right">
                      <span className="text-2xl font-black text-[#0B1F3A] dark:text-white">
                        {flight.arrivalTime}
                      </span>
                      <div className="font-bold text-sm text-gray-900 dark:text-white">
                        {flight.destinationCity || flight.destination} ({flight.destination})
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {flight.terminalArrival || flight.terminal || "Terminal 2"}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions & Baggage */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-white/10 text-xs">
                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                      <span>Baggage Claim: <strong className="text-gray-800 dark:text-white">{flight.baggageBelt}</strong></span>
                      <span>Aircraft: <strong className="text-gray-800 dark:text-white">{flight.aircraft}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/assistant?q=What are the rules and schedule for flight ${flight.flightNumber}?`}
                        className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500/20 transition"
                      >
                        Ask AI Assistant
                      </Link>
                      <Link
                        to={`/flights?origin=${flight.origin}&destination=${flight.destination}`}
                        className="px-3.5 py-1.5 rounded-lg bg-[#F58220] text-white font-bold shadow-sm hover:bg-[#e07010] transition"
                      >
                        Book This Route
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
