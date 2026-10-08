import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureCards } from '../components/FeatureCards';
import { DailyHealthTip } from '../components/DailyHealthTip';
import { BookAppointmentSection } from '../components/BookAppointmentSection';
import { HealthOverview } from '../components/HealthOverview';
import { AICopilot } from '../components/AICopilot';
import { PatientProfileCard } from '../components/PatientProfileCard';
import { RecentMetricsCard } from '../components/RecentMetricsCard';
import { EmergencyCard } from '../components/EmergencyCard';
import { Doctor, PatientProfile } from '../types';

interface HomeProps {
  doctors: Doctor[];
  patient: PatientProfile;
  onNavigate: (page: string) => void;
  onSelectDoctorToBook: (doctor: Doctor) => void;
  onStartTeleconsult: (doctor: Doctor) => void;
  onViewFullReport: () => void;
  onCallEmergency: () => void;
  onEditProfile: () => void;
  onOpenBookingModal: () => void;
  copilotQuery: string;
  onAskCopilot: (q: string) => void;
  onClearCopilotQuery: () => void;
}

export const Home: React.FC<HomeProps> = ({
  doctors,
  patient,
  onNavigate,
  onSelectDoctorToBook,
  onStartTeleconsult,
  onViewFullReport,
  onCallEmergency,
  onEditProfile,
  onOpenBookingModal,
  copilotQuery,
  onAskCopilot,
  onClearCopilotQuery,
}) => {
  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Hero Section */}
      <Hero
        onBookAppointmentClick={onOpenBookingModal}
        onExploreServicesClick={() => onNavigate('doctors')}
        onAskCopilot={onAskCopilot}
        patientName={patient.name.split(' ')[0]}
      />

      {/* 2. Quick Feature Cards */}
      <FeatureCards
        onNavigate={onNavigate}
        onCallEmergency={onCallEmergency}
        onOpenBooking={onOpenBookingModal}
      />

      {/* 3. Daily Health Tip (Evidence-Based Daily Update) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 pt-1">
        <DailyHealthTip onAskCopilot={onAskCopilot} />
      </div>

      {/* 4. Main Dashboard: Three-Column Layout matching reference image */}
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN (4 cols on lg): Book an Appointment */}
          <div className="lg:col-span-4 space-y-6">
            <BookAppointmentSection
              doctors={doctors}
              onSelectDoctorToBook={onSelectDoctorToBook}
              onViewAllDoctors={() => onNavigate('doctors')}
              onStartTeleconsult={onStartTeleconsult}
            />
          </div>

          {/* CENTER COLUMN (5 cols on lg): Health Overview + AI Health Copilot */}
          <div className="lg:col-span-5 space-y-6">
            <HealthOverview
              onViewFullReport={onViewFullReport}
              patientName={patient.name.split(' ')[0]}
            />

            <AICopilot
              patientName={patient.name.split(' ')[0]}
              onNavigateToRecords={() => onNavigate('records')}
              onNavigateToMedicines={() => onNavigate('medicines')}
              onCallEmergency={onCallEmergency}
              externalQuery={copilotQuery}
              onClearExternalQuery={onClearCopilotQuery}
            />
          </div>

          {/* RIGHT COLUMN (3 cols on lg): Patient Profile + Recent Health Metrics + Emergency */}
          <div className="lg:col-span-3 space-y-6">
            <PatientProfileCard
              patient={patient}
              onEditProfile={onEditProfile}
            />

            <RecentMetricsCard
              onViewAll={onViewFullReport}
            />

            <EmergencyCard
              onCallEmergency={onCallEmergency}
            />
          </div>

        </div>
      </div>

    </div>
  );
};
