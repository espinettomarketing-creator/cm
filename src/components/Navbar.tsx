import React, { useState } from 'react';
import { usePet } from '../context/PetContext';
import { 
  PhoneCall,
  Menu,
  X,
  MessageCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = usePet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Sección arriba de la barra: Solo "Citas con previo aviso" */}
      <div className="bg-gradient-to-r from-[#014A75] via-[#0277BD] to-[#F58220] text-white text-xs sm:text-sm font-bold px-4 py-2 text-center tracking-wide">
        Citas con previo aviso
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo oficial en la esquina izquierda: Imagen en proporción con nombre de marca */}
          <div 
            onClick={() => setActiveTab('servicios')} 
            className="cursor-pointer group flex items-center gap-3 select-none py-1"
          >
            <img 
              src="/logo.svg" 
              alt="Cuidados Miau Logo" 
              className="w-13 h-13 sm:w-15 sm:h-15 object-contain aspect-square rounded-full border border-sky-100 shadow-xs group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#014A75] font-display leading-tight">
                Cuidados <span className="text-[#F58220]">Miau</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#0277BD] tracking-wider uppercase">
                Guardería & Paseos
              </span>
            </div>
          </div>

          {/* Menú de Navegación: Exclusivamente "Servicios", "Nosotros", "Contacto" */}
          <nav className="hidden md:flex items-center gap-2 bg-[#F0F8FF] p-1.5 rounded-2xl border border-sky-200/60">
            <button
              onClick={() => setActiveTab('servicios')}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'servicios'
                  ? 'bg-[#0277BD] text-white shadow-md shadow-[#0277BD]/25'
                  : 'text-[#014A75] hover:text-[#0277BD] hover:bg-white/70'
              }`}
            >
              Servicios
            </button>

            <button
              onClick={() => setActiveTab('nosotros')}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'nosotros'
                  ? 'bg-[#0277BD] text-white shadow-md shadow-[#0277BD]/25'
                  : 'text-[#014A75] hover:text-[#0277BD] hover:bg-white/70'
              }`}
            >
              Nosotros
            </button>

            <button
              onClick={() => setActiveTab('contacto')}
              className={`px-6 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'contacto'
                  ? 'bg-[#0277BD] text-white shadow-md shadow-[#0277BD]/25'
                  : 'text-[#014A75] hover:text-[#0277BD] hover:bg-white/70'
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Botón WhatsApp de contacto directo a la derecha */}
          <div className="hidden sm:flex items-center">
            <a
              href="https://wa.me/56983663316?text=Hola%20Cuidados%20Miau,%20quisiera%20solicitar%20una%20cita%20con%20previo%20aviso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Menú móvil (hamburger) */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable: Solo "Servicios", "Nosotros", "Contacto" */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-fade-in">
          <button
            onClick={() => { setActiveTab('servicios'); setMobileMenuOpen(false); }}
            className={`w-full p-3 rounded-xl text-left font-extrabold text-sm flex items-center justify-between ${
              activeTab === 'servicios' ? 'bg-[#0277BD] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span>Servicios</span>
            <span>→</span>
          </button>
          <button
            onClick={() => { setActiveTab('nosotros'); setMobileMenuOpen(false); }}
            className={`w-full p-3 rounded-xl text-left font-extrabold text-sm flex items-center justify-between ${
              activeTab === 'nosotros' ? 'bg-[#0277BD] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span>Nosotros</span>
            <span>→</span>
          </button>
          <button
            onClick={() => { setActiveTab('contacto'); setMobileMenuOpen(false); }}
            className={`w-full p-3 rounded-xl text-left font-extrabold text-sm flex items-center justify-between ${
              activeTab === 'contacto' ? 'bg-[#0277BD] text-white' : 'text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span>Contacto</span>
            <span>→</span>
          </button>

          <a
            href="https://wa.me/56983663316?text=Hola%20Cuidados%20Miau,%20quisiera%20solicitar%20una%20cita%20con%20previo%20aviso"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-2 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hablar por WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};
