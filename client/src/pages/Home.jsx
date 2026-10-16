import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, ArrowRight, Search, Check, Building, Home as HomeIcon, BedDouble,
  Phone, MessageSquare, Clock, Sparkles, CalendarCheck, Compass, ChevronRight,
  Star, Zap, Shield,
} from 'lucide-react';
import { JAIPUR_LOCALITIES } from '../utils/formatters';
import { CONTACT_NUMBERS, OFFICE_HOURS, OFFICE_ADDRESS, LISTING_COMMISSION } from '../utils/contact';
import { usePageMeta } from '../utils/usePageMeta';
import FeaturedShowcase from '../components/home/FeaturedShowcase';
import PropertyCalculator from '../components/tools/PropertyCalculator';
import HomeFAQ from '../components/home/HomeFAQ';

/* ── Service Cards Data ── */
const SERVICES = [
  {
    icon: HomeIcon,
    accentColor: 'terracotta',
    eyebrow: 'Residential & Commercial',
    title: 'Buy & Sell',
    description:
      'Verified apartments, builder floors, duplex villas, and commercial plots across Jaipur — with transparent estimated market pricing and direct owner introductions.',
    features: [
      'Transparent estimated market prices (Est. ₹)',
      'Carpet area & super built-up clearly listed',
      'Direct WhatsApp inquiry with local coordinators',
    ],
    primaryCta: { label: 'Browse Buy & Sell Catalog', to: '/buy' },
    secondaryCta: { label: 'Post a Property', to: '/buy/submit' },
  },
  {
    icon: Building,
    accentColor: 'sage',
    eyebrow: 'Offices, Retail & Land',
    title: 'Rent & Lease',
    description:
      'Commercial offices, pre-leased bank branches, retail showrooms, and industrial warehouses in prime Jaipur hubs — Tonk Road, Sitapura, and Malviya Nagar.',
    features: [
      'Commercial lease estimates with clear details',
      'Pre-leased spaces with verified rental history',
      'Direct lease deed negotiation with owners',
    ],
    primaryCta: { label: 'View Rent & Lease Catalog', to: '/invest' },
    secondaryCta: null,
  },
  {
    icon: BedDouble,
    accentColor: 'rose',
    eyebrow: 'Vacation Homes & Hosting',
    title: 'Airbnb Management',
    description:
      'Buy high-occupancy turnkey villas, courtyard havelis, and studio flats ready to launch on Airbnb. Full management support for Airbnb hosting is also available.',
    features: [
      'Properties ready for immediate Airbnb onboarding',
      'Complete host management — check-in, cleaning, calendar',
      'Prime tourist locations with seasonal demand',
    ],
    primaryCta: { label: 'Explore Airbnb Properties', to: '/stay' },
    secondaryCta: { label: 'List Your Place for Hosting', to: '/stay/host/submit' },
  },
];

/* ── Process Steps ── */
const STEPS = [
  {
    num: '01',
    icon: Compass,
    title: 'Discover & Shortlist',
    desc: "Explore estimated market prices across Buy & Sell, Rent & Lease, or turnkey Airbnb properties in Jaipur's top neighbourhoods.",
    tag: '✓ Estimated Pricing (Est. ₹)',
  },
  {
    num: '02',
    icon: MessageSquare,
    title: '1-Click Direct Inquiry',
    desc: 'Click "Inquire Now" on any property to connect directly on WhatsApp or phone. No bots, no waiting rooms, no forms.',
    tag: '✓ Open All 7 Days (9 AM – 6 PM)',
  },
  {
    num: '03',
    icon: CalendarCheck,
    title: 'Visit & Close Smoothly',
    desc: 'Schedule an accompanied site visit, review details directly with the owner, and close at a transparent listing commission.',
    tag: '✓ Standard Listing Commission on Success',
  },
];

export default function Home() {
  usePageMeta({
    title: 'Jaipur Estates | Buy & Sell · Rent & Lease · Airbnb Management',
    description:
      'Jaipur property showcase for Buy & Sell, commercial Rent & Lease, and turnkey Airbnb vacation homes. Transparent listing commission. Open 7 days.',
  });

  const navigate = useNavigate();
  const [activeTab,     setActiveTab]     = useState('buy');
  const [locality,      setLocality]      = useState('');
  const [propertyType,  setPropertyType]  = useState('');
  const [stayType,      setStayType]      = useState('');

  const primaryPhone = CONTACT_NUMBERS[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (locality) q.append('locality', locality);
    if (activeTab === 'buy') {
      if (propertyType) q.append('propertyType', propertyType);
      navigate(`/buy?${q}`);
    } else if (activeTab === 'stay') {
      if (stayType) q.append('stayType', stayType);
      navigate(`/stay?${q}`);
    } else {
      navigate(`/invest?${q}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800" id="home">

      {/* ══════════════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#161513] overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36">
        {/* Decorative background grid */}
        <div className="absolute inset-0 bg-hero-pattern opacity-100 pointer-events-none" />
        {/* Warm glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
                        bg-terracotta-900/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 right-10 w-[500px] h-[500px] rounded-full
                        bg-stone-900/80 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em]
                             text-terracotta-300 bg-terracotta-950/60 border border-terracotta-800/60
                             px-3 py-1 rounded-full">
              <MapPin size={11} /> Jaipur, Rajasthan
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400
                             bg-emerald-950/50 border border-emerald-900/60 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open 7 Days · 9 AM–6 PM
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-normal tracking-tight
                          text-white leading-[1.08] max-w-5xl">
            Buy, Sell, Rent &amp; Manage Airbnb
            <br className="hidden sm:block" />
            <span className="text-terracotta-400"> in Jaipur.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone-400 font-normal leading-relaxed max-w-2xl">
            A clean, read-only property directory for Jaipur — estimated market prices,
            direct owner introductions, and turnkey Airbnb management support.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link to="/buy"
                  className="inline-flex items-center gap-2 bg-terracotta-700 hover:bg-terracotta-800
                             text-white font-bold text-sm px-7 py-3.5 rounded-2xl
                             transition-all duration-200 shadow-lg hover:shadow-glow-terracotta">
              Browse Properties <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%27d%20like%20to%20inquire`}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20
                          text-white font-bold text-sm px-7 py-3.5 rounded-2xl border border-white/20
                          transition-all duration-200 backdrop-blur-sm">
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 text-xs text-stone-500">
            <span className="flex items-center gap-1.5 text-stone-400">
              <Sparkles size={13} className="text-gold-400" />
              Standard Listing Commission
            </span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span>All Prices Displayed as Market Estimates (Est.)</span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span>Open All 7 Days for Direct Calling &amp; WhatsApp</span>
          </div>
        </div>

        {/* ── Search Box (floats at bottom of hero) ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-elevated border border-stone-200">
            {/* Search Tabs */}
            <div className="flex gap-1 p-1 bg-stone-100 rounded-2xl w-fit mb-6">
              {[
                { id: 'buy',    label: 'Buy & Sell',     Icon: HomeIcon },
                { id: 'invest', label: 'Rent & Lease',   Icon: Building },
                { id: 'stay',   label: 'Airbnb & Stays', Icon: BedDouble },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                               whitespace-nowrap transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-[#161513] text-white shadow-sm'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Icon size={15} />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Search Inputs */}
            <form onSubmit={handleSearch}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5">
                <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                  Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Jaipur Localities</option>
                  {JAIPUR_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {activeTab === 'buy' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Residential Types</option>
                    <option value="Apartment/Flat">Apartment / Flat</option>
                    <option value="Independent House/Villa">Independent House / Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Commercial Office/Shop">Commercial Office / Shop</option>
                  </select>
                </div>
              )}

              {activeTab === 'stay' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    Airbnb Type
                  </label>
                  <select
                    value={stayType}
                    onChange={(e) => setStayType(e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Airbnb Stays</option>
                    <option value="Airbnb Haveli">Turnkey Airbnb Haveli</option>
                    <option value="Airbnb Homestay">Boutique Airbnb Homestay</option>
                    <option value="Airbnb Luxury Villa">Luxury Airbnb Villa</option>
                    <option value="Airbnb Studio Apartment">Airbnb Studio Apartment</option>
                  </select>
                </div>
              )}

              {activeTab === 'invest' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase tracking-wider">
                    Category
                  </label>
                  <div className="input-field bg-stone-50 text-stone-600 cursor-default">
                    Commercial Offices, Retail &amp; Land Leases
                  </div>
                </div>
              )}

              <div className="sm:col-span-3">
                <button type="submit"
                        className="btn-terracotta w-full !py-3 text-base">
                  <Search size={16} /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED SHOWCASE (floats above, elevated)
      ══════════════════════════════════════════════════════ */}
      <FeaturedShowcase />

      {/* ══════════════════════════════════════════════════════
          THREE SERVICES GRID
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="section-label mb-3">Three Clear Services</span>
            <h2 className="section-title">
              Built for buyers, sellers,<br className="hidden sm:block" />
              tenants &amp; Airbnb hosts.
            </h2>
            <p className="section-subtitle">
              Transparent market estimates, direct owner introductions, and
              turnkey Airbnb setup — zero guesswork.
            </p>
          </div>
          <Link to="/buy"
                className="inline-flex items-center gap-2 text-sm font-bold text-terracotta-700
                           hover:text-terracotta-800 self-start md:self-auto transition-colors shrink-0">
            View All Listings <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {SERVICES.map(({ icon: Icon, eyebrow, title, description, features, primaryCta, secondaryCta, accentColor }) => (
            <div key={title}
                 className="group card flex flex-col hover:-translate-y-1 duration-300">
              {/* Card Header */}
              <div className="p-7 flex-1 flex flex-col">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5
                                 ${accentColor === 'terracotta'
                                   ? 'bg-terracotta-50 text-terracotta-700 border border-terracotta-100'
                                   : accentColor === 'sage'
                                     ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                     : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                  <Icon size={22} />
                </div>

                <span className={`text-xs font-bold uppercase tracking-[0.12em] mb-2
                                  ${accentColor === 'terracotta' ? 'text-terracotta-600'
                                    : accentColor === 'sage'      ? 'text-emerald-600'
                                    : 'text-rose-600'}`}>
                  {eyebrow}
                </span>
                <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-terracotta-700
                               transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">{description}</p>

                {/* Features */}
                <ul className="space-y-2.5 border-t border-stone-100 pt-5 mb-7">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-stone-600">
                      <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Buttons */}
              <div className="p-7 pt-0 space-y-2.5">
                <Link to={primaryCta.to}
                      className="btn-terracotta w-full justify-center text-sm">
                  {primaryCta.label} <ArrowRight size={15} />
                </Link>
                {secondaryCta ? (
                  <Link to={secondaryCta.to}
                        className="btn-primary w-full justify-center text-sm">
                    {secondaryCta.label}
                  </Link>
                ) : (
                  <a href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%20am%20looking%20for%20a%20${encodeURIComponent(title)}%20property`}
                     target="_blank" rel="noopener noreferrer"
                     className="btn-secondary w-full justify-center text-sm">
                    <MessageSquare size={14} /> Inquire on WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROPERTY CALCULATOR
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <PropertyCalculator />
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — DARK HIGHLIGHTED SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#161513] py-28 border-y border-stone-800 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]
                        bg-terracotta-900/20 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]
                               text-terracotta-400 bg-terracotta-950/60 border border-terracotta-900/60
                               px-3 py-1.5 rounded-full mb-4">
                <Zap size={11} /> Straightforward Process
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-white font-normal leading-tight">
                How Our Direct<br className="hidden sm:block" />
                Advisory Works
              </h2>
              <p className="text-stone-400 text-base mt-3 max-w-xl leading-relaxed">
                Simple, transparent, and direct. No hidden steps, no upfront listing fees,
                and a standard listing commission on successful closing only.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800
                            px-5 py-2.5 rounded-2xl text-sm font-semibold text-terracotta-300 self-start md:self-auto">
              <Sparkles size={15} className="text-terracotta-400" />
              Standard Listing Commission
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map(({ num, icon: Icon, title, desc, tag }, i) => (
              <div key={num}
                   className="relative p-8 rounded-3xl bg-stone-900/70 border border-stone-800
                              hover:border-terracotta-700/60 hover:bg-stone-900/90
                              transition-all duration-300 group shine-hover">
                {/* Step number (massive) */}
                <span className="absolute -top-4 -left-1 text-[72px] font-serif font-bold
                                 text-stone-800/80 leading-none select-none group-hover:text-stone-700/80
                                 transition-colors duration-300">
                  {num}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700
                                  flex items-center justify-center mb-6
                                  group-hover:bg-terracotta-900/60 group-hover:border-terracotta-800
                                  transition-all duration-300">
                    <Icon size={22} className="text-stone-300 group-hover:text-terracotta-300
                                               transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-serif text-white font-medium mb-3">{title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed mb-6">{desc}</p>

                  <div className="text-xs font-bold text-stone-500 pt-4 border-t border-stone-800
                                  flex items-center gap-1.5 font-mono">
                    <span className="text-terracotta-500">✓</span>
                    <span>{tag.replace('✓ ', '')}</span>
                  </div>
                </div>

                {/* Connector arrow (hidden on last) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-stone-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OWNER / HOST CALLOUT BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="relative bg-[#1C1A18] rounded-3xl p-10 sm:p-14 border border-stone-800
                        overflow-hidden shadow-elevated">
          {/* Decorative bg */}
          <div className="absolute inset-0 bg-hero-pattern opacity-50 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full
                          bg-terracotta-900/20 blur-[80px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]
                               text-terracotta-400 bg-terracotta-950/70 border border-terracotta-900/60
                               px-3 py-1.5 rounded-full mb-4">
                Property Owners &amp; Sellers
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal leading-tight mb-4">
                Want to sell, lease, or list<br className="hidden sm:block" />
                a property on Airbnb in Jaipur?
              </h2>
              <p className="text-stone-400 text-base leading-relaxed max-w-2xl">
                Submit your property details to our catalog. We connect you directly with genuine buyers,
                corporate tenants, and homestay travelers across Jaipur.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link to="/buy/submit"
                    className="btn-terracotta text-center justify-center text-sm !py-3.5">
                Post Property for Sale <ArrowRight size={15} />
              </Link>
              <Link to="/stay/host/submit"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold
                               text-stone-200 bg-stone-800 border border-stone-700
                               hover:border-stone-600 hover:bg-stone-700
                               px-6 py-3.5 rounded-xl transition-all duration-200 text-center">
                List for Airbnb Management
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DIRECT CONTACT SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-soft overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between
                          gap-4 px-8 sm:px-10 py-8 border-b border-stone-100">
            <div>
              <span className="section-label mb-2">Direct Communication</span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900">
                Speak directly with our Jaipur coordinators
              </h2>
              <p className="text-stone-500 text-sm mt-1 max-w-xl">
                Direct phone &amp; WhatsApp for Buy &amp; Sell, Rent &amp; Lease, and Airbnb inquiries.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700
                            bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {OFFICE_HOURS}
            </div>
          </div>

          {/* Phone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-100">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div key={number} className="p-8 flex flex-col justify-between group hover:bg-stone-50/80 transition-colors">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terracotta-600 block mb-3">
                    Direct Line {index + 1}
                  </span>
                  <a href={tel}
                     className="font-mono text-2xl font-bold text-stone-900 hover:text-terracotta-700
                                transition-colors block mb-5">
                    {number}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <a href={tel}
                     className="flex-1 inline-flex items-center justify-center gap-1.5
                                py-2.5 px-4 rounded-xl bg-stone-900 text-white hover:bg-stone-800
                                text-xs font-bold transition-all">
                    <Phone size={13} /> Call Now
                  </a>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center justify-center gap-1.5
                                py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800
                                hover:bg-emerald-100 border border-emerald-200
                                text-xs font-bold transition-all">
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <HomeFAQ />

      {/* ══════════════════════════════════════════════════════
          ADVISORY NOTICE (TINY FOOTER DISCLAIMER)
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-stone-200 bg-white/70 rounded-2xl px-6 py-5 text-xs
                        text-stone-500 leading-relaxed backdrop-blur-sm">
          <strong className="text-stone-700 block mb-1 font-semibold">
            Information &amp; Advisory Notice
          </strong>
          JaipurEstates is an inquiry-driven, read-only property showcase for Jaipur, Rajasthan.
          All property specifications, rental figures, and prices displayed are estimated benchmarks
          ("Est.") for reference only. Final pricing, agreement terms, and transaction conditions
          are mutually agreed upon directly between buyers, sellers, tenants, and owners during
          on-site inspections. A standard listing and brokerage commission applies upon
          successful closing.
        </div>
      </section>
    </div>
  );
}
