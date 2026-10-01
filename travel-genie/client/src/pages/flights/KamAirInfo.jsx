import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  Clock,
  Luggage,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info,
  ChevronRight,
} from "lucide-react";
import {
  KAM_AIR_SCHEDULES,
  KAM_AIR_CITIES,
  KAM_AIR_FLEET,
  BAGGAGE_POLICIES,
} from "../../data/kamAirRoutes";
import { useLocalization } from "../../context/LocalizationContext";
import GlassCard from "../../components/Common/GlassCard";
import CurrencyAndLangSwitcher from "../../components/Common/CurrencyAndLangSwitcher";
import ThemeSwitcher from "../../components/Common/ThemeSwitcher";

export default function KamAirInfo() {
  const { formatPrice } = useLocalization();
  const [activeTab, setActiveTab] = useState("schedules");

  const getDayNames = (dayNums) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (dayNums.length === 7) return "Daily";
    return dayNums.map((d) => days[d % 7]).join(", ");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07111F] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Top Bar */}
      <div className="w-full bg-[#071625] border-b border-white/10 px-4 py-2.5 text-xs text-white/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">TravelGenie × Kam Air</span>
            <span className="opacity-60 hidden sm:inline">• Official Airline Directory & Schedules</span>
          </div>
          <div className="flex items-center gap-3">
            <CurrencyAndLangSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-r from-[#071625] via-[#0b243d] to-[#071625] text-white p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold">
              <span>Kam Air Flight Directory</span>
              <span>•</span>
              <span>Concept Prototype</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Connecting Afghanistan to the World
            </h1>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Explore Kam Air's comprehensive flight timetables, modern fleet specifications, baggage allowances, and passenger guidelines.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/flights"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-105 transition"
              >
                <Plane size={17} />
                <span>Search & Book Flights</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <Info size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Portfolio Prototype Notice:</span> This information reflects scheduled Kam Air operations and standard industry guidelines. Live commercial bookings are finalized via official Kam Air ticketing offices or GDS.
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-white/10 gap-2 sm:gap-6 overflow-x-auto">
          {[
            { id: "schedules", label: "Flight Schedules" },
            { id: "baggage", label: "Baggage Policies" },
            { id: "fleet", label: "Fleet & Aircraft" },
            { id: "contact", label: "Ticketing & Contacts" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 text-sm font-bold border-b-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-gray-500 dark:text-white/60 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Schedules Timetable */}
        {activeTab === "schedules" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Weekly Flight Timetable (From/To Kabul Hub)
            </h2>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#071625] shadow-xl">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/60 uppercase tracking-wider text-[11px]">
                    <th className="p-4">Flight</th>
                    <th className="p-4">Route</th>
                    <th className="p-4">Days</th>
                    <th className="p-4">Departure</th>
                    <th className="p-4">Arrival</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Aircraft</th>
                    <th className="p-4 text-right">Standard Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {KAM_AIR_SCHEDULES.map((flight) => {
                    const originCity = KAM_AIR_CITIES.find((c) => c.code === flight.origin) || { name: flight.origin };
                    const destCity = KAM_AIR_CITIES.find((c) => c.code === flight.destination) || { name: flight.destination };
                    return (
                      <tr key={flight.flightNumber + flight.origin} className="hover:bg-amber-500/5 transition">
                        <td className="p-4 font-bold text-amber-600 dark:text-amber-400">
                          {flight.flightNumber}
                        </td>
                        <td className="p-4 font-semibold text-gray-900 dark:text-white">
                          {originCity.name} ({flight.origin}) → {destCity.name} ({flight.destination})
                        </td>
                        <td className="p-4 text-gray-600 dark:text-white/70">
                          {getDayNames(flight.days)}
                        </td>
                        <td className="p-4 font-bold text-gray-800 dark:text-white">
                          {flight.departureTime}
                        </td>
                        <td className="p-4 font-bold text-gray-800 dark:text-white">
                          {flight.arrivalTime}
                        </td>
                        <td className="p-4 text-gray-500 dark:text-white/60">
                          {flight.duration}
                        </td>
                        <td className="p-4 text-gray-500 dark:text-white/60">
                          {flight.aircraft}
                        </td>
                        <td className="p-4 text-right font-extrabold text-gray-900 dark:text-white">
                          {formatPrice(flight.basePriceUSD)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Baggage Policies */}
        {activeTab === "baggage" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                  <Luggage size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Economy Class Allowance</h3>
                  <p className="text-xs text-gray-500">Standard international & domestic flights</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700 dark:text-white/80">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Checked Baggage:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400">{BAGGAGE_POLICIES.economy.checked}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Cabin Handbag:</span>
                  <span className="font-bold">{BAGGAGE_POLICIES.economy.cabin}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Excess Baggage Rate:</span>
                  <span className="font-bold">${BAGGAGE_POLICIES.economy.excessRateUSD} per kg</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                  <span className="font-bold">Zamzam Water Policy:</span> {BAGGAGE_POLICIES.economy.zamzam}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Business Class Allowance</h3>
                  <p className="text-xs text-gray-500">Premium cabin & corporate travel</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-gray-700 dark:text-white/80">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Checked Baggage:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{BAGGAGE_POLICIES.business.checked}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Cabin Handbag:</span>
                  <span className="font-bold">{BAGGAGE_POLICIES.business.cabin}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5">
                  <span className="font-semibold">Excess Baggage Rate:</span>
                  <span className="font-bold">${BAGGAGE_POLICIES.business.excessRateUSD} per kg</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold">Priority Baggage Handling:</span> Included with dedicated luggage delivery tags upon arrival.
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* TAB 3: Fleet */}
        {activeTab === "fleet" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KAM_AIR_FLEET.map((plane) => (
              <GlassCard key={plane.model} className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Plane size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{plane.model}</h3>
                  <span className="text-xs font-mono font-semibold text-gray-400">Tail: {plane.registration}</span>
                </div>
                <div className="space-y-2 text-xs text-gray-600 dark:text-white/70 pt-2 border-t border-gray-100 dark:border-white/5">
                  <p><span className="font-semibold">Capacity:</span> {plane.capacity}</p>
                  <p><span className="font-semibold">Operating Range:</span> {plane.range}</p>
                  <p><span className="font-semibold">Primary Routes:</span> {plane.routes}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* TAB 4: Contact & Ticketing */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6 space-y-3">
              <MapPin size={22} className="text-cyan-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Kabul Central Office</h3>
              <p className="text-xs text-gray-600 dark:text-white/70">
                Kabul Business Centre, Haji Yaqoob Square, Shahr-e Naw, Kabul, Afghanistan
              </p>
              <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Phone: +93 79 970 8080</p>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <MapPin size={22} className="text-amber-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Dubai Ticketing Counter</h3>
              <p className="text-xs text-gray-600 dark:text-white/70">
                Terminal 2, Dubai International Airport (DXB), Dubai, United Arab Emirates
              </p>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">Phone: +971 4 298 9898</p>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <MapPin size={22} className="text-emerald-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Airport Operations (KBL)</h3>
              <p className="text-xs text-gray-600 dark:text-white/70">
                Departure Terminal, Hamid Karzai International Airport, Kabul, Afghanistan
              </p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Email: support@kamair.com</p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
