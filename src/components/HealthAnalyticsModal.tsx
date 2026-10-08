import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Activity, 
  Scale, 
  Moon, 
  Footprints, 
  Flame, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Calendar,
  Download,
  Info
} from 'lucide-react';

interface HealthAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
}

type MetricType = 'heartRate' | 'bloodPressure' | 'weight' | 'sleep' | 'steps' | 'calories';
type Timeframe = '7 Days' | '30 Days' | '3 Months' | '1 Year';

export const HealthAnalyticsModal: React.FC<HealthAnalyticsModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Harshit',
}) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('heartRate');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('7 Days');

  if (!isOpen) return null;

  // Chart dataset generators for each metric
  const datasets: Record<MetricType, {
    title: string;
    currentValue: string;
    unit: string;
    status: string;
    trendText: string;
    trendType: 'positive' | 'neutral' | 'improved';
    color: string;
    icon: any;
    dataPoints: { label: string; value: number; secondary?: number }[];
    targetRange: string;
    analysis: string;
  }> = {
    heartRate: {
      title: 'Resting Heart Rate',
      currentValue: '72',
      unit: 'bpm',
      status: 'Normal & Stable',
      trendText: 'Heart rate is stable this week.',
      trendType: 'positive',
      color: '#E53945',
      icon: Heart,
      targetRange: '60 - 100 bpm',
      analysis: 'Cardiovascular resting rate shows regular rhythm with no premature ventricular ectopy.',
      dataPoints: [
        { label: 'Thu', value: 74 },
        { label: 'Fri', value: 71 },
        { label: 'Sat', value: 70 },
        { label: 'Sun', value: 68 },
        { label: 'Mon', value: 73 },
        { label: 'Tue', value: 71 },
        { label: 'Wed', value: 72 },
      ],
    },
    bloodPressure: {
      title: 'Blood Pressure (Systolic/Diastolic)',
      currentValue: '118/76',
      unit: 'mmHg',
      status: 'Optimal',
      trendText: 'Blood pressure remains in the optimal healthy range.',
      trendType: 'positive',
      color: '#0878E8',
      icon: Activity,
      targetRange: '< 120 / < 80 mmHg',
      analysis: 'Mean arterial pressure is within top-tier cardiovascular longevity guidelines.',
      dataPoints: [
        { label: 'Thu', value: 120, secondary: 78 },
        { label: 'Fri', value: 119, secondary: 77 },
        { label: 'Sat', value: 117, secondary: 75 },
        { label: 'Sun', value: 116, secondary: 74 },
        { label: 'Mon', value: 121, secondary: 79 },
        { label: 'Tue', value: 118, secondary: 76 },
        { label: 'Wed', value: 118, secondary: 76 },
      ],
    },
    weight: {
      title: 'Body Weight',
      currentValue: '68.0',
      unit: 'kg',
      status: 'Target Achieved',
      trendText: 'Weight has stabilized with lean mass preservation.',
      trendType: 'positive',
      color: '#F5A623',
      icon: Scale,
      targetRange: '65 - 72 kg (BMI 22.2)',
      analysis: 'Body mass index remains in the optimal bracket for height 175cm.',
      dataPoints: [
        { label: 'Thu', value: 68.4 },
        { label: 'Fri', value: 68.2 },
        { label: 'Sat', value: 68.1 },
        { label: 'Sun', value: 68.0 },
        { label: 'Mon', value: 68.2 },
        { label: 'Tue', value: 67.9 },
        { label: 'Wed', value: 68.0 },
      ],
    },
    sleep: {
      title: 'Sleep Duration & Architecture',
      currentValue: '7.5',
      unit: 'hours',
      status: 'Restorative',
      trendText: 'Sleep improved by 8% compared to last week.',
      trendType: 'improved',
      color: '#7C3AED',
      icon: Moon,
      targetRange: '7 - 9 hours/night',
      analysis: 'Deep REM sleep cycles averaged 1h 45m with minimal nighttime awakenings.',
      dataPoints: [
        { label: 'Thu', value: 6.8 },
        { label: 'Fri', value: 7.2 },
        { label: 'Sat', value: 8.1 },
        { label: 'Sun', value: 7.9 },
        { label: 'Mon', value: 7.0 },
        { label: 'Tue', value: 7.4 },
        { label: 'Wed', value: 7.5 },
      ],
    },
    steps: {
      title: 'Daily Steps',
      currentValue: '8,452',
      unit: 'steps',
      status: 'Goal Exceeded',
      trendText: 'Daily steps increased by 12%.',
      trendType: 'improved',
      color: '#20B26B',
      icon: Footprints,
      targetRange: '8,000 steps/day',
      analysis: 'Consistent aerobic movement observed across afternoon brisk walks.',
      dataPoints: [
        { label: 'Thu', value: 7200 },
        { label: 'Fri', value: 8100 },
        { label: 'Sat', value: 9400 },
        { label: 'Sun', value: 8600 },
        { label: 'Mon', value: 6900 },
        { label: 'Tue', value: 8200 },
        { label: 'Wed', value: 8452 },
      ],
    },
    calories: {
      title: 'Active Energy Burned',
      currentValue: '2,240',
      unit: 'kcal',
      status: 'Balanced',
      trendText: 'Metabolic expenditure meets daily activity targets.',
      trendType: 'positive',
      color: '#EA580C',
      icon: Flame,
      targetRange: '2,000 - 2,400 kcal',
      analysis: 'Basal Metabolic Rate: 1,680 kcal + Active Expenditure: 560 kcal.',
      dataPoints: [
        { label: 'Thu', value: 2100 },
        { label: 'Fri', value: 2280 },
        { label: 'Sat', value: 2450 },
        { label: 'Sun', value: 2300 },
        { label: 'Mon', value: 2050 },
        { label: 'Tue', value: 2190 },
        { label: 'Wed', value: 2240 },
      ],
    },
  };

  const currentDataset = datasets[activeMetric];

  // SVG Chart Calculation helper
  const rawValues = currentDataset.dataPoints.map((d) => d.value);
  const minVal = Math.min(...rawValues) * 0.95;
  const maxVal = Math.max(...rawValues) * 1.05;
  const range = maxVal - minVal || 1;
  const chartHeight = 160;
  const chartWidth = 500;
  const stepX = chartWidth / (currentDataset.dataPoints.length - 1);

  const pointsString = currentDataset.dataPoints
    .map((d, index) => {
      const x = index * stepX;
      const y = chartHeight - ((d.value - minVal) / range) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#102A43]">
                Comprehensive Health Analytics
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#0878E8] border border-blue-200">
                Patient: {patientName}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Real-time physiological metrics & longitudinal wellness trends
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metric Selector Tabs */}
        <div className="p-4 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto scrollbar-none">
          {(Object.keys(datasets) as MetricType[]).map((key) => {
            const item = datasets[key];
            const Icon = item.icon;
            const isSelected = activeMetric === key;
            return (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Top Metric Header & Timeframe Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {currentDataset.title}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-[#102A43]">
                  {currentDataset.currentValue}
                </span>
                <span className="text-sm font-semibold text-slate-500">
                  {currentDataset.unit}
                </span>
                <span className="ml-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {currentDataset.status}
                </span>
              </div>
            </div>

            {/* Timeframe buttons */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              {(['7 Days', '30 Days', '3 Months', '1 Year'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTimeframe === tf
                      ? 'bg-white text-[#102A43] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Trend Callout Box */}
          <div className="p-3.5 rounded-2xl bg-[#EAF6FF]/60 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white text-[#0878E8] flex items-center justify-center shadow-2xs">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#102A43]">
                  {currentDataset.trendText}
                </p>
                <p className="text-[11px] text-slate-500">
                  Normal Target Range: {currentDataset.targetRange}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#0878E8] hidden sm:inline">
              Clinical Grade
            </span>
          </div>

          {/* Interactive SVG Chart */}
          <div className="bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span>Trend Line ({selectedTimeframe})</span>
              <span>Target Baseline: {currentDataset.targetRange}</span>
            </div>

            <div className="w-full overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 sm:h-52 overflow-visible"
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentDataset.color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={currentDataset.color} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Subtle Grid horizontal lines */}
                <line x1="0" y1={30} x2={chartWidth} y2={30} stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#E2E8F0" strokeDasharray="4 4" />
                <line x1="0" y1={chartHeight - 20} x2={chartWidth} y2={chartHeight - 20} stroke="#E2E8F0" strokeDasharray="4 4" />

                {/* Filled Area below curve */}
                <polygon
                  points={`0,${chartHeight} ${pointsString} ${chartWidth},${chartHeight}`}
                  fill="url(#chartGradient)"
                />

                {/* Polyline line */}
                <polyline
                  fill="none"
                  stroke={currentDataset.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={pointsString}
                />

                {/* Data point circles and labels */}
                {currentDataset.dataPoints.map((d, index) => {
                  const x = index * stepX;
                  const y = chartHeight - ((d.value - minVal) / range) * (chartHeight - 30) - 15;
                  return (
                    <g key={d.label}>
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#FFFFFF"
                        stroke={currentDataset.color}
                        strokeWidth="2.5"
                      />
                      <text
                        x={x}
                        y={chartHeight + 16}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#64748B"
                      >
                        {d.label}
                      </text>
                      <text
                        x={x}
                        y={y - 9}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#1E293B"
                      >
                        {d.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Clinical Doctor Insights Note */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-[#102A43]">
              <Info className="w-4 h-4 text-[#0878E8]" />
              <span>Physician Observations & Recommendations</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {currentDataset.analysis} Maintain continuous hydration and proceed with your scheduled consultation with Dr. Priya Sharma.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Export compliant with FHIR / HL7 standards
          </span>
          <button
            onClick={() => {
              alert('Health Analytics Report exported to PDF successfully!');
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-[#102A43] shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </button>
        </div>

      </div>
    </div>
  );
};
