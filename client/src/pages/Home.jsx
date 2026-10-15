import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  Search,
  Check,
  Building,
  Home as HomeIcon,
  TrendingUp,
  BedDouble,
  Phone,
  MessageSquare,
  Clock,
  Sparkles,
  Percent,
  CalendarCheck,
  Compass,
} from 'lucide-react';
import { JAIPUR_LOCALITIES } from '../utils/formatters';
import { CONTACT_NUMBERS, OFFICE_HOURS, OFFICE_ADDRESS, LISTING_COMMISSION } from '../utils/contact';
import { usePageMeta } from '../utils/usePageMeta';
import FeaturedShowcase from '../components/home/FeaturedShowcase';
import PropertyCalculator from '../components/tools/PropertyCalculator';
import HomeFAQ from '../components/home/HomeFAQ';

export default function Home() {
  usePageMeta({
    title: 'Jaipur Estates | Buy & Sell · Rent & Lease · Airbnb Management',
    description:
      'Jaipur property showcase for Buy & Sell, commercial Rent & Lease, and turnkey Airbnb vacation homes. Transparent 1% listing commission.',
  });

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [stayType, setStayType] = useState('');

  const primaryPhone = CONTACT_NUMBERS[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (activeTab === 'buy') {
      const q = new URLSearchParams();
      if (locality) q.append('locality', locality);
      if (propertyType) q.append('propertyType', propertyType);
      navigate(`/buy?${q.toString()}`);
    } else if (activeTab === 'stay') {
      const q = new URLSearchParams();
      if (locality) q.append('locality', locality);
      if (stayType) q.append('stayType', stayType);
      navigate(`/stay?${q.toString()}`);
    } else {
      const q = new URLSearchParams();
      if (locality) q.append('locality', locality);
      navigate(`/invest?${q.toString()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800" id="home">
      {/* ── 1. Hero Section: Confident, Transparent, Clear ── */}
      <section className="bg-[#161513] text-stone-100 border-b border-stone-800 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400">
                Jaipur, Rajasthan
              </span>
              <span className="text-stone-600">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-terracotta-950/80 border border-terracotta-800/70 text-terracotta-300">
                <Percent size={11} /> Standard 1% Listing Commission
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.12]">
              Buy &amp; Sell, Rent &amp; Lease, and Airbnb in Jaipur.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              A clean, read-only property directory for Jaipur. Explore estimated market prices, connect directly with property owners, or purchase turnkey Airbnb-ready properties with full management support.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-10 max-w-4xl bg-white text-stone-900 rounded-2xl p-4 sm:p-6 shadow-elevated border border-stone-200">
            {/* Tabs */}
            <div className="flex border-b border-stone-200 pb-3 gap-6 text-sm font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`pb-2 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'buy'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <HomeIcon size={15} />
                <span>Buy &amp; Sell</span>
                {activeTab === 'buy' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-700 -mb-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('invest')}
                className={`pb-2 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'invest'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Building size={15} />
                <span>Rent &amp; Lease</span>
                {activeTab === 'invest' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-700 -mb-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stay')}
                className={`pb-2 transition-colors relative flex items-center gap-1.5 ${
                  activeTab === 'stay'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <BedDouble size={15} />
                <span>Airbnb &amp; Stays</span>
                {activeTab === 'stay' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-700 -mb-3" />
                )}
              </button>
            </div>

            {/* Inputs */}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-4 items-end">
              <div className="sm:col-span-5">
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Locality
                </label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="input-field text-xs sm:text-sm"
                >
                  <option value="">All Jaipur Localities</option>
                  {JAIPUR_LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {activeTab === 'buy' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="input-field text-xs sm:text-sm"
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
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Airbnb Property Type
                  </label>
                  <select
                    value={stayType}
                    onChange={(e) => setStayType(e.target.value)}
                    className="input-field text-xs sm:text-sm"
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
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Rent / Lease Category
                  </label>
                  <div className="text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 font-medium">
                    Commercial Offices, Retail &amp; Land Leases
                  </div>
                </div>
              )}

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="btn-terracotta w-full justify-center !py-2.5"
                >
                  <Search size={15} />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>

          {/* Clean trust statement */}
          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-400">
            <span className="flex items-center gap-1.5 text-stone-300 font-medium">
              <Sparkles size={14} className="text-terracotta-400" />
              1% Standard Listing Commission
            </span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span>All Prices Displayed as Market Estimates (Est.)</span>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span>Open All 7 Days for Direct Calling &amp; WhatsApp</span>
          </div>
        </div>
      </section>

      {/* ── 2. Curated Featured Opportunities (Immediate Real Inventory) ── */}
      <FeaturedShowcase />

      {/* ── 3. The Three Modules (Editorial Grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="section-label">Three Clear Services</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
              1% Flat Commission
            </span>
          </div>
          <h2 className="section-title">Built for buyers, sellers, tenants, and Airbnb hosts.</h2>
          <p className="section-subtitle">
            Transparent market estimates, direct owner introductions, and turnkey Airbnb setup with zero guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vertical 1: Buy & Sell */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider">
                  Residential &amp; Commercial
                </span>
                <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  1% Commission
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Buy &amp; Sell</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Verified apartments, builder floors, duplex villas, and commercial plots across Jaipur. We showcase estimated market pricing and connect genuine buyers and sellers directly.
              </p>

              <ul className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Transparent estimated market prices (Est. ₹)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Carpet area and super built-up clearly differentiated</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Direct WhatsApp inquiry with our local Jaipur coordinators</span>
                </li>
              </ul>
            </div>

            {/* Same highlight button for both actions as requested */}
            <div className="space-y-2.5 pt-2">
              <Link to="/buy" className="btn-terracotta w-full justify-center text-xs font-medium !py-2.5">
                Browse Buy &amp; Sell Catalog <ArrowRight size={14} />
              </Link>
              <Link
                to="/buy/submit"
                className="btn-terracotta w-full justify-center text-xs font-medium !py-2.5 !bg-stone-900 hover:!bg-stone-800"
              >
                Post a Property for Sale
              </Link>
            </div>
          </div>

          {/* Vertical 2: Rent & Lease */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider">
                  Offices, Retail &amp; Land
                </span>
                <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  1% Commission
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Rent &amp; Lease</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Commercial office plates, pre-leased bank branches, retail showrooms, and industrial warehouses in prime Jaipur hubs like Tonk Road, Sitapura, and Malviya Nagar.
              </p>

              <ul className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Commercial lease estimates with escalation clauses</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Pre-leased spaces with verified historical rental yields</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Direct lease deed negotiation with property owners</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link to="/invest" className="btn-terracotta w-full justify-center text-xs font-medium !py-2.5">
                View Rent &amp; Lease Catalog <ArrowRight size={14} />
              </Link>
              <a
                href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%20am%20looking%20for%20commercial%20space%20to%20rent%20or%20lease`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center text-xs !py-2.5 flex items-center gap-1.5"
              >
                <MessageSquare size={13} />
                <span>Inquire About Commercial Lease</span>
              </a>
            </div>
          </div>

          {/* Vertical 3: Airbnb Management & Stays */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider">
                  Vacation Homes &amp; Hosting
                </span>
                <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                  1% Commission
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Airbnb Management</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Buy high-occupancy turnkey villas, courtyard havelis, and studio flats ready to launch on Airbnb. We also provide full homestay management and guest hosting support.
              </p>

              <ul className="space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Turnkey properties ready for immediate Airbnb onboarding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Complete host management (check-in, cleaning, calendar)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-terracotta-600 shrink-0" />
                  <span>Prime tourist locations with verified high seasonal demand</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link to="/stay" className="btn-terracotta w-full justify-center text-xs font-medium !py-2.5">
                Explore Airbnb Properties <ArrowRight size={14} />
              </Link>
              <Link
                to="/stay/host/submit"
                className="btn-secondary w-full justify-center text-xs !py-2.5"
              >
                List Your Place for Airbnb Hosting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Interactive Rajasthan Stamp Duty & Yield Calculator ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <PropertyCalculator />
      </section>

      {/* ── 5. How the Process Works (Redesigned, Attractive, Highlighted) ── */}
      <section className="bg-[#161513] text-stone-100 py-20 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400 block mb-2 font-mono">
                ✦ Clear 3-Step Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal">
                How Our Direct Advisory Works
              </h2>
              <p className="text-stone-400 text-sm mt-2 max-w-xl">
                Simple, transparent, and direct. No hidden steps, zero upfront listing fees, and standard 1% commission on closing.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-stone-900 border border-stone-800 px-4 py-2 rounded-xl text-xs font-mono text-terracotta-300">
              <Sparkles size={14} className="text-terracotta-400" />
              <span>Standard 1% Brokerage / Listing Commission</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-terracotta-600/60 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-serif font-bold text-terracotta-400">01</span>
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 group-hover:text-white transition-colors">
                  <Compass size={20} />
                </div>
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-3">
                Discover &amp; Shortlist
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4">
                Explore estimated market prices across Buy &amp; Sell, Rent &amp; Lease, or turnkey Airbnb properties in Jaipur’s top neighborhoods.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-3 border-t border-stone-800">
                ✓ Estimated Pricing (Est. ₹)
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-terracotta-600/60 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-serif font-bold text-terracotta-400">02</span>
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 group-hover:text-white transition-colors">
                  <MessageSquare size={20} />
                </div>
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-3">
                1-Click Direct Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4">
                Click "Inquire Now" on any property to connect directly with our local Jaipur coordinators on WhatsApp or phone. No bots, no wait time.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-3 border-t border-stone-800">
                ✓ Open All 7 Days (9 AM – 6 PM)
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-terracotta-600/60 transition-all group">
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-serif font-bold text-terracotta-400">03</span>
                <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-stone-300 group-hover:text-white transition-colors">
                  <CalendarCheck size={20} />
                </div>
              </div>
              <h3 className="text-xl font-serif text-white font-medium mb-3">
                Visit &amp; Transparent Closing
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4">
                Schedule an accompanied site visit, review property details directly with the owner, and close smoothly at our standard 1% commission.
              </p>
              <div className="text-[11px] font-mono text-stone-500 pt-3 border-t border-stone-800">
                ✓ 1% Standard Commission on Success
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Owner & Host Submission Callout ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-[#1C1A18] text-stone-200 rounded-2xl p-8 sm:p-12 border border-stone-800 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400">
                  Property Owners &amp; Sellers
                </span>
                <span className="text-[10px] font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                  1% Listing Fee
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                Want to sell, lease, or list a property on Airbnb in Jaipur?
              </h2>
              <p className="text-stone-400 text-sm mt-3 max-w-2xl leading-relaxed">
                Submit your property details to our catalog. We connect you directly with genuine buyers, corporate tenants, and homestay travelers across Jaipur.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/buy/submit"
                className="btn-terracotta text-center justify-center !py-2.5 text-xs font-medium"
              >
                Post Property for Sale
              </Link>
              <Link
                to="/stay/host/submit"
                className="btn-secondary !bg-stone-800 !text-stone-200 !border-stone-700 hover:!bg-stone-700 text-center justify-center !py-2.5 text-xs font-medium"
              >
                List for Airbnb Management
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Direct Calling Desks (Open All 7 Days, Numbers Only) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border border-stone-200 bg-white rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
                  Direct Communication
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Open All 7 Days
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
                Speak directly with our Jaipur coordinators
              </h2>
              <p className="text-stone-500 text-sm mt-1 max-w-xl">
                Direct phone lines and WhatsApp access for Buy &amp; Sell, commercial Rent &amp; Lease, and Airbnb inquiries.
              </p>
            </div>
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <Clock size={14} className="text-terracotta-600" />
              <span>{OFFICE_HOURS}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200 flex flex-col justify-between hover:border-stone-400 transition-colors"
              >
                <div>
                  <span className="text-[11px] font-mono font-medium text-terracotta-700 uppercase tracking-wider block mb-2">
                    Direct Line {index + 1}
                  </span>
                  <a
                    href={tel}
                    className="font-mono text-xl font-bold text-stone-900 hover:text-terracotta-700 transition-colors block mb-4"
                  >
                    {number}
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-stone-200/80">
                  <a
                    href={tel}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-medium transition-colors"
                  >
                    <Phone size={13} />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-medium transition-colors"
                    title="Message on WhatsApp"
                  >
                    <MessageSquare size={13} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Better FAQ ── */}
      <HomeFAQ />

      {/* ── 9. Simple Read-Only Directory Notice ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-stone-200 bg-white rounded-xl p-5 text-xs text-stone-600 leading-relaxed">
          <strong className="text-stone-900 block font-semibold mb-1">
            Information &amp; Advisory Notice
          </strong>
          JaipurEstates is an inquiry-driven, read-only property showcase for Jaipur, Rajasthan. All property specifications, rental figures, and prices displayed are estimated benchmarks ("Est.") for reference. Final pricing, agreement terms, and transaction conditions are mutually agreed upon directly between buyers, sellers, tenants, and owners during on-site inspections. Standard 1% listing and brokerage commission applies upon successful closing.
        </div>
      </section>
    </div>
  );
}
