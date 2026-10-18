import React from 'react';
import { CuidadosMiauLogo } from './CuidadosMiauLogo';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Award, 
  CheckCircle2, 
  Users, 
  Camera
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-16 py-6 animate-fade-in">
      
      {/* Hero Nosotros */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#014A75] via-[#0277BD] to-[#01579B] text-white p-8 sm:p-12 shadow-xl border border-sky-900/30">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#F58220]/25 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/15 backdrop-blur-md border border-white/25 text-white">
            <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
            <span>Sobre Cuidados Miau</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Amamos a tus mascotas como si fueran de nuestra propia familia
          </h1>

          <p className="text-base sm:text-lg text-sky-100 leading-relaxed font-medium">
            En <strong>CuidadosMiau</strong> nacimos con una misión clara: ofrecer una alternativa cálida, respetuosa. Cuidamos perros, gatos, conejos, cobayas, loros, catas y pequeños animales en su propio hogar o en casa de cuidadores certificados.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm font-bold text-white">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Sin Jaulas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Cuidadores Certificados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Fotos y Reportes Diarios</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filosofía de Cuidado & Pilares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EBF5FB] text-[#0277BD] flex items-center justify-center font-bold">
            <Heart className="w-7 h-7 text-[#0277BD]" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Atención 100% Personalizada
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cada animal tiene su propia personalidad, manías y ritmos. Respetamos sus horarios exactos de comida, medicación, cepillado y juegos favoritos para que se sienta seguro y feliz.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF5EC] text-[#F58220] flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7 text-[#F58220]" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Fichas Clínicas & Seguridad
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Nuestro personal cuenta con acceso instantáneo a la ficha digital de cada mascota: alergias, miedos, protocolos de emergencia y contacto directo con su veterinario habitual 24/7.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Camera className="w-7 h-7 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900">
            Tranquilidad en tu Móvil
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Todos los días enviamos fotografías, vídeos y reportes de seguimiento (*cómo comió, estado de ánimo, paseos y anécdotas*) para que disfrutes de tu viaje sabiendo que está en las mejores manos.
          </p>
        </div>

      </div>



    </div>
  );
};
