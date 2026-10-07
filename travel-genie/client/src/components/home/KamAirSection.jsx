import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plane, ShieldCheck, Luggage, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from "lucide-react";
import { KAM_AIR_FLEET, BAGGAGE_POLICIES } from "../../data/kamAirRoutes";

export default function KamAirSection() {
  return (
    <section className="py-20 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 rounded-full bg-[#F58220]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F58220]/15 border border-[#F58220]/30 text-[#F58220] text-xs font-bold uppercase tracking-wider">
            <Plane size={14} className="rotate-45" />
            <span>Afghanistan's Premier Airline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            The Kam Air Passenger Experience
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Founded with a commitment to connecting Afghanistan to the world, Kam Air offers modern aircraft, generous baggage allowances, and authentic Afghan hospitality.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Modern Fleet */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 flex flex-col justify-between hover:bg-white/[0.08] transition duration-300">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F58220]/20 text-[#F58220] flex items-center justify-center">
                <Plane size={24} />
              </div>
              <h3 className="text-xl font-black text-white">Modern Jet Fleet</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Operating reliable Boeing 737-800 narrowbodies for regional routes and widebody Airbus A340-300 aircraft for international trunk routes like Istanbul and Jeddah.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#F58220]" />
                <span>Boeing 737-800 (189 Seats, Business & Economy)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[#F58220]" />
                <span>Airbus A340-300 (300 Seats, Long-Range Widebody)</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Baggage & Pilgrim Services */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 flex flex-col justify-between hover:bg-white/[0.08] transition duration-300">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Luggage size={24} />
              </div>
              <h3 className="text-xl font-black text-white">Generous Baggage & Umrah</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Enjoy 30 kg checked luggage + 7 kg cabin bag on Economy (40 kg on Business), plus complimentary 5 Liters of Zamzam water on all pilgrim departures from Saudi Arabia.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>30 kg Checked (Economy) / 40 kg (Business)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-amber-400" />
                <span>Complimentary 5L Zamzam Water on Pilgrim Flights</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: AI Digital Assistant */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-7 space-y-4 flex flex-col justify-between hover:bg-white/[0.08] transition duration-300">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-black text-white">24/7 AI Passenger Concierge</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Get instant, grounded guidance on visa regulations, flight schedules, baggage policies, and airport timelines in multiple languages.
              </p>
            </div>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Verified Kam Air Knowledge Base</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Multi-language Passenger Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-[#F58220] p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black tracking-tight">Ready to Fly with Kam Air?</h3>
            <p className="text-xs text-white/90 max-w-lg">
              Explore scheduled flights from Kabul to Dubai, Istanbul, Jeddah, Tashkent, Delhi, and domestic cities today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/flights"
              className="px-6 py-3.5 rounded-xl bg-[#0B1F3A] hover:bg-[#071625] text-white text-xs font-bold shadow-lg transition flex items-center gap-2"
            >
              <span>Search Flights Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
