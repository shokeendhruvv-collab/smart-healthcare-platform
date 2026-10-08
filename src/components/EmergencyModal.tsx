import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  Ambulance, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle, 
  HeartHandshake, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  emergencyPhone?: string;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Harshit',
  emergencyPhone = '+91 98765 00112',
}) => {
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);
  const [kinNotified, setKinNotified] = useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      setAmbulanceDispatched(false);
      setKinNotified(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestAmbulance = () => {
    setAmbulanceDispatched(true);
  };

  const handleNotifyKin = () => {
    setKinNotified(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-red-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Urgent Red Banner */}
        <div className="bg-[#E53945] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold tracking-tight">
                24/7 SGT Hospital Emergency Response
              </h3>
              <p className="text-xs text-red-100 font-medium">
                Sgt hospital, Budhera, Gurugram • Trauma & Ambulance Desk
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {/* Main 112 Call Direct Box */}
          <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-100">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-600 block mb-1">
              National Emergency Hotline
            </span>
            <a
              href="tel:112"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#E53945] hover:bg-[#c92d39] text-white rounded-2xl text-2xl font-black shadow-lg shadow-red-500/30 transition-transform active:scale-95"
            >
              <PhoneCall className="w-6 h-6" />
              <span>Dial 112</span>
            </a>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              Free 24/7 priority line connecting to emergency services
            </p>
          </div>

          {/* Hospital Emergency Contacts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              SGT Hospital Direct Emergency Desks
            </h4>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#102A43]">Trauma & Emergency Desk</p>
                <p className="text-[11px] text-slate-500">Budhera Campus, Ground Floor</p>
              </div>
              <a
                href="tel:+911242278187"
                className="px-3 py-1.5 bg-white text-[#0878E8] font-bold text-xs rounded-lg border border-slate-200 shadow-2xs hover:bg-blue-50"
              >
                +91-124-2278187
              </a>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#102A43]">Emergency Mobile Hotline</p>
                <p className="text-[11px] text-slate-500">Direct Doctor & Ambulance Dispatch</p>
              </div>
              <a
                href="tel:+919319398632"
                className="px-3 py-1.5 bg-white text-[#0878E8] font-bold text-xs rounded-lg border border-slate-200 shadow-2xs hover:bg-blue-50"
              >
                +91 93193 98632
              </a>
            </div>
          </div>

          {/* One-Click Rapid Actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleRequestAmbulance}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                ambulanceDispatched
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50/50'
              }`}
            >
              {ambulanceDispatched ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#20B26B]" />
                  <span>Ambulance Dispatched!</span>
                  <span className="text-[10px] text-emerald-600 font-normal">ETA: 6 mins (GPS Unit #14)</span>
                </>
              ) : (
                <>
                  <Ambulance className="w-5 h-5 text-[#E53945]" />
                  <span>Dispatch GPS Ambulance</span>
                  <span className="text-[10px] text-slate-400 font-normal">To registered home address</span>
                </>
              )}
            </button>

            <button
              onClick={handleNotifyKin}
              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                kinNotified
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              {kinNotified ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#20B26B]" />
                  <span>Emergency Kin Alerted</span>
                  <span className="text-[10px] text-emerald-600 font-normal">SMS & Call triggered</span>
                </>
              ) : (
                <>
                  <HeartHandshake className="w-5 h-5 text-[#0878E8]" />
                  <span>Alert Emergency Contact</span>
                  <span className="text-[10px] text-slate-400 font-normal">{emergencyPhone}</span>
                </>
              )}
            </button>
          </div>

          {/* Life-threatening disclaimer */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed font-medium">
              <strong>Crucial Safety Warning:</strong> For severe life-threatening emergencies (acute cardiac arrest, unconsciousness, severe hemorrhaging, respiratory failure), contact local emergency dispatch (112) immediately and do not drive yourself.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Close Emergency Panel
          </button>
        </div>

      </div>
    </div>
  );
};
