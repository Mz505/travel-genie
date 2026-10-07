import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Plane, Clock, ShieldCheck, Globe2 } from "lucide-react";

const popularKamAirDestinations = [
  {
    code: "DXB",
    name: "Dubai",
    country: "United Arab Emirates",
    description: "Daily scheduled flights from Kabul to Dubai Terminal 2. Perfect for business, shopping, and family holidays.",
    flightNo: "RQ-901 / RQ-903",
    priceUSD: 295,
    priceAFN: "20,800 AFN",
    flightTime: "3h 45m",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
  },
  {
    code: "IST",
    name: "Istanbul",
    country: "Turkey",
    description: "Direct widebody Airbus A340 flights connecting Kabul to Istanbul Airport (IST).",
    flightNo: "RQ-101",
    priceUSD: 520,
    priceAFN: "36,600 AFN",
    flightTime: "5h 15m",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80",
  },
  {
    code: "JED",
    name: "Jeddah",
    country: "Saudi Arabia",
    description: "Holy Pilgrimage & Umrah flights with complimentary 5-liter Zamzam water transport for all pilgrims.",
    flightNo: "RQ-701",
    priceUSD: 610,
    priceAFN: "42,900 AFN",
    flightTime: "5h 00m",
    image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&auto=format&fit=crop&q=80",
  },
  {
    code: "DEL",
    name: "Delhi",
    country: "India",
    description: "Connecting Kabul to Indira Gandhi International Airport Terminal 3 for medical and commercial travel.",
    flightNo: "RQ-501",
    priceUSD: 240,
    priceAFN: "16,900 AFN",
    flightTime: "2h 30m",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&auto=format&fit=crop&q=80",
  },
  {
    code: "TAS",
    name: "Tashkent",
    country: "Uzbekistan",
    description: "Central Asia's prime cultural crossway, only 1 hour 45 minutes non-stop flight time.",
    flightNo: "RQ-301",
    priceUSD: 210,
    priceAFN: "14,780 AFN",
    flightTime: "1h 45m",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&auto=format&fit=crop&q=80",
  },
  {
    code: "HEA",
    name: "Herat",
    country: "Afghanistan",
    description: "Daily scheduled domestic services connecting Kabul and the historic Western trading hub.",
    flightNo: "RQ-111",
    priceUSD: 75,
    priceAFN: "5,280 AFN",
    flightTime: "1h 15m",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&auto=format&fit=crop&q=80",
  },
];

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-[#F5F7FA] dark:bg-[#07111F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
              <Globe2 size={14} />
              <span>Verified Route Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
              Popular Kam Air Destinations
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl">
              Fly directly to major international centers and domestic provinces with Afghanistan’s premier airline.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#F58220] hover:text-[#e07010] group shrink-0"
          >
            <span>View All Destinations & Schedules</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularKamAirDestinations.map((dest, idx) => (
            <motion.div
              key={dest.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 overflow-hidden shadow-xl border border-gray-100 dark:border-white/10 flex flex-col justify-between group hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >
              {/* Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B1F3A]/80 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20">
                  {dest.code}
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#F58220] text-white text-xs font-bold shadow-md">
                  From ${dest.priceUSD}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-black text-white">{dest.name}</h3>
                  <p className="text-xs text-amber-300 font-medium">{dest.country}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                  {dest.description}
                </p>

                <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200 font-semibold">
                    <Plane size={14} className="text-[#F58220]" />
                    <span>{dest.flightNo}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <Clock size={14} />
                    <span>{dest.flightTime} (Direct)</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to={`/assistant?q=What are the flights and visa rules for ${dest.name}?`}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:border-[#F58220] text-center text-xs font-bold text-gray-700 dark:text-gray-200 transition"
                  >
                    Ask AI Guide
                  </Link>
                  <Link
                    to={`/flights?origin=KBL&destination=${dest.code}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-center text-xs font-bold text-white shadow-md shadow-[#F58220]/25 transition flex items-center justify-center gap-1"
                  >
                    <span>Book Flight</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
