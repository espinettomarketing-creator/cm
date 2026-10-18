import React, { useState } from 'react';
import { PetProfile } from '../types/pet';
import { SPECIES_CONFIG, SERVICE_STATUS_LABELS, formatAge } from '../utils/petHelpers';
import { usePet } from '../context/PetContext';
import { 
  X, 
  Phone, 
  AlertTriangle, 
  Pill, 
  ShieldAlert, 
  Heart, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MapPin, 
  Printer, 
  Edit3, 
  Camera, 
  ShieldCheck, 
  Utensils, 
  Activity, 
  Info,
  Sparkles,
  FileText
} from 'lucide-react';

interface PetDetailModalProps {
  pet: PetProfile | null;
  onClose: () => void;
  onOpenQuickCaregiver: (pet: PetProfile) => void;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({ pet, onClose, onOpenQuickCaregiver }) => {
  const { setEditingPet, setIsCreateModalOpen, setTargetPetForReport, setIsAddReportModalOpen, dailyReports } = usePet();
  const [activeTab, setActiveTab] = useState<'resumen' | 'salud' | 'dieta' | 'comportamiento' | 'contactos' | 'reportes'>('resumen');

  if (!pet) return null;

  const species = SPECIES_CONFIG[pet.species] || SPECIES_CONFIG.otro;
  const statusInfo = SERVICE_STATUS_LABELS[pet.currentServiceStatus] || SERVICE_STATUS_LABELS.en_casa_con_tutor;
  const petReports = dailyReports.filter((r) => r.petId === pet.id);

  const handleEdit = () => {
    setEditingPet(pet);
    setIsCreateModalOpen(true);
    onClose();
  };

  const handleNewReport = () => {
    setTargetPetForReport(pet);
    setIsAddReportModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Official Logo Colors Gradient (Navy -> Ocean Blue -> Warm Orange) */}
        <div className="relative bg-gradient-to-r from-[#014A75] via-[#0277BD] to-[#F58220] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={pet.avatarUrl}
                alt={pet.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-white/95 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 text-2xl bg-white rounded-full p-1 shadow-md">
                {species.emoji}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h2 className="text-3xl font-black font-display tracking-tight text-white">
                  {pet.name}
                </h2>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                  {species.label} • {pet.breed}
                </span>
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-[#F58220] text-white shadow-xs">
                  {statusInfo.label}
                </span>
              </div>

              <p className="text-sm text-sky-100 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span>{pet.gender === 'macho' ? 'Macho' : 'Hembra'}</span>
                <span>•</span>
                <span>{formatAge(pet.ageYears, pet.ageMonths)}</span>
                {pet.weightKg && (
                  <>
                    <span>•</span>
                    <span>{pet.weightKg} kg</span>
                  </>
                )}
                <span>•</span>
                <span>{pet.isNeutered ? 'Esterilizado/a' : 'Sin esterilizar'}</span>
              </p>

              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => onOpenQuickCaregiver(pet)}
                  className="px-3.5 py-1.5 bg-white text-[#014A75] hover:bg-sky-50 font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-[#0277BD]" />
                  <span>Ficha de Seguridad para Cuidador</span>
                </button>

                <button
                  type="button"
                  onClick={handleNewReport}
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Camera className="w-4 h-4" />
                  <span>Añadir Reporte Diario</span>
                </button>
              </div>
            </div>
          </div>

          {/* Close & Action Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-start">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Imprimir Ficha de Mascota"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={handleEdit}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Editar Perfil"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
              title="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation inside Modal with Brand Blue active state */}
        <div className="flex border-b border-slate-200 bg-[#F8FAFC] px-6 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'resumen'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4" /> Resumen Clave
          </button>
          <button
            onClick={() => setActiveTab('salud')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'salud'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" /> Vacunas & Alergias
          </button>
          <button
            onClick={() => setActiveTab('dieta')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'dieta'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Utensils className="w-4 h-4" /> Dieta & Medicinas
          </button>
          <button
            onClick={() => setActiveTab('comportamiento')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'comportamiento'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-4 h-4" /> Comportamiento & Miedos
          </button>
          <button
            onClick={() => setActiveTab('contactos')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'contactos'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-4 h-4" /> Veterinario & Tutor
          </button>
          <button
            onClick={() => setActiveTab('reportes')}
            className={`py-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'reportes'
                ? 'border-[#0277BD] text-[#0277BD] bg-white rounded-t-xl font-extrabold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" /> Diario de Reportes ({petReports.length})
          </button>
        </div>

        {/* Tab Contents (Scrollable body) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white">
          
          {/* TAB 1: RESUMEN CLAVE */}
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              
              {/* Alert Banner if allergies or medicines */}
              {(pet.hasAllergies || pet.medications.length > 0) && (
                <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-rose-900 uppercase tracking-wide">
                      ¡Atención Personal de Cuidadores! Alergias o Medicación Activa
                    </h4>
                    {pet.hasAllergies && (
                      <p className="text-xs text-rose-800 mt-1 font-semibold">
                        Alergias identificadas: {pet.allergiesList.join(', ')} ({pet.allergySeverity || 'Moderada'}).
                      </p>
                    )}
                    {pet.allergyEmergencyProtocol && (
                      <p className="text-xs text-rose-700 mt-1 italic">
                        Protocolo de reacción: {pet.allergyEmergencyProtocol}
                      </p>
                    )}
                    {pet.medications.length > 0 && (
                      <p className="text-xs text-amber-900 mt-1 font-semibold">
                        Medicamentos: {pet.medications.map(m => `${m.name} (${m.dose} - ${m.frequency})`).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Quick 3-card stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8]">
                  <div className="flex items-center gap-2 text-[#014A75] font-bold text-xs uppercase mb-1">
                    <Utensils className="w-4 h-4 text-[#0277BD]" />
                    <span>Alimentación</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{pet.dietBrand}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {pet.portionsPerDay} tomas al día: {pet.feedingTimes.join(' y ')} ({pet.portionQuantity})
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
                  <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs uppercase mb-1">
                    <Heart className="w-4 h-4 text-indigo-600" />
                    <span>Convivencia</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">Nivel de energía: {pet.energyLevel}</p>
                  <div className="text-xs text-slate-600 mt-1 flex flex-wrap gap-1">
                    <span className={pet.socialization.goodWithDogs ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                      🐶 Perros {pet.socialization.goodWithDogs ? '✓' : '✗'}
                    </span>
                    <span>•</span>
                    <span className={pet.socialization.goodWithCats ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                      🐱 Gatos {pet.socialization.goodWithCats ? '✓' : '✗'}
                    </span>
                    <span>•</span>
                    <span className={pet.socialization.goodWithChildren ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                      👶 Niños {pet.socialization.goodWithChildren ? '✓' : '✗'}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase mb-1">
                    <Phone className="w-4 h-4 text-rose-600" />
                    <span>Veterinario Urgencias</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 truncate">{pet.vetClinicName}</p>
                  <a
                    href={`tel:${pet.vetEmergencyPhone || pet.vetPhone}`}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-extrabold hover:underline mt-1"
                  >
                    <span>Llamar: {pet.vetEmergencyPhone || pet.vetPhone}</span>
                  </a>
                </div>
              </div>

              {/* Instructions for caregiver */}
              <div className="p-5 rounded-2xl bg-[#FFF5EC] border border-orange-200 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F58220]" />
                  <span>Instrucción Especial para el Cuidador Asignado:</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {pet.caregiverQuickNotes || 'Sin instrucciones adicionales registradas.'}
                </p>
                {pet.assignedCaregiver && (
                  <p className="text-xs text-[#0277BD] font-semibold pt-1">
                    Cuidador de referencia en Cuidados Miau: {pet.assignedCaregiver}
                  </p>
                )}
              </div>

              {/* Conflict triggers & fears */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                  <h5 className="text-xs font-bold uppercase text-amber-800 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Desencadenantes de Tensión o Conflicto</span>
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {pet.conflictTriggers || 'No se han reportado conflictos conocidos.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200">
                  <h5 className="text-xs font-bold uppercase text-purple-800 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Miedos Conocidos & Cómo Calmarlo</span>
                  </h5>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pet.fearsList.length > 0 ? (
                      pet.fearsList.map((fear, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 text-xs font-bold">
                          {fear}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500">Sin miedos graves reportados.</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{pet.fearCalmingProtocol}"
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SALUD & VACUNAS */}
          {activeTab === 'salud' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0277BD] text-white flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#014A75]">
                      Cartilla Sanitaria de {pet.name}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Estado: <span className="font-bold text-[#0277BD]">{pet.vaccinationStatus === 'completa' ? 'Vacunación al día' : 'En proceso / Pendiente'}</span>
                      {pet.lastDewormingDate && ` • Última desparasitación: ${pet.lastDewormingDate}`}
                    </p>
                  </div>
                </div>

                {pet.microchipNumber && (
                  <div className="text-xs bg-white px-3 py-1.5 rounded-xl border border-sky-300 font-mono text-[#014A75] font-bold">
                    Microchip: {pet.microchipNumber}
                  </div>
                )}
              </div>

              {/* Vaccines Table */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0277BD]" />
                  <span>Historial de Vacunación Registrado:</span>
                </h4>

                <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Vacuna</th>
                        <th className="py-3 px-4">Fecha Aplicada</th>
                        <th className="py-3 px-4">Próxima Dosis</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Notas Veterinarias</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {pet.vaccines.length > 0 ? (
                        pet.vaccines.map((v) => (
                          <tr key={v.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4 font-bold text-slate-900">{v.name}</td>
                            <td className="py-3 px-4">{v.dateAdministered}</td>
                            <td className="py-3 px-4">{v.nextDueDate || '—'}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                v.status === 'al_dia' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : v.status === 'proxima'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {v.status === 'al_dia' ? 'Al día ✓' : v.status === 'proxima' ? 'Próxima renovación' : 'Vencida'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-500">{v.notes || '—'}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-4 text-center text-slate-400">
                            No hay vacunas registradas todavía para esta mascota.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Allergies Detailed Section */}
              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                <h4 className="text-sm font-bold text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Alergias Conocidas y Protocolo de Emergencia</span>
                </h4>
                
                {pet.hasAllergies ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {pet.allergiesList.map((allergy, index) => (
                        <span key={index} className="px-3 py-1 rounded-xl bg-rose-100 text-rose-800 font-bold text-xs border border-rose-300">
                          ⚠️ {allergy}
                        </span>
                      ))}
                    </div>
                    {pet.allergyEmergencyProtocol && (
                      <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs text-rose-900">
                        <strong className="block mb-1 text-rose-950 uppercase text-[11px]">
                          Protocolo de Urgencia en caso de reacción:
                        </strong>
                        <p>{pet.allergyEmergencyProtocol}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-800 font-semibold bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                    ✓ No tiene alergias alimentarias ni ambientales conocidas.
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: DIETA & MEDICACIÓN */}
          {activeTab === 'dieta' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] space-y-3">
                  <h4 className="text-sm font-bold text-[#014A75] flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#0277BD]" />
                    <span>Plan Nutricional Diario</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-700">Tipo de Alimento:</span>
                      <p className="text-slate-900 capitalize font-medium">{pet.dietType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Marca / Preparación habitual:</span>
                      <p className="text-slate-900 font-semibold">{pet.dietBrand}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Tomas y Horarios:</span>
                      <p className="text-slate-900 font-medium">
                        {pet.portionsPerDay} tomas al día: {pet.feedingTimes.join(' y ')}
                      </p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-700">Cantidad por Toma:</span>
                      <p className="text-slate-900 font-medium">{pet.portionQuantity}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#F58220]" />
                    <span>Permitidos vs Prohibidos</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                      <span className="font-bold text-emerald-900 block mb-0.5">Premios y snacks permitidos:</span>
                      <p className="text-emerald-800">{pet.treatsAllowed || 'Premios habituales'}</p>
                    </div>

                    <div className="bg-rose-50 p-3 rounded-xl border border-rose-200">
                      <span className="font-bold text-rose-900 block mb-0.5">PROHIBIDO DAR:</span>
                      <p className="text-rose-800 font-bold">{pet.forbiddenFoods || 'Alimentos no autorizados'}</p>
                    </div>

                    {pet.hydrationNotes && (
                      <div className="bg-sky-50 p-3 rounded-xl border border-sky-200">
                        <span className="font-bold text-sky-900 block mb-0.5">Hidratación:</span>
                        <p className="text-sky-800">{pet.hydrationNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medications Table */}
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#F58220]" />
                  <span>Medicaciones y Suplementos Activos:</span>
                </h4>

                {pet.medications.length > 0 ? (
                  <div className="space-y-2">
                    {pet.medications.map((med) => (
                      <div key={med.id} className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                        <div>
                          <span className="font-extrabold text-amber-950 text-sm">{med.name}</span>
                          <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-[10px]">
                            {med.dose} • {med.frequency}
                          </span>
                          <p className="text-slate-700 mt-1 italic">
                            Instrucciones: {med.instructions}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    No requiere medicación diaria en este momento.
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: COMPORTAMIENTO & MIEDOS */}
          {activeTab === 'comportamiento' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                <h4 className="text-sm font-bold text-indigo-950 mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-indigo-600" />
                  <span>Sociabilización y Convivencia</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className={`p-3 rounded-xl border ${pet.socialization.goodWithDogs ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="text-lg block">🐶</span>
                    <span className="font-bold block mt-1">Con Perros</span>
                    <span className="text-[10px] font-semibold">{pet.socialization.goodWithDogs ? 'Sociable ✓' : 'Precaución / No ✗'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${pet.socialization.goodWithCats ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="text-lg block">🐱</span>
                    <span className="font-bold block mt-1">Con Gatos</span>
                    <span className="text-[10px] font-semibold">{pet.socialization.goodWithCats ? 'Sociable ✓' : 'Precaución / No ✗'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${pet.socialization.goodWithSmallAnimals ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="text-lg block">🐰</span>
                    <span className="font-bold block mt-1">Pequeños</span>
                    <span className="text-[10px] font-semibold">{pet.socialization.goodWithSmallAnimals ? 'Acepta ✓' : 'Separar ✗'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${pet.socialization.goodWithChildren ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                    <span className="text-lg block">👶</span>
                    <span className="font-bold block mt-1">Con Niños</span>
                    <span className="text-[10px] font-semibold">{pet.socialization.goodWithChildren ? 'Cariñoso ✓' : 'Evitar niños ✗'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${pet.socialization.goodWithStrangers ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <span className="text-lg block">🧑</span>
                    <span className="font-bold block mt-1">Desconocidos</span>
                    <span className="text-[10px] font-semibold">{pet.socialization.goodWithStrangers ? 'Abierto ✓' : 'Tímido / Desconfiado'}</span>
                  </div>
                </div>
              </div>

              {/* Behavior details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                    Desencadenantes de conflicto o estrés:
                  </h5>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {pet.conflictTriggers || 'No presenta desencadenantes conocidos.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
                    Juegos favoritos & Rutinas:
                  </h5>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {pet.favoriteGames}
                  </p>
                  <p className="text-slate-600 italic pt-1 border-t border-slate-200">
                    {pet.habitsAndRoutine}
                  </p>
                </div>
              </div>

              {/* Fears & Calming */}
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                <h4 className="text-sm font-bold text-purple-950 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-purple-600" />
                  <span>Miedos Conocidos y Protocolo de Calma</span>
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {pet.fearsList.map((fear, i) => (
                    <span key={i} className="px-3 py-1 rounded-xl bg-purple-200 text-purple-900 font-bold text-xs">
                      ⚡ {fear}
                    </span>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-xl bg-white border border-purple-200 text-xs text-purple-900">
                  <span className="font-bold block mb-1">Cómo calmar a {pet.name}:</span>
                  <p className="italic font-medium">{pet.fearCalmingProtocol}</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: CONTACTOS DE EMERGENCIA */}
          {activeTab === 'contactos' && (
            <div className="space-y-6">
              
              {/* Vet card */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-rose-500 text-white font-bold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-rose-950">
                        {pet.vetClinicName}
                      </h4>
                      <p className="text-xs text-rose-800 font-medium">
                        Veterinario de Cabecera: {pet.vetDoctorName}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`tel:${pet.vetEmergencyPhone || pet.vetPhone}`}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Llamar Urgencias</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-rose-200">
                  <div>
                    <span className="font-bold text-slate-500 block">Teléfono Principal Clínica:</span>
                    <a href={`tel:${pet.vetPhone}`} className="text-slate-900 font-bold hover:underline">
                      {pet.vetPhone}
                    </a>
                  </div>

                  <div>
                    <span className="font-bold text-rose-600 block">Teléfono Urgencias 24 Horas:</span>
                    <a href={`tel:${pet.vetEmergencyPhone}`} className="text-rose-600 font-black text-sm hover:underline">
                      {pet.vetEmergencyPhone}
                    </a>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="font-bold text-slate-500 block">Dirección Clínica:</span>
                    <p className="text-slate-800 font-medium">{pet.vetAddress}</p>
                  </div>

                  {pet.hasPetInsurance && (
                    <div className="sm:col-span-2 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                      <span className="font-bold text-rose-900">Seguro Veterinario Contratado:</span>
                      <p className="font-mono text-slate-800 font-bold">{pet.insurancePolicyNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Owner card */}
              <div className="p-5 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#014A75]">
                      Datos del Tutor / Dueño
                    </h4>
                    <p className="text-xs text-[#0277BD] font-medium">{pet.ownerName}</p>
                  </div>

                  <a
                    href={`tel:${pet.ownerPhone}`}
                    className="px-3.5 py-1.5 bg-[#0277BD] hover:bg-[#01579B] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Llamar al Tutor</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-4 rounded-xl border border-[#BEE3F8]">
                  <div>
                    <span className="font-bold text-slate-500 block">Teléfono Móvil:</span>
                    <a href={`tel:${pet.ownerPhone}`} className="text-slate-900 font-bold hover:underline">
                      {pet.ownerPhone}
                    </a>
                  </div>

                  <div>
                    <span className="font-bold text-slate-500 block">Email:</span>
                    <p className="text-slate-800">{pet.ownerEmail || 'No especificado'}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="font-bold text-slate-500 block">Dirección del Domicilio:</span>
                    <p className="text-slate-800">{pet.ownerAddress}</p>
                  </div>

                  {pet.secondaryContactName && (
                    <div className="sm:col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-500 block">Contacto Secundario:</span>
                        <p className="text-slate-800 font-semibold">{pet.secondaryContactName}</p>
                      </div>
                      <a href={`tel:${pet.secondaryContactPhone}`} className="text-[#0277BD] font-bold hover:underline">
                        {pet.secondaryContactPhone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: REPORTES DIARIOS */}
          {activeTab === 'reportes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Seguimiento Diario de Cuidados Miau
                  </h4>
                  <p className="text-xs text-slate-500">
                    Fotos, estados de ánimo y reportes de cuidado enviados a la familia
                  </p>
                </div>

                <button
                  onClick={handleNewReport}
                  className="px-3 py-1.5 bg-[#0277BD] hover:bg-[#01579B] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Nuevo Reporte</span>
                </button>
              </div>

              {petReports.length > 0 ? (
                <div className="space-y-4">
                  {petReports.map((report) => (
                    <div key={report.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4">
                      {report.photoUrl && (
                        <img
                          src={report.photoUrl}
                          alt="Reporte diario"
                          className="w-full sm:w-36 h-32 object-cover rounded-xl"
                        />
                      )}
                      <div className="flex-1 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0277BD]">
                            {report.date} a las {report.time}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">
                            Cuidador: {report.caregiverName}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                            Estado: {report.mood.replace('_', ' ')}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[11px]">
                            Comida: {report.foodStatus.replace('_', ' ')}
                          </span>
                          {report.walkMinutes && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-[11px]">
                              Paseo: {report.walkMinutes} min
                            </span>
                          )}
                        </div>

                        <p className="text-slate-700 font-medium leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                          "{report.summaryNote}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                  <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                  <p className="text-sm font-semibold">No hay reportes diarios registrados aún.</p>
                  <p className="text-xs text-slate-400 mt-1">Los cuidadores pueden subir fotos y notas del día aquí.</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">
            Ficha ID: {pet.id} • Actualizado: {pet.updatedAt}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
};
