import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield,
  ArrowUp,
  MessageCircle,
  CheckCircle2,
  ExternalLink,
  X,
  PhoneCall,
  Award,
  Globe,
  Share2,
} from 'lucide-react';
import LeadForm from './LeadForm';
import { BRAND, NAV_LINKS, SERVICES, FAQS } from '../data';

export default function ContactAndFooter({
  isQuoteModalOpen,
  onCloseQuoteModal,
  modalInitialService,
  onOpenQuoteModal,
}) {
  const [openFaq, setOpenFaq] = useState(0); // first FAQ open by default
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx);
  };

  return (
    <>
      {/* SECTION 11: FAQ Accordion (6 Q&As) */}
      <section id="faqs" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
              Answers & Clarifications
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight">
              Frequently Asked <span className="text-gold-600">Questions</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base">
              Everything you need to know about our PSARA licensing, guard training, replacement protocols, and billing.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-poppins font-bold text-sm sm:text-base text-navy-950 pr-2">
                      {faq.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-gold-500 text-navy-950' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            Have a question specific to your township or factory bylaws?{' '}
            <a
              href={`tel:${BRAND.phone}`}
              className="text-gold-600 font-bold hover:underline ml-1 inline-flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Speak directly to our Operations Officer: {BRAND.phoneFormatted}</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 12: Final CTA Band with Phone Number */}
      <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white py-14 sm:py-16 border-y border-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(245,183,0,0.15),transparent_60%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                <span>Immediate Security Deployment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-poppins text-white">
                Ready to Secure Your Premises in Indore?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Get verified security guards dispatched with guaranteed 2-hour backup cover. 
                Our team is standing by 24x7 to survey your property.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={`tel:${BRAND.phone}`}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-bold text-sm border border-white/20 flex items-center justify-center gap-3 transition-colors shadow-lg"
              >
                <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center">
                  <Phone className="w-4 h-4 fill-navy-950" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">24x7 Direct Hotline</span>
                  <span className="font-poppins text-sm sm:text-base text-gold-400">{BRAND.phoneFormatted}</span>
                </div>
              </a>

              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold font-poppins text-sm shadow-soft-gold hover:shadow-xl hover:scale-[1.02] transition-all whitespace-nowrap"
              >
                Hire Guards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: Contact Section with Second Lead Form + Contact Details + Map Placeholder */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold tracking-wider uppercase mb-3">
              Direct Contact & Headquarters
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight">
              Get in Touch with Our <br />
              <span className="text-gold-600">Operations Desk</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base">
              Visit our central office in Indore or schedule an on-site survey at your location.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Contact Cards + Map Placeholder */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Address & Hotline Cards */}
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200">
                <h4 className="font-poppins font-bold text-lg text-navy-950 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-600" />
                  <span>Central India Headquarters</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {BRAND.address}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200 text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      24x7 Operations Hotline
                    </span>
                    <a href={`tel:${BRAND.phone}`} className="text-navy-950 font-bold hover:text-gold-600 text-sm">
                      {BRAND.phoneFormatted}
                    </a>
                    <span className="block text-slate-500 text-[11px] mt-0.5">Control Desk: {BRAND.landline}</span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Official Correspondence
                    </span>
                    <a href={`mailto:${BRAND.email}`} className="text-navy-950 font-bold hover:text-gold-600">
                      {BRAND.email}
                    </a>
                    <span className="block text-slate-500 text-[11px] mt-0.5">SOS: {BRAND.controlRoomEmail}</span>
                  </div>
                </div>
              </div>

              {/* Branch Network Pills */}
              <div className="bg-navy-900 text-white rounded-2xl p-6 border border-navy-800">
                <h5 className="font-poppins font-bold text-sm text-gold-400 mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gold-400" />
                  <span>Regional Branch Operational Desks</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {BRAND.branches.map((b, bIdx) => (
                    <div key={bIdx} className="bg-navy-850 p-3 rounded-xl border border-white/10">
                      <strong className="block text-white font-semibold">{b.city}</strong>
                      <span className="text-slate-400 text-[11px]">{b.address}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative min-h-[220px] flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Geographic Location
                    </span>
                    <h5 className="font-poppins font-bold text-navy-950 text-sm">
                      Vijay Nagar Square & AB Road Corridor, Indore
                    </h5>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Open 24 Hours</span>
                  </span>
                </div>

                <div className="my-6 p-4 rounded-xl bg-white/90 border border-slate-200 text-center shadow-sm">
                  <p className="text-xs text-slate-600 font-medium">
                    Coordinates: <strong>22.7533° N, 75.8937° E</strong> • Indore, Madhya Pradesh
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Minutes away from C21 Mall, Malhar Mega Mall & Brilliant Convention Centre.
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium">Direct Road Access from MR-10 & AB Road</span>
                  <a
                    href="https://maps.google.com/?q=Vijay+Nagar+Indore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-gold-600 font-bold hover:underline"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Second Lead Form */}
            <div className="lg:col-span-6">
              <LeadForm
                variant="card"
                title="Request Free Proposal & Site Audit"
                subtitle="Fill out this form. An Operations Manager will contact you within 2 hours."
              />
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 14: Footer */}
      <footer className="bg-navy-950 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-800">
            
            {/* Col 1: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-navy-950 fill-navy-950" />
                </div>
                <div>
                  <span className="text-xl font-bold font-poppins text-white">
                    Sentinel <span className="text-gold-400">Security</span>
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                    {BRAND.tagline}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Premier PSARA-licensed security guard agency headquartered in Indore, Madhya Pradesh. 
                Providing 100% verified armed & unarmed guards, executive VIP protection, and industrial 
                manpower across central India.
              </p>

              <div className="pt-2 text-xs text-gold-400/90 font-mono space-y-1">
                <div>• License: {BRAND.licenseNumber}</div>
                <div>• Quality: {BRAND.isoNumber}</div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h5 className="font-poppins font-bold text-white text-sm mb-4">Quick Navigation</h5>
              <ul className="space-y-2.5 text-xs">
                {NAV_LINKS.slice(0, 6).map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-gold-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h5 className="font-poppins font-bold text-white text-sm mb-4">Core Guard Services</h5>
              <ul className="space-y-2.5 text-xs">
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => onOpenQuoteModal(s.title)}
                      className="hover:text-gold-400 transition-colors text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Reach Us */}
            <div>
              <h5 className="font-poppins font-bold text-white text-sm mb-4">Control Room</h5>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold">24x7 Helpline:</span>
                  <a href={`tel:${BRAND.phone}`} className="text-gold-400 font-bold hover:underline">
                    {BRAND.phoneFormatted}
                  </a>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold">Email:</span>
                  <a href={`mailto:${BRAND.email}`} className="text-slate-300 hover:text-white">
                    {BRAND.email}
                  </a>
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] uppercase font-bold">HQ Location:</span>
                  <span className="text-slate-400">Vijay Nagar, Indore (M.P.)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Compliance */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. PSARA Compliant.</p>
            <div className="flex items-center gap-6 text-[11px]">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-300 cursor-pointer">Statutory Compliance Dossier</span>
            </div>
          </div>

        </div>
      </footer>

      {/* EXTRAS: Floating WhatsApp + Call + Scroll to top */}
      <div className="fixed bottom-20 sm:bottom-6 right-5 z-40 flex flex-col gap-3">
        {/* Scroll to Top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-navy-800 text-gold-400 hover:bg-gold-500 hover:text-navy-950 border border-white/20 shadow-xl flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Call Button */}
        <a
          href={`tel:${BRAND.phone}`}
          className="w-12 h-12 rounded-full bg-navy-900 text-gold-400 hover:bg-navy-800 border-2 border-gold-500/60 shadow-xl flex items-center justify-center hover:scale-110 transition-transform group relative"
          aria-label="Call 24x7 control room"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 whitespace-nowrap bg-navy-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg pointer-events-none">
            Call 24x7 Control Room
          </span>
        </a>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
            'Hello Sentinel Security, I would like to inquire about security guard services in Indore.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl flex items-center justify-center hover:scale-110 transition-transform group relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute right-14 whitespace-nowrap bg-navy-900 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg pointer-events-none">
            Instant WhatsApp Inquiry
          </span>
        </a>
      </div>

      {/* EXTRAS: Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/98 backdrop-blur-md border-t border-navy-800 p-2.5 grid grid-cols-3 gap-2">
        <a
          href={`tel:${BRAND.phone}`}
          className="py-2.5 rounded-xl bg-navy-850 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-gold-400" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
            'Hello Sentinel Security, I need a quote for security guards in Indore.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenQuoteModal()}
          className="py-2.5 rounded-xl bg-gold-500 text-navy-950 text-xs font-bold flex items-center justify-center gap-1 shadow-soft-gold"
        >
          <span>Hire Guards</span>
        </button>
      </div>

      {/* EXTRAS: Quote Modal (opened by every "Get Quote" button) */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseQuoteModal}
              className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-xl my-8 bg-navy-900 rounded-3xl border border-white/15 shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={onCloseQuoteModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <LeadForm
                variant="modal"
                initialService={modalInitialService}
                title="Hire Guards"
                subtitle="Fast callback • 100% PSARA compliant proposal"
                onSuccessClose={onCloseQuoteModal}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

