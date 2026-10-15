import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, ArrowRight, Building, TrendingUp, BedDouble, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { VERIFIED_BUY_PROPERTIES, VERIFIED_INVESTMENT_ASSETS, VERIFIED_STAY_LISTINGS } from '../../data/verifiedCatalog';

export default function FeaturedShowcase() {
  const featuredBuy = VERIFIED_BUY_PROPERTIES[0];
  const featuredInvest = VERIFIED_INVESTMENT_ASSETS[0];
  const featuredStay = VERIFIED_STAY_LISTINGS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16 relative z-10">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-stone-100">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600 block mb-1">
              Curated Inventory
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Featured Verified Opportunities in Jaipur
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl">
              Hand-picked verified listings across residential, pre-leased commercial, and heritage stays with checked title papers.
            </p>
          </div>
          <Link
            to="/buy"
            className="text-xs sm:text-sm font-semibold text-terracotta-700 hover:text-terracotta-900 flex items-center gap-1 self-start md:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Residential Buy */}
          {featuredBuy && (
            <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 hover:shadow-lift transition-all bg-white">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={featuredBuy.coverImageUrl}
                    alt={featuredBuy.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Residential Buy
                    </span>
                    {featuredBuy.reraRegistered && (
                      <span className="bg-emerald-700/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                        <ShieldCheck size={10} /> RERA Verified
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded shadow">
                    {formatINR(featuredBuy.price)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPin size={12} className="text-terracotta-600" />
                    <span>{featuredBuy.locality}, Jaipur</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors line-clamp-1 mb-2">
                    {featuredBuy.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {featuredBuy.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 mb-4">
                    <div>
                      <span className="text-stone-400 block">Carpet Area:</span>
                      <strong className="text-stone-800">{featuredBuy.carpetAreaSqFt} sq.ft</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Possession:</span>
                      <strong className="text-stone-800">{featuredBuy.possessionStatus}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <Link
                  to={`/buy/${featuredBuy._id}`}
                  className="btn-primary w-full justify-center !py-2 text-xs"
                >
                  <span>View Details & Inquire</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Card 2: Commercial Investment */}
          {featuredInvest && (
            <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 hover:shadow-lift transition-all bg-white">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={featuredInvest.coverImageUrl}
                    alt={featuredInvest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Pre-Leased Commercial
                    </span>
                    <span className="bg-amber-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      {featuredInvest.historicalRentalYieldPct}% Yield
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded shadow">
                    Entry: {formatINR(featuredInvest.entryTicketSizeINR)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPin size={12} className="text-terracotta-600" />
                    <span>{featuredInvest.locality}, Jaipur</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors line-clamp-1 mb-2">
                    {featuredInvest.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {featuredInvest.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 mb-4">
                    <div>
                      <span className="text-stone-400 block">Current Tenant:</span>
                      <strong className="text-stone-800 truncate block">{featuredInvest.currentTenantProfile}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Remaining Lease:</span>
                      <strong className="text-stone-800">{Math.round(featuredInvest.leaseRemainingMonths / 12)} Years</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <Link
                  to={`/invest/assets/${featuredInvest._id}`}
                  className="btn-primary w-full justify-center !py-2 text-xs"
                >
                  <span>View Asset Prospectus</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Card 3: Stay Listing */}
          {featuredStay && (
            <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 hover:shadow-lift transition-all bg-white">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={featuredStay.coverImageUrl}
                    alt={featuredStay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Heritage Stay
                    </span>
                    <span className="bg-rose-700/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Max {featuredStay.maxGuests} Guests
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded shadow">
                    ₹{featuredStay.basePricePerNight.toLocaleString('en-IN')} / night
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPin size={12} className="text-terracotta-600" />
                    <span>{featuredStay.locality}, Jaipur</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors line-clamp-1 mb-2">
                    {featuredStay.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {featuredStay.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 mb-4">
                    <div>
                      <span className="text-stone-400 block">Bedrooms:</span>
                      <strong className="text-stone-800">{featuredStay.bedrooms} Rooms ({featuredStay.beds} Beds)</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Key Highlight:</span>
                      <strong className="text-stone-800">1940s Rajputana Courtyard</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <Link
                  to={`/stay/${featuredStay._id}`}
                  className="btn-primary w-full justify-center !py-2 text-xs"
                >
                  <span>View Haveli & Dates</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
