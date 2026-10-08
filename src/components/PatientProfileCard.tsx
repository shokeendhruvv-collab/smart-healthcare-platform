import React from 'react';
import { 
  User, 
  Edit3, 
  Droplet, 
  ShieldCheck, 
  Phone, 
  AlertCircle 
} from 'lucide-react';
import { PatientProfile } from '../types';

interface PatientProfileCardProps {
  patient: PatientProfile;
  onEditProfile: () => void;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({
  patient,
  onEditProfile,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 transition-all">
      {/* Top Header with Avatar & Edit Action */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#0878E8]/20 shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#20B26B] border-2 border-white rounded-full" title="Active Patient" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#102A43] tracking-tight">
              {patient.name}
            </h3>
            <p className="text-xs font-semibold text-[#0878E8]">
              Patient ID: {patient.patientId}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20B26B]" />
              <span>Verified Health ID</span>
            </div>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="p-2 rounded-xl text-slate-500 hover:text-[#0878E8] hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
          title="Edit Profile Information"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Key Info (Age, Gender, Blood Group) */}
      <div className="grid grid-cols-3 gap-2 py-3 px-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center mb-3.5">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Age
          </span>
          <span className="text-sm font-bold text-[#102A43]">
            {patient.age} yrs
          </span>
        </div>
        <div className="border-x border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Gender
          </span>
          <span className="text-sm font-bold text-[#102A43]">
            {patient.gender}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Blood
          </span>
          <span className="text-sm font-bold text-rose-600 flex items-center justify-center gap-0.5">
            <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
            {patient.bloodGroup}
          </span>
        </div>
      </div>

      {/* Emergency Contact & Policy Snippet */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-slate-400">Primary Contact:</span>
          <span className="font-medium text-slate-800">{patient.phone}</span>
        </div>
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-slate-400">Emergency Kin:</span>
          <span className="font-medium text-slate-800">{patient.emergencyContact.name} ({patient.emergencyContact.relationship})</span>
        </div>
        {patient.allergies.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Allergies:</span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
              {patient.allergies.join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Edit Profile Full Button */}
      <button
        onClick={onEditProfile}
        className="w-full mt-4 py-2 px-3 bg-slate-50 hover:bg-[#EAF6FF] text-[#0878E8] border border-slate-200 hover:border-blue-200 rounded-xl text-xs font-bold transition-all text-center cursor-pointer"
      >
        Edit Full Profile
      </button>
    </div>
  );
};
