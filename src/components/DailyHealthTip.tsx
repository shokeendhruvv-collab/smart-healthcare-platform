import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  HeartPulse,
  Apple,
  Moon,
  Brain,
  Activity,
  Flame
} from 'lucide-react';
import { getDailyHealthTip, HEALTH_TIPS, HealthTip } from '../data/healthTips';

interface DailyHealthTipProps {
  onAskCopilot: (query: string) => void;
}

export const DailyHealthTip: React.FC<DailyHealthTipProps> = ({ onAskCopilot }) => {
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [bookmarkedTips, setBookmarkedTips] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lifecare_bookmarked_tips');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { tip, dateString } = getDailyHealthTip(dayOffset);
  const isBookmarked = bookmarkedTips.includes(tip.id);

  const handleToggleBookmark = () => {
    let updated: string[];
    if (isBookmarked) {
      updated = bookmarkedTips.filter((id) => id !== tip.id);
    } else {
      updated = [...bookmarkedTips, tip.id];
    }
    setBookmarkedTips(updated);
    localStorage.setItem('lifecare_bookmarked_tips', JSON.stringify(updated));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `LifeCare Daily Health Tip: ${tip.title}\n${tip.summary}\nAction: ${tip.actionableStep}\nSource: ${tip.source}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (category: HealthTip['category']) => {
    switch (category) {
      case 'Cardiovascular':
        return <HeartPulse className="w-4 h-4 text-rose-500" />;
      case 'Nutrition':
        return <Apple className="w-4 h-4 text-emerald-500" />;
      case 'Sleep & Recovery':
        return <Moon className="w-4 h-4 text-indigo-500" />;
      case 'Mental Well-being':
        return <Brain className="w-4 h-4 text-purple-500" />;
      case 'Metabolic Health':
        return <Flame className="w-4 h-4 text-amber-500" />;
      default:
        return <Activity className="w-4 h-4 text-[#0878E8]" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50/70 via-white to-teal-50/60 rounded-2xl sm:rounded-3xl border border-blue-200/80 shadow-xs p-5 sm:p-6 transition-all duration-300 hover:shadow-md">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-blue-100/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#102A43] tracking-tight">
                Daily Health Tip
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <Check className="w-3 h-3 text-[#20B26B]" />
                Evidence-Based
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {dateString} {dayOffset !== 0 && <span className="text-[#0878E8] font-bold">({dayOffset < 0 ? `${Math.abs(dayOffset)}d ago` : `in ${dayOffset}d`})</span>}
            </p>
          </div>
        </div>

        {/* Day navigation and action buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          <button
            onClick={() => setDayOffset(prev => prev - 1)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#0878E8] hover:bg-slate-50 transition-colors cursor-pointer"
            title="Previous Day's Tip"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {dayOffset !== 0 && (
            <button
              onClick={() => setDayOffset(0)}
              className="px-2.5 py-1 rounded-xl text-xs font-bold text-[#0878E8] bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              Today
            </button>
          )}

          <button
            onClick={() => setDayOffset(prev => prev + 1)}
            className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-[#0878E8] hover:bg-slate-50 transition-colors cursor-pointer"
            title="Next Day's Tip"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1" />

          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-amber-50 border-amber-300 text-amber-600'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Tip'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative"
            title="Copy / Share Tip"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-4 space-y-4">
        
        {/* Category & Tags Row (Rendered cleanly with typographic dots) */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 font-bold text-[#102A43]">
            {getCategoryIcon(tip.category)}
            <span>{tip.category}</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{tip.tags.join(' · ')}</span>
        </div>

        {/* Tip Title */}
        <h4 className="text-base sm:text-lg font-extrabold text-[#102A43] leading-snug">
          {tip.title}
        </h4>

        {/* Clinical Summary */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {tip.summary}
        </p>

        {/* Actionable Step & Stat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
          
          {/* Actionable Step */}
          <div className="md:col-span-8 p-3.5 rounded-xl bg-white border border-blue-100/90 shadow-2xs flex items-start gap-3">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#20B26B] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
              ✓
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Actionable Recommendation Today
              </span>
              <p className="text-xs font-semibold text-[#102A43] mt-0.5 leading-relaxed">
                {tip.actionableStep}
              </p>
            </div>
          </div>

          {/* Clinical Metric / Stat Box */}
          <div className="md:col-span-4 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#0878E8] block">
              Observed Impact
            </span>
            <p className="text-xs font-bold text-[#102A43] mt-0.5 leading-snug">
              {tip.statOrFact}
            </p>
          </div>

        </div>

        {/* Footer: Source + Doctor Reviewer + Ask AI Copilot CTA */}
        <div className="pt-3 border-t border-blue-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20B26B] shrink-0" />
              <span>{tip.reviewedBy}</span>
            </div>
            <p className="text-[10px] text-slate-400 pl-5">
              Source: {tip.source}
            </p>
          </div>

          <button
            onClick={() => onAskCopilot(`How can I apply today's health tip ("${tip.title}") to my current routine?`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#EAF6FF] text-[#0878E8] font-bold text-xs border border-blue-200 hover:border-blue-300 shadow-2xs transition-all cursor-pointer self-start sm:self-center group"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personalize with Copilot</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

        </div>

      </div>

    </div>
  );
};
