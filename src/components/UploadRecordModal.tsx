import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  Bot, 
  HelpCircle, 
  Check, 
  File, 
  Calendar,
  Building,
  User,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MedicalRecord, PatientProfile } from '../types';
import { analyzeUploadedMedicalDocument, AnalysisResult } from '../utils/aiDocumentAnalyzer';

interface UploadRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientProfile;
  onRecordUploaded: (newRecord: MedicalRecord) => void;
  onAskCopilot: (query: string) => void;
}

export const UploadRecordModal: React.FC<UploadRecordModalProps> = ({
  isOpen,
  onClose,
  patient,
  onRecordUploaded,
  onAskCopilot,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<MedicalRecord['category']>('Lab Report');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [savedRecord, setSavedRecord] = useState<MedicalRecord | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
      setDocTitle('');
      setDocCategory('Lab Report');
      setIsAnalyzing(false);
      setAnalysisResult(null);
      setSavedRecord(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileSelection = (file: File) => {
    setSelectedFile(file);
    const prettyName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    setDocTitle(prettyName);

    // Guess category from name
    const lower = file.name.toLowerCase();
    if (lower.includes('cbc') || lower.includes('blood') || lower.includes('lipid') || lower.includes('test') || lower.includes('lab')) {
      setDocCategory('Lab Report');
    } else if (lower.includes('xray') || lower.includes('x-ray') || lower.includes('mri') || lower.includes('scan') || lower.includes('ct')) {
      setDocCategory('Imaging');
    } else if (lower.includes('rx') || lower.includes('prescription') || lower.includes('med')) {
      setDocCategory('Prescription');
    } else if (lower.includes('discharge')) {
      setDocCategory('Discharge Summary');
    } else {
      setDocCategory('Clinical Notes');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisStep('Uploading & scanning document pages...');

    setTimeout(() => {
      setAnalysisStep('AI extracting clinical biomarkers and test ranges...');
    }, 700);

    setTimeout(() => {
      setAnalysisStep('Cross-referencing medical guidelines & formulating precautions...');
    }, 1400);

    setTimeout(async () => {
      const outcome = await analyzeUploadedMedicalDocument(selectedFile, docTitle, docCategory);
      setAnalysisResult(outcome);
      setIsAnalyzing(false);

      // Create full medical record
      const dateStr = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      const newRec: MedicalRecord = {
        id: `rec-upload-${Date.now()}`,
        title: outcome.title,
        category: outcome.category,
        doctor: outcome.doctor,
        hospital: outcome.hospital,
        date: dateStr,
        status: 'Verified',
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        summary: outcome.summary,
        details: outcome.details,
        aiAnalysis: {
          summary: outcome.summary,
          precautions: outcome.precautions,
          importantDetails: outcome.importantDetails,
          doctorQuestions: outcome.doctorQuestions,
          riskLevel: outcome.riskLevel,
          confidenceScore: outcome.confidenceScore,
          analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        fileName: selectedFile.name,
      };

      setSavedRecord(newRec);
      onRecordUploaded(newRec);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0878E8', '#16B8C4', '#20B26B'],
        });
      } catch {}
    }, 2100);
  };

  const handleDiscussWithCopilot = () => {
    if (!savedRecord && !analysisResult) return;
    const rec = savedRecord || analysisResult;
    const query = `I just uploaded my medical record "${rec?.title}". Can you give me a personalized walkthrough of the precautions and what I should ask my doctor?`;
    onAskCopilot(query);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-white to-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#102A43]">
                Upload External Medical Record & AI Analysis
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                AI reads your report, extracts biomarkers, and synthesizes precautions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* STEP 1: Upload and file selection (if no analysis yet) */}
          {!analysisResult && !isAnalyzing && (
            <div className="space-y-4">
              
              {/* Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-8 border-2 border-dashed rounded-2xl text-center transition-all cursor-pointer ${
                  dragActive
                    ? 'border-[#0878E8] bg-blue-50/80 scale-[1.01]'
                    : 'border-slate-300 hover:border-[#0878E8] bg-slate-50/60 hover:bg-blue-50/30'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.txt,.csv,.docx,.doc"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelection(e.target.files[0]);
                    }
                  }}
                />

                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 text-[#0878E8] flex items-center justify-center mx-auto mb-3 shadow-2xs">
                  <UploadCloud className="w-7 h-7" />
                </div>

                <h4 className="text-sm font-bold text-[#102A43]">
                  {selectedFile ? selectedFile.name : 'Click to select or drag & drop medical document'}
                </h4>
                
                <p className="text-xs text-slate-500 mt-1">
                  Supports PDF, Lab Scans, Imaging JPG/PNG, Clinical Notes up to 25MB
                </p>

                {selectedFile && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>File Selected: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                  </div>
                )}
              </div>

              {/* Document Details Form */}
              {selectedFile && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Document Title
                      </label>
                      <input
                        type="text"
                        value={docTitle}
                        onChange={(e) => setDocTitle(e.target.value)}
                        placeholder="e.g. Complete Blood Count, Liver Panel..."
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        Category
                      </label>
                      <select
                        value={docCategory}
                        onChange={(e) => setDocCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
                      >
                        <option value="Lab Report">Lab Report</option>
                        <option value="Imaging">Imaging & Scans</option>
                        <option value="Prescription">Prescription</option>
                        <option value="Clinical Notes">Clinical Notes</option>
                        <option value="Discharge Summary">Discharge Summary</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#20B26B]" />
                    <span>File will be processed via HIPAA-compliant AI medical OCR pipeline</span>
                  </div>
                </div>
              )}

              {/* Start Analysis Button */}
              <button
                type="button"
                disabled={!selectedFile}
                onClick={handleStartAnalysis}
                className="w-full py-3.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-[#0878E8]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upload & Analyze with AI Copilot</span>
              </button>

            </div>
          )}

          {/* STEP 2: Loading & Scanning Animation */}
          {isAnalyzing && (
            <div className="py-12 px-4 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-ping opacity-60" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xl mx-auto">
                  <Bot className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-[#102A43]">
                  AI Health Copilot is Reading Your Record
                </h4>
                <p className="text-xs text-slate-500 mt-1 font-medium animate-pulse">
                  {analysisStep}
                </p>
              </div>

              <div className="max-w-xs mx-auto bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0878E8] to-[#16B8C4] animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          )}

          {/* STEP 3: Complete AI Findings & Follow-up Analysis */}
          {analysisResult && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Success Badge */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-[#20B26B]" />
                  <span className="text-xs font-bold">
                    Document Successfully Parsed & Added to Medical Records
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-emerald-700 border border-emerald-200">
                  {analysisResult.confidenceScore}% Confidence
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-[#102A43]">
                    {analysisResult.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {analysisResult.category} · {analysisResult.hospital}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {analysisResult.riskLevel}
                  </span>
                </div>
              </div>

              {/* 1. CLINICAL SUMMARY */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#0878E8] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Clinical Summary of Findings</span>
                </h5>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {analysisResult.summary}
                </p>
              </div>

              {/* 2. PRECAUTIONS & HEALTH ADVICE */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important Precautions & Actionable Advice</span>
                </h5>
                <ul className="space-y-1.5">
                  {analysisResult.precautions.map((precaution, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-amber-950 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. IMPORTANT DETAILS & TEST VALUES */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#102A43] flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#0878E8]" />
                  <span>Important Extracted Parameters & Observations</span>
                </h5>
                <div className="divide-y divide-slate-100">
                  {analysisResult.details.map((detail, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{detail.testName}</span>
                      <div className="text-right">
                        <span className="font-bold text-[#102A43] mr-2">{detail.result}</span>
                        <span className="text-[11px] text-slate-400">Ref: {detail.normalRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. RECOMMENDED QUESTIONS FOR DOCTOR */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#0878E8] flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Suggested Questions to Ask Your Attending Physician</span>
                </h5>
                <ul className="space-y-1 text-xs text-slate-700">
                  {analysisResult.doctorQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#0878E8]">{idx + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDiscussWithCopilot}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0878E8] to-[#16B8C4] hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Discuss Report with AI Health Copilot →</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close & View in Library
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
