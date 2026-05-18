import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FinancialProvider, useFinancial } from '@/context/FinancialContext';
import Splash from '@/pages/Splash';
import Introduction from '@/pages/Introduction';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import Budget from '@/pages/Budget';
import EmergencyFund from '@/pages/EmergencyFund';
import Investments from '@/pages/Investments';
import StepUpSIP from '@/pages/StepUpSIP';
import Goals from '@/pages/Goals';
import Tax from '@/pages/Tax';
import Insurance from '@/pages/Insurance';
import Layout from '@/components/Layout';

function AppRoutes() {
  const { isOnboardingComplete } = useFinancial();

  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/intro" element={<Introduction />} />
      <Route path="/onboarding" element={<Onboarding />} />
      
      {/* Protected Routes wrapped in Layout */}
      <Route 
        path="/dashboard" 
        element={isOnboardingComplete ? <Layout><Dashboard /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/budget" 
        element={isOnboardingComplete ? <Layout><Budget /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/emergency-fund" 
        element={isOnboardingComplete ? <Layout><EmergencyFund /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/goals" 
        element={isOnboardingComplete ? <Layout><Goals /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/investments" 
        element={isOnboardingComplete ? <Layout><Investments /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/step-up-sip" 
        element={isOnboardingComplete ? <Layout><StepUpSIP /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/tax" 
        element={isOnboardingComplete ? <Layout><Tax /></Layout> : <Navigate to="/onboarding" replace />} 
      />
      <Route 
        path="/insurance" 
        element={isOnboardingComplete ? <Layout><Insurance /></Layout> : <Navigate to="/onboarding" replace />} 
      />
    </Routes>
  );
}

export default function App() {
  return (
    <FinancialProvider>
      <Router>
        <AppRoutes />
      </Router>
    </FinancialProvider>
  );
}
