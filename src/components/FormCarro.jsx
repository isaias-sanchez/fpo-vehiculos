import React, { useState } from 'react';
import {
    ChevronRight, CheckCircle2, XCircle, Save, AlertTriangle,
    Gauge, Droplets, Activity, Zap, Package, ClipboardCheck, Car, Lightbulb, Settings,
    FileText, CreditCard, ShieldCheck, FileBadge, AlertOctagon,
    CheckSquare, Maximize, AppWindow, UserCheck,
    PlusSquare, Flame, ArrowUpCircle, Triangle, PenTool, Wrench, LifeBuoy, Flashlight
} from 'lucide-react';
import DamageMapCarro from './DamageMapCarro';
import SignatureCanvas from 'react-signature-canvas';

// ─── Shared Sub-Components ────────────────────────────────────────────
// Componente para el sistema de llantas interactivo
const TireSystem = ({ data, onChange }) => {
    const tires = [
        { id: 'llantaDI', label: 'Del. Izquierda', pos: 'top-0 left-0' },
        { id: 'llantaDD', label: 'Del. Derecha', pos: 'top-0 right-0' },
        { id: 'llantaTI', label: 'Tras. Izquierda', pos: 'bottom-0 left-0' },
        { id: 'llantaTD', label: 'Tras. Derecha', pos: 'bottom-0 right-0' }
    ];

    const getStatusColor = (val) => {
        if (val === 2) return 'bg-ises-green border-ises-green-dark shadow-[0_0_15px_rgba(34,197,94,0.4)]';
        if (val === 1) return 'bg-yellow-400 border-yellow-600 shadow-[0_0_15px_rgba(250,204,21,0.4)]';
        return 'bg-red-500 border-red-700 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
    };

    const nextStatus = (val) => (val === 0 ? 2 : val - 1);

    return (
        <div className="relative w-full max-w-[200px] aspect-[1/2] mx-auto my-4 bg-slate-100/50 rounded-3xl border-2 border-slate-200/50 p-4">
            {/* Chasis Simple */}
            <div className="absolute inset-8 border-4 border-slate-300 rounded-2xl opacity-30 flex items-center justify-center">
                <Car className="w-12 h-12 text-slate-400 -rotate-90" />
            </div>
            
            {tires.map(t => (
                <button
                    key={t.id}
                    type="button"
                    onClick={() => onChange(t.id, nextStatus(data[t.id]))}
                    className={`absolute ${t.pos} w-10 h-16 rounded-lg border-2 transition-all duration-300 transform active:scale-90 flex flex-col items-center justify-center ${getStatusColor(data[t.id])}`}
                >
                    <div className="w-full h-1 bg-white/20 my-0.5" />
                    <div className="w-full h-1 bg-white/20 my-0.5" />
                    <div className="w-full h-1 bg-white/20 my-0.5" />
                </button>
            ))}
            
            {/* Etiquetas */}
            <div className="absolute -left-24 top-4 text-right w-20">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delantera</p>
            </div>
            <div className="absolute -left-24 bottom-4 text-right w-20">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trasera</p>
            </div>
        </div>
    );
};

const SectionHeader = ({ icon: Icon, title }) => (
    <h2 className="text-lg font-bold text-ises-dark border-b border-slate-100 pb-3 flex items-center gap-2">
        <div className="p-2 bg-ises-green/10 rounded-lg">
            <Icon className="w-5 h-5 text-ises-green" />
        </div>
        {title}
    </h2>
);

const TouchToggle = ({ label, note, value, onChange, white = false }) => (
    <div className="flex flex-col gap-2">
        <label className={`font-semibold text-sm leading-tight ${white ? 'text-white' : 'text-ises-dark'}`}>{label}</label>
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

const DocumentCard = ({ label, icon: Icon, imageSrc, value, onChange }) => (
    <button 
        type="button"
        onClick={() => onChange(!value)}
        className={`w-full relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 transform focus:outline-none hover:shadow-md ${value === true ? 'border-ises-green bg-ises-green/5 shadow-sm scale-[1.02]' : value === false ? 'border-red-400 bg-red-50 shadow-sm scale-[1.02]' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
        
        {/* Indicador de estado flotante tipo badge */}
        <div className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-colors z-10 ${value === true ? 'bg-ises-green text-white' : value === false ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
            {value === true ? <CheckCircle2 className="w-4 h-4" /> : value === false ? <XCircle className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-slate-400" />}
        </div>
        
        {/* Ícono Principal o Imagen Real */}
        <div className={`relative flex items-center justify-center rounded-full mb-2 sm:mb-3 mt-4 transition-colors ${imageSrc ? 'w-16 h-16 sm:w-20 sm:h-20 bg-transparent' : 'p-3 sm:p-4 w-14 h-14 sm:w-16 sm:h-16 ' + (value === true ? 'bg-ises-green text-white shadow-md' : value === false ? 'bg-red-500 text-white shadow-md' : 'bg-slate-100 text-slate-500')}`}>
            {imageSrc ? (
                <img src={imageSrc} className={`w-full h-full object-contain mix-blend-multiply drop-shadow-md transition-all ${value === false ? 'grayscale opacity-70' : ''}`} alt={label} />
            ) : (
                <Icon className="w-full h-full" strokeWidth={1.5} />
            )}
        </div>
        
        {/* Título */}
        <p className={`text-center font-bold text-xs sm:text-sm leading-tight transition-colors ${value === true ? 'text-ises-green-dark' : value === false ? 'text-red-700' : 'text-slate-600'}`}>
            {label}
        </p>
    </button>
);

const VehicleZone = ({ title, imageSrc, children }) => (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-8 transform transition-all">
        {/* Encabezado con Imagen */}
        <div className="relative h-44 sm:h-52 w-full">
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-5 sm:p-6">
                <h3 className="text-white font-black text-xl sm:text-2xl tracking-tight shadow-sm flex items-center gap-2">
                    {title}
                </h3>
            </div>
        </div>
        
        {/* Contenedor de Botones Interactivos */}
        <div className="p-4 sm:p-6 bg-slate-50/50">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {children}
            </div>
        </div>
    </div>
);

// ─── Initial State ────────────────────────────────────────────────────
const INITIAL_DATA = {
    // Paso 1: Salud
    buenEstado: null, descansoSuficiente: null,
    // Paso 2: Documentación (Aprobados por defecto)
    sinComparendos: true, tarjetaPropiedad: true, soat: true,
    licenciaConduccion: true, revisionTecnomecanica: true,
    // Paso 3: Luces (Aprobados por defecto)
    lucesAltasbajas: true, direccionalesDelanteros: true, direccionalesTraseros: true,
    frenoSenalTrasera: true, parqueoDelantero: true, parqueoTrasero: true,
    rotacionCabina: true, lucesInternas: true,
    // Paso 4: Cabina (Aprobado por defecto)
    latasCabina: true, puertas: true, elevavidrios: true, parabrisas: true, silleteria: true,
    // Paso 5: Tablero + Km (Aprobados por defecto)
    espejosRetrovisores: true, estribos: true, plumillas: true, cinturones: true,
    indicadorCombustible: true, indicadorTemperatura: true, velocimetro: true, tacometro: true,
    monitorViaje: true, kilometrajeInicial: '', kilometrajeFinalAnterior: '',
    // Paso 6: Mandos (Aprobados por defecto)
    pitoBocina: true, acelerador: true, pedalFreno: true, embrague: true,
    frenoSeguridad: true, barraCambios: true, sistDireccion: true,
    // Paso 7: Mapa daños
    damagePins: [],
    // Paso 8: Equipo carretera (Aprobados por defecto)
    botiquin: true, extintor: true, gato: true, cruceta: true,
    senalesCarretera: true, tacos: true, alicate: true, destornilladores: true,
    llavesExpansion: true, llavesFijas: true, llantaRepuesto: true, linterna: true,
    // Paso 9: Cierre (0: Malo/Rojo, 1: Regular/Amarillo, 2: Bueno/Verde)
    llantaDI: 2, llantaDD: 2, llantaTI: 2, llantaTD: 2,
    rinesPernos: true,
    observaciones: '', fechaExtintor: '', firma: null,
    kilometrajeFinal: '', motoOpera: true, restriccion: '',
};

const TOTAL_STEPS = 9;
const STEP_LABELS = ['Salud', 'Documentación', 'Luces', 'Cabina', 'Tablero', 'Mandos', 'Silueta', 'Equipo', 'Cierre'];

// ─── Main FormCarro ───────────────────────────────────────────────────
export default function FormCarro({ onSave, onBack }) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState(INITIAL_DATA);
    const sigRef = React.useRef(null);

    const set = (key, value) => setData(p => ({ ...p, [key]: value }));

    const isValid = () => {
        switch (step) {
            case 1: return data.buenEstado !== null && data.descansoSuficiente !== null;
            case 2: return [data.sinComparendos, data.tarjetaPropiedad, data.soat,
            data.licenciaConduccion, data.revisionTecnomecanica].every(v => v !== null);
            case 3: return [data.lucesAltasbajas, data.direccionalesDelanteros, data.direccionalesTraseros,
            data.frenoSenalTrasera, data.parqueoDelantero, data.parqueoTrasero,
            data.rotacionCabina, data.lucesInternas].every(v => v !== null);
            case 4: return [data.latasCabina, data.puertas, data.elevavidrios,
            data.parabrisas, data.silleteria].every(v => v !== null);
            case 5: return [data.espejosRetrovisores, data.estribos, data.plumillas, data.cinturones,
            data.indicadorCombustible, data.indicadorTemperatura, data.velocimetro,
            data.tacometro, data.monitorViaje].every(v => v !== null)
                && data.kilometrajeInicial.trim() !== '';
            case 6: return [data.pitoBocina, data.acelerador, data.pedalFreno, data.embrague,
            data.frenoSeguridad, data.barraCambios, data.sistDireccion].every(v => v !== null);
            case 7: return true;
            case 8: return [data.botiquin, data.extintor, data.gato, data.cruceta, data.senalesCarretera,
            data.tacos, data.alicate, data.destornilladores, data.llavesExpansion,
            data.llavesFijas, data.llantaRepuesto, data.linterna].every(v => v !== null);
            case 9: return data.rinesPernos !== null && data.kilometrajeFinal.trim() !== '' && data.motoOpera !== null;
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

    return (
        <div className="min-h-screen bg-ises-gray font-sans flex flex-col items-center">
            <div className="w-full max-w-lg bg-white min-h-screen relative pb-28 shadow-xl">

                {/* Header */}
                <header className="bg-gradient-to-r from-ises-blue to-ises-blue-dark text-white p-4 sticky top-0 z-30 shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={step > 1 ? prev : onBack}
                                className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors">
                                <ChevronRight className="w-6 h-6 rotate-180" />
                            </button>
                            <div>
                                <h1 className="text-xl font-extrabold tracking-tight leading-tight">🚘 Inspección 4 Ruedas</h1>
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

                    {/* ── PASO 2: DOCUMENTACIÓN ── */}
                    {step === 2 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={ClipboardCheck} title="Documentación" />
                                <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2">
                                    <DocumentCard icon={FileText} label="Sin Comparendos"
                                        value={data.sinComparendos} onChange={v => set('sinComparendos', v)} />
                                    <DocumentCard icon={Car} label="Tarjeta de Propiedad"
                                        value={data.tarjetaPropiedad} onChange={v => set('tarjetaPropiedad', v)} />
                                    <DocumentCard icon={ShieldCheck} label="Seguro (SOAT)"
                                        value={data.soat} onChange={v => set('soat', v)} />
                                    <DocumentCard icon={CreditCard} label="Licencia Conducción"
                                        value={data.licenciaConduccion} onChange={v => set('licenciaConduccion', v)} />
                                    <DocumentCard icon={FileBadge} label="Revisión Técnico-Mecánica"
                                        value={data.revisionTecnomecanica} onChange={v => set('revisionTecnomecanica', v)} />
                                    {/* Celda vacía para completar la fila si se desea u otra tarjeta */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PASO 3: LUCES ── */}
                    {step === 3 && (
                        <div className="space-y-6 page-enter pb-4">
                            <div className="flex items-center gap-3 mb-4 px-1">
                                <div className="p-3 bg-ises-green/10 rounded-xl">
                                    <Lightbulb className="w-6 h-6 text-ises-green" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-ises-dark tracking-tight">Inspección de Luces</h2>
                                    <p className="text-sm text-slate-500 font-semibold leading-tight mt-0.5">Confirma el estado táctilmente por zona del vehículo.</p>
                                </div>
                            </div>

                            {/* Zona Frontal */}
                            <VehicleZone 
                                title="Frente del Vehículo" 
                                imageSrc="/img/luces/frente.png"
                            >
                                <DocumentCard icon={Lightbulb} label="Altas / Bajas" 
                                    value={data.lucesAltasbajas} onChange={v => set('lucesAltasbajas', v)} />
                                <DocumentCard icon={ChevronRight} label="Direccionales Del." 
                                    value={data.direccionalesDelanteros} onChange={v => set('direccionalesDelanteros', v)} />
                                <DocumentCard icon={AlertTriangle} label="Parqueo Delantera" 
                                    value={data.parqueoDelantero} onChange={v => set('parqueoDelantero', v)} />
                            </VehicleZone>

                            {/* Zona Trasera */}
                            <VehicleZone 
                                title="Parte Trasera" 
                                imageSrc="/img/luces/trasera.png"
                            >
                                <DocumentCard icon={Activity} label="Freno y Señal" 
                                    value={data.frenoSenalTrasera} onChange={v => set('frenoSenalTrasera', v)} />
                                <DocumentCard icon={ChevronRight} label="Direccionales Tras." 
                                    value={data.direccionalesTraseros} onChange={v => set('direccionalesTraseros', v)} />
                                <DocumentCard icon={AlertTriangle} label="Parqueo Trasera" 
                                    value={data.parqueoTrasero} onChange={v => set('parqueoTrasero', v)} />
                            </VehicleZone>

                            {/* Zona Cabina */}
                            <VehicleZone 
                                title="Cabina y Especiales" 
                                imageSrc="/img/luces/cabina.png"
                            >
                                <DocumentCard icon={Zap} label="Rotación (Licuadora)" 
                                    value={data.rotacionCabina} onChange={v => set('rotacionCabina', v)} />
                                <DocumentCard icon={Lightbulb} label="Luces Internas" 
                                    value={data.lucesInternas} onChange={v => set('lucesInternas', v)} />
                            </VehicleZone>
                        </div>
                    )}

                    {/* ── PASO 4: CABINA ── */}
                    {step === 4 && (
                        <div className="space-y-6 page-enter pb-4">
                            <div className="flex items-center gap-3 mb-4 px-1">
                                <div className="p-3 bg-ises-green/10 rounded-xl">
                                    <Car className="w-6 h-6 text-ises-green" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-ises-dark tracking-tight">Inspección de Cabina</h2>
                                    <p className="text-sm text-slate-500 font-semibold leading-tight mt-0.5">Confirma el estado de los elementos interiores.</p>
                                </div>
                            </div>

                            <VehicleZone 
                                title="Interior de Cabina" 
                                imageSrc="/img/luces/cabina.png"
                            >
                                <DocumentCard icon={ShieldCheck} label="Latas Cabina" 
                                    value={data.latasCabina} onChange={v => set('latasCabina', v)} />
                                <DocumentCard icon={CheckSquare} label="Puertas" 
                                    value={data.puertas} onChange={v => set('puertas', v)} />
                                <DocumentCard icon={Maximize} label="Elevavidrios" 
                                    value={data.elevavidrios} onChange={v => set('elevavidrios', v)} />
                                <DocumentCard icon={AppWindow} label="Parabrisas" 
                                    value={data.parabrisas} onChange={v => set('parabrisas', v)} />
                                <DocumentCard icon={UserCheck} label="Silletería" 
                                    value={data.silleteria} onChange={v => set('silleteria', v)} />
                            </VehicleZone>
                        </div>
                    )}

                    {/* ── PASO 5: TABLERO + KM ── */}
                    {step === 5 && (
                        <div className="space-y-6 page-enter pb-4">
                            <div className="flex items-center gap-3 mb-4 px-1">
                                <div className="p-3 bg-ises-green/10 rounded-xl">
                                    <Gauge className="w-6 h-6 text-ises-green" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-ises-dark tracking-tight">Tablero e Instrumentos</h2>
                                    <p className="text-sm text-slate-500 font-semibold leading-tight mt-0.5">Confirma el estado de los indicadores y accesorios.</p>
                                </div>
                            </div>

                            <VehicleZone 
                                title="Instrumentos y Accesorios" 
                                imageSrc="/img/tablero.png"
                            >
                                <DocumentCard icon={AppWindow} label="Retrovisores" 
                                    value={data.espejosRetrovisores} onChange={v => set('espejosRetrovisores', v)} />
                                <DocumentCard icon={ChevronRight} label="Estribos" 
                                    value={data.estribos} onChange={v => set('estribos', v)} />
                                <DocumentCard icon={Droplets} label="Plumillas" 
                                    value={data.plumillas} onChange={v => set('plumillas', v)} />
                                <DocumentCard icon={ShieldCheck} label="Cinturones" 
                                    value={data.cinturones} onChange={v => set('cinturones', v)} />
                                <DocumentCard icon={Zap} label="Combustible" 
                                    value={data.indicadorCombustible} onChange={v => set('indicadorCombustible', v)} />
                                <DocumentCard icon={Settings} label="Temperatura" 
                                    value={data.indicadorTemperatura} onChange={v => set('indicadorTemperatura', v)} />
                                <DocumentCard icon={Gauge} label="Velocímetro" 
                                    value={data.velocimetro} onChange={v => set('velocimetro', v)} />
                                <DocumentCard icon={Activity} label="Tacómetro" 
                                    value={data.tacometro} onChange={v => set('tacometro', v)} />
                                <DocumentCard icon={FileBadge} label="Monitor Viaje" 
                                    value={data.monitorViaje} onChange={v => set('monitorViaje', v)} />
                            </VehicleZone>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={Gauge} title="Kilometraje" />
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Kilometraje Inicial *</label>
                                    <input type="number" placeholder="Ej. 85230"
                                        value={data.kilometrajeInicial}
                                        onChange={e => set('kilometrajeInicial', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-blue focus:border-ises-blue min-h-[3.5rem] font-bold" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Km Final Jornada Anterior</label>
                                    <input type="number" placeholder="Ej. 85100"
                                        value={data.kilometrajeFinalAnterior}
                                        onChange={e => set('kilometrajeFinalAnterior', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-blue focus:border-ises-blue min-h-[3.5rem] font-bold" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── PASO 6: MANDOS ── */}
                    {step === 6 && (
                        <div className="space-y-6 page-enter pb-4">
                            <div className="flex items-center gap-3 mb-4 px-1">
                                <div className="p-3 bg-ises-green/10 rounded-xl">
                                    <Settings className="w-6 h-6 text-ises-green" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-ises-dark tracking-tight">Mandos del Vehículo</h2>
                                    <p className="text-sm text-slate-500 font-semibold leading-tight mt-0.5">Confirma el estado de los controles de conducción.</p>
                                </div>
                            </div>

                            <VehicleZone 
                                title="Controles y Pedales" 
                                imageSrc="/img/mandos.png"
                            >
                                <DocumentCard icon={Zap} label="Bocina / Pito" 
                                    value={data.pitoBocina} onChange={v => set('pitoBocina', v)} />
                                <DocumentCard icon={ChevronRight} label="Acelerador" 
                                    value={data.acelerador} onChange={v => set('acelerador', v)} />
                                <DocumentCard icon={AlertOctagon} label="Freno" 
                                    value={data.pedalFreno} onChange={v => set('pedalFreno', v)} />
                                <DocumentCard icon={Settings} label="Embrague" 
                                    value={data.embrague} onChange={v => set('embrague', v)} />
                                <DocumentCard icon={ShieldCheck} label="Freno de Mano" 
                                    value={data.frenoSeguridad} onChange={v => set('frenoSeguridad', v)} />
                                <DocumentCard icon={Activity} label="Cambios" 
                                    value={data.barraCambios} onChange={v => set('barraCambios', v)} />
                                <DocumentCard icon={Gauge} label="Dirección" 
                                    value={data.sistDireccion} onChange={v => set('sistDireccion', v)} />
                            </VehicleZone>
                        </div>
                    )}

                    {/* ── PASO 7: SILUETA 2D ── */}
                    {step === 7 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                                <SectionHeader icon={Car} title="Mapa de Daños" />
                                <p className="text-sm text-slate-500 font-semibold mt-1 mb-4">
                                    Toca las zonas de la silueta donde veas daños nuevos. Los pines grises son daños previos heredados.
                                </p>
                                <DamageMapCarro pins={data.damagePins} onChange={pins => set('damagePins', pins)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 8: EQUIPO DE CARRETERA ── */}
                    {step === 8 && (
                        <div className="space-y-6 page-enter pb-4">
                            <div className="flex items-center gap-3 mb-4 px-1">
                                <div className="p-3 bg-ises-green/10 rounded-xl">
                                    <Package className="w-6 h-6 text-ises-green" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-ises-dark tracking-tight">Equipo de Carretera</h2>
                                    <p className="text-sm text-slate-500 font-semibold leading-tight mt-0.5">Verifica las herramientas y equipo de prevención.</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <DocumentCard imageSrc="/img/equipo/botiquin.png" icon={PlusSquare} label="Botiquín" 
                                    value={data.botiquin} onChange={v => set('botiquin', v)} />
                                <DocumentCard imageSrc="/img/equipo/extintor.png" icon={Flame} label="Extintor" 
                                    value={data.extintor} onChange={v => set('extintor', v)} />
                                <DocumentCard imageSrc="/img/equipo/gato.png" icon={ArrowUpCircle} label="Gato" 
                                    value={data.gato} onChange={v => set('gato', v)} />
                                <DocumentCard imageSrc="/img/equipo/cruceta.png" icon={Wrench} label="Cruceta" 
                                    value={data.cruceta} onChange={v => set('cruceta', v)} />
                                <DocumentCard imageSrc="/img/equipo/senales.png" icon={AlertTriangle} label="Señales" 
                                    value={data.senalesCarretera} onChange={v => set('senalesCarretera', v)} />
                                <DocumentCard imageSrc="/img/equipo/tacos.png" icon={Triangle} label="Tacos" 
                                    value={data.tacos} onChange={v => set('tacos', v)} />
                                <DocumentCard imageSrc="/img/equipo/alicate.png" icon={PenTool} label="Alicate" 
                                    value={data.alicate} onChange={v => set('alicate', v)} />
                                <DocumentCard imageSrc="/img/equipo/destornilladores.png" icon={PenTool} label="Destornillador" 
                                    value={data.destornilladores} onChange={v => set('destornilladores', v)} />
                                <DocumentCard imageSrc="/img/equipo/llavesExpansion.png" icon={Wrench} label="Llave Exp." 
                                    value={data.llavesExpansion} onChange={v => set('llavesExpansion', v)} />
                                <DocumentCard imageSrc="/img/equipo/llavesFijas.png" icon={Wrench} label="Llaves Fijas" 
                                    value={data.llavesFijas} onChange={v => set('llavesFijas', v)} />
                                <DocumentCard imageSrc="/img/equipo/llantaRepuesto.png" icon={LifeBuoy} label="Repuesto" 
                                    value={data.llantaRepuesto} onChange={v => set('llantaRepuesto', v)} />
                                <DocumentCard imageSrc="/img/equipo/linterna.png" icon={Flashlight} label="Linterna" 
                                    value={data.linterna} onChange={v => set('linterna', v)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 9: CIERRE ── */}
                    {step === 9 && (
                        <div className="space-y-6 page-enter pb-8">
                            {/* Sección Llantas Visual */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Car className="w-32 h-32 text-ises-dark" />
                                </div>
                                <SectionHeader icon={ShieldCheck} title="Estado de Llantas" />
                                <p className="text-xs text-slate-500 font-semibold mb-6">Toca cada llanta para cambiar el estado del labrado (Verde &gt; Amarillo &gt; Rojo).</p>
                                
                                <TireSystem data={data} onChange={set} />
                                
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <DocumentCard icon={Settings} label="Rines y Pernos" 
                                        value={data.rinesPernos} onChange={v => set('rinesPernos', v)} />
                                </div>
                            </div>

                            {/* Otros Datos y Firma */}
                            <div className="bg-ises-dark p-6 rounded-3xl shadow-xl space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg text-white">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg">Cierre de Inspección</h3>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <TouchToggle label="¿El vehículo es APTO PARA OPERAR?" white={true}
                                            value={data.motoOpera} onChange={v => set('motoOpera', v)} />
                                    </div>

                                    {data.motoOpera === false && (
                                        <div className="flex flex-col gap-2">
                                            <label className="font-bold text-white text-sm">Descripción de Restricción</label>
                                            <textarea rows={2} placeholder="Indica por qué no puede operar..."
                                                value={data.restriccion}
                                                onChange={e => set('restriccion', e.target.value)}
                                                className="w-full p-4 bg-red-900/40 border border-red-500/50 rounded-2xl text-white text-sm outline-none focus:ring-2 focus:ring-red-500 font-semibold resize-none" />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Kilometraje Final</label>
                                        <input type="number" placeholder="Ej: 76590"
                                            value={data.kilometrajeFinal}
                                            onChange={e => set('kilometrajeFinal', e.target.value)}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-ises-green transition-all" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Fecha Recarga Extintor</label>
                                        <input type="date"
                                            value={data.fechaExtintor}
                                            onChange={e => set('fechaExtintor', e.target.value)}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold outline-none focus:ring-2 focus:ring-ises-green transition-all" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Observaciones</label>
                                        <textarea rows={2} placeholder="¿Alguna novedad extra?..."
                                            value={data.observaciones}
                                            onChange={e => set('observaciones', e.target.value)}
                                            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-sm outline-none focus:ring-2 focus:ring-ises-green font-semibold resize-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Firma del Conductor</label>
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-inner">
                                        <SignatureCanvas ref={sigRef} penColor="#0f172a"
                                            canvasProps={{ className: 'w-full cursor-crosshair', height: 160, style: { width: '100%' } }} />
                                    </div>
                                    <div className="flex justify-end">
                                        <button onClick={() => sigRef.current?.clear()}
                                            className="text-[10px] uppercase tracking-tighter font-black text-rose-500 hover:text-rose-400 py-2">
                                            Borrar y Reintentar
                                        </button>
                                    </div>
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
                                        ? 'bg-gradient-to-r from-ises-blue to-ises-blue-dark text-white shadow-lg shadow-ises-blue/20 hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'}`}>
                                Siguiente Paso <ChevronRight className="w-6 h-6" />
                            </button>
                        ) : (
                            <button onClick={save} disabled={!isValid()}
                                className={`w-full py-4 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all duration-300 min-h-[4rem]
                  ${isValid()
                                        ? 'bg-gradient-to-r from-ises-green to-ises-green-dark text-white shadow-lg shadow-ises-green/20 hover:scale-[1.02] active:scale-[0.98]'
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
