/**
 * Kam Air Route Network & Flight Data (Demo Data - Concept Prototype)
 * Based on Kam Air's primary domestic and international schedule hub at Kabul (KBL).
 */

export const KAM_AIR_CITIES = [
  { code: "KBL", name: "Kabul", country: "Afghanistan", airport: "Hamid Karzai International Airport", type: "hub" },
  { code: "DXB", name: "Dubai", country: "United Arab Emirates", airport: "Dubai International Airport (Terminal 2)", type: "international" },
  { code: "IST", name: "Istanbul", country: "Turkey", airport: "Istanbul Airport (IST)", type: "international" },
  { code: "DEL", name: "Delhi", country: "India", airport: "Indira Gandhi International Airport (Terminal 3)", type: "international" },
  { code: "JED", name: "Jeddah", country: "Saudi Arabia", airport: "King Abdulaziz International Airport", type: "international" },
  { code: "MED", name: "Medina", country: "Saudi Arabia", airport: "Prince Mohammad bin Abdulaziz Airport", type: "international" },
  { code: "TAS", name: "Tashkent", country: "Uzbekistan", airport: "Islam Karimov Tashkent International Airport", type: "international" },
  { code: "ISB", name: "Islamabad", country: "Pakistan", airport: "Islamabad International Airport", type: "international" },
  { code: "AUH", name: "Abu Dhabi", country: "United Arab Emirates", airport: "Zayed International Airport", type: "international" },
  { code: "HEA", name: "Herat", country: "Afghanistan", airport: "Khwaja Abdullah Ansari International Airport", type: "domestic" },
  { code: "MZR", name: "Mazar-i-Sharif", country: "Afghanistan", airport: "Mawlana Jalaluddin Balkhi International Airport", type: "domestic" },
  { code: "KDH", name: "Kandahar", country: "Afghanistan", airport: "Ahmad Shah Baba International Airport", type: "domestic" },
];

export const POPULAR_KAM_AIR_ROUTES = [
  { from: "KBL", to: "DXB", label: "Kabul → Dubai", priceUSD: 360 },
  { from: "KBL", to: "IST", label: "Kabul → Istanbul", priceUSD: 520 },
  { from: "KBL", to: "JED", label: "Kabul → Jeddah", priceUSD: 490 },
  { from: "KBL", to: "DEL", label: "Kabul → Delhi", priceUSD: 310 },
  { from: "KBL", to: "TAS", label: "Kabul → Tashkent", priceUSD: 340 },
  { from: "KBL", to: "HEA", label: "Kabul → Herat", priceUSD: 110 },
  { from: "KBL", to: "MZR", label: "Kabul → Mazar-i-Sharif", priceUSD: 105 },
];

export const KAM_AIR_FLEET = [
  {
    model: "Boeing 737-800",
    registration: "YA-KMN",
    capacity: "189 Seats (12 Business / 177 Economy)",
    range: "5,436 km",
    routes: "Dubai, Delhi, Tashkent, Islamabad, Domestic trunk routes",
  },
  {
    model: "Airbus A340-300",
    registration: "YA-KMH",
    capacity: "300 Seats (28 Business / 272 Economy)",
    range: "13,700 km",
    routes: "Istanbul, Jeddah (Hajj & Umrah flights), High-density international routes",
  },
  {
    model: "Boeing 737-300 / 500",
    registration: "YA-KMQ",
    capacity: "140 Seats",
    range: "4,200 km",
    routes: "Domestic routes (Herat, Mazar, Kandahar)",
  },
];

export const BAGGAGE_POLICIES = {
  economy: {
    checked: "30 kg (1 or 2 pieces)",
    cabin: "7 kg (1 personal bag, max 55x40x20 cm)",
    excessRateUSD: 10, // per kg
    zamzam: "5 Liters complimentary on Jeddah / Medina flights for pilgrims",
  },
  business: {
    checked: "40 kg (up to 2 pieces)",
    cabin: "10 kg (up to 2 personal items)",
    excessRateUSD: 8,
    zamzam: "5 Liters complimentary on Jeddah / Medina flights for pilgrims",
  },
};

export const KAM_AIR_SCHEDULES = [
  // Kabul <-> Dubai
  {
    flightNumber: "RQ-901",
    origin: "KBL",
    destination: "DXB",
    departureTime: "08:30",
    arrivalTime: "11:45",
    duration: "3h 45m",
    days: [1, 2, 3, 4, 5, 6, 7], // Daily
    aircraft: "Boeing 737-800",
    basePriceUSD: 295,
    stops: 0,
  },
  {
    flightNumber: "RQ-903",
    origin: "KBL",
    destination: "DXB",
    departureTime: "16:15",
    arrivalTime: "19:30",
    duration: "3h 45m",
    days: [1, 3, 5, 7],
    aircraft: "Boeing 737-800",
    basePriceUSD: 310,
    stops: 0,
  },
  {
    flightNumber: "RQ-902",
    origin: "DXB",
    destination: "KBL",
    departureTime: "13:00",
    arrivalTime: "16:45",
    duration: "3h 15m",
    days: [1, 2, 3, 4, 5, 6, 7],
    aircraft: "Boeing 737-800",
    basePriceUSD: 280,
    stops: 0,
  },
  {
    flightNumber: "RQ-904",
    origin: "DXB",
    destination: "KBL",
    departureTime: "20:45",
    arrivalTime: "00:30",
    duration: "3h 15m",
    days: [1, 3, 5, 7],
    aircraft: "Boeing 737-800",
    basePriceUSD: 290,
    stops: 0,
  },

  // Kabul <-> Istanbul
  {
    flightNumber: "RQ-101",
    origin: "KBL",
    destination: "IST",
    departureTime: "07:15",
    arrivalTime: "12:00",
    duration: "5h 15m",
    days: [2, 4, 6],
    aircraft: "Airbus A340-300",
    basePriceUSD: 520,
    stops: 0,
  },
  {
    flightNumber: "RQ-102",
    origin: "IST",
    destination: "KBL",
    departureTime: "13:30",
    arrivalTime: "20:15",
    duration: "5h 15m",
    days: [2, 4, 6],
    aircraft: "Airbus A340-300",
    basePriceUSD: 495,
    stops: 0,
  },

  // Kabul <-> Delhi
  {
    flightNumber: "RQ-501",
    origin: "KBL",
    destination: "DEL",
    departureTime: "09:45",
    arrivalTime: "12:45",
    duration: "2h 30m",
    days: [1, 3, 5],
    aircraft: "Boeing 737-800",
    basePriceUSD: 240,
    stops: 0,
  },
  {
    flightNumber: "RQ-502",
    origin: "DEL",
    destination: "KBL",
    departureTime: "14:15",
    arrivalTime: "16:15",
    duration: "2h 30m",
    days: [1, 3, 5],
    aircraft: "Boeing 737-800",
    basePriceUSD: 230,
    stops: 0,
  },

  // Kabul <-> Jeddah (Umrah/Pilgrim route)
  {
    flightNumber: "RQ-701",
    origin: "KBL",
    destination: "JED",
    departureTime: "10:30",
    arrivalTime: "15:00",
    duration: "5h 00m",
    days: [2, 5, 7],
    aircraft: "Airbus A340-300",
    basePriceUSD: 610,
    stops: 0,
  },
  {
    flightNumber: "RQ-702",
    origin: "JED",
    destination: "KBL",
    departureTime: "16:30",
    arrivalTime: "23:00",
    duration: "4h 30m",
    days: [2, 5, 7],
    aircraft: "Airbus A340-300",
    basePriceUSD: 590,
    stops: 0,
  },

  // Kabul <-> Tashkent
  {
    flightNumber: "RQ-301",
    origin: "KBL",
    destination: "TAS",
    departureTime: "11:00",
    arrivalTime: "13:15",
    duration: "1h 45m",
    days: [3, 6],
    aircraft: "Boeing 737-800",
    basePriceUSD: 210,
    stops: 0,
  },
  {
    flightNumber: "RQ-302",
    origin: "TAS",
    destination: "KBL",
    departureTime: "15:00",
    arrivalTime: "17:15",
    duration: "1h 45m",
    days: [3, 6],
    aircraft: "Boeing 737-800",
    basePriceUSD: 200,
    stops: 0,
  },

  // Kabul <-> Islamabad
  {
    flightNumber: "RQ-201",
    origin: "KBL",
    destination: "ISB",
    departureTime: "14:00",
    arrivalTime: "15:30",
    duration: "1h 00m",
    days: [1, 2, 4, 6],
    aircraft: "Boeing 737-800",
    basePriceUSD: 160,
    stops: 0,
  },
  {
    flightNumber: "RQ-202",
    origin: "ISB",
    destination: "KBL",
    departureTime: "17:00",
    arrivalTime: "17:30",
    duration: "1h 00m",
    days: [1, 2, 4, 6],
    aircraft: "Boeing 737-800",
    basePriceUSD: 155,
    stops: 0,
  },

  // Domestic: Kabul <-> Herat
  {
    flightNumber: "RQ-111",
    origin: "KBL",
    destination: "HEA",
    departureTime: "07:30",
    arrivalTime: "08:45",
    duration: "1h 15m",
    days: [1, 2, 3, 4, 5, 6, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 75,
    stops: 0,
  },
  {
    flightNumber: "RQ-112",
    origin: "HEA",
    destination: "KBL",
    departureTime: "09:30",
    arrivalTime: "10:45",
    duration: "1h 15m",
    days: [1, 2, 3, 4, 5, 6, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 75,
    stops: 0,
  },

  // Domestic: Kabul <-> Mazar-i-Sharif
  {
    flightNumber: "RQ-121",
    origin: "KBL",
    destination: "MZR",
    departureTime: "08:00",
    arrivalTime: "08:50",
    duration: "0h 50m",
    days: [1, 2, 3, 4, 5, 6, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 65,
    stops: 0,
  },
  {
    flightNumber: "RQ-122",
    origin: "MZR",
    destination: "KBL",
    departureTime: "09:40",
    arrivalTime: "10:30",
    duration: "0h 50m",
    days: [1, 2, 3, 4, 5, 6, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 65,
    stops: 0,
  },

  // Domestic: Kabul <-> Kandahar
  {
    flightNumber: "RQ-131",
    origin: "KBL",
    destination: "KDH",
    departureTime: "11:30",
    arrivalTime: "12:30",
    duration: "1h 00m",
    days: [1, 3, 5, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 70,
    stops: 0,
  },
  {
    flightNumber: "RQ-132",
    origin: "KDH",
    destination: "KBL",
    departureTime: "13:30",
    arrivalTime: "14:30",
    duration: "1h 00m",
    days: [1, 3, 5, 7],
    aircraft: "Boeing 737-500",
    basePriceUSD: 70,
    stops: 0,
  },
];

export const VISA_REQUIREMENTS_DATA = {
  DXB: {
    destinationName: "Dubai / United Arab Emirates",
    visaType: "Tourist Visa (30 or 60 Days)",
    requirements: [
      "Valid Afghan passport with minimum 6 months validity from date of entry",
      "Confirmed round-trip return ticket (Kam Air ticket copy accepted)",
      "Confirmed hotel reservation or host residence documentation",
      "Sponsor / travel agency guarantee letter",
      "Passport-sized photograph with white background",
    ],
    processingTime: "3 to 5 working days",
    officialSource: "General Directorate of Residency and Foreigners Affairs (GDRFA Dubai)",
    lastVerified: "October 2026",
    notes: "Kam Air flights arrive at Terminal 2 at Dubai International Airport (DXB). Ensure you carry printed copies of e-Visa upon departure at Kabul KBL airport.",
  },
  IST: {
    destinationName: "Istanbul / Turkey",
    visaType: "Sticker Tourist / Business Visa (Turkish Consulate)",
    requirements: [
      "Original passport with minimum 6 months validity beyond intended stay",
      "Confirmed return Kam Air flight reservation",
      "Bank statement covering sufficient travel funds ($50/day minimum)",
      "Travel medical insurance covering €30,000",
      "Hotel accommodation booking confirmation",
    ],
    processingTime: "10 to 15 working days",
    officialSource: "Turkish Embassy / Consulate General in Kabul & Mazar-i-Sharif",
    lastVerified: "September 2026",
    notes: "Kam Air flights land at Istanbul Airport (IST). Check-in baggage allowance is 30 kg for Economy and 40 kg for Business.",
  },
  JED: {
    destinationName: "Jeddah / Saudi Arabia (Umrah & Visitor)",
    visaType: "Umrah Visa / Tourist eVisa",
    requirements: [
      "Valid passport with at least 6 months validity",
      "Approved Umrah package through authorized agent or Nusuk platform",
      "Mandatory meningitis and seasonal influenza vaccination certificate",
      "Confirmed return flight booking with Kam Air",
    ],
    processingTime: "2 to 4 working days (via Nusuk platform)",
    officialSource: "Saudi Ministry of Hajj and Umrah",
    lastVerified: "October 2026",
    notes: "Kam Air provides complimentary 5-liter Zamzam water transport for departing pilgrims from King Abdulaziz International Airport (JED).",
  },
  DEL: {
    destinationName: "Delhi / India",
    visaType: "Medical / Business / Tourist e-Visa",
    requirements: [
      "Valid Afghan passport with minimum 6 months validity",
      "Valid e-Emergency X-Misc / Medical visa stamp",
      "Hospital appointment letter (for medical visitors)",
      "Return flight ticket on Kam Air",
      "Sufficient funds and local Indian sponsor contact details",
    ],
    processingTime: "7 to 20 working days depending on category",
    officialSource: "High Commission of India / e-Visa Portal",
    lastVerified: "October 2026",
    notes: "Flights arrive at Indira Gandhi International Airport (DEL) Terminal 3.",
  },
  TAS: {
    destinationName: "Tashkent / Uzbekistan",
    visaType: "Tourist Visa / Business Visa",
    requirements: [
      "Valid Afghan passport",
      "Confirmed round-trip flight booking with Kam Air",
      "Hotel booking voucher in Tashkent",
      "Letter of invitation (for business visa applicants)",
    ],
    processingTime: "5 to 7 working days",
    officialSource: "Consulate of Uzbekistan in Kabul and Mazar-i-Sharif",
    lastVerified: "August 2026",
    notes: "Uzbekistan offers convenient overland & air transit connections. Flight duration KBL to TAS is only 1h 45m.",
  },
  ISB: {
    destinationName: "Islamabad / Pakistan",
    visaType: "Pakistan Online Visa (POVS)",
    requirements: [
      "Valid Afghan passport",
      "Online visa application through Nadra portal",
      "Confirmed round-trip Kam Air flight ticket",
      "Pakistani host contact or hotel reservation",
    ],
    processingTime: "3 to 7 working days",
    officialSource: "Embassy of Pakistan in Kabul & NADRA Portal",
    lastVerified: "September 2026",
    notes: "Fastest international connection from Kabul (approx. 1 hour flight time).",
  },
};

/**
 * Searches Kam Air flights based on parameters.
 */
export function searchKamAirFlights({
  origin,
  destination,
  departureDate,
  returnDate,
  passengers = 1,
  cabinClass = "Economy",
  tripType = "roundTrip",
}) {
  const outboundFlights = KAM_AIR_SCHEDULES.filter((flight) => {
    const originMatch = origin ? flight.origin === origin : true;
    const destMatch = destination ? flight.destination === destination : true;
    return originMatch && destMatch;
  }).map((flight) => {
    const multiplier = cabinClass === "Business" ? 2.2 : 1;
    const price = Math.round(flight.basePriceUSD * multiplier);
    return {
      ...flight,
      id: `${flight.flightNumber}-${departureDate || "date"}-out`,
      date: departureDate || new Date().toISOString().split("T")[0],
      cabinClass,
      passengers,
      priceUSD: price,
      totalPriceUSD: price * passengers,
      baggage: cabinClass === "Business" ? BAGGAGE_POLICIES.business : BAGGAGE_POLICIES.economy,
      airline: "Kam Air",
      airlineCode: "RQ",
      isDemo: true,
    };
  });

  let returnFlights = [];
  if (tripType === "roundTrip") {
    returnFlights = KAM_AIR_SCHEDULES.filter((flight) => {
      const originMatch = destination ? flight.origin === destination : true;
      const destMatch = origin ? flight.destination === origin : true;
      return originMatch && destMatch;
    }).map((flight) => {
      const multiplier = cabinClass === "Business" ? 2.2 : 1;
      const price = Math.round(flight.basePriceUSD * multiplier);
      return {
        ...flight,
        id: `${flight.flightNumber}-${returnDate || "ret"}-in`,
        date: returnDate || departureDate || new Date().toISOString().split("T")[0],
        cabinClass,
        passengers,
        priceUSD: price,
        totalPriceUSD: price * passengers,
        baggage: cabinClass === "Business" ? BAGGAGE_POLICIES.business : BAGGAGE_POLICIES.economy,
        airline: "Kam Air",
        airlineCode: "RQ",
        isDemo: true,
      };
    });
  }

  return {
    outbound: outboundFlights,
    returnFlights,
    tripType,
  };
}
