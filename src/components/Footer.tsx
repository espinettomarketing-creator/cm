import React from 'react';
import { usePet } from '../context/PetContext';
import { CuidadosMiauLogo } from './CuidadosMiauLogo';
import { 
  Heart, 
  ShieldCheck, 
  PhoneCall, 
  Phone,
  Mail,
  MessageCircle, 
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Instagram
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetToSampleData } = usePet();

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-12 border-t border-sky-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <CuidadosMiauLogo size="sm" />
              <span className="text-2xl font-black text-white font-display tracking-tight">
                Cuidados <span className="text-[#F58220]">Miau</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guardería de mascotas con amor en tu propia casa y en casa de cuidadores certificados. Paseos diarios y seguimiento fotográfico en tiempo real.
            </p>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#0277BD]" />
              <span>Cuidadores Verificados & Cobertura Veterinaria</span>
            </div>
          </div>

          {/* Services Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Guardería en Tu Propia Casa</li>
              <li>• Paseos Diarios & Ejercicio Canino</li>
              <li>• Administración de Medicación y Dietas</li>
              <li>• Reportes Diarios con Fotos en Directo</li>
            </ul>
          </div>

          {/* Species Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Animales que Cuidamos
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <span>🐶 Perros (Todas razas)</span>
              <span>🐱 Gatos (Especialistas)</span>
              <span>🐰 Conejos (Heno & cuidados)</span>
              <span>🐹 Cobayas & Roedores</span>
              <span>🦜 Loros & Psitácidas</span>
              <span>🪶 Catas & Periquitos</span>
              <span>🐾 Pequeños animales</span>
              <span>❤️ Seniors & Cachorros</span>
            </div>
          </div>

          {/* Contact & Emergency Col */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Atención & Reservas
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Horario: Lunes a Domingo, 24 horas</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#0277BD]" />
                <span>Servicio a domicilio y red de hogares</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F58220]" />
                <a href="mailto:cuidadosmiau@gmail.com" className="hover:text-white transition-colors">
                  cuidadosmiau@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <a href="tel:+56983663316" className="hover:text-white transition-colors">
                  +56 9 8366 3316
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <a 
                  href="https://www.instagram.com/cuidadosmiau/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-pink-300 transition-colors"
                >
                  @cuidadosmiau
                </a>
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/56983663316?text=Hola%20Cuidados%20Miau"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directo WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={resetToSampleData}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
                title="Restaura los datos de demostración con mascotas de ejemplo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Mascotas de Demostración</span>
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Cuidados Miau. Guardería y paseos con amor y profesionalidad.</p>
          <p className="flex items-center gap-1">
            Diseñado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> para el bienestar de todos los animales.
          </p>
        </div>

      </div>
    </footer>
  );
};
