export type PetSpecies = 
  | 'perro' 
  | 'gato' 
  | 'conejo' 
  | 'cobaya' 
  | 'loro' 
  | 'cata' 
  | 'otro';

export interface VaccineItem {
  id: string;
  name: string;
  dateAdministered: string;
  nextDueDate?: string;
  status: 'al_dia' | 'proxima' | 'vencida';
  notes?: string;
}

export interface MedicationItem {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  instructions: string;
}

export interface DailyReport {
  id: string;
  petId: string;
  date: string;
  time: string;
  caregiverName: string;
  serviceType: 'guarderia_domicilio' | 'guarderia_cuidador' | 'paseo';
  mood: 'super_feliz' | 'tranquilo' | 'jugueton' | 'timido_pero_bien' | 'cansado';
  foodStatus: 'comio_todo' | 'comio_la_mitad' | 'poco_apetito' | 'no_le_tocaba';
  hydrationStatus: 'bebio_bien' | 'normal' | 'poco';
  bathroomStatus: 'pipiy_caca_ok' | 'solo_pipi' | 'sin_novedades' | 'heces_blandas';
  walkMinutes?: number;
  medicationGiven?: boolean;
  photoUrl: string;
  summaryNote: string;
}

export interface PetProfile {
  id: string;
  name: string;
  species: PetSpecies;
  speciesCustomName?: string;
  breed: string;
  ageYears: number;
  ageMonths: number;
  gender: 'macho' | 'hembra';
  isNeutered: boolean;
  weightKg?: number;
  avatarUrl: string;
  galleryPhotos?: string[];

  // Historial de Vacunación y Salud
  vaccinationStatus: 'completa' | 'en_proceso' | 'pendiente';
  lastDewormingDate?: string;
  microchipNumber?: string;
  vaccines: VaccineItem[];

  // Alergias
  hasAllergies: boolean;
  allergiesList: string[];
  allergySeverity?: 'leve' | 'moderada' | 'grave';
  allergyEmergencyProtocol?: string;

  // Dieta
  dietType: 'pienso_croquetas' | 'comida_humeda' | 'barf_natural' | 'heno_vegetales' | 'semillas_frutas' | 'mixta';
  dietBrand: string;
  portionsPerDay: number;
  feedingTimes: string[];
  portionQuantity: string;
  treatsAllowed: string;
  forbiddenFoods: string;
  hydrationNotes?: string;
  medications: MedicationItem[];

  // Comportamiento & Sociabilización
  socialization: {
    goodWithDogs: boolean;
    goodWithCats: boolean;
    goodWithSmallAnimals: boolean;
    goodWithChildren: boolean;
    goodWithStrangers: boolean;
  };
  conflictTriggers: string; // e.g., "Le gruñe a perros machos con correa", "No le gusta que le toquen las patitas traseras"
  energyLevel: 'bajo' | 'medio' | 'alto' | 'muy_alto';
  favoriteGames: string;
  habitsAndRoutine: string; // e.g., "Duerme en su camita a las 22h, pide salir después de comer"

  // Miedos y Fobias
  fearsList: string[]; // e.g., ["Truenos", "Aspiradora", "Cohetes / Pirotecnia"]
  fearCalmingProtocol: string; // e.g., "Acariciarlo en el pecho, hablarle en voz baja, no forzarlo a salir de su refugio"

  // Contactos de Emergencia del Veterinario
  vetClinicName: string;
  vetDoctorName: string;
  vetPhone: string;
  vetEmergencyPhone: string;
  vetAddress: string;
  hasPetInsurance: boolean;
  insurancePolicyNumber?: string;

  // Datos del Tutor
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  ownerAddress: string;
  secondaryContactName?: string;
  secondaryContactPhone?: string;

  // Estado del Servicio en Cuidados Miau
  currentServiceStatus: 'guarderia_cuidador' | 'guarderia_domicilio' | 'paseo_activo' | 'en_casa_con_tutor';
  assignedCaregiver?: string;
  caregiverQuickNotes: string; // Resumen prioritario para el cuidador que atiende a la mascota
  createdAt: string;
  updatedAt: string;
}
