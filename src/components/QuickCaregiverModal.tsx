import React from 'react';
import { PetProfile } from '../types/pet';
import { SPECIES_CONFIG, SERVICE_STATUS_LABELS, formatAge } from '../utils/petHelpers';
import { CuidadosMiauLogo } from './CuidadosMiauLogo';
import { 
  X, 
  Phone, 
  AlertTriangle, 
  Pill, 
  ShieldAlert, 
  Utensils, 
  Printer, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface QuickCaregiverModalProps {
  pet: PetProfile | null;
  onClose: () => void;
}

export const QuickCaregiverModal: React.FC<QuickCaregiverModalProps> = ({ pet, onClose }) => {
  if (!pet) return null;

  const species = SPECIES_CONFIG[pet.species] || SPECIES_CONFIG.otro;
  const statusInfo = SERVICE_STATUS_LABELS[pet.currentServiceStatus] || SERVICE_STATUS_LABELS.en_casa_con_tutor;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border-4 border-[#0277BD] flex flex-col max-h-[94vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Header styled with Official Navy & Orange */}
        <div className="bg-[#014A75] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CuidadosMiauLogo size="sm" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-display text-white">
                  Ficha Rápida: {pet.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#F58220] text-white">
                  CUIDADOR
                </span>
              </div>
              <p className="text-xs text-sky-200">
                {species.label} • {pet.breed} • {formatAge(pet.ageYears, pet.ageMonths)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Imprimir"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* TOP EMERGENCY CALL BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`tel:${pet.vetEmergencyPhone || pet.vetPhone}`}
              className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold flex items-center justify-center gap-2 text-sm shadow-md transition-all active:scale-95"
            >
              <Phone className="w-5 h-5" />
              <span>Llamar Vet Urgencias ({pet.vetClinicName})</span>
            </a>

            <a
              href={`tel:${pet.ownerPhone}`}
              className="p-3.5 rounded-2xl bg-[#014A75] hover:bg-[#0A2540] text-white font-extrabold flex items-center justify-center gap-2 text-sm shadow-md transition-all active:scale-95"
            >
              <Phone className="w-5 h-5" />
              <span>Llamar al Tutor ({pet.ownerName})</span>
            </a>
          </div>

          {/* ALLERGIES & CRITICAL WARNING */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-black text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Alergias & Alimentos Prohibidos</span>
            </div>
            {pet.hasAllergies ? (
              <div className="space-y-1">
                <p className="text-sm font-black text-rose-950">
                  ⚠️ ALERGIAS: {pet.allergiesList.join(', ')} ({pet.allergySeverity || 'Grave'})
                </p>
                {pet.allergyEmergencyProtocol && (
                  <p className="text-xs text-rose-800 bg-white p-2.5 rounded-xl border border-rose-200">
                    <span className="font-bold">Qué hacer si ocurre:</span> {pet.allergyEmergencyProtocol}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-emerald-800 font-bold">✓ Sin alergias conocidas reportadas.</p>
            )}
            <p className="text-xs text-rose-900 font-bold">
              🚫 Prohibido dar: {pet.forbiddenFoods || 'Cualquier comida no autorizada'}
            </p>
          </div>

          {/* MEDICATIONS */}
          {pet.medications.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-950 font-black text-xs uppercase tracking-wide">
                <Pill className="w-4 h-4 text-amber-700" />
                <span>Medicaciones Activas</span>
              </div>
              <div className="space-y-2">
                {pet.medications.map(m => (
                  <div key={m.id} className="p-2.5 bg-white rounded-xl border border-amber-200 text-xs">
                    <div className="flex items-center justify-between font-bold text-amber-950">
                      <span>{m.name}</span>
                      <span className="bg-amber-100 px-2 py-0.5 rounded-full">{m.dose} • {m.frequency}</span>
                    </div>
                    <p className="text-slate-600 mt-1 italic">{m.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEEDING SCHEDULE */}
          <div className="p-4 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] space-y-2">
            <div className="flex items-center gap-2 text-[#014A75] font-black text-xs uppercase tracking-wide">
              <Utensils className="w-4 h-4 text-[#0277BD]" />
              <span>Instrucciones de Alimentación</span>
            </div>
            <div className="text-xs space-y-1.5 text-slate-800">
              <p><span className="font-bold">Comida:</span> {pet.dietBrand} ({pet.dietType.replace('_', ' ')})</p>
              <p><span className="font-bold">Tomas diarias:</span> {pet.portionsPerDay} tomas ({pet.feedingTimes.join(' y ')})</p>
              <p><span className="font-bold">Cantidad:</span> {pet.portionQuantity}</p>
              <p><span className="font-bold">Premios permitidos:</span> {pet.treatsAllowed}</p>
              {pet.hydrationNotes && <p><span className="font-bold">Agua:</span> {pet.hydrationNotes}</p>}
            </div>
          </div>

          {/* FEARS & CONFLICT TRIGGERS */}
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-950 font-black text-xs uppercase tracking-wide">
              <ShieldAlert className="w-4 h-4 text-purple-600" />
              <span>Miedos y Manejo del Comportamiento</span>
            </div>
            <p className="text-purple-900">
              <span className="font-bold">Miedos:</span> {pet.fearsList.join(', ') || 'Ninguno reportado'}
            </p>
            <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-purple-200 italic">
              <span className="font-bold not-italic text-purple-950 block mb-0.5">Cómo calmarlo:</span>
              "{pet.fearCalmingProtocol}"
            </p>
            {pet.conflictTriggers && (
              <p className="text-slate-700">
                <span className="font-bold text-slate-900">Desencadenantes de conflicto:</span> {pet.conflictTriggers}
              </p>
            )}
          </div>

          {/* CAREGIVER NOTES */}
          {pet.caregiverQuickNotes && (
            <div className="p-4 rounded-2xl bg-[#FFF5EC] border border-orange-200 text-xs">
              <span className="font-bold text-[#E06D0C] block mb-1">Nota Prioritaria:</span>
              <p className="text-slate-800 font-medium">{pet.caregiverQuickNotes}</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Microchip: {pet.microchipNumber || 'Sin chip registrado'}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#014A75] hover:bg-[#0277BD] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
