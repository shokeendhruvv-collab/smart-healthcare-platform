import React from 'react';
import { 
  Heart, 
  Activity, 
  Scale, 
  Moon, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface HealthOverviewProps {
  onViewFullReport: () => void;
  patientName?: string;
}

export const HealthOverview: React.FC<HealthOverviewProps> = ({
  onViewFullReport,
  patientName = 'Harshit',
}) => {
  const metrics = [
    {
      id: 'hr',
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'Normal',
      statusColor: 'text-[#20B26B]',
      icon: Heart,
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50/70 border-rose-100 hover:border-rose-200',
      trend: 'Resting pulse optimal',
    },
    {
      id: 'bp',
      label: 'Blood Pressure',
      value: '118/76',
      unit: 'mmHg',
      status: 'Normal',
      statusColor: 'text-[#20B26B]',
      icon: Activity,
      iconColor: 'text-[#0878E8]',
      bgColor: 'bg-blue-50/70 border-blue-100 hover:border-blue-200',
      trend: 'Ideal systolic/diastolic',
    },
    {
      id: 'weight',
      label: 'Weight',
      value: '68',
      unit: 'kg',
      status: 'Normal',
      statusColor: 'text-[#20B26B]',
      icon: Scale,
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50/70 border-amber-100 hover:border-amber-200',
      trend: 'BMI 22.2 (Healthy)',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: '7h 30m',
      unit: '',
      status: 'Good',
      statusColor: 'text-[#20B26B]',
      icon: Moon,
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50/70 border-indigo-100 hover:border-indigo-200',
      trend: '+8% deep sleep',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 transition-all">
      {/* Heading & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#102A43] tracking-tight">
              Your Health at a Glance
            </h2>
            <span className="w-2 h-2 rounded-full bg-[#20B26B]" title="Vitals Synchronized" />
          </div>
          <p className="text-xs font-semibold text-[#0878E8] mt-0.5">
            Good afternoon, {patientName}!
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Here's a quick look at your health profile.
          </p>
        </div>

        <button
          onClick={onViewFullReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-[#EAF6FF] text-[#0878E8] text-xs font-bold border border-slate-200 hover:border-blue-200 transition-all self-start sm:self-center cursor-pointer group"
        >
          <span>View Full Report</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={onViewFullReport}
              className={`p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${m.bgColor}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-7 h-7 rounded-lg bg-white shadow-xs flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${m.iconColor}`} />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/80 shadow-xs ${m.statusColor}`}>
                  {m.status}
                </span>
              </div>

              <div className="text-[11px] font-medium text-slate-500 truncate">
                {m.label}
              </div>

              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg sm:text-xl font-extrabold text-[#102A43] tracking-tight">
                  {m.value}
                </span>
                {m.unit && (
                  <span className="text-[11px] text-slate-500 font-medium">
                    {m.unit}
                  </span>
                )}
              </div>

              <div className="text-[10px] text-slate-500 mt-1 truncate">
                {m.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Realtime summary ticker */}
      <div className="mt-4 p-2.5 bg-[#EAF6FF]/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#0878E8] shrink-0" />
          <span className="font-medium text-slate-700">
            Weekly Health Index: <strong className="text-[#0878E8]">96 / 100</strong> (Optimal Stability)
          </span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Last synced 5 mins ago
        </span>
      </div>
    </div>
  );
};
