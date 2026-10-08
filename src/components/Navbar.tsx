import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  Search, 
  Bell, 
  Mail,
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  FileText, 
  Activity, 
  User, 
  PhoneCall, 
  Video,
  ShieldCheck,
  Stethoscope,
  Pill,
  Globe,
  Settings
} from 'lucide-react';
import { PatientProfile, NotificationItem } from '../types';
import { useLanguage, LanguageCode } from '../context/LanguageContext';
import { HOSPITAL_INFO } from '../data/initialData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  patient: PatientProfile;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenEmail: () => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onCallEmergency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  patient,
  notifications,
  onOpenNotifications,
  onOpenEmail,
  onOpenSearch,
  onOpenProfile,
  onCallEmergency,
}) => {
  const { language, setLanguage, t, languages } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'doctors', label: t('doctors') },
    { id: 'appointments', label: t('appointments') },
    { id: 'records', label: t('records') },
    { id: 'medicines', label: t('medicines') },
    { id: 'tools', label: t('tools') },
    { id: 'teleconsult', label: t('teleconsult') },
    { id: 'about', label: t('about') },
    { id: 'admin', label: t('adminPanel'), isAdmin: true },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close language dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* LEFT: Logo & Brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden shrink-0 cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-md shadow-[#0878E8]/20 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 fill-white stroke-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#102A43]">
                  SGT
                </span>
                <span className="text-xl font-bold tracking-tight text-[#0878E8]">
                  Hospital
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                {t('tagline')}
              </p>
            </div>
          </button>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              if (link.isAdmin) {
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#102A43] text-white shadow-xs'
                        : 'bg-slate-100 text-[#102A43] hover:bg-[#102A43] hover:text-white border border-slate-200'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5 text-[#16B8C4]" />
                    <span>{link.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-xs 2xl:text-sm font-semibold transition-colors duration-150 rounded-lg cursor-pointer ${
                    isActive 
                      ? 'text-[#0878E8]' 
                      : 'text-slate-600 hover:text-[#0878E8] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#0878E8] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Language Selector, Search, Notifications, Email, Emergency & Profile */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                title="Select website language"
              >
                <Globe className="w-3.5 h-3.5 text-[#0878E8]" />
                <span>{currentLangObj.flag}</span>
                <span className="hidden sm:inline">{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    Select Language
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                        language === lang.code ? 'font-bold text-[#0878E8] bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {language === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-[#0878E8]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Search trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-xl text-xs text-slate-500 transition-colors w-36 lg:w-48 focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30 cursor-pointer"
              title="Search doctors, records, medicines..."
            >
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{t('searchPlaceholder')}</span>
              <kbd className="ml-auto hidden xl:inline-block text-[10px] font-mono bg-white px-1.5 py-0.5 rounded-sm border border-slate-200 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Hospital Email & Patient Messages */}
            <button
              onClick={onOpenEmail}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-[#0878E8] hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30 cursor-pointer"
              aria-label="View secure hospital emails"
              title="Hospital Email & Messages"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0878E8] rounded-full" />
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-[#0878E8] hover:bg-slate-100 transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30 cursor-pointer"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-[#E53945] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Emergency Hotline shortcut */}
            <button
              onClick={onCallEmergency}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-[#E53945] border border-red-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              title="Emergency Hotline: 112"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>112</span>
            </button>

            {/* User Profile Pill */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors text-left focus:outline-hidden group cursor-pointer"
            >
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#0878E8]/30 group-hover:ring-[#0878E8]"
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#102A43] leading-tight">
                  {patient.name}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {patient.patientId}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0878E8] transition-colors" />
            </button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-1.5 xl:hidden">
            
            {/* Mobile language switch */}
            <button
              onClick={() => {
                const nextLang: LanguageCode = language === 'en' ? 'hi' : language === 'hi' ? 'pa' : 'en';
                setLanguage(nextLang);
              }}
              className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700"
              title="Toggle language"
            >
              {currentLangObj.flag}
            </button>

            <button
              onClick={onOpenEmail}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 relative cursor-pointer"
              aria-label="Hospital Email"
            >
              <Mail className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0878E8] rounded-full" />
            </button>

            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E53945] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#102A43] hover:bg-slate-100 focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 p-3 mb-3 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="w-10 h-10 rounded-lg object-cover ring-2 ring-[#0878E8]/40"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#102A43] truncate">{patient.name}</p>
              <p className="text-xs text-slate-500">ID: {patient.patientId} · Blood: {patient.bloodGroup}</p>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="text-xs font-semibold text-[#0878E8] hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCallEmergency();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-red-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-red-700 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              Emergency 112
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-slate-800 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Admin Panel
            </button>
          </div>

          {/* Language selector in mobile drawer */}
          <div className="mb-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select Language
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                    language === l.code ? 'bg-[#0878E8] text-white' : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-[#EAF6FF] text-[#0878E8] font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {currentPage === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#0878E8]" />
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
