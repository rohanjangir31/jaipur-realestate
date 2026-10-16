import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS, OFFICE_ADDRESS, CONTACT_EMAIL, OFFICE_HOURS } from '../../utils/contact';

const FOOTER_LINKS = {
  'Buy & Sell': [
    { label: 'Apartments & Flats',        to: '/buy?propertyType=Apartment/Flat' },
    { label: 'Independent Villas',         to: '/buy?propertyType=Independent House/Villa' },
    { label: 'Commercial Offices',         to: '/buy?propertyType=Commercial Office/Shop' },
    { label: 'Vaishali Nagar',             to: '/buy?locality=Vaishali%20Nagar' },
    { label: 'Jagatpura Properties',       to: '/buy?locality=Jagatpura' },
    { label: 'Post a Property →',          to: '/buy/submit', highlight: true },
  ],
  'Rent & Lease': [
    { label: 'Pre-Leased Commercial',      to: '/invest?assetClass=Pre-Leased%20Commercial' },
    { label: 'Industrial & Warehousing',   to: '/invest?assetClass=Industrial%20Lease' },
    { label: 'Commercial Office Lease',    to: '/invest?assetClass=Commercial%20Office%20Lease' },
    { label: 'Full Lease Catalog',         to: '/invest' },
    { label: 'List for Rent / Lease →',    to: '/buy/submit', highlight: true },
  ],
  'Airbnb & Stays': [
    { label: 'Turnkey Airbnb Havelis',     to: '/stay?stayType=Airbnb%20Haveli' },
    { label: 'Luxury Airbnb Villas',       to: '/stay?stayType=Airbnb%20Luxury%20Villa' },
    { label: 'Boutique Homestays',         to: '/stay?stayType=Airbnb%20Homestay' },
    { label: 'Airbnb Studio Flats',        to: '/stay?stayType=Airbnb%20Studio%20Apartment' },
    { label: 'List for Airbnb Hosting →',  to: '/stay/host/submit', highlight: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#111010] text-stone-400 border-t border-stone-800/80 mt-auto">

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Column 1: Brand + Contact (span 4) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <Logo variant="dark" />
            </Link>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm mb-6">
              Jaipur's transparent property showcase — Buy &amp; Sell, Rent &amp; Lease, and turnkey
              Airbnb management. All prices are market estimates. No hidden fees.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400
                            bg-emerald-950/50 border border-emerald-900/60 px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Open All 7 Days · 9 AM – 6 PM IST
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-stone-600 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-500 leading-relaxed">{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-stone-600 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`}
                   className="text-xs text-stone-400 hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="mt-5 pt-5 border-t border-stone-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-500 block mb-3">
                Direct Calling Lines
              </span>
              <div className="space-y-2">
                {CONTACT_NUMBERS.map(({ number, tel, whatsapp }) => (
                  <div key={number}
                       className="flex items-center justify-between px-3 py-2.5 rounded-xl
                                  bg-stone-900/60 border border-stone-800/80 hover:border-stone-700
                                  transition-colors">
                    <a href={tel}
                       className="font-mono text-sm font-bold text-stone-200 hover:text-white transition-colors">
                      {number}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <a href={tel}
                         className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700
                                    text-[10px] font-bold text-stone-300 transition-colors">
                        Call
                      </a>
                      <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                         className="p-1.5 rounded-lg bg-emerald-950/70 border border-emerald-900/50
                                    text-emerald-400 hover:text-emerald-300 transition-colors"
                         title="WhatsApp">
                        <MessageSquare size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2-4: Service Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links], idx) => (
            <div key={category} className={idx === 2 ? "lg:col-span-2 md:col-span-1" : "lg:col-span-3 md:col-span-1"}>
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-stone-200 mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to, highlight }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className={`text-sm transition-colors inline-flex items-center gap-1 ${
                        highlight
                          ? 'text-terracotta-400 hover:text-terracotta-300 font-semibold'
                          : 'text-stone-500 hover:text-stone-200'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} Jaipur Estates. Estimated market pricing across Jaipur.
            All figures are indicative.
          </p>
          <div className="flex items-center gap-5 text-xs text-stone-600">
            <Link to="/"       className="hover:text-stone-300 transition-colors">Home</Link>
            <Link to="/buy"    className="hover:text-stone-300 transition-colors">Buy &amp; Sell</Link>
            <Link to="/invest" className="hover:text-stone-300 transition-colors">Rent &amp; Lease</Link>
            <Link to="/stay"   className="hover:text-stone-300 transition-colors">Airbnb</Link>
            <Link to="/poster" className="text-terracotta-500 hover:text-terracotta-300 font-semibold
                                          flex items-center gap-0.5 transition-colors">
              Poster <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
