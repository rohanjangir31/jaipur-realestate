import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { VERIFIED_BUY_PROPERTIES, VERIFIED_INVESTMENT_ASSETS, VERIFIED_STAY_LISTINGS } from '../../data/verifiedCatalog';
import { CONTACT_NUMBERS } from '../../utils/contact';

export default function FeaturedShowcase() {
  const featuredBuy = VERIFIED_BUY_PROPERTIES[0];
  const featuredRent = VERIFIED_INVESTMENT_ASSETS[0];
  const featuredAirbnb = VERIFIED_STAY_LISTINGS[0];
  const primaryPhone = CONTACT_NUMBERS[0];

  const getWhatsAppLink = (title, locality) => {
    const text = encodeURIComponent(`Hello Jaipur Estates, I would like to inquire about "${title}" in ${locality}.`);
    return `https://wa.me/${primaryPhone.cleanNumber}?text=${text}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-16 relative z-10">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-elevated p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600">
                Curated Catalog
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-terracotta-50 text-terracotta-800 border border-terracotta-200">
                Standard 1% Listing Commission
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Featured Properties in Jaipur
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl">
              Hand-picked listings across Buy & Sell, Rent & Lease, and Turnkey Airbnb properties with estimated market pricing.
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
          {/* Card 1: Buy & Sell */}
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
                      Buy & Sell
                    </span>
                    <span className="bg-terracotta-700/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      1% Commission
                    </span>
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

              <div className="px-5 pb-5 space-y-2">
                <a
                  href={getWhatsAppLink(featuredBuy.title, featuredBuy.locality)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta w-full justify-center !py-2 text-xs flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span>Inquire Now (WhatsApp)</span>
                </a>
                <Link
                  to={`/buy/${featuredBuy._id}`}
                  className="btn-secondary w-full justify-center !py-1.5 text-xs text-stone-700 hover:text-stone-900"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Card 2: Rent & Lease */}
          {featuredRent && (
            <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 hover:shadow-lift transition-all bg-white">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={featuredRent.coverImageUrl}
                    alt={featuredRent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Rent & Lease
                    </span>
                    <span className="bg-emerald-800/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Pre-Leased Commercial
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded shadow">
                    Entry: {formatINR(featuredRent.entryTicketSizeINR)}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPin size={12} className="text-terracotta-600" />
                    <span>{featuredRent.locality}, Jaipur</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors line-clamp-1 mb-2">
                    {featuredRent.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {featuredRent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 mb-4">
                    <div>
                      <span className="text-stone-400 block">Current Tenant:</span>
                      <strong className="text-stone-800 truncate block">{featuredRent.currentTenantProfile}</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Remaining Lease:</span>
                      <strong className="text-stone-800">{Math.round(featuredRent.leaseRemainingMonths / 12)} Years</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-2">
                <a
                  href={getWhatsAppLink(featuredRent.title, featuredRent.locality)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta w-full justify-center !py-2 text-xs flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span>Inquire Now (WhatsApp)</span>
                </a>
                <Link
                  to={`/invest/assets/${featuredRent._id}`}
                  className="btn-secondary w-full justify-center !py-1.5 text-xs text-stone-700 hover:text-stone-900"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}

          {/* Card 3: Airbnb Management & Stays */}
          {featuredAirbnb && (
            <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-stone-400 hover:shadow-lift transition-all bg-white">
              <div>
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={featuredAirbnb.coverImageUrl}
                    alt={featuredAirbnb.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-stone-900/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Airbnb & Stays
                    </span>
                    <span className="bg-rose-700/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                      Turnkey Homestay
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded shadow">
                    Est. ₹{featuredAirbnb.basePricePerNight.toLocaleString('en-IN')} / night
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPin size={12} className="text-terracotta-600" />
                    <span>{featuredAirbnb.locality}, Jaipur</span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-terracotta-800 transition-colors line-clamp-1 mb-2">
                    {featuredAirbnb.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
                    {featuredAirbnb.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100 mb-4">
                    <div>
                      <span className="text-stone-400 block">Airbnb Potential:</span>
                      <strong className="text-stone-800">High Occupancy Hub</strong>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Hosting:</span>
                      <strong className="text-stone-800">Management Available</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 space-y-2">
                <a
                  href={getWhatsAppLink(featuredAirbnb.title, featuredAirbnb.locality)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-terracotta w-full justify-center !py-2 text-xs flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span>Inquire Now (WhatsApp)</span>
                </a>
                <Link
                  to={`/stay/${featuredAirbnb._id}`}
                  className="btn-secondary w-full justify-center !py-1.5 text-xs text-stone-700 hover:text-stone-900"
                >
                  <span>View Details</span>
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
