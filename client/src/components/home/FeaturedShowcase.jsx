import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, MessageSquare, Eye, TrendingUp } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import {
  VERIFIED_BUY_PROPERTIES,
  VERIFIED_INVESTMENT_ASSETS,
  VERIFIED_STAY_LISTINGS,
} from '../../data/verifiedCatalog';
import { CONTACT_NUMBERS } from '../../utils/contact';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

export default function FeaturedShowcase() {
  const featuredBuy    = VERIFIED_BUY_PROPERTIES[0];
  const featuredRent   = VERIFIED_INVESTMENT_ASSETS[0];
  const featuredAirbnb = VERIFIED_STAY_LISTINGS[0];
  const primaryPhone   = CONTACT_NUMBERS[0];

  const waLink = (title, locality) =>
    `https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
      `Hello Jaipur Estates, I'd like to inquire about "${title}" in ${locality}.`
    )}`;

  /* ── Single Property Card ── */
  const PropertyCard = ({
    image, category, badge, badgeCls, price, locality, title, description,
    specs, inquireHref, detailTo,
  }) => (
    <div className="group property-card">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-stone-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" />

        {/* Top left labels */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-stone-900/90 text-white text-[10px] font-bold px-2.5 py-1
                           rounded-full backdrop-blur-sm uppercase tracking-wide">
            {category}
          </span>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeCls}`}>
            {badge}
          </span>
        </div>

        {/* Bottom right: price */}
        <div className="absolute bottom-3 right-3 bg-white text-stone-900 text-xs font-bold
                         px-3 py-1.5 rounded-xl shadow-lift">
          {price}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
          <MapPin size={12} className="text-terracotta-600 shrink-0" />
          <span>{locality}, Jaipur</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-base font-semibold text-stone-900
                        group-hover:text-terracotta-700 transition-colors
                        line-clamp-1 mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">{description}</p>

        {/* Specs grid */}
        {specs && (
          <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] rounded-xl p-3
                           border border-stone-100 text-[11px] mb-5">
            {specs.map(({ label, value }) => (
              <div key={label}>
                <span className="text-stone-400 block mb-0.5">{label}</span>
                <strong className="text-stone-800 font-semibold">{value}</strong>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto space-y-2">
          <a
            href={inquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terracotta w-full justify-center !py-2.5 text-xs"
          >
            <MessageSquare size={13} /> Inquire Now
          </a>
          <Link
            to={detailTo}
            className="btn-secondary w-full justify-center !py-2 text-xs"
          >
            <Eye size={13} /> View Details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20 relative z-10">
      {/* White elevated panel */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-elevated p-6 sm:p-9">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6
                         border-b border-stone-100">
          <div>
            <span className="section-label mb-2">Curated Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Featured Properties in Jaipur
            </h2>
            <p className="text-stone-500 text-sm mt-1.5 max-w-xl">
              Hand-picked across Buy &amp; Sell, Rent &amp; Lease, and Turnkey Airbnb — all with
              estimated market pricing.
            </p>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                             text-stone-500 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-full">
              <TrendingUp size={12} className="text-terracotta-600" />
              Est. Market Pricing
            </span>
            <Link
              to="/buy"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta-700
                         hover:text-terracotta-900 transition-colors whitespace-nowrap"
            >
              Full Catalog <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBuy && (
            <PropertyCard
              image={featuredBuy.coverImageUrl}
              category="Buy & Sell"
              badge="Est. Price"
              badgeCls="bg-terracotta-700/90 text-white"
              price={`Est. ${formatINR(featuredBuy.price)}`}
              locality={featuredBuy.locality}
              title={featuredBuy.title}
              description={featuredBuy.description}
              specs={[
                { label: 'Carpet Area', value: `${featuredBuy.carpetAreaSqFt} sq.ft` },
                { label: 'Possession',  value: featuredBuy.possessionStatus },
              ]}
              inquireHref={waLink(featuredBuy.title, featuredBuy.locality)}
              detailTo={`/buy/${featuredBuy._id}`}
            />
          )}

          {featuredRent && (
            <PropertyCard
              image={featuredRent.coverImageUrl}
              category="Rent & Lease"
              badge="Pre-Leased"
              badgeCls="bg-emerald-800/90 text-white"
              price={`Entry: Est. ${formatINR(featuredRent.entryTicketSizeINR)}`}
              locality={featuredRent.locality}
              title={featuredRent.title}
              description={featuredRent.description}
              specs={[
                { label: 'Current Tenant', value: featuredRent.currentTenantProfile },
                { label: 'Remaining Lease', value: `${Math.round(featuredRent.leaseRemainingMonths / 12)} Years` },
              ]}
              inquireHref={waLink(featuredRent.title, featuredRent.locality)}
              detailTo={`/invest/assets/${featuredRent._id}`}
            />
          )}

          {featuredAirbnb && (
            <PropertyCard
              image={featuredAirbnb.coverImageUrl}
              category="Airbnb & Stays"
              badge="Turnkey Homestay"
              badgeCls="bg-rose-700/90 text-white"
              price={`Est. ₹${featuredAirbnb.basePricePerNight.toLocaleString('en-IN')} / night`}
              locality={featuredAirbnb.locality}
              title={featuredAirbnb.title}
              description={featuredAirbnb.description}
              specs={[
                { label: 'Airbnb Potential', value: 'High Occupancy Hub' },
                { label: 'Hosting',          value: 'Management Available' },
              ]}
              inquireHref={waLink(featuredAirbnb.title, featuredAirbnb.locality)}
              detailTo={`/stay/${featuredAirbnb._id}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
