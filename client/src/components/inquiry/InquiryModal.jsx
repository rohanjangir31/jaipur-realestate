import React, { useState, useEffect } from 'react';
import {
  X, MessageSquare, Phone, CheckCircle2, ChevronRight, ChevronLeft,
  Home, Building, BedDouble, Sparkles, ShieldCheck, ArrowRight,
  Clock, Lock, Check,
} from 'lucide-react';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../../utils/contact';

const ADVISORY_CONFIGS = {
  buy: {
    id: 'buy',
    label: 'Buy & Sell Advisory',
    eyebrow: 'Residential & Commercial Sourcing',
    icon: Home,
    accentColor: 'terracotta',
    badgeClass: 'bg-terracotta-50 text-terracotta-800 border-terracotta-200',
    phone: CONTACT_NUMBERS[0], // Line 1: +91 77372 13615
    deskName: 'Residential & Commercial Desk',
    objectives: [
      'Acquire Luxury Primary Residence / Villa',
      'Acquire Premium Apartment (3–5 BHK)',
      'Acquire Strategic Plot / Commercial Land',
      'Sell / Liquidate Property Privately',
      'Off-Market Heritage Trophy Asset',
    ],
    propertyTypes: [
      'Independent Luxury Villa / House',
      'Premium Apartment (3–5 BHK)',
      'High-Rise Penthouse / Duplex',
      'Residential Plot / Gated Township',
      'Commercial Office / High-Street Shop',
      'Farmhouse / Agricultural Land',
    ],
    localities: [
      'Vaishali Nagar / Gandhi Path',
      'C-Scheme / Civil Lines',
      'Malviya Nagar / JLN Marg',
      'Jagatpura / Mahal Road',
      'Mansarovar / New Sanganer Road',
      'Tonk Road Corridor',
      'Ajmer Road / Ring Road',
      'Bani Park / Raja Park',
      'Open to Prime Recommendations',
    ],
    featurePills: [
      '100% Vastu-Compliant',
      'Gated Community / 24x7 Security',
      '40+ Ft Wide Road Frontage',
      'Corner Plot / Park Facing',
      'Private Swimming Pool / Terrace',
      'Ready to Move / Immediate Possession',
    ],
    budgets: [
      'Under ₹75 Lakh',
      '₹75 Lakh – ₹1.5 Crore',
      '₹1.5 Crore – ₹3 Crore',
      '₹3 Crore – ₹6 Crore',
      '₹6 Crore – ₹12 Crore+',
      'Ultra-HNWI Bespoke Portfolio',
    ],
    fundingReadiness: [
      'Ready Liquid Capital (Deployable in 15–30 Days)',
      'Bank Loan Pre-Approved / Ready',
      'Bank Home Loan Assistance Required',
      'Contingent on Existing Asset Sale',
    ],
    timelines: [
      'Immediate (Within 15–30 Days)',
      '1 to 3 Months (Active Mandate)',
      '3 to 6 Months (Strategic Planning)',
      'Discreet Long-Term Portfolio Scouting',
    ],
    clientProfiles: [
      'Private Family / Individual',
      'Corporate / Business Entity',
      'NRI / Overseas Investor',
      'Family Office / Trust',
    ],
  },
  rent: {
    id: 'rent',
    label: 'Rent & Lease Advisory',
    eyebrow: 'Corporate Offices, Retail & Warehousing',
    icon: Building,
    accentColor: 'sage',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    phone: CONTACT_NUMBERS[1], // Line 2: +91 96642 47662
    deskName: 'Commercial & Leasing Desk',
    objectives: [
      'Corporate Tenant Seeking Office Floor Plate',
      'Retail Brand Seeking High-Street Showroom',
      'Property Owner Seeking Institutional Tenant',
      'Investor Seeking Pre-Leased High-Yield Asset',
      'Enterprise Seeking Industrial Warehousing',
    ],
    propertyTypes: [
      'Grade-A Bare-Shell Office Floor Plate',
      'Fully Furnished Plug & Play Managed Office',
      'High-Street Retail Showroom (Ground Floor)',
      'Pre-Leased Commercial (Bank / Retail Anchor)',
      'Industrial Logistics Warehouse / Built-to-Suit',
      'Commercial Land with Highway Frontage',
    ],
    localities: [
      'Tonk Road Commercial Belt',
      'Sitapura Industrial & IT Park',
      'Malviya Nagar / JLN Marg',
      'MI Road / C-Scheme High Street',
      'Mansarovar / New Sanganer Road',
      'VKIA (Vishwakarma Industrial Area)',
      'Ajmer Road Logistics Corridor',
      'Vaishali Nagar Commercial Belt',
    ],
    featurePills: [
      'Main Road High-Visibility Signage',
      'Reserved Basement Parking (10+ Bays)',
      '100% DG Power Backup & Elevators',
      'Direct Metro / Rapid Transit Access',
      'High Floor Load & Fire NOC Compliant',
      'Pre-Leased Long Lock-in (9+ Years)',
    ],
    budgets: [
      'Under ₹60,000 / month',
      '₹60,000 – ₹1.5 Lakh / month',
      '₹1.5 Lakh – ₹4 Lakh / month',
      '₹4 Lakh – ₹10 Lakh / month',
      '₹10 Lakh+ / month (Enterprise Scale)',
    ],
    fundingReadiness: [
      'Registered MNC / Public Limited Entity',
      'Established National Retail Franchise',
      'Private Limited Company / Funded Startup',
      'Medical Hospital / Professional Clinic',
      'Sole Proprietor / Individual Firm',
    ],
    timelines: [
      'Immediate (Within 15–30 Days)',
      '1 to 2 Months (Planned Relocation)',
      '3 to 6 Months (Expansion Horizon)',
      'Future Lease Expiry Renewal',
    ],
    clientProfiles: [
      'Corporate Tenant / Enterprise',
      'Retail Brand / Franchisee',
      'Commercial Asset Landlord',
      'Commercial Yield Investor',
    ],
  },
  stay: {
    id: 'stay',
    label: 'Airbnb & Hospitality Advisory',
    eyebrow: 'Turnkey Havelis, Villas & Management',
    icon: BedDouble,
    accentColor: 'rose',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    phone: CONTACT_NUMBERS[2], // Line 3: +91 63763 12638
    deskName: 'Airbnb & Heritage Hospitality Desk',
    objectives: [
      'Acquire Cash-Flowing Turnkey Airbnb Stay',
      'Handover Property for 360° Hosting Management',
      'Yield Audit & Revenue Optimization for Existing Unit',
      'VIP Heritage Haveli / Luxury Villa Booking Inquiry',
    ],
    propertyTypes: [
      'Restored Heritage Haveli / Courtyard Estate',
      'Luxury Private Pool Villa',
      'Boutique Rajasthani Homestay (4–8 Keys)',
      'High-Occupancy Studio / 1BHK Apartment',
      'Farmstay / Countryside Luxury Retreat',
    ],
    localities: [
      'Bani Park Heritage Belt',
      'Pink City (Walled City Architectural Core)',
      'Civil Lines / C-Scheme Central',
      'Amer / Kukas Heritage Tourist Belt',
      'Jagatpura / Airport Tourism Corridor',
      'Sirsi Road / Vaishali Outer Enclave',
    ],
    featurePills: [
      'Private Swimming Pool / Jacuzzi',
      'Traditional Jharokha & Courtyard Architecture',
      'Walkable to Key Palaces & Heritage Sites',
      'Full Staff & Commercial Kitchen Quarters',
      'Proven High Superhost Revenue Track Record',
      'Turnkey Furnished with Designer Antiques',
    ],
    budgets: [
      '₹75 Lakh – ₹1.5 Crore (Studio / 2BHK Asset)',
      '₹1.5 Crore – ₹3.5 Crore (Luxury Pool Villa)',
      '₹3.5 Crore – ₹8 Crore+ (Heritage Haveli)',
      'Commission Hosting Contract (15–20% Net)',
      'Guest Booking Tariff Inquiry',
    ],
    fundingReadiness: [
      'Full 360° Turnkey (Check-in, Linen, Housekeeping, Revenue)',
      'Yield Investment with Owner Stay Privileges',
      'OTA Marketing, Dynamic Pricing & Listing Optimization Only',
      'Looking to Purchase First, Host Afterwards',
    ],
    timelines: [
      'Immediate Onboarding / Active Purchase',
      'Ready within 1 to 3 Months',
      'Currently Under Interior Fit-out / Renovation',
      'Scouting Ahead of Next Tourism Peak Season',
    ],
    clientProfiles: [
      'HNWI Hospitality Investor',
      'Property Owner / Second Home Host',
      'Corporate / Wedding Group Booker',
      'NRI Heritage Estate Owner',
    ],
  },
};

const STEPS = [
  { id: 1, title: 'Mandate & Intent', desc: 'Objective & entity' },
  { id: 2, title: 'Asset & Micro-Market', desc: 'Type, area & features' },
  { id: 3, title: 'Capital & Horizon', desc: 'Budget, liquidity & timeline' },
  { id: 4, title: 'Private Dispatch', desc: 'Direct coordinator assignment' },
];

export default function InquiryModal({
  isOpen,
  onClose,
  initialVertical = 'buy',
  propertyContext = null,
}) {
  const [vertical, setVertical] = useState('buy');
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [objective, setObjective] = useState('');
  const [clientProfile, setClientProfile] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [locality, setLocality] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [budget, setBudget] = useState('');
  const [fundingReadiness, setFundingReadiness] = useState('');
  const [timeline, setTimeline] = useState('');

  // Step 4: Contact & Discretion
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyOrFamily, setCompanyOrFamily] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Validation & Submission
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  // Initialize or reset when modal opens or initialVertical changes
  useEffect(() => {
    if (isOpen) {
      const v = ADVISORY_CONFIGS[initialVertical] ? initialVertical : 'buy';
      initVerticalState(v, propertyContext);
      setCurrentStep(1);
      setIsSubmitted(false);
      setNameError('');
      setPhoneError('');
    }
  }, [isOpen, initialVertical, propertyContext]);

  const initVerticalState = (v, ctx = null) => {
    setVertical(v);
    const cfg = ADVISORY_CONFIGS[v];
    setObjective(cfg.objectives[0]);
    setClientProfile(cfg.clientProfiles[0]);
    setPropertyType(ctx?.propertyType || cfg.propertyTypes[0]);
    setLocality(ctx?.locality || cfg.localities[0]);
    setSelectedFeatures([cfg.featurePills[0], cfg.featurePills[1]]);
    setBudget(cfg.budgets[1]);
    setFundingReadiness(cfg.fundingReadiness[0]);
    setTimeline(cfg.timelines[0]);
    if (ctx?.title) {
      setSpecialNotes(`Regarding: "${ctx.title}"`);
    } else {
      setSpecialNotes('');
    }
  };

  const handleVerticalSwitch = (newVertical) => {
    initVerticalState(newVertical, null);
    setCurrentStep(1);
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
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

  const currentConfig = ADVISORY_CONFIGS[vertical];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

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

    // Build structured executive mandate docket for WhatsApp
    const lines = [
      '🏛️ *JAIPUR ESTATES — PRIVATE ADVISORY MANDATE*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `📍 *Practice Area:* ${currentConfig.label}`,
      `🏢 *Assigned Desk:* ${currentConfig.deskName}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Client Representative:* ${fullName.trim()}`,
      `📞 *Direct Contact:* +91 ${cleanDigits.slice(-10)}`,
    ];

    if (companyOrFamily.trim()) {
      lines.push(`🏢 *Entity / Family Office:* ${companyOrFamily.trim()}`);
    }

    lines.push(`🏷️ *Client Classification:* ${clientProfile}`);
    lines.push(`🎯 *Core Objective:* ${objective}`);
    lines.push(`🏛️ *Asset Classification:* ${propertyType}`);
    lines.push(`📍 *Preferred Jaipur Micro-Market:* ${locality}`);
    lines.push(`💰 *Capital Allocation / Budget:* ${budget}`);
    lines.push(`💼 *Financial Readiness / Liquidity:* ${fundingReadiness}`);
    lines.push(`⏱️ *Execution Horizon:* ${timeline}`);

    if (selectedFeatures.length > 0) {
      lines.push(`✦ *Essential Criteria:* ${selectedFeatures.join(', ')}`);
    }

    if (specialNotes.trim()) {
      lines.push(`📝 *Confidential Notes:* ${specialNotes.trim()}`);
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push('🔒 *Confidential Mandate — Direct Coordinator Protocol*');
    lines.push(`⏰ *Office Hours:* ${OFFICE_HOURS}`);

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
        companyOrFamily: companyOrFamily.trim(),
        clientProfile,
        objective,
        propertyType,
        locality,
        budget,
        fundingReadiness,
        timeline,
        features: selectedFeatures,
        specialNotes: specialNotes.trim(),
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
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 animate-scaleIn my-auto flex flex-col max-h-[92vh]">
        {/* Top Header Accent */}
        <div
          className={`h-1.5 w-full shrink-0 ${
            vertical === 'buy'
              ? 'bg-gradient-to-r from-terracotta-700 via-amber-600 to-terracotta-500'
              : vertical === 'rent'
              ? 'bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-500'
              : 'bg-gradient-to-r from-rose-700 via-pink-600 to-rose-500'
          }`}
        />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 pb-4 flex items-start justify-between border-b border-stone-100 bg-[#FAF8F5] shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${currentConfig.badgeClass}`}
              >
                <currentConfig.icon size={13} />
                {currentConfig.label}
              </span>
              <span className="text-[11px] text-stone-500 font-medium">
                {currentConfig.deskName}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
                <Lock size={10} /> Strictly Confidential
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Bespoke Advisory Intake Questionnaire
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Private client consultation to match off-market inventory and assign a dedicated coordinator.
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

        {/* Vertical Switcher Tabs */}
        {!isSubmitted && (
          <div className="px-5 sm:px-7 py-2.5 bg-[#FAF8F5] border-b border-stone-200/70 shrink-0">
            <div className="grid grid-cols-3 gap-2">
              {Object.values(ADVISORY_CONFIGS).map((cfg) => {
                const Icon = cfg.icon;
                const isActive = vertical === cfg.id;
                return (
                  <button
                    key={cfg.id}
                    type="button"
                    onClick={() => handleVerticalSwitch(cfg.id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <Icon size={14} className={isActive ? 'text-amber-400' : 'text-stone-400'} />
                    <span className="truncate">{cfg.label.replace(' Advisory', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Progression Bar */}
        {!isSubmitted && (
          <div className="px-5 sm:px-7 py-3 bg-white border-b border-stone-100 shrink-0 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[500px] sm:min-w-0">
              {STEPS.map((step, index) => {
                const isPassed = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                return (
                  <React.Fragment key={step.id}>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step.id)}
                      className="flex items-center gap-2 group text-left"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          isPassed
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-terracotta-700 text-white ring-4 ring-terracotta-100'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        {isPassed ? <Check size={13} /> : step.id}
                      </div>
                      <div>
                        <div
                          className={`text-xs font-bold leading-tight ${
                            isCurrent
                              ? 'text-stone-900'
                              : isPassed
                              ? 'text-emerald-700'
                              : 'text-stone-400'
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-medium hidden sm:block">
                          {step.desc}
                        </div>
                      </div>
                    </button>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-3 transition-colors ${
                          currentStep > index + 1 ? 'bg-emerald-500' : 'bg-stone-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* ── Confirmation / Success Screen ── */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Private Mandate Compiled
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your requirement docket has been structured for our{' '}
                  <strong>{currentConfig.deskName}</strong> coordinator.
                </p>
              </div>

              {/* Requirement Summary Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Assigned Coordinator Desk:</span>
                  <span className="font-bold text-stone-900">{currentConfig.phone.number}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Primary Mandate:</span>
                  <span className="font-semibold text-stone-800 text-right max-w-[60%] truncate">
                    {objective}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Asset Classification:</span>
                  <span className="font-semibold text-stone-800">{propertyType}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Target Micro-Market:</span>
                  <span className="font-semibold text-stone-800">{locality}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Capital Bracket:</span>
                  <span className="font-semibold text-stone-800">{budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Execution Horizon:</span>
                  <span className="font-semibold text-stone-800">{timeline}</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <a
                  href={generatedWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta w-full justify-center text-sm py-3.5 flex items-center gap-2 shadow-md hover:scale-[1.01] transition-transform"
                >
                  <MessageSquare size={16} /> Open in WhatsApp with My Mandate
                </a>
                <a
                  href={currentConfig.phone.tel}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                >
                  <Phone size={14} /> Direct Call ({currentConfig.phone.number})
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors pt-1 block mx-auto"
                >
                  Edit requirements or submit another mandate
                </button>
              </div>

              <div className="text-[11px] text-stone-400 pt-2 flex items-center justify-center gap-1.5">
                <Clock size={12} /> {OFFICE_HOURS}
              </div>
            </div>
          ) : (
            /* ── Interactive Multi-Step Concierge Form ── */
            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: Mandate & Intent */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      1. What is your core acquisition or disposition objective?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentConfig.objectives.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setObjective(opt)}
                          className={`text-left text-xs p-3.5 rounded-2xl border transition-all ${
                            objective === opt
                              ? 'border-stone-950 bg-stone-950 text-white font-semibold shadow-sm'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{opt}</span>
                            {objective === opt && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      2. Client / Entity Representation Profile:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {currentConfig.clientProfiles.map((prof) => (
                        <button
                          key={prof}
                          type="button"
                          onClick={() => setClientProfile(prof)}
                          className={`text-center text-xs p-3 rounded-xl border transition-all ${
                            clientProfile === prof
                              ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                              : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {prof}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs text-stone-500">
                      Step 1 of 4: Mandate classification
                    </span>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5"
                    >
                      Next: Asset Scale & Location <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Asset Scale & Micro-Market */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      1. Preferred Asset Classification:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentConfig.propertyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setPropertyType(type)}
                          className={`text-left text-xs p-3 rounded-xl border transition-all ${
                            propertyType === type
                              ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      2. Target Jaipur Micro-Market / Locality:
                    </label>
                    <select
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="input-field text-xs font-medium"
                    >
                      {currentConfig.localities.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                        3. Priority Infrastructure / Specifications (Select all that apply):
                      </label>
                      <span className="text-[10px] text-stone-400">Optional</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentConfig.featurePills.map((feature) => {
                        const isSelected = selectedFeatures.includes(feature);
                        return (
                          <button
                            key={feature}
                            type="button"
                            onClick={() => toggleFeature(feature)}
                            className={`text-xs px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-stone-900 text-white border-stone-900 font-semibold shadow-sm'
                                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                            }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                                isSelected ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-200 text-stone-500'
                              }`}
                            >
                              {isSelected ? '✓' : '+'}
                            </span>
                            <span>{feature}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-2.5 flex items-center gap-1"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5"
                    >
                      Next: Capital & Horizon <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Capital Allocation & Horizon */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                        1. Target Budget / Capital Range:
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="input-field text-xs font-medium"
                      >
                        {currentConfig.budgets.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-stone-400 mt-1">
                        Realistic market benchmark (Est. ₹) in Jaipur
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                        2. Execution Horizon:
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="input-field text-xs font-medium"
                      >
                        {currentConfig.timelines.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-stone-400 mt-1">
                        How quickly site visits and paperwork need to commence
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      3. Liquidity Framework / Funding Readiness:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentConfig.fundingReadiness.map((funding) => (
                        <button
                          key={funding}
                          type="button"
                          onClick={() => setFundingReadiness(funding)}
                          className={`text-left text-xs p-3 rounded-xl border transition-all ${
                            fundingReadiness === funding
                              ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                          }`}
                        >
                          {funding}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-2.5 flex items-center gap-1"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5"
                    >
                      Next: Contact & Confidentiality <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Private Contact & Dispatch */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Mandate Summary Pill */}
                  <div className="bg-stone-900 text-stone-100 rounded-2xl p-4 border border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-amber-400 font-bold uppercase tracking-wider">
                        Mandate Summary Preview
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        Assigned to: {currentConfig.deskName}
                      </span>
                    </div>
                    <div className="text-xs text-stone-300 space-y-1">
                      <p>
                        <strong>Asset:</strong> {propertyType} in <strong>{locality}</strong>
                      </p>
                      <p>
                        <strong>Capital:</strong> {budget} · <strong>Horizon:</strong> {timeline}
                      </p>
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Client Representative Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ramesh Sharma"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setNameError('');
                          }}
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
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setPhoneError('');
                            }}
                            className={`input-field rounded-l-none text-xs font-mono ${
                              phoneError ? 'input-error' : ''
                            }`}
                          />
                        </div>
                        {phoneError && (
                          <p className="text-[11px] text-red-600 mt-1 font-medium">{phoneError}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Corporate Entity / Family Office Name{' '}
                        <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sharma Holdings / TechCorp India Pvt Ltd"
                        value={companyOrFamily}
                        onChange={(e) => setCompanyOrFamily(e.target.value)}
                        className="input-field text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Specific Mandate Directives / Discreet Notes{' '}
                        <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Require Non-Disclosure Agreement (NDA), specific colony/road width preference, or Capital Gains 54F timeline..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="input-field text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Discretion Guarantee */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-stone-600 leading-relaxed">
                      <strong className="text-stone-800">Strict Confidentiality Guarantee:</strong>{' '}
                      Your mandate is submitted directly to our dedicated Jaipur coordinator desk. We
                      never broadcast client data to open broker networks or third-party telemarketers.
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-3 flex items-center gap-1"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="submit"
                      className="btn-terracotta flex-1 justify-center text-sm py-3.5 shadow-md flex items-center gap-2 hover:scale-[1.01] transition-transform"
                    >
                      <MessageSquare size={16} /> Transmit Mandate to Dedicated Desk
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
