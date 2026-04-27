import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './app/page';
import LoginRegister from './pages/auth/LoginRegister';
import Onboarding from './pages/onboarding/Onboarding';
import PatientDashboard from './pages/patient/Dashboard';
import PatientAssessments from './pages/patient/Assessments';
import { 
  PatientTests, PatientReports, PatientInstructions, 
  PatientFollowups, PatientSettings, MedicalHistory,
  PatientNotifications,
  DoctorActiveCases, DoctorCompleted, DoctorPatients,
  DoctorAnalytics, DoctorSettings
} from './pages/app/Shells';
import DoctorQueue from './pages/doctor/Queue';
import DoctorCaseReview from './pages/doctor/CaseReview';
import PatientHistory from './pages/doctor/PatientHistory';

import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Router>
          <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth & Onboarding */}
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Patient Portal */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/assessments" element={<PatientAssessments />} />
          <Route path="/patient/tests" element={<PatientTests />} />
          <Route path="/patient/reports" element={<PatientReports />} />
          <Route path="/patient/history" element={<MedicalHistory />} />
          <Route path="/patient/instructions" element={<PatientInstructions />} />
          <Route path="/patient/followups" element={<PatientFollowups />} />
          <Route path="/patient/settings" element={<PatientSettings />} />
          <Route path="/patient/notifications" element={<PatientNotifications />} />
          
          {/* Doctor Portal */}
          <Route path="/doctor/dashboard" element={<DoctorQueue />} />
          <Route path="/doctor/queue" element={<DoctorQueue />} />
          <Route path="/doctor/cases" element={<DoctorActiveCases />} />
          <Route path="/doctor/cases/:id" element={<DoctorCaseReview />} />
          <Route path="/doctor/completed" element={<DoctorCompleted />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/patients/:id" element={<PatientHistory />} />
          <Route path="/doctor/analytics" element={<DoctorAnalytics />} />
          <Route path="/doctor/settings" element={<DoctorSettings />} />
          
          {/* Redirects */}
          <Route path="/patient" element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="/doctor" element={<Navigate to="/doctor/dashboard" replace />} />
        </Routes>
        </Router>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
