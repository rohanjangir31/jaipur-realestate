import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin, ArrowRight, Search, Check, Building, Home as HomeIcon, BedDouble,
  Phone, MessageSquare, Clock, Sparkles, CalendarCheck, Compass, ChevronRight,
  Star, Zap, Shield, TrendingUp,
} from 'lucide-react';
import { JAIPUR_LOCALITIES } from '../utils/formatters';
import { CONTACT_NUMBERS, OFFICE_HOURS, OFFICE_ADDRESS } from '../utils/contact';
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
      'Verified apartments, builder floors, duplex villas, and commercial plots across Jaipur with transparent estimated market pricing and direct owner introductions.',
    features: [
      'Transparent estimated market prices (Est. ₹)',
      'Carpet area & super built-up clearly listed',
      'Direct WhatsApp inquiry with local coordinators',
    ],
    primaryCta: { label: 'Browse Buy & Sell Catalog', to: '/buy' },
    secondaryCta: { label: 'Post a Property', to: '/buy/submit' },
    iconBg: 'bg-terracotta-700',
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
    iconBg: 'bg-sage-700',
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
    iconBg: 'bg-rose-700',
  },
];

/* ── Process Steps ── */
const STEPS = [
  {
    num: '01',
    icon: Compass,
    title: 'Discover & Shortlist',
    desc: "Explore estimated market prices across Buy & Sell, Rent & Lease, or turnkey Airbnb properties in Jaipur's top neighbourhoods.",
    tag: 'Estimated Pricing (Est. ₹)',
  },
  {
    num: '02',
    icon: MessageSquare,
    title: '1-Click Direct Inquiry',
    desc: 'Click "Inquire Now" on any property to connect directly on WhatsApp or phone. No bots, no waiting rooms, no forms.',
    tag: 'Open All 7 Days (9 AM – 6 PM)',
  },
  {
    num: '03',
    icon: CalendarCheck,
    title: 'Visit & Close Smoothly',
    desc: 'Schedule an accompanied site visit, review details directly with the owner, and close with complete transparency.',
    tag: 'Direct Owner Introduction',
  },
];

/* ── Stats ── */
const STATS = [
  { value: '17+', label: 'Curated Listings' },
  { value: '3',   label: 'Direct Lines' },
  { value: '7',   label: 'Days Open' },
  { value: '0',   label: 'Hidden Fees' },
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
          HERO — Full editorial luxury dark section
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#161513] overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-hero-pattern opacity-100 pointer-events-none" />
        {/* Warm terracotta glow */}
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full
                        bg-terracotta-900/20 blur-[140px] pointer-events-none" />
        {/* Subtle gold glow top-right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full
                        bg-gold-500/5 blur-[100px] pointer-events-none" />

        {/* ── Hero Content ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 md:pt-32 md:pb-16">

          {/* Eyebrow badges */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em]
                             text-terracotta-300 bg-terracotta-950/70 border border-terracotta-800/60
                             px-3 py-1.5 rounded-full">
              <MapPin size={11} /> Jaipur, Rajasthan
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400
                             bg-emerald-950/50 border border-emerald-900/60 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open 7 Days · 9 AM – 6 PM
            </span>
          </div>

          {/* Main headline — editorial */}
          <div className="max-w-5xl mb-8">
            <h1 className="font-serif font-normal tracking-tight text-white leading-[1.05]
                           text-5xl sm:text-6xl lg:text-[5.5rem]">
              Jaipur's Premier
              <br />
              <span className="text-terracotta-400 italic">Property</span>
              {' '}Advisory.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-stone-400 font-normal leading-relaxed max-w-2xl">
              Buy, Sell, Rent &amp; manage Airbnb — a curated, read-only directory with
              estimated market prices and direct owner connections.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <Link to="/buy"
                  className="inline-flex items-center gap-2 bg-terracotta-700 hover:bg-terracotta-600
                             text-white font-bold text-sm px-8 py-4 rounded-2xl
                             transition-all duration-300 shadow-glow-terracotta hover:scale-105">
              Browse Properties <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%27d%20like%20to%20inquire`}
               target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14
                          text-white font-bold text-sm px-8 py-4 rounded-2xl border border-white/15
                          transition-all duration-300 backdrop-blur-sm">
              <MessageSquare size={16} /> WhatsApp Us
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-3 mb-16">
            {STATS.map(({ value, label }) => (
              <div key={label} className="stat-chip">
                <span className="font-serif font-bold text-white text-xl leading-none">{value}</span>
                <span className="text-stone-400 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Search Bar — transitions seamlessly into page ── */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-t-3xl p-6 sm:p-8 shadow-deep border-x border-t border-stone-200">
            {/* Tabs */}
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
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

            {/* Search fields */}
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
          FEATURED SHOWCASE
      ══════════════════════════════════════════════════════ */}
      <FeaturedShowcase />

      {/* ══════════════════════════════════════════════════════
          THREE SERVICES — Luxury card grid
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map(({ icon: Icon, eyebrow, title, description, features, primaryCta, secondaryCta, accentColor, iconBg }) => (
            <div key={title}
                 className="group relative bg-white rounded-3xl border border-stone-200 overflow-hidden
                            shadow-card hover:shadow-card-hover hover:-translate-y-2
                            transition-all duration-500 flex flex-col">
              {/* Colored top accent stripe */}
              <div className={`h-1 w-full ${
                accentColor === 'terracotta' ? 'bg-gradient-to-r from-terracotta-700 to-terracotta-500'
                : accentColor === 'sage' ? 'bg-gradient-to-r from-sage-700 to-emerald-500'
                : 'bg-gradient-to-r from-rose-700 to-rose-500'
              }`} />

              <div className="p-8 flex-1 flex flex-col">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6
                                 ${iconBg} text-white shadow-md`}>
                  <Icon size={22} />
                </div>

                <span className={`text-xs font-bold uppercase tracking-[0.12em] mb-2 ${
                  accentColor === 'terracotta' ? 'text-terracotta-600'
                  : accentColor === 'sage' ? 'text-sage-500'
                  : 'text-rose-600'
                }`}>
                  {eyebrow}
                </span>
                <h3 className="font-serif text-2xl text-stone-900 mb-3 group-hover:text-terracotta-700
                               transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-6">{description}</p>

                <ul className="space-y-2.5 border-t border-stone-100 pt-5 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs text-stone-600">
                      <span className="w-4 h-4 rounded-full bg-terracotta-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={9} className="text-white" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 space-y-2.5">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <PropertyCalculator />
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — Editorial dark section
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#161513] py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-100 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px]
                        bg-terracotta-900/15 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-24">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]
                             text-terracotta-400 bg-terracotta-950/60 border border-terracotta-900/60
                             px-3 py-1.5 rounded-full mb-6">
              <Zap size={11} /> Straightforward Process
            </span>
            <h2 className="text-5xl sm:text-6xl font-serif text-white font-normal leading-tight">
              How Our Direct<br />
              <span className="text-terracotta-400">Advisory Works</span>
            </h2>
            <p className="text-stone-400 text-lg mt-5 leading-relaxed">
              Simple, transparent, and direct. No hidden steps, no upfront listing fees.
            </p>
          </div>

          {/* Steps — gridded editorial panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone-800/40 rounded-3xl overflow-hidden border border-stone-800">
            {STEPS.map(({ num, icon: Icon, title, desc, tag }) => (
              <div key={num}
                   className="relative p-10 sm:p-12 bg-[#161513] hover:bg-[#1C1A18]
                              transition-colors duration-300 group">
                {/* Giant editorial background number */}
                <div className="absolute top-6 right-6 font-serif font-bold text-[7rem] leading-none
                                text-stone-800/60 select-none group-hover:text-stone-700/60
                                transition-colors duration-500">
                  {num}
                </div>

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-700
                                  flex items-center justify-center mb-8
                                  group-hover:bg-terracotta-900/50 group-hover:border-terracotta-800
                                  transition-all duration-300">
                    <Icon size={24} className="text-stone-300 group-hover:text-terracotta-300
                                              transition-colors duration-300" />
                  </div>

                  <h3 className="text-2xl font-serif text-white font-normal mb-3">{title}</h3>
                  <p className="text-sm text-stone-400 leading-relaxed mb-8">{desc}</p>

                  <div className="inline-flex items-center gap-2 text-xs font-bold
                                  text-stone-500 border-t border-stone-800 pt-5 w-full">
                    <span className="text-terracotta-500 text-base">✓</span>
                    <span>{tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          OWNER / HOST CALLOUT — Dark split banner
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="relative bg-[#1C1A18] rounded-3xl overflow-hidden shadow-deep border border-stone-800">
          <div className="absolute inset-0 bg-hero-pattern opacity-60 pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full
                          bg-terracotta-900/15 blur-[100px] pointer-events-none" />
          {/* Left accent stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-terracotta-700 via-terracotta-500 to-transparent" />

          <div className="relative p-12 sm:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]
                               text-terracotta-400 bg-terracotta-950/70 border border-terracotta-900/60
                               px-3 py-1.5 rounded-full mb-6">
                Property Owners &amp; Sellers
              </span>
              <h2 className="text-4xl sm:text-5xl font-serif text-white font-normal leading-tight mb-5">
                Want to sell, lease, or list<br className="hidden sm:block" />
                a property on Airbnb?
              </h2>
              <p className="text-stone-400 text-base leading-relaxed">
                Submit your property details to our catalog. We connect you directly with genuine buyers,
                corporate tenants, and homestay travellers across Jaipur.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3">
              <Link to="/buy/submit"
                    className="btn-terracotta text-center justify-center !py-4 text-sm">
                Post Property for Sale <ArrowRight size={15} />
              </Link>
              <Link to="/stay/host/submit"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold
                               text-stone-200 bg-stone-800 border border-stone-700
                               hover:border-stone-600 hover:bg-stone-700
                               px-6 py-4 rounded-xl transition-all duration-200">
                List for Airbnb Management
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DIRECT CONTACT — Premium cards with top gradient
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="text-center mb-14">
          <span className="section-label mb-3 block text-center">Direct Communication</span>
          <h2 className="section-title mx-auto">
            Speak directly with our<br />Jaipur coordinators
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Direct phone &amp; WhatsApp for Buy &amp; Sell, Rent &amp; Lease, and Airbnb inquiries.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700
                          bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full mt-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {OFFICE_HOURS}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
            <div key={number}
                 className="relative bg-white rounded-3xl border border-stone-200 p-8
                            shadow-card hover:shadow-card-hover hover:-translate-y-1.5
                            transition-all duration-500 group overflow-hidden">
              {/* Terracotta top stripe */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r
                              from-terracotta-600 to-terracotta-400" />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-terracotta-600 block mb-4">
                Direct Line {index + 1}
              </span>
              <a href={tel}
                 className="font-mono text-2xl font-bold text-stone-900 hover:text-terracotta-700
                            transition-colors block mb-6">
                {number}
              </a>

              <div className="flex items-center gap-3">
                <a href={tel}
                   className="flex-1 inline-flex items-center justify-center gap-1.5
                              py-3 px-4 rounded-xl bg-stone-900 text-white hover:bg-stone-800
                              text-xs font-bold transition-all">
                  <Phone size={13} /> Call Now
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                   className="flex-1 inline-flex items-center justify-center gap-1.5
                              py-3 px-4 rounded-xl bg-emerald-50 text-emerald-800
                              hover:bg-emerald-100 border border-emerald-200
                              text-xs font-bold transition-all">
                  <MessageSquare size={13} /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <HomeFAQ />

      {/* Advisory Notice */}
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
          on-site inspections.
        </div>
      </section>
    </div>
  );
}
