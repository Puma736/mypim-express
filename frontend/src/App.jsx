import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsapp from './components/layout/FloatingWhatsapp';
import LandingHero from './components/LandingHero';
import FormalizationComparisonSection from './components/FormalizationComparisonSection';
import Dashboard from './components/Dashboard';
import OnboardingModule from './components/modules/onboarding/OnboardingModule';
import LegalRouteModule from './components/LegalRouteModule';
import AcademyModule from './components/AcademyModule';
import ImpactMetricsModule from './components/modules/impact/ImpactMetricsModule';
import InciLabelGenerator from './components/InciLabelGenerator';
import BrandProfileModal from './components/BrandProfileModal';
import AuthModal from './components/AuthModal';
import AdvisoryModal from './components/AdvisoryModal';
import { LEGAL_STEPS } from './utils/legalData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  
  // User Session State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mypim_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('mypim_token') || null;
  });

  // Brand Profile State
  const [brandProfile, setBrandProfile] = useState(() => {
    const saved = localStorage.getItem('mypim_brand_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      founder: '',
      city: 'Santa Cruz de la Sierra',
      subsector: 'SR-01',
      salesChannel: 'Mercado Popular La Ramada (Santa Cruz)',
      formalizationStage: 'Informal',
      phone: '',
      email: ''
    };
  });

  // Active City & Subsector in Legal Route
  const [selectedCity, setSelectedCity] = useState('scz');
  const [selectedSubsector, setSelectedSubsector] = useState('SR-01');

  // Legal Checklist Completed Steps
  const [completedStepIds, setCompletedStepIds] = useState(() => {
    const saved = localStorage.getItem('mypim_legal_checklist');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals
  const [showInciGenerator, setShowInciGenerator] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showAdvisoryModal, setShowAdvisoryModal] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('mypim_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mypim_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('mypim_token', token);
    } else {
      localStorage.removeItem('mypim_token');
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem('mypim_brand_profile', JSON.stringify(brandProfile));
  }, [brandProfile]);

  useEffect(() => {
    localStorage.setItem('mypim_legal_checklist', JSON.stringify(completedStepIds));
  }, [completedStepIds]);

  // Calculate Formalization Percentage
  let totalLegalChecklist = 0;
  LEGAL_STEPS.forEach(s => s.checklist.forEach(() => totalLegalChecklist++));
  const formalizationPercentage = totalLegalChecklist > 0
    ? Math.round((completedStepIds.length / totalLegalChecklist) * 100)
    : 0;

  // Handlers
  const handleToggleLegalStep = (stepId) => {
    if (completedStepIds.includes(stepId)) {
      setCompletedStepIds(completedStepIds.filter(id => id !== stepId));
    } else {
      setCompletedStepIds([...completedStepIds, stepId]);
    }
  };

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setBrandProfile(prev => ({
      ...prev,
      name: userData.brandName || prev.name,
      founder: userData.name || prev.founder,
      city: userData.city || prev.city,
      subsector: userData.subsector || prev.subsector
    }));
    setActiveTab('dashboard');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAFAF9] text-[#1C1917] font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        brandProfile={brandProfile}
        formalizationPercentage={formalizationPercentage}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenAuth={handleOpenAuth}
        onOpenAdvisory={() => setShowAdvisoryModal(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Tab View Controller */}
      <main className="flex-grow">
        {activeTab === 'landing' && (
          <>
            <LandingHero
              onStartLegal={() => setActiveTab('legal')}
              onStartAcademy={() => setActiveTab('academy')}
              onOpenAdvisory={() => setShowAdvisoryModal(true)}
            />
            <FormalizationComparisonSection
              onNavigateToLegal={() => setActiveTab('legal')}
              onOpenAdvisory={() => setShowAdvisoryModal(true)}
            />
          </>
        )}

        {activeTab === 'onboarding' && (
          <OnboardingModule
            brandProfile={brandProfile}
            onSaveProfile={(updated) => setBrandProfile(updated)}
            onFinishOnboarding={() => setActiveTab('legal')}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            brandProfile={brandProfile}
            completedSteps={completedStepIds.length}
            totalSteps={totalLegalChecklist}
            formalizationPercentage={formalizationPercentage}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenProfile={() => setShowProfileModal(true)}
            onOpenAdvisory={() => setShowAdvisoryModal(true)}
          />
        )}

        {activeTab === 'legal' && (
          <LegalRouteModule
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedSubsector={selectedSubsector}
            setSelectedSubsector={setSelectedSubsector}
            completedStepIds={completedStepIds}
            onToggleStep={handleToggleLegalStep}
            onOpenInciGenerator={() => setShowInciGenerator(true)}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyModule />
        )}

        {activeTab === 'impact' && (
          <ImpactMetricsModule />
        )}
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsapp brandProfile={brandProfile} />

      {/* Modals */}
      {showInciGenerator && (
        <InciLabelGenerator
          brandProfile={brandProfile}
          onClose={() => setShowInciGenerator(false)}
        />
      )}

      {showProfileModal && (
        <BrandProfileModal
          brandProfile={brandProfile}
          onSave={(updated) => setBrandProfile(updated)}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showAuthModal && (
        <AuthModal
          initialMode={authMode}
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      {showAdvisoryModal && (
        <AdvisoryModal
          brandProfile={brandProfile}
          onClose={() => setShowAdvisoryModal(false)}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}
