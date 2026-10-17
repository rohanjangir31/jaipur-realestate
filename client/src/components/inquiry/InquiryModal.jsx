import React, { useState, useEffect } from 'react';
import {
  X, MessageSquare, Phone, CheckCircle2, ChevronRight, ChevronLeft,
  Home, Building, BedDouble, ShieldCheck, ArrowRight, Clock, Check,
} from 'lucide-react';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../../utils/contact';
import { JAIPUR_LOCALITIES } from '../../utils/formatters';
import { inquiryApi } from '../../services/api';

/* ── Jaipur Localities list with Flexible option ── */
const LOCALITY_OPTIONS = [
  'Open to suggestions / Flexible across Jaipur',
  ...JAIPUR_LOCALITIES,
];

/* ── Vertical Base Configurations ── */
const VERTICAL_CONFIGS = {
  buy: {
    id: 'buy',
    label: 'Buy & Sell',
    eyebrow: 'Residential & Commercial Advisory',
    icon: Home,
    accentColor: 'terracotta',
    badgeClass: 'bg-terracotta-50 text-terracotta-800 border-terracotta-200',
    phone: CONTACT_NUMBERS[0], // Line 1: +91 77372 13615
    deskName: 'Residential & Commercial Desk',
  },
  rent: {
    id: 'rent',
    label: 'Rent & Lease',
    eyebrow: 'Offices, Retail & Residential Leasing',
    icon: Building,
    accentColor: 'sage',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    phone: CONTACT_NUMBERS[1], // Line 2: +91 96642 47662
    deskName: 'Commercial & Leasing Desk',
  },
  stay: {
    id: 'stay',
    label: 'Airbnb & Hospitality',
    eyebrow: 'Stays, Havelis & Host Management',
    icon: BedDouble,
    accentColor: 'rose',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
    phone: CONTACT_NUMBERS[2], // Line 3: +91 63763 12638
    deskName: 'Airbnb & Hospitality Desk',
  },
};

export default function InquiryModal({
  isOpen,
  onClose,
  initialVertical = 'buy',
  propertyContext = null,
}) {
  const [vertical, setVertical] = useState('buy');
  const [currentStep, setCurrentStep] = useState(1);

  /* ──────────────────────────────────────────────────────────
     TAB 1: BUY & SELL STATE
  ────────────────────────────────────────────────────────── */
  const [buyGoal, setBuyGoal] = useState('Buying a property');
  const [buyPropertyType, setBuyPropertyType] = useState('House or villa');
  const [buyEnquiringFor, setBuyEnquiringFor] = useState('Myself or my family');
  const [buyLocation, setBuyLocation] = useState('Open to suggestions / Flexible across Jaipur');
  const [buySellerLocation, setBuySellerLocation] = useState('Vaishali Nagar');
  const [buySellerSize, setBuySellerSize] = useState('');
  const [buyInvestorAsset, setBuyInvestorAsset] = useState('Pre-leased commercial (rental income)');
  const [buyInvestorGoal, setBuyInvestorGoal] = useState('Rental income');
  const [buyPriceRange, setBuyPriceRange] = useState('₹1 Crore – ₹2.5 Crore');
  const [buySellerPrice, setBuySellerPrice] = useState('₹1.5 Crore – ₹3 Crore');
  const [buyTiming, setBuyTiming] = useState('Within 3 months');

  /* ──────────────────────────────────────────────────────────
     TAB 2: RENT & LEASE STATE
  ────────────────────────────────────────────────────────── */
  const [rentGoal, setRentGoal] = useState('Find a property to rent or lease');
  const [rentPropertyType, setRentPropertyType] = useState('Office or coworking space');
  const [rentEnquiringFor, setRentEnquiringFor] = useState('My company or business');
  const [rentTenantArea, setRentTenantArea] = useState('Open to suggestions / Flexible across Jaipur');
  const [rentUsage, setRentUsage] = useState('Corporate Office / Commercial');
  const [rentTenantRequirements, setRentTenantRequirements] = useState([]);
  const [rentOwnerLocation, setRentOwnerLocation] = useState('Tonk Road');
  const [rentOwnerSize, setRentOwnerSize] = useState('');
  const [rentOwnerAvailability, setRentOwnerAvailability] = useState('Immediately');
  const [rentTenantBudget, setRentTenantBudget] = useState('₹50,000 – ₹1.5 Lakh / month');
  const [rentTenantTimeline, setRentTenantTimeline] = useState('Within 1 month');
  const [rentTenantDuration, setRentTenantDuration] = useState('1 to 3 years');
  const [rentOwnerExpectedRent, setRentOwnerExpectedRent] = useState('₹50,000 – ₹1.5 Lakh / month');
  const [rentOwnerPreferredDuration, setRentOwnerPreferredDuration] = useState('Long-term corporate lease (3+ years)');

  /* ──────────────────────────────────────────────────────────
     TAB 3: AIRBNB & HOSPITALITY STATE
  ────────────────────────────────────────────────────────── */
  const [stayGoal, setStayGoal] = useState('Find a place to stay');
  // Branch A: Guest
  const [stayGuestArea, setStayGuestArea] = useState('Civil Lines / C-Scheme');
  const [stayGuestAccomType, setStayGuestAccomType] = useState('Heritage Haveli');
  const [stayGuestCount, setStayGuestCount] = useState('2 guests');
  const [stayCheckIn, setStayCheckIn] = useState('');
  const [stayCheckOut, setStayCheckOut] = useState('');
  const [stayGuestBudget, setStayGuestBudget] = useState('₹7,000 – ₹15,000 / night');
  const [stayGuestNotes, setStayGuestNotes] = useState('');
  // Branch B: List property
  const [stayHostPropType, setStayHostPropType] = useState('Heritage haveli or courtyard home');
  const [stayHostLocation, setStayHostLocation] = useState('Bani Park');
  const [stayHostBedrooms, setStayHostBedrooms] = useState('3 Bedrooms');
  const [stayHostGuestCap, setStayHostGuestCap] = useState('5–8 guests');
  const [stayHostListedBefore, setStayHostListedBefore] = useState('Not yet');
  const [stayHostHelpType, setStayHostHelpType] = useState('Full turnkey management (end-to-end)');
  const [stayHostTimeline, setStayHostTimeline] = useState('Within 1 month');
  // Branch C: Property management
  const [stayMgmtLocation, setStayMgmtLocation] = useState('Pink City / Walled City');
  const [stayMgmtPropType, setStayMgmtPropType] = useState('Heritage Haveli');
  const [stayMgmtOperatingStatus, setStayMgmtOperatingStatus] = useState('Yes, currently operating');
  const [stayMgmtScope, setStayMgmtScope] = useState('Full 360° property operations');
  const [stayMgmtTimeline, setStayMgmtTimeline] = useState('Immediately');
  // Branch D: Hospitality investment
  const [stayInvestType, setStayInvestType] = useState('Buying a running Airbnb haveli/villa');
  const [stayInvestArea, setStayInvestArea] = useState('Jaipur Heritage Core / Walled City');
  const [stayInvestBudget, setStayInvestBudget] = useState('₹1.5 Crore – ₹3.5 Crore');
  const [stayInvestTimeline, setStayInvestTimeline] = useState('Within 1–3 months');

  /* ──────────────────────────────────────────────────────────
     STEP 4: CONTACT & DISPATCH (Shared)
  ────────────────────────────────────────────────────────── */
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactMethod, setContactMethod] = useState('WhatsApp message');
  const [additionalNotes, setAdditionalNotes] = useState('');

  /* ──────────────────────────────────────────────────────────
     UI & SUBMISSION STATES
  ────────────────────────────────────────────────────────── */
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateError, setDateError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState('');

  /* ──────────────────────────────────────────────────────────
     INITIALIZE ON OPEN
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      const v = VERTICAL_CONFIGS[initialVertical] ? initialVertical : 'buy';
      setVertical(v);
      setCurrentStep(1);
      setIsSubmitted(false);
      setNameError('');
      setPhoneError('');
      setEmailError('');
      setDateError('');

      if (propertyContext?.locality) {
        if (v === 'buy') setBuyLocation(propertyContext.locality);
        if (v === 'rent') setRentTenantArea(propertyContext.locality);
        if (v === 'stay') setStayGuestArea(propertyContext.locality);
      }
      if (propertyContext?.propertyType) {
        if (v === 'buy') setBuyPropertyType(propertyContext.propertyType);
        if (v === 'rent') setRentPropertyType(propertyContext.propertyType);
        if (v === 'stay') setStayGuestAccomType(propertyContext.propertyType);
      }
      if (propertyContext?.title) {
        setAdditionalNotes(`Regarding: "${propertyContext.title}"`);
      }
    }
  }, [isOpen, initialVertical, propertyContext]);

  /* Close on Escape */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentConfig = VERTICAL_CONFIGS[vertical];

  /* ── Tab Switch Handler (Preserves contact details & selections) ── */
  const handleTabSwitch = (newVertical) => {
    setVertical(newVertical);
    setCurrentStep(1);
  };

  /* ── Progress Step Meta ── */
  const getStepLabels = () => {
    if (vertical === 'stay' && stayGoal === 'Find a place to stay') {
      return [
        { id: 1, title: 'Your Goal', desc: 'What you need' },
        { id: 2, title: 'Stay Details', desc: 'Location & guests' },
        { id: 3, title: 'Dates & Budget', desc: 'When you are visiting' },
        { id: 4, title: 'Your Contact Details', desc: 'Where to reach you' },
      ];
    }
    return [
      { id: 1, title: 'Your Goal', desc: 'What you want to do' },
      { id: 2, title: 'Property Details', desc: 'Location & type' },
      { id: 3, title: 'Budget & Timing', desc: 'Price & timeline' },
      { id: 4, title: 'Your Contact Details', desc: 'Where to reach you' },
    ];
  };

  const steps = getStepLabels();

  /* ── Toggle Multi-Select Requirements ── */
  const toggleTenantRequirement = (req) => {
    setRentTenantRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  /* ── Step Navigation ── */
  const handleNextStep = () => {
    // Validate guest dates if in Tab 3 Branch A Step 3
    if (vertical === 'stay' && stayGoal === 'Find a place to stay' && currentStep === 3) {
      if (stayCheckIn && stayCheckOut && stayCheckOut < stayCheckIn) {
        setDateError('Check-out date must be after check-in date');
        return;
      }
      setDateError('');
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* ── Final Submission Handler ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate name
    if (!fullName.trim() || fullName.trim().length < 2) {
      setNameError('Please enter your full name');
      hasError = true;
    } else {
      setNameError('');
    }

    // Validate phone (10-digit Indian mobile)
    const cleanDigits = phone.replace(/\D/g, '');
    if (!cleanDigits || cleanDigits.length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      hasError = true;
    } else {
      setPhoneError('');
    }

    // Validate email if provided
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (hasError) return;

    /* ── Compile Plain-English WhatsApp Dossier ── */
    const lines = [
      '🏛️ *JAIPUR ESTATES — ADVISORY ENQUIRY*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `📍 *Service:* ${currentConfig.label}`,
      `🏢 *Assigned Desk:* ${currentConfig.deskName} (${currentConfig.phone.number})`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `👤 *Name:* ${fullName.trim()}`,
      `📞 *Phone:* +91 ${cleanDigits.slice(-10)}`,
    ];

    if (email.trim()) {
      lines.push(`✉️ *Email:* ${email.trim()}`);
    }

    if (companyName.trim()) {
      lines.push(`🏢 *Company / Business:* ${companyName.trim()}`);
    }

    lines.push(`💬 *Preferred Contact:* ${contactMethod}`);
    lines.push('────────────────────────────');

    // Details according to active vertical and branch
    if (vertical === 'buy') {
      lines.push(`🎯 *Goal:* ${buyGoal}`);
      lines.push(`🏠 *Property Type:* ${buyPropertyType}`);
      lines.push(`👥 *Enquiring For:* ${buyEnquiringFor}`);
      if (buyGoal === 'Selling a property') {
        lines.push(`📍 *Property Location:* ${buySellerLocation}`);
        if (buySellerSize.trim()) lines.push(`📐 *Approximate Size:* ${buySellerSize.trim()}`);
        lines.push(`💰 *Expected Price:* ${buySellerPrice}`);
      } else if (buyGoal === 'Exploring property investments') {
        lines.push(`📍 *Target Location:* ${buyLocation}`);
        lines.push(`💼 *Investment Focus:* ${buyInvestorAsset}`);
        lines.push(`🎯 *Investment Goal:* ${buyInvestorGoal}`);
        lines.push(`💰 *Budget Range:* ${buyPriceRange}`);
      } else {
        lines.push(`📍 *Preferred Location:* ${buyLocation}`);
        lines.push(`💰 *Budget Range:* ${buyPriceRange}`);
      }
      lines.push(`⏱️ *Timing:* ${buyTiming}`);
    } else if (vertical === 'rent') {
      lines.push(`🎯 *Goal:* ${rentGoal}`);
      lines.push(`🏢 *Property Type:* ${rentPropertyType}`);
      lines.push(`👥 *Enquiring For:* ${rentEnquiringFor}`);
      if (rentGoal === 'Rent or lease out my property') {
        lines.push(`📍 *Location:* ${rentOwnerLocation}`);
        if (rentOwnerSize.trim()) lines.push(`📐 *Approximate Size:* ${rentOwnerSize.trim()}`);
        lines.push(`💰 *Expected Rent:* ${rentOwnerExpectedRent}`);
        lines.push(`📅 *Available From:* ${rentOwnerAvailability}`);
        lines.push(`⏱️ *Preferred Duration:* ${rentOwnerPreferredDuration}`);
      } else {
        lines.push(`📍 *Preferred Area:* ${rentTenantArea}`);
        lines.push(`💼 *Intended Use:* ${rentUsage}`);
        lines.push(`💰 *Monthly Rent Range:* ${rentTenantBudget}`);
        lines.push(`⏱️ *Need Property By:* ${rentTenantTimeline}`);
        lines.push(`📅 *Lease Duration:* ${rentTenantDuration}`);
        if (rentTenantRequirements.length > 0) {
          lines.push(`✦ *Requirements:* ${rentTenantRequirements.join(', ')}`);
        }
      }
    } else if (vertical === 'stay') {
      lines.push(`🎯 *Goal:* ${stayGoal}`);
      if (stayGoal === 'Find a place to stay') {
        lines.push(`📍 *Preferred Area:* ${stayGuestArea}`);
        lines.push(`🏡 *Accommodation Type:* ${stayGuestAccomType}`);
        lines.push(`👥 *Guests:* ${stayGuestCount}`);
        if (stayCheckIn) lines.push(`📅 *Check-in Date:* ${stayCheckIn}`);
        if (stayCheckOut) lines.push(`📅 *Check-out Date:* ${stayCheckOut}`);
        lines.push(`💰 *Budget per Night:* ${stayGuestBudget}`);
        if (stayGuestNotes.trim()) lines.push(`✦ *Preferences:* ${stayGuestNotes.trim()}`);
      } else if (stayGoal === 'List my property for short stays') {
        lines.push(`🏡 *Property Type:* ${stayHostPropType}`);
        lines.push(`📍 *Location:* ${stayHostLocation}`);
        lines.push(`🛏️ *Bedrooms:* ${stayHostBedrooms} · *Guests:* ${stayHostGuestCap}`);
        lines.push(`🌐 *Already Listed:* ${stayHostListedBefore}`);
        lines.push(`💼 *Help Needed:* ${stayHostHelpType}`);
        lines.push(`⏱️ *Starting Timeline:* ${stayHostTimeline}`);
      } else if (stayGoal === 'Get help managing my property') {
        lines.push(`📍 *Location:* ${stayMgmtLocation}`);
        lines.push(`🏡 *Property Type:* ${stayMgmtPropType}`);
        lines.push(`📊 *Current Status:* ${stayMgmtOperatingStatus}`);
        lines.push(`💼 *Management Scope:* ${stayMgmtScope}`);
        lines.push(`⏱️ *Start Time:* ${stayMgmtTimeline}`);
      } else if (stayGoal === 'Explore a hospitality property or investment') {
        lines.push(`💼 *Opportunity:* ${stayInvestType}`);
        lines.push(`📍 *Preferred Area:* ${stayInvestArea}`);
        lines.push(`💰 *Budget Range:* ${stayInvestBudget}`);
        lines.push(`⏱️ *Timeline:* ${stayInvestTimeline}`);
      }
    }

    if (additionalNotes.trim()) {
      lines.push(`📝 *Additional Notes:* ${additionalNotes.trim()}`);
    }

    lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    lines.push(`⏰ *Office Hours:* ${OFFICE_HOURS}`);

    const messageText = lines.join('\n');
    const waUrl = `https://wa.me/${currentConfig.phone.cleanNumber}?text=${encodeURIComponent(messageText)}`;

    setGeneratedWaUrl(waUrl);
    setIsSubmitted(true);

    /* ── Lead Persistence: LocalStorage + Backend API Fallback ── */
    const leadPayload = {
      timestamp: new Date().toISOString(),
      vertical,
      fullName: fullName.trim(),
      phone: cleanDigits.slice(-10),
      email: email.trim(),
      companyName: companyName.trim(),
      contactMethod,
      additionalNotes: additionalNotes.trim(),
      summaryDocket: messageText,
    };

    try {
      const storedLeads = JSON.parse(localStorage.getItem('jaipur_estates_leads') || '[]');
      storedLeads.unshift(leadPayload);
      localStorage.setItem('jaipur_estates_leads', JSON.stringify(storedLeads.slice(0, 50)));
    } catch {
      /* ignore quota errors */
    }

    // Attempt backend save asynchronously
    try {
      await inquiryApi.submitInquiry({
        inquiryType: vertical === 'buy' ? 'BUY' : vertical === 'stay' ? 'STAY' : 'INVEST',
        contactName: fullName.trim(),
        contactEmail: email.trim() || 'inquiry@jaipurestates.in',
        contactPhone: cleanDigits.slice(-10),
        message: messageText,
        details: leadPayload,
      });
    } catch {
      /* silently caught by resilient api layer */
    }

    // Auto-open WhatsApp in new tab
    try {
      window.open(waUrl, '_blank');
    } catch {
      /* popup blocked fallback */
    }
  };

  /* Helper to check if company field should show */
  const shouldShowCompanyField = () => {
    if (vertical === 'buy') {
      return buyEnquiringFor === 'My company or business' || buyEnquiringFor === 'A client or organisation I represent';
    }
    if (vertical === 'rent') {
      return rentEnquiringFor === 'My company or business' || rentEnquiringFor === 'A client or organisation I represent';
    }
    return false;
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
                <ShieldCheck size={11} /> Direct Consultation · No spam
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Tell Us What You're Looking For
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Share a few details so we can understand your needs and connect you with the right person.
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
              {Object.values(VERTICAL_CONFIGS).map((cfg) => {
                const Icon = cfg.icon;
                const isActive = vertical === cfg.id;
                return (
                  <button
                    key={cfg.id}
                    type="button"
                    onClick={() => handleTabSwitch(cfg.id)}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
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
        )}

        {/* 4 Consistent Progress Stages */}
        {!isSubmitted && (
          <div className="px-5 sm:px-7 py-3 bg-white border-b border-stone-100 shrink-0 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[500px] sm:min-w-0">
              {steps.map((step, index) => {
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
                    {index < steps.length - 1 && (
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

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {isSubmitted ? (
            /* ── Confirmation / Success Screen ── */
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={36} />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Enquiry Docket Ready
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. Your enquiry details have been prepared for our{' '}
                  <strong>{currentConfig.deskName}</strong> coordinator.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-5 text-left text-xs space-y-2.5 max-w-lg mx-auto">
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Assigned Coordinator Desk:</span>
                  <span className="font-bold text-stone-900">{currentConfig.phone.number}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Your Goal:</span>
                  <span className="font-semibold text-stone-800 text-right max-w-[60%] truncate">
                    {vertical === 'buy' ? buyGoal : vertical === 'rent' ? rentGoal : stayGoal}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500 font-medium">Property Type:</span>
                  <span className="font-semibold text-stone-800">
                    {vertical === 'buy' ? buyPropertyType : vertical === 'rent' ? rentPropertyType : stayGuestAccomType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 font-medium">Preferred Contact:</span>
                  <span className="font-semibold text-stone-800">{contactMethod}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
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
                  <Phone size={14} /> Call Coordinator Directly ({currentConfig.phone.number})
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors pt-1 block mx-auto"
                >
                  Edit details or submit another enquiry
                </button>
              </div>

              <div className="text-[11px] text-stone-400 pt-2 flex items-center justify-center gap-1.5">
                <Clock size={12} /> {OFFICE_HOURS}
              </div>
            </div>
          ) : (
            /* ── Interactive Multi-Step Form ── */
            <form onSubmit={handleSubmit} noValidate>

              {/* ════════════════════════════════════════════════
                  STEP 1: YOUR GOAL
              ════════════════════════════════════════════════ */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* TAB 1: BUY & SELL — Step 1 */}
                  {vertical === 'buy' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          What would you like help with?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            'Buying a property',
                            'Selling a property',
                            'Exploring property investments',
                            "I'm not sure yet",
                          ].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setBuyGoal(opt)}
                              className={`text-left text-xs p-3.5 rounded-2xl border transition-all ${
                                buyGoal === opt
                                  ? 'border-stone-950 bg-stone-950 text-white font-semibold shadow-sm'
                                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{opt}</span>
                                {buyGoal === opt && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          {buyGoal === 'Selling a property'
                            ? 'What type of property would you like to sell?'
                            : 'What type of property are you interested in?'}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Apartment or flat',
                            'House or villa',
                            'Plot or land',
                            'Shop or retail space',
                            'Office or commercial building',
                            'Hotel or hospitality property',
                            'Something else',
                            'Not sure yet',
                          ].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setBuyPropertyType(type)}
                              className={`text-center text-xs p-3 rounded-xl border transition-all ${
                                buyPropertyType === type
                                  ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          Who are you enquiring for? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Myself or my family',
                            'My company or business',
                            'A client or organisation I represent',
                            'Prefer not to say',
                          ].map((profile) => (
                            <button
                              key={profile}
                              type="button"
                              onClick={() => setBuyEnquiringFor(profile)}
                              className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                buyEnquiringFor === profile
                                  ? 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                                  : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'
                              }`}
                            >
                              {profile}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* TAB 2: RENT & LEASE — Step 1 */}
                  {vertical === 'rent' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          What would you like to do?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {[
                            'Find a property to rent or lease',
                            'Rent or lease out my property',
                            'Discuss my leasing requirements',
                            'Not sure yet',
                          ].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setRentGoal(opt)}
                              className={`text-left text-xs p-3.5 rounded-2xl border transition-all ${
                                rentGoal === opt
                                  ? 'border-stone-950 bg-stone-950 text-white font-semibold shadow-sm'
                                  : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{opt}</span>
                                {rentGoal === opt && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          {rentGoal === 'Rent or lease out my property'
                            ? 'What type of property would you like to rent or lease out?'
                            : 'What type of property do you need?'}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Home or apartment',
                            'House or villa',
                            'Shop or retail space',
                            'Office or coworking space',
                            'Warehouse or industrial space',
                            'Land or plot',
                            'Other',
                            'Not sure yet',
                          ].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setRentPropertyType(type)}
                              className={`text-center text-xs p-3 rounded-xl border transition-all ${
                                rentPropertyType === type
                                  ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                          Who are you enquiring for? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Myself or my family',
                            'My company or business',
                            'A client or organisation I represent',
                            'Prefer not to say',
                          ].map((profile) => (
                            <button
                              key={profile}
                              type="button"
                              onClick={() => setRentEnquiringFor(profile)}
                              className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                rentEnquiringFor === profile
                                  ? 'border-stone-900 bg-stone-100 text-stone-900 font-semibold'
                                  : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'
                              }`}
                            >
                              {profile}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* TAB 3: AIRBNB & HOSPITALITY — Step 1 */}
                  {vertical === 'stay' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                        How can we help you?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: 'Find a place to stay', desc: 'Browse available havelis, villas and homestays' },
                          { id: 'List my property for short stays', desc: 'Turn your property into a short-stay rental' },
                          { id: 'Get help managing my property', desc: 'Operations, housekeeping, check-ins & pricing' },
                          { id: 'Explore a hospitality property or investment', desc: 'Buy or invest in a high-yield stay' },
                          { id: 'Not sure yet', desc: 'Speak with our hospitality desk for advice' },
                        ].map(({ id: opt, desc }) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setStayGoal(opt)}
                            className={`text-left p-3.5 rounded-2xl border transition-all ${
                              stayGoal === opt
                                ? 'border-stone-950 bg-stone-950 text-white font-semibold shadow-sm'
                                : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{opt}</span>
                              {stayGoal === opt && <Check size={14} className="text-amber-400 shrink-0 ml-2" />}
                            </div>
                            <p className={`text-[11px] mt-1 ${stayGoal === opt ? 'text-stone-300' : 'text-stone-400'}`}>
                              {desc}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation Bar */}
                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <span className="text-xs text-stone-500">Step 1 of 4: Setting your goal</span>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5 cursor-pointer"
                    >
                      Next: Property Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  STEP 2: PROPERTY DETAILS
              ════════════════════════════════════════════════ */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* TAB 1: BUY & SELL — Step 2 */}
                  {vertical === 'buy' && (
                    <>
                      {buyGoal === 'Selling a property' ? (
                        /* Seller Fields */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where is your property located?
                            </label>
                            <select
                              value={buySellerLocation}
                              onChange={(e) => setBuySellerLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {JAIPUR_LOCALITIES.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Approximate property size <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 1,800 sq ft or 200 sq yards (skip if not sure)"
                              value={buySellerSize}
                              onChange={(e) => setBuySellerSize(e.target.value)}
                              className="input-field text-xs"
                            />
                            <p className="text-[11px] text-stone-400 mt-1">
                              You can leave this blank if you don't know the exact measurement.
                            </p>
                          </div>
                        </div>
                      ) : buyGoal === 'Exploring property investments' ? (
                        /* Investor Fields */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where would you like to invest?
                            </label>
                            <select
                              value={buyLocation}
                              onChange={(e) => setBuyLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {LOCALITY_OPTIONS.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                              What kind of property opportunity interests you?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                'Pre-leased commercial (rental income)',
                                'Residential villa or flat for growth',
                                'Commercial land or plot for development',
                                'Heritage or boutique hospitality asset',
                                'Not sure yet / Open to recommendations',
                              ].map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => setBuyInvestorAsset(item)}
                                  className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                    buyInvestorAsset === item
                                      ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                              What is your main goal?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                'Rental income',
                                'Long-term ownership',
                                'Buying for my own use',
                                'Property or land for development',
                                'Still exploring',
                              ].map((g) => (
                                <button
                                  key={g}
                                  type="button"
                                  onClick={() => setBuyInvestorGoal(g)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    buyInvestorGoal === g
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {g}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard Buyer Fields */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where would you like to buy?
                            </label>
                            <select
                              value={buyLocation}
                              onChange={(e) => setBuyLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {LOCALITY_OPTIONS.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                            <p className="text-[11px] text-stone-400 mt-1">
                              Select a preferred neighbourhood or choose flexible if you are open to suggestions.
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* TAB 2: RENT & LEASE — Step 2 */}
                  {vertical === 'rent' && (
                    <>
                      {rentGoal === 'Rent or lease out my property' ? (
                        /* Owner Journey */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where is the property located?
                            </label>
                            <select
                              value={rentOwnerLocation}
                              onChange={(e) => setRentOwnerLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {JAIPUR_LOCALITIES.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Approximately how large is it? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. 2,500 sq ft (or skip if not known)"
                              value={rentOwnerSize}
                              onChange={(e) => setRentOwnerSize(e.target.value)}
                              className="input-field text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              When will it be available?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'Immediately',
                                'Within 30 days',
                                'In 1–3 months',
                                'Under fit-out / renovation',
                              ].map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => setRentOwnerAvailability(item)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    rentOwnerAvailability === item
                                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Prospective Tenant Journey */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Which area are you interested in?
                            </label>
                            <select
                              value={rentTenantArea}
                              onChange={(e) => setRentTenantArea(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {LOCALITY_OPTIONS.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What will you use the property for?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                'Living / Residential',
                                'Corporate Office / IT',
                                'Retail Store / Showroom',
                                'Storage or Warehouse',
                                'Clinic / Professional Practice',
                                'Other commercial use',
                              ].map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => setRentUsage(item)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    rentUsage === item
                                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Important requirements <span className="text-stone-400 font-normal lowercase">(optional, select all that apply)</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {[
                                'Fully furnished',
                                'Reserved parking space',
                                'Road facing / Signage',
                                'Direct metro access',
                                '100% power backup',
                                'Ground floor access',
                              ].map((req) => {
                                const selected = rentTenantRequirements.includes(req);
                                return (
                                  <button
                                    key={req}
                                    type="button"
                                    onClick={() => toggleTenantRequirement(req)}
                                    className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                                      selected
                                        ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                                    }`}
                                  >
                                    {selected ? '✓ ' : '+ '}
                                    {req}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* TAB 3: AIRBNB & HOSPITALITY — Step 2 */}
                  {vertical === 'stay' && (
                    <>
                      {stayGoal === 'Find a place to stay' && (
                        /* Branch A: Guest */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where would you like to stay?
                            </label>
                            <select
                              value={stayGuestArea}
                              onChange={(e) => setStayGuestArea(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                'Civil Lines / C-Scheme',
                                'Pink City (Walled City Heritage Core)',
                                'Bani Park',
                                'Amer / Kukas Tourist Belt',
                                'Jagatpura / Airport Corridor',
                                'Open to suggestions / Flexible',
                              ].map((area) => (
                                <option key={area} value={area}>
                                  {area}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What type of accommodation do you prefer?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                'Heritage Haveli',
                                'Private Pool Villa',
                                'Boutique Homestay',
                                'Studio / Apartment',
                                'Not sure yet',
                              ].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setStayGuestAccomType(type)}
                                  className={`text-center text-xs p-3 rounded-xl border transition-all ${
                                    stayGuestAccomType === type
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
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
                              How many guests will be staying?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                '1–2 guests',
                                '3–5 guests',
                                '6–10 guests',
                                '10+ guests (Large group)',
                              ].map((count) => (
                                <button
                                  key={count}
                                  type="button"
                                  onClick={() => setStayGuestCount(count)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayGuestCount === count
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {count}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {stayGoal === 'List my property for short stays' && (
                        /* Branch B: New Host */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What type of property do you have?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                'Apartment or flat',
                                'House or villa',
                                'Heritage haveli or courtyard home',
                                'Farmhouse or estate',
                                'Studio space',
                                'Other',
                              ].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setStayHostPropType(type)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayHostPropType === type
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
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
                              Where is it located?
                            </label>
                            <select
                              value={stayHostLocation}
                              onChange={(e) => setStayHostLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {JAIPUR_LOCALITIES.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                                Bedrooms:
                              </label>
                              <select
                                value={stayHostBedrooms}
                                onChange={(e) => setStayHostBedrooms(e.target.value)}
                                className="input-field text-xs"
                              >
                                {['1 Bedroom', '2 Bedrooms', '3 Bedrooms', '4+ Bedrooms'].map((b) => (
                                  <option key={b} value={b}>{b}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                                Guest capacity:
                              </label>
                              <select
                                value={stayHostGuestCap}
                                onChange={(e) => setStayHostGuestCap(e.target.value)}
                                className="input-field text-xs"
                              >
                                {['1–2 guests', '3–4 guests', '5–8 guests', '8+ guests', 'Not sure yet'].map((g) => (
                                  <option key={g} value={g}>{g}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      {stayGoal === 'Get help managing my property' && (
                        /* Branch C: Management */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Where is the property located?
                            </label>
                            <select
                              value={stayMgmtLocation}
                              onChange={(e) => setStayMgmtLocation(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {JAIPUR_LOCALITIES.map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What type of property is it?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {['Heritage Haveli', 'Villa', 'Apartment', 'Homestay'].map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setStayMgmtPropType(t)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayMgmtPropType === t
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Is it already operating as a short-stay property?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'Yes, currently operating',
                                'Operated previously',
                                'Ready to launch',
                                'Under renovation / setup',
                              ].map((status) => (
                                <button
                                  key={status}
                                  type="button"
                                  onClick={() => setStayMgmtOperatingStatus(status)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayMgmtOperatingStatus === status
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {stayGoal === 'Explore a hospitality property or investment' && (
                        /* Branch D: Hospitality Investment */
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What type of opportunity are you exploring?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                'Buying a running Airbnb haveli/villa',
                                'Buying a residential unit to convert to short stay',
                                'Investing in a boutique homestay',
                                'Lease-to-host partnership',
                                'Still exploring',
                              ].map((opp) => (
                                <button
                                  key={opp}
                                  type="button"
                                  onClick={() => setStayInvestType(opp)}
                                  className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                    stayInvestType === opp
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                                  }`}
                                >
                                  {opp}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Which city or area interests you?
                            </label>
                            <select
                              value={stayInvestArea}
                              onChange={(e) => setStayInvestArea(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                'Jaipur Heritage Core / Walled City',
                                'Civil Lines / C-Scheme',
                                'Bani Park',
                                'Amer / Tourist Belt',
                                'Open to high-occupancy locations',
                              ].map((loc) => (
                                <option key={loc} value={loc}>
                                  {loc}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {stayGoal === 'Not sure yet' && (
                        /* Branch General */
                        <div className="space-y-4">
                          <p className="text-xs text-stone-600">
                            No problem. Tell us roughly what area or type of hospitality property you have in mind:
                          </p>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Area of interest:
                            </label>
                            <select
                              value={stayGuestArea}
                              onChange={(e) => setStayGuestArea(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {LOCALITY_OPTIONS.map((loc) => (
                                <option key={loc} value={loc}>{loc}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Navigation Bar */}
                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-2.5 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5 cursor-pointer"
                    >
                      Next: {vertical === 'stay' && stayGoal === 'Find a place to stay' ? 'Dates & Budget' : 'Budget & Timing'}{' '}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  STEP 3: BUDGET & TIMING / DATES
              ════════════════════════════════════════════════ */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* TAB 1: BUY & SELL — Step 3 */}
                  {vertical === 'buy' && (
                    <div className="space-y-4">
                      {buyGoal === 'Selling a property' ? (
                        /* Seller Price & Timing */
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                            What selling price do you have in mind? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                          </label>
                          <select
                            value={buySellerPrice}
                            onChange={(e) => setBuySellerPrice(e.target.value)}
                            className="input-field text-xs font-medium"
                          >
                            {[
                              'Under ₹75 Lakh',
                              '₹75 Lakh – ₹1.5 Crore',
                              '₹1.5 Crore – ₹3 Crore',
                              '₹3 Crore – ₹6 Crore',
                              '₹6 Crore+',
                              'Not sure yet',
                              'Prefer to discuss',
                            ].map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        /* Buyer / Investor Price Range */
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                            What price range are you considering?
                          </label>
                          <select
                            value={buyPriceRange}
                            onChange={(e) => setBuyPriceRange(e.target.value)}
                            className="input-field text-xs font-medium"
                          >
                            {[
                              'Under ₹50 Lakh',
                              '₹50 Lakh – ₹1 Crore',
                              '₹1 Crore – ₹2.5 Crore',
                              '₹2.5 Crore – ₹5 Crore',
                              '₹5 Crore+',
                              'Not sure yet',
                              'Prefer to discuss',
                            ].map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                          When are you hoping to {buyGoal === 'Selling a property' ? 'sell' : 'buy'}?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {[
                            'As soon as possible',
                            'Within 3 months',
                            'Within 3–6 months',
                            'More than 6 months',
                            'Just exploring',
                          ].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setBuyTiming(t)}
                              className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                buyTiming === t
                                  ? 'border-terracotta-700 bg-terracotta-50 text-terracotta-900 font-bold'
                                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: RENT & LEASE — Step 3 */}
                  {vertical === 'rent' && (
                    <div className="space-y-4">
                      {rentGoal === 'Rent or lease out my property' ? (
                        /* Owner Pricing & Duration */
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What monthly rent are you expecting? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <select
                              value={rentOwnerExpectedRent}
                              onChange={(e) => setRentOwnerExpectedRent(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                'Under ₹50,000 / month',
                                '₹50,000 – ₹1.5 Lakh / month',
                                '₹1.5 Lakh – ₹4 Lakh / month',
                                '₹4 Lakh+ / month',
                                'Not sure yet / Market rate',
                                'Prefer to discuss',
                              ].map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Is there a preferred lease duration? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                '11 months standard',
                                '1 to 3 years',
                                'Long-term corporate lease (3+ years)',
                                'Open to discussion',
                              ].map((d) => (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => setRentOwnerPreferredDuration(d)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    rentOwnerPreferredDuration === d
                                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Tenant Rent & Duration */
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What monthly rent range are you comfortable with?
                            </label>
                            <select
                              value={rentTenantBudget}
                              onChange={(e) => setRentTenantBudget(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                'Under ₹25,000 / month',
                                '₹25,000 – ₹50,000 / month',
                                '₹50,000 – ₹1.5 Lakh / month',
                                '₹1.5 Lakh – ₹4 Lakh / month',
                                '₹4 Lakh+ / month',
                                'Not sure yet',
                                'Prefer to discuss',
                              ].map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              When do you need the property?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'As soon as possible',
                                'Within 1 month',
                                'Within 1–3 months',
                                'Flexible / exploring',
                              ].map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setRentTenantTimeline(t)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    rentTenantTimeline === t
                                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              How long would you like to rent or lease it for? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {[
                                '11 months standard',
                                '1 to 3 years',
                                '3 to 5 years (long lease)',
                                '5+ years (corporate)',
                                'Not sure yet',
                              ].map((d) => (
                                <button
                                  key={d}
                                  type="button"
                                  onClick={() => setRentTenantDuration(d)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    rentTenantDuration === d
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* TAB 3: AIRBNB & HOSPITALITY — Step 3 */}
                  {vertical === 'stay' && (
                    <div className="space-y-4">
                      {stayGoal === 'Find a place to stay' && (
                        /* Branch A: Guest Dates & Nightly Budget */
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                                Check-in date: <span className="text-stone-400 font-normal lowercase">(optional)</span>
                              </label>
                              <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                value={stayCheckIn}
                                onChange={(e) => {
                                  setStayCheckIn(e.target.value);
                                  setDateError('');
                                }}
                                className="input-field text-xs"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">
                                Check-out date: <span className="text-stone-400 font-normal lowercase">(optional)</span>
                              </label>
                              <input
                                type="date"
                                min={stayCheckIn || new Date().toISOString().split('T')[0]}
                                value={stayCheckOut}
                                onChange={(e) => {
                                  setStayCheckOut(e.target.value);
                                  setDateError('');
                                }}
                                className="input-field text-xs"
                              />
                            </div>
                          </div>
                          {dateError && (
                            <p className="text-xs text-red-600 font-medium">{dateError}</p>
                          )}
                          <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                            ℹ️ <strong>Note:</strong> This sends an availability enquiry to our desk. Our coordinators will share open dates and direct pictures on WhatsApp.
                          </p>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What's your budget per night? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <select
                              value={stayGuestBudget}
                              onChange={(e) => setStayGuestBudget(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                'Under ₹3,000 / night',
                                '₹3,000 – ₹7,000 / night',
                                '₹7,000 – ₹15,000 / night',
                                '₹15,000+ / night (Luxury Villa / Haveli)',
                                'Prefer to discuss',
                              ].map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Important preferences or requirements <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Private pool, breakfast included, ground floor bedroom..."
                              value={stayGuestNotes}
                              onChange={(e) => setStayGuestNotes(e.target.value)}
                              className="input-field text-xs"
                            />
                          </div>
                        </>
                      )}

                      {stayGoal === 'List my property for short stays' && (
                        /* Branch B: New Host Support */
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              Is the property already listed on a short-stay platform?
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Yes', 'No', 'Not yet'].map((item) => (
                                <button
                                  key={item}
                                  type="button"
                                  onClick={() => setStayHostListedBefore(item)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayHostListedBefore === item
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What help are you looking for?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                'Setting up a new listing',
                                'Improving an existing listing',
                                'Guest communication & check-in',
                                'Housekeeping & property operations',
                                'Full turnkey management (end-to-end)',
                              ].map((help) => (
                                <button
                                  key={help}
                                  type="button"
                                  onClick={() => setStayHostHelpType(help)}
                                  className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                    stayHostHelpType === help
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                                  }`}
                                >
                                  {help}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              When would you like to start?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'As soon as possible',
                                'Within 1 month',
                                'In 1–3 months',
                                'Just exploring options',
                              ].map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setStayHostTimeline(t)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayHostTimeline === t
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {stayGoal === 'Get help managing my property' && (
                        /* Branch C: Management Scope & Timeline */
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What would you like help managing?
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                'Guest check-in & communications',
                                'Housekeeping & linen management',
                                'Dynamic pricing & Airbnb marketing',
                                'Full 360° property operations',
                                'Not sure yet / Want advice',
                              ].map((scope) => (
                                <button
                                  key={scope}
                                  type="button"
                                  onClick={() => setStayMgmtScope(scope)}
                                  className={`text-left text-xs p-3 rounded-xl border transition-all ${
                                    stayMgmtScope === scope
                                      ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                      : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                                  }`}
                                >
                                  {scope}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              When would you like management to begin?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'Immediately',
                                'Within 30 days',
                                'Next 1–3 months',
                                'Exploring for upcoming season',
                              ].map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setStayMgmtTimeline(t)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayMgmtTimeline === t
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {stayGoal === 'Explore a hospitality property or investment' && (
                        /* Branch D: Investment Budget & Timeline */
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              What budget range are you considering? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                            </label>
                            <select
                              value={stayInvestBudget}
                              onChange={(e) => setStayInvestBudget(e.target.value)}
                              className="input-field text-xs font-medium"
                            >
                              {[
                                '₹50 Lakh – ₹1 Crore',
                                '₹1 Crore – ₹2.5 Crore',
                                '₹2.5 Crore – ₹5 Crore',
                                '₹5 Crore+',
                                'Not sure yet',
                                'Prefer to discuss',
                              ].map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                              When are you looking to proceed?
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {[
                                'Within 1–3 months',
                                '3–6 months',
                                '6+ months',
                                'Just researching',
                              ].map((t) => (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setStayInvestTimeline(t)}
                                  className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                    stayInvestTimeline === t
                                      ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold'
                                      : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                  }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {stayGoal === 'Not sure yet' && (
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                            Rough timeline:
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Soon', 'In a few months', 'Just curious'].map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setStayInvestTimeline(t)}
                                className={`text-center text-xs p-2.5 rounded-xl border transition-all ${
                                  stayInvestTimeline === t
                                    ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                    : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Navigation Bar */}
                  <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-2.5 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn-terracotta text-xs font-semibold !py-2.5 !px-5 flex items-center gap-1.5 cursor-pointer"
                    >
                      Next: Your Contact Details <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* ════════════════════════════════════════════════
                  STEP 4: YOUR CONTACT DETAILS
              ════════════════════════════════════════════════ */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Summary preview bar */}
                  <div className="bg-stone-900 text-stone-100 rounded-2xl p-4 border border-stone-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-amber-400 font-bold uppercase tracking-wider">
                        Enquiry Summary
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        Routing to: {currentConfig.deskName}
                      </span>
                    </div>
                    <div className="text-xs text-stone-300">
                      <p>
                        <strong>Goal:</strong> {vertical === 'buy' ? buyGoal : vertical === 'rent' ? rentGoal : stayGoal} ·{' '}
                        <strong>Type:</strong> {vertical === 'buy' ? buyPropertyType : vertical === 'rent' ? rentPropertyType : stayGuestAccomType}
                      </p>
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Email Address <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. ramesh@example.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                          }}
                          className={`input-field text-xs ${emailError ? 'input-error' : ''}`}
                        />
                        {emailError && (
                          <p className="text-[11px] text-red-600 mt-1 font-medium">{emailError}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Preferred Contact Method:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['WhatsApp message', 'Phone call'].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setContactMethod(m)}
                              className={`text-center text-xs py-2.5 px-3 rounded-xl border transition-all ${
                                contactMethod === m
                                  ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                              }`}
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Conditional Company Name Field */}
                    {shouldShowCompanyField() && (
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">
                          Company / Business Name <span className="text-stone-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Acme Technologies Pvt Ltd"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="input-field text-xs"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Additional details or questions <span className="text-stone-400 font-normal lowercase">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Prefer east-facing, need parking for 2 cars, or have questions about legal verification..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        className="input-field text-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Reassuring & Realistic Privacy Notice */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-stone-600 leading-relaxed">
                      <strong className="text-stone-800">Direct Consultation Guarantee:</strong> Your
                      details are sent directly to our dedicated Jaipur coordinator. We respect your
                      privacy and never broadcast your contact details or send unsolicited marketing messages.
                    </div>
                  </div>

                  {/* Submit Actions */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="btn-ghost text-xs font-semibold !py-3 flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                    <button
                      type="submit"
                      className="btn-terracotta flex-1 justify-center text-sm py-3.5 shadow-md flex items-center gap-2 hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      <MessageSquare size={16} /> Submit Enquiry to Coordinator
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
