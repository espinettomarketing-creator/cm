import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { SPECIES_CONFIG } from '../utils/petHelpers';
import { 
  Camera, 
  Calendar, 
  Clock, 
  Footprints, 
  Utensils, 
  Smile, 
  Heart, 
  Sparkles,
  Filter,
  Plus
} from 'lucide-react';
import { PetProfile } from '../types/pet';

interface DailyReportsFeedProps {
  onOpenDetail: (pet: PetProfile) => void;
}

export const DailyReportsFeed: React.FC<DailyReportsFeedProps> = ({ onOpenDetail }) => {
  const { dailyReports, pets, setTargetPetForReport, setIsAddReportModalOpen } = usePet();
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('todos');

  const filteredReports = dailyReports.filter((r) => {
    if (selectedPetFilter === 'todos') return true;
    return r.petId === selectedPetFilter;
  });

  const handleCreateReport = () => {
    if (pets.length > 0) {
      setTargetPetForReport(pets[0]);
      setIsAddReportModalOpen(true);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Seguimiento Diario con Fotos & Reportes</span>
          </div>
          <h2 className="text-3xl font-black font-display text-slate-900 tracking-tight">
            Diario de Cuidados & Aventuras
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Cada día nuestros cuidadores envían fotografías, estados de ánimo, tiempos de paseo y resúmenes de comidas para la total tranquilidad de los tutores.
          </p>
        </div>

        <button
          onClick={handleCreateReport}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Nuevo Reporte</span>
        </button>
      </div>

      {/* Filter by Pet */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filtrar por Mascota:
        </span>
        <button
          onClick={() => setSelectedPetFilter('todos')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
            selectedPetFilter === 'todos'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Todas las Mascotas ({dailyReports.length})
        </button>

        {pets.map((pet) => {
          const count = dailyReports.filter((r) => r.petId === pet.id).length;
          const isSel = selectedPetFilter === pet.id;
          return (
            <button
              key={pet.id}
              onClick={() => setSelectedPetFilter(pet.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSel
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{SPECIES_CONFIG[pet.species]?.emoji}</span>
              <span>{pet.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSel ? 'bg-white/30 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Reports Feed */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const pet = pets.find((p) => p.id === report.petId);
            const species = pet ? SPECIES_CONFIG[pet.species] : null;

            return (
              <div 
                key={report.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Photo */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={report.photoUrl}
                    alt={pet ? pet.name : 'Foto reporte'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {pet && (
                    <div 
                      onClick={() => onOpenDetail(pet)}
                      className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs cursor-pointer hover:bg-white"
                    >
                      <span>{species?.emoji}</span>
                      <span className="text-xs font-bold text-slate-900">{pet.name}</span>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-400" />
                      {report.date} • {report.time}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-[10px]">
                      {report.serviceType.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Status chips */}
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        Ánimo: {report.mood.replace('_', ' ')}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        Comida: {report.foodStatus.replace('_', ' ')}
                      </span>
                      {report.walkMinutes && (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 font-bold border border-blue-200 flex items-center gap-1">
                          <Footprints className="w-3 h-3 text-blue-600" />
                          <span>{report.walkMinutes} min paseo</span>
                        </span>
                      )}
                    </div>

                    {/* Summary Note */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      "{report.summaryNote}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">
                      Cuidador: {report.caregiverName}
                    </span>
                    {pet && (
                      <button
                        onClick={() => onOpenDetail(pet)}
                        className="text-orange-600 font-bold hover:underline"
                      >
                        Ver Mascota →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 space-y-3">
          <Camera className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">No hay reportes para este filtro.</h4>
          <p className="text-xs text-slate-400">Pulsa en "Añadir Nuevo Reporte" para registrar el seguimiento de hoy.</p>
        </div>
      )}

    </div>
  );
};
