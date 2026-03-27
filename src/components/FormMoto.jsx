import React, { useState } from 'react';
import {
    ChevronRight, CheckCircle2, XCircle, Check, Save, AlertTriangle,
    Gauge, Droplets, Activity, Zap, Package, ClipboardCheck,
    Disc, Eye, Wind, ChevronsDown, FileWarning,
    Sparkles, Settings, Octagon, FastForward, Link, Droplet, Navigation, Battery, Waves,
    Fuel, Gavel, Cog, User, Circle
} from 'lucide-react';
import DamageMapMoto from './DamageMapMoto';
import SystemsMapMoto from './SystemsMapMoto';
import SignatureCanvas from 'react-signature-canvas';

const MirrorIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="6" />
        <path d="M13.5 12.5L19 21" />
        <path d="M7 6l3 3" opacity="0.4" />
    </svg>
);

const SaddleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14c1-3 4-5 9-5 3 0 5 1 7 3 2 1 3 2 3 4H3v-2z" />
        <path d="M3 14c0 2 3 4 10 4s10-2 10-4" />
        <path d="M11 9l1 8" opacity="0.1" />
    </svg>
);

const FootpegIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11H6a2 2 0 0 0-2 2v3" />
        <rect x="6" y="10" width="12" height="2" rx="1" />
    </svg>
);

const ClutchIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6m0 6v6M3 12h6m6 0h6" />
    </svg>
);

const BrakeIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" strokeDasharray="4 2" />
        <circle cx="12" cy="12" r="5" />
        <path d="M17 17l3 3M4 4l3 3" />
    </svg>
);

const ThrottleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20M7 7l-2 5 2 5M17 7l2 5-2 5" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const CableIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" opacity="0.4" />
    </svg>
);

const SteeringIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7c2 0 4 2 9 2s7-2 9-2" />
        <path d="M12 9v10" />
        <circle cx="3" cy="7" r="1.5" />
        <circle cx="21" cy="7" r="1.5" />
    </svg>
);

const SuspensionIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v4m0 10v4" />
        <path d="M8 7l8 2-8 2 8 2-8 2 8 2" />
    </svg>
);

const LeakIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-4-3.5-4-3.5-2 1.9-4 3.5S5 13 5 15a7 7 0 0 0 7 7z" />
        <path d="M12 18a2.5 2.5 0 0 0 2.5-2.5" opacity="0.4" />
    </svg>
);




// ─── Shared Sub-Components ────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, dark = false }) => (
    <h2 className={`text-lg font-bold border-b pb-3 flex items-center gap-2 ${dark ? 'text-white border-slate-700' : 'text-ises-dark border-slate-100'}`}>
        <div className={`p-2 rounded-lg ${dark ? 'bg-white/10' : 'bg-ises-green/10'}`}>
            <Icon className={`w-5 h-5 ${dark ? 'text-white' : 'text-ises-green'}`} />
        </div>
        {title}
    </h2>
);

const TouchToggle = ({ label, note, value, onChange }) => (
    <div className="flex flex-col gap-2">
        <label className="font-semibold text-ises-dark text-sm leading-tight">{label}</label>
        {note && <p className="text-xs text-slate-400 font-semibold leading-relaxed">{note}</p>}
        <div className="flex gap-3">
            <button type="button" onClick={() => onChange(true)}
                className={`flex-1 py-4 rounded-xl border-2 font-bold text-lg transition-all
          ${value === true ? 'border-ises-green bg-ises-green/10 text-ises-green-dark shadow-sm' : 'border-slate-200 bg-white text-slate-400'}`}>
                SÍ
            </button>
            <button type="button" onClick={() => onChange(false)}
                className={`flex-1 py-4 rounded-xl border-2 font-bold text-lg transition-all
          ${value === false ? 'border-red-400 bg-red-50 text-red-600 shadow-sm' : 'border-slate-200 bg-white text-slate-400'}`}>
                NO
            </button>
        </div>
    </div>
);

const ChecklistRow = ({ label, note, value, onChange }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-3">
        <div className="flex-1 min-w-0">
            <p className="font-semibold text-ises-dark text-sm leading-tight">{label}</p>
            {note && <p className="text-xs text-slate-400 font-semibold mt-0.5 leading-relaxed">{note}</p>}
        </div>
        <div className="flex gap-2 flex-shrink-0">
            <button onClick={() => onChange(true)}
                className={`p-2 rounded-lg border-2 transition-all
          ${value === true ? 'border-ises-green bg-ises-green/10 text-ises-green' : 'border-slate-200 bg-white text-slate-300'}`}>
                <CheckCircle2 className="w-6 h-6" />
            </button>
            <button onClick={() => onChange(false)}
                className={`p-2 rounded-lg border-2 transition-all
          ${value === false ? 'border-red-400 bg-red-50 text-red-400' : 'border-slate-200 bg-white text-slate-300'}`}>
                <XCircle className="w-6 h-6" />
            </button>
        </div>
    </div>
);

const GridCard = ({ icon: Icon, label, note, value, onChange, fullWidth, emoji }) => (
    <button type="button" onClick={() => onChange(!value)}
        className={`relative flex flex-col items-center justify-center p-5 rounded-[2.5rem] border-2 transition-all duration-300 text-center gap-2 overflow-hidden
        ${fullWidth ? 'col-span-2' : ''}
        ${value === true
                ? 'border-slate-100 bg-white text-ises-dark shadow-sm hover:border-ises-green/30'
                : 'border-red-400 bg-red-50 text-red-600 shadow-md scale-[1.02]'}`}>

        {/* Backdrop Emoji for Depth */}
        {emoji && (
            <div className="absolute -bottom-2 -right-2 text-4xl opacity-[0.03] select-none pointer-events-none transform rotate-12 group-hover:scale-110 transition-transform">
                {emoji}
            </div>
        )}

        {/* State Icon (Top Right) */}
        <div className="absolute top-4 right-4 z-10">
            {value === true ? (
                <div className="bg-ises-green rounded-full p-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-white" />
                </div>
            ) : (
                <div className="bg-red-500 rounded-full p-0.5 shadow-md animate-pulse">
                    <XCircle className="w-4 h-4 text-white" />
                </div>
            )}
        </div>

        {/* Main Icon with Gradient Container */}
        <div className={`p-4 rounded-3xl transition-all duration-500 ${value === true ? 'bg-slate-100 text-slate-400 group-hover:bg-ises-green/10 group-hover:text-ises-green' : 'bg-red-100 text-red-500 shadow-inner'}`}>
            <Icon className="w-8 h-8" strokeWidth={2.5} />
        </div>

        {/* Text Area */}
        <div className="space-y-0.5 relative z-10">
            <p className="font-extrabold text-sm leading-tight tracking-tight uppercase">{label}</p>
            {note && <p className={`text-[9px] font-bold leading-tight uppercase tracking-widest ${value === true ? 'text-slate-400' : 'text-red-400'}`}>{note}</p>}
        </div>
    </button>
);

const DashboardButton = ({ icon: Icon, label, value, onChange }) => (
    <button type="button" onClick={() => onChange(!value)}
        className={`relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-500 gap-3 overflow-hidden group
        ${value === true
                ? 'border-slate-800 bg-slate-900/40 text-slate-500 hover:bg-slate-800/60'
                : 'border-red-500/50 bg-red-500/10 text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.15)] scale-[1.05] z-10'}`}>
        
        {/* Background Glow when inactive (Alert) */}
        {!value && (
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-transparent opacity-50 animate-pulse" />
        )}

        <div className={`p-3 rounded-2xl transition-all duration-500 ${value === true ? 'bg-slate-800/50 text-slate-600 group-hover:text-slate-400' : 'bg-red-500/20 text-red-500 shadow-[inset_0_0_10px_rgba(239,68,68,0.2)]'}`}>
            <Icon className={`w-8 h-8 ${!value ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : ''}`} strokeWidth={2.5} />
        </div>
        
        <p className={`font-black text-[10px] uppercase tracking-wider text-center leading-tight transition-colors ${value === true ? 'text-slate-500' : 'text-red-400'}`}>
            {label}
        </p>

        {/* Status indicator dot */}
        <div className={`absolute top-3 right-3 w-2 h-2 rounded-full transition-all duration-300 ${value === true ? 'bg-slate-700' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)] animate-ping'}`} />
    </button>
);

const ToolboxCard = ({ label, value, onChange, image }) => (
    <button type="button" onClick={() => onChange(!value)}
        className={`relative flex flex-col items-center p-4 rounded-3xl border-2 transition-all duration-300 gap-3 group
        ${value === true
                ? 'border-slate-100 bg-slate-50/50 text-slate-400 hover:border-ises-green/30'
                : 'border-red-400 bg-red-50 text-red-600 shadow-md scale-[1.02]'}`}>
        
        {/* Slot backdrop style */}
        <div className={`absolute inset-2 border border-dashed rounded-2xl transition-opacity
            ${value === true ? 'border-slate-200 opacity-100' : 'opacity-0'}`} />

        {/* Tool Photo Placeholder - Prepared for actual images */}
        <div className={`w-full aspect-square rounded-2xl overflow-hidden flex items-center justify-center relative z-10 transition-transform group-hover:scale-110
            ${value === true ? 'grayscale opacity-40' : 'grayscale-0 opacity-100 shadow-lg'}`}>
            {image ? (
                <img src={image} alt={label} className="w-full h-full object-contain p-2" />
            ) : (
                <div className="bg-slate-200 w-full h-full flex items-center justify-center text-slate-400">
                   <Package className="w-8 h-8" />
                </div>
            )}
        </div>

        <div className="relative z-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">Herramienta</p>
            <p className="font-bold text-sm leading-tight">{label}</p>
        </div>

        {/* Status Indicator */}
        <div className={`absolute top-3 right-3 z-20 w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-all
            ${value === true ? 'bg-ises-green text-white scale-100' : 'bg-red-500 text-white scale-110 animate-bounce'}`}>
            {value === true ? <Check className="w-3.5 h-3.5" /> : <XCircle className="w-4 h-4" />}
        </div>
    </button>
);

const LiquidSlider = ({ label, emoji, value, onChange, min = 0, max = 100, unit = '%', alertMin, alertMax }) => {
    const pct = ((value - min) / (max - min)) * 100;
    const inAlert = (alertMin !== undefined && value < alertMin) || (alertMax !== undefined && value > alertMax);
    const color = inAlert ? '#ef4444' : value < 30 ? '#f97316' : value < 60 ? '#eab308' : '#99CC33';

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="font-semibold text-ises-dark text-sm flex items-center gap-2">
                    <span>{emoji}</span> {label}
                </label>
                <span className={`text-sm font-extrabold px-3 py-1 rounded-full ${inAlert ? 'bg-red-100 text-red-600' : 'bg-ises-green/10 text-ises-green-dark'}`}>
                    {value} {unit}
                </span>
            </div>
            <div className="relative">
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-200" style={{ width: `${pct}%`, background: color }} />
                </div>
                <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))}
                    className="liquid-slider absolute inset-0 w-full opacity-0 h-3 cursor-pointer" style={{ height: '100%' }} />
            </div>
            {alertMin !== undefined && (
                <p className={`text-xs font-semibold ${inAlert ? 'text-red-500' : 'text-slate-400'}`}>
                    {inAlert ? `⚠️ Fuera del rango recomendado (${alertMin}–${alertMax} ${unit})` : `Rango óptimo: ${alertMin}–${alertMax} ${unit}`}
                </p>
            )}
        </div>
    );
};


// ─── Main FormMoto ────────────────────────────────────────────────────
const TOTAL_STEPS = 7;

const INICIAL_DATA = {
    // Paso 1: Salud
    buenEstado: null,
    descansoSuficiente: null,
    // Paso 2: Estado general (Valores por defecto TRUE para acelerar proceso)
    estadoLlantas: true, presionDelantera: 30, presionTrasera: 30,
    espejosRetrovisores: true, cojineria: true, tanqueCombustible: true,
    tuboEscape: true, reposapiés: true, sinComparendos: true,
    // Paso 3: Estado mecánico (Fallas apagadas por defecto)
    limpiezaGeneral: true, clutch: true, frenos: true, acelerador: true,
    guayas: true, fugaLiquidos: true, direccion: true, bateria: true,
    amortiguadores: true,
    nivelFrenos: 60, nivelCombustible: 50, nivelAceite: 50,
    kilometrajeInicial: '', kilometrajeFinal: '', kilometrajeFinalAnterior: '',
    // Paso 4: Mapa de daños
    damagePins: [],
    // Paso 5: Sistemas y Accesorios (todo OK por defecto)
    lucesAltas: true, lucesDir_del: true, lucesDir_tras: true, stopFreno: true,
    velocimetro: true, encendido: true, testigos: true, pito: true,
    impermeable: true, medidorPresion: true, cascoCertificado: true, chalecoReflectivo: true,
    // Paso 6: Kit Carretera (OK por defecto)
    alicate: true, destornilladorPala: true, destornilladorEstrella: true,
    llaveExpansion: true, llavesBujia: true,
    // Paso 7: Cierre
    motoOpera: null, restriccion: '', observaciones: '', firma: null,
};

export default function FormMoto({ onSave, onBack }) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState(INICIAL_DATA);
    const sigRef = React.useRef(null);

    const set = (key, value) => setData(p => ({ ...p, [key]: value }));

    // Step validity
    const isValid = () => {
        switch (step) {
            case 1: return data.buenEstado !== null && data.descansoSuficiente !== null;
            case 2: return [data.estadoLlantas, data.espejosRetrovisores, data.cojineria,
            data.tanqueCombustible, data.tuboEscape, data.reposapiés, data.sinComparendos]
                .every(v => v !== null);
            case 3: return [data.limpiezaGeneral, data.clutch, data.frenos, data.acelerador,
            data.guayas, data.fugaLiquidos, data.direccion, data.bateria, data.amortiguadores]
                .every(v => v !== null) && data.kilometrajeInicial.trim() !== '';
            case 4: return true; // Damage map is optional (no damages is valid)
            case 5: return [data.lucesAltas, data.lucesDir_del, data.lucesDir_tras, data.stopFreno,
            data.velocimetro, data.encendido, data.testigos, data.pito,
            data.impermeable, data.medidorPresion, data.cascoCertificado, data.chalecoReflectivo]
                .every(v => v !== null);
            case 6: return [data.alicate, data.destornilladorPala, data.destornilladorEstrella,
            data.llaveExpansion, data.llavesBujia].every(v => v !== null);
            case 7: return data.motoOpera !== null;
            default: return false;
        }
    };

    const next = () => { if (isValid() && step < TOTAL_STEPS) { setStep(s => s + 1); window.scrollTo(0, 0); } };
    const prev = () => { if (step > 1) { setStep(s => s - 1); window.scrollTo(0, 0); } };

    const save = () => {
        if (!isValid()) return;
        const firmaData = sigRef.current && !sigRef.current.isEmpty() ? sigRef.current.toDataURL() : null;
        onSave({ ...data, firma: firmaData, fechaInspeccion: new Date().toISOString() });
    };

    const STEP_LABELS = ['Salud', 'Estado General', 'Mecánico', 'Silueta', 'Accesorios', 'Kit', 'Cierre'];

    return (
        <div className="min-h-screen bg-ises-gray font-sans flex flex-col items-center">
            <div className="w-full max-w-lg bg-white min-h-screen relative pb-28 shadow-xl">

                {/* Header */}
                <header className="bg-gradient-to-r from-ises-green to-ises-green-dark text-white p-4 sticky top-0 z-30 shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={step > 1 ? prev : onBack}
                                className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                                <ChevronRight className="w-6 h-6 rotate-180" />
                            </button>
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight leading-tight">🏍️ Inspección Moto</h1>
                                <p className="text-white/80 text-xs font-semibold">{STEP_LABELS[step - 1]}</p>
                            </div>
                        </div>
                        <div className="bg-white/20 border border-white/30 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                            {step} / {TOTAL_STEPS}
                        </div>
                    </div>
                    <div className="mt-3 bg-white/30 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-white h-full transition-all duration-500" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
                    </div>
                </header>

                <main className="p-4 space-y-5 mt-2">

                    {/* ── PASO 1: SALUD ── */}
                    {step === 1 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-ises-blue/10 border-l-4 border-ises-blue p-4 rounded-r-2xl">
                                <p className="text-sm font-bold text-ises-blue">Estado de Salud del Conductor</p>
                                <p className="text-xs text-ises-dark/80 font-semibold mt-1">Confirma tu estado antes de operar el vehículo</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                                <SectionHeader icon={Activity} title="Estado de Salud" />
                                <TouchToggle label="¿Se encuentra en buen estado de alerta para conducir?"
                                    note="Sin somnolencia y sin efectos del alcohol o sustancias"
                                    value={data.buenEstado} onChange={v => set('buenEstado', v)} />
                                <TouchToggle label="¿La noche anterior descansó lo suficiente?"
                                    value={data.descansoSuficiente} onChange={v => set('descansoSuficiente', v)} />
                            </div>
                            {data.buenEstado === false && (
                                <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex gap-3">
                                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-red-700 text-sm">¡Alerta de Seguridad!</p>
                                        <p className="text-xs text-red-600 font-semibold mt-1">No debes operar el vehículo. Informa a tu supervisor inmediatamente.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── PASO 2: ESTADO GENERAL ── */}
                    {step === 2 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={Gauge} title="Estado General del Vehículo" />
                                <p className="text-sm font-semibold text-slate-500 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    Todo está marcado como "Bien" (✅) por defecto. <strong className="text-ises-dark">Toca una tarjeta</strong> sólo si el elemento presenta <span className="text-red-500 font-bold">fallas o novedades</span> (❌).
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <GridCard icon={Circle} label="Llantas" note="Labrado mín 1.6mm" emoji="🛞"
                                        value={data.estadoLlantas} onChange={v => set('estadoLlantas', v)} />

                                    <GridCard icon={MirrorIcon} label="Espejos" note="Sin partiduras" emoji="🪞"
                                        value={data.espejosRetrovisores} onChange={v => set('espejosRetrovisores', v)} />

                                    <GridCard icon={SaddleIcon} label="Cojinería" note="Sin daño o humedad" emoji="🛋️"
                                        value={data.cojineria} onChange={v => set('cojineria', v)} />

                                    <GridCard icon={Fuel} label="Tanque" note="Sin golpes/fugas" emoji="⛽"
                                        value={data.tanqueCombustible} onChange={v => set('tanqueCombustible', v)} />

                                    <GridCard icon={Wind} label="Exhosto" note="Fijo y completo" emoji="💨"
                                        value={data.tuboEscape} onChange={v => set('tuboEscape', v)} />

                                    <GridCard icon={FootpegIcon} label="Reposapiés" note="Fijado firmemente" emoji="🦶"
                                        value={data.reposapiés} onChange={v => set('reposapiés', v)} />

                                    <GridCard icon={Gavel} label="Comparendos" note="Sin multas en SIMIT" emoji="⚖️"
                                        value={data.sinComparendos} onChange={v => set('sinComparendos', v)} fullWidth />
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                                <SectionHeader icon={Gauge} title="Presión de Llantas (PSI)" />
                                <LiquidSlider label="Llanta Delantera" emoji="⬆️"
                                    value={data.presionDelantera} onChange={v => set('presionDelantera', v)}
                                    min={0} max={50} unit="PSI" alertMin={25} alertMax={33} />
                                <LiquidSlider label="Llanta Trasera" emoji="⬇️"
                                    value={data.presionTrasera} onChange={v => set('presionTrasera', v)}
                                    min={0} max={50} unit="PSI" alertMin={25} alertMax={33} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 3: MECÁNICO ── */}
                    {step === 3 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-slate-950 p-6 rounded-[2.5rem] shadow-2xl border-t border-slate-800 space-y-5">
                                <SectionHeader icon={Activity} title="Tablero de Alertas Mecánicas" dark={true} />
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/50 leading-relaxed">
                                    Todo está en orden (apagado). <strong className="text-white">Toca un indicador</strong> sólo para reportar una <span className="text-red-400">falla verificada</span>.
                                </p>

                                <div className="grid grid-cols-3 gap-3">
                                    <DashboardButton icon={Sparkles} label="Limpieza"
                                        value={data.limpiezaGeneral} onChange={v => set('limpiezaGeneral', v)} />
                                    <DashboardButton icon={ClutchIcon} label="Clutch"
                                        value={data.clutch} onChange={v => set('clutch', v)} />
                                    <DashboardButton icon={BrakeIcon} label="Frenos"
                                        value={data.frenos} onChange={v => set('frenos', v)} />
                                    <DashboardButton icon={ThrottleIcon} label="Acelerador"
                                        value={data.acelerador} onChange={v => set('acelerador', v)} />
                                    <DashboardButton icon={CableIcon} label="Guayas"
                                        value={data.guayas} onChange={v => set('guayas', v)} />
                                    <DashboardButton icon={LeakIcon} label="Fugas"
                                        value={data.fugaLiquidos} onChange={v => set('fugaLiquidos', v)} />
                                    <DashboardButton icon={SteeringIcon} label="Dirección"
                                        value={data.direccion} onChange={v => set('direccion', v)} />
                                    <DashboardButton icon={Battery} label="Batería"
                                        value={data.bateria} onChange={v => set('bateria', v)} />
                                    <DashboardButton icon={SuspensionIcon} label="Suspensión"
                                        value={data.amortiguadores} onChange={v => set('amortiguadores', v)} />
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                                <SectionHeader icon={Droplets} title="Niveles de Líquidos" />
                                <LiquidSlider label="Nivel líquido de frenos" emoji="🔧"
                                    value={data.nivelFrenos} onChange={v => set('nivelFrenos', v)} />
                                <LiquidSlider label="Nivel combustible" emoji="⛽"
                                    value={data.nivelCombustible} onChange={v => set('nivelCombustible', v)} />
                                <LiquidSlider label="Nivel de aceite" emoji="🛢️"
                                    value={data.nivelAceite} onChange={v => set('nivelAceite', v)} />
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={Gauge} title="Kilometraje" />
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Kilometraje Inicial *</label>
                                    <input type="number" placeholder="Ej. 45230"
                                        value={data.kilometrajeInicial}
                                        onChange={e => set('kilometrajeInicial', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-green focus:border-ises-green min-h-[3.5rem] font-bold" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Km Final Jornada Anterior</label>
                                    <input type="number" placeholder="Ej. 45100"
                                        value={data.kilometrajeFinalAnterior}
                                        onChange={e => set('kilometrajeFinalAnterior', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-green focus:border-ises-green min-h-[3.5rem] font-bold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PASO 4: SILUETA 2D ── */}
                    {step === 4 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                                <SectionHeader icon={Activity} title="Mapa de Daños" />
                                <p className="text-sm text-slate-500 font-semibold mt-1 mb-4">
                                    Toca las zonas de la silueta donde veas daños nuevos. Los pines grises son daños previos heredados.
                                </p>
                                <DamageMapMoto pins={data.damagePins} onChange={pins => set('damagePins', pins)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 5: SISTEMAS Y ACCESORIOS ── */}
                    {step === 5 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                                <SectionHeader icon={Zap} title="Sistemas y Accesorios" />
                                <p className="text-sm font-semibold text-slate-500 mt-2 mb-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    Selecciona la vista de la moto y toca los puntos para reportar fallas. Todo está OK por defecto.
                                </p>
                                <SystemsMapMoto data={data}
                                    onChange={(updated) => setData(updated)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 6: KIT DE CARRETERAS ── */}
                    {step === 6 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <SectionHeader icon={Package} title="Kit de Carreteras" />
                                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Inventario de Herramientas</p>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <ToolboxCard label="Alicate" value={data.alicate} 
                                            image="/alicate.jpg"
                                            onChange={v => set('alicate', v)} />
                                        <ToolboxCard label="Destornillador Pala" value={data.destornilladorPala} 
                                            image="/destornillador_pala.jpg"
                                            onChange={v => set('destornilladorPala', v)} />
                                        <ToolboxCard label="Destornillador Estrella" value={data.destornilladorEstrella} 
                                            image="/destornillador_estrella.jpg"
                                            onChange={v => set('destornilladorEstrella', v)} />
                                        <ToolboxCard label="Llave Expansión" value={data.llaveExpansion} 
                                            image="/llave_expansion.jpg"
                                            onChange={v => set('llaveExpansion', v)} />
                                        <ToolboxCard label="Llaves de Bujía" value={data.llavesBujia} 
                                            image="/llave_bujias.jpg"
                                            onChange={v => set('llavesBujia', v)} />
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <span>Total Herramientas</span>
                                        <span className="text-ises-green text-sm">05</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PASO 7: CIERRE ── */}
                    {step === 7 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-5">
                                <SectionHeader icon={ClipboardCheck} title="Observaciones y Cierre" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-ises-dark text-sm">KM Inicial</label>
                                        <input type="number" value={data.kilometrajeInicial} readOnly
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none opacity-60 font-black" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-ises-dark text-sm">KM Final (Cierre) *</label>
                                        <input type="number" placeholder="Ej. 45300"
                                            value={data.kilometrajeFinal}
                                            onChange={e => set('kilometrajeFinal', e.target.value)}
                                            className="w-full p-4 bg-white border-2 border-ises-green rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-green font-black shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Observaciones</label>
                                    <textarea rows={3} placeholder="Novedades adicionales..."
                                        value={data.observaciones}
                                        onChange={e => set('observaciones', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-ises-green font-semibold resize-none" />
                                </div>

                                <TouchToggle label="¿La moto puede operar?"
                                    value={data.motoOpera} onChange={v => set('motoOpera', v)} />

                                {data.motoOpera === false && (
                                    <div className="flex flex-col gap-2">
                                        <label className="font-bold text-ises-dark text-sm">Descripción de Restricción</label>
                                        <textarea rows={2} placeholder="Indica por qué no puede operar..."
                                            value={data.restriccion}
                                            onChange={e => set('restriccion', e.target.value)}
                                            className="w-full p-4 bg-red-50 border border-red-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-red-300 font-semibold resize-none" />
                                    </div>
                                )}

                                <div>
                                    <label className="font-bold text-ises-dark text-sm block mb-2">Firma del Conductor</label>
                                    <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                                        <SignatureCanvas ref={sigRef} penColor="#333333"
                                            canvasProps={{ className: 'w-full', height: 160, style: { width: '100%' } }} />
                                    </div>
                                    <button onClick={() => sigRef.current?.clear()}
                                        className="mt-2 text-xs text-slate-400 font-bold hover:text-red-400 transition-colors">
                                        Limpiar firma
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </main>

                {/* Bottom Nav */}
                <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] z-40">
                    <div className="max-w-lg mx-auto">
                        {step < TOTAL_STEPS ? (
                            <button onClick={next} disabled={!isValid()}
                                className={`w-full py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all duration-300 min-h-[4rem]
                  ${isValid()
                                        ? 'bg-gradient-to-r from-ises-green to-ises-green-dark text-white shadow-lg shadow-ises-green/20 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}>
                                Siguiente Paso <ChevronRight className="w-6 h-6" />
                            </button>
                        ) : (
                            <button onClick={save} disabled={!isValid()}
                                className={`w-full py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all duration-300 min-h-[4rem]
                  ${isValid()
                                        ? 'bg-gradient-to-r from-ises-blue to-ises-blue-dark text-white shadow-lg shadow-ises-blue/20 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}>
                                <Save className="w-6 h-6" /> Finalizar y Guardar
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
