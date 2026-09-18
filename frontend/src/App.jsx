import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import LandingHero from './components/LandingHero.jsx';
import RegistroEsteticaForm from './components/RegistroEsteticaForm.jsx';
import SimuladorRTS from './components/SimuladorRTS.jsx';
import CosteoServicioForm from './components/CosteoServicioForm.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import DiagnosticoModule from './components/DiagnosticoModule.jsx';
import { Scissors, ShieldCheck, Calculator, MessageCircle, LayoutDashboard, Store, TrendingUp, FileText, ArrowRight, ClipboardList } from 'lucide-react';
import { formatBs } from './utils/costingEngine.js';
import { calcularRTS } from './utils/rtsEngine.js';

// ── Persistencia en localStorage ────────────────────────────────
function useLocal(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal];
}

// ── Tab wrapper ──────────────────────────────────────────────────
function TabSection({ title, subtitle, icon: Icon, color = 'rose', children }) {
  const colors = {
    rose:  'from-rose-700 via-rose-800 to-charcoal-900',
    gold:  'from-gold-700 via-gold-800 to-charcoal-900',
    green: 'from-emerald-700 via-emerald-800 to-charcoal-900',
    dark:  'from-charcoal-900 to-rose-950',
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${colors[color]} text-white shadow-xl`}>
        <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider mb-1">
          <Icon className="w-4 h-4" />
          <span>MY PIM EXPRESS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">{title}</h1>
        <p className="text-white/70 text-sm mt-1 max-w-xl">{subtitle}</p>
      </div>
      <div className="card p-6 sm:p-8">{children}</div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');

  // Estado global persistido
  const [estetica,  setEstetica]  = useLocal('mypim_estetica',  null);
  const [servicios, setServicios] = useLocal('mypim_servicios', []);

  // El último servicio calculado (para el reporte)
  const ultimoServicio = servicios[servicios.length - 1] ?? null;
  const rts = estetica ? calcularRTS(estetica.capital_declarado ?? 0) : null;

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const handleGuardarEstetica = (data) => {
    setEstetica(data);
    setTimeout(() => setActiveTab('rts'), 800);
  };

  const handleGuardarServicio = (data) => {
    setServicios(prev => [data, ...prev].slice(0, 20)); // últimos 20
  };

  // ── DASHBOARD ───────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">

      {/* Welcome */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-charcoal-900 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
        <h1 className="text-2xl sm:text-3xl font-extrabold relative z-10">
          {estetica ? `¡Hola, ${estetica.nombre_propietaria}! 💄` : '¡Bienvenida a MY PIM EXPRESS!'}
        </h1>
        <p className="text-white/70 text-sm mt-1 relative z-10">
          {estetica
            ? `Negocio: ${estetica.nombre_salon} · ${estetica.ubicacion_mercado}`
            : 'Registra tu peluquería, centro de estética, salón de uñas o spa para comenzar.'}
        </p>
        {!estetica && (
          <button
            onClick={() => setActiveTab('registro')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-sm flex items-center gap-2 transition-all relative z-10 w-fit"
          >
            <Store className="w-4 h-4" /> Registrar mi Negocio
          </button>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Capital Declarado', value: estetica ? formatBs(estetica.capital_declarado) : '—', icon: Store, color: 'bg-rose-100 text-rose-700' },
          { label: 'Categoría RTS',     value: rts?.categoria_rts ?? '—',                             icon: ShieldCheck, color: 'bg-amber-100 text-amber-700' },
          { label: 'Pago Bimestral',    value: rts ? (typeof rts.pago_bimestral === 'number' ? formatBs(rts.pago_bimestral) : 'Contador') : '—', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Servicios Calculados', value: servicios.length, icon: Calculator, color: 'bg-blue-100 text-blue-700' },
        ].map((k, i) => (
          <div key={k.label} className={`animate-fade-in-up stagger-${i + 1} p-5 card flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${k.color}`}>
              <k.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-400">{k.label}</p>
              <p className="text-lg font-extrabold text-charcoal-900 stat-number truncate">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'registro',     label: 'Mi Salón',       icon: Scissors,       color: 'hover:border-rose-400',   num: '01' },
          { id: 'rts',          label: 'Impuesto RTS',   icon: ShieldCheck,    color: 'hover:border-amber-400',  num: '02' },
          { id: 'costeo',       label: 'Costeo',         icon: Calculator,     color: 'hover:border-blue-400',   num: '03' },
          { id: 'diagnostico',  label: 'Diagnóstico',    icon: ClipboardList,  color: 'hover:border-purple-400', num: '04' },
          { id: 'whatsapp',     label: 'Reporte WA',     icon: MessageCircle,  color: 'hover:border-green-400',  num: '05' },
        ].map((m, i) => (
          <div key={m.id} onClick={() => setActiveTab(m.id)}
            className={`animate-fade-in-up stagger-${i + 1} cursor-pointer p-5 card border border-slate-200 ${m.color} hover:shadow-md transition-all relative overflow-hidden`}>
            <span className="absolute top-2 right-3 text-4xl font-black text-slate-100 select-none">{m.num}</span>
            <m.icon className="w-7 h-7 text-rose-500 mb-3" />
            <p className="font-bold text-charcoal-900 text-sm">{m.label}</p>
            <div className="mt-2 flex items-center text-xs font-bold text-rose-500">
              <span>Abrir</span><ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Últimos servicios */}
      {servicios.length > 0 && (
        <div className="card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-charcoal-900 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-400" /> Servicios Calculados
            </h2>
            <button onClick={() => setServicios([])} className="text-xs text-slate-400 hover:text-red-500 transition-colors">Limpiar</button>
          </div>
          <div className="space-y-2">
            {servicios.slice(0, 5).map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm">
                <span className="font-semibold text-charcoal-900">{s.nombre_tratamiento}</span>
                <span className="font-black text-rose-600 stat-number">{formatBs(s.precio_sugerido)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ── RENDER PRINCIPAL ─────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-grow">
        {activeTab === 'landing' && (
          <LandingHero onStart={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'dashboard' && renderDashboard()}

        {activeTab === 'registro' && (
          <TabSection title="Perfil de tu Negocio" icon={Scissors} color="rose"
            subtitle="Registra los datos de tu peluquería, centro de estética, salón de uñas, spa o barbería.">
            <RegistroEsteticaForm
              initialData={estetica}
              onSave={handleGuardarEstetica}
            />
          </TabSection>
        )}

        {activeTab === 'rts' && (
          <TabSection title="Simulador RTS Bolivia" icon={ShieldCheck} color="gold"
            subtitle="Régimen Tributario Simplificado del SIN. Descubre cuánto pagas cada dos meses.">
            <SimuladorRTS capitalInicial={estetica?.capital_declarado ?? ''} />
          </TabSection>
        )}

        {activeTab === 'costeo' && (
          <TabSection title="Costeo de Servicios" icon={Calculator} color="dark"
            subtitle="Calcula el precio real de cualquier servicio: corte, tinte, keratina, manicura, extensiones, diseño de cejas y más.">
            <CosteoServicioForm
              esteticaId={estetica?.id_estetica}
              onGuardar={handleGuardarServicio}
            />
          </TabSection>
        )}

        {activeTab === 'diagnostico' && (
          <TabSection title="Diagnóstico Gratuito" icon={ClipboardList} color="dark"
            subtitle="Responde unas preguntas rápidas y te decimos qué régimen tributario te conviene y qué documentos necesitas.">
            <DiagnosticoModule />
          </TabSection>
        )}

        {activeTab === 'whatsapp' && (
          <TabSection title="Enviar Reporte" icon={MessageCircle} color="green"
            subtitle="Genera el reporte completo con costeo y RTS y envíalo por WhatsApp a tu equipo de soporte.">
            <div className="space-y-6">
              {(!estetica && !ultimoServicio && !rts) && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold">
                  Completa al menos el registro del salón o un costeo de servicio para generar el reporte.
                </div>
              )}
              <WhatsAppButton
                estetica={estetica}
                servicio={ultimoServicio}
                rts={rts}
              />
            </div>
          </TabSection>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-charcoal-900 text-slate-400 text-xs py-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white font-bold">
            <Scissors className="w-4 h-4 text-rose-400" />
            MY PIM EXPRESS — Belleza & Estética, Santa Cruz de la Sierra, Bolivia
          </div>
          <p>Hackatón <strong className="text-slate-300">HACKBIZ 2026</strong> · UAGRM · Solución de Triple Impacto</p>
        </div>
      </footer>
    </div>
  );
}
