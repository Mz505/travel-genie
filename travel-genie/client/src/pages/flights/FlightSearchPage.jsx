import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plane,
  Clock,
  Luggage,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import FlightSearchCard from "../../components/flights/FlightSearchCard";
import BookingModal from "../../components/flights/BookingModal";
import VisaRequirementsCard from "../../components/flights/VisaRequirementsCard";
import CurrencyAndLangSwitcher from "../../components/Common/CurrencyAndLangSwitcher";
import ThemeSwitcher from "../../components/Common/ThemeSwitcher";
import { searchKamAirFlights, KAM_AIR_CITIES } from "../../data/kamAirRoutes";
import { useLocalization } from "../../context/LocalizationContext";
import GlassCard from "../../components/Common/GlassCard";

export default function FlightSearchPage() {
  const navigate = useNavigate();
  const { formatPrice, t } = useLocalization();

  const [searchParams, setSearchParams] = useState({
    origin: "KBL",
    destination: "DXB",
    departureDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    returnDate: new Date(Date.now() + 86400000 * 9).toISOString().split("T")[0],
    passengers: 1,
    cabinClass: "Economy",
    tripType: "roundTrip",
  });

  const [bookingTarget, setBookingTarget] = useState(null); // { flight, returnFlight }

  // Perform initial search
  const flightResults = searchKamAirFlights(searchParams);

  const handleSearch = (newParams) => {
    setSearchParams(newParams);
  };

  const originCity = KAM_AIR_CITIES.find((c) => c.code === searchParams.origin) || { name: searchParams.origin };
  const destCity = KAM_AIR_CITIES.find((c) => c.code === searchParams.destination) || { name: searchParams.destination };

  // Trigger AI Trip Planner with this flight context
  const handlePlanWithAI = (flight) => {
    navigate(
      `/dashboard/recommendations?origin=${originCity.name}&destination=${destCity.name}&startDate=${flight.date}&flightNo=${flight.flightNumber}&cabin=${flight.cabinClass}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#07111F] text-gray-900 dark:text-white transition-colors duration-300">
      {/* Top Banner & Co-Branding */}
      <div className="w-full bg-[#071625] border-b border-white/10 px-4 py-2.5 text-xs text-white/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-400">TravelGenie × Kam Air</span>
            <span className="opacity-60 hidden sm:inline">• Official Airline Assistant Concept Prototype</span>
          </div>

          <div className="flex items-center gap-3">
            <CurrencyAndLangSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold mb-3">
              <Plane size={14} />
              <span>Kam Air Flight Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
              Discover & Book Kam Air Flights
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
              Connecting Kabul to international and domestic destinations with personalized AI travel planning.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-gray-400 dark:text-white/40 block">Concept Prototype</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Verified Kam Air Route Schedules</span>
          </div>
        </div>

        {/* Flight Search Engine */}
        <FlightSearchCard onSearch={handleSearch} initialParams={searchParams} />

        {/* Prototype Transparency Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Demonstration & Concept Notice:</p>
            <p className="opacity-90">
              Flight schedules, routes, and aircraft types reflect Kam Air's real commercial timetable. Fares and reservations in this prototype are for portfolio evaluation and demonstrate the seamless integration between airline booking and TravelGenie's AI trip assistant.
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>Available Flights</span>
              <span className="text-sm font-semibold text-gray-500 dark:text-white/50">
                ({originCity.name} to {destCity.name})
              </span>
            </h2>

            <span className="text-xs font-semibold text-gray-500 dark:text-white/50">
              {flightResults.outbound.length} flight option(s) found
            </span>
          </div>

          {flightResults.outbound.length === 0 ? (
            <GlassCard className="p-10 text-center space-y-3">
              <Plane size={36} className="mx-auto text-gray-400 opacity-50" />
              <h3 className="text-lg font-bold text-gray-700 dark:text-white/80">No Direct Flights on This Route</h3>
              <p className="text-xs text-gray-500 dark:text-white/50 max-w-md mx-auto">
                Kam Air may operate scheduled flights on this route on specific days of the week. Try selecting Kabul (KBL) as origin or check popular destinations like Dubai (DXB) or Istanbul (IST).
              </p>
            </GlassCard>
          ) : (
            <div className="space-y-4">
              {flightResults.outbound.map((flight) => (
                <div
                  key={flight.id}
                  className="rounded-3xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/10 p-6 shadow-xl hover:border-amber-400/50 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Airline & Flight Number */}
                    <div className="lg:col-span-3 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-black text-base shadow-sm">
                        RQ
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-base text-gray-900 dark:text-white">
                            Kam Air {flight.flightNumber}
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                            {flight.cabinClass}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-white/50">{flight.aircraft}</p>
                      </div>
                    </div>

                    {/* Flight Times & Route */}
                    <div className="lg:col-span-5 flex items-center justify-between sm:justify-around text-center">
                      <div>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                          {flight.departureTime}
                        </span>
                        <p className="text-xs font-semibold text-gray-600 dark:text-white/60">
                          {originCity.name} ({flight.origin})
                        </p>
                        <p className="text-[10px] text-gray-400">{flight.date}</p>
                      </div>

                      <div className="px-3 flex flex-col items-center">
                        <span className="text-xs font-medium text-gray-400 dark:text-white/40">{flight.duration}</span>
                        <div className="w-24 sm:w-32 h-0.5 bg-gray-300 dark:bg-white/20 my-1.5 relative">
                          <Plane size={12} className="absolute left-1/2 -top-1.5 -translate-x-1/2 text-amber-500" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Non-Stop</span>
                      </div>

                      <div>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">
                          {flight.arrivalTime}
                        </span>
                        <p className="text-xs font-semibold text-gray-600 dark:text-white/60">
                          {destCity.name} ({flight.destination})
                        </p>
                        <p className="text-[10px] text-gray-400">Terminal 2</p>
                      </div>
                    </div>

                    {/* Baggage & Extras */}
                    <div className="lg:col-span-2 text-xs space-y-1 text-gray-600 dark:text-white/70 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/10 pt-3 lg:pt-0 lg:pl-4">
                      <div className="flex items-center gap-1.5">
                        <Luggage size={14} className="text-amber-500" />
                        <span className="font-semibold">{flight.baggage?.checked || "30 kg"} checked</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>7 kg cabin baggage</span>
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-white/40">Free Meal & Refreshment</div>
                    </div>

                    {/* Price & Actions */}
                    <div className="lg:col-span-2 flex flex-col items-end gap-2 border-t lg:border-t-0 border-gray-100 dark:border-white/10 pt-3 lg:pt-0">
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 dark:text-white/50 block">Per Passenger</span>
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                          {formatPrice(flight.priceUSD)}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full">
                        <button
                          type="button"
                          onClick={() => setBookingTarget({ flight, returnFlight: flightResults.returnFlights[0] || null })}
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition"
                        >
                          Book Flight
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePlanWithAI(flight)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold text-xs hover:bg-cyan-500/20 transition"
                        >
                          <Sparkles size={13} />
                          <span>Plan Trip with AI</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visa & Destination Intelligence */}
        <div className="pt-4">
          <VisaRequirementsCard defaultDestination={searchParams.destination} />
        </div>
      </div>

      {/* Booking Flow Modal */}
      {bookingTarget && (
        <BookingModal
          flight={bookingTarget.flight}
          returnFlight={bookingTarget.returnFlight}
          onClose={() => setBookingTarget(null)}
        />
      )}
    </div>
  );
}
