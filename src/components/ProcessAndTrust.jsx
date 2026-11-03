import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Factory,
  Home,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Boxes,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Quote,
  Check,
} from 'lucide-react';
import {
  HOW_IT_WORKS_STEPS,
  INDUSTRIES,
  ENGAGEMENT_MODELS,
  TESTIMONIALS,
  CERTIFICATIONS,
} from '../data';

const industryIcons = {
  Building2,
  Factory,
  Home,
  ShoppingBag,
  HeartPulse,
  GraduationCap,
  Boxes,
  Landmark,
};

export default function ProcessAndTrust({ onOpenQuoteModal }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <>
      {/* SECTION 6: How It Works: 4-Step Timeline */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
              Swift 48-Hour Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight">
              How We Protect <br />
              <span className="text-gold-600">Your Property & Assets</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Our time-tested deployment blueprint ensures seamless transitions from your existing setup 
              with zero operational disruptions.
            </p>
          </div>

          {/* 4-Step Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-amber-600 z-0"></div>

            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative z-10 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-gold-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 text-gold-400 font-extrabold font-poppins text-xl flex items-center justify-center mb-6 shadow-md border-2 border-gold-500/40">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-navy-950 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-gold-600">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Phase {idx + 1} Protocol</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 7: Industries Served (Icon Grid) */}
      <section id="industries" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3">
              Sector Specialization
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight">
              Industries We Guard in <br />
              <span className="text-gold-600">Madhya Pradesh & Central India</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Every vertical requires distinct security protocols. Our guards receive industry-specific 
              training tailored to your operational environment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, idx) => {
              const Icon = industryIcons[ind.iconName] || Building2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-gold-500/50 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-900 flex items-center justify-center mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-poppins text-navy-950 group-hover:text-gold-600 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 8: Engagement Models (Day / Night / 24x7 Cards - No prices) */}
      <section id="engagement-models" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
              Flexible Deployment Models
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight">
              Tailored Shift Plans for <br />
              <span className="text-gold-600">Every Security Need</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Choose an engagement format based on your operational hours. Every tier includes police-verified 
              personnel, statutory compliances, and backup relief.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {ENGAGEMENT_MODELS.map((model) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5 }}
                className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                  model.popular
                    ? 'bg-navy-900 text-white shadow-2xl shadow-navy-950/40 border-2 border-gold-500 scale-[1.02] lg:-translate-y-2'
                    : 'bg-slate-50 text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-lg'
                }`}
              >
                {model.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-navy-950 font-extrabold text-[11px] tracking-wider uppercase shadow-md">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`text-xl sm:text-2xl font-bold font-poppins ${model.popular ? 'text-white' : 'text-navy-950'}`}>
                        {model.title}
                      </h3>
                      <p className={`text-xs mt-1 ${model.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                        {model.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Hours badge */}
                  <div className={`mt-5 p-3 rounded-xl inline-block text-xs font-semibold ${
                    model.popular ? 'bg-navy-800 text-gold-400 border border-gold-500/30' : 'bg-white text-navy-950 border border-slate-200'
                  }`}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gold-500" />
                      <span>{model.hours}</span>
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${model.popular ? 'text-gold-400' : 'text-slate-500'}`}>
                      Ideal For:
                    </span>
                    <p className={`text-xs mt-0.5 ${model.popular ? 'text-slate-200' : 'text-slate-700'}`}>
                      {model.recommended}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="mt-6 space-y-3 border-t border-slate-200/20 pt-6">
                    {model.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${model.popular ? 'text-gold-400' : 'text-emerald-600'}`} />
                        <span className={model.popular ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/20">
                  <button
                    onClick={() => onOpenQuoteModal(model.title)}
                    className={`w-full py-3.5 rounded-xl font-bold font-poppins text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                      model.popular
                        ? 'bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 hover:shadow-gold-500/30 hover:scale-[1.01]'
                        : 'bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-950'
                    }`}
                  >
                    <span>{model.ctaText}</span>
                  </button>
                  <p className={`text-center text-[10px] mt-2.5 ${model.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    Includes statutory PF/ESIC + 2-Hour Replacement SLA
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9: Testimonials Carousel (4 items) */}
      <section id="testimonials" className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs font-bold tracking-widest uppercase mb-3">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-white tracking-tight">
              What Indore & Pithampur <br />
              <span className="text-gold-400">Leaders Say About Us</span>
            </h2>
          </div>

          {/* Testimonial Active Card */}
          <div className="max-w-4xl mx-auto">
            <div className="relative min-h-[340px] sm:min-h-[290px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-navy-900/90 rounded-2xl p-7 sm:p-10 border border-white/10 shadow-2xl relative"
                >
                  <Quote className="w-12 h-12 text-gold-500/20 absolute top-6 right-6" />

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed italic">
                    "{TESTIMONIALS[activeTestimonial].quote}"
                  </blockquote>

                  {/* Author details */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold font-poppins text-gold-400">
                        {TESTIMONIALS[activeTestimonial].name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        {TESTIMONIALS[activeTestimonial].role}
                      </p>
                      <p className="text-xs text-slate-400">
                        {TESTIMONIALS[activeTestimonial].company}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Verified Client</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls & Dots */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTestimonial(dotIdx)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === dotIdx ? 'w-8 bg-gold-500' : 'w-2.5 bg-navy-700 hover:bg-navy-600'
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-navy-850 hover:bg-gold-500 hover:text-navy-950 text-slate-200 border border-white/10 transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-xl bg-navy-850 hover:bg-gold-500 hover:text-navy-950 text-slate-200 border border-white/10 transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 10: Certifications Badges (PSARA, ISO, PF/ESIC) */}
      <section className="py-14 bg-slate-900 border-b border-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Statutory Governance & Compliance Accreditations
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTIFICATIONS.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="bg-navy-950/80 border border-white/10 rounded-xl p-4 text-center hover:border-gold-500/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gold-500/10 text-gold-400 mb-2">
                    {cert.tag}
                  </span>
                  <h4 className="font-poppins font-bold text-sm text-white">{cert.name}</h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{cert.authority}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

