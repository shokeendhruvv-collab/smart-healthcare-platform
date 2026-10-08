import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  ShieldCheck, 
  ArrowLeft, 
  UploadCloud, 
  Calendar, 
  Building, 
  User, 
  CheckCircle2,
  Filter,
  Sparkles
} from 'lucide-react';
import { MedicalRecord } from '../types';

interface MedicalRecordsPageProps {
  records: MedicalRecord[];
  onViewRecord: (record: MedicalRecord) => void;
  onOpenUploadModal: () => void;
  onBackToHome: () => void;
}

export const MedicalRecordsPage: React.FC<MedicalRecordsPageProps> = ({
  records,
  onViewRecord,
  onOpenUploadModal,
  onBackToHome,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Lab Report', 'Imaging', 'Prescription', 'Discharge Summary'];

  const filtered = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || rec.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleDownload = (rec: MedicalRecord) => {
    // Generate simulated download
    const blob = new Blob([`SGT Hospital Diagnostic Record\nTitle: ${rec.title}\nCategory: ${rec.category}\nDate: ${rec.date}\nDoctor: ${rec.doctor}\nSummary: ${rec.summary}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${rec.title.replace(/\s+/g, '_')}_Record.txt`;
    a.click();
  };

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
            Medical Records & Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Centralized, encrypted patient health records with certified diagnostic reports
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#0878E8]/20 transition-all self-start sm:self-center cursor-pointer"
        >
          <UploadCloud className="w-4 h-4 text-white" />
          <span>Upload External Record (AI Analyzed)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by test name, doctor, hospital, or summary findings..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Records Table / Cards */}
      <div className="space-y-3.5">
        {filtered.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0878E8]/40 hover:shadow-xs transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF6FF] text-[#0878E8] flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-[#102A43]">
                    {record.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#0878E8] border border-blue-200">
                    {record.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-[#20B26B] border border-emerald-200">
                    {record.status}
                  </span>
                  {record.aiAnalysis && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-600" />
                      <span>AI Analyzed</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">{record.doctor}</span>
                  <span>·</span>
                  <span>{record.hospital}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {record.date}
                  </span>
                  <span>·</span>
                  <span>{record.fileSize}</span>
                </div>

                <p className="text-xs text-slate-600 mt-2 font-medium line-clamp-2">
                  {record.summary}
                </p>
              </div>
            </div>

            {/* Actions: View and Download */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => onViewRecord(record)}
                className="px-4 py-2 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View Report</span>
              </button>

              <button
                onClick={() => handleDownload(record)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Download PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
