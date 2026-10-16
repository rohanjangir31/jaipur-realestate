import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Plus,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { stayApi } from '../../services/api';
import { formatINR, JAIPUR_LOCALITIES } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { CONTACT_NUMBERS } from '../../utils/contact';

const QUICK_STAY_TYPES = [
  'Airbnb Haveli',
  'Airbnb Homestay',
  'Airbnb Luxury Villa',
  'Airbnb Studio Apartment',
];

export default function StayListings() {
  usePageMeta({
    title: 'Airbnb Properties & Homestay Management in Jaipur | Turnkey Stays',
    description: 'Buy turnkey properties ready to launch on Airbnb or list your place for professional homestay management in Jaipur. 1% commission.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const primaryPhone = CONTACT_NUMBERS[0];

  const [stays, setStays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters initialized from URL
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [stayType, setStayType] = useState(searchParams.get('stayType') || '');
  const [guests, setGuests] = useState(searchParams.get('guests') || '1');
  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'createdAt');

  const fetchStays = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        locality: locality || undefined,
        stayType: stayType || undefined,
        guests: guests ? Number(guests) : undefined,
        checkIn: checkIn || undefined,
        checkOut: checkOut || undefined,
        maxPrice: maxPrice || undefined,
        sortBy,
      };
      const res = await stayApi.getStays(params);
      setStays(res.data.data.stays || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve Airbnb listings at this time.');
    } finally {
      setLoading(false);
    }
  };

  // Sync state with URL search params whenever URL changes
  useEffect(() => {
    setLocality(searchParams.get('locality') || '');
    setStayType(searchParams.get('stayType') || '');
    setGuests(searchParams.get('guests') || '1');
    setCheckIn(searchParams.get('checkIn') || '');
    setCheckOut(searchParams.get('checkOut') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSortBy(searchParams.get('sortBy') || 'createdAt');
  }, [searchParams]);

  useEffect(() => {
    fetchStays();
  }, [locality, stayType, guests, checkIn, checkOut, maxPrice, sortBy]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchStays();
  };

  const handleResetFilters = () => {
    setLocality('');
    setStayType('');
    setGuests('1');
    setCheckIn('');
    setCheckOut('');
    setMaxPrice('');
    setSortBy('createdAt');
    setSearchParams({});
  };

  const getWhatsAppLink = (title, loc) => {
    const text = encodeURIComponent(`Hello Jaipur Estates, I would like to inquire about "${title}" in ${loc} for Airbnb purchase / management.`);
    return `https://wa.me/${primaryPhone.cleanNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label mb-2">Airbnb &amp; Holiday Homes</span>
            <h1 className="section-title">Airbnb Properties &amp; Management</h1>
            <p className="section-subtitle">
              Turnkey courtyard havelis, luxury villas, and studio flats in Jaipur. Buy to launch your Airbnb or partner with our hosting management team.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/stay/host/submit"
              className="btn-terracotta text-xs !py-2.5 !px-4 whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <Plus size={15} /> List for Airbnb Hosting
            </Link>
          </div>
        </div>

        {/* Informational Notice */}
        <div className="border border-stone-200 bg-white rounded-xl p-4 mb-8 text-xs text-stone-600 shadow-soft">
          <strong className="text-stone-900 block font-semibold mb-0.5">
            Turnkey Airbnb &amp; Host Management
          </strong>
          All properties listed are ready for short-stay occupancy or turnkey purchase. Displayed per-night figures are market estimates based on seasonal averages. All figures are indicative references only.
        </div>

        {/* Quick Filter Stay Types */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar text-xs">
          <span className="text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal size={13} /> Category:
          </span>
          <button
            onClick={() => setStayType('')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
              stayType === ''
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            All Airbnb Stays
          </button>
          {QUICK_STAY_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setStayType(stayType === type ? '' : type)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                stayType === type
                  ? 'bg-terracotta-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-5 mb-8 border border-stone-200 shadow-soft">
          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Stay Type */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Airbnb Type</label>
              <select
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">All Types</option>
                <option value="Airbnb Haveli">Turnkey Airbnb Haveli</option>
                <option value="Airbnb Homestay">Boutique Airbnb Homestay</option>
                <option value="Airbnb Luxury Villa">Luxury Airbnb Villa</option>
                <option value="Airbnb Studio Apartment">Airbnb Studio Apartment</option>
              </select>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="input-field text-xs"
              >
                <option value="1">1+ Guest</option>
                <option value="2">2+ Guests</option>
                <option value="4">4+ Guests</option>
                <option value="6">6+ Guests</option>
                <option value="10">10+ Guests</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-secondary w-full text-xs !py-2.5 justify-center flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          </form>
        </div>

        {/* Listings Display */}
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center">
            <LoadingSpinner size="lg" />
            <p className="text-stone-500 text-xs mt-3">Loading Airbnb properties...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center max-w-md mx-auto">
            <p className="text-xs mb-3">{error}</p>
            <button onClick={fetchStays} className="btn-secondary text-xs">
              Try Again
            </button>
          </div>
        ) : stays.length === 0 ? (
          <div className="card p-12 text-center max-w-md mx-auto">
            <BedDouble size={32} className="mx-auto text-stone-400 mb-3" />
            <h3 className="font-serif text-lg text-stone-900">No properties found</h3>
            <p className="text-stone-500 text-xs mt-1">
              No listings match your current filters. Try resetting your search.
            </p>
            <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
              <span>Showing <strong>{stays.length}</strong> Airbnb properties in Jaipur</span>
              <span>All nightly rates are estimated averages (Est. &#8377;)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay) => (
                <div
                  key={stay._id}
                  className="listing-card group"
                >
                  {/* Top accent stripe */}
                  <div className="h-1 w-full bg-gradient-to-r from-rose-700 to-rose-500" />

                  {/* Photo */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={stay.coverImageUrl}
                      alt={stay.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent z-[1]" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="bg-white/95 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {stay.stayType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 z-10">
                      <div className="bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md">
                        Est. &#8377;{stay.basePricePerNight.toLocaleString('en-IN')} / night
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                      <MapPin size={12} className="text-terracotta-600 shrink-0" />
                      <span>{stay.locality}, Jaipur</span>
                    </div>

                    <h3 className="font-serif font-semibold text-stone-900 line-clamp-1 text-base mb-4 group-hover:text-terracotta-700 transition-colors">
                      {stay.title}
                    </h3>

                    {/* Room Specs */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100 text-xs text-stone-600 mb-5 bg-sandstone-50 px-3 rounded-2xl text-center">
                      <div>
                        <span className="text-stone-400 block text-[10px] mb-0.5">Bedrooms</span>
                        <span className="font-semibold text-stone-800">{stay.bedrooms}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] mb-0.5">Beds</span>
                        <span className="font-semibold text-stone-800">{stay.beds}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px] mb-0.5">Max Guests</span>
                        <span className="font-semibold text-stone-800">{stay.maxGuests}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 mb-5 leading-relaxed">
                      {stay.description}
                    </p>

                    {/* Direct inquiry CTA */}
                    <div className="mt-auto space-y-2.5">
                      <a
                        href={getWhatsAppLink(stay.title, stay.locality)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-terracotta w-full text-xs !py-3 justify-center flex items-center gap-1.5"
                      >
                        <MessageSquare size={13} />
                        <span>Inquire Now</span>
                      </a>
                      <Link
                        to={`/stay/${stay._id}`}
                        className="btn-secondary w-full text-xs !py-2.5 justify-center text-stone-700 hover:text-stone-900"
                      >
                        <span>View Property &amp; Setup</span>
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
