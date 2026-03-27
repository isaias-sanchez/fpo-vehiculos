import React, { useState, useRef } from 'react';

const DAMAGE_TYPES = [
    { key: 'golpe', label: 'Golpe', emoji: '💥', color: '#ef4444' },
    { key: 'rayon', label: 'Rayón', emoji: '✏️', color: '#f97316' },
    { key: 'raspon', label: 'Raspón', emoji: '🔴', color: '#eab308' },
    { key: 'vibracion', label: 'Vibración', emoji: '🔊', color: '#8b5cf6' },
    { key: 'fuga', label: 'Fuga', emoji: '💧', color: '#0099CC' },
];

function RadialMenu({ x, y, onSelect, onClose }) {
    const angles = [270, 342, 54, 126, 198];
    const radius = 50;
    return (
        <div
            className="fixed z-50 animate-in fade-in zoom-in duration-200"
            style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        >
            <div className="fixed inset-0 bg-black/10 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative z-50">
                {DAMAGE_TYPES.map((dt, i) => {
                    const angle = (angles[i] * Math.PI) / 180;
                    const dx = Math.cos(angle) * radius;
                    const dy = Math.sin(angle) * radius;
                    return (
                        <button
                            key={dt.key}
                            onClick={() => onSelect(dt)}
                            className="absolute flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-white shadow-xl text-white font-bold text-xs transition-all active:scale-90 hover:scale-105"
                            style={{
                                left: dx - 28,
                                top: dy - 28,
                                background: dt.color,
                            }}
                        >
                            <span className="text-xl leading-none">{dt.emoji}</span>
                            <span className="text-[9px] leading-tight mt-0.5">{dt.label}</span>
                        </button>
                    );
                })}
                <button
                    onClick={onClose}
                    className="absolute w-10 h-10 rounded-full bg-white border-2 border-slate-200 shadow-lg text-slate-400 font-bold text-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 hover:bg-slate-50"
                    style={{ left: 0, top: 0 }}
                >✕</button>
            </div>
        </div>
    );
}

export default function DamageMapMoto({ pins = [], onChange }) {
    const [view, setView] = useState(1); // 1: Izq, 2: Der
    const [menu, setMenu] = useState(null); 
    const containerRef = useRef(null);

    const handleContainerClick = (e) => {
        if (menu) {
            setMenu(null);
            return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMenu({ 
            clientX: e.clientX, 
            clientY: e.clientY, 
            x, 
            y 
        });
    };

    const handleSelect = (damageType) => {
        if (!menu) return;
        const newPin = {
            id: Date.now(),
            x: menu.x,
            y: menu.y,
            side: view === 1 ? 'Izquierdo' : 'Derecho',
            view: view,
            type: damageType.key,
            label: damageType.label,
            emoji: damageType.emoji,
            color: damageType.color,
        };
        onChange([...pins, newPin]);
        setMenu(null);
    };

    const removePin = (id) => onChange(pins.filter(p => p.id !== id));

    return (
        <div className="space-y-4">
            {/* Selector de Vista */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-sm">
                <button onClick={() => setView(1)}
                    className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${view === 1 ? 'bg-white text-ises-blue shadow-md' : 'text-slate-400 opacity-60'}`}>
                    LADO IZQUIERDO
                </button>
                <button onClick={() => setView(2)}
                    className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${view === 2 ? 'bg-white text-ises-blue shadow-md' : 'text-slate-400 opacity-60'}`}>
                    LADO DERECHO
                </button>
            </div>

            <div 
                ref={containerRef}
                onClick={handleContainerClick}
                className="relative w-full bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden cursor-crosshair shadow-inner transition-all duration-500"
                style={{ paddingBottom: '60%' }}
            >
                {/* Background Image - Dynamic based on view */}
                <img 
                    key={view}
                    src={view === 1 ? "/img/danos/suzuki_1.png" : "/img/danos/suzuki_2.png"} 
                    alt="Modelo Moto" 
                    className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 animate-in fade-in"
                />

                {/* Legend Overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-sm pointer-events-none z-10">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">
                        Vista: {view === 1 ? 'Lado A' : 'Lado B'}
                    </p>
                    <p className="text-xs font-bold text-ises-dark flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${view === 1 ? 'bg-ises-green' : 'bg-ises-blue'}`} />
                        Toca para marcar daño
                    </p>
                </div>

                {/* Pins - Filtered by current view */}
                {pins.filter(p => p.view === view).map(pin => (
                    <button
                        key={pin.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            removePin(pin.id);
                        }}
                        className="absolute flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-2xl transition-all active:scale-75 hover:scale-110 z-20"
                        style={{
                            left: `${pin.x}%`,
                            top: `${pin.y}%`,
                            transform: 'translate(-50%, -50%)',
                            background: pin.color,
                        }}
                    >
                        <span className="text-lg">{pin.emoji}</span>
                    </button>
                ))}

                {/* Radial Menu */}
                {menu && (
                    <RadialMenu
                        x={menu.clientX}
                        y={menu.clientY}
                        onSelect={handleSelect}
                        onClose={() => setMenu(null)}
                    />
                )}
            </div>

            {/* Damage List Table */}
            {pins.length > 0 && (
                <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Resumen de Hallazgos</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {pins.map(pin => (
                            <div key={pin.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm animate-in slide-in-from-left-2 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-inner" style={{ background: `${pin.color}20` }}>
                                        <span className="text-xl">{pin.emoji}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-ises-dark">{pin.label}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">{pin.side}</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => removePin(pin.id)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
