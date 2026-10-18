import React from 'react';
import { 
  Home, 
  Building2, 
  Footprints, 
  Sparkles, 
  CheckCircle2,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { usePet } from '../context/PetContext';

export const ServicesSection: React.FC = () => {
  const { setActiveTab } = usePet();

  return (
    <div className="space-y-16 py-6 animate-fade-in">
      
      {/* Services Showcase Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#EBF5FB] text-[#0277BD] border border-[#BEE3F8]">
          <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
          <span>Servicios Oficiales Cuidados Miau</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#014A75] tracking-tight font-display">
          Cuidado con Amor y Sin Estrés para Cada Mascota
        </h2>
        <p className="text-base text-slate-600 leading-relaxed">
          Ya sea en tu propio hogar o en el ambiente cálido de nuestros cuidadores certificados, tu mascota recibe atención individualizada, juegos, medicación puntual y reportes diarios con fotos.
        </p>
      </div>

      {/* 3 Core Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Service 1: Guardería a Domicilio */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-[#0277BD] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF5FB] text-[#0277BD] flex items-center justify-center font-bold text-2xl shadow-xs">
              <Home className="w-7 h-7 text-[#0277BD]" />
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0277BD] uppercase tracking-wider">
                Ideal para gatos, aves y roedores
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Guardería en su Propia Casa
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Visitas programadas de 45 a 90 minutos para alimentar, limpiar areneros/jaulas, administrar medicación, jugar y dar cariño sin sacar a tu mascota de su territorio seguro.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cero estrés por cambios de ambiente o viajes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Limpieza exhaustiva de comederos y bandejas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fotos y vídeos en directo en cada visita</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Riego de plantas y recogida de correspondencia</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('contacto')}
              className="w-full py-2.5 px-4 bg-[#EBF5FB] hover:bg-[#D5EAF8] text-[#0277BD] font-bold rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service 2: Hospedaje Familiar en Casa de Cuidador */}
        <div className="bg-gradient-to-b from-[#FFF5EC] to-white rounded-3xl p-6 sm:p-8 border-2 border-[#F58220] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#F58220] text-white shadow-xs">
            ⭐ Más Solicitado
          </div>

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F58220] text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-orange-500/25">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#E06D0C] uppercase tracking-wider">
                Hospedaje 24 horas sin jaulas
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Guardería en Casa de Cuidador
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Tu mascota se aloja en el hogar familiar de nuestros cuidadores certificados. Duermen en camas confortables, con compañía humana constante y cariño ilimitado.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% libre de jaulas o caniles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cuidadores con experiencia en primeros auxilios</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Seguimiento diario por WhatsApp con fotos y vídeos</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('contacto')}
              className="w-full py-2.5 px-4 bg-[#F58220] hover:bg-[#E06D0C] text-white font-bold rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Service 3: Paseos Diarios */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-2xl shadow-xs">
              <Footprints className="w-7 h-7 text-emerald-600" />
            </div>
            
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Para perros de todas las razas y edades
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900">
                Paseos Diarios & Ejercicio
              </h3>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Paseos enriquecedores de 30 a 60 minutos adaptados al ritmo y energía de tu perro: olfato, juego y socialización controlada con paseadores experimentados.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paseos individuales</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Rutas verdes en parques y zonas arboladas</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Limpieza de patitas y agua fresca al volver</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reporte con foto del paseo</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('contacto')}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Accepted Pets Carousel / Grid */}
      <div className="bg-[#0A192F] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F58220]">
            Amamos a Todos los Animales
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
            Especies Atendidas en Cuidados Miau
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Contamos con cuidadores especializados en etología canina, comportamiento felino y manejo de animales exóticos y aves.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { emoji: '🐶', name: 'Perros', desc: 'Todas las razas y tamaños, cachorros y seniors.' },
            { emoji: '🐱', gName: 'Gatos', name: 'Gatos', desc: 'Atención felina experta en casa y sin jaulas.' },
            { emoji: '🐰', name: 'Conejos', desc: 'Heno ilimitado, control digestivo y ejercicio.' },
            { emoji: '🐹', name: 'Cobayas', desc: 'Vitamina C diaria y lecho vegetal limpio.' },
            { emoji: '🦜', name: 'Loros', desc: 'Juegos de forrajeo, frutas frescas y compañía.' },
            { emoji: '🪶', name: 'Catas & Aves', desc: 'Seguridad máxima, ventanas protegidas y afecto.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2 hover:bg-white/10 transition-colors">
              <span className="text-4xl block">{item.emoji}</span>
              <h4 className="font-bold text-white text-sm">{item.name}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
