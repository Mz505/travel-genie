import { useState } from "react";
import {
  X,
  Plane,
  User,
  ShieldCheck,
  CheckCircle2,
  Luggage,
  Calendar,
  CreditCard,
  Download,
  BookmarkCheck,
  ArrowRight,
  AlertCircle,
  Clock,
  MapPin,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useLocalization } from "../../context/LocalizationContext";
import { useTrips } from "../../context/TripContext.jsx";
import { useAuth } from "../../context/AuthContext";
import { KAM_AIR_CITIES } from "../../data/kamAirRoutes";

export default function BookingModal({ flight, returnFlight, onClose, onBookingSuccess }) {
  const { formatPrice, currency, t } = useLocalization();
  const { addTrip } = useTrips();
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [savingTrip, setSavingTrip] = useState(false);
  const [tripSaved, setTripSaved] = useState(false);

  // Step 2 form state
  const [passenger, setPassenger] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    passportNumber: "",
    passportExpiry: "",
    dob: "",
    nationality: "Afghan",
    email: user?.email || "",
    phone: "",
  });

  // Step 3 extras state
  const [cabinClass, setCabinClass] = useState(flight?.cabinClass || "Economy");
  const [seatPreference, setSeatPreference] = useState("Window");
  const [extraLuggageKg, setExtraLuggageKg] = useState(0);
  const [mealPreference, setMealPreference] = useState("Standard Halal");

  // Step 4 generated PNR
  const [pnr] = useState(() => "RQ-" + Math.floor(100000 + Math.random() * 900000));

  const originCity = KAM_AIR_CITIES.find((c) => c.code === flight.origin) || { name: flight.origin };
  const destCity = KAM_AIR_CITIES.find((c) => c.code === flight.destination) || { name: flight.destination };

  const basePrice = (flight.priceUSD || 250) + (returnFlight ? returnFlight.priceUSD || 250 : 0);
  const luggagePrice = extraLuggageKg * 10;
  const totalPriceUSD = basePrice + luggagePrice;

  const handlePassengerChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 2) {
      if (!passenger.firstName || !passenger.lastName || !passenger.passportNumber) {
        alert("Please fill in required passenger names and passport number.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  // Save directly to TravelGenie "My Trips" (Django DB)
  const handleSaveToMyTrips = async () => {
    try {
      setSavingTrip(true);
      const tripData = {
        destination: destCity.name,
        origin: originCity.name,
        start_date: flight.date,
        end_date: returnFlight?.date || flight.date,
        budget: totalPriceUSD,
        itinerary: [
          {
            day: 1,
            title: `Arrival in ${destCity.name} via Kam Air ${flight.flightNumber}`,
            flightNumber: flight.flightNumber,
            pnr: pnr,
            origin: originCity.name,
            destination: destCity.name,
            departureTime: flight.departureTime,
            arrivalTime: flight.arrivalTime,
            aircraft: flight.aircraft,
            seat: seatPreference,
            cabin: cabinClass,
            baggage: `${flight.baggage?.checked || "30kg"} + ${extraLuggageKg}kg extra`,
            passenger: `${passenger.firstName} ${passenger.lastName}`,
            passport: passenger.passportNumber,
          },
        ],
      };

      if (addTrip) {
        await addTrip(tripData);
      }
      setTripSaved(true);
    } catch (err) {
      console.error("Error saving trip:", err);
      alert("Reservation confirmed! Note: Log in to sync automatically with cloud trips.");
      setTripSaved(true);
    } finally {
      setSavingTrip(false);
    }
  };

  // Generate official-looking Kam Air PDF e-Ticket
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header & Branding
      doc.setFillColor(7, 22, 37);
      doc.rect(0, 0, 210, 35, "F");
      
      doc.setFontSize(22);
      doc.setTextColor(245, 158, 11); // Amber / Gold
      doc.text("KAM AIR", 14, 20);
      
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text("ELECTRONIC TICKET RECEIPT & FLIGHT ITINERARY", 14, 28);
      doc.text(`BOOKING REF (PNR): ${pnr}`, 140, 20);
      doc.text(`ISSUED: ${new Date().toLocaleDateString()}`, 140, 28);

      // Passenger Details
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(12);
      doc.text("Passenger Information", 14, 46);

      autoTable(doc, {
        startY: 50,
        head: [["Passenger Name", "Passport No.", "Nationality", "Cabin Class", "Seat"]],
        body: [
          [
            `${passenger.firstName} ${passenger.lastName}`.toUpperCase(),
            passenger.passportNumber.toUpperCase(),
            passenger.nationality,
            cabinClass,
            `${seatPreference} Preference`,
          ],
        ],
        theme: "grid",
        headStyles: { fillColor: [7, 26, 43] },
      });

      // Flight Details
      const flightRows = [
        [
          flight.flightNumber,
          flight.date,
          `${originCity.name} (${flight.origin})`,
          flight.departureTime,
          `${destCity.name} (${flight.destination})`,
          flight.arrivalTime,
          flight.aircraft,
          flight.baggage?.checked || "30 kg",
        ],
      ];

      if (returnFlight) {
        flightRows.push([
          returnFlight.flightNumber,
          returnFlight.date,
          `${destCity.name} (${flight.destination})`,
          returnFlight.departureTime,
          `${originCity.name} (${flight.origin})`,
          returnFlight.arrivalTime,
          returnFlight.aircraft,
          returnFlight.baggage?.checked || "30 kg",
        ]);
      }

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 12,
        head: [["Flight", "Date", "From", "Dep", "To", "Arr", "Aircraft", "Baggage"]],
        body: flightRows,
        theme: "grid",
        headStyles: { fillColor: [217, 119, 6] },
      });

      // Payment & Fare Summary
      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 12,
        head: [["Fare Item", "Details", "Amount"]],
        body: [
          ["Air Transportation Charges", `${flight.flightNumber} ${cabinClass}`, formatPrice(basePrice)],
          ["Additional Checked Baggage", `${extraLuggageKg} kg`, formatPrice(luggagePrice)],
          ["Airport Security & Handling Taxes", "Included", "$0.00"],
          ["Total Fare", "Confirmed", formatPrice(totalPriceUSD)],
        ],
        theme: "striped",
        headStyles: { fillColor: [7, 26, 43] },
      });

      // Disclaimer Footer
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(
        "PROTOTYPE DISCLAIMER: This document is an e-ticket preview generated by TravelGenie x Kam Air Concept Prototype.",
        14,
        doc.internal.pageSize.height - 15
      );
      doc.text(
        "For actual commercial air travel, reservations must be confirmed through Kam Air's authorized agents or official ticketing counters.",
        14,
        doc.internal.pageSize.height - 10
      );

      doc.save(`KamAir_Ticket_${pnr}.pdf`);
    } catch (e) {
      console.error("PDF generation failed:", e);
      alert("Unable to generate PDF on this device.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-white dark:bg-[#071625] border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#071625] to-[#0d2a47] text-white border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
              RQ
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Kam Air Flight Reservation</h3>
              <p className="text-[11px] text-white/60">Concept Booking Journey • Prototype</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-xl flex items-center justify-center text-white/70 hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-white/[0.02] border-b border-gray-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold">
          {[
            { num: 1, label: "Flight" },
            { num: 2, label: "Passenger" },
            { num: 3, label: "Extras" },
            { num: 4, label: "Confirm" },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 ${
                step >= s.num ? "text-amber-500 dark:text-amber-400" : "text-gray-400 dark:text-white/30"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s.num
                    ? "bg-amber-500 text-white"
                    : step > s.num
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 dark:bg-white/10"
                }`}
              >
                {step > s.num ? <CheckCircle2 size={13} /> : s.num}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Flight Review */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
                <span className="font-bold">Selected Outbound Flight:</span> {originCity.name} ({flight.origin}) →{" "}
                {destCity.name} ({flight.destination}) on {flight.date}
              </div>

              {/* Flight Summary Card */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plane size={18} className="text-cyan-500" />
                    <span className="font-bold text-gray-900 dark:text-white">{flight.flightNumber}</span>
                    <span className="text-xs text-gray-500 dark:text-white/50">({flight.aircraft})</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    Non-Stop Direct
                  </span>
                </div>

                <div className="flex items-center justify-between text-center sm:text-left">
                  <div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{flight.departureTime}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60">{originCity.name}</p>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className="text-[11px] font-medium text-gray-400 dark:text-white/40">{flight.duration}</span>
                    <div className="w-24 sm:w-36 h-0.5 bg-gray-300 dark:bg-white/20 my-1 relative">
                      <div className="absolute right-0 -top-1 h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{flight.arrivalTime}</p>
                    <p className="text-xs text-gray-500 dark:text-white/60">{destCity.name}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between text-xs text-gray-600 dark:text-white/70">
                  <div className="flex items-center gap-2">
                    <Luggage size={14} className="text-amber-500" />
                    <span>Included: {flight.baggage?.checked || "30 kg"} checked + 7 kg cabin</span>
                  </div>
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {formatPrice(flight.priceUSD)}
                  </span>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-white/80 mb-2">
                  Select Cabin Class
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCabinClass("Economy")}
                    className={`p-4 rounded-xl border text-left transition ${
                      cabinClass === "Economy"
                        ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/20"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Economy Class</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">30 kg checked • Complimentary meal</p>
                    <p className="text-sm font-black text-amber-600 dark:text-amber-400 mt-2">{formatPrice(flight.priceUSD)}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCabinClass("Business")}
                    className={`p-4 rounded-xl border text-left transition ${
                      cabinClass === "Business"
                        ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/20"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-bold text-sm text-gray-900 dark:text-white">Business Class</p>
                    <p className="text-xs text-gray-500 dark:text-white/60 mt-1">40 kg checked • Lounge access • Priority check-in</p>
                    <p className="text-sm font-black text-amber-600 dark:text-amber-400 mt-2">{formatPrice(Math.round(flight.priceUSD * 2.2))}</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Passenger Details */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-gray-500 dark:text-white/60">
                Please enter passenger details exactly as they appear on your passport for Kam Air manifest.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    First / Given Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={passenger.firstName}
                    onChange={handlePassengerChange}
                    placeholder="e.g. Ahmad"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    Last / Family Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={passenger.lastName}
                    onChange={handlePassengerChange}
                    placeholder="e.g. Popal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    value={passenger.passportNumber}
                    onChange={handlePassengerChange}
                    placeholder="e.g. O12345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white uppercase outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    Passport Expiry Date *
                  </label>
                  <input
                    type="date"
                    name="passportExpiry"
                    value={passenger.passportExpiry}
                    onChange={handlePassengerChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={passenger.dob}
                    onChange={handlePassengerChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={passenger.nationality}
                    onChange={handlePassengerChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={passenger.phone}
                    onChange={handlePassengerChange}
                    placeholder="+93 7..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-white/80 mb-1">
                  Email Address (for e-ticket receipt)
                </label>
                <input
                  type="email"
                  name="email"
                  value={passenger.email}
                  onChange={handlePassengerChange}
                  placeholder="traveler@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Add-ons & Baggage */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Extra Luggage */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Luggage size={18} className="text-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Additional Baggage</p>
                      <p className="text-xs text-gray-500 dark:text-white/60">Standard 30 kg is already included</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    +{formatPrice(luggagePrice)}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[0, 5, 10, 20].map((kg) => (
                    <button
                      key={kg}
                      type="button"
                      onClick={() => setExtraLuggageKg(kg)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                        extraLuggageKg === kg
                          ? "bg-amber-500 text-white"
                          : "bg-white dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-200 dark:border-white/10"
                      }`}
                    >
                      {kg === 0 ? "None (0kg)" : `+${kg} kg ($${kg * 10})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seat Preference */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">Seat Preference</p>
                <div className="grid grid-cols-3 gap-2">
                  {["Window", "Aisle", "Any"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSeatPreference(s)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                        seatPreference === s
                          ? "bg-cyan-500 text-white"
                          : "bg-white dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-200 dark:border-white/10"
                      }`}
                    >
                      {s} Seat
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal Preference */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">Complimentary Meal Preference</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Standard Halal", "Vegetarian / Jain", "Diabetic Meal", "Child Meal"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMealPreference(m)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition text-left ${
                        mealPreference === m
                          ? "bg-cyan-500 text-white"
                          : "bg-white dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-200 dark:border-white/10"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation */}
          {step === 4 && (
            <div className="space-y-5 text-center sm:text-left">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                <CheckCircle2 size={22} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Kam Air Concept Reservation Confirmed!</h4>
                  <p className="text-xs mt-0.5 opacity-90">
                    Your flight booking details have been verified and assigned a PNR locator code.
                  </p>
                </div>
              </div>

              {/* E-Ticket Preview Card */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#071625] to-[#0a233a] text-white shadow-xl border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                      KAM AIR BOARDING PASS
                    </span>
                    <h3 className="text-lg font-black">{flight.flightNumber}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/60 block">BOOKING REF (PNR)</span>
                    <span className="text-lg font-mono font-black text-amber-400">{pnr}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
                  <div>
                    <span className="text-[10px] text-white/50 block">PASSENGER</span>
                    <span className="font-bold truncate block">{passenger.firstName} {passenger.lastName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">DATE</span>
                    <span className="font-bold">{flight.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">ROUTE</span>
                    <span className="font-bold">{flight.origin} → {flight.destination}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/50 block">CLASS / SEAT</span>
                    <span className="font-bold">{cabinClass} ({seatPreference})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <span className="text-white/60">Departure: {flight.departureTime} • Terminal 2</span>
                  <span className="font-bold text-amber-400 text-sm">{formatPrice(totalPriceUSD)}</span>
                </div>
              </div>

              {/* Prototype Disclaimer */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-200">
                <span className="font-bold">Portfolio Demonstration Disclaimer:</span> This prototype demonstrates the customer booking journey. Live commercial booking would connect to Kam Air's Amadeus/Sirena reservation system & payment gateway.
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 transition"
                >
                  <Download size={16} />
                  Download PDF Itinerary
                </button>

                <button
                  type="button"
                  onClick={handleSaveToMyTrips}
                  disabled={savingTrip || tripSaved}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition ${
                    tripSaved
                      ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/30"
                      : "bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                  }`}
                >
                  <BookmarkCheck size={16} />
                  {tripSaved ? "Saved in My Trips!" : savingTrip ? "Saving..." : "Save to My Trips"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((p) => p - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 hover:scale-105 transition"
            >
              <span>{step === 3 ? "Review & Confirm" : "Continue"}</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-white/10 text-xs font-semibold text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
