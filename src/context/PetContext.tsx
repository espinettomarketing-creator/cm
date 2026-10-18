import React, { createContext, useContext, useState, useEffect } from 'react';
import { PetProfile, DailyReport, PetSpecies } from '../types/pet';
import { INITIAL_PETS, INITIAL_REPORTS } from '../data/mockPets';

interface PetContextType {
  pets: PetProfile[];
  dailyReports: DailyReport[];
  selectedPet: PetProfile | null;
  selectedPetId: string | null;
  setSelectedPetId: (id: string | null) => void;
  userRole: 'tutor' | 'cuidador';
  setUserRole: (role: 'tutor' | 'cuidador') => void;
  activeTab: 'servicios' | 'nosotros' | 'contacto' | 'perfiles' | 'cuidador' | 'reportes';
  setActiveTab: (tab: 'servicios' | 'nosotros' | 'contacto' | 'perfiles' | 'cuidador' | 'reportes') => void;
  
  // Actions
  addPet: (newPetData: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>) => PetProfile;
  updatePet: (id: string, updates: Partial<PetProfile>) => void;
  deletePet: (id: string) => void;
  addDailyReport: (reportData: Omit<DailyReport, 'id'>) => DailyReport;
  resetToSampleData: () => void;

  // Search and filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  speciesFilter: PetSpecies | 'todas';
  setSpeciesFilter: (species: PetSpecies | 'todas') => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;

  // Modals state
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  editingPet: PetProfile | null;
  setEditingPet: (pet: PetProfile | null) => void;
  isQuickCaregiverModalOpen: boolean;
  setIsQuickCaregiverModalOpen: (open: boolean) => void;
  isAddReportModalOpen: boolean;
  setIsAddReportModalOpen: (open: boolean) => void;
  targetPetForReport: PetProfile | null;
  setTargetPetForReport: (pet: PetProfile | null) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

const PETS_STORAGE_KEY = 'cuidados_miau_pets_v1';
const REPORTS_STORAGE_KEY = 'cuidados_miau_reports_v1';

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<PetProfile[]>(() => {
    try {
      const saved = localStorage.getItem(PETS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PETS;
  });

  const [dailyReports, setDailyReports] = useState<DailyReport[]>(() => {
    try {
      const saved = localStorage.getItem(REPORTS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_REPORTS;
  });

  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'tutor' | 'cuidador'>('tutor');
  const [activeTab, setActiveTab] = useState<'servicios' | 'nosotros' | 'contacto' | 'perfiles' | 'cuidador' | 'reportes'>('servicios');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<PetSpecies | 'todas'>('todas');
  const [statusFilter, setStatusFilter] = useState('todos');

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);
  const [isQuickCaregiverModalOpen, setIsQuickCaregiverModalOpen] = useState(false);
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [targetPetForReport, setTargetPetForReport] = useState<PetProfile | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(pets));
    } catch (e) {
      console.error('Failed to save pets to localStorage', e);
    }
  }, [pets]);

  useEffect(() => {
    try {
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(dailyReports));
    } catch (e) {
      console.error('Failed to save reports to localStorage', e);
    }
  }, [dailyReports]);

  const selectedPet = pets.find((p) => p.id === selectedPetId) || null;

  const addPet = (newPetData: Omit<PetProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newPet: PetProfile = {
      ...newPetData,
      id: `pet-${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setPets((prev) => [newPet, ...prev]);
    return newPet;
  };

  const updatePet = (id: string, updates: Partial<PetProfile>) => {
    const today = new Date().toISOString().split('T')[0];
    setPets((prev) =>
      prev.map((pet) => (pet.id === id ? { ...pet, ...updates, updatedAt: today } : pet))
    );
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    if (selectedPetId === id) {
      setSelectedPetId(null);
    }
  };

  const addDailyReport = (reportData: Omit<DailyReport, 'id'>) => {
    const newReport: DailyReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
    };
    setDailyReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  const resetToSampleData = () => {
    setPets(INITIAL_PETS);
    setDailyReports(INITIAL_REPORTS);
    try {
      localStorage.setItem(PETS_STORAGE_KEY, JSON.stringify(INITIAL_PETS));
      localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(INITIAL_REPORTS));
    } catch {
      // ignore
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        dailyReports,
        selectedPet,
        selectedPetId,
        setSelectedPetId,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        addPet,
        updatePet,
        deletePet,
        addDailyReport,
        resetToSampleData,
        searchQuery,
        setSearchQuery,
        speciesFilter,
        setSpeciesFilter,
        statusFilter,
        setStatusFilter,
        isCreateModalOpen,
        setIsCreateModalOpen,
        editingPet,
        setEditingPet,
        isQuickCaregiverModalOpen,
        setIsQuickCaregiverModalOpen,
        isAddReportModalOpen,
        setIsAddReportModalOpen,
        targetPetForReport,
        setTargetPetForReport,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePet must be used within a PetProvider');
  }
  return context;
};
