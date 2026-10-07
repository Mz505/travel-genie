import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import {
  Headphones,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function CustomerSupportPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pnr: "",
    subject: "Flight Inquiry",
    message: "",
  });

  const faqs = [
    {
      q: "How can I change my flight date or route?",
      a: "Ticket changes can be made up to 24 hours prior to scheduled departure. Depending on your fare class, date change fees may apply. Please contact your booking agency or call the Kam Air 24/7 Helpline at +93 79 977 7777.",
    },
    {
      q: "What happens if my flight is delayed or rescheduled?",
      a: "In the event of operational or weather-related schedule changes, Kam Air ground agents will notify passengers via SMS/email and assist with rebooking onto the next available flight. You can also monitor live telemetry on our Flight Status page.",
    },
    {
      q: "Can I bring Zamzam water from Jeddah or Medina?",
      a: "Yes! Kam Air proudly offers every Umrah and Hajj pilgrim departing Jeddah (JED) or Medina (MED) a complimentary 5-liter factory-sealed bottle allowance in the aircraft hold, free of charge beyond standard checked baggage.",
    },
    {
      q: "What is the check-in baggage allowance for infants?",
      a: "Infants under 2 years traveling without a seat are entitled to 10 kg of checked baggage plus one fully collapsible stroller or baby basket free of charge.",
    },
    {
      q: "How early must I be at the airport before my flight?",
      a: "Passengers on international flights must arrive at the airport at least 3 hours prior to scheduled departure. For domestic flights within Afghanistan, arrive 2 hours prior. Boarding gates close strictly 45 minutes before departure.",
    },
    {
      q: "What payment methods are accepted for booking?",
      a: "Kam Air tickets can be purchased via major international credit cards, Hawala/Money Exchanges, authorized travel agencies across Afghanistan and UAE, or in cash at Kam Air airport sales offices.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        pnr: "",
        subject: "Flight Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <Headphones size={14} />
            <span>24/7 Passenger Care</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            Customer Support & Offices
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Reach out to our global support desks, contact city offices, or get instant help from our AI passenger assistant.
          </p>
        </div>

        {/* Global Offices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Kabul HQ */}
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 shadow-xl border border-gray-100 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F58220] uppercase tracking-wider">Headquarters</span>
              <MapPin size={18} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A] dark:text-white">Kabul, Afghanistan</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Kam Air Building, Airport Road, Kabul
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                <Phone size={14} className="text-[#F58220]" />
                <span>+93 79 977 7777</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Mail size={14} />
                <span>info@kamair.com</span>
              </div>
            </div>
          </div>

          {/* Dubai Office */}
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 shadow-xl border border-gray-100 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">UAE Hub</span>
              <MapPin size={18} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A] dark:text-white">Dubai, UAE</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Dubai Airport Terminal 2 & Deira Clock Tower
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                <Phone size={14} className="text-cyan-600" />
                <span>+971 4 298 9898</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Mail size={14} />
                <span>dubai@kamair.com</span>
              </div>
            </div>
          </div>

          {/* Istanbul Office */}
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 shadow-xl border border-gray-100 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Turkey Hub</span>
              <MapPin size={18} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A] dark:text-white">Istanbul, Turkey</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Istanbul Airport (IST) Ticket Desk & Sisli
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                <Phone size={14} className="text-red-600" />
                <span>+90 212 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Mail size={14} />
                <span>istanbul@kamair.com</span>
              </div>
            </div>
          </div>

          {/* Jeddah Office */}
          <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 shadow-xl border border-gray-100 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Umrah Hub</span>
              <MapPin size={18} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-black text-[#0B1F3A] dark:text-white">Jeddah, Saudi Arabia</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              King Abdulaziz Airport (North Terminal)
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
                <Phone size={14} className="text-emerald-600" />
                <span>+966 12 654 3210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Mail size={14} />
                <span>jeddah@kamair.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section: Inquiry Form & AI Routing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
                Submit a Support Request
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Our customer experience team will review and respond within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                  Request Received!
                </h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  Ticket reference #KAM-{Math.floor(100000 + Math.random() * 900000)} generated. A representative will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ahmad Samadi"
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm outline-none focus:border-[#F58220]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm outline-none focus:border-[#F58220]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1">
                      Booking Reference (PNR, Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.pnr}
                      onChange={(e) => setFormData({ ...formData, pnr: e.target.value })}
                      placeholder="e.g. KAM-901DXB"
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm uppercase outline-none focus:border-[#F58220]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm outline-none focus:border-[#F58220] text-gray-900 dark:text-white"
                    >
                      <option value="Flight Inquiry">Flight Inquiry</option>
                      <option value="Booking Modification">Booking Modification / Date Change</option>
                      <option value="Baggage Claim">Baggage Claim / Excess Baggage</option>
                      <option value="Refund Request">Refund & Cancellation</option>
                      <option value="Special Assistance">Medical / Special Assistance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-gray-700 dark:text-gray-200 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry in detail..."
                    className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-3 text-sm outline-none focus:border-[#F58220]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white font-bold text-sm shadow-md shadow-[#F58220]/25 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={16} />
                  <span>Send Support Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Instant AI Concierge Highlight */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B1F3A] text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F58220]/20 text-[#F58220] border border-[#F58220]/30 text-xs font-bold">
                <Sparkles size={14} />
                <span>Instant Answer Engine</span>
              </div>
              <h3 className="text-2xl font-black">Need Instant Assistance?</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Skip the wait! Our official AI passenger assistant can answer questions about flight schedules, baggage policies, visa rules, and check-in times in seconds.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Common AI Inquiries:
              </span>
              <p className="text-gray-200 italic">"What are the baggage rules for Dubai flight RQ-901?"</p>
              <p className="text-gray-200 italic">"How early should I arrive at Kabul Airport?"</p>
              <p className="text-gray-200 italic">"What are the Zamzam water rules from Jeddah?"</p>
            </div>

            <Link
              to="/assistant"
              className="w-full py-3.5 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white text-center font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Sparkles size={16} />
              <span>Launch AI Passenger Concierge</span>
            </Link>
          </div>
        </div>

        {/* Interactive FAQs Accordion */}
        <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-white">
              Frequently Asked Questions
            </h2>
            <span className="text-xs text-gray-400">6 Answers</span>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={18} className="text-[#F58220] shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
