import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Flame,
  HeartPulse,
  Activity,
  Award,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// ============================================================================
// TRAINING CAROUSEL IMAGES:
// Local images in /public/images/. If an image fails to load, it is hidden.
// ============================================================================
const trainingImages = [
  "/images/training-1.jpg",
  "/images/training-2.jpg",
  "/images/training-3.jpg",
  "/images/training-4.jpg",
  "/images/training-5.jpg",
  "/images/training-6.jpg",
];

const trainingAlts = [
  "Classroom training session",
  "Fire safety drill",
  "First aid and medical response training",
  "Physical fitness and parade drill",
  "Discipline and soft skills workshop",
  "Emergency response and crisis evacuation",
];

const trainingChips = [
  { label: "Classroom Training", icon: BookOpen },
  { label: "Fire Safety Drill", icon: Flame },
  { label: "First Aid", icon: HeartPulse },
  { label: "Physical Fitness & Drill", icon: Activity },
  { label: "Discipline & Soft Skills", icon: Award },
  { label: "Emergency Response", icon: AlertTriangle },
];

export default function Training({ onOpenQuoteModal }) {
  const [failedImages, setFailedImages] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);
  const touchStartX = useRef(null);

  // Normalize image data (supports string array or object array with src/alt)
  const normalizedImages = trainingImages.map((item, idx) => ({
    src: typeof item === 'string' ? item : item.src,
    alt: typeof item === 'string' ? trainingAlts[idx % trainingAlts.length] : item.alt,
  }));

  // Filter out any image that failed to load
  const validImages = normalizedImages.filter((img) => !failedImages.has(img.src));

  // Determine items per view responsively (4 desktop, 2 tablet, 1 mobile)
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-scroll every 3 seconds, paused on hover
  useEffect(() => {
    if (isHovered || validImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, validImages.length]);

  const handleNext = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const handlePrev = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleImageError = (src) => {
    setFailedImages((prev) => {
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    touchStartX.current = null;
  };

  return (
    <section id="training" className="py-20 bg-white relative overflow-hidden scroll-mt-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Heading "OUR TRAINING" with gold underline bar */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight uppercase">
            OUR TRAINING
          </h2>
          <div className="h-1 w-16 bg-amber-400 rounded mx-auto mt-3 mb-5" />

          {/* 2. Intro line */}
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Sentinel Security follows the training norms of the Private Security Agencies (Regulation) Act, 2005.
          </p>
        </motion.div>

        {/* 3. Three highlighted lines in dark red */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-1.5 text-center text-red-800 font-semibold text-base sm:text-lg mt-7 mb-12"
        >
          <p>Training is the foundation of every good security service.</p>
          <p className="text-xl sm:text-2xl font-bold font-poppins text-red-900">
            Our Training Institute
          </p>
          <p>Well-trained and disciplined guards are our biggest strength.</p>
        </motion.div>

        {/* 4. Photo Carousel (4 cards desktop, 2 tablet, 1 mobile) */}
        {validImages.length > 0 && (
          <div
            className="relative w-full mb-14"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Viewport */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {/* Render triple array to guarantee smooth seamless wrapping */}
                {[...validImages, ...validImages, ...validImages].map((img, idx) => (
                  <div
                    key={`${img.src}-${idx}`}
                    className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 p-2 sm:p-2.5"
                  >
                    <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-slate-100 group relative">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        onError={() => handleImageError(img.src)}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: 'center 30%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-xs font-semibold text-white drop-shadow">
                          {img.alt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Side Navigation Arrows */}
            {validImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-1 sm:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-navy-950 border border-slate-200 shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-colors z-20 focus:outline-none"
                  aria-label="Previous training image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-1 sm:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-navy-950 border border-slate-200 shadow-lg flex items-center justify-center hover:bg-gold-500 hover:text-navy-950 hover:border-gold-500 transition-colors z-20 focus:outline-none"
                  aria-label="Next training image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-5">
              {validImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx ? 'w-6 bg-gold-500' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. Row of 6 Small Icon Chips */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10"
        >
          {trainingChips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 flex flex-col items-center text-center group cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-gold-600 flex items-center justify-center mb-3 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-poppins font-semibold text-xs sm:text-sm text-navy-950 group-hover:text-gold-600 transition-colors">
                  {chip.label}
                </h4>
              </div>
            );
          })}
        </motion.div>

        {/* 6. "Hire Guards" Button at Bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="w-full sm:w-auto min-h-[48px] h-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-bold font-poppins text-sm sm:text-base shadow-soft-gold hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Hire Guards</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
