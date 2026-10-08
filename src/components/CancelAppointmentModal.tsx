import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle2 
} from 'lucide-react';
import { Appointment } from '../types';

interface CancelAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onConfirmCancel: (id: string) => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmCancel,
}) => {
  if (!isOpen || !appointment) return null;

  const handleCancel = () => {
    onConfirmCancel(appointment.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-rose-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-[#E53945] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#102A43]">
                Cancel Appointment?
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Zero cancellation fees apply
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          
          {/* Appointment Preview Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3.5">
            <img
              src={appointment.doctorImage}
              alt={appointment.doctorName}
              className="w-13 h-13 rounded-xl object-cover ring-1 ring-slate-200"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-[#102A43] truncate">
                {appointment.doctorName}
              </h4>
              <p className="text-xs font-semibold text-[#0878E8]">
                {appointment.doctorSpecialty}
              </p>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Calendar className="w-3 h-3 text-[#0878E8]" />
                  {appointment.date}
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Clock className="w-3 h-3 text-[#0878E8]" />
                  {appointment.time}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to cancel this scheduled consultation? The doctor's slot will be released back to other patients. You can book a new slot whenever you're ready.
          </p>

          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0878E8] shrink-0" />
            <span>You can easily reschedule or book another specialist at any time.</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Keep Appointment
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer"
            >
              Yes, Cancel Appointment
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
