import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  DollarSign, 
  Receipt, 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Edit3, 
  Trash2, 
  Eye, 
  Download, 
  Check, 
  X, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  Activity,
  Bed,
  Ambulance,
  BadgeCheck,
  CreditCard,
  Building
} from 'lucide-react';
import { 
  PatientProfile, 
  Doctor, 
  Appointment, 
  HospitalExpense, 
  StaffSalary, 
  HospitalDepartment 
} from '../types';
import { HOSPITAL_INFO } from '../data/initialData';
import { useLanguage } from '../context/LanguageContext';

interface AdminPageProps {
  patients: PatientProfile[];
  setPatients: React.Dispatch<React.SetStateAction<PatientProfile[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  expenses: HospitalExpense[];
  setExpenses: React.Dispatch<React.SetStateAction<HospitalExpense[]>>;
  salaries: StaffSalary[];
  setSalaries: React.Dispatch<React.SetStateAction<StaffSalary[]>>;
  departments: HospitalDepartment[];
  setDepartments: React.Dispatch<React.SetStateAction<HospitalDepartment[]>>;
  onBackToHome: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  patients,
  setPatients,
  doctors,
  setDoctors,
  appointments,
  setAppointments,
  expenses,
  setExpenses,
  salaries,
  setSalaries,
  departments,
  setDepartments,
  onBackToHome,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'appointments' | 'doctors' | 'salaries' | 'expenses' | 'departments'>('overview');
  
  // Search states
  const [patientSearch, setPatientSearch] = useState('');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState('All');

  // Modals inside Admin
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false);
  const [viewPatientDetails, setViewPatientDetails] = useState<PatientProfile | null>(null);

  // Form states for Add Patient
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: 30,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 ',
    email: '',
    address: 'Gurugram, Haryana',
    emergencyName: '',
    emergencyPhone: '',
    allergies: 'None',
    insurance: 'Ayushman Bharat',
    policyNum: 'SGT-POL-2026',
  });

  // Form states for Add Doctor
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    designation: 'Senior Consultant',
    specialty: 'Cardiologist',
    department: 'Cardiology & Heart Center',
    experience: '10+ years',
    qualifications: 'MBBS, MD',
    consultationFee: 60,
    monthlySalary: 250000,
    languages: 'English, Hindi',
    bio: '',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
  });

  // Form states for Add Expense
  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'Medical Supplies & Reagents' as HospitalExpense['category'],
    amount: 50000,
    vendor: '',
    paymentMethod: 'Direct Bank Wire (NEFT)',
    approvedBy: 'Medical Superintendent',
  });

  // Form states for Add Appointment
  const [newApt, setNewApt] = useState({
    patientName: '',
    patientPhone: '',
    doctorId: doctors[0]?.id || '',
    date: 'Tomorrow, 11:00 AM',
    time: '11:00 AM',
    type: 'In-person' as Appointment['type'],
    reason: 'Clinical consultation',
  });

  // Calculated Financial & Administrative Totals
  const totalSalaries = salaries.reduce((acc, s) => acc + s.netSalary, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalBeds = departments.reduce((acc, d) => acc + d.activeBeds, 0);
  const occupiedBeds = Math.round(totalBeds * 0.78); // 78% bed occupancy
  const totalPaidSalaries = salaries.filter(s => s.status === 'Paid').reduce((acc, s) => acc + s.netSalary, 0);
  const totalPendingSalaries = salaries.filter(s => s.status !== 'Paid').reduce((acc, s) => acc + s.netSalary, 0);
  const estMonthlyRevenue = 4850000; // Realistic hospital OPD/IPD monthly collection in INR
  const netOperatingMargin = estMonthlyRevenue - (totalSalaries + totalExpenses);

  // Handlers
  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name.trim()) return;
    const created: PatientProfile = {
      name: newPatient.name.trim(),
      patientId: `SGT-${Math.floor(100000 + Math.random() * 900000)}`,
      age: Number(newPatient.age),
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      phone: newPatient.phone,
      email: newPatient.email || `${newPatient.name.toLowerCase().replace(/\s+/g, '')}@patient.sgt.in`,
      emergencyContact: {
        name: newPatient.emergencyName || 'Primary Relative',
        relationship: 'Kin',
        phone: newPatient.emergencyPhone || newPatient.phone,
      },
      address: newPatient.address,
      allergies: newPatient.allergies.split(',').map(s => s.trim()),
      insuranceProvider: newPatient.insurance,
      insurancePolicyNumber: newPatient.policyNum,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    };
    setPatients(prev => [created, ...prev]);
    setShowAddPatientModal(false);
    setNewPatient({
      name: '',
      age: 30,
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '+91 ',
      email: '',
      address: 'Gurugram, Haryana',
      emergencyName: '',
      emergencyPhone: '',
      allergies: 'None',
      insurance: 'Ayushman Bharat',
      policyNum: 'SGT-POL-2026',
    });
  };

  const handleCreateDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoctor.name.trim()) return;
    const docId = `doc-${Date.now()}`;
    const empId = `DOC-SGT-${String(doctors.length + 1).padStart(3, '0')}`;
    const created: Doctor = {
      id: docId,
      employeeId: empId,
      name: newDoctor.name.trim(),
      designation: newDoctor.designation,
      specialty: newDoctor.specialty,
      department: newDoctor.department,
      rating: 4.9,
      reviewCount: 120,
      experience: newDoctor.experience,
      status: 'Available Today',
      availableToday: true,
      teleconsultationAvailable: true,
      consultationFee: Number(newDoctor.consultationFee),
      monthlySalary: Number(newDoctor.monthlySalary),
      totalConsultations: 150,
      image: newDoctor.image,
      qualifications: newDoctor.qualifications,
      languages: newDoctor.languages.split(',').map(s => s.trim()),
      bio: newDoctor.bio || `Specialist at ${newDoctor.department}, SGT Hospital.`,
      availableSlots: ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
      availableDates: ['2026-10-09', '2026-10-10', '2026-10-11'],
    };
    setDoctors(prev => [...prev, created]);

    // Also add to salaries
    const newSalaryRecord: StaffSalary = {
      id: `sal-${Date.now()}`,
      employeeId: empId,
      name: newDoctor.name.trim(),
      role: 'Specialist Doctor',
      department: newDoctor.department,
      baseSalary: Number(newDoctor.monthlySalary) * 0.9,
      allowances: Number(newDoctor.monthlySalary) * 0.1,
      deductions: Number(newDoctor.monthlySalary) * 0.08,
      netSalary: Number(newDoctor.monthlySalary) * 0.92,
      status: 'Paid',
      paymentDate: 'Oct 01, 2026',
      bankAccount: 'HDFC Bank - **** ' + Math.floor(1000 + Math.random() * 9000),
    };
    setSalaries(prev => [newSalaryRecord, ...prev]);

    setShowAddDoctorModal(false);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.title.trim()) return;
    const created: HospitalExpense = {
      id: `exp-${Date.now()}`,
      title: newExpense.title.trim(),
      category: newExpense.category,
      amount: Number(newExpense.amount),
      date: 'Today',
      status: 'Paid',
      vendor: newExpense.vendor || 'Authorized Hospital Supplier',
      paymentMethod: newExpense.paymentMethod,
      approvedBy: newExpense.approvedBy,
    };
    setExpenses(prev => [created, ...prev]);
    setShowAddExpenseModal(false);
    setNewExpense({
      title: '',
      category: 'Medical Supplies & Reagents',
      amount: 50000,
      vendor: '',
      paymentMethod: 'Direct Bank Wire (NEFT)',
      approvedBy: 'Medical Superintendent',
    });
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.patientName.trim()) return;
    const doc = doctors.find(d => d.id === newApt.doctorId) || doctors[0];
    const created: Appointment = {
      id: `apt-${Date.now()}`,
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialty,
      doctorImage: doc.image,
      date: newApt.date,
      time: newApt.time,
      type: newApt.type,
      status: 'Upcoming',
      patientName: newApt.patientName,
      patientPhone: newApt.patientPhone || '+91 93193 98632',
      reason: newApt.reason,
      roomOrLink: `${doc.department} Room ${Math.floor(100 + Math.random() * 300)}`,
      createdAt: new Date().toISOString(),
    };
    setAppointments(prev => [created, ...prev]);
    setShowAddAppointmentModal(false);
  };

  const handleToggleDoctorStatus = (docId: string) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === docId) {
        const nextStatus = d.status === 'Available Today' ? 'In Consultation' : d.status === 'In Consultation' ? 'Available Tomorrow' : 'Available Today';
        return {
          ...d,
          status: nextStatus as Doctor['status'],
          availableToday: nextStatus === 'Available Today',
        };
      }
      return d;
    }));
  };

  const handleUpdateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const handleToggleSalaryStatus = (salId: string) => {
    setSalaries(prev => prev.map(s => {
      if (s.id === salId) {
        return {
          ...s,
          status: s.status === 'Paid' ? 'Pending' : 'Paid',
          paymentDate: s.status === 'Paid' ? 'Pending Disbursal' : 'Oct 01, 2026',
        };
      }
      return s;
    }));
  };

  const handleDeletePatient = (patientId: string) => {
    if (confirm('Are you sure you want to delete this patient record?')) {
      setPatients(prev => prev.filter(p => p.patientId !== patientId));
    }
  };

  const handleExportData = () => {
    const dataReport = {
      hospital: HOSPITAL_INFO,
      generatedAt: new Date().toISOString(),
      summary: {
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        totalSalariesINR: totalSalaries,
        totalExpensesINR: totalExpenses,
        netOperatingMarginINR: netOperatingMargin,
        totalBeds: totalBeds,
        occupiedBeds: occupiedBeds,
      },
      patients,
      doctors,
      appointments,
      expenses,
      salaries,
    };
    const blob = new Blob([JSON.stringify(dataReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SGT_Hospital_Admin_Report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 py-8 space-y-8">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0878E8] hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Patient Portal</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
                {t('adminDashboard')}
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {HOSPITAL_INFO.legalName} • Budhera Campus, Gurugram
              </p>
            </div>
          </div>
        </div>

        {/* Global Admin Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportData}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            title="Download full hospital data audit"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Hospital Audit</span>
          </button>

          <button
            onClick={() => setShowAddPatientModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Patient</span>
          </button>

          <button
            onClick={() => setShowAddDoctorModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Doctor</span>
          </button>

          <button
            onClick={() => setShowAddExpenseModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Expense</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Admin Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {[
          { id: 'overview', label: t('hospitalOverview'), icon: Activity, count: null },
          { id: 'patients', label: t('managePatients'), icon: Users, count: patients.length },
          { id: 'appointments', label: t('manageAppointments'), icon: Calendar, count: appointments.length },
          { id: 'doctors', label: t('manageDoctors'), icon: Stethoscope, count: doctors.length },
          { id: 'salaries', label: t('manageSalaries'), icon: DollarSign, count: `₹${(totalSalaries / 100000).toFixed(1)}L` },
          { id: 'expenses', label: t('manageExpenses'), icon: Receipt, count: `₹${(totalExpenses / 100000).toFixed(1)}L` },
          { id: 'departments', label: 'Departments & Beds', icon: Building2, count: departments.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#102A43] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & KEY KPI METRICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">{t('totalPatients')}</span>
                <div className="p-2 rounded-xl bg-blue-50 text-[#0878E8]">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#102A43]">{patients.length}</span>
                <span className="text-xs text-emerald-600 font-bold flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14% this month
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Registered active OPD & IPD patient files</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">{t('totalDoctors')}</span>
                <div className="p-2 rounded-xl bg-cyan-50 text-[#16B8C4]">
                  <Stethoscope className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#102A43]">{doctors.length}</span>
                <span className="text-xs text-blue-600 font-bold">14 Specialties</span>
              </div>
              <p className="text-[11px] text-slate-400">Board-certified senior faculty & consultants</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Bed Occupancy</span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <Bed className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#102A43]">{occupiedBeds} / {totalBeds}</span>
                <span className="text-xs text-emerald-600 font-bold">78% Full</span>
              </div>
              <p className="text-[11px] text-slate-400">Across 14 specialized wards & ICU beds</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">Est. Net Margin</span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#102A43]">₹{(netOperatingMargin / 100000).toFixed(1)}L</span>
                <span className="text-xs text-emerald-600 font-bold flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> Healthy
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Revenue minus Staff Salaries & OpEx</p>
            </div>

          </div>

          {/* Financial Balance Summary Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#102A43]">
                    Monthly Financial Outflow & Balance Breakdown
                  </h3>
                  <p className="text-xs text-slate-500">
                    Staff Payroll (₹{(totalSalaries / 100000).toFixed(2)}L) + Operating Expenses (₹{(totalExpenses / 100000).toFixed(2)}L)
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0878E8] text-xs font-bold">
                  FY 2026-27 Active
                </span>
              </div>

              {/* Progress bars */}
              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Clinical Staff Salaries ({salaries.length} Employees)</span>
                    <span>₹{totalSalaries.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0878E8] rounded-full" style={{ width: '72%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Biomedical Equipment & Facility Maintenance</span>
                    <span>₹{expenses.filter(e => e.category === 'Equipment & Maintenance').reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Oxygen, Reagents, Pharmacy & Fleet Fuel</span>
                    <span>₹{expenses.filter(e => e.category !== 'Equipment & Maintenance').reduce((a, b) => a + b.amount, 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total OpEx</span>
                  <span className="text-sm font-extrabold text-[#102A43]">₹{totalExpenses.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Salaries Disbursed</span>
                  <span className="text-sm font-extrabold text-emerald-800">₹{totalPaidSalaries.toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl">
                  <span className="text-[10px] uppercase font-bold text-amber-600 block">Pending Clearance</span>
                  <span className="text-sm font-extrabold text-amber-800">₹{totalPendingSalaries.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Quick SGT Hospital Facility Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#102A43] to-[#1c3f60] text-white space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <Building className="w-8 h-8 text-[#16B8C4]" />
                <div>
                  <h4 className="text-base font-bold text-white">SGT Hospital Infrastructure</h4>
                  <p className="text-xs text-blue-200">Gurugram-Badli Road, Budhera</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200 pt-2 border-t border-slate-700/60">
                <div className="flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span className="text-slate-400">Emergency & Level 1 Trauma:</span>
                  <span className="font-bold text-emerald-400">24/7 Fully Operational</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span className="text-slate-400">NABH & NABL Accreditation:</span>
                  <span className="font-bold text-white">Verified Active</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span className="text-slate-400">Liquid Oxygen Tank (LMO):</span>
                  <span className="font-bold text-cyan-300">92% Capacity</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-700/40">
                  <span className="text-slate-400">GPS Ambulance Fleet:</span>
                  <span className="font-bold text-white">8 Vehicles Active</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Central Helpline:</span>
                  <span className="font-bold text-amber-300">+91-124-2278187</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('appointments')}
                className="w-full py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>View Today’s Appointments ({appointments.filter(a => a.status === 'Upcoming').length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: PATIENTS MANAGEMENT */}
      {activeTab === 'patients' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient name, ID, phone..."
                value={patientSearch}
                onChange={e => setPatientSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#102A43] focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30"
              />
            </div>

            <button
              onClick={() => setShowAddPatientModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Patient</span>
            </button>
          </div>

          {/* Patients Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Patient ID & Name</th>
                    <th className="py-3 px-4">Age / Gender</th>
                    <th className="py-3 px-4">Blood Group</th>
                    <th className="py-3 px-4">Contact Phone</th>
                    <th className="py-3 px-4">Insurance / Scheme</th>
                    <th className="py-3 px-4">Allergies</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patients
                    .filter(p => 
                      p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                      p.patientId.toLowerCase().includes(patientSearch.toLowerCase()) ||
                      p.phone.includes(patientSearch)
                    )
                    .map(patient => (
                      <tr key={patient.patientId} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={patient.avatarUrl}
                              alt={patient.name}
                              className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200"
                            />
                            <div>
                              <span className="font-bold text-[#102A43] block">{patient.name}</span>
                              <span className="text-[10px] font-mono text-[#0878E8]">{patient.patientId}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {patient.age} yrs • {patient.gender}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                            {patient.bloodGroup}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">
                          {patient.phone}
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 max-w-xs truncate">
                          {patient.insuranceProvider}
                        </td>
                        <td className="py-3.5 px-4">
                          {patient.allergies.length > 0 && patient.allergies[0] !== 'None' ? (
                            <span className="text-amber-700 font-semibold">{patient.allergies.join(', ')}</span>
                          ) : (
                            <span className="text-slate-400">Nil</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setViewPatientDetails(patient)}
                              className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0878E8] transition-colors"
                              title="View Patient Record"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePatient(patient.patientId)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                              title="Delete Patient Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: APPOINTMENTS MANAGEMENT */}
      {activeTab === 'appointments' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by patient, doctor, or specialty..."
                value={appointmentSearch}
                onChange={e => setAppointmentSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#102A43] focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30"
              />
            </div>

            <button
              onClick={() => setShowAddAppointmentModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment From Admin</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Doctor & Specialty</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Consultation Mode</th>
                    <th className="py-3 px-4">Reason / Notes</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments
                    .filter(a =>
                      a.patientName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
                      a.doctorName.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
                      a.doctorSpecialty.toLowerCase().includes(appointmentSearch.toLowerCase())
                    )
                    .map(apt => (
                      <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#102A43] block">{apt.patientName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{apt.patientPhone}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#102A43] block">{apt.doctorName}</span>
                          <span className="text-[10px] text-[#0878E8] font-medium">{apt.doctorSpecialty}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          {apt.date} • {apt.time}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            apt.type === 'Video consultation'
                              ? 'bg-teal-50 text-[#16B8C4] border-teal-200'
                              : 'bg-blue-50 text-[#0878E8] border-blue-200'
                          }`}>
                            {apt.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                          {apt.reason}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            apt.status === 'Upcoming'
                              ? 'bg-amber-100 text-amber-800'
                              : apt.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {apt.status === 'Upcoming' && (
                              <>
                                <button
                                  onClick={() => handleUpdateAppointmentStatus(apt.id, 'Completed')}
                                  className="px-2 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[10px] transition-colors"
                                  title="Mark as Completed"
                                >
                                  Complete
                                </button>
                                <button
                                  onClick={() => handleUpdateAppointmentStatus(apt.id, 'Cancelled')}
                                  className="px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] transition-colors"
                                  title="Cancel Appointment"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {apt.status === 'Cancelled' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(apt.id, 'Upcoming')}
                                className="px-2 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0878E8] font-bold text-[10px] transition-colors"
                              >
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: DOCTORS & STAFF MANAGEMENT */}
      {activeTab === 'doctors' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search doctor by name, department, or specialty..."
                value={doctorSearch}
                onChange={e => setDoctorSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#102A43] focus:outline-hidden focus:ring-2 focus:ring-[#0878E8]/30"
              />
            </div>

            <button
              onClick={() => setShowAddDoctorModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0769cc] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Add Doctor to Staff</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors
              .filter(d =>
                d.name.toLowerCase().includes(doctorSearch.toLowerCase()) ||
                d.department.toLowerCase().includes(doctorSearch.toLowerCase()) ||
                d.specialty.toLowerCase().includes(doctorSearch.toLowerCase())
              )
              .map(doc => (
                <div
                  key={doc.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-blue-200 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-slate-400">{doc.employeeId || 'DOC-SGT'}</span>
                        <span className="text-[10px] font-bold text-amber-500">★ {doc.rating}</span>
                      </div>
                      <h4 className="text-sm font-extrabold text-[#102A43] truncate">{doc.name}</h4>
                      <p className="text-xs font-bold text-[#0878E8] truncate">{doc.specialty}</p>
                      <p className="text-[11px] text-slate-500 truncate">{doc.department}</p>
                    </div>
                  </div>

                  <div className="text-[11px] space-y-1.5 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Experience:</span>
                      <span className="font-semibold text-slate-700">{doc.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Consultation Fee:</span>
                      <span className="font-semibold text-emerald-700">${doc.consultationFee} (₹{doc.consultationFee * 80})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Monthly Compensation:</span>
                      <span className="font-semibold text-purple-700">₹{(doc.monthlySalary || 240000).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Consultations:</span>
                      <span className="font-semibold text-[#102A43]">{doc.totalConsultations || 1200}+</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleToggleDoctorStatus(doc.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        doc.status === 'Available Today'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : doc.status === 'In Consultation'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Click to cycle status"
                    >
                      ● {doc.status}
                    </button>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {doc.teleconsultationAvailable ? 'Video Enabled' : 'In-Person Only'}
                    </span>
                  </div>
                </div>
              ))}
          </div>

        </div>
      )}

      {/* TAB 5: STAFF SALARIES & PAYROLL */}
      {activeTab === 'salaries' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Payroll Summary Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase">Total Monthly Payroll</span>
              <div className="text-2xl font-extrabold text-[#102A43] mt-1">₹{totalSalaries.toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-slate-500 font-medium">{salaries.length} Total medical staff records</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
              <span className="text-xs font-bold text-emerald-700 uppercase">Paid Out This Month</span>
              <div className="text-2xl font-extrabold text-emerald-900 mt-1">₹{totalPaidSalaries.toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-emerald-700 font-medium">Transferred via RTGS / Corporate Payroll</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
              <span className="text-xs font-bold text-amber-700 uppercase">Pending Disbursal</span>
              <div className="text-2xl font-extrabold text-amber-900 mt-1">₹{totalPendingSalaries.toLocaleString('en-IN')}</div>
              <span className="text-[11px] text-amber-700 font-medium">Awaiting monthly attendance sign-off</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Employee ID & Name</th>
                    <th className="py-3 px-4">Role & Department</th>
                    <th className="py-3 px-4">Base Salary</th>
                    <th className="py-3 px-4">Allowances</th>
                    <th className="py-3 px-4">Deductions</th>
                    <th className="py-3 px-4 font-bold text-[#102A43]">Net Pay (INR)</th>
                    <th className="py-3 px-4">Bank Account</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {salaries.map(sal => (
                    <tr key={sal.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-[#102A43] block">{sal.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{sal.employeeId}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-800 block">{sal.role}</span>
                        <span className="text-[10px] text-slate-500">{sal.department}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        ₹{sal.baseSalary.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-emerald-600">
                        +₹{sal.allowances.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-rose-600">
                        -₹{sal.deductions.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-extrabold text-[#102A43] text-sm">
                        ₹{sal.netSalary.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {sal.bankAccount}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          sal.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {sal.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleSalaryStatus(sal.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                            sal.status === 'Paid'
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700'
                          }`}
                        >
                          {sal.status === 'Paid' ? 'Revert Pending' : 'Pay Now'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: HOSPITAL OPERATIONAL EXPENSES */}
      {activeTab === 'expenses' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-500 mr-2">Category:</span>
              {['All', 'Equipment & Maintenance', 'Medical Supplies & Reagents', 'Pharmaceuticals', 'Ambulance & Logistics', 'Utilities & Facility'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setExpenseCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    expenseCategoryFilter === cat
                      ? 'bg-[#102A43] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Log Hospital Expense</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Expense Voucher</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Amount (INR)</th>
                    <th className="py-3 px-4">Vendor / Payee</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Approved By</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses
                    .filter(e => expenseCategoryFilter === 'All' || e.category === expenseCategoryFilter)
                    .map(exp => (
                      <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#102A43] block">{exp.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{exp.id} • {exp.date}</span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                            {exp.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-extrabold text-[#102A43] text-sm">
                          ₹{exp.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {exp.vendor}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {exp.paymentMethod}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {exp.approvedBy}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {exp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 7: HOSPITAL DEPARTMENTS & BEDS */}
      {activeTab === 'departments' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map(dept => (
              <div
                key={dept.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-extrabold text-[#102A43]">{dept.name}</h4>
                    <p className="text-xs text-[#0878E8] font-bold mt-0.5">HOD: {dept.headDoctor}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    dept.emergencyAvailable ? 'bg-red-50 text-[#E53945] border border-red-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {dept.emergencyAvailable ? '24/7 Trauma' : 'OPD Service'}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {dept.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Active Beds</span>
                    <span className="font-extrabold text-[#102A43] text-sm">{dept.activeBeds} Beds</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Faculty Doctors</span>
                    <span className="font-extrabold text-[#102A43] text-sm">{dept.doctorsCount} Specialists</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 font-medium">
                  Location: <span className="text-slate-700 font-bold">{dept.roomNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD PATIENT */}
      {showAddPatientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#102A43]">Register New Patient File</h3>
              <button onClick={() => setShowAddPatientModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newPatient.name}
                  onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={newPatient.age}
                    onChange={e => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Gender</label>
                  <select
                    value={newPatient.gender}
                    onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Blood Group</label>
                  <select
                    value={newPatient.bloodGroup}
                    onChange={e => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newPatient.phone}
                    onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={newPatient.email}
                    onChange={e => setNewPatient({ ...newPatient, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Residential Address</label>
                <input
                  type="text"
                  value={newPatient.address}
                  onChange={e => setNewPatient({ ...newPatient, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Known Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin, Peanuts"
                    value={newPatient.allergies}
                    onChange={e => setNewPatient({ ...newPatient, allergies: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Insurance / Scheme</label>
                  <input
                    type="text"
                    value={newPatient.insurance}
                    onChange={e => setNewPatient({ ...newPatient, insurance: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPatientModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs"
                >
                  Save Patient Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DOCTOR */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#102A43]">Add Doctor to Hospital Staff</h3>
              <button onClick={() => setShowAddDoctorModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateDoctor} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Doctor Name (with title) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Goyal"
                  value={newDoctor.name}
                  onChange={e => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specialty</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cardiologist"
                    value={newDoctor.specialty}
                    onChange={e => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={newDoctor.department}
                    onChange={e => setNewDoctor({ ...newDoctor, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MD, DM"
                    value={newDoctor.qualifications}
                    onChange={e => setNewDoctor({ ...newDoctor, qualifications: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 12+ years"
                    value={newDoctor.experience}
                    onChange={e => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Consultation Fee ($)</label>
                  <input
                    type="number"
                    value={newDoctor.consultationFee}
                    onChange={e => setNewDoctor({ ...newDoctor, consultationFee: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Salary (INR)</label>
                  <input
                    type="number"
                    value={newDoctor.monthlySalary}
                    onChange={e => setNewDoctor({ ...newDoctor, monthlySalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Doctor Profile Photo URL</label>
                <input
                  type="text"
                  value={newDoctor.image}
                  onChange={e => setNewDoctor({ ...newDoctor, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddDoctorModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0878E8] text-white font-bold hover:bg-[#0769cc] shadow-xs"
                >
                  Save & Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD EXPENSE */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#102A43]">Log Hospital Operational Expense</h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Expense Voucher Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ICU Central Oxygen Cylinder Refill"
                  value={newExpense.title}
                  onChange={e => setNewExpense({ ...newExpense, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={e => setNewExpense({ ...newExpense, category: e.target.value as HospitalExpense['category'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Medical Supplies & Reagents</option>
                    <option>Equipment & Maintenance</option>
                    <option>Utilities & Facility</option>
                    <option>Pharmaceuticals</option>
                    <option>Ambulance & Logistics</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    value={newExpense.amount}
                    onChange={e => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Vendor / Payee Name</label>
                <input
                  type="text"
                  placeholder="e.g. Linde India Medical Gases"
                  value={newExpense.vendor}
                  onChange={e => setNewExpense({ ...newExpense, vendor: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Method</label>
                  <select
                    value={newExpense.paymentMethod}
                    onChange={e => setNewExpense({ ...newExpense, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Direct Bank Wire (NEFT)</option>
                    <option>Corporate Card</option>
                    <option>Cheque / Net Banking</option>
                    <option>Fleet Card</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Approving Authority</label>
                  <input
                    type="text"
                    value={newExpense.approvedBy}
                    onChange={e => setNewExpense({ ...newExpense, approvedBy: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-xs"
                >
                  Record Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD APPOINTMENT */}
      {showAddAppointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-[#102A43]">Schedule OPD / Virtual Appointment</h3>
              <button onClick={() => setShowAddAppointmentModal(false)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Harshit Jakhar"
                  value={newApt.patientName}
                  onChange={e => setNewApt({ ...newApt, patientName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Patient Phone *</label>
                <input
                  type="text"
                  required
                  placeholder="+91 93193 98632"
                  value={newApt.patientPhone}
                  onChange={e => setNewApt({ ...newApt, patientPhone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Doctor</label>
                <select
                  value={newApt.doctorId}
                  onChange={e => setNewApt({ ...newApt, doctorId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date & Time</label>
                  <input
                    type="text"
                    value={newApt.date}
                    onChange={e => setNewApt({ ...newApt, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Consultation Mode</label>
                  <select
                    value={newApt.type}
                    onChange={e => setNewApt({ ...newApt, type: e.target.value as Appointment['type'] })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>In-person</option>
                    <option>Video consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={newApt.reason}
                  onChange={e => setNewApt({ ...newApt, reason: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAppointmentModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0878E8] text-white font-bold hover:bg-[#0769cc] shadow-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW PATIENT DETAILS MODAL */}
      {viewPatientDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={viewPatientDetails.avatarUrl}
                  alt={viewPatientDetails.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-blue-100"
                />
                <div>
                  <h3 className="text-base font-extrabold text-[#102A43]">{viewPatientDetails.name}</h3>
                  <span className="text-xs font-mono text-[#0878E8] font-bold">{viewPatientDetails.patientId}</span>
                </div>
              </div>
              <button onClick={() => setViewPatientDetails(null)} className="p-1 rounded-lg hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Age / Gender:</span>
                <span className="font-bold text-slate-800">{viewPatientDetails.age} yrs • {viewPatientDetails.gender}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-bold text-rose-600">{viewPatientDetails.bloodGroup}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Phone:</span>
                <span className="font-mono text-slate-800 font-bold">{viewPatientDetails.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Email:</span>
                <span className="text-slate-800 font-medium">{viewPatientDetails.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="text-slate-800 font-bold">{viewPatientDetails.emergencyContact.name} ({viewPatientDetails.emergencyContact.phone})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400">Insurance Policy:</span>
                <span className="text-slate-800 font-medium">{viewPatientDetails.insuranceProvider} ({viewPatientDetails.insurancePolicyNumber})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Registered Address:</span>
                <span className="text-slate-800 font-medium text-right max-w-xs">{viewPatientDetails.address}</span>
              </div>
            </div>

            <button
              onClick={() => setViewPatientDetails(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              Close Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
