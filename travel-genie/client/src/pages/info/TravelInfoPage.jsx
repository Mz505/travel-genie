import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import {
  Luggage,
  Clock,
  ShieldAlert,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  Plane,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { BAGGAGE_POLICIES } from "../../data/kamAirRoutes";

export default function TravelInfoPage() {
  const [activeTab, setActiveTab] = useState("baggage");

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <Luggage size={14} />
            <span>Passenger Travel Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Baggage & Travel Information
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Official guidelines on baggage allowances, check-in deadlines, visa regulations, and pilgrim services across Kam Air.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-[#0B1F3A]/80 border border-gray-100 dark:border-white/10 max-w-xl mx-auto shadow-md">
          {[
            { id: "baggage", label: "Baggage Allowances", icon: Luggage },
            { id: "checkin", label: "Check-in & Airport", icon: Clock },
            { id: "documents", label: "Visas & Documents", icon: FileCheck },
            { id: "prohibited", label: "Prohibited Goods", icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Baggage Allowances */}
        {activeTab === "baggage" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Economy Card */}
              <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F58220]/10 text-[#F58220]">
                      Standard Class
                    </span>
                    <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
                      Economy Class Baggage
                    </h3>
                  </div>
                  <Luggage size={28} className="text-[#F58220]" />
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Checked Baggage:</span>
                    <strong className="text-base text-gray-900 dark:text-white">30 kg (1 or 2 pcs)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Cabin / Hand Carry:</span>
                    <strong className="text-base text-gray-900 dark:text-white">7 kg (1 pc, 55×40×20 cm)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Excess Baggage Rate:</span>
                    <strong className="text-gray-900 dark:text-white">Approx. $10 USD / kg</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
                  <strong>Zamzam Allowance:</strong> Complimentary 5L Zamzam bottle per passenger on departing flights from Jeddah / Medina.
                </div>
              </div>

              {/* Business Card */}
              <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border-2 border-amber-500/30 dark:border-amber-500/30 space-y-5 relative">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
                  Premium Tier
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/10">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Executive Class
                    </span>
                    <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white mt-1">
                      Business Class Baggage
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Checked Baggage:</span>
                    <strong className="text-base text-gray-900 dark:text-white">40 kg (up to 2 pcs)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Cabin / Hand Carry:</span>
                    <strong className="text-base text-gray-900 dark:text-white">10 kg (up to 2 pcs)</strong>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">Priority Baggage Handling:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">Included</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                  <strong>Special Care:</strong> Priority baggage tags guarantee your luggage emerges first at destination baggage carousels.
                </div>
              </div>
            </div>

            {/* Special Baggage Info */}
            <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/80 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-[#F58220]" />
                <span>Special Baggage & Pilgrim Services (Zamzam Water)</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                Kam Air is proud to transport millions of pilgrims undertaking the sacred Hajj and Umrah journeys. In accordance with General Authority of Civil Aviation (GACA) regulations, each departing pilgrim from King Abdulaziz International Airport (JED) or Prince Mohammad bin Abdulaziz Airport (MED) is permitted to carry one 5-liter factory-sealed bottle of Zamzam water free of charge in the cargo hold, in addition to their standard 30kg/40kg baggage allowance.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Check-in & Airport Timelines */}
        {activeTab === "checkin" && (
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
              Airport Check-in Deadlines & Boarding Protocols
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#F58220]/10 text-[#F58220] flex items-center justify-center mx-auto">
                  <Clock size={24} />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">International Flights</h4>
                <p className="text-2xl font-black text-[#F58220]">3 Hours Prior</p>
                <p className="text-xs text-gray-500">Report to KBL International Terminal counters</p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                  <Plane size={24} />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Domestic Flights</h4>
                <p className="text-2xl font-black text-blue-500">2 Hours Prior</p>
                <p className="text-xs text-gray-500">Herat, Mazar, Kandahar domestic departures</p>
              </div>

              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                  <ShieldAlert size={24} />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">Gate Closure</h4>
                <p className="text-2xl font-black text-red-500">45 Mins Prior</p>
                <p className="text-xs text-gray-500">Boarding gates close strictly before pushback</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <strong>Check-in Counter Notice:</strong> Check-in desks close exactly 60 minutes prior to scheduled flight departure. Passengers who fail to present themselves with required travel documents before counter closure cannot be accepted for flight boarding.
            </div>
          </div>
        )}

        {/* Tab 3: Visas & Documents */}
        {activeTab === "documents" && (
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
              Travel Document & Entry Visa Requirements
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Passport Validity Rule</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  All passengers traveling on Kam Air international routes must possess an official passport with a minimum validity of <strong>6 months</strong> from the date of travel, containing at least 2 blank visa pages.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Return Flight Ticket Obligation</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Immigration authorities in Dubai (UAE), Turkey, and Pakistan strictly require tourist and business visa holders to carry a confirmed return or onward ticket. Kam Air check-in agents will inspect return ticket copies prior to issuing boarding passes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 space-y-2">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Medical Certificate for India Travel</span>
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Passengers flying to Delhi on Medical Visa categories must present authentic hospital appointment confirmation letters along with attendant visa documentation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Prohibited Items */}
        {activeTab === "prohibited" && (
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-6">
            <h3 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
              Dangerous Goods & Prohibited Cargo
            </h3>

            <p className="text-xs text-gray-600 dark:text-gray-300">
              For passenger safety and aviation security, the following items are strictly forbidden from both cabin and cargo luggage on all Kam Air flights:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                "Explosives, ammunition, fireworks, and flares",
                "Flammable liquids, lighter fluid, and paints",
                "Compressed gases (butane, propane, oxygen cylinders)",
                "Corrosives, acids, alkalis, and wet cell batteries",
                "Toxic substances, pesticides, and infectious materials",
                "Loose lithium-ion batteries over 100Wh in checked baggage",
                "Hoverboards and self-balancing scooters",
                "Unsealed liquids over 100ml in cabin carry-on",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 flex items-center gap-2"
                >
                  <XCircle size={16} className="shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Assistant Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0B1F3A] to-[#173860] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have a Specific Baggage or Transit Question?</h3>
            <p className="text-xs text-gray-300 max-w-lg">
              Ask the Kam Air AI Passenger Assistant for immediate answers regarding excess fees, sports gear, visa policies, or airport transit rules.
            </p>
          </div>

          <Link
            to="/assistant?q=What is the policy for excess baggage and sports equipment?"
            className="px-6 py-3 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white text-xs font-bold shadow-md shrink-0 flex items-center gap-2 transition"
          >
            <Sparkles size={16} />
            <span>Ask Passenger Assistant</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
