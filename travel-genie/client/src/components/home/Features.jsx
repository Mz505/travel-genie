import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plane,
  Clock,
  Sparkles,
  Ticket,
  Luggage,
  ShieldCheck,
  ArrowRight,
  Compass,
} from "lucide-react";

const airlineFeatures = [
  {
    icon: Plane,
    title: "Flight Search & Reservation",
    path: "/flights",
    color: "bg-[#F58220]/10 text-[#F58220]",
    description:
      "Search scheduled flights across Kam Air's domestic and international network with transparent fares in USD and AFN.",
  },
  {
    icon: Clock,
    title: "Live Flight Status",
    path: "/flight-status",
    color: "bg-blue-500/10 text-blue-500",
    description:
      "Real-time departure, arrival, terminal, boarding gate, and baggage carousel updates for all Kam Air flights.",
  },
  {
    icon: Sparkles,
    title: "AI Passenger Concierge",
    path: "/assistant",
    color: "bg-amber-500/10 text-amber-500",
    description:
      "24/7 conversational travel assistant answering questions on baggage allowances, visa rules, check-in times, and destination tips.",
  },
  {
    icon: Ticket,
    title: "E-Tickets & PNR Lookup",
    path: "/my-trip",
    color: "bg-emerald-500/10 text-emerald-500",
    description:
      "Retrieve your booking with your PNR code, complete online check-in, and download official PDF boarding passes.",
  },
  {
    icon: Luggage,
    title: "Baggage & Umrah Guidance",
    path: "/travel-info",
    color: "bg-purple-500/10 text-purple-500",
    description:
      "Comprehensive guidelines for 30kg/40kg checked baggage, infant allowances, and complimentary 5L Zamzam water on pilgrim flights.",
  },
  {
    icon: Compass,
    title: "Kam Air Holiday Packages",
    path: "/dashboard/trips/create",
    color: "bg-cyan-500/10 text-cyan-500",
    description:
      "Build custom day-by-day itineraries and budget estimates for holidays in Dubai, Istanbul, Tashkent, and beyond.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07111F] transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <ShieldCheck size={14} />
            <span>Digital Passenger Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Comprehensive Digital Services for Every Passenger
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Everything you need for seamless travel with Kam Air—from flight booking and live status to AI assistance and electronic tickets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airlineFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="rounded-3xl bg-[#F5F7FA] dark:bg-[#0B1F3A]/60 p-7 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feature.color}`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-black text-[#0B1F3A] dark:text-white group-hover:text-[#F58220] transition">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-gray-200/50 dark:border-white/10">
                  <Link
                    to={feature.path}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#F58220] hover:text-[#e07010] transition"
                  >
                    <span>Access Service</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
