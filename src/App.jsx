import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesAndFeatures from './components/ServicesAndFeatures';
import Training from './components/Training';
import ProcessAndTrust from './components/ProcessAndTrust';
import ContactAndFooter from './components/ContactAndFooter';

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [modalInitialService, setModalInitialService] = useState('');

  const handleOpenQuoteModal = (serviceName = '') => {
    setModalInitialService(serviceName || '');
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-inter antialiased selection:bg-gold-500 selection:text-navy-950">
      {/* 1. Sticky Navbar */}
      <Navbar onOpenQuoteModal={handleOpenQuoteModal} />

      <main>
        {/* 2. Hero Section */}
        <Hero onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 3. Counters & Marquee, 4. Services (8 cards), 5. Why Choose Us (6 tiles) */}
        <ServicesAndFeatures onSelectService={handleOpenQuoteModal} />

        {/* Our Training Section */}
        <Training onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 6. How It Works (4 steps), 7. Industries (icon grid), 8. Engagement Models (3 cards), 9. Testimonials (4 items), 10. Certifications */}
        <ProcessAndTrust onOpenQuoteModal={handleOpenQuoteModal} />

        {/* 11. FAQ accordion, 12. Final CTA band, 13. Contact section + Map, 14. Footer + Extras (WhatsApp/Call/Modal) */}
        <ContactAndFooter
          isQuoteModalOpen={isQuoteModalOpen}
          onCloseQuoteModal={handleCloseQuoteModal}
          modalInitialService={modalInitialService}
          onOpenQuoteModal={handleOpenQuoteModal}
        />
      </main>
    </div>
  );
}

