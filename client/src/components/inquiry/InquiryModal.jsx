import React, { useState, useEffect } from 'react';
import {
  X, MessageSquare, Phone, CheckCircle2, ChevronRight, Home, Building,
  BedDouble, Sparkles, ShieldCheck, ArrowRight, Clock, HelpCircle,
} from 'lucide-react';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../../utils/contact';

const VERTICAL_CONFIGS = {
  buy: {
    id: 'buy',
    label: 'Buy & Sell',
    eyebrow: 'Residential & Commercial',
    icon: Home,
    accentColor: 'terracotta',
    badgeClass: 'bg-terracotta-50 text-terracotta-800 border-terracotta-200',
    phone: CONTACT_NUMBERS[0], // Line 1: +91 77372 13615
    deskName: 'Residential & Commercial Desk',
    defaultAction: 'Looking to Buy',
    actionOptions: ['Looking to Buy', 'Looking to Sell My Property'],
    propertyTypes: [
      'Apartment / Flat',
      'Independent Villa / House',
      'Commercial Office / Shop',
      'Residential Plot / Land',
      'Farmhouse / Agricultural Land',
    ],
    budgets: [
      'Under ₹50 Lakh',
      '₹50 Lakh – ₹1 Crore',
      '₹1 Crore – ₹2.5 Crore',
      '₹2.5 Crore – ₹5 Crore',
      '₹5 Crore+ (Ultra Luxury)',
    ],
    localities: [
      'Vaishali Nagar',
      'C-Scheme',
      'Jagatpura',
      'Malviya Nagar',
      'Mansarovar',
      'Tonk Road Corridor',
      'Ajmer Road / Ring Road',
      'Civil Lines / Raja Park',
      'Open to Prime Recommendations',
    ],
    timelines: [
      'Immediate (Within 30 Days)',
      '1 to 3 Months',
      '3 to 6 Months',
      'Currently Exploring Market',
    ],
    fundingOptions: [
      'Self-Funded / Ready Capital',
      'Need Bank Home Loan Assistance',
      'Selling Existing Asset First',
    ],
  },
  rent: {
    id: 'rent',
    label: 'Rent & Lease',
    eyebrow: 'Offices, Retail & Warehouses',
    icon: Building,
    accentColor: 'sage',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    phone: CONTACT_NUMBERS[1], // Line 2: +91 96642 47662
    deskName: 'Commercial & Leasing Desk',
    defaultAction: 'Corporate Tenant Looking to Lease',
    actionOptions: [
      'Corporate Tenant Looking to Lease',
      'Property Owner Looking to Lease Out Commercial Space',
      'Investor Looking for Pre-Leased High Yield Space',
    ],
    propertyTypes: [
      'Corporate Office Plate (Bare / Furnished)',
      'High-Street Retail Showroom',
      'Pre-Leased Commercial (Bank / Brand)',
      'Warehouse / Logistics Hub',
      'Commercial Land / Built-to-Suit',
    ],
    budgets: [
      'Under ₹50,000 / month',
      '₹50,000 – ₹1.5 Lakh / month',
      '₹1.5 Lakh – ₹4 Lakh / month',
      '₹4 Lakh – ₹10 Lakh / month',
      '₹10 Lakh+ / month',
    ],
    localities: [
      'Tonk Road Commercial Belt',
      'Sitapura Industrial / IT Zone',
      'Malviya Nagar / JLN Marg',
      'MI Road / C-Scheme High Street',
      'Mansarovar / New Sanganer Road',
      'VKIA (Vishwakarma Industrial)',
      'Ajmer Road Logistics Belt',
    ],
    timelines: [
      'Immediate (Within 15–30 Days)',
      'Next 1 to 2 Months',
      'Next 3 to 6 Months',
      'Future Expansion Planning',
    ],
    fundingOptions: [
      'Registered MNC / Corporate Entity',
      'Established Retail Brand / Franchise',
      'Registered Private Limited / LLP',
      'Individual Proprietor / Clinic',
    ],
  },
  stay: {
    id: 'stay',
    label: 'Airbnb & Stays',
    eyebrow: 'Turnkey Hospitality & Management',
    icon: BedDouble,
    accentColor: 'rose',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    phone: CONTACT_NUMBERS[2], // Line 3: +91 63763 12638
    deskName: 'Airbnb & Heritage Hospitality Desk',
    defaultAction: 'Buy a Turnkey Airbnb Asset',
    actionOptions: [
      'Buy a Turnkey Airbnb Asset (Haveli / Villa / Studio)',
      'Hire Hosting Team to Manage My Property on Airbnb',
      'Inquire About Booking an Exclusive Heritage Stay',
    ],
    propertyTypes: [
      'Restored Heritage Haveli',
      'Luxury Private Pool Villa',
      'Boutique Homestay Property',
      'High-Yield Studio Apartment',
      'Farmstay / Countryside Retreat',
    ],
    budgets: [
      '₹75 Lakh – ₹1.5 Crore (Investment)',
      '₹1.5 Crore – ₹3 Crore (Luxury Villa)',
      '₹3 Crore – ₹8 Crore (Heritage Haveli)',
      'Looking for Professional Management of Existing Unit',
      'Guest Stay Booking Inquiry',
    ],
    localities: [
      'Bani Park Heritage District',
      'Pink City (Walled City Architectural)',
      'Civil Lines / C-Scheme Central',
      'Amer / Kukas Heritage Corridor',
      'Jagatpura / Airport Belt',
      'Sirsi Road / Vaishali Outer',
    ],
    timelines: [
      'Immediate Onboarding / Purchase',
      'Ready in 1 to 3 Months',
      'Under Construction / Renovation',
      'Planning for Upcoming Tourist Season',
    ],
    fundingOptions: [
      'Full Turnkey (Hosting, Check-in, Linen & Housekeeping)',
      'Yield Investment + Owner Stay Rights',
      'Listing Marketing & Pricing Optimization Only',
    ],
  },
};

export default function InquiryModal({
  isOpen,
  onClose,
  initialVertical = 'buy',
  propertyContext = null,
}) {
  const [vertical, setVertical] = useState('buy');

  // Form State
  const [actionType, setActionType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [budget, setBudget] = useState('');
  const [locality, setLocality] = useState('');
  const [timeline, setTimeline] = useState('');
  const [profileOrFinancing, setProfileOrFinancing] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // UI States
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  // Sync initial vertical when modal opens
  useEffect(() => {
    if (isOpen) {
      const v = VERTICAL_CONFIGS[initialVertical] ? initialVertical : 'buy';
      setVertical(v);
      const cfg = VERTICAL_CONFIGS[v];
      setActionType(cfg.defaultAction);
      setPropertyType(propertyContext?.propertyType || cfg.propertyTypes[0]);
      setBudget(cfg.budgets[1]);
      setLocality(propertyContext?.locality || cfg.localities[0]);
      setTimeline(cfg.timelines[0]);
      setProfileOrFinancing(cfg.fundingOptions[0]);
      setIsSubmitted(false);
      setPhoneError('');
      setNameError('');
      if (propertyContext?.title) {
        setNotes(`Regarding: "${propertyContext.title}"`);
      } else {
        setNotes('');
      }
    }
  }, [isOpen, initialVertical, propertyContext]);

  // When switching vertical manually
  const handleVerticalSwitch = (newVertical) => {
    setVertical(newVertical);
    const cfg = VERTICAL_CONFIGS[newVertical];
    setActionType(cfg.defaultAction);
    setPropertyType(cfg.propertyTypes[0]);
    setBudget(cfg.budgets[1]);
    setLocality(cfg.localities[0]);
    setTimeline(cfg.timelines[0]);
    setProfileOrFinancing(cfg.fundingOptions[0]);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentConfig = VERTICAL_CONFIGS[vertical];

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError('Please enter your full name');
      hasError = true;
    } else {
      setNameError('');
    }

    const cleanDigits = phone.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (hasError) return;

    // Build structured inquiry docket for WhatsApp
    const lines = [
      '🏛️ *JAIPUR ESTATES — CLIENT INQUIRY DOCKET*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `📍 *Vertical:* ${currentConfig.label} (${currentConfig.eyebrow})`,
      `👤 *Client Name:* ${fullName.trim()}`,
      `📞 *Phone:* +91 ${cleanDigits.slice(-10)}`,
      `🏷️ *Intention:* ${actionType}`,
      `🏢 *Property Preference:* ${propertyType}`,
      `💰 *Budget / Capital Range:* ${budget}`,
      `📍 *Preferred Locality:* ${locality}`,
      `⏱️ *Finalization Timeline:* ${timeline}`,
      `💼 *Profile / Financing:* ${profileOrFinancing}`,
    ];

    if (notes.trim()) {
      lines.push(`📝 *Specific Notes:* ${notes.trim()}`);
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('_Generated via JaipurEstates Direct Advisory Desk_');

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/${currentConfig.phone.cleanNumber}?text=${encodeURIComponent(messageText)}`;

    setGeneratedWaUrl(waUrl);
    setIsSubmitted(true);

    // Save lead in localStorage for persistence
    try {
      const storedLeads = JSON.parse(localStorage.getItem('jaipur_estates_leads') || '[]');
      storedLeads.unshift({
        timestamp: new Date().toISOString(),
        vertical,
        fullName: fullName.trim(),
        phone: cleanDigits.slice(-10),
        actionType,
        propertyType,
        budget,
        locality,
        timeline,
        notes: notes.trim(),
      });
      localStorage.setItem('jaipur_estates_leads', JSON.stringify(storedLeads.slice(0, 50)));
    } catch {
      /* ignore quota errors */
    }

    // Auto trigger WhatsApp in new tab
    try {
      window.open(waUrl, '_blank');
    } catch {
      /* popup blocked fallback */
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 sm:py-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-scaleIn my-auto">
        {/* Top Header Accent */}
        <div className={`h-1.5 w-full ${
          vertical === 'buy' ? 'bg-gradient-to-r from-terracotta-700 via-amber-600 to-terracotta-500'
          : vertical === 'rent' ? 'bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500'
          : 'bg-gradient-to-r from-rose-700 via-pink-600 to-rose-500'
        }`} />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-stone-100 bg-[#FAF8F5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentConfig.badgeClass}`}>
                <currentConfig.icon size={13} />
                {currentConfig.label}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {currentConfig.deskName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Inquire with Our Jaipur Advisory Desk
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Select your exact preferences so our coordinators can share verified, matching options immediately.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors shrink-0 ml-3"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Vertical Tabs */}
        <div className="px-6 sm:px-8 pt-4 pb-2 bg-[#FAF8F5] border-b border-stone-200/60">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
            Select Service Vertical:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(VERTICAL_CONFIGS).map((cfg) => {
              const Icon = cfg.icon;
              const isActive = vertical === cfg.id;
              return (
                <button
                  key={cfg.id}
                  type="button"
                  onClick={() => handleVerticalSwitch(cfg.id)}
                  className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-amber-400' : 'text-stone-400'} />
                  <span className="truncate">{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Inquiry Docket Prepared!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your customized requirements for <strong>{currentConfig.label}</strong> have been compiled for our dedicated desk.
                </p>
              </div>

              {/* Requirement Summary Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500 font-medium">Dedicated Line:</span>
                  <span className="font-bold text-stone-800">{currentConfig.phone.number}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500 font-medium">Selected Asset:</span>
                  <span className="font-semibold text-stone-800">{propertyType}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-1.5">
                  <span className="text-stone-500 font-medium">Budget Range:</span>
                  <span className="font-semibold text-stone-800">{budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Preferred Locality:</span>
                  <span className="font-semibold text-stone-800">{locality}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 max-w-md mx-auto space-y-2.5">
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta w-full justify-center text-sm py-3.5 flex items-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
                >
                  <MessageSquare size={16} /> Open in WhatsApp with My Details
                </a>
                <a
                  href={currentConfig.phone.tel}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                >
                  <Phone size={14} /> Call Coordinator Now ({currentConfig.phone.number})
                </a>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors pt-1 block mx-auto"
                >
                  Edit requirements or start over
                </button>
              </div>

              <div className="text-[11px] text-stone-400 pt-2 flex items-center justify-center gap-1.5">
                <Clock size={12} /> {OFFICE_HOURS}
              </div>
            </div>
          ) : (
            /* Interactive Qualification Form */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Question 1: Action / Objective */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. What is your primary objective?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentConfig.actionOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setActionType(opt)}
                      className={`text-left text-xs p-3 rounded-xl border transition-all ${
                        actionType === opt
                          ? 'border-stone-900 bg-stone-900 text-white font-semibold shadow-sm'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Property / Asset Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  2. Specific Property / Asset Type:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {currentConfig.propertyTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                        propertyType === type
                          ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 & 4: Budget & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    3. Target Budget Range:
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="input-field text-xs font-medium"
                  >
                    {currentConfig.budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    4. Preferred Jaipur Locality:
                  </label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="input-field text-xs font-medium"
                  >
                    {currentConfig.localities.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question 5 & 6: Timeline & Profile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    5. Purchase / Lease Timeline:
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="input-field text-xs font-medium"
                  >
                    {currentConfig.timelines.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    6. Financing / Tenant Profile:
                  </label>
                  <select
                    value={profileOrFinancing}
                    onChange={(e) => setProfileOrFinancing(e.target.value)}
                    className="input-field text-xs font-medium"
                  >
                    {currentConfig.fundingOptions.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta-700 block">
                  Your Contact Details for Dispatch
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setNameError(''); }}
                      className={`input-field text-xs ${nameError ? 'input-error' : ''}`}
                    />
                    {nameError && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{nameError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      WhatsApp Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 border border-r-0 border-stone-200 bg-stone-100 text-stone-600 text-xs font-bold rounded-l-xl">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); setPhoneError(''); }}
                        className={`input-field rounded-l-none text-xs font-mono ${phoneError ? 'input-error' : ''}`}
                      />
                    </div>
                    {phoneError && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{phoneError}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Special Preferences / Specific Property Name <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for vastu-compliant facing, 2 reserved parking slots, or commercial road frontage..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-field text-xs resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="btn-terracotta w-full justify-center text-sm py-3.5 shadow-md flex items-center gap-2 hover:scale-[1.01] transition-transform"
                >
                  <MessageSquare size={16} /> Send Inquiry to Dedicated Coordinator
                  <ArrowRight size={15} />
                </button>

                <div className="flex items-center justify-between text-[11px] text-stone-500 px-1">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck size={13} /> Direct connection · No spam
                  </span>
                  <a
                    href={currentConfig.phone.tel}
                    className="text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                  >
                    <Phone size={11} /> Or call {currentConfig.phone.number}
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
