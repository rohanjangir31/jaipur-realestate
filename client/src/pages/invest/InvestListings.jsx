import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Building2,
  FileCheck2,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { investApi } from '../../services/api';
import { formatINR, JAIPUR_LOCALITIES } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ASSET_CLASSES = [
  'Pre-Leased Commercial',
  'High-Growth Land',
  'Serviced Apartment',
  'Serviced Apartments',
  'Industrial Warehouse',
  'Mixed Use Development',
];

const RISK_CATEGORIES = [
  'Conservative (Cash Flow)',
  'Moderate (Balanced)',
  'Balanced (Hybrid)',
  'Growth (Capital Appreciation)',
  'Aggressive (High Growth)',
];

export default function InvestListings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters initialized from URL
  const [assetClass, setAssetClass] = useState(searchParams.get('assetClass') || '');
  const [riskCategory, setRiskCategory] = useState(searchParams.get('riskCategory') || '');
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [maxTicket, setMaxTicket] = useState(searchParams.get('maxTicket') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'ticketAsc');

  const fetchAssets = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        assetClass: assetClass || undefined,
        riskCategory: riskCategory || undefined,
        locality: locality || undefined,
        maxTicket: maxTicket || undefined,
        sortBy,
      };
      const res = await investApi.getAssets(params);
      setAssets(res.data.data.assets || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve investment assets at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [assetClass, riskCategory, locality, maxTicket, sortBy]);

  const handleResetFilters = () => {
    setAssetClass('');
    setRiskCategory('');
    setLocality('');
    setMaxTicket('');
    setSortBy('ticketAsc');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label">Commercial & Land Assets</span>
            <h1 className="section-title">Commercial Real Estate in Jaipur</h1>
            <p className="section-subtitle">
              Pre-leased banking assets, retail showrooms, and institutional land parcels with verifiable historical lease agreements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/invest/matches"
                className="btn-primary text-xs !py-2 !px-4 whitespace-nowrap shadow-sm"
              >
                My Matched Assets
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="btn-secondary text-xs !py-2 !px-4 whitespace-nowrap"
              >
                Sign in to Match Criteria
              </Link>
            )}
            <Link to="/invest/criteria" className="btn-secondary text-xs !py-2 !px-4 whitespace-nowrap">
              Configure Criteria
            </Link>
          </div>
        </div>

        {/* Regulatory & Risk Transparency Banner */}
        <div className="border border-stone-200 bg-white rounded-lg p-4 mb-8 text-xs text-stone-600 flex items-start gap-3 shadow-soft">
          <ShieldAlert size={18} className="text-stone-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-stone-900 block font-semibold mb-0.5">
              Due Diligence Notice
            </strong>
            All financial parameters (including historical rental yields, lock-in periods, and rent escalation terms) represent factual clauses from executed lease deeds. JaipurEstates does not guarantee rental returns or provide financial advisory. Buyers must conduct independent legal and tax due diligence prior to signing registered deeds.
          </div>
        </div>

        {/* Quick Filter Asset Class Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar text-xs">
          <span className="text-stone-500 font-medium whitespace-nowrap flex items-center gap-1">
            <SlidersHorizontal size={13} /> Asset Category:
          </span>
          <button
            onClick={() => setAssetClass('')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
              assetClass === ''
                ? 'bg-stone-900 text-white'
                : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            All Categories
          </button>
          {ASSET_CLASSES.slice(0, 4).map((ac) => (
            <button
              key={ac}
              onClick={() => setAssetClass(assetClass === ac ? '' : ac)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                assetClass === ac
                  ? 'bg-terracotta-700 text-white'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {ac}
            </button>
          ))}
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-xl p-5 mb-8 border border-stone-200 shadow-soft">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Risk Category */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Profile</label>
              <select
                value={riskCategory}
                onChange={(e) => setRiskCategory(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="">All Profiles</option>
                {RISK_CATEGORIES.map((rc) => (
                  <option key={rc} value={rc}>
                    {rc}
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

            {/* Ticket Size Max */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Max Ticket Size</label>
              <select
                value={maxTicket}
                onChange={(e) => setMaxTicket(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="">Any Budget</option>
                <option value="5000000">Up to ₹50 Lakh</option>
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="25000000">Up to ₹2.5 Crore</option>
                <option value="50000000">Up to ₹5 Crore</option>
                <option value="100000000">Up to ₹10 Crore</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field text-xs py-2"
              >
                <option value="ticketAsc">Ticket Size: Low to High</option>
                <option value="ticketDesc">Ticket Size: High to Low</option>
                <option value="yieldDesc">Historical Yield: High to Low</option>
                <option value="createdAt">Newest First</option>
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
          </div>
        </div>

        {/* Assets Catalog */}
        {loading ? (
          <div className="py-24 flex flex-col justify-center items-center">
            <LoadingSpinner size="lg" />
            <p className="text-stone-500 text-xs mt-3">Loading commercial assets...</p>
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
            <h3 className="font-serif text-lg text-stone-900">No assets found</h3>
            <p className="text-stone-500 text-xs mt-1">
              No commercial listings match your current filters. Try adjusting your ticket size or category.
            </p>
            <button onClick={handleResetFilters} className="btn-primary text-xs mt-4">
              Clear Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-5">
              <span>Showing <strong>{assets.length}</strong> commercial & land assets</span>
              <span>All investment figures reflect historical actuals</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset) => (
                <div
                  key={asset._id}
                  className="card group flex flex-col hover:border-stone-400 transition-colors"
                >
                  {/* Image & Badges */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
                    <img
                      src={asset.coverImageUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="badge-dark text-[11px] font-medium">
                        {asset.assetClass}
                      </span>
                      {asset.jdaApproved && (
                        <span className="badge-blue text-[11px]">JDA Approved</span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-stone-900/90 text-white px-2 py-0.5 rounded text-[11px] font-medium z-10">
                      {asset.riskCategory.split(' ')[0]}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                      <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider block">
                        Entry Ticket Size
                      </span>
                      <div className="text-2xl font-semibold text-stone-950">
                        {formatINR(asset.entryTicketSizeINR)}
                      </div>
                    </div>

                    <h3 className="font-serif font-medium text-stone-900 line-clamp-1 text-base mb-1.5 group-hover:text-terracotta-700 transition-colors">
                      {asset.title}
                    </h3>

                    <p className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                      <MapPin size={13} className="text-stone-400 shrink-0" />
                      <span>{asset.locality}, Jaipur</span>
                    </p>

                    {/* Lease Matrix */}
                    <div className="grid grid-cols-2 gap-3 py-2.5 border-y border-stone-100 text-xs text-stone-600 mb-4 bg-stone-50/60 p-2.5 rounded">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Current Tenant</span>
                        <span className="font-medium text-stone-800 line-clamp-1">
                          {asset.currentTenantProfile || 'Self / Vacant'}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Historical Yield</span>
                        <span className="font-medium text-stone-800">
                          {asset.historicalRentalYieldPct ? `${asset.historicalRentalYieldPct}% p.a.` : 'Capital Gain'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                      <FileCheck2 size={14} className="text-stone-400 shrink-0" />
                      <span>
                        {asset.titleVerified ? 'Title Deed Audited' : 'Due Diligence Package Ready'}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <Link
                        to={`/invest/${asset._id}`}
                        className="btn-primary w-full text-xs py-2 justify-center"
                      >
                        <span>Review Due Diligence & Inquire</span>
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
