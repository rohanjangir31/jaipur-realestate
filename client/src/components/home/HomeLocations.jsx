import React, { useState } from 'react';
import { MapPin, ArrowRight, Building, Sparkles, Home, BedDouble } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';

const LOCATIONS_DATA = [
  {
    name: 'Vaishali Nagar',
    type: 'residential',
    typeLabel: 'Prime Residential & Retail',
    description: 'Luxury duplex villas, high-end builder floors, and vibrant commercial high-streets.',
    popularFor: 'Villas, 3-4 BHK Flats & Showrooms',
  },
  {
    name: 'Malviya Nagar',
    type: 'residential',
    typeLabel: 'Upscale Residential & Commercial',
    description: 'Home to World Trade Park, established independent houses, and prime corporate offices.',
    popularFor: 'Independent Houses, Luxury Flats & Offices',
  },
  {
    name: 'C-Scheme',
    type: 'commercial',
    typeLabel: 'Central Business District',
    description: 'Jaipur’s central commercial hub with corporate headquarters, fine dining, and boutique hotels.',
    popularFor: 'Office Plates, Retail Showrooms & Luxury Suites',
  },
  {
    name: 'Bani Park',
    type: 'heritage',
    typeLabel: 'Heritage & Quiet Upscale Living',
    description: 'Historic green residential zone featuring heritage villas, boutique homestays, and our office.',
    popularFor: 'Heritage Havelis, Boutique Stays & Plots',
  },
  {
    name: 'Jagatpura',
    type: 'residential',
    typeLabel: 'High Growth Corridor',
    description: 'Fast-developing residential hub near the Airport, medical colleges, and modern high-rise apartments.',
    popularFor: 'Modern Gated Apartments & Residential Plots',
  },
  {
    name: 'Mansarovar',
    type: 'residential',
    typeLabel: 'Established Mega Colony',
    description: 'Large self-sustained residential colony with direct Metro connectivity, markets, and family homes.',
    popularFor: '2-3 BHK Family Homes, Plots & Local Shops',
  },
  {
    name: 'Tonk Road',
    type: 'commercial',
    typeLabel: 'Commercial & Institutional Spine',
    description: 'Major arterial corridor connecting central Jaipur to Ring Road, pre-leased banks, and corporate towers.',
    popularFor: 'Pre-Leased Commercial & Institutional Land',
  },
  {
    name: 'Ajmer Road',
    type: 'residential',
    typeLabel: 'Gated Townships & SEZ Belt',
    description: 'Rapidly expanding expressway with Mahindra World City SEZ, colleges, and gated villa communities.',
    popularFor: 'Township Plots, Villas & Farm Land',
  },
  {
    name: 'Civil Lines',
    type: 'residential',
    typeLabel: 'VIP Residential Sector',
    description: 'Prestigious green sector with ministerial bungalows, quiet wide avenues, and high privacy.',
    popularFor: 'Luxury Bungalows & Exclusive Residences',
  },
  {
    name: 'Raja Park',
    type: 'commercial',
    typeLabel: 'High-Street Retail & Dining',
    description: 'Bustling central retail market with high footfall, boutique shops, and connected residential homes.',
    popularFor: 'Commercial Shops, Showrooms & Residential Floors',
  },
  {
    name: 'Pink City (Walled City)',
    type: 'heritage',
    typeLabel: 'UNESCO World Heritage Core',
    description: 'The historic soul of Jaipur with ancestral havelis, tourist bazaars, and heritage homestay properties.',
    popularFor: 'Heritage Havelis, Airbnb Stays & Traditional Shops',
  },
  {
    name: 'Sitapura',
    type: 'commercial',
    typeLabel: 'Industrial & Export Hub',
    description: 'Major industrial area with electronics and apparel export zones, commercial buildings, and warehouses.',
    popularFor: 'Industrial Sheds, Warehouses & Commercial Land',
  },
  {
    name: 'Pratap Nagar',
    type: 'residential',
    typeLabel: 'Educational & Residential Hub',
    description: 'Planned neighborhood near coaching institutes, Rajasthan Housing Board colonies, and hospitals.',
    popularFor: 'Budget Apartments, Student Housing & Plots',
  },
  {
    name: 'Sanganer',
    type: 'residential',
    typeLabel: 'Airport & Handblock Textile Hub',
    description: 'Famous craft center located near the international airport with affordable housing and new plots.',
    popularFor: 'Residential Land, Houses & Textile Units',
  },
  {
    name: 'Shyam Nagar',
    type: 'residential',
    typeLabel: 'Connected Central Colony',
    description: 'Quiet, well-maintained residential neighborhood with its own metro station connecting to central hubs.',
    popularFor: 'Builder Floors & Independent Houses',
  },
  {
    name: 'Gopalpura Bypass',
    type: 'commercial',
    typeLabel: 'Coaching & Commercial Corridor',
    description: 'Prominent educational and retail corridor with high student footfall and active commercial buildings.',
    popularFor: 'Commercial Properties & Rental Units',
  },
];

const CATEGORIES = [
  { id: 'all',         label: 'All Locations (16)' },
  { id: 'residential', label: 'Residential Hubs' },
  { id: 'commercial',  label: 'Commercial & Offices' },
  { id: 'heritage',    label: 'Heritage & Airbnb Zones' },
];

export default function HomeLocations() {
  const { openInquiry } = useInquiry();
  const [activeTab, setActiveTab] = useState('all');

  const filteredLocations = activeTab === 'all'
    ? LOCATIONS_DATA
    : LOCATIONS_DATA.filter((loc) => loc.type === activeTab);

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-stone-200" id="locations">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-terracotta-600" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-terracotta-700">
                Key Jaipur Hubs We Cover
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-950 font-normal leading-tight">
              Locations We Cover in Jaipur
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-2xl mt-3 leading-relaxed">
              We connect you directly with verified property owners and opportunities across all major residential, commercial, and heritage areas in Jaipur.
            </p>
          </div>

          {/* Sourcing Prompt */}
          <div>
            <button
              type="button"
              onClick={() => openInquiry('buy')}
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Sparkles size={15} className="text-amber-400" />
              <span>Looking for Another Area? Tell Us</span>
            </button>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-terracotta-700 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredLocations.map((loc) => (
            <div
              key={loc.name}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-terracotta-300 hover:shadow-card transition-all duration-300 group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-terracotta-700 bg-terracotta-50 px-2.5 py-1 rounded-lg border border-terracotta-100">
                    <MapPin size={12} />
                    <span>{loc.typeLabel}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-terracotta-700 transition-colors mb-2">
                  {loc.name}
                </h3>

                <p className="text-xs text-stone-500 leading-relaxed mb-4">
                  {loc.description}
                </p>

                <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-600">
                  <span className="font-semibold text-stone-800">Popular for: </span>
                  <span>{loc.popularFor}</span>
                </div>
              </div>

              <div className="mt-5 pt-3">
                <button
                  type="button"
                  onClick={() => openInquiry('buy', { locality: loc.name })}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-stone-700 group-hover:text-terracotta-700 bg-stone-50 group-hover:bg-terracotta-50/60 py-2.5 px-3.5 rounded-xl border border-stone-200/80 group-hover:border-terracotta-200 transition-all cursor-pointer"
                >
                  <span>Inquire for {loc.name}</span>
                  <ArrowRight size={13} className="text-stone-400 group-hover:text-terracotta-700 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
