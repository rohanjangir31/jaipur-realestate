import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  BedDouble,
} from 'lucide-react';
import { stayApi } from '../../services/api';
import { formatINR, JAIPUR_LOCALITIES } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const STAY_TYPES = [
  'Heritage Haveli',
  'Boutique Homestay',
  'Luxury Villa',
  'Studio Apartment',
  'Guesthouse',
  'Service Apartment',
  'Serviced Apartment',
];

const QUICK_STAY_TYPES = [
  'Heritage Haveli',
  'Luxury Villa',
  'Boutique Homestay',
  'Service Apartment',
];

export default function StayListings() {
  usePageMeta({
    title: 'Heritage Stays & Havelis in Jaipur | Boutique Homestays & Villas',
    description: 'Restored 19th-century Rajputana havelis in Bani Park, boutique homestays in C-Scheme, and private luxury villas in Jaipur.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, hasRole } = useAuth();

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
      setError(err.response?.data?.message || 'Unable to retrieve stay listings at this time.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label">Short-Term Accommodations</span>
            <h1 className="section-title">Stay in Jaipur</h1>
            <p className="section-subtitle">
              Heritage havelis in the Walled City, boutique homestays, and private villas across Jaipur.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/stay/host/submit"
              className="btn-primary text-xs !py-2 !px-4 whitespace-nowrap shadow-sm"
            >
              <Plus size={15} /> Host an Accommodation
            </Link>
          </div>
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
            All Categories
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

        {/* Search & Date Filter Bar */}
        <div className="bg-white rounded-xl p-5 mb-8 border border-stone-200 shadow-soft">
          <form onSubmit={handleFilterSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {/* Locality */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Locality</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="">All Jaipur Localities</option>
                {JAIPUR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Check-in */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Check-In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="input-field text-xs py-2"
              >
              </input>
            </div>

            {/* Check-out */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Check-Out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || undefined}
                onChange={(e) => setCheckOut(e.target.value)}
                className="input-field text-xs py-2"
              >
              </input>
            </div>

            {/* Guests */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="4">4 Guests</option>
                <option value="6">6 Guests</option>
                <option value="8">8+ Guests</option>
              </select>
            </div>

            {/* Max Nightly Rate */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Max Nightly Rate</label>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="">Any Rate</option>
                <option value="3000">Up to ₹3,000 / night</option>
                <option value="5000">Up to ₹5,000 / night</option>
                <option value="10000">Up to ₹10,000 / night</option>
                <option value="25000">Up to ₹25,000 / night</option>
              </select>
            </div>

            {/* Reset */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn-secondary !py-2 text-xs w-full justify-center"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* Listings Display */}
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center">
            <LoadingSpinner size="lg" />
            <p className="text-stone-500 text-xs mt-3">Loading stays...</p>
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
            <h3 className="font-serif text-lg text-stone-900">No accommodations found</h3>
            <p className="text-stone-500 text-xs mt-1">
              No stays match your chosen dates or guest numbers. Try adjusting your dates or clearing filters.
            </p>
            <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
              <span>Showing <strong>{stays.length}</strong> accommodations in Jaipur</span>
              <span>Direct host communication prior to booking</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stays.map((stay) => (
                <div
                  key={stay._id}
                  className="card group flex flex-col hover:border-stone-400 transition-colors"
                >
                  {/* Photo */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={stay.coverImageUrl}
                      alt={stay.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="badge-dark text-[11px] font-medium">
                        {stay.stayType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-stone-900/90 text-white px-2 py-0.5 rounded text-[11px] font-medium z-10">
                      Up to {stay.maxGuests} Guests
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="text-2xl font-semibold text-stone-950">
                        ₹{stay.basePricePerNight.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-stone-500 ml-1">/ night</span>
                      </div>
                      {stay.cleaningFee > 0 && (
                        <span className="text-[11px] text-stone-400">
                          + ₹{stay.cleaningFee} cleaning
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-medium text-stone-900 line-clamp-1 text-base mb-1.5 group-hover:text-terracotta-700 transition-colors">
                      {stay.title}
                    </h3>

                    <p className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                      <MapPin size={13} className="text-stone-400 shrink-0" />
                      <span>{stay.locality}, Jaipur</span>
                    </p>

                    {/* Room Specs */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-stone-100 text-xs text-stone-600 mb-3 bg-stone-50/60 px-2.5 rounded text-center">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Bedrooms</span>
                        <span className="font-medium text-stone-800">{stay.bedrooms}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Beds</span>
                        <span className="font-medium text-stone-800">{stay.beds}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Bathrooms</span>
                        <span className="font-medium text-stone-800">{stay.bathrooms}</span>
                      </div>
                    </div>

                    {stay.nearbyAttractions && stay.nearbyAttractions.length > 0 && (
                      <div className="text-[11px] text-stone-500 mb-4 line-clamp-1">
                        Near: {stay.nearbyAttractions.map((a) => `${a.name} (${a.distanceKm}km)`).join(', ')}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        to={`/stay/${stay._id}${
                          checkIn && checkOut
                            ? `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
                            : ''
                        }`}
                        className="btn-primary w-full text-xs py-2 justify-center"
                      >
                        <span>Check Dates & Inquire</span>
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
