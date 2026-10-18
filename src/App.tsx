import React, { useState } from 'react';
import { PetProvider, usePet } from './context/PetContext';
import { Navbar } from './components/Navbar';
import { PetCard } from './components/PetCard';
import { PetDetailModal } from './components/PetDetailModal';
import { QuickCaregiverModal } from './components/QuickCaregiverModal';
import { PetFormModal } from './components/PetFormModal';
import { DailyReportModal } from './components/DailyReportModal';
import { CaregiverPortal } from './components/CaregiverPortal';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { DailyReportsFeed } from './components/DailyReportsFeed';
import { Footer } from './components/Footer';
import { CuidadosMiauLogo } from './components/CuidadosMiauLogo';
import { PetProfile, PetSpecies } from './types/pet';
import { SPECIES_CONFIG } from './utils/petHelpers';
import { 
  Search, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Camera, 
  Home, 
  Footprints, 
  Building2,
  Filter,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const MainApp: React.FC = () => {
  const { 
    pets, 
    activeTab, 
    setActiveTab, 
    userRole, 
    setUserRole,
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
    targetPetForReport,
    isAddReportModalOpen,
    setIsAddReportModalOpen
  } = usePet();

  // Modal states
  const [selectedPetForDetail, setSelectedPetForDetail] = useState<PetProfile | null>(null);
  const [selectedPetForQuickCare, setSelectedPetForQuickCare] = useState<PetProfile | null>(null);

  const handleOpenNewPet = () => {
    setEditingPet(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenDetail = (pet: PetProfile) => {
    setSelectedPetForDetail(pet);
  };

  const handleOpenQuickCaregiver = (pet: PetProfile) => {
    setSelectedPetForQuickCare(pet);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: SERVICIOS (HOME & CORE SERVICES) */}
        {activeTab === 'servicios' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Hero Banner with Official Logo */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#014A75] via-[#0277BD] to-[#01579B] text-white p-6 sm:p-10 shadow-xl border border-sky-900/30">
              <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-[#F58220]/25 blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="max-w-3xl space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/15 backdrop-blur-md border border-white/25 text-white">
                    <span className="w-2 h-2 rounded-full bg-[#F58220] animate-ping" />
                    <span>Guardería & Paseos de Mascotas con Amor</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                    Cuidado Con Amor, Sin Jaulas y Con Reportes Diarios
                  </h1>

                  <p className="text-sm sm:text-base text-sky-100 leading-relaxed font-medium">
                    Servicio de <strong>guardería en tu propia casa</strong>, <strong>hospedaje familiar en casa de cuidadores</strong> y <strong>paseos diarios</strong> para perros, gatos, conejos, cobayas, loros, catas y más animales pequeños.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Services Section Component */}
            <ServicesSection />



          </div>
        )}

        {/* VIEW 2: NOSOTROS */}
        {activeTab === 'nosotros' && (
          <AboutSection />
        )}

        {/* VIEW 3: CONTACTO */}
        {activeTab === 'contacto' && (
          <ContactSection />
        )}

        {/* VIEW 4: PORTAL DE CUIDADORES & FICHAS */}
        {(activeTab === 'cuidador' || activeTab === 'perfiles') && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-2">
              <button
                onClick={() => setActiveTab('servicios')}
                className="text-xs font-bold text-[#0277BD] hover:underline flex items-center gap-1"
              >
                ← Volver a Servicios
              </button>
              <button
                onClick={handleOpenNewPet}
                className="px-4 py-2 bg-[#F58220] hover:bg-[#E06D0C] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Registrar Nueva Mascota</span>
              </button>
            </div>

            <CaregiverPortal
              onOpenDetail={handleOpenDetail}
              onOpenQuickCaregiver={handleOpenQuickCaregiver}
            />
          </div>
        )}

        {/* VIEW 5: REPORTES DIARIOS */}
        {activeTab === 'reportes' && (
          <div className="space-y-6 animate-fade-in">
            <button
              onClick={() => setActiveTab('servicios')}
              className="text-xs font-bold text-[#0277BD] hover:underline flex items-center gap-1"
            >
              ← Volver a Servicios
            </button>
            <DailyReportsFeed onOpenDetail={handleOpenDetail} />
          </div>
        )}

      </main>

      {/* Global Modals */}
      <PetDetailModal
        pet={selectedPetForDetail}
        onClose={() => setSelectedPetForDetail(null)}
        onOpenQuickCaregiver={handleOpenQuickCaregiver}
      />

      <QuickCaregiverModal
        pet={selectedPetForQuickCare}
        onClose={() => setSelectedPetForQuickCare(null)}
      />

      <PetFormModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingPet(null);
        }}
        editPet={editingPet}
      />

      <DailyReportModal
        isOpen={isAddReportModalOpen}
        onClose={() => {
          setIsAddReportModalOpen(false);
        }}
        pet={targetPetForReport}
      />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PetProvider>
      <MainApp />
    </PetProvider>
  );
}
