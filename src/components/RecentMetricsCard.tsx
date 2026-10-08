import React from 'react';
import { 
  Heart, 
  Activity, 
  Footprints, 
  Moon, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

interface RecentMetricsCardProps {
  onViewAll: () => void;
}

export const RecentMetricsCard: React.FC<RecentMetricsCardProps> = ({
  onViewAll,
}) => {
  const items = [
    {
      id: 'hr',
      label: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'Normal',
      icon: Heart,
      iconColor: 'text-rose-500 bg-rose-50',
      statusColor: 'text-[#20B26B]',
    },
    {
      id: 'bp',
      label: 'Blood Pressure',
      value: '118/76',
      unit: 'mmHg',
      status: 'Normal',
      icon: Activity,
      iconColor: 'text-[#0878E8] bg-blue-50',
      statusColor: 'text-[#20B26B]',
    },
    {
      id: 'steps',
      label: 'Steps',
      value: '8,452',
      unit: 'today',
      status: 'Good',
      icon: Footprints,
      iconColor: 'text-emerald-500 bg-emerald-50',
      statusColor: 'text-[#20B26B]',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: '7h 30m',
      unit: '',
      status: 'Good',
      icon: Moon,
      iconColor: 'text-indigo-500 bg-indigo-50',
      statusColor: 'text-[#20B26B]',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 transition-all">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-sm font-bold text-[#102A43] tracking-tight">
          Recent Health Metrics
        </h3>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-[#0878E8] hover:text-[#0769cc] flex items-center gap-1 cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={onViewAll}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {item.status} reading
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs sm:text-sm font-extrabold text-[#102A43]">
                  {item.value} {item.unit}
                </span>
                <span className={`block text-[10px] font-bold ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
