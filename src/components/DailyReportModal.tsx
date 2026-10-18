import React, { useState } from 'react';
import { PetProfile, DailyReport } from '../types/pet';
import { usePet } from '../context/PetContext';
import { SPECIES_CONFIG } from '../utils/petHelpers';
import { 
  X, 
  Camera, 
  Send, 
  CheckCircle2, 
  Smile, 
  Utensils, 
  Clock, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: PetProfile | null;
}

const SAMPLE_PHOTO_PRESETS = [
  'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=600&q=80',
];

export const DailyReportModal: React.FC<DailyReportModalProps> = ({ isOpen, onClose, pet }) => {
  const { addDailyReport } = usePet();

  const [caregiverName, setCaregiverName] = useState('Lucía Fernández (Cuidadora)');
  const [serviceType, setServiceType] = useState<DailyReport['serviceType']>('guarderia_cuidador');
  const [mood, setMood] = useState<DailyReport['mood']>('super_feliz');
  const [foodStatus, setFoodStatus] = useState<DailyReport['foodStatus']>('comio_todo');
  const [bathroomStatus, setBathroomStatus] = useState<DailyReport['bathroomStatus']>('pipiy_caca_ok');
  const [hydrationStatus, setHydrationStatus] = useState<DailyReport['hydrationStatus']>('bebio_bien');
  const [walkMinutes, setWalkMinutes] = useState<number>(45);
  const [medicationGiven, setMedicationGiven] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(pet?.avatarUrl || SAMPLE_PHOTO_PRESETS[0]);
  const [summaryNote, setSummaryNote] = useState('');

  if (!isOpen || !pet) return null;

  const species = SPECIES_CONFIG[pet.species] || SPECIES_CONFIG.otro;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    addDailyReport({
      petId: pet.id,
      date: today,
      time: timeNow,
      caregiverName,
      serviceType,
      mood,
      foodStatus,
      hydrationStatus,
      bathroomStatus,
      walkMinutes: pet.species === 'perro' ? walkMinutes : undefined,
      medicationGiven: pet.medications.length > 0 ? medicationGiven : undefined,
      photoUrl,
      summaryNote: summaryNote.trim() || `¡${pet.name} ha tenido un día estupendo! Se encuentra animado, comió de maravilla y disfrutó de su rutina de cuidados.`,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black font-display tracking-tight text-white">
                Nuevo Reporte Diario con Foto
              </h3>
              <p className="text-xs text-emerald-100">
                Seguimiento en directo para la familia de {pet.name} {species.emoji}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Caregiver & Service */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Cuidador Responsable
              </label>
              <input
                type="text"
                required
                value={caregiverName}
                onChange={(e) => setCaregiverName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Tipo de Servicio Realizado
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="guarderia_cuidador">Hospedaje Familiar</option>
                <option value="guarderia_domicilio">Visita / Cuidado en su Casa</option>
                <option value="paseo">Paseo Diario</option>
              </select>
            </div>
          </div>

          {/* Mood Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Estado de Ánimo de {pet.name}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {[
                { val: 'super_feliz', emoji: '🤩', label: 'Súper Feliz' },
                { val: 'jugueton', emoji: '🎾', label: 'Juguetón' },
                { val: 'tranquilo', emoji: '😌', label: 'Tranquilo' },
                { val: 'timido_pero_bien', emoji: '🥰', label: 'Mimoso' },
                { val: 'cansado', emoji: '😴', label: 'Descansando' },
              ].map((m) => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => setMood(m.val as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    mood === m.val
                      ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-900 shadow-xs ring-2 ring-emerald-300'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl block">{m.emoji}</span>
                  <span className="text-[11px] block mt-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food & Hydration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                ¿Cómo comió su comida?
              </label>
              <select
                value={foodStatus}
                onChange={(e) => setFoodStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="comio_todo">Comió todo con ganas ✓</option>
                <option value="comio_la_mitad">Comió la mitad</option>
                <option value="poco_apetito">Poco apetito / Dejó comida</option>
                <option value="no_le_tocaba">No le tocaba toma aún</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Necesidades & Arenero / Pipicán
              </label>
              <select
                value={bathroomStatus}
                onChange={(e) => setBathroomStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="pipiy_caca_ok">Pipí y caca perfectos ✓</option>
                <option value="solo_pipi">Hizo pipí normal</option>
                <option value="sin_novedades">Todo normal sin incidencias</option>
                <option value="heces_blandas">Heces algo blandas (monitorear)</option>
              </select>
            </div>
          </div>

          {/* Walk minutes if dog */}
          {pet.species === 'perro' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Minutos de Paseo Realizados
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={walkMinutes}
                onChange={(e) => setWalkMinutes(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          )}

          {/* Medication Check */}
          {pet.medications.length > 0 && (
            <label className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200 cursor-pointer">
              <input
                type="checkbox"
                checked={medicationGiven}
                onChange={(e) => setMedicationGiven(e.target.checked)}
                className="rounded text-amber-600"
              />
              <span className="text-xs font-bold text-amber-900">
                Confirmar que se administró la medicación correspondiente ({pet.medications.map(m => m.name).join(', ')})
              </span>
            </label>
          )}

          {/* Photo URL */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Foto del Reporte Diario
            </label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
            {photoUrl && (
              <img
                src={photoUrl}
                alt="Vista previa reporte"
                className="mt-2 h-32 w-full object-cover rounded-xl border border-slate-200"
              />
            )}
          </div>

          {/* Summary Note */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mensaje Cariñoso para el Tutor:
            </label>
            <textarea
              rows={3}
              value={summaryNote}
              onChange={(e) => setSummaryNote(e.target.value)}
              placeholder={`Cuéntale a la familia cómo estuvo ${pet.name}: juegos, anécdotas divertidas, paseos...`}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold text-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar & Notificar al Tutor</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
