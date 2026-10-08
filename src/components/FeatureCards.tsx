import React from 'react';
import { 
  Stethoscope, 
  CalendarCheck, 
  FileText, 
  Pill, 
  Activity, 
  PhoneCall, 
  ArrowUpRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeatureCardsProps {
  onNavigate: (page: string) => void;
  onCallEmergency: () => void;
  onOpenBooking: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onNavigate,
  onCallEmergency,
  onOpenBooking,
}) => {
  const { t } = useLanguage();

  const features = [
    {
      id: 'doctors',
      title: t('findDoctors'),
      description: t('findDoctorsDesc'),
      icon: Stethoscope,
      iconBg: 'bg-blue-50 text-[#0878E8]',
      cardBorder: 'hover:border-[#0878E8]/40 hover:shadow-blue-500/5',
      action: () => onNavigate('doctors'),
    },
    {
      id: 'book',
      title: t('bookAppointment'),
      description: t('bookAppointmentDesc'),
      icon: CalendarCheck,
      iconBg: 'bg-cyan-50 text-[#16B8C4]',
      cardBorder: 'hover:border-[#16B8C4]/40 hover:shadow-cyan-500/5',
      action: onOpenBooking,
    },
    {
      id: 'records',
      title: t('records'),
      description: t('medicalRecordsDesc'),
      icon: FileText,
      iconBg: 'bg-indigo-50 text-indigo-600',
      cardBorder: 'hover:border-indigo-400/40 hover:shadow-indigo-500/5',
      action: () => onNavigate('records'),
    },
    {
      id: 'medicines',
      title: t('medicines'),
      description: t('medicinesDesc'),
      icon: Pill,
      iconBg: 'bg-emerald-50 text-emerald-600',
      cardBorder: 'hover:border-emerald-400/40 hover:shadow-emerald-500/5',
      action: () => onNavigate('medicines'),
    },
    {
      id: 'monitoring',
      title: t('healthMonitoring'),
      description: t('healthMonitoringDesc'),
      icon: Activity,
      iconBg: 'bg-purple-50 text-purple-600',
      cardBorder: 'hover:border-purple-400/40 hover:shadow-purple-500/5',
      action: () => onNavigate('tools'),
    },
    {
      id: 'emergency',
      title: t('emergency'),
      description: t('emergencyDesc'),
      icon: PhoneCall,
      iconBg: 'bg-red-50 text-[#E53945]',
      cardBorder: 'border-red-200/80 bg-red-50/20 hover:border-[#E53945] hover:shadow-red-500/10',
      isEmergency: true,
      action: onCallEmergency,
    },
  ];

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`group flex flex-col items-start p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs transition-all duration-200 hover:-translate-y-1 text-left cursor-pointer ${item.cardBorder}`}
            >
              <div className="w-full flex items-center justify-between mb-3">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-200 ${item.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>

              <h3 className={`text-xs sm:text-sm font-bold tracking-tight mb-1 line-clamp-1 ${
                item.isEmergency ? 'text-[#E53945]' : 'text-[#102A43]'
              }`}>
                {item.title}
              </h3>
              
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
