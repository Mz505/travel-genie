import { Link } from "react-router-dom";
import { Plane, Phone, Mail, MapPin, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B1F3A] text-white pt-14 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F58220] flex items-center justify-center text-white shadow-md">
                <Plane size={20} className="transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  KAM<span className="text-[#F58220]">AIR</span>
                </span>
                <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase mt-0.5">
                  Digital Passenger Platform
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Connecting Kabul to international and domestic destinations. Official digital passenger assistant prototype combining authentic airline flight schedules, e-ticketing, and grounded AI customer assistance.
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#F58220]" />
                <span>24/7 Helpline: <strong>+93 79 977 7777</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#F58220]" />
                <span>info@kamair.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#F58220]" />
                <span>Kabul International Airport Road, Kabul, Afghanistan</span>
              </div>
            </div>
          </div>

          {/* Col 1: Flight Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Flight Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/flights" className="hover:text-[#F58220] transition">
                  Search & Book Flights
                </Link>
              </li>
              <li>
                <Link to="/flight-status" className="hover:text-[#F58220] transition">
                  Flight Status Tracking
                </Link>
              </li>
              <li>
                <Link to="/my-trip" className="hover:text-[#F58220] transition">
                  My Trips & Boarding Pass
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-[#F58220] transition">
                  Route Network & Hubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Passenger Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Travel Information
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/travel-info" className="hover:text-[#F58220] transition">
                  Baggage Allowances (30kg/40kg)
                </Link>
              </li>
              <li>
                <Link to="/travel-info" className="hover:text-[#F58220] transition">
                  Umrah & Zamzam Policy (5L)
                </Link>
              </li>
              <li>
                <Link to="/travel-info" className="hover:text-[#F58220] transition">
                  Check-in & Airport Deadlines
                </Link>
              </li>
              <li>
                <Link to="/travel-info" className="hover:text-[#F58220] transition">
                  Visa & Passport Requirements
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance & Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Assistance & Portal
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <Link to="/assistant" className="hover:text-[#F58220] font-semibold text-amber-300 transition flex items-center gap-1">
                  <span>AI Passenger Concierge</span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-[#F58220] transition">
                  Customer Support & Offices
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#F58220] transition">
                  Passenger Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/kam-air-analytics" className="hover:text-[#F58220] transition">
                  Staff Analytics Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Transparency & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>
              Kam Air AI Passenger Travel Platform • Enterprise Prototype Proposal (2026)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/support" className="hover:underline">
              Contact Desk
            </Link>
            <Link to="/travel-info" className="hover:underline">
              Baggage Rules
            </Link>
            <Link to="/flights" className="hover:underline">
              Schedules
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
