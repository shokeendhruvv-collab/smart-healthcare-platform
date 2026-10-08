import React from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Building, 
  User, 
  AlertCircle 
} from 'lucide-react';
import { MedicalRecord, PatientProfile } from '../types';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: MedicalRecord | null;
  patient: PatientProfile;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  record,
  patient,
}) => {
  if (!isOpen || !record) return null;

  const handleDownload = () => {
    alert(`Downloading ${record.title} (${record.fileSize}) encrypted PDF...`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#102A43]">
                {record.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {record.category} · {record.hospital}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#0878E8] transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/40">
          
          {/* Institutional Hospital Header simulation */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="font-extrabold text-[#102A43] text-sm tracking-tight">
                  LIFECARE MULTISPECIALTY HOSPITAL & RESEARCH INSTITUTE
                </h4>
                <p className="text-[11px] text-slate-500">
                  Accredited Clinical Diagnostics Wing · Reg: LH-78291
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Status: {record.status}
              </span>
            </div>

            {/* Patient & Attending Info Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient Name</span>
                <span className="font-bold text-[#102A43]">{patient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Patient ID / Age</span>
                <span className="font-bold text-[#102A43]">{patient.patientId} / {patient.age}y ({patient.gender})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultant</span>
                <span className="font-bold text-[#102A43]">{record.doctor}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Date of Report</span>
                <span className="font-bold text-[#102A43]">{record.date}</span>
              </div>
            </div>
          </div>

          {/* Clinical Summary */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clinical Findings & Interpretation
              </h5>
              {record.aiAnalysis && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0878E8] border border-blue-200">
                  AI Analyzed ({record.aiAnalysis.riskLevel})
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {record.summary}
            </p>
          </div>

          {/* AI Precautions & Important Details Section (if available) */}
          {record.aiAnalysis && (
            <>
              {/* Precautions */}
              {record.aiAnalysis.precautions && record.aiAnalysis.precautions.length > 0 && (
                <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-2xs space-y-2">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>AI Precautions & Health Guidance</span>
                  </h5>
                  <ul className="space-y-1.5">
                    {record.aiAnalysis.precautions.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Questions for Doctor */}
              {record.aiAnalysis.doctorQuestions && record.aiAnalysis.doctorQuestions.length > 0 && (
                <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 shadow-2xs space-y-2">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#0878E8] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Recommended Questions for Your Attending Physician</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {record.aiAnalysis.doctorQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-[#0878E8]">{idx + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {/* Test Breakdown Table (if available) */}
          {record.details && record.details.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#102A43]">
                Detailed Laboratory Parameter Readings
              </div>
              <div className="divide-y divide-slate-100">
                <div className="grid grid-cols-12 p-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                  <div className="col-span-5">Investigation Name</div>
                  <div className="col-span-3 text-right">Observed Value</div>
                  <div className="col-span-4 text-right">Reference Range</div>
                </div>
                {record.details.map((detail, idx) => (
                  <div key={idx} className="grid grid-cols-12 p-3 text-xs items-center hover:bg-slate-50/80 transition-colors">
                    <div className="col-span-5 font-semibold text-slate-800">
                      {detail.testName}
                    </div>
                    <div className="col-span-3 text-right font-bold text-[#102A43]">
                      {detail.result}
                    </div>
                    <div className="col-span-4 text-right text-slate-500 font-medium">
                      {detail.normalRange}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Signature and Verification Badge */}
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-5 h-5 text-[#20B26B]" />
              <div>
                <p className="font-bold text-[#102A43]">Electronically Verified by Medical Board</p>
                <p className="text-[11px] text-slate-500">Digital Hash: SHA256-LC-{(Math.random()*1e9).toFixed(0)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-slate-700">{record.doctor}</p>
              <p className="text-[10px] text-slate-400">Chief Pathologist / Consultant</p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            File Size: {record.fileSize} · PDF format
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-[#0878E8] hover:bg-[#0769cc] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
