import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Search,
  Check,
  Building,
  Home as HomeIcon,
  TrendingUp,
  BedDouble,
  ChevronRight,
} from 'lucide-react';
import { JAIPUR_LOCALITIES } from '../utils/formatters';

const LOCALITIES = [
  {
    name: 'C-Scheme',
    character: 'Central Business & High-End Living',
    note: 'Tree-lined avenues, corporate offices, and luxury apartments near Central Park.',
  },
  {
    name: 'Vaishali Nagar',
    character: 'Established Family Neighborhood',
    note: 'Independent houses, top schools, and retail centers around Amrapali Circle.',
  },
  {
    name: 'Jagatpura',
    character: 'High-Rise & Institutional Corridor',
    note: 'Close to the airport, Bombay Hospital, and modern residential developments.',
  },
  {
    name: 'Malviya Nagar',
    character: 'Commercial & Residential Hub',
    note: 'Proximity to World Trade Park, institutional campuses, and quiet kothis.',
  },
  {
    name: 'Pink City (Walled City)',
    character: 'UNESCO World Heritage Core',
    note: 'Historic havelis, courtyard architecture, and boutique hospitality properties.',
  },
  {
    name: 'Mansarovar',
    character: 'Planned Metro-Connected Township',
    note: 'Comprehensive community infrastructure with direct metro access to central Jaipur.',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('buy');
  const [locality, setLocality] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [stayType, setStayType] = useState('');

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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800">
      {/* ── 1. Hero Section: Architectural, Confident, Human ── */}
      <section className="bg-[#161513] text-stone-100 border-b border-stone-800 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400 mb-3 block">
              Jaipur, Rajasthan
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-white leading-[1.12]">
              Properties, heritage stays, and commercial land in Jaipur.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              We check title deeds, cross-reference RERA filings, and introduce buyers and travellers directly to owners and hosts. No broker spam. No inflated carpet areas.
            </p>
          </div>

          {/* Search Box - Built like an architectural tool */}
          <div className="mt-10 max-w-4xl bg-white text-stone-900 rounded-xl p-4 sm:p-5 shadow-elevated border border-stone-200">
            {/* Tabs */}
            <div className="flex border-b border-stone-200 pb-3 gap-6 text-sm font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('buy')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'buy'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Buy Properties
                {activeTab === 'buy' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-700 -mb-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('invest')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'invest'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Commercial & Land
                {activeTab === 'invest' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-terracotta-700 -mb-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stay')}
                className={`pb-2 transition-colors relative ${
                  activeTab === 'stay'
                    ? 'text-stone-950 font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Short-Term Stays
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
                    <option value="">All Types (Flats, Villas, Plots)</option>
                    <option value="Apartment/Flat">Apartment / Flat</option>
                    <option value="Independent House/Villa">Independent House / Villa</option>
                    <option value="Builder Floor">Builder Floor</option>
                    <option value="Plot/Land">Plot / Land</option>
                    <option value="Commercial Office/Shop">Commercial Office / Shop</option>
                  </select>
                </div>
              )}

              {activeTab === 'stay' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Accommodation Type
                  </label>
                  <select
                    value={stayType}
                    onChange={(e) => setStayType(e.target.value)}
                    className="input-field text-xs sm:text-sm"
                  >
                    <option value="">All Stays</option>
                    <option value="Heritage Haveli">Heritage Haveli</option>
                    <option value="Boutique Homestay">Boutique Homestay</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Service Apartment">Service Apartment</option>
                  </select>
                </div>
              )}

              {activeTab === 'invest' && (
                <div className="sm:col-span-4">
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Asset Type
                  </label>
                  <div className="text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5">
                    Pre-Leased Commercial & Growth Land
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
          <div className="mt-8 flex flex-wrap gap-y-2 gap-x-8 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-terracotta-400" />
              Verified title documents & RERA registration IDs
            </span>
            <span>Direct owner contact — no commission markups</span>
            <span>Dedicated site inspection support</span>
          </div>
        </div>
      </section>

      {/* ── 2. The Three Modules (Editorial Grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-12">
          <span className="section-label">Three Verticals</span>
          <h2 className="section-title">Built for buyers, investors, and travelers.</h2>
          <p className="section-subtitle">
            Every section operates with distinct validation criteria, transparent specifications, and human inquiry moderation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vertical 1: Buy */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider mb-2">
                Residential & Plots
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Buy Property</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Flats, builder floors, independent villas, and approved plots across Jaipur. We verify ownership papers, RERA numbers, and actual carpet areas before listing.
              </p>

              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>RERA status cross-checked with official portal</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Super built-up vs. carpet area clearly separated</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Direct inquiry sent directly to owner or authorized curator</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <Link to="/buy" className="btn-primary w-full justify-center">
                Browse Buy Catalog <ArrowRight size={14} />
              </Link>
              <Link
                to="/buy/submit"
                className="btn-secondary w-full justify-center text-xs"
              >
                Post a Property for Sale
              </Link>
            </div>
          </div>

          {/* Vertical 2: Invest */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider mb-2">
                Pre-Leased & Land
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Commercial Investments</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Bank branches, retail high-street shops, and industrial parcels. All yields and escalation clauses reflect factual lease deed terms. No speculative claims.
              </p>

              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>5-rule criteria matching for budget, yield, and locality</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Historical rental records without return guarantees</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Tenant profile & remaining lock-in period disclosure</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <Link to="/invest" className="btn-primary w-full justify-center">
                View Commercial Assets <ArrowRight size={14} />
              </Link>
              <Link
                to="/invest/criteria"
                className="btn-secondary w-full justify-center text-xs"
              >
                Set Investment Criteria
              </Link>
            </div>
          </div>

          {/* Vertical 3: Stay */}
          <div className="card p-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-terracotta-700 uppercase tracking-wider mb-2">
                Hospitality & Havelis
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Short-Term Stays</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-6">
                Restored 19th-century havelis, luxury private villas, and serviced homestays. Transparent nightly rates, guest capacities, and direct host inquiry.
              </p>

              <ul className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4 mb-6">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Verified hosts and physical property inspections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Transparent per-night base pricing and cleaning fee</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-stone-900" />
                  <span>Inquiry-based booking — coordinate with hosts prior to stay</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <Link to="/stay" className="btn-primary w-full justify-center">
                Explore Stays <ArrowRight size={14} />
              </Link>
              <Link
                to="/stay/host/submit"
                className="btn-secondary w-full justify-center text-xs"
              >
                Host an Accommodation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Jaipur Neighborhood Guide ── */}
      <section className="bg-[#F4EFE8] border-y border-stone-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="section-label">Neighborhoods</span>
              <h2 className="section-title">Where to buy and stay in Jaipur</h2>
              <p className="section-subtitle">
                A localized perspective on key residential and commercial sectors across the city.
              </p>
            </div>
            <Link
              to="/buy"
              className="mt-4 md:mt-0 text-sm font-medium text-stone-900 hover:text-terracotta-700 flex items-center gap-1"
            >
              View all listings <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCALITIES.map((loc, i) => (
              <Link
                key={i}
                to={`/buy?locality=${encodeURIComponent(loc.name)}`}
                className="bg-white rounded-lg p-6 border border-stone-200 shadow-soft hover:shadow-lift hover:border-stone-400 transition-all block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors">
                    {loc.name}
                  </h3>
                  <MapPin size={15} className="text-stone-400 group-hover:text-terracotta-700 transition-colors" />
                </div>
                <div className="text-xs font-medium text-stone-500 mb-2">
                  {loc.character}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {loc.note}
                </p>
                <span className="text-xs font-semibold text-stone-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Explore listings <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. How the Process Works (Honest, Real-World Steps) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mb-14">
          <span className="section-label">Process</span>
          <h2 className="section-title">How transactions and inquiries work</h2>
          <p className="section-subtitle">
            We operate on an inquiry-first workflow. Before any agreement is signed, you receive verified details and direct communication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-t-2 border-stone-900 pt-5">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-2">01</span>
            <h3 className="font-serif text-lg text-stone-900 mb-2">Find a property</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Filter listings by locality, RERA registration, floor area, or stay dates.
            </p>
          </div>

          <div className="border-t-2 border-stone-900 pt-5">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-2">02</span>
            <h3 className="font-serif text-lg text-stone-900 mb-2">Send your inquiry</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Submit your timing, questions, and preferred inspection date through the secure form.
            </p>
          </div>

          <div className="border-t-2 border-stone-900 pt-5">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-2">03</span>
            <h3 className="font-serif text-lg text-stone-900 mb-2">Admin review</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our Jaipur team reviews the request, verifies owner availability, and coordinates an introduction.
            </p>
          </div>

          <div className="border-t-2 border-stone-900 pt-5">
            <span className="text-xs font-mono font-bold text-stone-400 block mb-2">04</span>
            <h3 className="font-serif text-lg text-stone-900 mb-2">Inspect & verify</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Conduct on-ground site visits, examine physical paperwork, and proceed with legal diligence.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Owner & Host Submission Callout ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#1C1A18] text-stone-200 rounded-xl p-8 sm:p-12 border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400 mb-2 block">
                Listing Submissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal">
                Own a house, commercial floor, or heritage haveli in Jaipur?
              </h2>
              <p className="text-stone-400 text-sm mt-3 max-w-2xl leading-relaxed">
                Submit your property details for review. Our local curators review every submission within 24 business hours to ensure accurate paperwork before making it public.
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
                List a Stay / Haveli
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Honest Regulatory & Legal Notice ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-stone-200 bg-white rounded-lg p-5 text-xs text-stone-600 leading-relaxed">
          <strong className="text-stone-900 block font-semibold mb-1">
            Regulatory Disclosure & Disclaimer
          </strong>
          JaipurEstates operates as an inquiry and property verification directory. All rental yield calculations and historical figures are factual data points extracted from executed lease agreements. We do not provide financial investment advisory services, promise capital returns, or operate pooled investment schemes. Prospective buyers and investors must perform independent legal verification, title searches, and property inspections through qualified legal counsel before executing registered deeds.
        </div>
      </section>
    </div>
  );
}
