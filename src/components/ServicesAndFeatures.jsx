import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Flame,
  MapPin,
  Clock,
  FileCheck,
  Radio,
  Check,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { STATS, CLIENT_LOGOS, SERVICES, WHY_CHOOSE_US } from '../data';

// Map icon strings to Lucide components
const iconMap = {
  ShieldCheck,
  Flame,
  MapPin,
  Clock,
  FileCheck,
  Radio,
};

// Animated Number Counter component
function CounterCard({ value, suffix, label, subtext }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800; // ms
    const increment = Math.ceil(value / (duration / 25));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300">
      <div>
        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 flex items-center">
          <span>{count}</span>
          <span className="text-gold-500 ml-1">{suffix}</span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-2 font-poppins">
          {label}
        </h4>
      </div>
      <p className="text-xs text-slate-600 mt-2 font-medium">
        {subtext}
      </p>
    </div>
  );
}

export default function ServicesAndFeatures({ onSelectService }) {
  return (
    <>
      {/* SECTION 3: Animated Counters + Client Logo Marquee */}
      <section className="relative z-20 pt-16 sm:pt-20 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => (
            <CounterCard
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              subtext={stat.subtext}
            />
          ))}
        </div>

        {/* Client Logo Marquee */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-200 overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest break-words">
              Trusted by 120+ Enterprises, Manufacturing Units & RWAs in Central India
            </span>
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="flex gap-8 w-max animate-marquee py-2 items-center">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 hover:text-navy-900 hover:border-gold-500/50 hover:bg-white transition-all cursor-default group flex-shrink-0"
                >
                  <ShieldAlert className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                  <span className="font-poppins font-semibold text-xs sm:text-sm tracking-wide">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Services (8 Cards) */}
      <section id="services" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Specialized Security Personnel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-navy-950 tracking-tight break-words">
              Comprehensive Security & <br />
              <span className="text-gold-600">Manpower Services</span>
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg break-words">
              From corporate campuses to heavy industrial units in Pithampur and luxury residences in Indore, 
              we deploy battle-tested guards equipped with technology, rigorous training, and statutory compliance.
            </p>
          </div>

          {/* 8 Service Cards Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Image with Gradient Fallback */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-navy-900 to-navy-800">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback in case of broken link
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent"></div>
                    <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-navy-900/90 text-gold-400 border border-gold-400/30 backdrop-blur-md">
                      {service.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-bold font-poppins text-navy-950 group-hover:text-gold-600 transition-colors line-clamp-1">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>

                    {/* Features Bullet List */}
                    <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full min-h-[44px] h-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-gold-500 hover:text-navy-950 text-slate-800 font-semibold text-xs font-poppins transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Custom Requirements CTA Banner */}
          <div className="mt-12 bg-navy-900 text-white rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-navy-800 shadow-xl overflow-hidden">
            <div className="space-y-1 text-center sm:text-left min-w-0 break-words">
              <h4 className="text-lg sm:text-xl font-bold font-poppins text-white">
                Need a Custom Security Assessment for Your Factory or Township?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Our Chief Security Officer will conduct a no-obligation on-site risk analysis in Indore or nearby MIDCs.
              </p>
            </div>
            <button
              onClick={() => onSelectService("Custom Enterprise Assessment")}
              className="w-full sm:w-auto min-h-[44px] h-auto px-6 py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-xs sm:text-sm shadow-soft-gold hover:bg-gold-400 transition text-center flex-shrink-0"
            >
              Book Free Site Survey
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 5: Why Choose Us (6 Tiles on Navy Background) */}
      <section id="why-us" className="py-20 lg:py-28 bg-navy-900 text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-700/30 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs font-bold tracking-widest uppercase mb-3">
              The Sentinel Standard
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-poppins text-white tracking-tight break-words">
              Why Central India Trusts <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-300">
                Sentinel Security Services
              </span>
            </h2>
            <p className="mt-4 text-slate-300 text-base sm:text-lg break-words">
              We bridge disciplined military vigilance with cutting-edge tech surveillance. Zero tolerance 
              for negligence, 100% legal compliances, and immediate accountability.
            </p>
          </div>

          {/* 6 Tiles Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              const Icon = iconMap[item.iconName] || ShieldCheck;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-navy-850/90 rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-gold-500/50 hover:bg-navy-800 transition-all duration-300 group shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-13 h-13 w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-poppins text-white group-hover:text-gold-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400 group-hover:text-gold-300 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
                    <span>Guaranteed SLA Commitment</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}

