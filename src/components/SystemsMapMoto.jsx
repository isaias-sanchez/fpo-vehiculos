import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

// ─── Hotspot Dot ──────────────────────────────────────────────────────
// Shows a colored dot. On tap: toggles state AND shows a popup tooltip
// that auto-hides after 2 seconds. No permanently-visible overlapping labels.
const Hotspot = ({ x, y, label, value, onChange }) => {
    const [showTip, setShowTip] = useState(false);
    const isOk = value !== false;

    const handleClick = () => {
        onChange(!isOk);
        setShowTip(true);
        setTimeout(() => setShowTip(false), 2200);
    };

    // Determine if label should go left or right based on horizontal position
    const tipSide = x > 50 ? 'right' : 'left';

    return (
        <button
            type="button"
            onClick={handleClick}
            style={{ left: `${x}%`, top: `${y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            title={label}
        >
            {/* Ping animation only when there's a fault */}
            {!isOk && (
                <span className="absolute inset-0 rounded-full bg-red-400 opacity-60 animate-ping" />
            )}

            {/* Main dot */}
            <span className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200
                ${isOk
                    ? 'bg-ises-green shadow-ises-green/50'
                    : 'bg-red-500 shadow-red-500/70 scale-110'
                }`}>
                {isOk
                    ? <CheckCircle2 className="w-4 h-4 text-white" />
                    : <XCircle className="w-4 h-4 text-white" />
                }
            </span>

            {/* Tooltip — only shows briefly on tap */}
            {showTip && (
                <span className={`absolute top-1/2 -translate-y-1/2 z-20
                    whitespace-nowrap px-2.5 py-1.5 rounded-xl text-[11px] font-bold shadow-xl
                    ${tipSide === 'right' ? 'right-10' : 'left-10'}
                    ${isOk ? 'bg-ises-green text-white' : 'bg-red-500 text-white'}`}>
                    {isOk ? '✅' : '❌'} {label}
                </span>
            )}
        </button>
    );
};

// ─── Status Row (clickable legend item) ───────────────────────────────
const StatusRow = ({ label, value, onChange }) => {
    const isOk = value !== false;
    return (
        <button type="button" onClick={() => onChange(!isOk)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200
                ${isOk
                    ? 'border-ises-green/20 bg-ises-green/5 text-ises-dark'
                    : 'border-red-400 bg-red-50 text-red-700'
                }`}>
            {isOk
                ? <CheckCircle2 className="w-4 h-4 text-ises-green flex-shrink-0" />
                : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            }
            <span className="flex-1 text-left leading-tight">{label}</span>
        </button>
    );
};

// ─── Perspective Views Config ─────────────────────────────────────────
// x/y = % of the aspect-ratio container (paddingBottom: 58%).
// Images rendered with object-contain inside this container.
// LATERAL view: rear of moto is on the LEFT, front on the RIGHT.
// Dots are spread clearly with at least 15% vertical gap to avoid overlap.
const VIEWS = [
    {
        id: 'lateral',
        label: 'Lateral',
        emoji: '↔️',
        img: '/moto_lateral.png',
        hotspots: [
            { key: 'stopFreno', label: 'Stop / Freno Trasero', x: 22, y: 45 },
            { key: 'lucesDir_tras', label: 'Direccional Trasera', x: 22, y: 65 },
            { key: 'lucesAltas', label: 'Faro Delantero', x: 83, y: 45 },
            { key: 'lucesDir_del', label: 'Direccional Delantera', x: 83, y: 65 },
        ],
    },
    {
        id: 'frontal',
        label: 'Frontal',
        emoji: '⬆️',
        img: '/moto_frontal.png',
        hotspots: [
            { key: 'pito', label: 'Pito / Bocina', x: 44, y: 28 },
            { key: 'lucesAltas', label: 'Faro Principal', x: 58, y: 55 },
            { key: 'lucesDir_del', label: 'Direccional Izq.', x: 31, y: 52 },
        ],
    },
    {
        id: 'trasera',
        label: 'Trasera',
        emoji: '↩️',
        img: '/moto_trasera.png',
        hotspots: [
            { key: 'stopFreno', label: 'Stop / Freno Trasero', x: 36, y: 36 },
            { key: 'lucesDir_tras', label: 'Direccional Trasera', x: 26, y: 53 },
        ],
    },
];

// Items without a vehicle perspective zone
const EXTRA_ITEMS = [
    { key: 'velocimetro', label: 'Velocímetro / ODO', emoji: '🏁' },
    { key: 'encendido', label: 'Encendido', emoji: '🔑' },
    { key: 'testigos', label: 'Testigos de Tablero', emoji: '💡' },
    { key: 'impermeable', label: 'Impermeable', emoji: '🧥' },
    { key: 'medidorPresion', label: 'Medidor PSI Llantas', emoji: '🛞' },
    { key: 'cascoCertificado', label: 'Casco Certificado', emoji: '⛑️' },
    { key: 'chalecoReflectivo', label: 'Chaleco Reflectivo', emoji: '🦺' },
];

// ─── Main Component ──────────────────────────────────────────────────
export default function SystemsMapMoto({ data, onChange }) {
    const [activeView, setActiveView] = useState('lateral');

    const set = (key, val) => onChange({ ...data, [key]: val });
    const currentView = VIEWS.find(v => v.id === activeView);

    const faultsInView = (view) =>
        view.hotspots.filter(h => data[h.key] === false).length;

    return (
        <div className="space-y-4">

            {/* ── Tab Selector ── */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
                {VIEWS.map(view => {
                    const faults = faultsInView(view);
                    return (
                        <button key={view.id} type="button"
                            onClick={() => setActiveView(view.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl font-bold text-xs transition-all duration-200 relative
                                ${activeView === view.id
                                    ? 'bg-white shadow-md text-ises-dark'
                                    : 'text-slate-500'}`}>
                            <span>{view.emoji}</span>
                            <span>{view.label}</span>
                            {faults > 0 && (
                                <span className="absolute -top-1.5 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                                    {faults}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* ── Instruction ── */}
            <p className="text-[11px] text-center text-slate-400 font-semibold">
                Toca un punto 🟢 para reportar falla — el punto cambia a 🔴
            </p>

            {/* ── Photo + Hotspot Dots (aspect-ratio box for stable coords) ── */}
            <div className="relative w-full bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl overflow-hidden border border-slate-200"
                style={{ paddingBottom: '58%' }}>
                <img
                    key={activeView}
                    src={currentView.img}
                    alt={`Vista ${currentView.label}`}
                    className="absolute inset-0 w-full h-full object-contain p-3"
                />
                {currentView.hotspots.map(h => (
                    <Hotspot
                        key={h.key}
                        x={h.x} y={h.y}
                        label={h.label}
                        value={data[h.key] !== false}
                        onChange={(isOk) => set(h.key, isOk)}
                    />
                ))}
            </div>

            {/* ── Legend: clickable status rows for current view ── */}
            <div className="grid grid-cols-2 gap-2">
                {currentView.hotspots.map(h => (
                    <StatusRow key={h.key}
                        label={h.label}
                        value={data[h.key] !== false}
                        onChange={(isOk) => set(h.key, isOk)}
                    />
                ))}
            </div>

            {/* ── Tablero y Dotación ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tablero y Dotación Personal</p>
                <div className="grid grid-cols-2 gap-2">
                    {EXTRA_ITEMS.map(item => {
                        const isOk = data[item.key] !== false;
                        return (
                            <button key={item.key} type="button"
                                onClick={() => set(item.key, !isOk)}
                                className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 text-left
                                    ${isOk
                                        ? 'border-ises-green/20 bg-ises-green/5 text-ises-dark'
                                        : 'border-red-400 bg-red-50 text-red-700'}`}>
                                <span className="text-base">{item.emoji}</span>
                                <span className="text-xs font-bold leading-tight flex-1">{item.label}</span>
                                {isOk
                                    ? <CheckCircle2 className="w-4 h-4 text-ises-green flex-shrink-0" />
                                    : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                }
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
