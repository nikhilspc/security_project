import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Clock,
  Users,
  BadgeCheck,
  ChevronRight,
  Loader2,
  Send,
  CheckCircle2,
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
  const [submitError, setSubmitError] = useState('');

  // Auto-fading carousel (3 images, 6s slow fade)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
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
    setSubmitError('');

    try {
      const submissionBody = new FormData();
      submissionBody.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "");
      submissionBody.append("subject", "New Guard Enquiry - Sentinel Security");
      submissionBody.append("from_name", "Sentinel Website");
      submissionBody.append("botcheck", "");
      submissionBody.append("name", formData.name.trim());
      submissionBody.append("phone", `+91 ${formData.phone.trim()}`);
      submissionBody.append("service", formData.service);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionBody,
      });

      const data = await res.json();

      if (data && data.success) {
        const generatedId = `SEN-CB-${Math.floor(100000 + Math.random() * 900000)}`;
        setRefId(generatedId);
        setIsSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please call us on +91 98930 12345.");
      }
    } catch (err) {
      setSubmitError("Something went wrong. Please call us on +91 98930 12345.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentHero = heroImages[currentSlide];

  return (
    <div id="hero" className="relative w-full overflow-hidden scroll-mt-28">
      {/* 3. HERO BANNER: min-h-[580px] sm:min-h-[620px] md:min-h-[660px], pb-20 sm:pb-24 md:pb-28 for trust strip clearance */}
      <section className="relative w-full min-h-[580px] sm:min-h-[620px] md:min-h-[660px] lg:h-[82svh] lg:max-h-[760px] overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 pb-20 sm:pb-24 md:pb-28">
        
        {/* Full-bleed Photo with Slow Fade (object-position: right center) */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-navy-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
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
                  style={{ objectPosition: 'right center' }}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* OVERLAY: solid navy (95%) on far left fading to fully transparent at ~65% width */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,26,47,0.95)_0%,rgba(10,26,47,0.85)_35%,rgba(10,26,47,0)_65%)] pointer-events-none z-10" />
        </div>

        {/* HERO CONTAINER: Left text content + Bottom-right corner glass form */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
          {/* LEFT CONTENT: max-w-xl so it does not stretch across photo, 16-20px spacing */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-xl space-y-4 sm:space-y-5 min-w-0 break-words"
          >
            {/* a) Eyebrow text (not a pill): uppercase, tracking-widest, text-sm */}
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-gold-400 block">
              PSARA LICENSED SECURITY AGENCY
            </span>

            {/* b) H1: text-2xl sm:text-3xl lg:text-4xl, bold, leading-snug, fits 2 lines */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-white leading-snug tracking-tight max-w-xl break-words">
              Trusted <span className="text-gold-400">Security Guards</span> for Your Business & Home
            </h1>

            {/* c) Short line: text-base md:text-lg */}
            <p className="text-base md:text-lg text-slate-200 max-w-lg leading-relaxed font-normal break-words">
              Police-verified, trained and uniformed guards, deployed within 24 hours across Indore.
            </p>

            {/* d) Two buttons side by side (min-w-[140px], flex-1, rounded-xl, 2px hover lift) */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 w-full">
              <button
                type="button"
                onClick={() => onOpenQuoteModal()}
                className="flex-1 min-w-[140px] min-h-[48px] sm:min-h-[52px] h-auto px-5 sm:px-7 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold font-poppins text-sm sm:text-base shadow-soft-gold hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <span>Hire Guards</span>
                <ChevronRight className="w-4 h-4 text-navy-950 flex-shrink-0" />
              </button>

              <a
                href={`tel:${BRAND.phone}`}
                title={BRAND.phoneFormatted}
                className="flex-1 min-w-[140px] min-h-[48px] sm:min-h-[52px] h-auto px-5 sm:px-7 rounded-xl border-2 border-white/70 hover:border-gold-400 text-white hover:text-gold-400 font-bold font-poppins text-sm sm:text-base hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center"
              >
                <span>Call Now</span>
              </a>
            </div>

            {/* e) Visible metrics line: text-white, font-medium, gold numbers, border-white/20, pt-4 */}
            <div className="pt-3.5 border-t border-white/20 text-xs sm:text-sm md:text-base text-white font-medium flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span><strong className="text-gold-400 font-semibold">500+</strong> Guards</span>
              <span className="text-white/40">•</span>
              <span><strong className="text-gold-400 font-semibold">120+</strong> Clients</span>
              <span className="text-white/40">•</span>
              <span><strong className="text-gold-400 font-semibold">24x7</strong> Support</span>
            </div>
          </motion.div>

          {/* RIGHT CONTENT: Lead Form in Bottom-Right Corner on Desktop, Below on < 1024px */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 lg:mt-0 lg:absolute lg:right-6 xl:right-10 lg:bottom-24 z-20 w-full max-w-md lg:max-w-none lg:w-[270px] xl:w-[280px] mx-auto lg:mx-0 min-w-0"
          >
            <div className="w-full p-4 rounded-xl bg-black/10 backdrop-blur-md bg-white/10 border border-white/25 shadow-xl shadow-black/20 text-white">
              {/* Form Header */}
              <div className="mb-2.5">
                <h3 className="text-base font-semibold font-poppins text-white leading-tight">
                  Need Guards? Call Me Back
                </h3>
                <p className="text-xs text-white/80 mt-0.5 leading-snug">
                  Get a free quote in 2 hours
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-3 text-center space-y-1.5"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-400/40">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">Inquiry Received!</h4>
                    <p className="text-[11px] text-white/85">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Our team will call you on{' '}
                      <strong className="text-white">+91 {formData.phone}</strong> soon.
                    </p>
                    <div className="text-[10px] text-white/70 font-mono">Ref: {refId}</div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError('');
                      }}
                      className="text-xs text-gold-400 font-bold hover:underline pt-0.5 block mx-auto"
                    >
                      Submit Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleQuickFormSubmit} className="space-y-2">
                    {/* Name input (min-h-[38px], text-sm) */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Full Name *"
                        className={`w-full min-h-[38px] h-auto px-3 py-1.5 text-sm rounded-lg bg-white/15 border text-white placeholder-white/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_rgba(15,25,40,0.85)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white] ${
                          formErrors.name ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/30'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-rose-300 text-[10px] mt-0.5 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Phone input with +91 (min-h-[38px], text-sm) */}
                    <div>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/80 select-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          maxLength={10}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Mobile Number *"
                          className={`w-full min-h-[38px] h-auto pl-10 pr-3 py-1.5 text-sm rounded-lg bg-white/15 border text-white placeholder-white/70 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition [&:-webkit-autofill]:[box-shadow:0_0_0_1000px_rgba(15,25,40,0.85)_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white] ${
                            formErrors.phone ? 'border-rose-400 ring-1 ring-rose-400' : 'border-white/30'
                          }`}
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-rose-300 text-[10px] mt-0.5 font-medium">{formErrors.phone}</p>
                      )}
                    </div>

                    {/* Service Dropdown (min-h-[38px], text-sm, readable options) */}
                    <div>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full min-h-[38px] h-auto px-2.5 py-1.5 text-sm rounded-lg bg-white/15 border border-white/30 text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 outline-none transition cursor-pointer"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.title} className="text-slate-900 bg-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Error Message */}
                    {submitError && (
                      <div className="p-2 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-200 text-[11px] leading-tight break-words">
                        {submitError}
                      </div>
                    )}

                    {/* Gold Button: min-h-[40px], rounded-lg, #F5B700 */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[40px] h-auto py-2 px-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-navy-950 flex-shrink-0" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 text-navy-950 flex-shrink-0" />
                          <span>Request Call</span>
                        </>
                      )}
                    </button>

                    {/* Footer note under button */}
                    <p className="text-[11px] text-center text-white/75 pt-0.5 font-normal">
                      Free site survey • Zero obligation
                    </p>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Slider dots: small and sit at the bottom-right corner above the trust strip */}
        <div className="absolute bottom-6 right-4 sm:bottom-12 sm:right-10 z-20 flex items-center gap-2">
          {heroImages.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-gold-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. TRUST STRIP: overlaps hero bottom by 32px, 4 items (title only), height ~72px */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100 items-center min-h-[72px]">
          
          {/* Item 1 */}
          <div className="flex items-center gap-3 p-1">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-gold-600 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-navy-950">
              Verified Guards
            </h4>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3 p-1 pt-3 sm:pt-1 lg:pl-6">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-navy-950">
              24x7 Support
            </h4>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3 p-1 pt-3 sm:pt-1 lg:pl-6">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-navy-950">
              Quick Deployment
            </h4>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3 p-1 pt-3 sm:pt-1 lg:pl-6">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h4 className="font-poppins font-semibold text-sm sm:text-base text-navy-950">
              PSARA Certified
            </h4>
          </div>

        </div>
      </div>
    </div>
  );
}
