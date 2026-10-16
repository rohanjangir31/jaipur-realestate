import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Building2,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { investApi } from '../../services/api';
import { formatINR, JAIPUR_LOCALITIES } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { CONTACT_NUMBERS } from '../../utils/contact';

const ASSET_CLASSES = [
  'Pre-Leased Commercial',
  'Commercial Office Lease',
  'Retail Showroom Lease',
  'Industrial Lease',
  'Commercial Land Lease',
];

export default function InvestListings() {
  usePageMeta({
    title: 'Rent & Lease Commercial Real Estate in Jaipur | Offices & Shops',
    description: 'Pre-leased bank branches, high-street retail showrooms, and office spaces for rent and lease in Jaipur. 1% listing commission.',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const primaryPhone = CONTACT_NUMBERS[0];

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters initialized from URL
  const [assetClass, setAssetClass] = useState(searchParams.get('assetClass') || '');
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [maxTicket, setMaxTicket] = useState(searchParams.get('maxTicket') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'ticketAsc');

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        assetClass: assetClass || undefined,
        locality: locality || undefined,
        maxTicket: maxTicket || undefined,
        sortBy,
      };
      const res = await investApi.getAssets(params);
      setAssets(res.data.data.assets || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve commercial listings at this time.');
    } finally {
      setLoading(false);
    }
  };

  // Sync state with URL search params whenever URL changes
  useEffect(() => {
    setAssetClass(searchParams.get('assetClass') || '');
    setLocality(searchParams.get('locality') || '');
    setMaxTicket(searchParams.get('maxTicket') || '');
    setSortBy(searchParams.get('sortBy') || 'ticketAsc');
  }, [searchParams]);

  useEffect(() => {
    fetchAssets();
  }, [assetClass, locality, maxTicket, sortBy]);

  const handleResetFilters = () => {
    setAssetClass('');
    setLocality('');
    setMaxTicket('');
    setSortBy('ticketAsc');
    setSearchParams({});
  };

  const getWhatsAppLink = (title, loc) => {
    const text = encodeURIComponent(`Hello Jaipur Estates, I would like to inquire about "${title}" in ${loc} for Rent / Lease.`);
    return `https://wa.me/${primaryPhone.cleanNumber}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="section-label">Commercial &amp; Retail</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                1% Listing Commission
              </span>
            </div>
            <h1 className="section-title">Rent &amp; Lease in Jaipur</h1>
            <p className="section-subtitle">
              Commercial office spaces, pre-leased bank branches, high-street retail showrooms, and industrial warehouses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%20want%20to%20list%20a%20commercial%20space%20for%20rent%20or%20lease`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terracotta text-xs !py-2.5 !px-4 whitespace-nowrap shadow-sm flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>List Space for Lease</span>
            </a>
          </div>
        </div>

        {/* Informational Advisory Notice */}
        <div className="border border-stone-200 bg-white rounded-xl p-4 mb-8 text-xs text-stone-600 shadow-soft">
          <strong className="text-stone-900 block font-semibold mb-0.5">
            Estimated Reference Notice
          </strong>
          All rental yields and escalation figures displayed are estimated market benchmarks based on historical agreements. No future financial returns or commitments are guaranteed. Standard 1% listing and brokerage commission applies.
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-5 mb-8 border border-stone-200 shadow-soft">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchAssets();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {/* Asset Class */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Space Category</label>
              <select
                value={assetClass}
                onChange={(e) => setAssetClass(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">All Categories</option>
                {ASSET_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Locality */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Locality</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">All Jaipur Localities</option>
                {JAIPUR_LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Ticket / Value */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Max Budget / Entry</label>
              <select
                value={maxTicket}
                onChange={(e) => setMaxTicket(e.target.value)}
                className="input-field text-xs"
              >
                <option value="">Any Budget</option>
                <option value="5000000">Under ₹50 Lakh</option>
                <option value="10000000">Under ₹1 Crore</option>
                <option value="25000000">Under ₹2.5 Crore</option>
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

        {/* Asset Cards */}
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center">
            <LoadingSpinner size="lg" />
            <p className="text-stone-500 text-xs mt-3">Loading listings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-6 text-center max-w-md mx-auto">
            <p className="text-xs mb-3">{error}</p>
            <button onClick={fetchAssets} className="btn-secondary text-xs">
              Try Again
            </button>
          </div>
        ) : assets.length === 0 ? (
          <div className="card p-12 text-center max-w-md mx-auto">
            <Building2 size={32} className="mx-auto text-stone-400 mb-3" />
            <h3 className="font-serif text-lg text-stone-900">No spaces found</h3>
            <p className="text-stone-500 text-xs mt-1">
              No commercial listings match your current filters. Try adjusting your selections.
            </p>
            <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
              <span>Showing <strong>{assets.length}</strong> commercial spaces for rent &amp; lease</span>
              <span>All figures are estimated benchmarks (Est. ₹)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  className="property-card group bg-white"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={asset.coverImageUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent z-[1]" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="bg-stone-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wide">
                        {asset.assetClass}
                      </span>
                      <span className="bg-emerald-800/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Verified Space
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 px-3 py-1 rounded-xl text-xs font-bold z-10 shadow-lift">
                      Est. {formatINR(asset.entryTicketSizeINR)}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                      <MapPin size={12} className="text-terracotta-600 shrink-0" />
                      <span>{asset.locality}, Jaipur</span>
                    </div>

                    <h3 className="font-serif font-semibold text-stone-900 line-clamp-1 text-base mb-2 group-hover:text-terracotta-700 transition-colors">
                      {asset.title}
                    </h3>

                    {/* Lease Matrix */}
                    <div className="grid grid-cols-2 gap-3 py-2.5 border-y border-stone-100 text-xs text-stone-600 mb-4 bg-stone-50/70 p-3 rounded-xl">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Current Use</span>
                        <span className="font-semibold text-stone-800 line-clamp-1">
                          {asset.currentTenantProfile || 'Commercial Space'}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Historical Yield</span>
                        <span className="font-semibold text-stone-800">
                          {asset.historicalRentalYieldPct ? `Est. ${asset.historicalRentalYieldPct}% p.a.` : 'Commercial Lease'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                      {asset.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-auto space-y-2 pt-1">
                      <a
                        href={getWhatsAppLink(asset.title, asset.locality)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-terracotta w-full text-xs !py-2.5 justify-center flex items-center gap-1.5"
                      >
                        <MessageSquare size={13} />
                        <span>Inquire Now (WhatsApp)</span>
                      </a>
                      <Link
                        to={`/invest/assets/${asset._id}`}
                        className="btn-secondary w-full text-xs !py-2 justify-center text-stone-700 hover:text-stone-900"
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
