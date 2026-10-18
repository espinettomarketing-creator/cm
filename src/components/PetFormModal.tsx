import React, { useState, useEffect } from 'react';
import { PetProfile, PetSpecies, VaccineItem, MedicationItem } from '../types/pet';
import { SPECIES_CONFIG } from '../utils/petHelpers';
import { CuidadosMiauLogo } from './CuidadosMiauLogo';
import { usePet } from '../context/PetContext';
import { 
  X, 
  Sparkles, 
  Plus, 
  Trash2, 
  Check, 
  AlertTriangle, 
  Save, 
  HelpCircle,
  Upload,
  Calendar,
  Heart,
  Utensils,
  ShieldAlert,
  Phone
} from 'lucide-react';

interface PetFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editPet: PetProfile | null;
}

const COMMON_ALLERGIES = [
  'Pollo', 'Cereales / Gluten', 'Ternera', 'Picadura de pulgas', 'Lácteos', 
  'Polvo / Ácaros', 'Polen primaveral', 'Heno húmedo', 'Antibióticos'
];

const COMMON_FEARS = [
  'Truenos / Tormentas', 'Cohetes / Petardos', 'Aspiradora', 
  'Viajes en coche', 'Ir al veterinario', 'Hombres con gorra/barba', 
  'Soledad prolongada', 'Ruidos metálicos secos', 'Corrientes de aire frío'
];

export const PetFormModal: React.FC<PetFormModalProps> = ({ isOpen, onClose, editPet }) => {
  const { addPet, updatePet } = usePet();

  // Form step
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('perro');
  const [speciesCustomName, setSpeciesCustomName] = useState('');
  const [breed, setBreed] = useState('');
  const [ageYears, setAgeYears] = useState<number>(2);
  const [ageMonths, setAgeMonths] = useState<number>(0);
  const [gender, setGender] = useState<'macho' | 'hembra'>('macho');
  const [isNeutered, setIsNeutered] = useState(true);
  const [weightKg, setWeightKg] = useState<number | undefined>(15);
  const [avatarUrl, setAvatarUrl] = useState('');

  // Vaccination & Health
  const [vaccinationStatus, setVaccinationStatus] = useState<'completa' | 'en_proceso' | 'pendiente'>('completa');
  const [lastDewormingDate, setLastDewormingDate] = useState('2026-09-01');
  const [microchipNumber, setMicrochipNumber] = useState('');
  const [vaccines, setVaccines] = useState<VaccineItem[]>([]);
  const [newVacName, setNewVacName] = useState('');
  const [newVacDate, setNewVacDate] = useState('2026-05-10');

  // Allergies
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergiesList, setAllergiesList] = useState<string[]>([]);
  const [allergyInput, setAllergyInput] = useState('');
  const [allergySeverity, setAllergySeverity] = useState<'leve' | 'moderada' | 'grave'>('moderada');
  const [allergyEmergencyProtocol, setAllergyEmergencyProtocol] = useState('');

  // Diet
  const [dietType, setDietType] = useState<PetProfile['dietType']>('pienso_croquetas');
  const [dietBrand, setDietBrand] = useState('');
  const [portionsPerDay, setPortionsPerDay] = useState(2);
  const [feedingTimes, setFeedingTimes] = useState<string[]>(['08:30', '19:30']);
  const [portionQuantity, setPortionQuantity] = useState('');
  const [treatsAllowed, setTreatsAllowed] = useState('');
  const [forbiddenFoods, setForbiddenFoods] = useState('');
  const [hydrationNotes, setHydrationNotes] = useState('');
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');
  const [newMedFreq, setNewMedFreq] = useState('');
  const [newMedInstructions, setNewMedInstructions] = useState('');

  // Behavior
  const [goodWithDogs, setGoodWithDogs] = useState(true);
  const [goodWithCats, setGoodWithCats] = useState(false);
  const [goodWithSmallAnimals, setGoodWithSmallAnimals] = useState(false);
  const [goodWithChildren, setGoodWithChildren] = useState(true);
  const [goodWithStrangers, setGoodWithStrangers] = useState(true);
  const [conflictTriggers, setConflictTriggers] = useState('');
  const [energyLevel, setEnergyLevel] = useState<'bajo' | 'medio' | 'alto' | 'muy_alto'>('medio');
  const [favoriteGames, setFavoriteGames] = useState('');
  const [habitsAndRoutine, setHabitsAndRoutine] = useState('');

  // Fears
  const [fearsList, setFearsList] = useState<string[]>([]);
  const [fearInput, setFearInput] = useState('');
  const [fearCalmingProtocol, setFearCalmingProtocol] = useState('');

  // Emergency contacts (Veterinarian)
  const [vetClinicName, setVetClinicName] = useState('');
  const [vetDoctorName, setVetDoctorName] = useState('');
  const [vetPhone, setVetPhone] = useState('');
  const [vetEmergencyPhone, setVetEmergencyPhone] = useState('');
  const [vetAddress, setVetAddress] = useState('');
  const [hasPetInsurance, setHasPetInsurance] = useState(false);
  const [insurancePolicyNumber, setInsurancePolicyNumber] = useState('');

  // Owner
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [secondaryContactName, setSecondaryContactName] = useState('');
  const [secondaryContactPhone, setSecondaryContactPhone] = useState('');

  // Service Status
  const [currentServiceStatus, setCurrentServiceStatus] = useState<PetProfile['currentServiceStatus']>('guarderia_cuidador');
  const [assignedCaregiver, setAssignedCaregiver] = useState('Lucía Fernández (Cuidadora)');
  const [caregiverQuickNotes, setCaregiverQuickNotes] = useState('');

  // Load editPet if available
  useEffect(() => {
    if (editPet) {
      setName(editPet.name);
      setSpecies(editPet.species);
      setSpeciesCustomName(editPet.speciesCustomName || '');
      setBreed(editPet.breed);
      setAgeYears(editPet.ageYears);
      setAgeMonths(editPet.ageMonths);
      setGender(editPet.gender);
      setIsNeutered(editPet.isNeutered);
      setWeightKg(editPet.weightKg);
      setAvatarUrl(editPet.avatarUrl);

      setVaccinationStatus(editPet.vaccinationStatus);
      setLastDewormingDate(editPet.lastDewormingDate || '');
      setMicrochipNumber(editPet.microchipNumber || '');
      setVaccines(editPet.vaccines || []);

      setHasAllergies(editPet.hasAllergies);
      setAllergiesList(editPet.allergiesList || []);
      setAllergySeverity(editPet.allergySeverity || 'moderada');
      setAllergyEmergencyProtocol(editPet.allergyEmergencyProtocol || '');

      setDietType(editPet.dietType);
      setDietBrand(editPet.dietBrand);
      setPortionsPerDay(editPet.portionsPerDay);
      setFeedingTimes(editPet.feedingTimes || []);
      setPortionQuantity(editPet.portionQuantity);
      setTreatsAllowed(editPet.treatsAllowed || '');
      setForbiddenFoods(editPet.forbiddenFoods || '');
      setHydrationNotes(editPet.hydrationNotes || '');
      setMedications(editPet.medications || []);

      setGoodWithDogs(editPet.socialization?.goodWithDogs ?? true);
      setGoodWithCats(editPet.socialization?.goodWithCats ?? false);
      setGoodWithSmallAnimals(editPet.socialization?.goodWithSmallAnimals ?? false);
      setGoodWithChildren(editPet.socialization?.goodWithChildren ?? true);
      setGoodWithStrangers(editPet.socialization?.goodWithStrangers ?? true);
      setConflictTriggers(editPet.conflictTriggers || '');
      setEnergyLevel(editPet.energyLevel || 'medio');
      setFavoriteGames(editPet.favoriteGames || '');
      setHabitsAndRoutine(editPet.habitsAndRoutine || '');

      setFearsList(editPet.fearsList || []);
      setFearCalmingProtocol(editPet.fearCalmingProtocol || '');

      setVetClinicName(editPet.vetClinicName);
      setVetDoctorName(editPet.vetDoctorName);
      setVetPhone(editPet.vetPhone);
      setVetEmergencyPhone(editPet.vetEmergencyPhone);
      setVetAddress(editPet.vetAddress);
      setHasPetInsurance(editPet.hasPetInsurance);
      setInsurancePolicyNumber(editPet.insurancePolicyNumber || '');

      setOwnerName(editPet.ownerName);
      setOwnerPhone(editPet.ownerPhone);
      setOwnerEmail(editPet.ownerEmail || '');
      setOwnerAddress(editPet.ownerAddress);
      setSecondaryContactName(editPet.secondaryContactName || '');
      setSecondaryContactPhone(editPet.secondaryContactPhone || '');

      setCurrentServiceStatus(editPet.currentServiceStatus);
      setAssignedCaregiver(editPet.assignedCaregiver || '');
      setCaregiverQuickNotes(editPet.caregiverQuickNotes || '');
    } else {
      resetFormToDefaults();
    }
  }, [editPet, isOpen]);

  const resetFormToDefaults = () => {
    setName('');
    setSpecies('perro');
    setSpeciesCustomName('');
    setBreed('');
    setAgeYears(2);
    setAgeMonths(0);
    setGender('macho');
    setIsNeutered(true);
    setWeightKg(12);
    setAvatarUrl('https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80');

    setVaccinationStatus('completa');
    setLastDewormingDate('2026-09-01');
    setMicrochipNumber('ES-982000000000000');
    setVaccines([
      { id: 'v-init-1', name: 'Rabia', dateAdministered: '2026-04-10', nextDueDate: '2027-04-10', status: 'al_dia' },
      { id: 'v-init-2', name: 'Polivalente', dateAdministered: '2026-04-10', nextDueDate: '2027-04-10', status: 'al_dia' }
    ]);

    setHasAllergies(false);
    setAllergiesList([]);
    setAllergySeverity('moderada');
    setAllergyEmergencyProtocol('');

    setDietType('pienso_croquetas');
    setDietBrand('Pienso Premium Natural');
    setPortionsPerDay(2);
    setFeedingTimes(['08:30', '20:00']);
    setPortionQuantity('150g por toma');
    setTreatsAllowed('Galletitas de manzana y snacks de buey');
    setForbiddenFoods('Chocolate, uvas, cebolla, huesos cocidos');
    setHydrationNotes('Agua fresca limpia');
    setMedications([]);

    setGoodWithDogs(true);
    setGoodWithCats(false);
    setGoodWithSmallAnimals(false);
    setGoodWithChildren(true);
    setGoodWithStrangers(true);
    setConflictTriggers('Puede gruñir si intentan quitarle la comida bruscamente');
    setEnergyLevel('medio');
    setFavoriteGames('Jugar a la pelota y caricias detrás de las orejas');
    setHabitsAndRoutine('Paseo matutino a las 8:30 y cena a las 20:00');

    setFearsList(['Truenos', 'Aspiradora']);
    setFearCalmingProtocol('Hablarle en voz baja y acariciarle el pecho con calma');

    setVetClinicName('Hospital Veterinario Central');
    setVetDoctorName('Dra. Marta Soler');
    setVetPhone('+34 910 000 111');
    setVetEmergencyPhone('+34 600 000 999');
    setVetAddress('Calle Mayor 50, Madrid');
    setHasPetInsurance(false);
    setInsurancePolicyNumber('');

    setOwnerName('Laura Pérez');
    setOwnerPhone('+34 612 345 678');
    setOwnerEmail('laura.perez@email.com');
    setOwnerAddress('Calle Gran Vía 28, Madrid');
    setSecondaryContactName('Pedro Pérez');
    setSecondaryContactPhone('+34 622 333 444');

    setCurrentServiceStatus('guarderia_cuidador');
    setAssignedCaregiver('Lucía Fernández (Cuidadora Cuidados Miau)');
    setCaregiverQuickNotes('Mascota muy cariñosa y tranquila. Respetar sus horarios de comida.');
  };

  const handlePrefillSample = (selectedSpecies: PetSpecies) => {
    setSpecies(selectedSpecies);
    if (selectedSpecies === 'gato') {
      setName('Simba');
      setBreed('Siamés');
      setAgeYears(3);
      setAgeMonths(2);
      setGender('macho');
      setIsNeutered(true);
      setWeightKg(4.2);
      setAvatarUrl('https://images.unsplash.com/photo-1513360309081-38f076278f1e?auto=format&fit=crop&w=600&q=80');
      setVaccines([
        { id: 'v1', name: 'Trivalente Felina', dateAdministered: '2026-03-01', nextDueDate: '2027-03-01', status: 'al_dia' },
        { id: 'v2', name: 'Leucemia Felina', dateAdministered: '2026-03-01', nextDueDate: '2027-03-01', status: 'al_dia' }
      ]);
      setDietType('mixta');
      setDietBrand('Royal Canin Siamese + Latitas Cosma');
      setPortionsPerDay(2);
      setFeedingTimes(['08:00', '20:00']);
      setPortionQuantity('40g pienso + 1/2 sobre húmedo');
      setTreatsAllowed('Pasta de malta');
      setForbiddenFoods('Lácteos');
      setGoodWithDogs(false);
      setGoodWithCats(true);
      setFearsList(['Aspiradora', 'Transportín']);
      setFearCalmingProtocol('Ofrecer pasta de malta en el dedo y acariciar su barbilla');
      setCaregiverQuickNotes('Gatito mimado y vocal. Le encanta ronronear en el regazo.');
    } else if (selectedSpecies === 'conejo') {
      setName('Tambor');
      setBreed('Belier Enano');
      setAgeYears(1);
      setAgeMonths(5);
      setGender('macho');
      setIsNeutered(true);
      setWeightKg(1.5);
      setAvatarUrl('https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=600&q=80');
      setVaccines([
        { id: 'v1', name: 'Mixomatosis + RHD1', dateAdministered: '2026-05-12', nextDueDate: '2027-05-12', status: 'al_dia' },
        { id: 'v2', name: 'RHD2', dateAdministered: '2026-05-26', nextDueDate: '2027-05-26', status: 'al_dia' }
      ]);
      setDietType('heno_vegetales');
      setDietBrand('Heno Timothy Oxbow + Ensalada verde fresca');
      setPortionsPerDay(2);
      setFeedingTimes(['09:00', '20:30']);
      setPortionQuantity('Heno ilimitado + 1 cuenco de canónigos y escarola');
      setTreatsAllowed('1 rodajita de manzana a la semana');
      setForbiddenFoods('Zanahoria entera, pan, patata, lácteos');
      setFearsList(['Ladridos de perros', 'Ser alzado del suelo']);
      setFearCalmingProtocol('Acariciar suavemente entre sus orejas sentado en el suelo');
      setCaregiverQuickNotes('Conejo muy dulce. Mantener en habitación protegida sin cables a su alcance.');
    } else if (selectedSpecies === 'cata' || selectedSpecies === 'loro') {
      setName('Paco');
      setBreed(selectedSpecies === 'loro' ? 'Loro Yaco Gris Africano' : 'Cata Ninfa / Carolina');
      setAgeYears(4);
      setAgeMonths(0);
      setGender('macho');
      setIsNeutered(false);
      setWeightKg(selectedSpecies === 'loro' ? 0.45 : 0.09);
      setAvatarUrl('https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80');
      setDietType('semillas_frutas');
      setDietBrand('Harrison High Potency + Fruta fresca');
      setPortionsPerDay(2);
      setFeedingTimes(['08:30', '18:30']);
      setPortionQuantity('Pienso extrusionado + trozos de manzana y pimiento');
      setTreatsAllowed('1 nuez o almendra cruda');
      setForbiddenFoods('PELIGRO MORTAL: AGUACATE, chocolate, vapores de teflón');
      setFearsList(['Vapores de cocina', 'Ventanas abiertas', 'Movimientos bruscos']);
      setFearCalmingProtocol('Hablarle suave diciendo "Paco bonito" y silbarle');
      setCaregiverQuickNotes('¡Ojo con ventanas y puertas cerradas! Cubrir la jaula para dormir a las 21:00h.');
    } else if (selectedSpecies === 'cobaya') {
      setName('Caramelo');
      setBreed('Cobaya Coronet de pelo largo');
      setAgeYears(1);
      setAgeMonths(2);
      setGender('hembra');
      setIsNeutered(false);
      setWeightKg(0.85);
      setAvatarUrl('https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80');
      setDietType('heno_vegetales');
      setDietBrand('Heno Timothy + Pimiento Rojo con Vitamina C');
      setPortionsPerDay(2);
      setFeedingTimes(['08:30', '19:30']);
      setPortionQuantity('Heno sin fin + 1 trozo de pimiento rojo diario');
      setTreatsAllowed('Diente de león y pepino');
      setForbiddenFoods('Alimentos dulces, procesados');
      setCaregiverQuickNotes('Asegurar Vitamina C diaria obligatoria. Le encanta que le cepillen el pelito.');
    }
  };

  if (!isOpen) return null;

  const handleAddVaccine = () => {
    if (!newVacName.trim()) return;
    const item: VaccineItem = {
      id: `v-${Date.now()}`,
      name: newVacName,
      dateAdministered: newVacDate,
      status: 'al_dia',
    };
    setVaccines([...vaccines, item]);
    setNewVacName('');
  };

  const handleRemoveVaccine = (id: string) => {
    setVaccines(vaccines.filter((v) => v.id !== id));
  };

  const handleAddMedication = () => {
    if (!newMedName.trim()) return;
    const med: MedicationItem = {
      id: `m-${Date.now()}`,
      name: newMedName,
      dose: newMedDose || '1 dosis',
      frequency: newMedFreq || 'Diario',
      instructions: newMedInstructions,
    };
    setMedications([...medications, med]);
    setNewMedName('');
    setNewMedDose('');
    setNewMedFreq('');
    setNewMedInstructions('');
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const toggleAllergy = (allergy: string) => {
    if (allergiesList.includes(allergy)) {
      const updated = allergiesList.filter((a) => a !== allergy);
      setAllergiesList(updated);
      if (updated.length === 0) setHasAllergies(false);
    } else {
      setAllergiesList([...allergiesList, allergy]);
      setHasAllergies(true);
    }
  };

  const handleAddCustomAllergy = () => {
    if (allergyInput.trim() && !allergiesList.includes(allergyInput.trim())) {
      setAllergiesList([...allergiesList, allergyInput.trim()]);
      setHasAllergies(true);
      setAllergyInput('');
    }
  };

  const toggleFear = (fear: string) => {
    if (fearsList.includes(fear)) {
      setFearsList(fearsList.filter((f) => f !== fear));
    } else {
      setFearsList([...fearsList, fear]);
    }
  };

  const handleAddCustomFear = () => {
    if (fearInput.trim() && !fearsList.includes(fearInput.trim())) {
      setFearsList([...fearsList, fearInput.trim()]);
      setFearInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Por favor introduce el nombre de la mascota.');
      return;
    }

    if (!vetPhone.trim() || !vetClinicName.trim()) {
      alert('Por favor completa los datos de emergencia de la clínica veterinaria.');
      return;
    }

    if (!ownerName.trim() || !ownerPhone.trim()) {
      alert('Por favor completa el nombre y teléfono del tutor.');
      return;
    }

    const petPayload = {
      name,
      species,
      speciesCustomName: speciesCustomName.trim() || undefined,
      breed: breed || 'Mestizo / Común',
      ageYears: Number(ageYears) || 0,
      ageMonths: Number(ageMonths) || 0,
      gender,
      isNeutered,
      weightKg: weightKg ? Number(weightKg) : undefined,
      avatarUrl: avatarUrl.trim() || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
      
      vaccinationStatus,
      lastDewormingDate,
      microchipNumber,
      vaccines,

      hasAllergies: allergiesList.length > 0 || hasAllergies,
      allergiesList,
      allergySeverity,
      allergyEmergencyProtocol,

      dietType,
      dietBrand: dietBrand || 'Alimento balanceado',
      portionsPerDay: Number(portionsPerDay) || 2,
      feedingTimes,
      portionQuantity: portionQuantity || '1 ración habitual',
      treatsAllowed,
      forbiddenFoods,
      hydrationNotes,
      medications,

      socialization: {
        goodWithDogs,
        goodWithCats,
        goodWithSmallAnimals,
        goodWithChildren,
        goodWithStrangers,
      },
      conflictTriggers,
      energyLevel,
      favoriteGames: favoriteGames || 'Juegos habituales',
      habitsAndRoutine: habitsAndRoutine || 'Rutina tranquila y paseos diarios',

      fearsList,
      fearCalmingProtocol: fearCalmingProtocol || 'Hablarle con voz dulce y ofrecerle un espacio tranquilo',

      vetClinicName,
      vetDoctorName: vetDoctorName || 'Veterinario de guardia',
      vetPhone,
      vetEmergencyPhone: vetEmergencyPhone || vetPhone,
      vetAddress: vetAddress || 'Clínica habitual',
      hasPetInsurance,
      insurancePolicyNumber,

      ownerName,
      ownerPhone,
      ownerEmail,
      ownerAddress: ownerAddress || 'Domicilio habitual',
      secondaryContactName,
      secondaryContactPhone,

      currentServiceStatus,
      assignedCaregiver,
      caregiverQuickNotes: caregiverQuickNotes || 'Cuidado con atención personalizada y cariño.',
    };

    if (editPet) {
      updatePet(editPet.id, petPayload);
    } else {
      addPet(petPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Official Logo & Gradient */}
        <div className="bg-gradient-to-r from-[#014A75] via-[#0277BD] to-[#F58220] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CuidadosMiauLogo size="sm" />
            <div>
              <h2 className="text-2xl font-black font-display tracking-tight text-white">
                {editPet ? `Editar Perfil de ${editPet.name}` : 'Crear Perfil Detallado de Mascota'}
              </h2>
              <p className="text-xs text-sky-100 font-medium">
                Ficha completa accesible para el personal de cuidadores de Cuidados Miau
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!editPet && (
              <div className="hidden sm:flex items-center gap-1 bg-white/20 p-1 rounded-xl text-xs">
                <span className="px-2 text-white/90 font-semibold">Ejemplo rápido:</span>
                <button
                  type="button"
                  onClick={() => handlePrefillSample('perro')}
                  className="px-2 py-0.5 rounded-lg bg-white/30 hover:bg-white text-[#014A75] font-bold transition-colors"
                >
                  🐶 Perro
                </button>
                <button
                  type="button"
                  onClick={() => handlePrefillSample('gato')}
                  className="px-2 py-0.5 rounded-lg bg-white/30 hover:bg-white text-[#014A75] font-bold transition-colors"
                >
                  🐱 Gato
                </button>
                <button
                  type="button"
                  onClick={() => handlePrefillSample('conejo')}
                  className="px-2 py-0.5 rounded-lg bg-white/30 hover:bg-white text-[#014A75] font-bold transition-colors"
                >
                  🐰 Conejo
                </button>
                <button
                  type="button"
                  onClick={() => handlePrefillSample('cata')}
                  className="px-2 py-0.5 rounded-lg bg-white/30 hover:bg-white text-[#014A75] font-bold transition-colors"
                >
                  🦜 Cata/Loro
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-step progress bar */}
        <div className="bg-[#F8FAFC] px-6 py-2 border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-2 text-xs">
          {[
            { step: 1, label: '1. Datos & Especie' },
            { step: 2, label: '2. Vacunas & Salud' },
            { step: 3, label: '3. Alergias & Dieta' },
            { step: 4, label: '4. Comportamiento & Miedos' },
            { step: 5, label: '5. Veterinario & Tutor' },
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStep(s.step)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                currentStep === s.step
                  ? 'bg-[#0277BD] text-white shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* STEP 1: DATOS BÁSICOS & ESPECIE */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#0277BD]" />
                <span>Identificación Básica de la Mascota</span>
              </h3>

              {/* Species Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  Especie de la Mascota *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                  {(Object.keys(SPECIES_CONFIG) as PetSpecies[]).map((sp) => {
                    const cfg = SPECIES_CONFIG[sp];
                    const isSelected = species === sp;
                    return (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => setSpecies(sp)}
                        className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'border-[#0277BD] bg-[#EBF5FB] shadow-xs ring-2 ring-[#0277BD]/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl">{cfg.emoji}</span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#014A75]' : 'text-slate-700'}`}>
                          {cfg.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name, Breed, Avatar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Nombre de la Mascota *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Luna, Milo, Copito, Pancho..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Raza o Variedad
                  </label>
                  <input
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="Ej. Golden Retriever, Europeo común, Holandés Enano..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Años de Edad
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={ageYears}
                      onChange={(e) => setAgeYears(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Meses
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={ageMonths}
                      onChange={(e) => setAgeMonths(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Sexo
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'macho' | 'hembra')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none bg-white"
                    >
                      <option value="macho">Macho ♂</option>
                      <option value="hembra">Hembra ♀</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Peso Aprox. (Kg)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={weightKg || ''}
                      onChange={(e) => setWeightKg(parseFloat(e.target.value) || undefined)}
                      placeholder="Ej. 12"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    URL de la Foto / Avatar
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="relative flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isNeutered}
                      onChange={(e) => setIsNeutered(e.target.checked)}
                      className="w-5 h-5 rounded text-[#0277BD] focus:ring-[#0277BD]"
                    />
                    <span className="text-sm font-semibold text-slate-800">
                      Mascota esterilizada / castrada
                    </span>
                  </label>
                </div>
              </div>

              {/* Service Status & Cuidador Asignado */}
              <div className="p-4 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#014A75] uppercase tracking-wide mb-1">
                    Servicio en Cuidados Miau
                  </label>
                  <select
                    value={currentServiceStatus}
                    onChange={(e) => setCurrentServiceStatus(e.target.value as PetProfile['currentServiceStatus'])}
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-300 text-sm bg-white font-medium"
                  >
                    <option value="guarderia_cuidador">Hospedaje Familiar en Casa de Cuidador</option>
                    <option value="guarderia_domicilio">Guardería / Cuidado en su Propia Casa</option>
                    <option value="paseo_activo">Paseos Diarios Programados</option>
                    <option value="en_casa_con_tutor">En Casa con Tutor (Inactivo / Futura reserva)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#014A75] uppercase tracking-wide mb-1">
                    Cuidador de Referencia Asignado
                  </label>
                  <input
                    type="text"
                    value={assignedCaregiver}
                    onChange={(e) => setAssignedCaregiver(e.target.value)}
                    placeholder="Ej. Lucía Fernández (Cuidadora certificada)"
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-300 text-sm bg-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: HISTORIAL DE VACUNACIÓN Y SALUD */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span>Historial de Vacunación & Datos Sanitarios</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Estado de Vacunación General
                  </label>
                  <select
                    value={vaccinationStatus}
                    onChange={(e) => setVaccinationStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-medium"
                  >
                    <option value="completa">Vacunación Completa y al Día ✓</option>
                    <option value="en_proceso">En Proceso de Vacunación</option>
                    <option value="pendiente">Pendiente de Actualizar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Última Desparasitación
                  </label>
                  <input
                    type="date"
                    value={lastDewormingDate}
                    onChange={(e) => setLastDewormingDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Número de Microchip
                  </label>
                  <input
                    type="text"
                    value={microchipNumber}
                    onChange={(e) => setMicrochipNumber(e.target.value)}
                    placeholder="ES-982000000000000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Vaccine List & Add new */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Vacunas Registradas en la Ficha:
                  </span>
                  <span className="text-xs text-slate-500">
                    Sugeridas para {SPECIES_CONFIG[species].label}: {SPECIES_CONFIG[species].typicalVaccines.join(', ')}
                  </span>
                </div>

                {vaccines.length > 0 ? (
                  <div className="space-y-2">
                    {vaccines.map((v) => (
                      <div key={v.id} className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900">{v.name}</span>
                          <span className="ml-2 text-slate-500">Aplicada: {v.dateAdministered}</span>
                          {v.nextDueDate && <span className="ml-2 text-[#F58220] font-semibold">• Próxima: {v.nextDueDate}</span>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveVaccine(v.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No hay vacunas añadidas aún.</p>
                )}

                {/* Add new vaccine mini-form */}
                <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={newVacName}
                    onChange={(e) => setNewVacName(e.target.value)}
                    placeholder="Nombre de la vacuna (ej. Rabia, Trivalente...)"
                    className="w-full sm:flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                  <input
                    type="date"
                    value={newVacDate}
                    onChange={(e) => setNewVacDate(e.target.value)}
                    className="w-full sm:w-40 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddVaccine}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Añadir Vacuna
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: ALERGIAS, DIETA & MEDICACIÓN */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#F58220]" />
                <span>Alergias, Plan de Dieta & Medicación</span>
              </h3>

              {/* Allergies section */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold text-rose-950 uppercase tracking-wide cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasAllergies}
                      onChange={(e) => setHasAllergies(e.target.checked)}
                      className="w-4 h-4 rounded text-rose-600"
                    />
                    <span>¿Tiene alergias o intolerancias alimentarias/ambientales?</span>
                  </label>

                  {hasAllergies && (
                    <select
                      value={allergySeverity}
                      onChange={(e) => setAllergySeverity(e.target.value as any)}
                      className="text-xs bg-white border border-rose-300 rounded-lg px-2 py-1 font-bold text-rose-800"
                    >
                      <option value="leve">Severidad Leve</option>
                      <option value="moderada">Severidad Moderada</option>
                      <option value="grave">Severidad Grave / Shock</option>
                    </select>
                  )}
                </div>

                {hasAllergies && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <span className="text-xs text-slate-600 block mb-1.5 font-medium">
                        Selecciona alergias habituales o escribe una nueva:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {COMMON_ALLERGIES.map((alg) => {
                          const isSel = allergiesList.includes(alg);
                          return (
                            <button
                              key={alg}
                              type="button"
                              onClick={() => toggleAllergy(alg)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                                isSel
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300'
                              }`}
                            >
                              {isSel ? '✓ ' : '+ '}
                              {alg}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          value={allergyInput}
                          onChange={(e) => setAllergyInput(e.target.value)}
                          placeholder="Otra alergia..."
                          className="flex-1 px-3 py-1.5 rounded-xl border border-rose-200 text-xs bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomAllergy}
                          className="px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                        >
                          Añadir
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-rose-900 mb-1">
                        Protocolo de Emergencia si ingiere el alérgeno:
                      </label>
                      <textarea
                        rows={2}
                        value={allergyEmergencyProtocol}
                        onChange={(e) => setAllergyEmergencyProtocol(e.target.value)}
                        placeholder="Ej. Dar 1 pastilla de antihistamínico guardado en su mochila y llamar inmediatamente al veterinario..."
                        className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Diet Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Tipo de Dieta
                  </label>
                  <select
                    value={dietType}
                    onChange={(e) => setDietType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-medium"
                  >
                    <option value="pienso_croquetas">Pienso / Croquetas</option>
                    <option value="comida_humeda">Comida Húmeda / Latas</option>
                    <option value="barf_natural">BARF / Dieta Natural Cruda</option>
                    <option value="heno_vegetales">Heno & Vegetales Frescos (Conejos/Cobayas)</option>
                    <option value="semillas_frutas">Semillas, Pellets & Fruta (Aves/Loros/Catas)</option>
                    <option value="mixta">Mixta (Pienso + Húmedo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Marca o Preparación Específica
                  </label>
                  <input
                    type="text"
                    value={dietBrand}
                    onChange={(e) => setDietBrand(e.target.value)}
                    placeholder="Ej. Acana Grasslands, Oxbow Timothy, Harrison..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Cantidad por Toma
                  </label>
                  <input
                    type="text"
                    value={portionQuantity}
                    onChange={(e) => setPortionQuantity(e.target.value)}
                    placeholder="Ej. 120 gramos, 1 cuenco medido, heno infinito..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Tomas al Día & Horarios
                  </label>
                  <input
                    type="text"
                    value={feedingTimes.join(', ')}
                    onChange={(e) => setFeedingTimes(e.target.value.split(',').map(s => s.trim()))}
                    placeholder="08:30, 20:00"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Premios / Snacks Permitidos
                  </label>
                  <input
                    type="text"
                    value={treatsAllowed}
                    onChange={(e) => setTreatsAllowed(e.target.value)}
                    placeholder="Ej. Trocitos de manzana, snacks liofilizados de pato..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-rose-700 uppercase tracking-wide mb-1">
                    Alimentos Prohibidos
                  </label>
                  <input
                    type="text"
                    value={forbiddenFoods}
                    onChange={(e) => setForbiddenFoods(e.target.value)}
                    placeholder="Ej. Pollo, chocolate, pan, cebolla, aguacate (aves)..."
                    className="w-full px-4 py-2.5 rounded-xl border border-rose-200 text-sm"
                  />
                </div>
              </div>

              {/* Medications Table */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                <span className="text-xs font-bold text-amber-950 uppercase tracking-wide block">
                  Medicamentos Diarios Administrados por el Cuidador:
                </span>

                {medications.length > 0 && (
                  <div className="space-y-2">
                    {medications.map((m) => (
                      <div key={m.id} className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-amber-950">{m.name}</strong>
                          <span className="ml-2 text-slate-600">({m.dose} • {m.frequency})</span>
                          {m.instructions && <p className="text-slate-500 italic mt-0.5">{m.instructions}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(m.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                  <input
                    type="text"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="Nombre fármaco"
                    className="px-3 py-2 rounded-xl border border-amber-200 text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    placeholder="Dosis (ej. 1 pastilla)"
                    className="px-3 py-2 rounded-xl border border-amber-200 text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={newMedFreq}
                    onChange={(e) => setNewMedFreq(e.target.value)}
                    placeholder="Frecuencia (ej. Cada 12h)"
                    className="px-3 py-2 rounded-xl border border-amber-200 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddMedication}
                    className="px-3 py-2 bg-[#F58220] hover:bg-[#E06D0C] text-white font-bold text-xs rounded-xl"
                  >
                    + Añadir Medicación
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: COMPORTAMIENTO & MIEDOS */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Heart className="w-5 h-5 text-indigo-500" />
                <span>Comportamiento, Convivencia & Miedos</span>
              </h3>

              {/* Socialization Checkbox Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  ¿Con quién se lleva bien la mascota?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <label className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${goodWithDogs ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    <input type="checkbox" checked={goodWithDogs} onChange={(e) => setGoodWithDogs(e.target.checked)} className="rounded text-emerald-600" />
                    <span>🐶 Con Perros</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${goodWithCats ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    <input type="checkbox" checked={goodWithCats} onChange={(e) => setGoodWithCats(e.target.checked)} className="rounded text-emerald-600" />
                    <span>🐱 Con Gatos</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${goodWithSmallAnimals ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    <input type="checkbox" checked={goodWithSmallAnimals} onChange={(e) => setGoodWithSmallAnimals(e.target.checked)} className="rounded text-emerald-600" />
                    <span>🐰 Pequeños</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${goodWithChildren ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    <input type="checkbox" checked={goodWithChildren} onChange={(e) => setGoodWithChildren(e.target.checked)} className="rounded text-emerald-600" />
                    <span>👶 Con Niños</span>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-colors ${goodWithStrangers ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                    <input type="checkbox" checked={goodWithStrangers} onChange={(e) => setGoodWithStrangers(e.target.checked)} className="rounded text-emerald-600" />
                    <span>🧑 Extraños</span>
                  </label>
                </div>
              </div>

              {/* Conflict triggers */}
              <div>
                <label className="block text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                  ¿Con quién o qué se lleva mal? Desencadenantes de tensión o conflicto
                </label>
                <textarea
                  rows={2}
                  value={conflictTriggers}
                  onChange={(e) => setConflictTriggers(e.target.value)}
                  placeholder="Ej. Le ladra a perros machos dominantes con correa; no le gusta que le toquen la cola; asustadizo con niños que corren..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                />
              </div>

              {/* Energy Level, Games, Routine */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Nivel de Energía
                  </label>
                  <select
                    value={energyLevel}
                    onChange={(e) => setEnergyLevel(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="bajo">Bajo (Tranquilo / Dormilón)</option>
                    <option value="medio">Medio (Equilibrado)</option>
                    <option value="alto">Alto (Juguetón / Activo)</option>
                    <option value="muy_alto">Muy Alto (Deportista / Cachorro)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Juegos y Actividades Favoritas
                  </label>
                  <input
                    type="text"
                    value={favoriteGames}
                    onChange={(e) => setFavoriteGames(e.target.value)}
                    placeholder="Ej. Pelota de tenis, caña de plumas, forrajeo de semillas, caricias..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              {/* Fears & Calming Protocol */}
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                <span className="text-xs font-bold text-purple-950 uppercase tracking-wide block">
                  Miedos Conocidos & Fobias:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_FEARS.map((fear) => {
                    const isSel = fearsList.includes(fear);
                    return (
                      <button
                        key={fear}
                        type="button"
                        onClick={() => toggleFear(fear)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                          isSel
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-slate-700 border border-purple-200 hover:border-purple-400'
                        }`}
                      >
                        {isSel ? '✓ ' : '+ '}
                        {fear}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={fearInput}
                    onChange={(e) => setFearInput(e.target.value)}
                    placeholder="Otro miedo..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-purple-200 text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomFear}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-xl text-xs font-bold"
                  >
                    Añadir Miedo
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-950 mb-1">
                    Protocolo para Tranquilizarlo (Instrucción para el Cuidador):
                  </label>
                  <textarea
                    rows={2}
                    value={fearCalmingProtocol}
                    onChange={(e) => setFearCalmingProtocol(e.target.value)}
                    placeholder="Ej. Poner música suave, taparle la jaula / ponerle su manta, no mirarlo fijamente, hablarle en susurros..."
                    className="w-full px-3 py-2 rounded-xl border border-purple-200 text-xs bg-white"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: VETERINARIO & TUTOR */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Phone className="w-5 h-5 text-rose-500" />
                <span>Contactos de Emergencia del Veterinario & Datos del Tutor</span>
              </h3>

              {/* Vet Details */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-4">
                <span className="text-xs font-black text-rose-950 uppercase tracking-wide block">
                  Clínica Veterinaria de Referencia *
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Clínica *</label>
                    <input
                      type="text"
                      required
                      value={vetClinicName}
                      onChange={(e) => setVetClinicName(e.target.value)}
                      placeholder="Hospital Veterinario Central"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Veterinario de Cabecera</label>
                    <input
                      type="text"
                      value={vetDoctorName}
                      onChange={(e) => setVetDoctorName(e.target.value)}
                      placeholder="Dra. Carmen Suárez"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Clínica Habitual *</label>
                    <input
                      type="tel"
                      required
                      value={vetPhone}
                      onChange={(e) => setVetPhone(e.target.value)}
                      placeholder="+34 912 345 678"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-rose-700 mb-1">Teléfono Urgencias 24h *</label>
                    <input
                      type="tel"
                      required
                      value={vetEmergencyPhone}
                      onChange={(e) => setVetEmergencyPhone(e.target.value)}
                      placeholder="+34 600 112 233"
                      className="w-full px-3 py-2 rounded-xl border border-rose-300 text-xs bg-white font-mono font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de la Clínica</label>
                    <input
                      type="text"
                      value={vetAddress}
                      onChange={(e) => setVetAddress(e.target.value)}
                      placeholder="Calle Mayor 45, Madrid"
                      className="w-full px-3 py-2 rounded-xl border border-rose-200 text-xs bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={hasPetInsurance}
                        onChange={(e) => setHasPetInsurance(e.target.checked)}
                        className="rounded text-rose-600"
                      />
                      <span>¿Tiene seguro veterinario contratado?</span>
                    </label>
                    {hasPetInsurance && (
                      <input
                        type="text"
                        value={insurancePolicyNumber}
                        onChange={(e) => setInsurancePolicyNumber(e.target.value)}
                        placeholder="Nº de póliza de seguro..."
                        className="flex-1 px-3 py-1.5 rounded-xl border border-rose-200 text-xs bg-white"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Owner Details */}
              <div className="p-4 rounded-2xl bg-[#EBF5FB] border border-[#BEE3F8] space-y-4">
                <span className="text-xs font-black text-[#014A75] uppercase tracking-wide block">
                  Datos del Tutor / Dueño *
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo del Tutor *</label>
                    <input
                      type="text"
                      required
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      placeholder="María González"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Móvil Directo *</label>
                    <input
                      type="tel"
                      required
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      placeholder="+34 612 345 678"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email de Contacto</label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="maria@email.com"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Dirección del Hogar</label>
                    <input
                      type="text"
                      value={ownerAddress}
                      onChange={(e) => setOwnerAddress(e.target.value)}
                      placeholder="Calle Alcalá 120, Madrid"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contacto Secundario de Emergencia</label>
                    <input
                      type="text"
                      value={secondaryContactName}
                      onChange={(e) => setSecondaryContactName(e.target.value)}
                      placeholder="Nombre del familiar o amigo"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Contacto Secundario</label>
                    <input
                      type="tel"
                      value={secondaryContactPhone}
                      onChange={(e) => setSecondaryContactPhone(e.target.value)}
                      placeholder="+34 655 444 333"
                      className="w-full px-3 py-2 rounded-xl border border-sky-200 text-xs bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Cuidador Quick Instructions */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">
                  Instrucción Prioritaria para el Cuidador:
                </label>
                <textarea
                  rows={2}
                  value={caregiverQuickNotes}
                  onChange={(e) => setCaregiverQuickNotes(e.target.value)}
                  placeholder="Resumen que el cuidador verá en su pantalla de inicio al atender a la mascota..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0277BD] focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                ← Anterior
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-5 py-2.5 rounded-xl bg-[#0277BD] hover:bg-[#01579B] text-white font-bold text-xs shadow-md transition-colors"
                >
                  Siguiente Paso →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F58220] to-[#E06D0C] hover:from-[#E06D0C] hover:to-[#C85D00] text-white font-extrabold text-sm shadow-lg flex items-center gap-2 transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>{editPet ? 'Guardar Cambios' : 'Crear Perfil de Mascota'}</span>
                </button>
              )}
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
