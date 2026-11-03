import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Clock,
  Users,
  BadgeCheck,
  PhoneCall,
  Sparkles,
  Send,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { BRAND, SERVICES } from '../data';

// ============================================================================
// HERO BANNER IMAGES (Local photos from /public/images/):
// ============================================================================
const heroImages = [
  { src: "/images/s1.jpg", alt: "Sentinel Security guards parade in uniform" },
  { src: "/images/s2.jpg", alt: "Security team and supervisor at industrial site" },
  { src: "/images/security-guards.jpg", alt: "Security guards lined up on campus" },
];

export default function Hero({ onOpenQuoteModal }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // Compact Quick Lead Form State (Name, Phone, Service)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: SERVICES[0]?.title || 'Corporate & IT Park Security',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  // Auto-fading carousel (3 images, 5s each)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateQuickForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      errors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone = 'Valid 10-digit mobile required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleQuickFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateQuickForm()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 900));

    const generatedId = `SEN-CB-${Math.floor(100000 + Math.random() * 900000)}`;
    setRefId(generatedId);

    const payload = {
      ...formData,
      id: generatedId,
      source: 'Hero Compact Quick Callback',
      timestamp: new Date().toISOString(),
    };

    console.log('[Sentinel Security] Quick Hero Callback:', payload);
    try {
      const existing = JSON.parse(localStorage.getItem('sentinel_leads') || '[]');
      existing.unshift(payload);
      localStorage.setItem('sentinel_leads', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const currentHero = heroImages[currentSlide];

  return (
    <div id="hero" className="relative w-full scroll-mt-28">
      {/* 1. PHOTO BANNER: min-h-[560px] md:min-h-[600px] */}
      <section className="relative w-full min-h-[560px] md:min-h-[600px] overflow-hidden flex flex-col justify-between pt-[104px] md:pt-[116px] pb-12 sm:pb-14">
        
        {/* Full-bleed Photo with Auto-Fading Transition (object-position: center 30%) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              {imageErrors[currentSlide] ? (
                /* Fallback gradient ONLY if an image fails to load */
                <div className="w-full h-full bg-gradient-to-br from-navy-950 via-navy-900 to-slate-900 flex items-center justify-center">
                  <Shield className="w-24 h-24 text-gold-500/20" />
                </div>
              ) : (
                <img
                  src={currentHero.src}
                  alt={currentHero.alt}
                  onError={() => setImageErrors((prev) => ({ ...prev, [currentSlide]: true }))}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 30%' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* LIGHT NAVY OVERLAY: Left 60% navy fading to transparent by 60% of the width */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,26,47,0.60)_0%,rgba(10,26,47,0.30)_30%,rgba(10,26,47,0)_60%)] pointer-events-none z-10" />

          {/* Subtle drone / tech surveillance indicator (top-right) */}
          <div className="hidden lg:flex items-center gap-2 absolute top-32 right-8 z-20 px-3 py-1.5 rounded-full bg-navy-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Surveillance & GPS Guard Monitoring</span>
          </div>
        </div>

        {/* Banner Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* LEFT SIDE CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-4"
            >
              {/* Gold Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-xs sm:text-sm font-bold backdrop-blur-md shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>PSARA Licensed • 500+ Trained Guards • 24x7 Service</span>
              </div>

              {/* H1 (Max 2 lines, text-4xl md:text-5xl, fully visible and clear) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins text-white tracking-tight leading-[1.15] max-w-2xl [text-shadow:_0_2px_14px_rgba(0,0,0,0.85)]">
                Professional Security Guard <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500">
                  Services in Indore
                </span>
              </h1>

              {/* One-Line Subtext */}
              <p className="text-sm sm:text-base text-slate-100 font-medium max-w-xl leading-relaxed [text-shadow:_0_1px_10px_rgba(0,0,0,0.85)]">
                Armed & unarmed guards for offices, factories, societies, banks, hospitals and events. Police-verified, uniformed and trained.
              </p>

              {/* Two Buttons: "Get Free Quote" (Gold) and "Call Now" (Outline) */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => onOpenQuoteModal()}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold font-poppins text-xs sm:text-sm shadow-soft-gold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Get Free Quote</span>
                  <ChevronRight className="w-4 h-4 text-navy-950" />
                </button>

                <a
                  href={`tel:${BRAND.phone}`}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-navy-900/50 hover:bg-navy-900/80 text-white font-bold text-xs sm:text-sm border-2 border-white/60 hover:border-gold-400 backdrop-blur-md transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-gold-400" />
                  <span>Call Now: {BRAND.phoneFormatted}</span>
                </a>
              </div>

              {/* Small Dots Carousel Navigation */}
              <div className="flex items-center gap-2 pt-2">
                {heroImages.map((item, idx) => (
                  <button
                    key={item.src}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-7 bg-gold-400' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Jump to slide ${idx + 1}`}
                  />
                ))}
                <span className="text-[11px] text-slate-200 ml-2 hidden sm:inline [text-shadow:_0_1px_6px_rgba(0,0,0,0.8)] font-medium">
                  {currentHero.alt}
                </span>
              </div>
            </motion.div>

            {/* RIGHT SIDE: COMPACT FORM CARD (max-w-[400px], far right, vertically centered) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:flex lg:col-span-5 justify-end items-center"
            >
              <div className="w-full max-w-[390px] bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 text-slate-800 ml-auto">
                <div className="mb-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                    2-Hour Guard Dispatch
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-poppins text-navy-950 mt-1">
                    Quick Security Callback
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Get an instant custom quote for your premises.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-4 text-center space-y-2"
                    >
                      <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-sm text-navy-950">Inquiry Received!</h4>
                      <p className="text-xs text-slate-600">
                        Our Area Officer will call you on <strong className="text-navy-950">+91 {formData.phone}</strong> shortly.
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono">Ref: {refId}</div>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs text-gold-600 font-bold hover:underline pt-1"
                      >
                        Submit Another
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleQuickFormSubmit} className="space-y-2.5">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Full Name *"
                          className={`w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 border outline-none text-slate-900 transition ${
                            formErrors.name ? 'border-rose-500' : 'border-slate-300 focus:border-gold-500 focus:bg-white'
                          }`}
                        />
                        {formErrors.name && (
                          <p className="text-rose-500 text-[10px] mt-0.5">{formErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <div className="relative">
                          <span className="absolute left-3 top-1.5 text-xs font-semibold text-slate-400">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="phone"
                            maxLength={10}
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Mobile Number *"
                            className={`w-full pl-10 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 border outline-none text-slate-900 transition ${
                              formErrors.phone ? 'border-rose-500' : 'border-slate-300 focus:border-gold-500 focus:bg-white'
                            }`}
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-rose-500 text-[10px] mt-0.5">{formErrors.phone}</p>
                        )}
                      </div>

                      <div>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 border border-slate-300 outline-none text-slate-800 focus:border-gold-500 cursor-pointer"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Connecting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Get Callback</span>
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-center text-slate-500 pt-0.5">
                        Free site survey in Indore & Pithampur • Zero obligation
                      </p>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MOBILE LEAD FORM (On screens below 1024px, stack it below the hero text, not over the photo) */}
      <div className="lg:hidden bg-slate-50 px-4 py-6 border-b border-slate-200">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-5 shadow-lg border border-slate-200">
          <div className="mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
              Immediate Response
            </span>
            <h3 className="text-base font-bold font-poppins text-navy-950 mt-1">
              Request Security Guard Callback
            </h3>
          </div>

          <form onSubmit={handleQuickFormSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Full Name *"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 outline-none"
              />
              {formErrors.name && (
                <p className="text-rose-500 text-[10px] mt-0.5">{formErrors.name}</p>
              )}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-semibold text-slate-400">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Mobile Number *"
                className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 outline-none"
              />
            </div>
            {formErrors.phone && (
              <p className="text-rose-500 text-[10px] mt-0.5">{formErrors.phone}</p>
            )}

            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-300 outline-none text-slate-800"
            >
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs shadow"
            >
              Get Callback
            </button>
          </form>
        </div>
      </div>

      {/* 2. THE 4 CHIPS IN A WHITE STRIP: Overlaps ONLY the bottom edge of the hero by about 40px (-mt-10, relative z-10) */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          
          {/* Chip 1 */}
          <div className="flex items-center gap-3 p-1">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-gold-600 flex items-center justify-center flex-shrink-0 border border-gold-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs sm:text-sm text-navy-950">
                Verified Guards
              </h4>
              <p className="text-[11px] text-slate-600 leading-tight">100% Police & ID Cleared</p>
            </div>
          </div>

          {/* Chip 2 */}
          <div className="flex items-center gap-3 p-1 pt-2 sm:pt-1 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs sm:text-sm text-navy-950">
                24x7 Support
              </h4>
              <p className="text-[11px] text-slate-600 leading-tight">Indore Control Room</p>
            </div>
          </div>

          {/* Chip 3 */}
          <div className="flex items-center gap-3 p-1 pt-2 sm:pt-1 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs sm:text-sm text-navy-950">
                Quick Deployment
              </h4>
              <p className="text-[11px] text-slate-600 leading-tight">2-Hour Standby SLA</p>
            </div>
          </div>

          {/* Chip 4 */}
          <div className="flex items-center gap-3 p-1 pt-2 sm:pt-1 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0 border border-purple-500/20">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs sm:text-sm text-navy-950">
                PSARA Certified
              </h4>
              <p className="text-[11px] text-slate-600 leading-tight">Govt. M.P. Authorized</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
