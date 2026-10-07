import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import { MapPin, Plane, ShieldCheck, ArrowRight, Clock, Luggage, Globe2, Search } from "lucide-react";
import { KAM_AIR_CITIES, VISA_REQUIREMENTS_DATA, POPULAR_KAM_AIR_ROUTES } from "../../data/kamAirRoutes";

export default function DestinationsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const destinationDetails = [
    {
      code: "DXB",
      city: "Dubai",
      country: "United Arab Emirates",
      airport: "Dubai International Airport (Terminal 2)",
      description: "A premier global hub for international business, leisure, and shopping with daily Kam Air scheduled flights.",
      frequency: "2 Daily Flights (RQ-901 & RQ-903)",
      flightTime: "3h 45m",
      aircraft: "Boeing 737-800",
      priceUSD: 295,
      priceAFN: "20,800 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
      visaSummary: "30 or 60-day tourist visa required with return ticket and hotel/sponsor voucher.",
    },
    {
      code: "IST",
      city: "Istanbul",
      country: "Turkey",
      airport: "Istanbul Airport (IST)",
      description: "The historic transcontinental metropolis bridging East and West, served with widebody long-range flights.",
      frequency: "3 Weekly Flights (Tue, Thu, Sat)",
      flightTime: "5h 15m",
      aircraft: "Airbus A340-300",
      priceUSD: 520,
      priceAFN: "36,600 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Sticker visa issued through Turkish Embassy in Kabul or Consulate in Mazar.",
    },
    {
      code: "JED",
      city: "Jeddah",
      country: "Saudi Arabia",
      airport: "King Abdulaziz International Airport (North Terminal)",
      description: "Gateway to the Holy Cities of Makkah and Medina for Umrah and Hajj pilgrims with dedicated pilgrim services.",
      frequency: "3 Weekly Flights (Tue, Fri, Sun)",
      flightTime: "5h 00m",
      aircraft: "Airbus A340-300",
      priceUSD: 610,
      priceAFN: "42,900 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Umrah visa via Nusuk platform. 5L complimentary Zamzam water on return journey.",
    },
    {
      code: "DEL",
      city: "Delhi",
      country: "India",
      airport: "Indira Gandhi International Airport (Terminal 3)",
      description: "Vital route for medical travel, commercial trade, and higher education connecting Kabul to India's capital.",
      frequency: "3 Weekly Flights (Mon, Wed, Fri)",
      flightTime: "2h 30m",
      aircraft: "Boeing 737-800",
      priceUSD: 240,
      priceAFN: "16,900 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Medical / Tourist e-Visa stamped before departure. Flights arrive at Terminal 3.",
    },
    {
      code: "TAS",
      city: "Tashkent",
      country: "Uzbekistan",
      airport: "Islam Karimov Tashkent International Airport (Terminal 2)",
      description: "Central Asia's prime cultural and overland transit crossway, only 1 hour and 45 minutes from Kabul.",
      frequency: "2 Weekly Flights (Wed, Sat)",
      flightTime: "1h 45m",
      aircraft: "Boeing 737-800",
      priceUSD: 210,
      priceAFN: "14,780 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Uzbek entry visa or invitation voucher. Direct air connection.",
    },
    {
      code: "ISB",
      city: "Islamabad",
      country: "Pakistan",
      airport: "Islamabad International Airport",
      description: "Fastest non-stop international hop from Kabul, offering essential family, diplomatic, and transit connections.",
      frequency: "4 Weekly Flights (Mon, Tue, Thu, Sat)",
      flightTime: "1h 00m",
      aircraft: "Boeing 737-800",
      priceUSD: 160,
      priceAFN: "11,260 AFN",
      type: "international",
      image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Pakistan Online Visa System (POVS) required with confirmed return ticket.",
    },
    {
      code: "HEA",
      city: "Herat",
      country: "Afghanistan",
      airport: "Khwaja Abdullah Ansari International Airport",
      description: "Afghanistan's historic Western hub renowned for Persian-style architecture, literature, and trade.",
      frequency: "Daily Flights (RQ-111)",
      flightTime: "1h 15m",
      aircraft: "Boeing 737-500",
      priceUSD: 75,
      priceAFN: "5,280 AFN",
      type: "domestic",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Domestic Route: National Tazkira or Passport required at airport security check.",
    },
    {
      code: "MZR",
      city: "Mazar-i-Sharif",
      country: "Afghanistan",
      airport: "Mawlana Jalaluddin Balkhi International Airport",
      description: "Northern commercial center home to the iconic Blue Mosque and cultural heritage.",
      frequency: "Daily Flights (RQ-121)",
      flightTime: "0h 50m",
      aircraft: "Boeing 737-500",
      priceUSD: 65,
      priceAFN: "4,580 AFN",
      type: "domestic",
      image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Domestic Route: Valid Afghan ID / Passport for boarding at KBL Domestic Terminal.",
    },
    {
      code: "KDH",
      city: "Kandahar",
      country: "Afghanistan",
      airport: "Ahmad Shah Baba International Airport",
      description: "Southern economic cornerstone connecting agricultural and trading centers to the capital.",
      frequency: "4 Weekly Flights (RQ-131)",
      flightTime: "1h 00m",
      aircraft: "Boeing 737-500",
      priceUSD: 70,
      priceAFN: "4,920 AFN",
      type: "domestic",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
      visaSummary: "Domestic Route: Valid Afghan National ID or passport required.",
    },
  ];

  const filtered = destinationDetails.filter((d) => {
    const matchesType = filter === "all" || d.type === filter;
    const matchesSearch =
      d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <Globe2 size={14} />
            <span>Kam Air Network Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Destinations & Route Map
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Explore Kam Air's primary domestic trunk routes and international destinations with verified schedules and visa guidance.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B1F3A]/80 shadow-md border border-gray-100 dark:border-white/10">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination or airport..."
              className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:border-[#F58220]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {["all", "international", "domestic"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer flex-1 sm:flex-none ${
                  filter === t
                    ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                    : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => (
            <div
              key={dest.code}
              className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 overflow-hidden shadow-xl border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/30 to-transparent" />
                
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1F3A]/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20">
                  {dest.code}
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F58220] text-white text-xs font-bold shadow-md">
                  From ${dest.priceUSD}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white">{dest.city}</h3>
                  <p className="text-xs text-amber-300 font-medium">{dest.country}</p>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {dest.description}
                </p>

                {/* Metadata Pills */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="text-[#F58220]" />
                      Flight Time
                    </span>
                    <strong className="text-gray-900 dark:text-white">{dest.flightTime} (Non-Stop)</strong>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-1.5 font-medium text-gray-500 dark:text-gray-400">
                      <Plane size={14} className="text-[#F58220]" />
                      Schedule
                    </span>
                    <strong className="text-gray-900 dark:text-white">{dest.frequency}</strong>
                  </div>
                </div>

                {/* Visa Advisory */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <ShieldCheck size={14} className="shrink-0 mt-0.5 text-[#F58220]" />
                  <span>{dest.visaSummary}</span>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex items-center gap-2">
                  <Link
                    to={`/assistant?q=What are the travel documents and luggage rules for flying to ${dest.city}?`}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#F58220] text-center text-xs font-bold text-gray-700 dark:text-gray-200 transition"
                  >
                    Ask AI Guide
                  </Link>
                  <Link
                    to={`/flights?origin=KBL&destination=${dest.code}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-center text-xs font-bold text-white shadow-md shadow-[#F58220]/25 transition flex items-center justify-center gap-1"
                  >
                    <span>Search Flights</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
