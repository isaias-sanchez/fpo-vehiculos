import React, { useState, useRef } from 'react';

const DAMAGE_TYPES = [
    { key: 'golpe', label: 'Golpe', emoji: '💥', color: '#ef4444' },
    { key: 'rayon', label: 'Rayón', emoji: '✏️', color: '#f97316' },
    { key: 'raspon', label: 'Raspón', emoji: '🔴', color: '#eab308' },
    { key: 'abolladura', label: 'Abolladura', emoji: '🔨', color: '#8b5cf6' },
    { key: 'fuga', label: 'Fuga', emoji: '💧', color: '#0099CC' },
];

function CarroSVG({ onZoneClick }) {
    return (
        <svg viewBox="0 0 320 500" className="w-full h-full" style={{ maxHeight: 440 }}>
            <defs>
                <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
            </defs>

            {/* Rear left wheel */}
            <ellipse cx="88" cy="415" rx="30" ry="17" fill="#64748b" stroke="#475569" strokeWidth="2" />
            <ellipse cx="88" cy="415" rx="17" ry="9" fill="#94a3b8" />

            {/* Rear right wheel */}
            <ellipse cx="232" cy="415" rx="30" ry="17" fill="#64748b" stroke="#475569" strokeWidth="2" />
            <ellipse cx="232" cy="415" rx="17" ry="9" fill="#94a3b8" />

            {/* Front left wheel */}
            <ellipse cx="88" cy="88" rx="30" ry="17" fill="#64748b" stroke="#475569" strokeWidth="2" />
            <ellipse cx="88" cy="88" rx="17" ry="9" fill="#94a3b8" />

            {/* Front right wheel */}
            <ellipse cx="232" cy="88" rx="30" ry="17" fill="#64748b" stroke="#475569" strokeWidth="2" />
            <ellipse cx="232" cy="88" rx="17" ry="9" fill="#94a3b8" />

            {/* Main body */}
            <rect x="100" y="80" width="120" height="340" rx="18" fill="url(#carBody)" stroke="#94a3b8" strokeWidth="2" />

            {/* Windshield front */}
            <rect x="108" y="98" width="104" height="60" rx="8" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" opacity="0.8" />
            <text x="160" y="133" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">PARABRISAS</text>

            {/* Roof / Cabin */}
            <rect x="104" y="155" width="112" height="130" rx="6" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="160" y="225" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">CABINA</text>

            {/* Windshield rear */}
            <rect x="108" y="280" width="104" height="55" rx="8" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1.5" opacity="0.8" />
            <text x="160" y="313" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">VIDRIO TRASERO</text>

            {/* Hood / Capó */}
            <rect x="108" y="332" width="104" height="70" rx="10" fill="#d1d5db" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="160" y="372" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">CAPÓ TRASERO</text>

            {/* Front bumper */}
            <rect x="105" y="422" width="110" height="22" rx="8" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
            <text x="160" y="437" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">BUMPER TRAS.</text>

            {/* Front hood / Cofre */}
            <rect x="108" y="100" width="104" height="0" rx="10" fill="#d1d5db" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Front area */}
            <rect x="108" y="55" width="104" height="48" rx="10" fill="#d1d5db" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="160" y="84" textAnchor="middle" fontSize="9" fill="#475569" fontWeight="bold">COFRE</text>

            {/* Front bumper */}
            <rect x="105" y="50" width="110" height="14" rx="6" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
            <text x="160" y="61" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">BUMPER DEL.</text>

            {/* Head lights front */}
            <rect x="108" y="44" width="30" height="14" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
            <rect x="182" y="44" width="30" height="14" rx="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            {/* Tail lights rear */}
            <rect x="108" y="440" width="30" height="14" rx="4" fill="#fca5a5" stroke="#dc2626" strokeWidth="1" />
            <rect x="182" y="440" width="30" height="14" rx="4" fill="#fca5a5" stroke="#dc2626" strokeWidth="1" />

            {/* Left doors */}
            <rect x="100" y="160" width="12" height="60" rx="4" fill="#b0bec5" stroke="#94a3b8" strokeWidth="1" />
            <text x="106" y="196" textAnchor="middle" fontSize="6" fill="#475569" fontWeight="bold" transform="rotate(-90 106 196)">PUERTA IZQ D.</text>
            <rect x="100" y="222" width="12" height="60" rx="4" fill="#b0bec5" stroke="#94a3b8" strokeWidth="1" />
            <text x="106" y="258" textAnchor="middle" fontSize="6" fill="#475569" fontWeight="bold" transform="rotate(-90 106 258)">PUERTA IZQ T.</text>

            {/* Right doors */}
            <rect x="208" y="160" width="12" height="60" rx="4" fill="#b0bec5" stroke="#94a3b8" strokeWidth="1" />
            <text x="214" y="196" textAnchor="middle" fontSize="6" fill="#475569" fontWeight="bold" transform="rotate(90 214 196)">PUERTA DER D.</text>
            <rect x="208" y="222" width="12" height="60" rx="4" fill="#b0bec5" stroke="#94a3b8" strokeWidth="1" />
            <text x="214" y="258" textAnchor="middle" fontSize="6" fill="#475569" fontWeight="bold" transform="rotate(90 214 258)">PUERTA DER T.</text>

            {/* Clickable zones */}
            <rect x="100" y="40" width="120" height="60" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Cofre / Capó Delantero')} style={{ cursor: 'pointer' }} />
            <rect x="100" y="265" width="120" height="80" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Capó Trasero / Maletero')} style={{ cursor: 'pointer' }} />
            <rect x="100" y="155" width="120" height="110" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Cabina / Techo')} style={{ cursor: 'pointer' }} />
            <rect x="85" y="155" width="20" height="65" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Puerta Izquierda Delantera')} style={{ cursor: 'pointer' }} />
            <rect x="85" y="220" width="20" height="65" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Puerta Izquierda Trasera')} style={{ cursor: 'pointer' }} />
            <rect x="215" y="155" width="20" height="65" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Puerta Derecha Delantera')} style={{ cursor: 'pointer' }} />
            <rect x="215" y="220" width="20" height="65" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Puerta Derecha Trasera')} style={{ cursor: 'pointer' }} />
            <ellipse cx="88" cy="88" rx="35" ry="22" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Llanta Delantera Izquierda')} style={{ cursor: 'pointer' }} />
            <ellipse cx="232" cy="88" rx="35" ry="22" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Llanta Delantera Derecha')} style={{ cursor: 'pointer' }} />
            <ellipse cx="88" cy="415" rx="35" ry="22" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Llanta Trasera Izquierda')} style={{ cursor: 'pointer' }} />
            <ellipse cx="232" cy="415" rx="35" ry="22" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Llanta Trasera Derecha')} style={{ cursor: 'pointer' }} />
            <rect x="100" y="96" width="120" height="64" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Parabrisas Delantero')} style={{ cursor: 'pointer' }} />
            <rect x="100" y="278" width="120" height="57" fill="transparent" stroke="transparent" strokeWidth="8"
                onClick={(e) => onZoneClick(e, 'Vidrio Trasero')} style={{ cursor: 'pointer' }} />
        </svg>
    );
}

function RadialMenu({ x, y, onSelect, onClose }) {
    const angles = [270, 342, 54, 126, 198];
    const radius = 48;
    return (
        <div className="radial-menu fixed z-50" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="relative z-50">
                {DAMAGE_TYPES.map((dt, i) => {
                    const angle = (angles[i] * Math.PI) / 180;
                    const dx = Math.cos(angle) * radius;
                    const dy = Math.sin(angle) * radius;
                    return (
                        <button key={dt.key} onClick={() => onSelect(dt)}
                            className="absolute flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-white shadow-xl text-white font-bold text-xs transition-all active:scale-95"
                            style={{ left: dx - 28, top: dy - 28, background: dt.color }}>
                            <span className="text-lg leading-none">{dt.emoji}</span>
                            <span className="text-[9px] leading-tight mt-0.5">{dt.label}</span>
                        </button>
                    );
                })}
                <button onClick={onClose}
                    className="absolute w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-lg text-slate-400 font-bold text-sm flex items-center justify-center"
                    style={{ left: -20, top: -20 }}>✕</button>
            </div>
        </div>
    );
}

export default function DamageMapCarro({ pins = [], onChange }) {
    const [menu, setMenu] = useState(null);
    const containerRef = useRef(null);

    const handleZoneClick = (e, zone) => {
        e.stopPropagation();
        const rect = e.currentTarget.closest('svg').getBoundingClientRect();
        const svgX = ((e.clientX - rect.left) / rect.width) * 320;
        const svgY = ((e.clientY - rect.top) / rect.height) * 500;
        setMenu({ x: e.clientX, y: e.clientY, svgX, svgY, zone });
    };

    const handleSelect = (damageType) => {
        if (!menu) return;
        onChange([...pins, {
            id: Date.now(), svgX: menu.svgX, svgY: menu.svgY,
            zone: menu.zone, type: damageType.key,
            label: damageType.label, emoji: damageType.emoji,
            color: damageType.color, inherited: false,
        }]);
        setMenu(null);
    };

    const removePin = (id) => onChange(pins.filter(p => p.id !== id));

    return (
        <div ref={containerRef} className="relative select-none">
            <div className="relative bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden" style={{ minHeight: 440 }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-5 text-[10rem] pointer-events-none">🚘</div>
                <CarroSVG onZoneClick={handleZoneClick} />
                {pins.map(pin => {
                    const container = containerRef.current;
                    const svgEl = container?.querySelector('svg');
                    if (!svgEl) return null;
                    const rect = svgEl.getBoundingClientRect();
                    const cRect = container.getBoundingClientRect();
                    const left = ((pin.svgX / 320) * rect.width) + (rect.left - cRect.left);
                    const top = ((pin.svgY / 500) * rect.height) + (rect.top - cRect.top);
                    return (
                        <button key={pin.id} onClick={() => removePin(pin.id)}
                            title={`${pin.zone} – ${pin.label}`}
                            className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg text-base transition-all active:scale-75 hover:scale-110"
                            style={{ left: left - 16, top: top - 16, background: pin.inherited ? '#9ca3af' : pin.color, zIndex: 20 }}>
                            {pin.emoji}
                        </button>
                    );
                })}
            </div>
            <p className="text-center text-xs text-slate-400 font-semibold mt-2">
                Toca una zona de la silueta para reportar un daño • Toca un pin para eliminarlo
            </p>
            {menu && <RadialMenu x={menu.x} y={menu.y} onSelect={handleSelect} onClose={() => setMenu(null)} />}
            {pins.length > 0 && (
                <div className="mt-3 space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Daños Registrados</p>
                    {pins.map(pin => (
                        <div key={pin.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2">
                            <div className="flex items-center gap-2">
                                <span className="text-base">{pin.emoji}</span>
                                <div>
                                    <p className="text-sm font-bold text-ises-dark leading-tight">{pin.zone}</p>
                                    <p className="text-xs text-slate-400 font-semibold">{pin.label}</p>
                                </div>
                            </div>
                            <button onClick={() => removePin(pin.id)} className="text-slate-300 hover:text-red-400 transition-colors p-1">✕</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
