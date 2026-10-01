import { createContext, useContext, useEffect, useState } from "react";

export const CURRENCIES = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", rateFromUSD: 1 },
  AFN: { code: "AFN", symbol: "؋", name: "Afghan Afghani", rateFromUSD: 70.5 },
  AED: { code: "AED", symbol: "AED", name: "UAE Dirham", rateFromUSD: 3.67 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", rateFromUSD: 0.92 },
};

export const LANGUAGES = {
  en: { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  fa: { code: "fa", name: "Dari", nativeName: "دری", dir: "rtl" },
  ps: { code: "ps", name: "Pashto", nativeName: "پښتو", dir: "rtl" },
};

const TRANSLATIONS = {
  en: {
    brand_sub: "TravelGenie × Kam Air",
    concept_badge: "Concept Prototype",
    flight_search: "Flight Search",
    flight_directory: "Kam Air Flights",
    departure: "Departure",
    destination: "Destination",
    origin: "Origin",
    departure_date: "Departure Date",
    return_date: "Return Date",
    passengers: "Passengers",
    passenger: "Passenger",
    adults: "Adults",
    cabin_class: "Cabin Class",
    economy: "Economy Class",
    business: "Business Class",
    round_trip: "Round Trip",
    one_way: "One-Way",
    search_flights: "Search Flights",
    no_flights_found: "No scheduled Kam Air flights found for this selection.",
    book_now: "Book Flight",
    plan_with_ai: "Plan Trip with AI",
    from_price: "From",
    baggage_included: "Checked Baggage",
    cabin_baggage: "Cabin Bag",
    duration: "Duration",
    direct: "Direct",
    demo_notice: "Demo Data — Concept Prototype for portfolio demonstration.",
    visa_info: "Travel & Visa Information",
    my_trips: "My Trips",
    step_select: "1. Select Flight",
    step_passenger: "2. Passenger Details",
    step_addons: "3. Baggage & Extras",
    step_confirm: "4. Confirmation",
    passenger_name: "Full Name (as in Passport)",
    passport_num: "Passport Number",
    passport_expiry: "Passport Expiry Date",
    nationality: "Nationality",
    email: "Email Address",
    phone: "WhatsApp / Phone",
    confirm_booking: "Confirm Reservation",
    booking_success: "Reservation Generated Successfully!",
    pnr_code: "Booking Reference (PNR)",
    save_to_trips: "Save to My Trips",
    download_ticket: "Download PDF Itinerary",
    admin_analytics: "Kam Air Analytics",
  },
  fa: {
    brand_sub: "تراول جینی × کام ایر",
    concept_badge: "طرح اولیه آزمایشی",
    flight_search: "جستجوی پرواز",
    flight_directory: "پروازهای کام ایر",
    departure: "مبدا حرکت",
    destination: "مقصد",
    origin: "مبدا",
    departure_date: "تاریخ رفت",
    return_date: "تاریخ برگشت",
    passengers: "مسافران",
    passenger: "مسافر",
    adults: "بزرگسال",
    cabin_class: "کلاس پرواز",
    economy: "اکونومی",
    business: "بیزنس کلاس",
    round_trip: "رفت و برگشت",
    one_way: "یک طرفه",
    search_flights: "جستجوی پروازها",
    no_flights_found: "برای مسیر انتخاب شده پروازی یافت نشد.",
    book_now: "رزرو پرواز",
    plan_with_ai: "برنامه‌ریزی هوشمند با هوش مصنوعی",
    from_price: "شروع از",
    baggage_included: "بار مجاز",
    cabin_baggage: "بار دستی کابین",
    duration: "مدت پرواز",
    direct: "مستقیم",
    demo_notice: "اطلاعات آزمایشی — نمونه اولیه برای ارزیابی طرح.",
    visa_info: "شرایط ویزا و سفر",
    my_trips: "سفرهای من",
    step_select: "۱. انتخاب پرواز",
    step_passenger: "۲. مشخصات مسافر",
    step_addons: "۳. بار و خدمات اضافی",
    step_confirm: "۴. تایید نهایی",
    passenger_name: "نام کامل (مطابق پاسپورت)",
    passport_num: "شماره پاسپورت",
    passport_expiry: "تاریخ انقضای پاسپورت",
    nationality: "تابعیت",
    email: "ایمیل",
    phone: "واتساپ / شماره تماس",
    confirm_booking: "تایید رزرو",
    booking_success: "رزرو آزمایشی با موفقیت صادر شد!",
    pnr_code: "کد پیگیری رزرو (PNR)",
    save_to_trips: "ذخیره در سفرهای من",
    download_ticket: "دانلود تکت پی‌دی‌اف",
    admin_analytics: "آمار و ارقام کام ایر",
  },
  ps: {
    brand_sub: "ټراول جیني × کام ایر",
    concept_badge: "ازمایښتي ډیمو",
    flight_search: "د الوتنې لټون",
    flight_directory: "د کام ایر الوتنې",
    departure: "حرکت ځای",
    destination: "منزل / مقصد",
    origin: "مبدا",
    departure_date: "د تګ نېټه",
    return_date: "د بېرته راتګ نېټه",
    passengers: "مسافرین",
    passenger: "مسافر",
    adults: "بالغ",
    cabin_class: "د کیبن طبقه",
    economy: "اکانومي",
    business: "بزنس ټولګی",
    round_trip: "تګ او راتګ",
    one_way: "یو طرفه",
    search_flights: "الوتنې ولټوئ",
    no_flights_found: "د دې لارې لپاره هیڅ الوتنه ونه موندل شوه.",
    book_now: "ټکټ ریزرو کړئ",
    plan_with_ai: "د مصنوعي ذهانت سره پلان جوړ کړئ",
    from_price: "پیل له",
    baggage_included: "مجاز سامان",
    cabin_baggage: "د کیبن بکس",
    duration: "د الوتنې وخت",
    direct: "مستقیم",
    demo_notice: "ازمایښتي ډاټا — د پورتفولیو ښودلو لپاره پروټوټایپ.",
    visa_info: "د ویزې او سفر لارښود",
    my_trips: "زما سفرونه",
    step_select: "۱. د الوتنې ټاکنه",
    step_passenger: "۲. د مسافر معلومات",
    step_addons: "۳. اضافي سامان",
    step_confirm: "۴. نهایی تایید",
    passenger_name: "بشپړ نوم (د پاسپورټ مطابق)",
    passport_num: "د پاسپورټ شمېره",
    passport_expiry: "د پاسپورټ د پای نېټه",
    nationality: "تابعیت",
    email: "برېښنالیک",
    phone: "واټس‌اپ / ټلیفون",
    confirm_booking: "ریزرو تایید کړئ",
    booking_success: "ریزرویشن په بریالیتوب سره ثبت شو!",
    pnr_code: "د ثبت کود (PNR)",
    save_to_trips: "په زما سفرونو کې خوندي کړئ",
    download_ticket: "د ټکټ PDF ډاونلوډ",
    admin_analytics: "د کام ایر احصایې",
  },
};

const LocalizationContext = createContext();

export function LocalizationProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("travelgenie_currency") || "AFN";
  });

  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("travelgenie_lang") || "en";
  });

  const setCurrency = (curr) => {
    if (CURRENCIES[curr]) {
      setCurrencyState(curr);
      localStorage.setItem("travelgenie_currency", curr);
    }
  };

  const setLanguage = (lang) => {
    if (LANGUAGES[lang]) {
      setLanguageState(lang);
      localStorage.setItem("travelgenie_lang", lang);
    }
  };

  useEffect(() => {
    const langConfig = LANGUAGES[language] || LANGUAGES.en;
    document.documentElement.lang = langConfig.code;
    document.documentElement.dir = langConfig.dir;
  }, [language]);

  /**
   * Formats a USD amount into the selected currency.
   */
  const formatPrice = (usdAmount, customCurrency = null) => {
    const targetCurrencyKey = customCurrency || currency;
    const targetCurrency = CURRENCIES[targetCurrencyKey] || CURRENCIES.USD;
    const converted = Math.round(Number(usdAmount || 0) * targetCurrency.rateFromUSD);

    if (targetCurrencyKey === "AFN") {
      return `${converted.toLocaleString()} ؋`;
    }
    if (targetCurrencyKey === "AED") {
      return `${converted.toLocaleString()} AED`;
    }
    if (targetCurrencyKey === "EUR") {
      return `€${converted.toLocaleString()}`;
    }
    return `$${converted.toLocaleString()}`;
  };

  /**
   * Translate a given key.
   */
  const t = (key) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  const isRtl = LANGUAGES[language]?.dir === "rtl";

  return (
    <LocalizationContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        formatPrice,
        t,
        isRtl,
        currentCurrencyObj: CURRENCIES[currency] || CURRENCIES.USD,
        currentLanguageObj: LANGUAGES[language] || LANGUAGES.en,
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  return useContext(LocalizationContext);
}
