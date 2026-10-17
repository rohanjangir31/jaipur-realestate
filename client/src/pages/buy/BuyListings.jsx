import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Building,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { buyApi } from '../../services/api';
import { formatINR, JAIPUR_LOCALITIES } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { CONTACT_NUMBERS } from '../../utils/contact';

const QUICK_LOCALITIES = [
  'Vaishali Nagar',
  'Jagatpura',
  'C-Scheme',
  'Malviya Nagar',
  'Mansarovar',
];

export default function BuyListings() {
  usePageMeta({
    title: 'Buy & Sell Property in Jaipur | Apartments, Villas & Plots',
    description: 'Explore estimated market prices for verified apartments in Vaishali Nagar, villas in Jagatpura, and plots in Jaipur. Direct owner connections with transparent pricing.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, hasRole } = useAuth();
  const primaryPhone = CONTACT_NUMBERS[0];

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters initialized from URL
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [bhk, setBhk] = useState(searchParams.get('bhk') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        locality: locality || undefined,
        propertyType: propertyType || undefined,
        bhk: bhk !== '' ? bhk : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sortBy,
      };
      const res = await buyApi.getProperties(params);
      setProperties(res.data.data.properties || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve property listings at this time.');
    } finally {
      setLoading(false);
    }
  };

  // Sync state with URL search params whenever URL changes
  useEffect(() => {
    setLocality(searchParams.get('locality') || '');
    setPropertyType(searchParams.get('propertyType') || '');
    setBhk(searchParams.get('bhk') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSortBy(searchParams.get('sortBy') || 'createdAt');
  }, [searchParams]);

  useEffect(() => {
    fetchProperties();
  }, [locality, propertyType, bhk, minPrice, maxPrice, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  const handleResetFilters = () => {
    setLocality('');
    setPropertyType('');
    setBhk('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('createdAt');
    setSearchParams({});
  };

  const getWhatsAppLink = (title, loc) => {
    const text = encodeURIComponent(`Hello Jaipur Estates, I would like to inquire about "${title}" in ${loc}.`);
    return `https://wa.me/${primaryPhone.cleanNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Quick Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label mb-2">Residential &amp; Commercial</span>
            <h1 className="section-title">Buy &amp; Sell in Jaipur</h1>
            <p className="section-subtitle">
              Verified apartments, independent villas, builder floors, and land parcels with estimated market pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent('Hello Jaipur Estates, I would like to inquire about Buy & Sell properties in Jaipur.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terracotta text-xs !py-2.5 !px-4 whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <MessageSquare size={14} /> Inquire Now
            </a>
          </div>
        </div>

        {/* Quick Filter Locality Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar text-xs">
          <span className="text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal size={13} /> Locality:
          </span>
          <button
            onClick={() => setLocality('')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
              locality === ''
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            All Localities
          </button>
          {QUICK_LOCALITIES.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocality(locality === loc ? '' : loc)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                locality === loc
                  ? 'bg-terracotta-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl p-5 mb-8 border border-stone-200 shadow-soft">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Locality */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Locality</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">All Localities</option>
                {JAIPUR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">All Types</option>
                <option value="Apartment/Flat">Apartment/Flat</option>
                <option value="Independent House/Villa">Independent House/Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial Office/Shop">Commercial Office/Shop</option>
              </select>
            </div>

            {/* Bedrooms (BHK) */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Bedrooms (BHK)</label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Max Budget</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">Any Budget</option>
                <option value="5000000">Under ₹50 Lakh</option>
                <option value="10000000">Under ₹1 Crore</option>
                <option value="20000000">Under ₹2 Crore</option>
              </select>
            </div>

            {/* Sort & Reset */}
            <div className="flex items-end gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-xs flex-1"
              >
                <option value="createdAt">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
              <button
                type="button"
                onClick={handleResetFilters}
                className="p-2.5 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                title="Reset Filters"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </form>
        </div>

        {/* Listings Display */}
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center">
            <LoadingSpinner size="lg" />
            <p className="text-stone-500 text-xs mt-3">Loading properties...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center max-w-md mx-auto">
            <p className="text-xs mb-3">{error}</p>
            <button onClick={fetchProperties} className="btn-secondary text-xs">
              Try Again
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="card p-12 text-center max-w-md mx-auto">
            <Building size={32} className="mx-auto text-stone-400 mb-3" />
            <h3 className="font-serif text-lg text-stone-900">No matching properties</h3>
            <p className="text-stone-500 text-xs mt-1">
              No listings currently match your filter selections. Try clearing your filters or selecting a different locality.
            </p>
            <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
              <span>Showing <strong>{properties.length}</strong> properties in Jaipur</span>
              <span>All figures are estimated market prices (Est. ₹)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property._id}
                  className="listing-card group"
                >
                  {/* Top accent stripe */}
                  <div className="h-1 w-full bg-gradient-to-r from-terracotta-700 to-terracotta-500" />

                  {/* Photo */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={property.coverImageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-expo"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent z-[1]" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="bg-white/95 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Buy &amp; Sell
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <div className="bg-terracotta-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-glow-terracotta">
                        Est. {formatINR(property.price)}
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <p className="flex items-center gap-1.5 text-xs text-stone-500">
                        <MapPin size={12} className="text-terracotta-600 shrink-0" />
                        <span>{property.locality}, Jaipur</span>
                      </p>
                      <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                        {property.propertyType}
                      </span>
                    </div>

                    <h3 className="font-serif font-semibold text-stone-900 line-clamp-1 text-base mb-4 group-hover:text-terracotta-700 transition-colors">
                      {property.title}
                    </h3>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100 text-xs text-stone-600 mb-5 bg-sandstone-50 px-3 rounded-2xl">
                      <div>
                        <span className="text-stone-400 block text-[10px] mb-0.5">Bedrooms</span>
                        <span className="font-semibold text-stone-800">{property.bhk} BHK</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] mb-0.5">Super Area</span>
                        <span className="font-semibold text-stone-800">{property.superAreaSqFt} sqft</span>
                      </div>
                      <div className="truncate">
                        <span className="text-stone-400 block text-[10px] mb-0.5">Possession</span>
                        <span className="font-semibold text-stone-800">{property.possessionStatus}</span>
                      </div>
                    </div>

                    {/* Direct inquiry action */}
                    <div className="mt-auto space-y-2.5">
                      <a
                        href={getWhatsAppLink(property.title, property.locality)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-terracotta w-full text-xs !py-3 justify-center flex items-center gap-1.5"
                      >
                        <MessageSquare size={13} />
                        <span>Inquire Now</span>
                      </a>
                      <Link
                        to={`/buy/${property._id}`}
                        className="btn-secondary w-full text-xs !py-2.5 justify-center text-stone-700 hover:text-stone-900"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
