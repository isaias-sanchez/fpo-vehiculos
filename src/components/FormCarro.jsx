import React, { useState } from 'react';
import {
    ChevronRight, CheckCircle2, XCircle, Save, AlertTriangle,
    Gauge, Droplets, Activity, Zap, Package, ClipboardCheck, Car, Lightbulb, Settings
} from 'lucide-react';
import DamageMapCarro from './DamageMapCarro';
import SignatureCanvas from 'react-signature-canvas';

// ─── Shared Sub-Components ────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title }) => (
    <h2 className="text-lg font-bold text-ises-dark border-b border-slate-100 pb-3 flex items-center gap-2">
        <div className="p-2 bg-ises-green/10 rounded-lg">
            <Icon className="w-5 h-5 text-ises-green" />
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

// ─── Initial State ────────────────────────────────────────────────────
const INITIAL_DATA = {
    // Paso 1: Salud
    buenEstado: null, descansoSuficiente: null,
    // Paso 2: Documentación
    sinComparendos: null, tarjetaPropiedad: null, soat: null,
    licenciaConduccion: null, revisionTecnomecanica: null,
    // Paso 3: Luces
    lucesAltasbajas: null, direccionalesDelanteros: null, direccionalesTraseros: null,
    frenoSenalTrasera: null, parqueoDelantero: null, parqueoTrasero: null,
    rotacionCabina: null, lucesInternas: null,
    // Paso 4: Cabina
    latasCabina: null, puertas: null, elevavidrios: null, parabrisas: null, silleteria: null,
    // Paso 5: Tablero + Km
    espejosRetrovisores: null, estribos: null, plumillas: null, cinturones: null,
    indicadorCombustible: null, indicadorTemperatura: null, velocimetro: null, tacometro: null,
    monitorViaje: null, kilometrajeInicial: '', kilometrajeFinalAnterior: '',
    // Paso 6: Mandos
    pitoBocina: null, acelerador: null, pedalFreno: null, embrague: null,
    frenoSeguridad: null, barraCambios: null, sistDireccion: null,
    // Paso 7: Mapa daños
    damagePins: [],
    // Paso 8: Equipo carretera
    botiquin: null, extintor: null, gato: null, cruceta: null,
    senalesCarretera: null, tacos: null, alicate: null, destornilladores: null,
    llavesExpansion: null, llavesFijas: null, llantaRepuesto: null, linterna: null,
    // Paso 9: Cierre
    estadoLlantasTraseras: null, estadoLlantasDelanteras: null, rinesPernos: null,
    observaciones: '', fechaExtintor: '', firma: null,
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
            case 9: return [data.estadoLlantasTraseras, data.estadoLlantasDelanteras, data.rinesPernos].every(v => v !== null);
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
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={ClipboardCheck} title="Documentación" />
                                <ChecklistRow label="Sin comparendos registrados en organismos de tránsito"
                                    value={data.sinComparendos} onChange={v => set('sinComparendos', v)} />
                                <ChecklistRow label="Tarjeta de propiedad"
                                    value={data.tarjetaPropiedad} onChange={v => set('tarjetaPropiedad', v)} />
                                <ChecklistRow label="Seguro obligatorio (SOAT)"
                                    value={data.soat} onChange={v => set('soat', v)} />
                                <ChecklistRow label="Licencia de conducción"
                                    value={data.licenciaConduccion} onChange={v => set('licenciaConduccion', v)} />
                                <ChecklistRow label="Revisión técnico-mecánica"
                                    value={data.revisionTecnomecanica} onChange={v => set('revisionTecnomecanica', v)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 3: LUCES ── */}
                    {step === 3 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={Lightbulb} title="Luces" />
                                <ChecklistRow label="Altas/bajas" value={data.lucesAltasbajas} onChange={v => set('lucesAltasbajas', v)} />
                                <ChecklistRow label="Direccionales delanteros" value={data.direccionalesDelanteros} onChange={v => set('direccionalesDelanteros', v)} />
                                <ChecklistRow label="Direccionales traseros" value={data.direccionalesTraseros} onChange={v => set('direccionalesTraseros', v)} />
                                <ChecklistRow label="De freno y señal trasera" value={data.frenoSenalTrasera} onChange={v => set('frenoSenalTrasera', v)} />
                                <ChecklistRow label="De parqueo delantero" value={data.parqueoDelantero} onChange={v => set('parqueoDelantero', v)} />
                                <ChecklistRow label="De parqueo trasero" value={data.parqueoTrasero} onChange={v => set('parqueoTrasero', v)} />
                                <ChecklistRow label="De rotación sobre la cabina" value={data.rotacionCabina} onChange={v => set('rotacionCabina', v)} />
                                <ChecklistRow label="Luces internas de cabina" value={data.lucesInternas} onChange={v => set('lucesInternas', v)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 4: CABINA ── */}
                    {step === 4 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={Car} title="Cabina" />
                                <ChecklistRow label="Latas cabina" value={data.latasCabina} onChange={v => set('latasCabina', v)} />
                                <ChecklistRow label="Estado de las puertas" value={data.puertas} onChange={v => set('puertas', v)} />
                                <ChecklistRow label="Elevavidrios" value={data.elevavidrios} onChange={v => set('elevavidrios', v)} />
                                <ChecklistRow label="Parabrisas" value={data.parabrisas} onChange={v => set('parabrisas', v)} />
                                <ChecklistRow label="Silletería" value={data.silleteria} onChange={v => set('silleteria', v)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 5: TABLERO + KM ── */}
                    {step === 5 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={Gauge} title="Tablero e Instrumentos" />
                                <ChecklistRow label="Espejos retrovisores" value={data.espejosRetrovisores} onChange={v => set('espejosRetrovisores', v)} />
                                <ChecklistRow label="Estribos" value={data.estribos} onChange={v => set('estribos', v)} />
                                <ChecklistRow label="Plumillas" value={data.plumillas} onChange={v => set('plumillas', v)} />
                                <ChecklistRow label="Cinturones de seguridad" value={data.cinturones} onChange={v => set('cinturones', v)} />
                                <ChecklistRow label="Indicador de nivel de combustible" value={data.indicadorCombustible} onChange={v => set('indicadorCombustible', v)} />
                                <ChecklistRow label="Indicador de temperatura" value={data.indicadorTemperatura} onChange={v => set('indicadorTemperatura', v)} />
                                <ChecklistRow label="Velocímetro" value={data.velocimetro} onChange={v => set('velocimetro', v)} />
                                <ChecklistRow label="Tacómetro" value={data.tacometro} onChange={v => set('tacometro', v)} />
                                <ChecklistRow label="Monitor de viaje Drive Right" value={data.monitorViaje} onChange={v => set('monitorViaje', v)} />
                            </div>

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
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={Settings} title="Mandos" />
                                <ChecklistRow label="Pito bocina" value={data.pitoBocina} onChange={v => set('pitoBocina', v)} />
                                <ChecklistRow label="Acelerador" value={data.acelerador} onChange={v => set('acelerador', v)} />
                                <ChecklistRow label="Pedal del freno" value={data.pedalFreno} onChange={v => set('pedalFreno', v)} />
                                <ChecklistRow label="Embrague" value={data.embrague} onChange={v => set('embrague', v)} />
                                <ChecklistRow label="Frenos de seguridad" value={data.frenoSeguridad} onChange={v => set('frenoSeguridad', v)} />
                                <ChecklistRow label="Barra de cambios" value={data.barraCambios} onChange={v => set('barraCambios', v)} />
                                <ChecklistRow label="Sistema de dirección" value={data.sistDireccion} onChange={v => set('sistDireccion', v)} />
                            </div>
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
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-3">
                                <SectionHeader icon={Package} title="Equipo de Carretera" />
                                <ChecklistRow label="Botiquín" value={data.botiquin} onChange={v => set('botiquin', v)} />
                                <ChecklistRow label="Extintor multipropósito" value={data.extintor} onChange={v => set('extintor', v)} />
                                <ChecklistRow label="Gato" value={data.gato} onChange={v => set('gato', v)} />
                                <ChecklistRow label="Cruceta" value={data.cruceta} onChange={v => set('cruceta', v)} />
                                <ChecklistRow label="Dos señales de carretera (triángulos o lámpara intermitente)"
                                    value={data.senalesCarretera} onChange={v => set('senalesCarretera', v)} />
                                <ChecklistRow label="Dos tacos" value={data.tacos} onChange={v => set('tacos', v)} />
                                <ChecklistRow label="Alicate" value={data.alicate} onChange={v => set('alicate', v)} />
                                <ChecklistRow label="Destornilladores" value={data.destornilladores} onChange={v => set('destornilladores', v)} />
                                <ChecklistRow label="Llaves de expansión" value={data.llavesExpansion} onChange={v => set('llavesExpansion', v)} />
                                <ChecklistRow label="Llaves fijas" value={data.llavesFijas} onChange={v => set('llavesFijas', v)} />
                                <ChecklistRow label="Llanta de repuesto" value={data.llantaRepuesto} onChange={v => set('llantaRepuesto', v)} />
                                <ChecklistRow label="Linterna" value={data.linterna} onChange={v => set('linterna', v)} />
                            </div>
                        </div>
                    )}

                    {/* ── PASO 9: CIERRE ── */}
                    {step === 9 && (
                        <div className="space-y-5 page-enter">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={ClipboardCheck} title="Labrado de Llantas y Cierre" />
                                <ChecklistRow label="Estado de llantas traseras" value={data.estadoLlantasTraseras} onChange={v => set('estadoLlantasTraseras', v)} />
                                <ChecklistRow label="Estado de llantas delanteras" value={data.estadoLlantasDelanteras} onChange={v => set('estadoLlantasDelanteras', v)} />
                                <ChecklistRow label="Rines y Pernos" value={data.rinesPernos} onChange={v => set('rinesPernos', v)} />
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                                <SectionHeader icon={ClipboardCheck} title="Observaciones y Firma" />

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Observaciones</label>
                                    <textarea rows={3} placeholder="Novedades adicionales..."
                                        value={data.observaciones}
                                        onChange={e => set('observaciones', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-ises-blue font-semibold resize-none" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-bold text-ises-dark text-sm">Fecha próxima de recarga de extintor</label>
                                    <input type="date"
                                        value={data.fechaExtintor}
                                        onChange={e => set('fechaExtintor', e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-base outline-none focus:ring-2 focus:ring-ises-blue focus:border-ises-blue min-h-[3.5rem] font-bold" />
                                </div>

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
