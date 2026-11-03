import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { SERVICES, BRAND } from '../data';

export default function LeadForm({
  title = "Hire Guards",
  subtitle = "PSARA Licensed • 2-Hour Response Time",
  initialService = "",
  variant = "card", // "card" | "hero" | "modal"
  onSuccessClose = null,
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    company: '',
    serviceType: initialService || SERVICES[0].title,
    guardCount: '3-5 Guards',
    shift: '24x7',
    city: 'Indore',
    message: '',
    consent: true,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to receive the proposal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate backend network delay (1.2 seconds)
    await new Promise((res) => setTimeout(res, 1200));

    const generatedId = `SEN-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmissionId(generatedId);

    const leadPayload = {
      ...formData,
      id: generatedId,
      submittedAt: new Date().toISOString(),
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    // Output rules: console.log + save to localStorage mock
    console.log('[Sentinel Security] New Lead Received:', leadPayload);
    try {
      const existingLeads = JSON.parse(localStorage.getItem('sentinel_leads') || '[]');
      existingLeads.unshift(leadPayload);
      localStorage.setItem('sentinel_leads', JSON.stringify(existingLeads));
    } catch (err) {
      console.warn('LocalStorage save failed:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setToastMessage(`Inquiry submitted! Ref #${generatedId}`);

    // Auto dismiss toast after 4s
    setTimeout(() => {
      setToastMessage('');
    }, 4500);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      company: '',
      serviceType: SERVICES[0].title,
      guardCount: '3-5 Guards',
      shift: '24x7',
      city: 'Indore',
      message: '',
      consent: true,
    });
    setIsSuccess(false);
    setErrors({});
  };

  const shiftOptions = [
    { id: 'Day', label: 'Day (8-12h)' },
    { id: 'Night', label: 'Night (8-12h)' },
    { id: '24x7', label: '24x7 (3 Shifts)' },
  ];

  return (
    <div className="relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute -top-14 left-0 right-0 z-50 mx-auto max-w-sm flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white shadow-xl text-xs sm:text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`rounded-2xl transition-all ${
          variant === 'modal'
            ? 'bg-navy-900 text-white p-6 sm:p-8'
            : variant === 'hero'
            ? 'glass-panel text-white p-6 sm:p-7 shadow-2xl shadow-navy-950/50'
            : 'bg-white text-slate-800 p-6 sm:p-8 shadow-xl border border-slate-200'
        }`}
      >
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                variant === 'card'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Direct Deployment Desk</span>
            </span>
            <span className={`text-[11px] font-medium ${variant === 'card' ? 'text-slate-500' : 'text-slate-400'}`}>
              Indore HQ
            </span>
          </div>

          <h3
            className={`text-xl sm:text-2xl font-bold font-poppins mt-2 ${
              variant === 'card' ? 'text-navy-950' : 'text-white'
            }`}
          >
            {title}
          </h3>
          <p className={`text-xs mt-1 ${variant === 'card' ? 'text-slate-600' : 'text-slate-300'}`}>
            {subtitle}
          </p>
        </div>

        {/* Success Screen */}
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="py-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className={`text-xl font-bold font-poppins ${variant === 'card' ? 'text-navy-950' : 'text-white'}`}>
                Quote Request Registered!
              </h4>
              <p
                className={`text-xs sm:text-sm mt-2 max-w-sm ${
                  variant === 'card' ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Thank you, <strong className="font-semibold">{formData.fullName}</strong>. Our Area Security Officer
                will call you on <strong className="font-semibold">+91 {formData.phone}</strong> within 120 minutes with a
                custom guard deployment proposal.
              </p>

              <div
                className={`my-4 p-3 rounded-xl border w-full max-w-xs text-xs ${
                  variant === 'card' ? 'bg-slate-50 border-slate-200' : 'bg-navy-800/80 border-navy-700'
                }`}
              >
                <div className="flex justify-between items-center text-slate-400">
                  <span>Reference ID:</span>
                  <span className="font-mono font-bold text-gold-400">{submissionId}</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-slate-400">
                  <span>Service:</span>
                  <span className="truncate max-w-[150px] font-medium text-slate-200">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-slate-400">
                  <span>Guards & Shift:</span>
                  <span className="font-medium text-slate-200">
                    {formData.guardCount} • {formData.shift}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gold-500 text-navy-950 hover:bg-gold-400 transition"
                >
                  Submit Another Inquiry
                </button>
                {onSuccessClose && (
                  <button
                    type="button"
                    onClick={onSuccessClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 text-slate-200 hover:bg-navy-700 transition"
                  >
                    Close Window
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Sharma"
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                      variant === 'card'
                        ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 focus:bg-white text-slate-900'
                        : 'bg-navy-800/80 border border-white/10 focus:border-gold-400 focus:bg-navy-800 text-white placeholder-slate-400'
                    } ${errors.fullName ? 'border-rose-500 ring-1 ring-rose-500' : ''}`}
                  />
                  {errors.fullName && <p className="text-rose-400 text-[10px] mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <span
                      className={`absolute left-3 top-2 text-xs font-semibold ${
                        variant === 'card' ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`w-full pl-11 pr-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                        variant === 'card'
                          ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 focus:bg-white text-slate-900'
                          : 'bg-navy-800/80 border border-white/10 focus:border-gold-400 focus:bg-navy-800 text-white placeholder-slate-400'
                      } ${errors.phone ? 'border-rose-500 ring-1 ring-rose-500' : ''}`}
                    />
                  </div>
                  {errors.phone && <p className="text-rose-400 text-[10px] mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Email & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                      variant === 'card'
                        ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 focus:bg-white text-slate-900'
                        : 'bg-navy-800/80 border border-white/10 focus:border-gold-400 focus:bg-navy-800 text-white placeholder-slate-400'
                    } ${errors.email ? 'border-rose-500 ring-1 ring-rose-500' : ''}`}
                  />
                  {errors.email && <p className="text-rose-400 text-[10px] mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    Company / Society <span className="font-normal lowercase opacity-70">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Shalimar Enclave / IT Hub"
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                      variant === 'card'
                        ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 focus:bg-white text-slate-900'
                        : 'bg-navy-800/80 border border-white/10 focus:border-gold-400 focus:bg-navy-800 text-white placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* Row 3: Service Type Dropdown */}
              <div>
                <label
                  className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                    variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Required Security Service *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                    variant === 'card'
                      ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 text-slate-900'
                      : 'bg-navy-800 border border-white/10 focus:border-gold-400 text-white'
                  }`}
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.title} className="text-navy-950 bg-white">
                      {s.title}
                    </option>
                  ))}
                  <option value="Custom Manpower Package" className="text-navy-950 bg-white">
                    Custom Manpower / Multi-Facility Package
                  </option>
                </select>
              </div>

              {/* Row 4: Guards Count & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    No. of Guards
                  </label>
                  <select
                    name="guardCount"
                    value={formData.guardCount}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                      variant === 'card'
                        ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 text-slate-900'
                        : 'bg-navy-800 border border-white/10 focus:border-gold-400 text-white'
                    }`}
                  >
                    <option value="1-2 Guards">1 - 2 Guards</option>
                    <option value="3-5 Guards">3 - 5 Guards</option>
                    <option value="6-10 Guards">6 - 10 Guards</option>
                    <option value="11-25 Guards">11 - 25 Guards</option>
                    <option value="25+ Guards (Enterprise)">25+ Guards (Enterprise / Plant)</option>
                  </select>
                </div>

                <div>
                  <label
                    className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                    }`}
                  >
                    Location / City
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none transition ${
                      variant === 'card'
                        ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 text-slate-900'
                        : 'bg-navy-800 border border-white/10 focus:border-gold-400 text-white'
                    }`}
                  >
                    <option value="Indore (City / AB Road / Super Corridor)">Indore (City & Vicinity)</option>
                    <option value="Pithampur Industrial Area">Pithampur Industrial Area</option>
                    <option value="Dewas Industrial Belt">Dewas Industrial Belt</option>
                    <option value="Ujjain / Sanwer Road">Ujjain / Sanwer Road</option>
                    <option value="Bhopal / Mandideep">Bhopal / Mandideep</option>
                    <option value="Other Central India Location">Other Central India Location</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Shift Selection Pills */}
              <div>
                <label
                  className={`block text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                    variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Shift Requirement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {shiftOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, shift: opt.id }))}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all border ${
                        formData.shift === opt.id
                          ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-sm'
                          : variant === 'card'
                          ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                          : 'bg-navy-800/60 text-slate-300 border-white/10 hover:bg-navy-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 6: Message / Specific Requirements */}
              <div>
                <label
                  className={`block text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                    variant === 'card' ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  Specific Requirements <span className="font-normal lowercase opacity-70">(e.g. CCTV, Ex-Army)</span>
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Need 4 day guards and 2 night guards with visitor tracking for warehouse..."
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-xl outline-none resize-none transition ${
                    variant === 'card'
                      ? 'bg-slate-50 border border-slate-300 focus:border-gold-500 focus:bg-white text-slate-900'
                      : 'bg-navy-800/80 border border-white/10 focus:border-gold-400 focus:bg-navy-800 text-white placeholder-slate-400'
                  }`}
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-0.5 rounded border-slate-400 text-gold-500 focus:ring-gold-500"
                  />
                  <span
                    className={`text-[11px] leading-tight ${
                      variant === 'card' ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    I authorize Sentinel Security to contact me via Phone/WhatsApp with a customized quote & statutory
                    compliance proposal.
                  </span>
                </label>
                {errors.consent && <p className="text-rose-400 text-[10px] mt-0.5">{errors.consent}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-bold font-poppins text-sm bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 shadow-soft-gold hover:shadow-lg hover:shadow-gold-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-navy-950" />
                    <span>Processing Security Dispatch...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-navy-950" />
                    <span>Hire Guards</span>
                    <Send className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>100% Confidential</span>
                </span>
                <span>Response in &lt; 2 Hours</span>
                <span>Zero Obligation</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

