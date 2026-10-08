import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  Video, 
  MapPin, 
  CheckCircle2, 
  Star,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Doctor, Appointment, PatientProfile } from '../types';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  patient: PatientProfile;
  onConfirmAppointment: (appointment: Appointment) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  doctor,
  patient,
  onConfirmAppointment,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-09');
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [appointmentType, setAppointmentType] = useState<'In-person' | 'Video consultation'>('In-person');
  const [patientName, setPatientName] = useState(patient.name);
  const [patientPhone, setPatientPhone] = useState(patient.phone);
  const [reason, setReason] = useState('Routine consultation & checkup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync date and time when doctor changes or modal opens
  React.useEffect(() => {
    if (doctor) {
      if (doctor.availableDates?.[0]) setSelectedDate(doctor.availableDates[0]);
      if (doctor.availableSlots?.[0]) setSelectedTime(doctor.availableSlots[0]);
      setPatientName(patient.name);
      setPatientPhone(patient.phone);
    }
  }, [doctor, patient.name, patient.phone, isOpen]);

  if (!isOpen || !doctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newAppointment: Appointment = {
        id: `apt-${Date.now()}`,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType,
        status: 'Upcoming',
        patientName,
        patientPhone,
        reason,
        roomOrLink: appointmentType === 'Video consultation' 
          ? `https://telehealth.lifecare.org/room/${doctor.id}-${Date.now().toString().slice(-4)}`
          : 'LifeCare OPD Wing B, Level 2',
        createdAt: new Date().toISOString(),
      };

      onConfirmAppointment(newAppointment);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0878E8', '#16B8C4', '#20B26B']
        });
      } catch {
        // fallback gracefully
      }

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-lg font-bold text-[#102A43]">
              Book an Appointment
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Choose your consultation slot with {doctor.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#20B26B] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-[#102A43]">
              Appointment Confirmed!
            </h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Your consultation with <strong>{doctor.name}</strong> has been booked for <strong>{selectedDate} at {selectedTime}</strong>.
            </p>
            <div className="text-xs text-slate-400">
              A confirmation SMS & calendar invite have been sent to {patientPhone}.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* Doctor Profile Snippet */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#EAF6FF]/50 border border-blue-100">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#0878E8]/20"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-[#102A43] truncate">
                  {doctor.name}
                </h4>
                <p className="text-xs font-semibold text-[#0878E8]">
                  {doctor.specialty} · {doctor.department}
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {doctor.rating}
                  </span>
                  <span>·</span>
                  <span>{doctor.experience}</span>
                  <span>·</span>
                  <span className="font-bold text-slate-700">${doctor.consultationFee} fee</span>
                </div>
              </div>
            </div>

            {/* Appointment Mode Selection */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-2 uppercase tracking-wide">
                Consultation Type
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAppointmentType('In-person')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
                    appointmentType === 'In-person'
                      ? 'border-[#0878E8] bg-blue-50 text-[#0878E8] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-[#0878E8]" />
                  <div className="text-left">
                    <div>In-person Visit</div>
                    <span className="text-[10px] font-normal text-slate-500">At LifeCare Main Campus</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAppointmentType('Video consultation')}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold transition-all cursor-pointer ${
                    appointmentType === 'Video consultation'
                      ? 'border-[#16B8C4] bg-teal-50 text-[#16B8C4] shadow-xs'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-[#16B8C4]" />
                  <div className="text-left">
                    <div>Video Consult</div>
                    <span className="text-[10px] font-normal text-slate-500">HD encrypted tele-call</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Available Dates */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-2 uppercase tracking-wide">
                Select Date
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {doctor.availableDates.map((date) => {
                  const isSelected = selectedDate === date;
                  const dateObj = new Date(date);
                  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNum = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`shrink-0 px-3.5 py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0878E8] bg-[#0878E8] text-white shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-semibold opacity-80">{dayName}</span>
                      <span className="block text-xs font-bold">{dayNum}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <label className="block text-xs font-bold text-[#102A43] mb-2 uppercase tracking-wide">
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {doctor.availableSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0878E8] bg-[#0878E8] text-white shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Patient Name & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Patient Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
                  />
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Reason for Visit / Symptoms
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for visit..."
                className="w-full p-2.5 text-xs bg-slate-50 focus:bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
              />
            </div>

            {/* Reassurance */}
            <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
                <span>Zero cancellation fees up to 2 hours prior</span>
              </div>
              <span className="font-bold text-[#102A43]">Pay at Hospital / Online</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-[#0878E8]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <span>Confirm Appointment (${doctor.consultationFee})</span>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
