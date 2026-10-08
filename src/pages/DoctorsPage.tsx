import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Calendar, 
  Video, 
  Filter, 
  Languages, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorsPageProps {
  doctors: Doctor[];
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onStartTeleconsult: (doctor: Doctor) => void;
  onBackToHome: () => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  doctors,
  onSelectDoctorToBook,
  onStartTeleconsult,
  onBackToHome,
}) => {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [teleconsultOnly, setTeleconsultOnly] = useState(false);
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);

  const specialties = [
    'All',
    'Cardiologist',
    'Orthopedic Surgeon',
    'Dermatologist',
    'General Physician',
    'Neurologist',
    'Pediatrician',
    'Gynecologist & Obstetrician',
    'Ophthalmologist',
    'Gastroenterologist',
    'Pulmonologist',
    'Medical Oncologist',
    'Nephrologist',
    'ENT Specialist',
    'Maxillofacial Surgeon',
    'Urologist',
    'Psychiatrist',
    'Emergency Physician',
    'Endocrinologist',
  ];

  const filtered = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doc.department.toLowerCase().includes(search.toLowerCase()) ||
      doc.qualifications.toLowerCase().includes(search.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesTeleconsult = teleconsultOnly ? doc.teleconsultationAvailable : true;
    const matchesToday = availableTodayOnly ? doc.availableToday : true;

    return matchesSearch && matchesSpecialty && matchesTeleconsult && matchesToday;
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-6">
      
      {/* Top Header */}
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
            Find Specialists & Doctors
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Browse world-class physicians across 50+ departments with verified patient ratings
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
            {filtered.length} Doctors Available
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor by name, disease, symptom, or qualification..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={availableTodayOnly}
                onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                className="rounded-sm accent-[#0878E8]"
              />
              <span className="font-semibold text-slate-700">Available Today</span>
            </label>

            <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={teleconsultOnly}
                onChange={(e) => setTeleconsultOnly(e.target.checked)}
                className="rounded-sm accent-[#16B8C4]"
              />
              <span className="font-semibold text-slate-700">Video Consult Only</span>
            </label>
          </div>
        </div>

        {/* Specialty Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {specialties.map((spec) => {
            const isSelected = selectedSpecialty === spec;
            return (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((doctor) => {
          const isToday = doctor.status.includes('Today');
          return (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0878E8]/40 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Head */}
                <div className="flex items-start gap-4 mb-3">
                  <div className="relative shrink-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        isToday ? 'bg-[#20B26B]' : 'bg-amber-400'
                      }`}
                      title={doctor.status}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#102A43] truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-bold text-[#0878E8]">
                      {doctor.specialty}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {doctor.department}
                    </p>

                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{doctor.rating}</span>
                      </div>
                      <span className="text-slate-400">({doctor.reviewCount} reviews)</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-600 font-semibold">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Qualifications & Bio */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                  <div className="flex items-start gap-2 text-slate-600">
                    <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Languages className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Speaks {doctor.languages.join(', ')}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
                    {doctor.bio}
                  </p>
                </div>
              </div>

              {/* Fee & Action Buttons */}
              <div className="pt-4 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Consultation</span>
                  <span className="text-sm font-extrabold text-[#102A43]">${doctor.consultationFee}</span>
                </div>

                <div className="flex items-center gap-2">
                  {doctor.teleconsultationAvailable && (
                    <button
                      onClick={() => onStartTeleconsult(doctor)}
                      className="p-2.5 rounded-xl border border-teal-200 text-[#16B8C4] hover:bg-teal-50 transition-colors cursor-pointer"
                      title="Start Live Video Consultation"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => onSelectDoctorToBook(doctor)}
                    className="px-4 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
