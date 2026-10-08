import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Search, 
  Stethoscope, 
  FileText, 
  Pill, 
  Activity, 
  Calendar, 
  ArrowRight, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Doctor, MedicalRecord, Medicine } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  records: MedicalRecord[];
  medicines: Medicine[];
  onNavigate: (page: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectRecord: (record: MedicalRecord) => void;
  onSelectMedicine: (med: Medicine) => void;
  onAskCopilot: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  doctors,
  records,
  medicines,
  onNavigate,
  onSelectDoctor,
  onSelectRecord,
  onSelectMedicine,
  onAskCopilot,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.specialty.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q)
  );

  const matchedRecords = records.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.doctor.toLowerCase().includes(q)
  );

  const matchedMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.genericName.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
  );

  const healthTools = [
    { name: 'BMI Calculator', desc: 'Calculate Body Mass Index & Healthy weight' },
    { name: 'Calorie Calculator', desc: 'Basal Metabolic Rate & daily caloric goals' },
    { name: 'Water Intake Calculator', desc: 'Target daily hydration based on weight' },
    { name: 'Sleep Tracker', desc: 'Sleep architecture and circadian consistency' },
    { name: 'Blood Pressure Tracker', desc: 'Systolic and diastolic classification' },
    { name: 'Health Risk Assessment', desc: '10-year cardiovascular risk scoring' },
  ].filter(
    (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  );

  const totalResults = matchedDoctors.length + matchedRecords.length + matchedMedicines.length + healthTools.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[82vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, specialties, medicines, lab reports, health tools..."
            className="flex-1 text-sm sm:text-base outline-hidden text-[#102A43] placeholder-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          
          {/* Quick AI Prompt Trigger */}
          {query.trim().length > 0 && (
            <button
              onClick={() => {
                onAskCopilot(query);
                onClose();
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 text-left flex items-center justify-between hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#102A43]">
                    Ask AI Health Copilot: "{query}"
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Get instant personalized clinical guidance
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0878E8] group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Doctors Section */}
          {matchedDoctors.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Doctors & Specialists ({matchedDoctors.length})</span>
              </h4>
              <div className="space-y-1.5">
                {matchedDoctors.slice(0, 3).map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDoctor(doc);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={doc.image} alt={doc.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-[#102A43]">{doc.name}</p>
                        <p className="text-[11px] text-[#0878E8] font-medium">{doc.specialty} · {doc.experience}</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#0878E8] font-bold">Book Slot →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Records Section */}
          {matchedRecords.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Medical Records ({matchedRecords.length})</span>
              </h4>
              <div className="space-y-1.5">
                {matchedRecords.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => {
                      onSelectRecord(rec);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#102A43]">{rec.title}</p>
                      <p className="text-[11px] text-slate-500">{rec.category} · {rec.date} · {rec.doctor}</p>
                    </div>
                    <span className="text-xs text-[#0878E8] font-bold">View →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medicines Section */}
          {matchedMedicines.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5" />
                <span>Medicines & Prescriptions ({matchedMedicines.length})</span>
              </h4>
              <div className="space-y-1.5">
                {matchedMedicines.slice(0, 3).map((med) => (
                  <div
                    key={med.id}
                    onClick={() => {
                      onSelectMedicine(med);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#102A43]">{med.name} ({med.dosage})</p>
                      <p className="text-[11px] text-slate-500">{med.frequency} · {med.remainingPills} pills left</p>
                    </div>
                    <span className="text-xs text-[#0878E8] font-bold">Refill →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Tools Section */}
          {healthTools.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Health Tools & Calculators ({healthTools.length})</span>
              </h4>
              <div className="space-y-1.5">
                {healthTools.slice(0, 3).map((tool) => (
                  <div
                    key={tool.name}
                    onClick={() => {
                      onNavigate('tools');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#102A43]">{tool.name}</p>
                      <p className="text-[11px] text-slate-500">{tool.desc}</p>
                    </div>
                    <span className="text-xs text-[#0878E8] font-bold">Launch Tool →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty search state */}
          {query.trim().length > 0 && totalResults === 0 && (
            <div className="p-8 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-semibold">No direct results for "{query}"</p>
              <p className="text-xs mt-1">Try searching for Cardiologist, CBC, Paracetamol, or BMI.</p>
            </div>
          )}

        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>LifeCare Integrated Health Index</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
