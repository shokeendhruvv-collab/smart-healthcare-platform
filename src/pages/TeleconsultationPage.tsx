import React from 'react';
import { 
  Video, 
  Star, 
  ShieldCheck, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';
import { Doctor } from '../types';

interface TeleconsultationPageProps {
  doctors: Doctor[];
  onStartConsultation: (doctor: Doctor) => void;
  onBackToHome: () => void;
}

export const TeleconsultationPage: React.FC<TeleconsultationPageProps> = ({
  doctors,
  onStartConsultation,
  onBackToHome,
}) => {
  const teleconsultDoctors = doctors.filter((d) => d.teleconsultationAvailable);

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
              SGT Hospital Teleconsultation Lounge
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-[#20B26B] animate-ping" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Connect with board-certified physicians instantly via end-to-end encrypted HD video call
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
            {teleconsultDoctors.length} Specialists Online Now
          </span>
        </div>
      </div>

      {/* Trust Highlight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50 border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16B8C4] to-[#0878E8] flex items-center justify-center text-white shadow-xs">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#102A43]">
              Zero Wait-Time Instant Care
            </h3>
            <p className="text-xs text-slate-600">
              Digital e-prescriptions generated right after your call & automatically synced with Pharmacy.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
            <span>HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#0878E8]" />
            <span>Verified Doctors</span>
          </div>
        </div>
      </div>

      {/* Teleconsult Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teleconsultDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#16B8C4]/50 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="relative shrink-0">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-100"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#20B26B] border-2 border-white" title="Online" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#102A43] truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-bold text-[#16B8C4]">
                    {doctor.specialty}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {doctor.department}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{doctor.rating}</span>
                    <span className="text-slate-400">({doctor.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="py-2.5 border-y border-slate-100 text-xs text-slate-600 space-y-1">
                <p className="line-clamp-2 text-[11px] text-slate-500">
                  {doctor.bio}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-400">Wait time: ~2 mins</span>
                  <span className="font-semibold text-teal-700">HD Video Ready</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Consult Fee</span>
                <span className="text-sm font-extrabold text-[#102A43]">${doctor.consultationFee}</span>
              </div>

              <button
                onClick={() => onStartConsultation(doctor)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#16B8C4] to-[#0878E8] hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Start Consultation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
