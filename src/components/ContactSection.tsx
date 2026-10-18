import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Sparkles,
  ShieldCheck,
  Heart,
  CalendarCheck,
  ExternalLink,
  Navigation,
  Instagram
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const whatsappUrl = "https://wa.me/56983663316?text=" + encodeURIComponent(
    "¡Hola Cuidados Miau! Quisiera consultar por el cuidado de mi mascota."
  );

  const googleMapsUrl = "https://www.google.com/maps/place/Cuidados+miau/data=!4m2!3m1!1s0x0:0x2275b4e8b462a158?sa=X&ved=1t:2428&ictx=111";
  const instagramUrl = "https://www.instagram.com/cuidadosmiau/";

  return (
    <div className="space-y-12 py-6 animate-fade-in max-w-5xl mx-auto">
      
      {/* Contact Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#EBF5FB] text-[#0277BD] border border-[#BEE3F8]">
          <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
          <span>Atención Personalizada y Directa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#014A75] tracking-tight font-display">
          Contacta con Cuidados Miau
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          ¿Tienes dudas o quieres coordinar el cuidado de tu mascota? Escríbenos o llámanos directamente por WhatsApp o teléfono. Respondemos a la brevedad con todo el cariño y dedicación que merecen.
        </p>
      </div>

      {/* Main WhatsApp Direct Action Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/15 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-extrabold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            Canal Principal de Comunicación
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
              Chatea con nosotros por WhatsApp
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
              La vía más rápida para coordinar visitas a domicilio, reservas de guardería sin jaulas y resolver cualquier duda sobre tu mascota.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 py-4 px-7 bg-white hover:bg-emerald-50 text-emerald-800 font-black text-sm sm:text-base rounded-2xl shadow-lg transition-all active:scale-95 group cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>Abrir WhatsApp (+56 9 8366 3316)</span>
            </a>

            <a
              href="tel:+56983663316"
              className="inline-flex items-center justify-center gap-2 py-4 px-5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5 text-emerald-200" />
              <span>Llamar por Teléfono</span>
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-4 px-5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-sm rounded-2xl border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Instagram className="w-5 h-5 text-white" />
              <span>Instagram @cuidadosmiau</span>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Teléfono */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-[#0277BD] transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5FB] text-[#0277BD] flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Teléfono Móvil</span>
            <a href="tel:+56983663316" className="text-lg font-black text-[#0277BD] hover:underline block mt-0.5">
              +56 9 8366 3316
            </a>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Atención telefónica directa para consultas y urgencias.
          </p>
        </div>

        {/* Card 2: Correo */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-[#F58220] transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5EC] text-[#F58220] flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Correo Electrónico</span>
            <a href="mailto:cuidadosmiau@gmail.com" className="text-sm font-black text-slate-800 hover:text-[#0277BD] hover:underline block mt-0.5">
              cuidadosmiau@gmail.com
            </a>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Escríbenos para presupuestos detallados o información formal.
          </p>
        </div>

        {/* Card 3: Instagram */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-pink-400 hover:shadow-md transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
            <Instagram className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Instagram</span>
            <a 
              href={instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-base sm:text-lg font-black text-pink-600 hover:text-pink-700 hover:underline inline-flex items-center gap-1.5 mt-0.5"
            >
              <span>@cuidadosmiau</span>
              <ExternalLink className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Síguenos para ver fotos, historias del día a día y novedades de las mascotas.
          </p>
        </div>

        {/* Card 4: Horarios */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-purple-300 transition-colors">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Horario de Atención</span>
            <p className="text-base font-black text-slate-900 block mt-0.5">
              Lunes a Domingo
            </p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Atención continua 24 horas para mascotas hospedadas (Citas con previo aviso).
          </p>
        </div>

        {/* Card 5: Cobertura */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:border-emerald-300 transition-colors sm:col-span-2 lg:col-span-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Cobertura de Servicios</span>
            <p className="text-base font-black text-slate-900 block mt-0.5">
              Servicio a Domicilio y Red de Hogares
            </p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Visitas a domicilio y red de hogares de cuidadores en entornos seguros, limpios y tranquilos.
          </p>
        </div>

      </div>

      {/* Google Maps Business Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden hover:shadow-lg transition-all">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-sky-50/70 to-orange-50/40">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0277BD] text-white flex items-center justify-center shadow-md shrink-0">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF5FB] text-[#0277BD]">
                <span>Ficha Oficial Google</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-1">
                Cuidados Miau en Google Maps
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Encuentra nuestra ubicación oficial, información del negocio y cómo llegar.
              </p>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0277BD] hover:bg-[#014A75] text-white text-xs sm:text-sm font-black rounded-xl transition-all shadow-sm active:scale-95 group shrink-0 cursor-pointer"
          >
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Map iframe embed */}
        <div className="relative w-full h-72 sm:h-88 bg-slate-100">
          <iframe
            title="Ubicación de Cuidados Miau en Google Maps"
            src="https://maps.google.com/maps?q=Cuidados+miau&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#F58220] shrink-0" />
            <span>Servicio a domicilio y red de cuidadores certificados. Citas y coordinación vía WhatsApp.</span>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0277BD] font-bold hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>Ver perfil y reseñas en Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Trust & Guarantee Banner */}
      <div className="bg-[#EBF5FB] border border-[#BEE3F8] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#0277BD] shadow-sm flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-[#014A75] text-base">
              Citas con previo aviso
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Para garantizar la mejor atención y tranquilidad de cada mascota, coordinamos todos los servicios y visitas con reserva previa por WhatsApp.
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-6 py-3 bg-[#0277BD] hover:bg-[#014A75] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Escribir por WhatsApp</span>
        </a>
      </div>

    </div>
  );
};
