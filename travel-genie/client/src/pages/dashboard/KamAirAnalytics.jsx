import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Plane,
  Users,
  Search,
  MessageSquare,
  Luggage,
  ShieldCheck,
  Download,
  Calendar,
  Globe2,
  Sparkles,
} from "lucide-react";
import GlassCard from "../../components/Common/GlassCard";
import { useLocalization } from "../../context/LocalizationContext";
import { useAuth } from "../../context/AuthContext";

export default function KamAirAnalytics() {
  const { formatPrice } = useLocalization();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState("30d");

  const topRoutes = [
    { route: "Kabul (KBL) → Dubai (DXB)", share: 34, searches: 12450, growth: "+14%" },
    { route: "Kabul (KBL) → Delhi (DEL)", share: 21, searches: 7820, growth: "+8%" },
    { route: "Kabul (KBL) → Istanbul (IST)", share: 15, searches: 5490, growth: "+19%" },
    { route: "Kabul (KBL) → Jeddah (JED)", share: 12, searches: 4380, growth: "+27%" },
    { route: "Kabul (KBL) → Tashkent (TAS)", share: 10, searches: 3650, growth: "+5%" },
    { route: "Domestic Trunk Routes", share: 8, searches: 2910, growth: "+3%" },
  ];

  const aiQueryCategories = [
    { category: "Visa & Entry Requirements", count: 41, icon: ShieldCheck, color: "text-amber-500" },
    { category: "Hotel & Neighborhood Recommendations", count: 28, icon: Globe2, color: "text-cyan-500" },
    { category: "Kam Air Flight Schedules & Timing", count: 19, icon: Plane, color: "text-blue-500" },
    { category: "Baggage & Zamzam Rules", count: 12, icon: Luggage, color: "text-emerald-500" },
  ];

  const recentInquiries = [
    {
      query: "I want to travel from Kabul to Dubai for 5 days with Kam Air. What is the best schedule?",
      route: "KBL → DXB",
      time: "12 mins ago",
      class: "Economy",
    },
    {
      query: "What are the visa and Zamzam baggage rules for Jeddah flight RQ-701?",
      route: "KBL → JED",
      time: "34 mins ago",
      class: "Business",
    },
    {
      query: "Looking for 3-star hotels in Istanbul near transit for a family of 4",
      route: "KBL → IST",
      time: "1 hour ago",
      class: "Economy",
    },
    {
      query: "Flight duration from Kabul to Tashkent and return schedule for next Saturday",
      route: "KBL → TAS",
      time: "2 hours ago",
      class: "Economy",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
            <ShieldCheck size={14} />
            <span>Kam Air Executive Portal • Staff Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
            Kam Air Demand & Route Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-white/70">
            Real-time travel demand, route search trends, and passenger AI assistant insights.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["7d", "30d", "90d"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                timeRange === r
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                  : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/70 hover:bg-gray-200"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-white/60 text-xs font-medium">
            <span>Total Flight Inquiries</span>
            <Search size={18} className="text-cyan-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">36,700</p>
          <span className="text-xs font-bold text-emerald-500">+18% vs last month</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-white/60 text-xs font-medium">
            <span>Top Searched Destination</span>
            <Plane size={18} className="text-amber-500" />
          </div>
          <p className="text-2xl font-black text-gray-900 dark:text-white truncate">Dubai (DXB)</p>
          <span className="text-xs font-bold text-amber-500">34% of all route searches</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-white/60 text-xs font-medium">
            <span>AI Itinerary Conversion</span>
            <Sparkles size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-gray-900 dark:text-white">62.4%</p>
          <span className="text-xs font-bold text-emerald-500">+5.2% plan save rate</span>
        </GlassCard>

        <GlassCard className="p-5 space-y-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-white/60 text-xs font-medium">
            <span>Cabin Class Preference</span>
            <Users size={18} className="text-emerald-500" />
          </div>
          <p className="text-xl font-black text-gray-900 dark:text-white">78% Eco / 22% Biz</p>
          <span className="text-xs font-bold text-cyan-500">Growing Business demand</span>
        </GlassCard>
      </div>

      {/* Route Share Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <GlassCard className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Most Searched Kam Air Routes
                </h3>
                <p className="text-xs text-gray-500 dark:text-white/50">
                  Search volume and passenger interest breakdown
                </p>
              </div>
              <span className="text-xs font-semibold text-amber-500">Active Month</span>
            </div>

            <div className="space-y-4">
              {topRoutes.map((r) => (
                <div key={r.route} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-900 dark:text-white">{r.route}</span>
                    <span className="text-amber-600 dark:text-amber-400">
                      {r.share}% ({r.searches.toLocaleString()} searches)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                      style={{ width: `${r.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* AI Inquiries Breakdown */}
        <div className="lg:col-span-5">
          <GlassCard className="p-6 sm:p-7 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Passenger Inquiry Themes
              </h3>
              <p className="text-xs text-gray-500 dark:text-white/50">
                What travelers ask the Kam Air AI assistant
              </p>
            </div>

            <div className="space-y-3">
              {aiQueryCategories.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.category}
                    className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-xl bg-gray-200 dark:bg-white/10 flex items-center justify-center ${item.color}`}>
                        <Icon size={17} />
                      </div>
                      <span className="text-xs font-bold text-gray-800 dark:text-white max-w-[180px] sm:max-w-none">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-sm font-black text-gray-900 dark:text-white">{item.count}%</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent Passenger Inquiries Stream */}
      <GlassCard className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-cyan-500" />
            <span>Recent AI Assistant Passenger Prompts</span>
          </h3>
          <span className="text-xs text-gray-400">Live Simulation Stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentInquiries.map((q, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {q.route}
                </span>
                <span className="text-gray-400 text-[10px]">{q.time}</span>
              </div>
              <p className="font-semibold text-gray-800 dark:text-white/90">"{q.query}"</p>
              <div className="text-[10px] text-gray-500 dark:text-white/40">
                Cabin Interest: <span className="font-bold">{q.class}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
