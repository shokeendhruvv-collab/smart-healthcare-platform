export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  rating: number;
  reviewCount: number;
  experience: string;
  status: 'Available Today' | 'Available Tomorrow' | 'In Consultation' | 'Next Available: Monday';
  availableToday: boolean;
  teleconsultationAvailable: boolean;
  consultationFee: number;
  image: string;
  qualifications: string;
  languages: string[];
  bio: string;
  availableSlots: string[];
  availableDates: string[];
  monthlySalary?: number;
  designation?: string;
  totalConsultations?: number;
  employeeId?: string;
}

export interface HospitalExpense {
  id: string;
  title: string;
  category: 'Medical Supplies & Reagents' | 'Equipment & Maintenance' | 'Utilities & Facility' | 'Pharmaceuticals' | 'Ambulance & Logistics';
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Approved';
  vendor: string;
  paymentMethod: string;
  approvedBy: string;
}

export interface StaffSalary {
  id: string;
  employeeId: string;
  name: string;
  role: 'Senior Consultant' | 'Specialist Doctor' | 'Head Nurse' | 'Lab Director' | 'Radiology Tech' | 'Pharmacist' | 'Admin Executive';
  department: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Processing' | 'Pending';
  paymentDate: string;
  bankAccount: string;
}

export interface HospitalDepartment {
  id: string;
  name: string;
  headDoctor: string;
  doctorsCount: number;
  activeBeds: number;
  roomNumber: string;
  emergencyAvailable: boolean;
  description: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  date: string;
  time: string;
  type: 'In-person' | 'Video consultation';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  patientName: string;
  patientPhone: string;
  reason: string;
  roomOrLink?: string;
  createdAt: string;
}

export interface PatientProfile {
  name: string;
  patientId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  address: string;
  allergies: string[];
  insuranceProvider: string;
  insurancePolicyNumber: string;
  avatarUrl: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  status: 'Normal' | 'Good' | 'Attention' | 'Warning';
  statusColor: string;
  icon: string;
  bgColor: string;
  trend: string;
  trendPositive: boolean;
  history: { date: string; value: number }[];
}

export interface MedicalRecord {
  id: string;
  title: string;
  category: 'Lab Report' | 'Imaging' | 'Prescription' | 'Clinical Notes' | 'Discharge Summary';
  doctor: string;
  hospital: string;
  date: string;
  status: 'Verified' | 'Pending Review' | 'Final';
  fileSize: string;
  summary: string;
  details?: {
    testName: string;
    result: string;
    normalRange: string;
    flag?: 'Normal' | 'High' | 'Low';
  }[];
  aiAnalysis?: {
    summary: string;
    precautions: string[];
    importantDetails: string[];
    doctorQuestions: string[];
    riskLevel: 'Low Risk' | 'Moderate Attention' | 'Needs Clinical Review';
    confidenceScore: number;
    analyzedAt: string;
  };
  fileUrl?: string;
  fileName?: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: string;
  doctor: string;
  prescribedDate: string;
  nextRefill: string;
  remainingPills: number;
  totalPills: number;
  status: 'Active' | 'Completed' | 'Paused';
  instructions: string;
  sideEffects: string[];
  category: 'Cardiac' | 'Pain Relief' | 'Antibiotic' | 'Supplements' | 'Respiratory';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'record' | 'medication' | 'health';
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
  disclaimer?: boolean;
}
