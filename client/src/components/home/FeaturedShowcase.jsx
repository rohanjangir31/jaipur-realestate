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

  /* ── Luxury Property Card ── */
  const PropertyCard = ({
    image, category, badge, badgeCls, price, priceBg, locality, title, description,
    specs, inquireHref, detailTo,
  }) => (
    <div className="group listing-card">
      {/* Image with gradient overlay */}
      <div className="relative h-56 overflow-hidden bg-stone-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-900/20 to-transparent" />

        {/* Category badge — top left */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/95 text-stone-900 text-[10px] font-bold px-3 py-1
                           rounded-full uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>

        {/* Price — bottom left */}
        <div className="absolute bottom-4 left-4">
          <div className={`${priceBg} text-white text-xs font-bold
                          px-4 py-2 rounded-xl shadow-md`}>
            {price}
          </div>
        </div>

        {/* Badge — bottom right */}
        <div className="absolute bottom-4 right-4">
          <span className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg backdrop-blur-sm ${badgeCls}`}>
            {badge}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
          <MapPin size={12} className="text-terracotta-600 shrink-0" />
          <span>{locality}, Jaipur</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-semibold text-stone-900
                       group-hover:text-terracotta-700 transition-colors
                       line-clamp-2 mb-2 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-5">{description}</p>

        {/* Specs */}
        {specs && (
          <div className="grid grid-cols-2 gap-2 bg-sandstone-50 rounded-2xl p-4
                          border border-sandstone-200 text-[11px] mb-6">
            {specs.map(({ label, value }) => (
              <div key={label}>
                <span className="text-stone-400 block mb-0.5">{label}</span>
                <strong className="text-stone-800 font-semibold">{value}</strong>
              </div>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto space-y-2.5">
          <a
            href={inquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-terracotta w-full justify-center !py-3 text-xs"
          >
            <MessageSquare size={13} /> Inquire Now
          </a>
          <Link
            to={detailTo}
            className="btn-secondary w-full justify-center !py-2.5 text-xs"
          >
            <Eye size={13} /> View Details <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 relative z-10">
      {/* Elevated panel — continues seamlessly from hero search bar */}
      <div className="bg-white rounded-b-3xl border-x border-b border-stone-200 shadow-elevated p-6 sm:p-10 mb-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8
                        border-b border-stone-100">
          <div>
            <span className="section-label mb-2">Curated Catalog</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-normal">
              Featured Properties in Jaipur
            </h2>
            <p className="text-stone-500 text-sm mt-2 max-w-xl leading-relaxed">
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
              category="Buy &amp; Sell"
              badge="Est. Price"
              badgeCls="bg-terracotta-700/90 text-white"
              price={`Est. ${formatINR(featuredBuy.price)}`}
              priceBg="bg-terracotta-700"
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
              category="Rent &amp; Lease"
              badge="Pre-Leased"
              badgeCls="bg-sage-700/90 text-white"
              price={`Entry: Est. ${formatINR(featuredRent.entryTicketSizeINR)}`}
              priceBg="bg-sage-700"
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
              category="Airbnb &amp; Stays"
              badge="Turnkey Homestay"
              badgeCls="bg-rose-700/90 text-white"
              price={`Est. \u20b9${featuredAirbnb.basePricePerNight.toLocaleString('en-IN')} / night`}
              priceBg="bg-rose-700"
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
