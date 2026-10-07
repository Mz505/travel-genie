import { useState, useRef, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import {
  Sparkles,
  Send,
  Plane,
  Luggage,
  ShieldCheck,
  FileText,
  Clock,
  Headphones,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  User,
  Bot,
} from "lucide-react";
import api from "../../api/axios";

export default function AIAssistantPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const initialQuery = searchParams.get("q") || "";

  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      role: "assistant",
      content: (
        "Welcome to the **Kam Air AI Passenger Assistant**!\n\n" +
        "I can assist you with:\n" +
        "• **Flight Schedules & Fares:** Kabul to Dubai, Istanbul, Jeddah, Delhi, Tashkent, and domestic routes.\n" +
        "• **Baggage Allowance:** Economy (30 kg) and Business (40 kg) rules + complimentary Zamzam water.\n" +
        "• **Visa & Passport Entry Guidance:** Afghan passport rules for UAE, Turkey, Saudi Arabia, India, and Uzbekistan.\n" +
        "• **Airport Timelines:** Check-in closures and boarding procedures.\n\n" +
        "How can I help with your journey today?"
      ),
      isOfficial: true,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const samplePrompts = [
    "What flights are available from Kabul to Dubai?",
    "What is the baggage allowance for Economy vs Business?",
    "What are the visa requirements for Dubai?",
    "What is the policy for Zamzam water from Jeddah?",
    "How early should I arrive at Kabul airport?",
    "What is the flight duration to Istanbul?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (queryText) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("flights/assistant/", {
        query: text,
      });

      const data = res.data;
      const assistantMsg = {
        id: `asst-${Date.now()}`,
        role: "assistant",
        content: data.answer || data.message || "Thank you for contacting Kam Air. How else may I assist you?",
        source: data.source || "Kam Air Passenger Service",
        category: data.category,
        isOfficial: data.isOfficial ?? true,
        disclaimer: data.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI assistant error:", err);
      // Fallback response
      const fallbackMsg = {
        id: `asst-fallback-${Date.now()}`,
        role: "assistant",
        content: (
          "Thank you for contacting Kam Air.\n\n" +
          "For direct ticketing, schedule confirmations, and booking management, our 24/7 passenger operations desk is available at **+93 79 977 7777** or via email at **info@kamair.com**."
        ),
        isOfficial: true,
        source: "Kam Air Fallback Dispatcher",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isDashboard ? "w-full text-[#172033] dark:text-white" : "min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors"}>
      {!isDashboard && <Navbar />}

      <main className={isDashboard ? "w-full space-y-4" : "flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col space-y-4"}>
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F58220]/10 text-[#F58220] border border-[#F58220]/20 text-xs font-bold mb-1">
              <Sparkles size={14} />
              <span>Grounded Airline AI Assistant</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
              Kam Air Passenger Concierge
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Verified Kam Air Knowledge Base</span>
          </div>
        </div>

        {/* Chat Box Container */}
        <div className="flex-1 min-h-[460px] max-h-[620px] rounded-3xl bg-white dark:bg-[#0B1F3A]/90 shadow-xl border border-gray-100 dark:border-white/10 flex flex-col overflow-hidden">
          
          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === "user"
                      ? "bg-[#0B1F3A] dark:bg-white/20 text-white"
                      : "bg-[#F58220] text-white shadow-md shadow-[#F58220]/25"
                  }`}
                >
                  {msg.role === "user" ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-[#0B1F3A] text-white dark:bg-[#F58220]"
                        : "bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-800 dark:text-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Metadata / Source */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-gray-400 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.source && (
                      <>
                        <span>•</span>
                        <span className="text-[#F58220] font-semibold">{msg.source}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <div className="w-9 h-9 rounded-xl bg-[#F58220] text-white flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center gap-2 text-xs text-gray-500">
                  <RefreshCw size={14} className="animate-spin text-[#F58220]" />
                  <span>Kam Air Assistant is retrieving verified schedule & policy data...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/10 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-gray-400 shrink-0 uppercase tracking-wider">
              Suggestions:
            </span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-[#F58220] hover:text-[#F58220] font-medium whitespace-nowrap transition cursor-pointer shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-white dark:bg-[#0B1F3A] border-t border-gray-100 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Kam Air flights, baggage, visas, check-in, or customer support..."
              className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 transition"
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white shadow-md shadow-[#F58220]/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

        {/* Safety & Escalation Notice */}
        <div className="rounded-2xl bg-white dark:bg-[#0B1F3A]/60 p-4 border border-gray-100 dark:border-white/10 text-xs text-gray-500 dark:text-gray-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-[#F58220]" />
            <span>
              For official ticket modifications, refunds, or emergency rebooking, please call Kam Air 24/7 Support at <strong>+93 79 977 7777</strong>.
            </span>
          </div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Kam Air AI Gateway v2.4 (Grounded)
          </span>
        </div>
      </main>

      {!isDashboard && <Footer />}
    </div>
  );
}
