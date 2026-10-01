import { useState } from "react";
import { ShieldCheck, FileText, AlertTriangle, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import { VISA_REQUIREMENTS_DATA, KAM_AIR_CITIES } from "../../data/kamAirRoutes";
import GlassCard from "../Common/GlassCard";

export default function VisaRequirementsCard({ defaultDestination = "DXB" }) {
  const [selectedDest, setSelectedDest] = useState(defaultDestination);

  const availableDestinations = Object.keys(VISA_REQUIREMENTS_DATA);
  const data = VISA_REQUIREMENTS_DATA[selectedDest] || VISA_REQUIREMENTS_DATA.DXB;

  return (
    <GlassCard className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Travel & Visa Requirements
            </h3>
            <p className="text-xs text-gray-500 dark:text-white/60">
              Entry guidelines for Afghan passport holders traveling via Kam Air
            </p>
          </div>
        </div>

        {/* Destination selector chips */}
        <div className="flex flex-wrap gap-1.5">
          {availableDestinations.map((code) => {
            const city = KAM_AIR_CITIES.find((c) => c.code === code);
            const active = selectedDest === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => setSelectedDest(code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  active
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                    : "bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10"
                }`}
              >
                {city?.name || code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Requirement Details */}
      <div className="pt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40">
              Visa Category
            </span>
            <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
              {data.visaType}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40">
              Estimated Processing
            </span>
            <p className="mt-1 text-sm font-bold text-amber-600 dark:text-amber-400">
              {data.processingTime}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-white/40">
              Last Verified
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-white/80">
              <Calendar size={14} className="text-cyan-500" />
              <span>{data.lastVerified}</span>
            </div>
          </div>
        </div>

        {/* Requirements Checklist */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText size={16} className="text-cyan-500" />
            Mandatory Documents Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.requirements.map((req, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/5 dark:bg-white/[0.03] border border-cyan-500/10 text-xs text-gray-800 dark:text-white/85"
              >
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Airport & Transit Notes */}
        {data.notes && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Important Traveler Notice:</span> {data.notes}
            </div>
          </div>
        )}

        {/* Verification Source */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 text-[11px] text-gray-400 dark:text-white/50 border-t border-gray-100 dark:border-white/5">
          <span>Source: {data.officialSource}</span>
          <span className="italic">Visa regulations are subject to diplomatic updates. Verify before departure.</span>
        </div>
      </div>
    </GlassCard>
  );
}
