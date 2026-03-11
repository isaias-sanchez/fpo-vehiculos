import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import FormMoto from './components/FormMoto';
import FormCarro from './components/FormCarro';
import SuccessScreen from './components/SuccessScreen';

function VehicleSelector({ onSelect }) {
  return (
    <div className="min-h-screen bg-ises-gray font-sans flex flex-col items-center">
      <div className="w-full max-w-lg bg-white min-h-screen flex flex-col shadow-xl">

        {/* Header */}
        <header className="bg-gradient-to-r from-ises-green to-ises-green-dark text-white p-6 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🚗</div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">FPO Vehículos</h1>
              <p className="text-white/80 text-xs font-semibold">Inspección Pre-Operacional</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center p-6 gap-6">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-extrabold text-ises-dark">¿Qué vehículo vas a inspeccionar?</h2>
            <p className="text-sm text-slate-500 font-semibold mt-2">Selecciona el tipo para comenzar la inspección</p>
          </div>

          {/* Moto Card */}
          <button
            onClick={() => onSelect('moto')}
            className="relative overflow-hidden bg-white border-2 border-slate-100 rounded-3xl p-6 text-left shadow-lg hover:border-ises-green hover:shadow-ises-green/20 hover:shadow-xl transition-all duration-300 active:scale-[0.98] group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-ises-green/5 rounded-full -mr-8 -mt-8 group-hover:bg-ises-green/10 transition-colors" />
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-ises-green/10 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">🏍️</div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-ises-dark">Motocicleta</h3>
                <p className="text-sm text-slate-500 font-semibold mt-0.5">2 ruedas — 7 pasos de inspección</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['Silueta 2D', 'Sliders PSI', 'Mapa de daños'].map(tag => (
                    <span key={tag} className="text-xs bg-ises-green/10 text-ises-green-dark font-bold px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-ises-green transition-colors flex-shrink-0" />
            </div>
          </button>

          {/* Carro Card */}
          <button
            onClick={() => onSelect('carro')}
            className="relative overflow-hidden bg-white border-2 border-slate-100 rounded-3xl p-6 text-left shadow-lg hover:border-ises-blue hover:shadow-ises-blue/20 hover:shadow-xl transition-all duration-300 active:scale-[0.98] group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-ises-blue/5 rounded-full -mr-8 -mt-8 group-hover:bg-ises-blue/10 transition-colors" />
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-ises-blue/10 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">🚘</div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-ises-dark">Vehículo 4 Ruedas</h3>
                <p className="text-sm text-slate-500 font-semibold mt-0.5">Carro/Camión — 9 pasos de inspección</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {['Silueta 2D', 'Cabina', 'Mapa de daños'].map(tag => (
                    <span key={tag} className="text-xs bg-ises-blue/10 text-ises-blue-dark font-bold px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-ises-blue transition-colors flex-shrink-0" />
            </div>
          </button>

          {/* Info Banner */}
          <div className="bg-ises-green/5 border border-ises-green/20 rounded-2xl p-4 flex gap-3 items-start">
            <span className="text-2xl flex-shrink-0">⚡</span>
            <div>
              <p className="text-sm font-bold text-ises-dark">Inspección 100% Visual</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5 leading-relaxed">
                Reporta daños directamente sobre la silueta del vehículo. Sin texto libre. Datos estructurados para el taller.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400 font-semibold">ISES S.A.S — Sistema de Gestión de Flota</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [vehicleType, setVehicleType] = useState(null);
  const [savedData, setSavedData] = useState(null);

  const handleSave = (data) => {
    setSavedData({ ...data, vehiculoTipo: vehicleType });
  };

  const handleReset = () => {
    setVehicleType(null);
    setSavedData(null);
  };

  if (savedData) {
    return <SuccessScreen data={savedData} onReset={handleReset} />;
  }

  if (!vehicleType) {
    return <VehicleSelector onSelect={setVehicleType} />;
  }

  if (vehicleType === 'moto') {
    return <FormMoto onSave={handleSave} onBack={() => setVehicleType(null)} />;
  }

  return <FormCarro onSave={handleSave} onBack={() => setVehicleType(null)} />;
}
