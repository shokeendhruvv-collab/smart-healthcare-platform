import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  Send, 
  Star, 
  Users, 
  Clock, 
  Activity, 
  CheckCircle2, 
  Stethoscope 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onBookAppointmentClick: () => void;
  onExploreServicesClick: () => void;
  onAskCopilot: (question: string) => void;
  patientName?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onBookAppointmentClick,
  onExploreServicesClick,
  onAskCopilot,
  patientName = 'Harshit',
}) => {
  const { t } = useLanguage();
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroPrompt.trim()) {
      onAskCopilot(heroPrompt.trim());
      setHeroPrompt('');
    } else {
      onAskCopilot('Explain my lab report');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF6FF] via-[#F1F8FD] to-[#F7FAFC] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0878E8]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-[#16B8C4]/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Health Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#0878E8]/20 shadow-xs backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#0878E8] animate-ping" />
              <span className="text-xs font-bold tracking-wide uppercase text-[#0878E8]">
                {t('heroBadge')}
              </span>
              <ShieldCheck className="w-4 h-4 text-[#16B8C4]" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102A43] tracking-tight leading-[1.12]">
              Advanced Healthcare <br className="hidden sm:inline" />
              for a{' '}
              <span className="bg-gradient-to-r from-[#0878E8] to-[#16B8C4] bg-clip-text text-transparent">
                Healthier You
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t('heroSubtitle')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookAppointmentClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white font-bold text-sm shadow-md shadow-[#0878E8]/25 hover:shadow-lg hover:shadow-[#0878E8]/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{t('bookAppointment')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServicesClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#102A43] font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition-all duration-200 cursor-pointer"
              >
                <span>{t('exploreServices')}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">500+ Top Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">24/7 AI Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#20B26B] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">NABH Accredited</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Doctor Visual + Floating AI Copilot Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Visual Container */}
            <div className="relative w-full max-w-md">
              
              {/* Doctor Main Image with Subtle Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-blue-100 to-teal-50 border-4 border-white shadow-xl shadow-blue-900/10 aspect-4/5 sm:aspect-square lg:aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt="Doctor at LifeCare Hospital"
                  className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/60 via-transparent to-transparent pointer-events-none" />

                {/* Doctor Credential Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF6FF] flex items-center justify-center text-[#0878E8]">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#102A43]">Dr. Priya Sharma & Team</p>
                      <p className="text-[11px] text-slate-500">Chief of Cardiology & Medicine</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-amber-800">4.9</span>
                  </div>
                </div>

                {/* Top Floating Badge: Verified Care */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-[11px] font-bold text-[#102A43] shadow-md flex items-center gap-1.5 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-[#20B26B]" />
                  <span>Available for Teleconsult</span>
                </div>
              </div>

              {/* FLOATING AI HEALTH COPILOT CARD (Beside/Over the Doctor) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 sm:-bottom-8 w-80 sm:w-88 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-blue-100 animate-float-slow z-20">
                
                {/* Header with Bot icon & Title */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#102A43]">
                        AI Health Copilot
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Personalized clinical intelligence
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-50 text-[#20B26B] border border-emerald-200">
                    Active
                  </span>
                </div>

                {/* Chat Preview Bubble */}
                <div className="bg-[#EAF6FF]/80 rounded-xl p-2.5 text-xs text-[#102A43] mb-3 border border-blue-100/60 leading-relaxed">
                  <p className="font-medium">
                    Hi {patientName}! 👋 <br />
                    How can I help you today?
                  </p>
                </div>

                {/* Prompt Input Form */}
                <form onSubmit={handleHeroSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    placeholder="Ask about your health, reports, medicines..."
                    className="w-full text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#0878E8] rounded-xl pl-3 pr-10 py-2.5 outline-hidden transition-all text-slate-800 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 w-7 h-7 rounded-lg bg-[#0878E8] hover:bg-[#0769cc] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                    title="Send to AI Copilot"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                <p className="text-[9px] text-slate-400 mt-2 text-center">
                  Supportive guidance · Confidential · 24/7 LifeCare Clinical Engine
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
