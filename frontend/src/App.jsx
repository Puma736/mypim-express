import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingHero from './components/LandingHero';
import Dashboard from './components/Dashboard';
import LegalRouteModule from './components/LegalRouteModule';
import CostCalculatorModule from './components/CostCalculatorModule';
import AcademyModule from './components/AcademyModule';
import InciLabelGenerator from './components/InciLabelGenerator';
import BrandProfileModal from './components/BrandProfileModal';
import AuthModal from './components/AuthModal';
import AdvisoryModal from './components/AdvisoryModal';
import { PRESET_FORMULAS } from './utils/costingEngine';
import { LEGAL_STEPS } from './utils/legalData';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

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

  // Brand Profile State - Inicia Limpio desde cero
  const [brandProfile, setBrandProfile] = useState(() => {
    const saved = localStorage.getItem('mypim_brand_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      founder: '',
      city: 'Santa Cruz de la Sierra',
      subsector: 'SR-01 Cosmética Natural',
      phone: '',
      email: ''
    };
  });

  // Saved Formulas State - Inicia Vacío desde cero
  const [savedFormulas, setSavedFormulas] = useState(() => {
    const saved = localStorage.getItem('mypim_saved_formulas');
    return saved ? JSON.parse(saved) : [];
  });

  // Legal Checklist Completed Steps - Inicia Vacío desde cero (0%)
  const [completedStepIds, setCompletedStepIds] = useState(() => {
    const saved = localStorage.getItem('mypim_legal_checklist');
    return saved ? JSON.parse(saved) : [];
  });

  // Active City & Subsector in Legal Route
  const [selectedCity, setSelectedCity] = useState('scz');
  const [selectedSubsector, setSelectedSubsector] = useState('SR-01');

  // Currently loaded formula in calculator
  const [loadedFormula, setLoadedFormula] = useState(null);

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
    localStorage.setItem('mypim_saved_formulas', JSON.stringify(savedFormulas));
  }, [savedFormulas]);

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

  const handleSaveFormula = async (formulaData) => {
    const existsIndex = savedFormulas.findIndex(f => f.id === formulaData.id);
    let updated;
    if (existsIndex >= 0) {
      updated = [...savedFormulas];
      updated[existsIndex] = formulaData;
    } else {
      updated = [formulaData, ...savedFormulas];
    }
    setSavedFormulas(updated);

    try {
      await fetch('http://localhost:5000/api/costing/formulas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formulaData)
      });
    } catch (e) {
      // Quiet fail if server offline
    }
  };

  const handleLoadFormulaToCalculator = (formula) => {
    setLoadedFormula(formula);
    setActiveTab('calculator');
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
    <div className="min-h-screen flex flex-col justify-between bg-[#FDFBF7] text-[#1F2937]">
      
      {/* Top Navbar */}
      <Header
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
          <LandingHero
            onStartCalculator={() => setActiveTab('calculator')}
            onStartLegal={() => setActiveTab('legal')}
            onStartAcademy={() => setActiveTab('academy')}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            brandProfile={brandProfile}
            completedSteps={completedStepIds.length}
            totalSteps={totalLegalChecklist}
            formalizationPercentage={formalizationPercentage}
            savedFormulas={savedFormulas}
            onNavigate={(tab) => setActiveTab(tab)}
            onLoadFormula={handleLoadFormulaToCalculator}
            onOpenProfile={() => setShowProfileModal(true)}
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

        {activeTab === 'calculator' && (
          <CostCalculatorModule
            onSaveFormula={handleSaveFormula}
            loadedFormula={loadedFormula}
          />
        )}

        {activeTab === 'academy' && (
          <AcademyModule />
        )}
      </main>

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
      <footer className="bg-charcoal-900 text-slate-400 py-8 border-t border-slate-800 text-xs no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white font-bold">
            <div className="w-6 h-6 rounded-lg bg-sage-500 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span>MY PIM EXPRESS — Cosmetics & Beauty Edition</span>
          </div>

          <p className="text-center md:text-left text-slate-400">
            Hackatón <strong className="text-slate-200">HACKBIZ 2026</strong> — UAGRM (Santa Cruz, Bolivia). Enfoque de Triple Impacto.
          </p>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Desarrollado con</span>
            <Heart className="w-3.5 h-3.5 text-clay-500 fill-clay-500" />
            <span>para emprendedores bolivianos</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
