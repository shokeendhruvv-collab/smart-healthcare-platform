import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Calendar, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Video, 
  ChevronRight 
} from 'lucide-react';
import { Doctor } from '../types';

interface BookAppointmentSectionProps {
  doctors: Doctor[];
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onViewAllDoctors: () => void;
  onStartTeleconsult: (doctor: Doctor) => void;
}

export const BookAppointmentSection: React.FC<BookAppointmentSectionProps> = ({
  doctors,
  onSelectDoctorToBook,
  onViewAllDoctors,
  onStartTeleconsult,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  const specialties = ['All', 'Cardiology', 'Dermatology', 'Orthopedics', 'General Physician'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchesAvailability = onlyAvailableToday ? doc.availableToday : true;

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      {/* Title & Subtitle */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#102A43] tracking-tight">
            Book an Appointment
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Choose from top specialists and preferred slots
          </p>
        </div>
        <button
          onClick={onViewAllDoctors}
          className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#0878E8] hover:text-[#0769cc] transition-colors"
        >
          <span>View All Doctors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by doctor name, specialty or condition..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8] focus:ring-1 focus:ring-[#0878E8] transition-all text-slate-800 placeholder-slate-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {specialties.map((spec) => {
          const isSelected = selectedSpecialty === spec;
          return (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0878E8] text-white shadow-xs shadow-[#0878E8]/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {spec}
            </button>
          );
        })}
      </div>

      {/* Quick Availability Toggle */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-0.5">
        <span>Showing {filteredDoctors.length} available specialists</span>
        <label className="flex items-center gap-1.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={onlyAvailableToday}
            onChange={(e) => setOnlyAvailableToday(e.target.checked)}
            className="w-3.5 h-3.5 rounded-sm text-[#0878E8] focus:ring-[#0878E8] accent-[#0878E8]"
          />
          <span className="text-[11px] font-medium text-slate-600">Available Today Only</span>
        </label>
      </div>

      {/* Doctors List */}
      <div className="space-y-3">
        {filteredDoctors.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-sm font-semibold text-slate-700">No doctors match your criteria</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the specialty or search filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialty('All');
                setOnlyAvailableToday(false);
              }}
              className="mt-3 text-xs font-bold text-[#0878E8] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDoctors.slice(0, 3).map((doctor) => {
            const isToday = doctor.status.includes('Today');
            return (
              <div
                key={doctor.id}
                className="group p-3.5 sm:p-4 rounded-xl border border-slate-200/80 hover:border-[#0878E8]/40 hover:shadow-xs transition-all duration-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3.5"
              >
                {/* Doctor Info */}
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-13 h-13 rounded-xl object-cover ring-1 ring-slate-200"
                    />
                    <span 
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                        isToday ? 'bg-[#20B26B]' : 'bg-amber-400'
                      }`} 
                      title={doctor.status}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-bold text-[#102A43] truncate">
                        {doctor.name}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-[#0878E8] font-semibold">
                      {doctor.specialty}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span>({doctor.reviewCount >= 1000 ? `${(doctor.reviewCount/1000).toFixed(1)}k` : doctor.reviewCount} reviews)</span>
                      <span>·</span>
                      <span className={`font-semibold ${isToday ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {doctor.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions: Book Now & Teleconsult */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {doctor.teleconsultationAvailable && (
                    <button
                      onClick={() => onStartTeleconsult(doctor)}
                      className="p-2 rounded-xl text-teal-600 hover:bg-teal-50 border border-teal-200 transition-colors cursor-pointer"
                      title="Quick Video Consultation"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onSelectDoctorToBook(doctor)}
                    className="px-4 py-2 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold transition-all shadow-xs shadow-[#0878E8]/20 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* View all doctors footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">Need specific departments or surgeries?</span>
        <button
          onClick={onViewAllDoctors}
          className="font-bold text-[#0878E8] hover:text-[#0769cc] flex items-center gap-1 cursor-pointer"
        >
          <span>View All Doctors →</span>
        </button>
      </div>
    </div>
  );
};
