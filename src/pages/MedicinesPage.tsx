import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  RotateCw, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  ShoppingBag,
  Info
} from 'lucide-react';
import { Medicine } from '../types';

interface MedicinesPageProps {
  medicines: Medicine[];
  onOrderRefill: (med: Medicine) => void;
  onBackToHome: () => void;
}

export const MedicinesPage: React.FC<MedicinesPageProps> = ({
  medicines,
  onOrderRefill,
  onBackToHome,
}) => {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('All');
  const [search, setSearch] = useState('');

  const filtered = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.genericName.toLowerCase().includes(search.toLowerCase()) ||
      m.doctor.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filter === 'All' ? true : m.status === filter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Medicines & Prescriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Track active dosages, adherence schedules, and request certified home refills
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Pharmacy Express Delivery Active
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine by brand, salt, prescribing doctor..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white text-xs sm:text-sm border border-slate-200 rounded-xl outline-hidden focus:border-[#0878E8]"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-center">
          {(['All', 'Active', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-[#0878E8] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab} Medications
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((med) => {
          const isActive = med.status === 'Active';
          const isLowSupply = med.remainingPills <= 5 && isActive;

          return (
            <div
              key={med.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#16B8C4]/40 hover:shadow-xs transition-all p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#16B8C4] flex items-center justify-center shrink-0">
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#102A43]">
                        {med.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {med.genericName}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {med.status}
                  </span>
                </div>

                {/* Dosage details grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Dosage</span>
                    <span className="font-bold text-[#102A43]">{med.dosage}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Frequency</span>
                    <span className="font-bold text-[#102A43]">{med.frequency}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Duration</span>
                    <span className="font-bold text-[#102A43]">{med.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Timing</span>
                    <span className="font-bold text-[#102A43]">{med.timing}</span>
                  </div>
                </div>

                {/* Instructions & Doctor */}
                <div className="space-y-2 text-xs text-slate-600 mb-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#0878E8] shrink-0 mt-0.5" />
                    <p className="font-medium text-slate-700 leading-relaxed">
                      {med.instructions}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>Prescribed by: {med.doctor}</span>
                    <span>Date: {med.prescribedDate}</span>
                  </div>
                </div>
              </div>

              {/* Refill Pill Progress & Order Action */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">
                      Remaining: {med.remainingPills} / {med.totalPills} pills
                    </span>
                    {isLowSupply && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                        Refill Due Soon
                      </span>
                    )}
                  </div>
                  <div className="w-36 sm:w-44 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLowSupply ? 'bg-amber-500' : 'bg-[#16B8C4]'
                      }`}
                      style={{
                        width: `${Math.min(100, (med.remainingPills / med.totalPills) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onOrderRefill(med)}
                    className="px-4 py-2 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Refill Now</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
