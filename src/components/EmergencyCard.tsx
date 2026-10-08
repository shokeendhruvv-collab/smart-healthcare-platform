import React from 'react';
import { 
  PhoneCall, 
  AlertCircle, 
  Clock, 
  MapPin, 
  Ambulance 
} from 'lucide-react';

interface EmergencyCardProps {
  onCallEmergency: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({
  onCallEmergency,
}) => {
  return (
    <div className="bg-gradient-to-br from-red-50/80 via-white to-red-50/40 rounded-2xl border-2 border-red-200/90 shadow-xs p-5 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E53945] animate-ping" />
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E53945]">
          24/7 Rapid Response
        </span>
      </div>

      <h3 className="text-base font-extrabold text-[#102A43] tracking-tight">
        Need Emergency Help?
      </h3>
      
      <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
        Get immediate assistance from our 24/7 emergency team. Ambulance dispatch & trauma desk on standby.
      </p>

      {/* Large Emergency Button */}
      <button
        onClick={onCallEmergency}
        className="w-full py-3.5 px-4 rounded-xl bg-[#E53945] hover:bg-[#d02c38] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 transition-all duration-200 cursor-pointer active:scale-98"
      >
        <PhoneCall className="w-4 h-4 animate-bounce" />
        <span>☎ Call Emergency (112)</span>
      </button>

      {/* Reassurance notes */}
      <div className="mt-3.5 pt-3 border-t border-red-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1 text-slate-600 font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Avg Response: &lt; 4 mins</span>
        </div>
        <div className="flex items-center gap-1 text-slate-600 font-medium">
          <Ambulance className="w-3.5 h-3.5 text-slate-400" />
          <span>Level 1 Trauma</span>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 mt-2 text-center leading-tight">
        For life-threatening emergencies, contact local emergency services immediately.
      </p>
    </div>
  );
};
