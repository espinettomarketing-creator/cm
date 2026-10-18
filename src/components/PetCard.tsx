import React from 'react';
import { PetProfile } from '../types/pet';
import { SPECIES_CONFIG, SERVICE_STATUS_LABELS, formatAge } from '../utils/petHelpers';
import { usePet } from '../context/PetContext';
import { 
  AlertTriangle, 
  Pill, 
  ShieldAlert, 
  Sparkles, 
  Camera, 
  ExternalLink, 
  Edit3, 
  Phone, 
  Heart,
  CalendarCheck
} from 'lucide-react';

interface PetCardProps {
  pet: PetProfile;
  onOpenDetail: (pet: PetProfile) => void;
  onOpenQuickCaregiver: (pet: PetProfile) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onOpenDetail, onOpenQuickCaregiver }) => {
  const { setEditingPet, setIsCreateModalOpen, setTargetPetForReport, setIsAddReportModalOpen } = usePet();
  const species = SPECIES_CONFIG[pet.species] || SPECIES_CONFIG.otro;
  const statusInfo = SERVICE_STATUS_LABELS[pet.currentServiceStatus] || SERVICE_STATUS_LABELS.en_casa_con_tutor;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPet(pet);
    setIsCreateModalOpen(true);
  };

  const handleAddReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetPetForReport(pet);
    setIsAddReportModalOpen(true);
  };

  return (
    <div 
      onClick={() => onOpenDetail(pet)}
      className="group bg-white rounded-3xl border border-slate-200/90 hover:border-[#0277BD]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Top Image Section */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={pet.avatarUrl}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

        {/* Species Pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md shadow-xs">
          <span>{species.emoji}</span>
          <span className="text-[#014A75]">{species.label}</span>
        </div>

        {/* Status Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md border border-white/50 shadow-xs">
          <span className={`w-2 h-2 rounded-full ${statusInfo.dot} animate-pulse`} />
          <span className="text-slate-800 text-[11px]">{statusInfo.label}</span>
        </div>

        {/* Pet Name & Breed on image bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black font-display tracking-tight drop-shadow-sm flex items-center gap-2">
              {pet.name}
              {pet.isNeutered && (
                <span className="text-[10px] font-sans font-normal px-2 py-0.5 rounded-full bg-emerald-500/80 text-white backdrop-blur-xs">
                  Esterilizado/a
                </span>
              )}
            </h3>
            <span className="text-xs bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-full font-medium">
              {formatAge(pet.ageYears, pet.ageMonths)}
            </span>
          </div>
          <p className="text-xs text-slate-200 font-medium truncate mt-0.5">
            {pet.breed} • {pet.gender === 'macho' ? 'Macho' : 'Hembra'}
          </p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Critical Care Badges (Safety first) */}
        <div className="flex flex-wrap gap-1.5 min-h-[30px]">
          {pet.hasAllergies && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Alergia: {pet.allergiesList.slice(0, 1).join(', ')}{pet.allergiesList.length > 1 ? '...' : ''}</span>
            </span>
          )}

          {pet.medications.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <Pill className="w-3.5 h-3.5 text-amber-600" />
              <span>{pet.medications.length} {pet.medications.length === 1 ? 'Medicación' : 'Medicaciones'}</span>
            </span>
          )}

          {pet.fearsList.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-500" />
              <span>Miedo: {pet.fearsList[0]}</span>
            </span>
          )}

          {pet.vaccinationStatus === 'completa' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Vacunas al día</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
              <span>Vacunas pendientes</span>
            </span>
          )}
        </div>

        {/* Socialization bar */}
        <div className="bg-[#F8FAFC] p-2.5 rounded-2xl border border-slate-100 text-xs">
          <div className="flex items-center justify-between text-slate-500 font-semibold mb-1">
            <span>Sociabilidad & Convivencia:</span>
            <span className="text-[#0277BD] font-bold uppercase text-[10px]">
              Energía {pet.energyLevel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-xs">
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${pet.socialization.goodWithDogs ? 'text-emerald-700 bg-emerald-100/60 font-semibold' : 'text-slate-400 bg-slate-200/60 line-through'}`}>
              🐶 Perros
            </span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${pet.socialization.goodWithCats ? 'text-emerald-700 bg-emerald-100/60 font-semibold' : 'text-slate-400 bg-slate-200/60 line-through'}`}>
              🐱 Gatos
            </span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${pet.socialization.goodWithChildren ? 'text-emerald-700 bg-emerald-100/60 font-semibold' : 'text-slate-400 bg-slate-200/60 line-through'}`}>
              👶 Niños
            </span>
          </div>
        </div>

        {/* Quick note for caregiver */}
        {pet.caregiverQuickNotes && (
          <div className="p-2.5 rounded-xl bg-[#FFF5EC] border border-orange-200 text-xs text-slate-800">
            <div className="font-bold flex items-center gap-1 text-[#E06D0C] mb-0.5">
              <Sparkles className="w-3 h-3 text-[#F58220]" />
              <span>Instrucción del Cuidador:</span>
            </div>
            <p className="line-clamp-2 leading-relaxed text-slate-700">
              {pet.caregiverQuickNotes}
            </p>
          </div>
        )}

        {/* Tutor & Emergency Vet info footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">Tutor:</span> {pet.ownerName}
          </div>
          <a
            href={`tel:${pet.vetEmergencyPhone || pet.vetPhone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 font-bold text-rose-600 hover:text-rose-700 hover:underline"
            title="Llamar a urgencias veterinarias de la mascota"
          >
            <Phone className="w-3 h-3 text-rose-600" />
            <span>Vet Urgencias</span>
          </a>
        </div>

        {/* Action Buttons styled with Official Blue & Green */}
        <div className="grid grid-cols-2 gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onOpenQuickCaregiver(pet)}
            className="w-full py-2 px-2.5 bg-[#EBF5FB] hover:bg-[#D5EAF8] text-[#0277BD] font-bold rounded-xl text-xs border border-[#BEE3F8] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#0277BD]" />
            <span>Ficha Cuidador</span>
          </button>

          <button
            type="button"
            onClick={handleAddReport}
            className="w-full py-2 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600" />
            <span>Nuevo Reporte</span>
          </button>
        </div>

        {/* Bottom utility row */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <button
            type="button"
            onClick={handleEdit}
            className="hover:text-slate-700 font-medium flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3 h-3" /> Editar Perfil
          </button>

          <button
            type="button"
            onClick={() => onOpenDetail(pet)}
            className="text-[#0277BD] hover:text-[#014A75] font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Ver Ficha Completa</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
