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
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Kilometraje Inicial</p>
                                <p className="text-lg font-black text-ises-blue">{data.kilometrajeInicial} <span className="text-xs">KM</span></p>
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

                        {/* Bloque 2: Resumen Técnico */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                            <h3 className="bg-slate-100 px-3 py-2 text-[10px] font-black text-ises-dark uppercase border-b border-slate-200 flex justify-between">
                                <span>3. Verificación de Sistemas</span>
                                <span className="text-ises-blue opacity-70">VALORACIÓN VISUAL</span>
                            </h3>
                            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                                {(isMoto ? [
                                    { k: 'Llantas', v: data.estadoLlantas },
                                    { k: 'Espejos', v: data.espejosRetrovisores },
                                    { k: 'Frenos', v: data.frenos },
                                    { k: 'Luces', v: data.lucesAltas },
                                    { k: 'Fugas', v: !data.fugaLiquidos }, // Fuga es bueno si es falso
                                    { k: 'Batería', v: data.bateria },
                                    { k: 'Cadena/Guayas', v: data.guayas },
                                    { k: 'Pito', v: data.pito },
                                ] : [
                                    { k: 'Llantas', v: data.estadoLlantas },
                                    { k: 'Frenos', v: data.frenos },
                                    { k: 'Luces', v: data.lucesAltas },
                                    { k: 'Nivel Aceite', v: data.nivelAceite },
                                    { k: 'Agua/Refrig.', v: data.nivelAgua },
                                ]).map(item => (
                                    <div key={item.k} className="flex justify-between items-center border-b border-slate-50 pb-1">
                                        <span className="text-[10px] font-bold text-slate-500">{item.k}</span>
                                        <span className={`text-[10px] font-black ${item.v ? 'text-ises-green' : 'text-red-500'}`}>{item.v ? 'OK' : 'FALLA'}</span>
                                    </div>
                                ))}
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
