import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Building2, 
  Lock, 
  DollarSign, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  ChevronRight,
  FileCheck,
  Scale,
  Award,
  RefreshCw,
  X,
  PieChart
} from 'lucide-react';

export default function FormalizationComparisonSection({ onNavigateToLegal, onOpenAdvisory }) {
  // Active Tab for Mobile view ('benefits', 'solution', 'risks')
  const [mobileTab, setMobileTab] = useState('benefits');
  
  // Risk Diagnostic Modal state
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({
    formalStatus: '',
    salesTarget: '',
    riskFactor: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelectAnswer = (field, value) => {
    const updated = { ...answers, [field]: value };
    setAnswers(updated);
    if (quizStep < 3) {
      setQuizStep(quizStep + 1);
    } else {
      // Final step -> trigger brief evaluation loading
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
      }, 1000);
    }
  };

  const resetDiagnostic = () => {
    setQuizStep(1);
    setAnswers({ formalStatus: '', salesTarget: '', riskFactor: '' });
    setShowResult(false);
    setIsAnalyzing(false);
  };

  const calculateRiskLevel = () => {
    if (answers.formalStatus === 'informal' && answers.riskFactor === 'unregistered_brand') {
      return { level: 'Alto Riesgo', color: 'rose', score: 85, summary: 'Estás expuesto a pérdidas de marca en SENAPI y multas acumulativas en UFV por falta de registro fiscal.' };
    }
    if (answers.salesTarget === 'corporate') {
      return { level: 'Riesgo de Estancamiento Comercial', color: 'amber', score: 65, summary: 'Estás perdiendo contratos con empresas y licitaciones estatales por falta de respaldo fiscal.' };
    }
    return { level: 'Riesgo Moderado / Oportunidad de Crecimiento', color: 'emerald', score: 40, summary: 'Tu negocio tiene potencial. Formalizar con la ruta óptima (RTS o General) multiplicará tu capacidad crediticia.' };
  };

  return (
    <section id="formalizacion-verdad" className="py-16 sm:py-24 bg-gradient-to-b from-[#FAFAF9] via-white to-linen-50 relative overflow-hidden">
      
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* [ENCABEZADO DE LA SECCIÓN] */}
        {/* ========================================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Transparencia Fiscal & Realidad Emprendedora en Bolivia</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal-900 tracking-tight leading-tight">
            ¿Te conviene formalizar tu negocio en Bolivia? <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-clay-600">
              La verdad con números claros.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            No te formalices por obligación; hazlo solo si te hace ganar más dinero y protege tu inversión.
          </p>
        </div>


        {/* ========================================================================= */}
        {/* [SELECTOR DE PESTAÑAS INTERACTIVAS PARA PANTALLAS MÓVILES (< md)] */}
        {/* ========================================================================= */}
        <div className="md:hidden flex rounded-2xl bg-slate-100 p-1.5 mb-8 border border-slate-200 shadow-inner">
          <button
            onClick={() => setMobileTab('benefits')}
            className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'benefits'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>1. Beneficios</span>
          </button>
          
          <button
            onClick={() => setMobileTab('solution')}
            className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'solution'
                ? 'bg-teal-700 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>2. Soluciones</span>
          </button>

          <button
            onClick={() => setMobileTab('risks')}
            className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              mobileTab === 'risks'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>3. Peligros</span>
          </button>
        </div>


        {/* ========================================================================= */}
        {/* [GRID DE 3 TARJETAS COMPARATIVAS (DESKTOP) / VISTA FILTRADA (MOBILE)] */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* ----------------------------------------------------------------------- */}
          {/* TARJETA 1: BENEFICIOS DE ESTAR FORMALIZADO (VERDE / ÉXITO) */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            className={`flex flex-col rounded-3xl bg-white border-2 border-emerald-200/80 shadow-xl shadow-emerald-900/5 overflow-hidden transition-all hover:border-emerald-400 hover:shadow-2xl ${
              mobileTab !== 'benefits' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Header Tarjeta 1 */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-100 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> Éxito & Crecimiento
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Beneficios de estar Formalizado
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                Acceso a mercados grandes y protección patrimonial
              </p>
            </div>

            {/* Contenido Lista Tarjeta 1 */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5 bg-white">
              <ul className="space-y-4 text-slate-700 text-sm">
                
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Vende a empresas y al Estado</span>
                    <span>Emite factura legal y accede a licitaciones públicas (<strong className="text-emerald-700 font-semibold">SICOES</strong>) y clientes corporativos.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Créditos productivos preferenciales</span>
                    <span>Accede a tasas reguladas por la <strong className="text-emerald-700 font-semibold">ASFI (6% a 11.5% anual)</strong>, evitando créditos de consumo caros.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Tu patrimonio y marca blindados</span>
                    <span>Registra tu marca en el <strong className="text-emerald-700 font-semibold">SENAPI</strong> y protege tus bienes personales operando bajo personería jurídica (<strong className="text-emerald-700 font-semibold">S.R.L.</strong>).</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Tranquilidad operativa</span>
                    <span>Trabaja sin temor a clausuras de la Alcaldía (<strong className="text-emerald-700 font-semibold">GAM</strong>) o decomisos de la Intendencia.</span>
                  </div>
                </li>

              </ul>

              <div className="pt-4 border-t border-slate-100">
                <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Multiplica hasta 3x las ventas de tu negocio</span>
                </div>
              </div>
            </div>
          </div>


          {/* ----------------------------------------------------------------------- */}
          {/* TARJETA 2: LOS RETOS REALES Y CÓMO TE AYUDAMOS (AZUL / TEAL / SOLUCIÓN) */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            className={`flex flex-col rounded-3xl bg-white border-2 border-teal-300 shadow-xl shadow-teal-900/10 overflow-hidden transition-all hover:border-teal-500 hover:shadow-2xl relative ${
              mobileTab !== 'solution' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Highlight Ribbon */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[11px] tracking-wider uppercase text-center py-1.5 px-4 font-sans">
              ★ LA SOLUCIÓN MI PYME 0 KM ★
            </div>

            {/* Header Tarjeta 2 */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-teal-950 to-charcoal-900 text-white relative">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 flex items-center justify-center mb-4 border border-teal-400/30">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Los Retos Reales y Cómo Te Ayudamos
              </h3>
              <p className="text-teal-200 text-xs sm:text-sm mt-1">
                Simplificamos la burocracia con tecnología y guía clara
              </p>
            </div>

            {/* Contenido Lista Tarjeta 2 (Reto vs Solución Badges) */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 bg-slate-50/50">
              <div className="space-y-6">
                
                {/* Item 1 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-extrabold uppercase tracking-wide">
                      Reto
                    </span>
                    <span className="font-bold text-slate-900 text-sm">Declaraciones ante el SIN</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wide shrink-0 mt-0.5">
                      Solución
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                      Te orientamos si aplicas al <strong className="text-slate-900">Régimen Simplificado (RTS)</strong> sin facturas o te damos plantillas simples para el Régimen General.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-extrabold uppercase tracking-wide">
                      Reto
                    </span>
                    <span className="font-bold text-slate-900 text-sm">Costos de trámites de apertura</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wide shrink-0 mt-0.5">
                      Solución
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                      <strong className="text-slate-900">Calculadora de costos reales (SEPREC y GAM)</strong> para que no pagues tramitadores innecesarios.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-extrabold uppercase tracking-wide">
                      Reto
                    </span>
                    <span className="font-bold text-slate-900 text-sm">Cargas sociales de personal</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-extrabold uppercase tracking-wide shrink-0 mt-0.5">
                      Solución
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                      <strong className="text-slate-900">Simulador de aportes a la Gestora y seguro de salud</strong> para contratar sobre seguro sin sorpresas.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateToLegal}
                  className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <span>Explorar Calculadora y Herramientas</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>


          {/* ----------------------------------------------------------------------- */}
          {/* TARJETA 3: EL COSTO DE SEGUIR EN LA INFORMALIDAD (ROJO / ALERTA) */}
          {/* ----------------------------------------------------------------------- */}
          <div 
            className={`flex flex-col rounded-3xl bg-white border-2 border-rose-200/90 shadow-xl shadow-rose-900/5 overflow-hidden transition-all hover:border-rose-400 hover:shadow-2xl ${
              mobileTab !== 'risks' ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Header Tarjeta 3 */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white relative">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-rose-100 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" /> Riesgo Financiero
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                El Costo de Seguir en la Informalidad
              </h3>
              <p className="text-rose-100 text-xs sm:text-sm mt-1">
                Peligros ocultos que estancan y amenazan tu capital
              </p>
            </div>

            {/* Contenido Lista Tarjeta 3 */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5 bg-white">
              <ul className="space-y-4 text-slate-700 text-sm">
                
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Techo de ventas estancado</span>
                    <span>Pierdes ventas recurrentes con empresas que exigen respaldo fiscal y pagos formales.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-rose-900 block mb-0.5">Multas acumulativas en UFV</span>
                    <span>Las sanciones por operar sin licencia o no emitir factura clausuran negocios y quiebran capitales.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Peligro de perder tu nombre</span>
                    <span>Si tu marca tiene éxito sin registro en <strong className="text-rose-800 font-semibold">SENAPI</strong>, un tercero puede apropiársela legalmente.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">Dependencia de capital caro</span>
                    <span>Quedas fuera del sistema bancario y caes en préstamos informales con intereses devoradores.</span>
                  </div>
                </li>

              </ul>

              <div className="pt-4 border-t border-slate-100">
                <div className="px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-100 flex items-center gap-2 text-xs font-semibold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Evita clausuras y congelamiento de cuentas</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        {/* ========================================================================= */}
        {/* [CALL TO ACTION DESTACADO CON BOTÓN DE DIAGNÓSTICO GRATUITO] */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-20">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-charcoal-900 to-emerald-950 p-8 sm:p-12 text-white shadow-2xl overflow-hidden border border-emerald-500/20">
            
            {/* Background glowing spheres */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Diagnóstico Express Instantáneo (Gratis)</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Descubre en qué punto está tu negocio y cuál es tu ruta más económica.
                </h3>
                
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Responde 3 preguntas simples sin compromiso y obtén la estimación real de trámites, régimen aplicable (RTS vs General) y nivel de protección legal.
                </p>
              </div>

              {/* Botón CTA Principal Llamativo */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => {
                    resetDiagnostic();
                    setShowDiagnosticModal(true);
                  }}
                  className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.03] active:scale-[0.98] ring-4 ring-emerald-500/20 group"
                >
                  <FileCheck className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
                  <span>Evaluar mi negocio gratis</span>
                  <span className="px-2 py-0.5 rounded-lg bg-black/20 text-xs font-medium text-emerald-100">
                    Test 2 min
                  </span>
                  <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="mt-2.5 text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% confidencial • Basado en normativa boliviana vigente</span>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* [MODAL DIAGNÓSTICO DE RIESGO GRATUITO (TEST 2 MIN)] */}
      {/* ========================================================================= */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-slate-900">
            
            {/* Header Modal */}
            <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-charcoal-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                  <PieChart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">Diagnóstico de Riesgo & Ruta Legal</h4>
                  <p className="text-xs text-slate-400">Evaluación express en 3 pasos</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDiagnosticModal(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Indicador de Progreso */}
            {!showResult && !isAnalyzing && (
              <div className="w-full bg-slate-100 h-1.5">
                <div 
                  className="bg-emerald-500 h-1.5 transition-all duration-300"
                  style={{ width: `${(quizStep / 3) * 100}%` }}
                />
              </div>
            )}

            {/* Cuerpo del Modal */}
            <div className="p-6">
              
              {/* ESTADO 1: ANALIZANDO (LOADING) */}
              {isAnalyzing && (
                <div className="py-12 text-center space-y-4">
                  <RefreshCw className="w-10 h-10 text-emerald-600 animate-spin mx-auto" />
                  <h5 className="font-extrabold text-lg text-slate-900">Procesando tus respuestas...</h5>
                  <p className="text-xs text-slate-500">Analizando normativas del SIN, SEPREC, ASFI y SENAPI</p>
                </div>
              )}

              {/* ESTADO 2: PREGUNTAS DEL QUIZ */}
              {!isAnalyzing && !showResult && (
                <div>
                  {/* Pregunta 1 */}
                  {quizStep === 1 && (
                    <div className="space-y-4">
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Paso 1 de 3</span>
                      <h5 className="text-lg font-bold text-slate-900">
                        ¿Cuál es la situación fiscal y legal actual de tu negocio?
                      </h5>
                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={() => handleSelectAnswer('formalStatus', 'informal')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Opero como persona natural sin NIT ni Matrícula SEPREC</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('formalStatus', 'rts')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Tengo Régimen Simplificado (RTS) o Licencia de Funcionamiento</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('formalStatus', 'general')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Tengo NIT Régimen General / Personería Jurídica (S.R.L. / Unipersonal)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pregunta 2 */}
                  {quizStep === 2 && (
                    <div className="space-y-4">
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Paso 2 de 3</span>
                      <h5 className="text-lg font-bold text-slate-900">
                        ¿A qué tipo de clientes apuntas o deseas venderles principalmente?
                      </h5>
                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={() => handleSelectAnswer('salesTarget', 'retail')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Venta directa a consumidor final (Personas particulares)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('salesTarget', 'corporate')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Empresas corporativas, supermercados o licitaciones públicas (SICOES)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('salesTarget', 'both')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Ambos mercados (Mixto)</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pregunta 3 */}
                  {quizStep === 3 && (
                    <div className="space-y-4">
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">Paso 3 de 3</span>
                      <h5 className="text-lg font-bold text-slate-900">
                        ¿Has registrado tu marca comercial o logo en SENAPI?
                      </h5>
                      <div className="space-y-2.5 pt-2">
                        <button
                          onClick={() => handleSelectAnswer('riskFactor', 'unregistered_brand')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>No, uso una marca propia pero no está registrada en SENAPI</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('riskFactor', 'registered_brand')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Sí, mi marca ya cuenta con concesión SENAPI</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                          onClick={() => handleSelectAnswer('riskFactor', 'generic')}
                          className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left font-semibold text-sm transition-all flex items-center justify-between group"
                        >
                          <span>Aún no tengo un nombre comercial definido</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ESTADO 3: RESULTADO Y RECOMENDACIÓN */}
              {showResult && (
                <div className="space-y-5 animate-fade-in">
                  
                  {(() => {
                    const result = calculateRiskLevel();
                    return (
                      <>
                        <div className={`p-4 rounded-2xl ${result.color === 'rose' ? 'bg-rose-50 border border-rose-200' : result.color === 'amber' ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Diagnóstico Evaluado</span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-black ${result.color === 'rose' ? 'bg-rose-600 text-white' : result.color === 'amber' ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}>
                              {result.level}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mt-2">
                            {result.summary}
                          </p>
                        </div>

                        <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm">
                          <h6 className="font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-600" />
                            Ruta Recomendada con Mi PYME 0 KM:
                          </h6>
                          <ul className="space-y-2 text-slate-700">
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Evaluación del Régimen de Impuestos (RTS vs Régimen General)</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Apertura de Matrícula SEPREC e Inspección GAMSCZ</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>Búsqueda de antecedentes de marca en SENAPI</span>
                            </li>
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            onClick={() => {
                              setShowDiagnosticModal(false);
                              if (onNavigateToLegal) onNavigateToLegal();
                            }}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Ver mi Ruta Legal Paso a Paso</span>
                          </button>

                          <button
                            onClick={() => {
                              setShowDiagnosticModal(false);
                              if (onOpenAdvisory) onOpenAdvisory();
                            }}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-charcoal-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                          >
                            <span>Hablar con un Asesor</span>
                          </button>
                        </div>
                      </>
                    );
                  })()}

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
