import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessScreen({ data, onReset }) {
    return (
        <div className="min-h-screen bg-slate-900 p-4 md:p-6 flex flex-col items-center justify-center font-mono">
            <div className="bg-slate-800 p-6 md:p-8 rounded-2xl w-full max-w-2xl text-green-400 overflow-hidden shadow-2xl border border-slate-700 flex flex-col" style={{ height: '90vh' }}>

                <div className="flex flex-col items-center text-center gap-3 mb-6 flex-shrink-0">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="text-green-500 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white font-sans">¡Inspección Guardada!</h2>
                    <p className="text-slate-400 text-sm font-sans max-w-md">
                        Los datos han sido validados y almacenados localmente. Se sincronizarán automáticamente cuando haya conexión a internet.
                    </p>
                </div>

                <div className="flex-1 overflow-auto bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 relative group">
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-slate-500 font-sans px-2 py-1 bg-slate-800 rounded">Estructura de Datos</span>
                    </div>
                    <pre className="text-xs md:text-sm whitespace-pre-wrap font-mono leading-relaxed">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>

                <button
                    onClick={onReset}
                    className="mt-6 w-full py-4 bg-ises-green text-white rounded-xl font-sans font-bold hover:bg-ises-green-dark transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-lg"
                >
                    Nueva Inspección
                </button>
            </div>
        </div>
    );
}
