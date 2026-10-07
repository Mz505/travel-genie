import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/home/Footer";
import {
  Ticket,
  Search,
  Plane,
  Calendar,
  Clock,
  User,
  Luggage,
  Download,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function MyTripsPage() {
  const { user } = useAuth();
  const [pnrInput, setPnrInput] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [checkInModal, setCheckInModal] = useState(null);

  // Load user's bookings from API / localStorage
  const loadUserBookings = async () => {
    // 1. Check local saved mock bookings
    const local = JSON.parse(localStorage.getItem("kam_air_bookings") || "[]");

    // 2. If user logged in, fetch from backend
    if (user) {
      try {
        const res = await api.get("flights/my-bookings/");
        if (res.data?.bookings) {
          // Merge and deduplicate by PNR
          const merged = [...res.data.bookings];
          local.forEach((b) => {
            if (!merged.find((m) => m.pnr === b.pnr)) {
              merged.push(b);
            }
          });
          setBookings(merged);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch remote bookings, using local store:", err);
      }
    }

    if (local.length > 0) {
      setBookings(local);
    } else {
      // Default demo booking for immediate review
      const demoBooking = {
        id: "demo-1",
        pnr: "KAM-901DXB",
        passenger_name: user?.first_name ? `${user.first_name} ${user.last_name || ""}` : "Ahmad Shah",
        passenger_email: user?.email || "passenger@kamair.com",
        flight_number: "RQ-901",
        origin: "KBL",
        origin_city: "Kabul",
        destination: "DXB",
        destination_city: "Dubai",
        departure_date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
        departure_time: "08:30",
        arrival_time: "11:45",
        cabin_class: "Economy",
        seat_number: "14A",
        baggage_allowance: "30 kg checked + 7 kg cabin",
        total_price_usd: 295.0,
        status: "CONFIRMED",
        is_demo: true,
      };
      setBookings([demoBooking]);
    }
  };

  useEffect(() => {
    loadUserBookings();
  }, [user]);

  const handlePnrSearch = async (e) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;

    setSearchLoading(true);
    setSearchError("");
    setSearchedBooking(null);

    const clean = pnrInput.trim().toUpperCase();

    // Check in existing list
    const found = bookings.find((b) => b.pnr.toUpperCase() === clean);
    if (found) {
      setSearchedBooking(found);
      setSearchLoading(false);
      return;
    }

    try {
      const res = await api.get(`flights/pnr/${clean}/`);
      if (res.data?.booking) {
        setSearchedBooking(res.data.booking);
      } else {
        setSearchError(`No active booking found for PNR reference "${clean}".`);
      }
    } catch (err) {
      setSearchError(`No active booking found for PNR reference "${clean}".`);
    } finally {
      setSearchLoading(false);
    }
  };

  // Generate authentic Kam Air E-Ticket PDF
  const downloadETicketPDF = (booking) => {
    const doc = new jsPDF();

    // Header Background
    doc.setFillColor(11, 31, 58); // #0B1F3A
    doc.rect(0, 0, 210, 35, "F");

    // Header Text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("KAM AIR", 14, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(245, 130, 32); // #F58220
    doc.text("OFFICIAL ELECTRONIC TICKET & PASSENGER RECEIPT", 14, 26);

    doc.setTextColor(255, 255, 255);
    doc.text(`PNR: ${booking.pnr}`, 160, 20);
    doc.text(`DATE: ${booking.departure_date}`, 160, 26);

    // Passenger & Flight Info Section
    doc.setTextColor(17, 32, 51);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PASSENGER & BOOKING DETAILS", 14, 45);

    autoTable(doc, {
      startY: 50,
      head: [["Field", "Details"]],
      body: [
        ["Passenger Name", booking.passenger_name || "N/A"],
        ["Booking Reference (PNR)", booking.pnr],
        ["Flight Number", `${booking.flight_number} (Kam Air)`],
        ["Route", `${booking.origin_city} (${booking.origin}) to ${booking.destination_city} (${booking.destination})`],
        ["Departure Date & Time", `${booking.departure_date} at ${booking.departure_time}`],
        ["Scheduled Arrival", booking.arrival_time],
        ["Cabin Class", booking.cabin_class || "Economy"],
        ["Assigned Seat", booking.seat_number || "Unassigned (Check-in Required)"],
        ["Baggage Allowance", booking.baggage_allowance || "30 kg Checked + 7 kg Cabin"],
        ["Booking Status", booking.status || "CONFIRMED"],
        ["Total Fare Paid", `$${booking.total_price_usd || 295} USD`],
      ],
      headStyles: { fillColor: [11, 31, 58], textColor: [255, 255, 255], fontStyle: "bold" },
      theme: "striped",
      styles: { fontSize: 9, cellPadding: 3 },
    });

    // Important Travel Notices
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(11, 31, 58);
    doc.text("IMPORTANT PASSENGER INSTRUCTIONS", 14, finalY);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const notices = [
      "1. Check-in: Please report to the airport check-in counter at least 3 hours prior to departure for international flights and 2 hours for domestic flights.",
      "2. Boarding Gate: Boarding gates close strictly 45 minutes prior to scheduled flight departure.",
      "3. Travel Documents: Passengers must hold a valid passport (minimum 6 months validity) and appropriate entry visa for their destination.",
      "4. Baggage: Baggage allowance includes 30 kg checked luggage for Economy (40 kg Business) + 7 kg cabin bag.",
      "5. Zamzam Water: On flights departing Saudi Arabia (JED/MED), 5 Liters of Zamzam water is carried free of charge for Umrah pilgrims.",
      "6. Customer Support: 24/7 Helpline: +93 79 977 7777 | Email: info@kamair.com | Website: www.kamair.com",
    ];

    notices.forEach((n, idx) => {
      doc.text(n, 14, finalY + 7 + idx * 5);
    });

    // Footer
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 280, 196, 280);
    doc.setFontSize(7);
    doc.setTextColor(130, 130, 130);
    doc.text("Kam Air Digital Passenger Platform Prototype — Electronic Receipt", 14, 285);
    doc.text(`Issued for PNR: ${booking.pnr}`, 155, 285);

    doc.save(`KamAir_ETicket_${booking.pnr}.pdf`);
  };

  const handleSimulateCheckIn = (booking) => {
    const updated = bookings.map((b) =>
      b.pnr === booking.pnr ? { ...b, status: "CHECKED_IN", seat_number: b.seat_number || "12B" } : b
    );
    setBookings(updated);
    localStorage.setItem("kam_air_bookings", JSON.stringify(updated));
    setCheckInModal({
      ...booking,
      status: "CHECKED_IN",
      seat_number: booking.seat_number || "12B",
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#07111F] text-[#172033] dark:text-white flex flex-col transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F58220]/10 border border-[#F58220]/20 text-[#F58220] text-xs font-bold">
            <Ticket size={14} />
            <span>Passenger Trip Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0B1F3A] dark:text-white tracking-tight">
            My Trips & E-Tickets
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            View your upcoming flights, download your official Kam Air electronic ticket, and complete airport check-in.
          </p>
        </div>

        {/* PNR Search Card */}
        <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/80 p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-white/10 max-w-2xl mx-auto">
          <h2 className="text-base font-bold text-[#0B1F3A] dark:text-white mb-2 flex items-center gap-2">
            <Search size={18} className="text-[#F58220]" />
            <span>Retrieve Booking with PNR Reference</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Enter your 6 to 10-character Kam Air booking code (e.g., <strong>KAM-901DXB</strong> or from your ticket).
          </p>

          <form onSubmit={handlePnrSearch} className="flex gap-2">
            <input
              type="text"
              value={pnrInput}
              onChange={(e) => setPnrInput(e.target.value)}
              placeholder="Enter PNR code (e.g. KAM-901DXB)"
              className="flex-1 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3 text-sm font-semibold uppercase tracking-wider outline-none focus:border-[#F58220] focus:ring-2 focus:ring-[#F58220]/20 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={searchLoading || !pnrInput.trim()}
              className="rounded-xl bg-[#F58220] hover:bg-[#e07010] text-white px-6 py-3 font-bold text-sm shadow-md shadow-[#F58220]/25 transition flex items-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              <Search size={16} />
              <span>{searchLoading ? "Finding..." : "Find Trip"}</span>
            </button>
          </form>

          {searchError && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 dark:border-red-500/20 dark:bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Display Searched Booking if present */}
        {searchedBooking && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>Retrieved Reservation for PNR: {searchedBooking.pnr}</span>
            </h2>
            <BookingTicketCard
              booking={searchedBooking}
              onDownload={() => downloadETicketPDF(searchedBooking)}
              onCheckIn={() => handleSimulateCheckIn(searchedBooking)}
            />
          </div>
        )}

        {/* All Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0B1F3A] dark:text-white">
              Your Scheduled Journeys ({bookings.length})
            </h2>
            <Link
              to="/flights"
              className="text-xs font-bold text-[#F58220] hover:underline"
            >
              + Book Another Flight
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 rounded-3xl bg-white dark:bg-[#0B1F3A]/50 border border-gray-100 dark:border-white/10 p-8 space-y-3">
              <Ticket size={40} className="mx-auto text-gray-400" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">No Upcoming Trips Found</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                You haven't booked any flights with Kam Air yet. Search flights across our international and domestic route network.
              </p>
              <Link
                to="/flights"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F58220] text-white font-bold text-xs shadow-md"
              >
                <Plane size={15} />
                <span>Search Kam Air Flights</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {bookings.map((booking) => (
                <BookingTicketCard
                  key={booking.pnr}
                  booking={booking}
                  onDownload={() => downloadETicketPDF(booking)}
                  onCheckIn={() => handleSimulateCheckIn(booking)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Check-In Success Modal */}
      {checkInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0B1F3A] p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-white/10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-[#0B1F3A] dark:text-white">
              Check-In Successful!
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              You are checked in for flight <strong>{checkInModal.flight_number}</strong> on {checkInModal.departure_date}.
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Boarding Pass Seat:</span>
                <span className="font-bold text-[#F58220]">{checkInModal.seat_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Passenger:</span>
                <span className="font-bold text-gray-900 dark:text-white">{checkInModal.passenger_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Gate:</span>
                <span className="font-bold text-gray-900 dark:text-white">Gate 03 (Closes 45m prior)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => downloadETicketPDF(checkInModal)}
                className="flex-1 py-3 rounded-xl bg-[#F58220] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Download size={15} />
                <span>Download Boarding Pass</span>
              </button>
              <button
                type="button"
                onClick={() => setCheckInModal(null)}
                className="px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function BookingTicketCard({ booking, onDownload, onCheckIn }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#0B1F3A]/90 p-6 sm:p-7 shadow-xl border border-gray-100 dark:border-white/10 space-y-5">
      {/* Top Details */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0B1F3A] dark:bg-white/10 text-[#F58220] flex items-center justify-center">
            <Plane size={20} className="transform -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base text-[#0B1F3A] dark:text-white">
                {booking.flight_number}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F58220]/10 text-[#F58220]">
                {booking.cabin_class || "Economy"}
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              PNR: <strong className="text-gray-900 dark:text-white tracking-wider">{booking.pnr}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              booking.status === "CHECKED_IN"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20"
            }`}
          >
            {booking.status === "CHECKED_IN" ? "Checked In" : "Confirmed"}
          </span>
        </div>
      </div>

      {/* Flight Route and Timings */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Origin */}
        <div className="md:col-span-4 space-y-1">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white">
            {booking.departure_time || "08:30"}
          </span>
          <div className="font-bold text-sm text-gray-900 dark:text-white">
            {booking.origin_city || "Kabul"} ({booking.origin})
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Date: <strong className="text-gray-800 dark:text-gray-200">{booking.departure_date}</strong>
          </div>
        </div>

        {/* Route Line */}
        <div className="md:col-span-4 text-center space-y-1">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            Non-Stop Flight
          </span>
          <div className="relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-200 dark:bg-white/15" />
            <Plane size={16} className="text-[#F58220] absolute bg-white dark:bg-[#0B1F3A] px-0.5 transform rotate-90" />
          </div>
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Seat: <strong className="text-[#F58220]">{booking.seat_number || "14A"}</strong>
          </span>
        </div>

        {/* Destination */}
        <div className="md:col-span-4 space-y-1 md:text-right">
          <span className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-white">
            {booking.arrival_time || "11:45"}
          </span>
          <div className="font-bold text-sm text-gray-900 dark:text-white">
            {booking.destination_city || "Dubai"} ({booking.destination})
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Baggage: <strong className="text-gray-800 dark:text-gray-200">{booking.baggage_allowance || "30 kg"}</strong>
          </div>
        </div>
      </div>

      {/* Passenger Info & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-white/10 text-xs">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <User size={15} className="text-gray-400" />
          <span>Passenger: <strong className="text-gray-900 dark:text-white">{booking.passenger_name}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          {booking.status !== "CHECKED_IN" && (
            <button
              type="button"
              onClick={onCheckIn}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer shadow-sm"
            >
              Check In Online
            </button>
          )}

          <button
            type="button"
            onClick={onDownload}
            className="px-4 py-2 rounded-xl bg-[#0B1F3A] dark:bg-white/10 hover:bg-[#F58220] hover:text-white text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Download size={14} />
            <span>Download E-Ticket (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
