import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  Users, 
  Building2, 
  Sparkles, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  Stethoscope 
} from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onBookAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToHome,
  onBookAppointment,
}) => {
  const stats = [
    { label: 'Doctors & Specialists', value: '500+', desc: 'Board certified consultants' },
    { label: 'Clinical Specialties', value: '50+', desc: 'Comprehensive medical departments' },
    { label: 'Treated Patients', value: '100K+', desc: '99.4% Patient satisfaction' },
    { label: 'Emergency Care', value: '24/7', desc: 'NABH Level 1 Trauma center' },
  ];

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-12">
      
      {/* Top Banner */}
      <div className="space-y-4 max-w-4xl">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#0878E8]">
          <Heart className="w-3.5 h-3.5 fill-[#0878E8]" />
          <span>Better Health. Brighter Tomorrow.</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102A43] tracking-tight">
          SGT Hospital & Faculty of Medicine and Health Sciences
        </h1>

        <p className="text-base text-slate-600 leading-relaxed">
          Founded with a commitment to clinical excellence, medical research, and compassionate healthcare,
          SGT Hospital (Budhera, Gurugram) merges tertiary clinical expertise with next-generation artificial
          intelligence to deliver high-precision diagnostics, seamless outpatient appointments, and proactive wellness.
        </p>
      </div>

      {/* 4 Big Stat Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#0878E8]/40 transition-all text-center"
          >
            <span className="text-3xl sm:text-4xl font-extrabold text-[#0878E8] tracking-tight">
              {s.value}
            </span>
            <h3 className="text-sm font-bold text-[#102A43] mt-1">
              {s.label}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#102A43]">
            Our Mission
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To make international-standard healthcare accessible, empathetic, and continuous for every individual. We strive to combine evidence-based medicine with intelligent diagnostic tools that preempt illness before it manifests.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#16B8C4] flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#102A43]">
            Our Vision
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            To create an integrated global health ecosystem where hospital walls dissolve—empowering patients with their continuous health records, AI-driven wellness assistants, and instant specialist consultations from anywhere in the world.
          </p>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-[#102A43]">
            Pillars of LifeCare Excellence
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Setting benchmark healthcare standards across all medical disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
            <ShieldCheck className="w-8 h-8 text-[#20B26B]" />
            <h4 className="text-base font-bold text-[#102A43]">Medical Excellence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              JCI & NABH accredited protocols ensure optimal infection control, surgical sterility, and robotic-assisted precision surgery with rapid patient discharge.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
            <Sparkles className="w-8 h-8 text-[#0878E8]" />
            <h4 className="text-base font-bold text-[#102A43]">Technology & Innovation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI Health Copilot integration, 3-Tesla silent MRI, smart continuous ECG telemetry, and instant encrypted telemedicine consultation networks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2.5">
            <Users className="w-8 h-8 text-[#16B8C4]" />
            <h4 className="text-base font-bold text-[#102A43]">Patient-Centered Care</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent digital medical records, zero-wait OPD scheduling, insurance desk support, and individualized nutrition and rehabilitation recovery paths.
            </p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0878E8] to-[#16B8C4] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl shadow-blue-500/15">
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Ready to experience better healthcare?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md">
            Schedule a consultation with our experienced physicians or start an instant teleconsultation today.
          </p>
        </div>

        <button
          onClick={onBookAppointment}
          className="px-6 py-3.5 rounded-xl bg-white text-[#0878E8] font-bold text-sm shadow-md hover:bg-slate-50 transition-all cursor-pointer shrink-0"
        >
          Book an Appointment Now
        </button>
      </div>

    </div>
  );
};
