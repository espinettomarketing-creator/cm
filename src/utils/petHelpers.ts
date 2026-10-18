import { PetSpecies } from '../types/pet';

export const SPECIES_CONFIG: Record<
  PetSpecies,
  {
    label: string;
    emoji: string;
    plural: string;
    badgeBg: string;
    badgeText: string;
    typicalVaccines: string[];
  }
> = {
  perro: {
    label: 'Perro',
    emoji: '🐶',
    plural: 'Perros',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
    badgeText: 'text-amber-800',
    typicalVaccines: ['Rabia', 'Polivalente (Séxtuple DHPPiL)', 'Tos de las Perreras (Bordetella)', 'Leishmania'],
  },
  gato: {
    label: 'Gato',
    emoji: '🐱',
    plural: 'Gatos',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    badgeText: 'text-indigo-800',
    typicalVaccines: ['Trivalente Felina (Panleucopenia, Herpesvirus, Calicivirus)', 'Leucemia Felina (FeLV)', 'Rabia Felina'],
  },
  conejo: {
    label: 'Conejo',
    emoji: '🐰',
    plural: 'Conejos',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    badgeText: 'text-emerald-800',
    typicalVaccines: ['Mixomatosis + RHD1', 'RHD2 (Variante hemorrágica vírica tipo 2)'],
  },
  cobaya: {
    label: 'Cobaya',
    emoji: '🐹',
    plural: 'Cobayas',
    badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
    badgeText: 'text-rose-800',
    typicalVaccines: ['Chequeo Veterinario Exóticos Semestral', 'Coprológico y desparasitación'],
  },
  loro: {
    label: 'Loro',
    emoji: '🦜',
    plural: 'Loros',
    badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
    badgeText: 'text-teal-800',
    typicalVaccines: ['Chequeo de Psitácidas', 'Test PCR Psitacosis / PBFD', 'Desparasitación periódica'],
  },
  cata: {
    label: 'Cata / Periquito',
    emoji: '🪶',
    plural: 'Catas y Aves',
    badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
    badgeText: 'text-sky-800',
    typicalVaccines: ['Revisión Veterinaria de Aves', 'Test de Poliomavirus / Psitacosis'],
  },
  otro: {
    label: 'Otro Pequeño Animal',
    emoji: '🐾',
    plural: 'Otros Pequeños',
    badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
    badgeText: 'text-purple-800',
    typicalVaccines: ['Chequeo Veterinario Preventivo'],
  },
};

export const SERVICE_STATUS_LABELS: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  guarderia_cuidador: {
    label: 'En Hospedaje Familiar',
    bg: 'bg-orange-50 border-orange-200 text-orange-800',
    text: 'text-orange-700',
    dot: 'bg-orange-500',
  },
  guarderia_domicilio: {
    label: 'Cuidado en su Casa',
    bg: 'bg-blue-50 border-blue-200 text-blue-800',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
  },
  paseo_activo: {
    label: 'Paseo Diario Activo',
    bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  en_casa_con_tutor: {
    label: 'Con su Tutor (Inactivo)',
    bg: 'bg-slate-50 border-slate-200 text-slate-700',
    text: 'text-slate-600',
    dot: 'bg-slate-400',
  },
};

export function formatAge(years: number, months: number): string {
  if (years === 0 && months === 0) return 'Recién nacido';
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'año' : 'años'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mes' : 'meses'}`);
  return parts.join(' y ');
}
