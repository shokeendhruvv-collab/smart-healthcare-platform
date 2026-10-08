import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Plus, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  AlertCircle,
  CalendarDays,
  Check
} from 'lucide-react';
import { Appointment } from '../types';
import { CancelAppointmentModal } from '../components/CancelAppointmentModal';

interface AppointmentsPageProps {
  appointments: Appointment[];
  onOpenBookingModal: () => void;
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string) => void;
  onStartVideoCall: (appointment: Appointment) => void;
  onBackToHome: () => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  appointments,
  onOpenBookingModal,
  onCancelAppointment,
  onRescheduleAppointment,
  onStartVideoCall,
  onBackToHome,
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string | null>(null);

  const filteredAppointments = appointments.filter((apt) => apt.status === activeTab);

  const handleConfirmCancel = (id: string) => {
    onCancelAppointment(id);
    setAppointmentToCancel(null);
    setCancelSuccessMsg('Appointment cancelled successfully. You can review it in the Cancelled tab.');
    setTimeout(() => {
      setCancelSuccessMsg(null);
    }, 4000);
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Manage your doctor consultations, clinic visits, and virtual appointments
          </p>
        </div>

        <button
          onClick={onOpenBookingModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0878E8]/20 transition-all cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Cancellation Toast/Banner */}
      {cancelSuccessMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#20B26B]" />
            <span>{cancelSuccessMsg}</span>
          </div>
          <button
            onClick={() => setActiveTab('Cancelled')}
            className="text-[11px] font-extrabold text-[#0878E8] hover:underline"
          >
            View Cancelled Tab →
          </button>
        </div>
      )}

      {/* Tabs and Summary Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-1.5">
          {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => {
            const count = appointments.filter((a) => a.status === tab).length;
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 pr-3">
          <CalendarDays className="w-4 h-4 text-[#0878E8]" />
          <span>Calendar Sync: Enabled (Google Calendar / iCal)</span>
        </div>
      </div>

      {/* Appointments Grid */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 shadow-xs">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#102A43]">
              No {activeTab.toLowerCase()} appointments found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              {activeTab === 'Upcoming'
                ? 'You have no scheduled doctor visits right now. Book an appointment with one of our top specialists.'
                : `You currently have no ${activeTab.toLowerCase()} consultation records.`}
            </p>
            {activeTab === 'Upcoming' && (
              <button
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 rounded-xl bg-[#0878E8] text-white text-xs font-bold shadow-xs hover:bg-[#0769cc] cursor-pointer"
              >
                Book Consultation Now
              </button>
            )}
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-blue-200"
            >
              {/* Doctor Details & Date */}
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={apt.doctorImage}
                  alt={apt.doctorName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs shrink-0"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-[#102A43]">
                      {apt.doctorName}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      apt.type === 'Video consultation'
                        ? 'bg-teal-50 text-[#16B8C4] border-teal-200'
                        : 'bg-blue-50 text-[#0878E8] border-blue-200'
                    }`}>
                      {apt.type}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-[#0878E8] mt-0.5">
                    {apt.doctorSpecialty}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                    <div className="flex items-center gap-1 font-semibold text-[#102A43]">
                      <Calendar className="w-3.5 h-3.5 text-[#0878E8]" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1 font-semibold text-[#102A43]">
                      <Clock className="w-3.5 h-3.5 text-[#0878E8]" />
                      <span>{apt.time}</span>
                    </div>
                    {apt.type === 'In-person' ? (
                      <div className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{apt.roomOrLink}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-teal-600 font-semibold">
                        <Video className="w-3.5 h-3.5" />
                        <span>Virtual Room Ready</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    Reason: {apt.reason}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
                {apt.status === 'Upcoming' && (
                  <>
                    {apt.type === 'Video consultation' && (
                      <button
                        onClick={() => onStartVideoCall(apt)}
                        className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>Join Video Room</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRescheduleAppointment(apt.id)}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() => setAppointmentToCancel(apt)}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {apt.status === 'Completed' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-[#20B26B]" />
                    <span>Consultation Completed</span>
                  </span>
                )}

                {apt.status === 'Cancelled' && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                    <XCircle className="w-4 h-4 text-slate-400" />
                    <span>Cancelled by Patient</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {appointmentToCancel && (
        <CancelAppointmentModal
          isOpen={!!appointmentToCancel}
          onClose={() => setAppointmentToCancel(null)}
          appointment={appointmentToCancel}
          onConfirmCancel={handleConfirmCancel}
        />
      )}

    </div>
  );
};
