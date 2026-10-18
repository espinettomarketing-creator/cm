import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { PetProfile } from '../types/pet';
import { SPECIES_CONFIG, SERVICE_STATUS_LABELS, formatAge } from '../utils/petHelpers';
import { CuidadosMiauLogo } from './CuidadosMiauLogo';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Phone, 
  Pill, 
  Utensils, 
  Camera, 
  CheckCircle, 
  Eye, 
  Clock, 
  MapPin, 
  Sparkles,
  Search,
  Filter,
  CheckSquare,
  ShieldAlert
} from 'lucide-react';

interface CaregiverPortalProps {
  onOpenDetail: (pet: PetProfile) => void;
  onOpenQuickCaregiver: (pet: PetProfile) => void;
}

export const CaregiverPortal: React.FC<CaregiverPortalProps> = ({ onOpenDetail, onOpenQuickCaregiver }) => {
  const { pets, setTargetPetForReport, setIsAddReportModalOpen, dailyReports } = usePet();
  const [filterType, setFilterType] = useState<'todos' | 'guarderia_cuidador' | 'guarderia_domicilio' | 'paseo_activo'>('todos');
  const [search, setSearch] = useState('');

  // Pre-shift safety checklist interactive state
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    harness: true,
    doubleDoor: true,
    vetNumber: true,
    waterChecked: true,
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredPets = pets.filter(p => {
    const matchesFilter = filterType === 'todos' || p.currentServiceStatus === filterType;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.breed.toLowerCase().includes(search.toLowerCase()) ||
                          p.ownerName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCarePets = pets.filter(p => p.currentServiceStatus !== 'en_casa_con_tutor');
  const petsWithMeds = pets.filter(p => p.medications.length > 0);
  const petsWithAllergies = pets.filter(p => p.hasAllergies);

  const handleCreateReport = (pet: PetProfile) => {
    setTargetPetForReport(pet);
    setIsAddReportModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Portal Hero Header with Brand Palette (Deep Navy Blue & Warm Orange) */}
      <div className="bg-gradient-to-r from-[#014A75] via-[#0B2545] to-[#0277BD] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-900/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#F58220]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#F58220]/30 text-amber-200 border border-[#F58220]/40">
              <ShieldCheck className="w-4 h-4 text-[#F58220]" />
              <span>Acceso Exclusivo para el Personal de Cuidadores</span>
            </div>
            <div className="flex items-center gap-3">
              <CuidadosMiauLogo size="sm" />
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
                Panel Operativo & Fichas de Cuidado
              </h1>
            </div>
            <p className="text-sky-100 text-sm max-w-2xl leading-relaxed">
              Consulta en tiempo real los requerimientos alimentarios, miedos, protocolos de emergencia y teléfonos directos de veterinarios para cada mascota bajo tu cuidado en Cuidados Miau.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center min-w-[140px]">
              <span className="text-2xl font-black text-[#F58220]">{activeCarePets.length}</span>
              <p className="text-[11px] text-sky-200 font-medium">Mascotas en Turno</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-center min-w-[140px]">
              <span className="text-2xl font-black text-rose-400">{petsWithAllergies.length}</span>
              <p className="text-[11px] text-sky-200 font-medium">Alertas de Alergias</p>
            </div>
          </div>
        </div>

        {/* Safety Protocol Quick Checklist for Staff */}
        <div className="mt-6 pt-6 border-t border-sky-800/60">
          <p className="text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2 flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            <span>Protocolo de Seguridad Antes de Iniciar Turno / Paseo / Visita:</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <button
              onClick={() => toggleCheck('harness')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                checklist.harness ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${checklist.harness ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Arnés y correa anti-escape asegurados</span>
            </button>

            <button
              onClick={() => toggleCheck('doubleDoor')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                checklist.doubleDoor ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${checklist.doubleDoor ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Doble puerta con gatos y aves cerrada</span>
            </button>

            <button
              onClick={() => toggleCheck('vetNumber')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                checklist.vetNumber ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${checklist.vetNumber ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Número de urgencias verificado</span>
            </button>

            <button
              onClick={() => toggleCheck('waterChecked')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-colors ${
                checklist.waterChecked ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${checklist.waterChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Agua fresca y medicación al día</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por mascota, raza o tutor..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0277BD]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setFilterType('todos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'todos' ? 'bg-[#014A75] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({pets.length})
          </button>

          <button
            onClick={() => setFilterType('guarderia_cuidador')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'guarderia_cuidador' ? 'bg-[#F58220] text-white' : 'bg-[#FFF5EC] text-[#E06D0C] hover:bg-orange-100'
            }`}
          >
            Hospedaje Familiar ({pets.filter(p => p.currentServiceStatus === 'guarderia_cuidador').length})
          </button>

          <button
            onClick={() => setFilterType('guarderia_domicilio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'guarderia_domicilio' ? 'bg-[#0277BD] text-white' : 'bg-[#EBF5FB] text-[#0277BD] hover:bg-sky-100'
            }`}
          >
            A Domicilio ({pets.filter(p => p.currentServiceStatus === 'guarderia_domicilio').length})
          </button>

          <button
            onClick={() => setFilterType('paseo_activo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterType === 'paseo_activo' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Paseos Activos ({pets.filter(p => p.currentServiceStatus === 'paseo_activo').length})
          </button>
        </div>

      </div>

      {/* Grid of Caregiver Rapid Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => {
          const species = SPECIES_CONFIG[pet.species] || SPECIES_CONFIG.otro;
          const status = SERVICE_STATUS_LABELS[pet.currentServiceStatus] || SERVICE_STATUS_LABELS.en_casa_con_tutor;

          return (
            <div 
              key={pet.id}
              className="bg-white rounded-3xl border-2 border-slate-200 hover:border-[#0277BD] shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4"
            >
              {/* Pet Quick Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={pet.avatarUrl}
                      alt={pet.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full p-0.5 shadow-xs">
                      {species.emoji}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black font-display text-slate-900 flex items-center gap-1.5">
                      {pet.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {pet.breed} • {formatAge(pet.ageYears, pet.ageMonths)}
                    </p>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${status.bg}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQuickCaregiver(pet)}
                  className="p-2 rounded-xl bg-[#EBF5FB] text-[#0277BD] hover:bg-[#D5EAF8] transition-colors"
                  title="Ficha rápida del cuidador"
                >
                  <ShieldCheck className="w-5 h-5 text-[#0277BD]" />
                </button>
              </div>

              {/* CRITICAL CARE CALLOUT */}
              <div className="space-y-2 text-xs">
                {pet.hasAllergies && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-medium">
                    <span className="font-extrabold flex items-center gap-1 text-rose-700">
                      <AlertTriangle className="w-3.5 h-3.5" /> ALERGIA GRAVE:
                    </span>
                    <span className="font-bold">{pet.allergiesList.join(', ')}</span>
                  </div>
                )}

                {pet.medications.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    <span className="font-bold flex items-center gap-1 text-amber-800">
                      <Pill className="w-3.5 h-3.5" /> MEDICACIÓN A SUMINISTRAR:
                    </span>
                    <p className="font-medium text-[11px] mt-0.5">
                      {pet.medications.map(m => `${m.name} (${m.dose} - ${m.frequency})`).join('; ')}
                    </p>
                  </div>
                )}

                {/* Diet Summary */}
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-700">
                  <span className="font-bold flex items-center gap-1 text-[#014A75]">
                    <Utensils className="w-3.5 h-3.5 text-[#0277BD]" /> DIETA & HORARIOS:
                  </span>
                  <p className="text-[11px] mt-0.5">
                    {pet.portionsPerDay} tomas ({pet.feedingTimes.join(' y ')}): {pet.portionQuantity}
                  </p>
                </div>

                {/* Fears & triggers */}
                {pet.fearsList.length > 0 && (
                  <div className="p-2 rounded-xl bg-purple-50/70 border border-purple-200 text-[11px] text-purple-900">
                    <span className="font-bold">Miedos:</span> {pet.fearsList.join(', ')}
                  </div>
                )}
              </div>

              {/* Emergency Calling Quick Row */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${pet.vetEmergencyPhone || pet.vetPhone}`}
                  className="py-2 px-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Vet Urgencias</span>
                </a>

                <a
                  href={`tel:${pet.ownerPhone}`}
                  className="py-2 px-2 rounded-xl bg-[#014A75] hover:bg-[#0A2540] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Tutor</span>
                </a>
              </div>

              {/* Action Buttons for Caregiver */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCreateReport(pet)}
                  className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Reporte Diario</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenDetail(pet)}
                  className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ficha Completa</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
