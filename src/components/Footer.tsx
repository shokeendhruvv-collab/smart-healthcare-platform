import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink,
  Settings,
  Clock,
  Ambulance
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onCallEmergency: () => void;
  onOpenEmail?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onCallEmergency,
  onOpenEmail,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#102A43] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">
                  SGT Hospital
                </span>
                <p className="text-xs text-blue-200/70 font-medium">
                  {t('tagline')}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Faculty of Medicine & Health Sciences, SGT Hospital delivers tertiary healthcare,
              cutting-edge clinical research, robotic surgery, and round-the-clock emergency trauma response.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onCallEmergency}
                className="px-4 py-2 rounded-xl bg-[#E53945] hover:bg-[#c92d39] text-white text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{t('emergencyHotline')}</span>
              </button>
              
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>NABH & NABL Accredited</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              {t('quickNavigation')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors cursor-pointer">
                  {t('doctors')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('appointments')} className="hover:text-white transition-colors cursor-pointer">
                  {t('appointments')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('records')} className="hover:text-white transition-colors cursor-pointer">
                  {t('records')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('medicines')} className="hover:text-white transition-colors cursor-pointer">
                  {t('medicines')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors cursor-pointer">
                  {t('tools')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teleconsult')} className="hover:text-white transition-colors cursor-pointer">
                  {t('teleconsult')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer flex items-center gap-1">
                  <Settings className="w-3.5 h-3.5" />
                  <span>{t('adminPanel')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Specialties */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              {t('specialties')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>Cardiology & Heart Center</li>
              <li>Orthopedics & Robotic Arthroplasty</li>
              <li>Neurosciences & Neurosurgery</li>
              <li>Dermatology & Cosmetology</li>
              <li>Pediatrics & Level-3 NICU</li>
              <li>Obstetrics & Gynecology (OB-GYN)</li>
              <li>Urology & Renal Transplant</li>
              <li>Gastroenterology & Hepatology</li>
              <li>24/7 Level 1 Trauma Care</li>
            </ul>
          </div>

          {/* Contact & Location with User's Exact Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">
              {t('addressLabel')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#16B8C4] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {HOSPITAL_INFO.address}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0878E8] shrink-0" />
                <span>
                  {HOSPITAL_INFO.phone1}, {HOSPITAL_INFO.phone2}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0878E8] shrink-0" />
                <button
                  onClick={onOpenEmail}
                  className="hover:text-blue-300 underline underline-offset-2 transition-colors cursor-pointer text-left font-mono text-[11px]"
                  title="Send email to hospital administration"
                >
                  {HOSPITAL_INFO.email}
                </button>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>OPD: 8:30 AM – 5:00 PM | Emergency: 24x7</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} SGT Hospital. {t('allRightsReserved')}</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-mono text-[11px]">Sgt hospital, Budhera, Gurugram</span>
            <span className="text-slate-400 font-mono text-[11px]">Contact: +91-124-2278187</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
