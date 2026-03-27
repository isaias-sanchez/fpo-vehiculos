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
        <svg viewBox="0 0 320 500" className="w-full h-full" style={{ maxHeight: 500 }}>
            {/* Fotos reales divididas horizontalmente */}
            <image href="/img/danos/kwid_1.png" x="0" y="0" width="320" height="250" preserveAspectRatio="xMidYMid slice" />
            <image href="/img/danos/kwid_2.png" x="0" y="250" width="320" height="250" preserveAspectRatio="xMidYMid slice" />

            {/* Malla transparente de clics para atrapar daños (Foto Superior - Frente y Laterales) */}
            <rect x="0" y="0" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Techo / Panorámico Izquierdo')} style={{ cursor: 'crosshair' }} />
            <rect x="160" y="0" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Panorámico / Lateral Derecho')} style={{ cursor: 'crosshair' }} />
            <rect x="0" y="125" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Bumper / Farolas Izquierdas')} style={{ cursor: 'crosshair' }} />
            <rect x="160" y="125" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Bumper / Llantas Derechas')} style={{ cursor: 'crosshair' }} />

            {/* Malla transparente de clics para atrapar daños (Foto Inferior - Cola y Laterales Traseros) */}
            <rect x="0" y="250" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Lateral / Puerta Trasera Izquierda')} style={{ cursor: 'crosshair' }} />
            <rect x="160" y="250" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Trasero / Baúl Superior')} style={{ cursor: 'crosshair' }} />
            <rect x="0" y="375" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Llantas Traseras Izquierdas')} style={{ cursor: 'crosshair' }} />
            <rect x="160" y="375" width="160" height="125" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="1" onClick={(e) => onZoneClick(e, 'Bumper Posterior / Stops')} style={{ cursor: 'crosshair' }} />
            
            {/* Línea divisoria de perspectivas */}
            <line x1="0" y1="250" x2="320" y2="250" stroke="#fff" strokeWidth="4" opacity="0.8" />
            <text x="160" y="22" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="800" style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}>VISTA FRENTE-LATERAL</text>
            <text x="160" y="272" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="800" style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.8)' }}>VISTA POSTERIOR</text>
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
