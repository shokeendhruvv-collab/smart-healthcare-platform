/**
 * SGT Hospital — AI-Powered Healthcare Platform
 * Production healthcare website, patient dashboard & administration system
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicalRecordsPage } from './pages/MedicalRecordsPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { HealthToolsPage } from './pages/HealthToolsPage';
import { TeleconsultationPage } from './pages/TeleconsultationPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';

// Modals
import { AppointmentModal } from './components/AppointmentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { EditProfileModal } from './components/EditProfileModal';
import { HealthAnalyticsModal } from './components/HealthAnalyticsModal';
import { TeleconsultationModal } from './components/TeleconsultationModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { MedicineOrderModal } from './components/MedicineOrderModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationPanel } from './components/NotificationPanel';
import { UploadRecordModal } from './components/UploadRecordModal';
import { HospitalEmailModal } from './components/HospitalEmailModal';

// Data
import { 
  INITIAL_PATIENT, 
  INITIAL_ALL_PATIENTS,
  INITIAL_DOCTORS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_MEDICAL_RECORDS, 
  INITIAL_MEDICINES,
  INITIAL_EXPENSES,
  INITIAL_SALARIES,
  INITIAL_DEPARTMENTS,
  HOSPITAL_INFO
} from './data/initialData';
import { 
  Doctor, 
  Appointment, 
  PatientProfile, 
  MedicalRecord, 
  Medicine, 
  NotificationItem,
  HospitalExpense,
  StaffSalary,
  HospitalDepartment
} from './types';

function HospitalApp() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Core Data States (with LocalStorage persistence)
  const [patient, setPatient] = useState<PatientProfile>(() => {
    const saved = localStorage.getItem('sgt_patient');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_PATIENT;
  });

  const [allPatients, setAllPatients] = useState<PatientProfile[]>(() => {
    const saved = localStorage.getItem('sgt_all_patients');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_ALL_PATIENTS;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('sgt_doctors');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('sgt_appointments');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_APPOINTMENTS;
  });

  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('sgt_medical_records');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_MEDICAL_RECORDS;
  });

  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const saved = localStorage.getItem('sgt_medicines');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_MEDICINES;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('sgt_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [expenses, setExpenses] = useState<HospitalExpense[]>(() => {
    const saved = localStorage.getItem('sgt_expenses');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_EXPENSES;
  });

  const [salaries, setSalaries] = useState<StaffSalary[]>(() => {
    const saved = localStorage.getItem('sgt_salaries');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_SALARIES;
  });

  const [departments, setDepartments] = useState<HospitalDepartment[]>(() => {
    const saved = localStorage.getItem('sgt_departments');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_DEPARTMENTS;
  });

  // Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [healthAnalyticsModalOpen, setHealthAnalyticsModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [teleconsultDoctor, setTeleconsultDoctor] = useState<Doctor | null>(null);
  const [documentPreviewRecord, setDocumentPreviewRecord] = useState<MedicalRecord | null>(null);
  const [medicineOrderMed, setMedicineOrderMed] = useState<Medicine | null>(null);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  // Copilot external prompt state
  const [copilotQuery, setCopilotQuery] = useState('');

  // Persist patient updates
  useEffect(() => {
    localStorage.setItem('sgt_patient', JSON.stringify(patient));
    setAllPatients(prev => prev.map(p => p.patientId === patient.patientId ? patient : p));
  }, [patient]);

  useEffect(() => {
    localStorage.setItem('sgt_all_patients', JSON.stringify(allPatients));
  }, [allPatients]);

  useEffect(() => {
    localStorage.setItem('sgt_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('sgt_medical_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('sgt_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('sgt_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('sgt_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('sgt_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('sgt_salaries', JSON.stringify(salaries));
  }, [salaries]);

  useEffect(() => {
    localStorage.setItem('sgt_departments', JSON.stringify(departments));
  }, [departments]);

  // Global Keyboard Shortcuts (⌘K for Search, ESC for closing modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setBookingModalOpen(false);
        setEmergencyModalOpen(false);
        setEditProfileModalOpen(false);
        setHealthAnalyticsModalOpen(false);
        setTeleconsultDoctor(null);
        setDocumentPreviewRecord(null);
        setMedicineOrderMed(null);
        setSearchModalOpen(false);
        setNotificationsPanelOpen(false);
        setEmailModalOpen(false);
        setUploadModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleSelectDoctorToBook = (doctor: Doctor) => {
    setSelectedDoctorForBooking(doctor);
    setBookingModalOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    setSelectedDoctorForBooking(doctors[0]);
    setBookingModalOpen(true);
  };

  const handleConfirmAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);

    // Create a new notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Confirmed',
      message: `Your visit with ${newAppointment.doctorName} at SGT Hospital is confirmed for ${newAppointment.date} at ${newAppointment.time}.`,
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    const apt = appointments.find((a) => a.id === id);
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Cancelled' } : item))
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Cancelled',
      message: apt 
        ? `Your consultation with ${apt.doctorName} (${apt.date} at ${apt.time}) has been cancelled.`
        : 'Your scheduled appointment has been cancelled.',
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleRescheduleAppointment = (id: string) => {
    const apt = appointments.find((a) => a.id === id);
    if (apt) {
      const doc = doctors.find((d) => d.id === apt.doctorId) || doctors[0];
      setSelectedDoctorForBooking(doc);
      setBookingModalOpen(true);
    }
  };

  const handleStartTeleconsult = (doctor: Doctor) => {
    setTeleconsultDoctor(doctor);
  };

  const handleStartAppointmentVideoCall = (appointment: Appointment) => {
    const doc = doctors.find((d) => d.id === appointment.doctorId) || doctors[0];
    setTeleconsultDoctor(doc);
  };

  const handleSaveProfile = (updatedProfile: PatientProfile) => {
    setPatient(updatedProfile);
  };

  const handleMedicineOrderSuccess = (medId: string) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === medId
          ? {
              ...m,
              remainingPills: m.totalPills,
              status: 'Active',
              nextRefill: 'Nov 15, 2026',
            }
          : m
      )
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Prescription Refilled',
      message: `Refill order dispatched via SGT Hospital Pharmacy. Delivery scheduled today by 6 PM.`,
      timestamp: 'Just now',
      read: false,
      type: 'medication',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleRecordUploaded = (newRecord: MedicalRecord) => {
    setRecords((prev) => [newRecord, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Record AI Analyzed',
      message: `"${newRecord.title}" was analyzed by AI Copilot with clinical precautions and added to records.`,
      timestamp: 'Just now',
      read: false,
      type: 'record',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Notification actions
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Ask AI copilot helper
  const handleAskCopilot = (question: string) => {
    setCopilotQuery(question);
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
    setTimeout(() => {
      window.scrollTo({ top: 580, behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFC] text-[#102A43] w-full">
      
      {/* 1. TOP STICKY NAVIGATION */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        patient={patient}
        notifications={notifications}
        onOpenNotifications={() => setNotificationsPanelOpen(true)}
        onOpenEmail={() => setEmailModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenProfile={() => setEditProfileModalOpen(true)}
        onCallEmergency={() => setEmergencyModalOpen(true)}
      />

      {/* 2. DYNAMIC MAIN CONTENT - STRETCHED TO FULL WIDTH */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <Home
            doctors={doctors}
            patient={patient}
            onNavigate={setCurrentPage}
            onSelectDoctorToBook={handleSelectDoctorToBook}
            onStartTeleconsult={handleStartTeleconsult}
            onViewFullReport={() => setHealthAnalyticsModalOpen(true)}
            onCallEmergency={() => setEmergencyModalOpen(true)}
            onEditProfile={() => setEditProfileModalOpen(true)}
            onOpenBookingModal={handleOpenGeneralBooking}
            copilotQuery={copilotQuery}
            onAskCopilot={handleAskCopilot}
            onClearCopilotQuery={() => setCopilotQuery('')}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            doctors={doctors}
            onSelectDoctorToBook={handleSelectDoctorToBook}
            onStartTeleconsult={handleStartTeleconsult}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'appointments' && (
          <AppointmentsPage
            appointments={appointments}
            onOpenBookingModal={handleOpenGeneralBooking}
            onCancelAppointment={handleCancelAppointment}
            onRescheduleAppointment={handleRescheduleAppointment}
            onStartVideoCall={handleStartAppointmentVideoCall}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'records' && (
          <MedicalRecordsPage
            records={records}
            onViewRecord={(rec) => setDocumentPreviewRecord(rec)}
            onOpenUploadModal={() => setUploadModalOpen(true)}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'medicines' && (
          <MedicinesPage
            medicines={medicines}
            onOrderRefill={(med) => setMedicineOrderMed(med)}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'tools' && (
          <HealthToolsPage
            onBackToHome={() => setCurrentPage('home')}
            onAskCopilot={handleAskCopilot}
          />
        )}

        {currentPage === 'teleconsult' && (
          <TeleconsultationPage
            doctors={doctors}
            onStartConsultation={handleStartTeleconsult}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onBackToHome={() => setCurrentPage('home')}
            onBookAppointment={handleOpenGeneralBooking}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            patients={allPatients}
            setPatients={setAllPatients}
            doctors={doctors}
            setDoctors={setDoctors}
            appointments={appointments}
            setAppointments={setAppointments}
            expenses={expenses}
            setExpenses={setExpenses}
            salaries={salaries}
            setSalaries={setSalaries}
            departments={departments}
            setDepartments={setDepartments}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}
      </main>

      {/* 3. DARK NAVY FOOTER - STRETCHED TO FULL WIDTH */}
      <Footer
        onNavigate={setCurrentPage}
        onCallEmergency={() => setEmergencyModalOpen(true)}
        onOpenEmail={() => setEmailModalOpen(true)}
      />

      {/* 4. MODALS & OVERLAYS */}
      {/* Appointment Booking Modal */}
      {bookingModalOpen && (
        <AppointmentModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          doctor={selectedDoctorForBooking}
          patient={patient}
          onConfirmAppointment={handleConfirmAppointment}
        />
      )}

      {/* Emergency Assistance Modal */}
      {emergencyModalOpen && (
        <EmergencyModal
          isOpen={emergencyModalOpen}
          onClose={() => setEmergencyModalOpen(false)}
          patientName={patient.name}
          emergencyPhone={patient.emergencyContact.phone}
        />
      )}

      {/* Patient Profile Editing Modal */}
      {editProfileModalOpen && (
        <EditProfileModal
          isOpen={editProfileModalOpen}
          onClose={() => setEditProfileModalOpen(false)}
          patient={patient}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {/* Health Analytics Modal with interactive charts */}
      {healthAnalyticsModalOpen && (
        <HealthAnalyticsModal
          isOpen={healthAnalyticsModalOpen}
          onClose={() => setHealthAnalyticsModalOpen(false)}
          patientName={patient.name}
        />
      )}

      {/* Live Teleconsultation Video Room */}
      {teleconsultDoctor && (
        <TeleconsultationModal
          isOpen={!!teleconsultDoctor}
          onClose={() => setTeleconsultDoctor(null)}
          doctor={teleconsultDoctor}
          patientName={patient.name}
        />
      )}

      {/* Medical Document & Lab Report Preview Modal */}
      {documentPreviewRecord && (
        <DocumentPreviewModal
          isOpen={!!documentPreviewRecord}
          onClose={() => setDocumentPreviewRecord(null)}
          record={documentPreviewRecord}
          patient={patient}
        />
      )}

      {/* Medicine Prescription Refill Modal */}
      {medicineOrderMed && (
        <MedicineOrderModal
          isOpen={!!medicineOrderMed}
          onClose={() => setMedicineOrderMed(null)}
          medicine={medicineOrderMed}
          patient={patient}
          onOrderSuccess={handleMedicineOrderSuccess}
        />
      )}

      {/* Global Instant Search Modal */}
      {searchModalOpen && (
        <GlobalSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          doctors={doctors}
          records={records}
          medicines={medicines}
          onNavigate={setCurrentPage}
          onSelectDoctor={(doc) => {
            setSelectedDoctorForBooking(doc);
            setBookingModalOpen(true);
          }}
          onSelectRecord={(rec) => setDocumentPreviewRecord(rec)}
          onSelectMedicine={(med) => setMedicineOrderMed(med)}
          onAskCopilot={handleAskCopilot}
        />
      )}

      {/* Upload External Record with AI Analysis Modal */}
      {uploadModalOpen && (
        <UploadRecordModal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          patient={patient}
          onRecordUploaded={handleRecordUploaded}
          onAskCopilot={handleAskCopilot}
        />
      )}

      {/* Hospital Email & Patient Messages Modal */}
      {emailModalOpen && (
        <HospitalEmailModal
          isOpen={emailModalOpen}
          onClose={() => setEmailModalOpen(false)}
          patient={patient}
        />
      )}

      {/* Notifications Slide-over Panel */}
      {notificationsPanelOpen && (
        <NotificationPanel
          isOpen={notificationsPanelOpen}
          onClose={() => setNotificationsPanelOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
          onDeleteNotification={handleDeleteNotification}
          onNavigate={setCurrentPage}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <HospitalApp />
    </LanguageProvider>
  );
}
