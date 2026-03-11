import React from 'react';
import { CheckCircle2, FileText, Download, RotateCcw } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

export default function SuccessScreen({ data, onReset }) {
    
    const handleExportPDF = () => {
        const element = document.getElementById('inspection-report');
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `Inspeccion_${data.vehiculoTipo}_${new Date().toLocaleDateString()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                onclone: (clonedDoc) => {
                    // Fix for html2canvas crashing with oklch colors
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
                }
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };

    const handleExportExcel = () => {
        const wb = XLSX.utils.book_new();
        
        // Flatten the data for Excel
        const generalInfo = {
            Tipo_Vehiculo: data.vehiculoTipo,
            Fecha_Inspeccion: data.fechaInspeccion,
            Buen_Estado_Salud: data.buenEstado ? 'SÍ' : 'NO',
            Descanso_Suficiente: data.descansoSuficiente ? 'SÍ' : 'NO',
            Kilometraje_Inicial: data.kilometrajeInicial,
            Moto_Puede_Operar: data.motoOpera ? 'SÍ' : 'NO',
            Restriccion: data.restriccion || 'N/A',
            Observaciones: data.observaciones || 'Sin observaciones'
        };

        const ws = XLSX.utils.json_to_sheet([generalInfo]);
        XLSX.utils.book_append_sheet(wb, ws, "Resumen General");
        
        XLSX.writeFile(wb, `Inspeccion_${data.vehiculoTipo}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-6 flex flex-col items-center justify-center font-sans">
            <div className="bg-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-2xl text-white shadow-2xl border border-white/5 flex flex-col overflow-hidden max-h-[95vh]">

                <div className="flex flex-col items-center text-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-16 h-16 bg-ises-green/20 rounded-full flex items-center justify-center mb-2 animate-bounce">
                        <CheckCircle2 className="text-ises-green w-10 h-10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-white">¡Inspección Finalizada!</h2>
                    <p className="text-slate-400 text-sm max-w-md font-medium">
                        El reporte ha sido generado exitosamente. Puedes descargarlo en PDF o Excel a continuación.
                    </p>
                </div>

                {/* Report Preview (Hidden or Scaled for PDF generation) */}
                <div className="flex-1 overflow-auto bg-white text-slate-900 rounded-2xl p-6 border border-slate-200 mb-6 shadow-inner" id="inspection-report">
                    <div className="border-b-2 border-ises-green pb-4 mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-black text-ises-dark uppercase tracking-tight">Reporte de Inspección</h1>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{data.vehiculoTipo === 'moto' ? 'Motocicleta' : 'Vehículo 4 Ruedas'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-black text-ises-dark">{new Date(data.fechaInspeccion).toLocaleDateString()}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Registro</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black text-ises-green uppercase tracking-[0.2em] border-b border-ises-green/20 pb-1">Estado de Salud</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500">Buen estado de alerta:</span>
                                    <span className={`font-black ${data.buenEstado ? 'text-ises-green' : 'text-red-500'}`}>{data.buenEstado ? 'SÍ' : 'NO'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500">Descanso suficiente:</span>
                                    <span className={`font-black ${data.descansoSuficiente ? 'text-ises-green' : 'text-red-500'}`}>{data.descansoSuficiente ? 'SÍ' : 'NO'}</span>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black text-ises-green uppercase tracking-[0.2em] border-b border-ises-green/20 pb-1">Operación</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500">¿Puede operar?:</span>
                                    <span className={`font-black ${data.motoOpera ? 'text-ises-green' : 'text-red-500'}`}>{data.motoOpera ? 'SÍ' : 'NO'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500">Kilometraje:</span>
                                    <span className="font-black text-ises-dark">{data.kilometrajeInicial} KM</span>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h3 className="text-[10px] font-black text-ises-green uppercase tracking-[0.2em] border-b border-ises-green/20 pb-1">Observaciones</h3>
                        <p className="text-xs font-semibold text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                            "{data.observaciones || 'El técnico no reportó observaciones adicionales durante esta inspección.'}"
                        </p>
                    </div>

                    {data.firma && (
                        <div className="mt-12 flex flex-col items-center gap-2">
                            <div className="w-48 h-24 border-b-2 border-slate-300 flex items-center justify-center">
                                <img src={data.firma} alt="Firma del conductor" className="max-h-full object-contain" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Firma del Conductor</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 flex-shrink-0">
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={handleExportPDF}
                            className="py-4 bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-600 transition-all flex items-center justify-center gap-2 shadow-lg border border-white/10 active:scale-95">
                            <Download className="w-5 h-5 text-red-400" /> Descargar PDF
                        </button>
                        <button onClick={handleExportExcel}
                            className="py-4 bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-600 transition-all flex items-center justify-center gap-2 shadow-lg border border-white/10 active:scale-95">
                            <FileText className="w-5 h-5 text-green-400" /> Excel
                        </button>
                    </div>
                    <button onClick={onReset}
                        className="w-full py-4 bg-ises-green text-white rounded-2xl font-black hover:bg-ises-green-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-ises-green/20 active:scale-95">
                        <RotateCcw className="w-5 h-5" /> Nueva Inspección
                    </button>
                </div>
            </div>
        </div>
    );
}
