import React from 'react';
import { CheckCircle2, FileText, Download, RotateCcw } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

export default function SuccessScreen({ data, onReset }) {
    
    const handleExportPDF = async () => {
        const element = document.getElementById('inspection-report');
        const opt = {
            margin: [5, 5, 5, 5],
            filename: `Inspeccion_${data.vehiculoTipo}_${new Date().toLocaleDateString()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                onclone: async (clonedDoc) => {
                    const style = clonedDoc.createElement('style');
                    style.innerHTML = `
                        #inspection-report { background-color: #ffffff !important; color: #333333 !important; padding: 20px !important; }
                        .text-ises-dark { color: #1e293b !important; }
                        .text-ises-green { color: #99CC33 !important; }
                        .text-ises-blue { color: #0099CC !important; }
                        .bg-ises-green { background-color: #99CC33 !important; }
                        .border-ises-green { border-color: #99CC33 !important; }
                        .bg-slate-50 { background-color: #f8fafc !important; }
                        .bg-slate-100 { background-color: #f1f5f9 !important; }
                    `;
                    clonedDoc.head.appendChild(style);

                    const stripOklch = (text) => text.replace(/([a-zA-Z0-9-]+)\s*:\s*([^;}]*oklch[^;}]*)(;|\})/gi, (m, prop, val, end) => end === '}' ? '}' : '');
                    
                    clonedDoc.querySelectorAll('style').forEach(s => {
                        if (s.textContent && s.textContent.includes('oklch')) {
                            s.textContent = stripOklch(s.textContent);
                        }
                    });

                    clonedDoc.querySelectorAll('[style]').forEach(el => {
                        const styleAttr = el.getAttribute('style');
                        if (styleAttr && styleAttr.includes('oklch')) {
                            el.setAttribute('style', stripOklch(styleAttr));
                        }
                    });

                    // External sheets fix (crucial for Production/Vercel)
                    const linkEls = Array.from(clonedDoc.querySelectorAll('link[rel="stylesheet"]'));
                    await Promise.all(linkEls.map(async (link) => {
                        try {
                            const res = await fetch(link.href);
                            let cssText = await res.text();
                            if (cssText.includes('oklch')) {
                                cssText = stripOklch(cssText);
                            }
                            const inlineStyle = clonedDoc.createElement('style');
                            inlineStyle.textContent = cssText;
                            link.parentNode.replaceChild(inlineStyle, link);
                        } catch (e) {
                            link.remove();
                        }
                    }));
                }
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleExportExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([data]);
        XLSX.utils.book_append_sheet(wb, ws, "Inspeccion");
        XLSX.writeFile(wb, `FPO_${data.vehiculoTipo}_${new Date().getTime()}.xlsx`);
    };

    const isMoto = data.vehiculoTipo === 'moto';

    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-6 flex flex-col items-center justify-center font-sans overflow-auto py-10">
            <div className="w-full max-w-2xl flex flex-col gap-6">
                
                <div className="bg-slate-800 p-8 rounded-3xl text-white shadow-2xl border border-white/5 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-ises-green/20 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-500">
                        <CheckCircle2 className="text-ises-green w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-white leading-tight">¡Inspección Completada!</h2>
                    <p className="text-slate-400 text-sm mt-2 font-medium">
                        El registro ha sido procesado exitosamente. Ahora puedes descargar el reporte oficial.
                    </p>
                </div>

                {/* Previsualización Estilo FPO ATS */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200" id="inspection-report">
                    {/* Header Reporte */}
                    <div className="bg-gradient-to-r from-ises-green to-ises-green-dark p-6 flex justify-between items-end text-white">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Certificado de Inspección</p>
                            <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">Pre-Operacional {isMoto ? 'Moto' : 'Vehículo'}</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black">{new Date(data.fechaInspeccion).toLocaleString()}</p>
                            <p className="text-[9px] font-bold uppercase opacity-70">Fecha y Hora Registro</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Info General */}
                        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Identidad Vehículo</p>
                                <p className="text-lg font-black text-ises-dark">{isMoto ? 'MOTOCICLETA' : 'VEHÍCULO 4 RUEDAS'}</p>
                            </div>
                            <div className="text-right grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">KM Inicial</p>
                                    <p className="text-sm font-black text-ises-blue">{data.kilometrajeInicial}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">KM Final</p>
                                    <p className="text-sm font-black text-ises-green">{data.kilometrajeFinal || '---'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bloque 1: Salud y Operatividad */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <h3 className="bg-slate-100 px-3 py-2 text-[10px] font-black text-ises-dark uppercase border-b border-slate-200">1. Salud del Conductor</h3>
                                <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-slate-500">¿Buen estado de alerta?</span>
                                        <span className={`font-black ${data.buenEstado ? 'text-ises-green' : 'text-red-500'}`}>{data.buenEstado ? 'SÍ' : 'NO'}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-slate-500">¿Descanso suficiente?</span>
                                        <span className={`font-black ${data.descansoSuficiente ? 'text-ises-green' : 'text-red-500'}`}>{data.descansoSuficiente ? 'SÍ' : 'NO'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <h3 className="bg-slate-100 px-3 py-2 text-[10px] font-black text-ises-dark uppercase border-b border-slate-200">2. Estado Operativo</h3>
                                <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-slate-500">¿Puede operar?</span>
                                        <span className={`font-black ${data.motoOpera ? 'text-ises-green' : 'text-red-500'}`}>{data.motoOpera ? 'SÍ' : 'NO'}</span>
                                    </div>
                                    {data.restriccion && (
                                        <p className="text-[9px] text-red-500 font-bold italic mt-1 line-clamp-1">Obs: {data.restriccion}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Bloque 2: REPORTE DETALLADO (Moto vs Carro) */}
                        <div className="space-y-4">
                            <h3 className="bg-slate-100 px-3 py-2 text-[10px] font-black text-ises-dark uppercase border border-slate-200 rounded-t-xl flex justify-between">
                                <span>3. Verificación Técnica de Sistemas</span>
                                <span className="text-ises-blue opacity-70">VALORACIÓN INTEGRAL</span>
                            </h3>

                            <div className="border border-slate-200 rounded-b-xl overflow-hidden p-4 bg-white space-y-6">
                                {isMoto ? (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                            {[
                                                { k: 'Llantas', v: data.estadoLlantas },
                                                { k: 'Espejos', v: data.espejosRetrovisores },
                                                { k: 'Frenos', v: data.frenos },
                                                { k: 'Luces', v: data.lucesAltas },
                                                { k: 'Tanque', v: data.tanqueCombustible },
                                                { k: 'Cojinería', v: data.cojineria },
                                                { k: 'Exhosto', v: data.tuboEscape },
                                                { k: 'Batería', v: data.bateria },
                                                { k: 'Clutch', v: data.clutch },
                                                { k: 'Acelerador', v: data.acelerador },
                                                { k: 'Dirección', v: data.direccion },
                                                { k: 'Cadena/Guayas', v: data.guayas },
                                                { k: 'Reposapiés', v: data.reposapiés },
                                                { k: 'Pito', v: data.pito },
                                                { k: 'Limpieza', v: data.limpiezaGeneral },
                                                { k: 'Fugas', v: data.fugaLiquidos },
                                            ].map(item => (
                                                <div key={item.k} className="flex justify-between items-center border-b border-slate-50 pb-1">
                                                    <span className="text-[10px] font-bold text-slate-500">{item.k}</span>
                                                    <span className={`text-[10px] font-black ${item.v ? 'text-ises-green' : 'text-red-500'}`}>{item.v ? 'OK' : 'FALLA'}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Presiones y Niveles Moto */}
                                        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-slate-100">
                                            <div>
                                                <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Presión Llantas (PSI)</h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                                                        <p className="text-[7px] font-black text-slate-400">DEL.</p>
                                                        <p className="text-[10px] font-black text-ises-dark">{data.presionDelantera} PSI</p>
                                                    </div>
                                                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                                                        <p className="text-[7px] font-black text-slate-400">TRAS.</p>
                                                        <p className="text-[10px] font-black text-ises-dark">{data.presionTrasera} PSI</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Niveles de Fluidos</h4>
                                                <div className="grid grid-cols-3 gap-1">
                                                    {[
                                                        { l: 'GAS', v: data.nivelCombustible },
                                                        { l: 'ACEITE', v: data.nivelAceite },
                                                        { l: 'FRENOS', v: data.nivelFrenos }
                                                    ].map(i => (
                                                        <div key={i.l} className="bg-slate-50 p-1 rounded-lg text-center border border-slate-100">
                                                            <p className="text-[6px] font-black text-slate-400">{i.l}</p>
                                                            <p className="text-[9px] font-black text-ises-green">{i.v}%</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Kit Moto */}
                                        <div className="pt-2">
                                            <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Kit de Herramientas</h4>
                                            <div className="grid grid-cols-5 gap-1">
                                                {[
                                                    { l: 'Alicate', v: data.alicate },
                                                    { l: 'D. Pala', v: data.destornilladorPala },
                                                    { l: 'D. Est.', v: data.destornilladorEstrella },
                                                    { l: 'Llave Exp.', v: data.llaveExpansion },
                                                    { l: 'Llave Buj.', v: data.llavesBujia }
                                                ].map(i => (
                                                    <div key={i.l} className="flex flex-col items-center justify-center p-1 rounded bg-slate-50 border border-slate-100">
                                                        <span className="text-[6px] font-black text-slate-400 uppercase text-center truncate w-full">{i.l}</span>
                                                        <div className={`w-1 h-1 rounded-full mt-1 ${i.v ? 'bg-ises-green' : 'bg-red-500'}`}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Grid de Secciones Técnicas (Carro) */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Documentos e Iluminación */}
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Documentación</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            { l: 'Tarjeta', v: data.tarjetaPropiedad }, { l: 'SOAT', v: data.soat },
                                                            { l: 'Licencia', v: data.licenciaConduccion }, { l: 'Técnico', v: data.revisionTecnomecanica },
                                                            { l: 'Multas', v: data.sinComparendos }
                                                        ].map(i => (
                                                            <div key={i.l} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-md">
                                                                  <span className="text-[8px] font-bold text-slate-500">{i.l}</span>
                                                                <span className={`text-[8px] font-black ${i.v ? 'text-ises-green' : 'text-red-500'}`}>{i.v ? 'OK' : 'F'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Iluminación</h4>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {[
                                                            { l: 'Altas/Bajas', v: data.lucesAltasbajas }, { l: 'Direc. Del.', v: data.direccionalesDelanteros },
                                                            { l: 'Parqueo Del.', v: data.parqueoDelantero }, { l: 'Freno/Señal', v: data.frenoSenalTrasera },
                                                            { l: 'Direc. Tras.', v: data.direccionalesTraseros }, { l: 'Parqueo Tras.', v: data.parqueoTrasero },
                                                            { l: 'Rotación', v: data.rotacionCabina }, { l: 'Internas', v: data.lucesInternas }
                                                        ].map(i => (
                                                            <div key={i.l} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-md">
                                                                <span className="text-[7px] font-bold text-slate-500 truncate mr-1">{i.l}</span>
                                                                <span className={`text-[8px] font-black ${i.v ? 'text-ises-green' : 'text-red-500'}`}>{i.v ? 'OK' : 'F'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Cabina e Instrumentos</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            { l: 'Pito', v: data.pitoBocina }, { l: 'Plumillas', v: data.plumillas },
                                                            { l: 'Elevavidrios', v: data.elevavidrios }, { l: 'Cinturones', v: data.cinturones },
                                                            { l: 'Retrovisores', v: data.espejosRetrovisores }, { l: 'Silletería', v: data.silleteria },
                                                            { l: 'Acelerador', v: data.acelerador }, { l: 'Freno', v: data.pedalFreno },
                                                            { l: 'Embrague', v: data.embrague }, { l: 'Dirección', v: data.sistDireccion },
                                                            { l: 'Freno Seg.', v: data.frenoSeguridad }, { l: 'Cambios', v: data.barraCambios }
                                                        ].map(i => (
                                                            <div key={i.l} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-md">
                                                                <span className="text-[8px] font-bold text-slate-500">{i.l}</span>
                                                                <span className={`text-[8px] font-black ${i.v ? 'text-ises-green' : 'text-red-500'}`}>{i.v ? 'OK' : 'F'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Monitor e Indicadores</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {[
                                                            { l: 'Combustible', v: data.indicadorCombustible }, { l: 'Temperatura', v: data.indicadorTemperatura },
                                                            { l: 'Velocímetro', v: data.velocimetro }, { l: 'Tacómetro', v: data.tacometro },
                                                            { l: 'Monitor Viaje', v: data.monitorViaje }, { l: 'Puertas', v: data.puertas },
                                                            { l: 'Parabrisas', v: data.parabrisas }, { l: 'Latas Cab.', v: data.latasCabina },
                                                            { l: 'Estribos', v: data.estribos }
                                                        ].map(i => (
                                                            <div key={i.l} className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-md">
                                                                <span className="text-[8px] font-bold text-slate-500">{i.l}</span>
                                                                <span className={`text-[8px] font-black ${i.v ? 'text-ises-green' : 'text-red-500'}`}>{i.v ? 'OK' : 'F'}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Equipo de Carretera - Visual Reducido (Carro) */}
                                        <div className="pt-2">
                                            <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Equipo de Carretera</h4>
                                            <div className="grid grid-cols-4 md:grid-cols-6 gap-1">
                                                {[
                                                    { l: 'Botiquín', v: data.botiquin }, { l: 'Extintor', v: data.extintor },
                                                    { l: 'Gato', v: data.gato }, { l: 'Cruceta', v: data.cruceta },
                                                    { l: 'Señales', v: data.senalesCarretera }, { l: 'Tacos', v: data.tacos },
                                                    { l: 'Alicate', v: data.alicate }, { l: 'Destorn.', v: data.destornilladores },
                                                    { l: 'Llave Exp.', v: data.llavesExpansion }, { l: 'Llaves F.', v: data.llavesFijas },
                                                    { l: 'Repuesto', v: data.llantaRepuesto }, { l: 'Linterna', v: data.linterna }
                                                ].map(i => (
                                                    <div key={i.l} className="flex flex-col items-center justify-center p-1 rounded bg-slate-50 border border-slate-100">
                                                        <span className="text-[6px] font-black text-slate-400 uppercase text-center truncate w-full">{i.l}</span>
                                                        <div className={`w-1 h-1 rounded-full mt-1 ${i.v ? 'bg-ises-green' : 'bg-red-500'}`}></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Llantas (Carro) */}
                                        <div className="grid grid-cols-2 gap-6 pt-2">
                                            <div>
                                                <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Estado Llantas</h4>
                                                <div className="grid grid-cols-2 gap-2 text-center">
                                                    {[
                                                        { l: 'DI', v: data.llantaDI }, { l: 'DD', v: data.llantaDD },
                                                        { l: 'TI', v: data.llantaTI }, { l: 'TD', v: data.llantaTD }
                                                    ].map(i => {
                                                        const colors = ['bg-red-500', 'bg-yellow-400', 'bg-ises-green'];
                                                        return (
                                                            <div key={i.l} className="flex flex-col items-center bg-slate-50 p-1 rounded-lg">
                                                                <span className="text-[8px] font-black text-slate-500">{i.l}</span>
                                                                <div className={`w-full h-1.5 rounded-full mt-1 ${colors[i.v] || 'bg-slate-200'}`}></div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="flex justify-between items-center bg-slate-50 px-2 py-1 rounded-md mt-2">
                                                    <span className="text-[8px] font-bold text-slate-500 uppercase">Rines y Pernos</span>
                                                    <span className={`text-[8px] font-black ${data.rinesPernos ? 'text-ises-green' : 'text-red-500'}`}>{data.rinesPernos ? 'OK' : 'F'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Mapa de Daños (Común para Moto y Carro) */}
                                <div className="pt-4 mt-2 border-t border-slate-100">
                                    <h4 className="text-[9px] font-black text-ises-blue uppercase mb-2">Mapa de Daños / Novedades</h4>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 min-h-12 flex flex-col justify-center">
                                        {(data.damagePins || []).length === 0 ? (
                                            <span className="text-[9px] font-bold text-slate-400 italic text-center">Sin novedades registradas en el mapa</span>
                                        ) : (
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                {(data.damagePins || []).map((pin, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 border-b border-slate-200/50 last:border-0 pb-1">
                                                        <span className="text-[9px]">{pin.emoji}</span>
                                                        <div className="flex flex-col">
                                                            <span className="text-[8px] font-black text-ises-dark uppercase leading-tight">{pin.side || pin.zone || 'General'}</span>
                                                            <span className="text-[7px] font-bold text-slate-400 uppercase leading-tight">{pin.label}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Observaciones */}
                        <div className="space-y-2">
                            <h3 className="text-[10px] font-black text-ises-green uppercase tracking-widest border-b border-ises-green/20 pb-1">4. Observaciones Finales</h3>
                            <p className="text-[11px] font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 italic leading-relaxed">
                                "{data.observaciones || 'El técnico inspeccionó todos los puntos críticos sin reportar novedades adicionales fuera de las marcadas en el checklist.'}"
                            </p>
                        </div>

                        {/* Firmas */}
                        <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-2">
                            {data.firma ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-56 h-28 border-b-2 border-slate-200 flex items-center justify-center bg-white shadow-inner rounded-xl overflow-hidden mb-2">
                                        <img src={data.firma} alt="Firma Conductor" className="max-h-full object-contain" />
                                    </div>
                                    <p className="text-[10px] font-black text-ises-dark uppercase tracking-widest">Firma del Conductor Autorizado</p>
                                    <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Validado por Sistema Pre-Operacional ISES</p>
                                </div>
                            ) : (
                                <div className="text-center py-10 opacity-20 italic font-bold text-slate-400">
                                    Documento sin firma digital registrada
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Footer Pie */}
                    <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                        <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.4em]">SISTEMA DE GESTIÓN DE FLOTA — ISES S.A.S</p>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleExportPDF}
                            className="py-5 bg-white text-slate-900 rounded-3xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-xl border border-slate-200 active:scale-95 group">
                            <div className="p-2 bg-red-100 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <Download className="w-5 h-5" />
                            </div>
                            Descargar PDF
                        </button>
                        <button onClick={handleExportExcel}
                            className="py-5 bg-white text-slate-900 rounded-3xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-xl border border-slate-200 active:scale-95 group">
                            <div className="p-2 bg-green-100 rounded-xl group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <FileText className="w-5 h-5" />
                            </div>
                            Descargar Excel
                        </button>
                    </div>
                    <button onClick={onReset}
                        className="w-full py-5 bg-gradient-to-r from-ises-blue to-ises-blue-dark text-white rounded-3xl font-black hover:shadow-ises-blue/30 hover:shadow-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98]">
                        <RotateCcw className="w-6 h-6" /> Iniciar Nueva Inspección
                    </button>
                </div>

            </div>
        </div>
    );
}
