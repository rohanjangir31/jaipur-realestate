import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS, OFFICE_ADDRESS, CONTACT_EMAIL } from '../../utils/contact';

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-stone-400 border-t border-stone-800 mt-auto text-xs pb-16 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Bureau Identity & Direct Lines (Span 4) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="dark" />
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mb-5">
              A verified property directory for Jaipur, Rajasthan. Covering residential apartments, independent villas, pre-leased commercial assets, and heritage stays.
            </p>

            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-stone-500 shrink-0 mt-0.5" />
                <span className="text-[11px]">{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-stone-500 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[11px] hover:text-stone-200 transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="pt-3 border-t border-stone-800/80 mt-4">
                <span className="text-[10px] font-mono text-terracotta-400 uppercase tracking-wider block mb-2 font-medium">
                  Direct Calling Lines · Mon–Sat, 9:30 AM – 6:30 PM
                </span>
                <div className="space-y-2">
                  {CONTACT_NUMBERS.map(({ number, tel, whatsapp, shortLabel, role }) => (
                    <div
                      key={number}
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-stone-900/60 border border-stone-800/80 hover:border-stone-700 transition-colors"
                    >
                      <div className="min-w-0 pr-1">
                        <div className="flex items-center gap-1.5">
                          <Phone size={11} className="text-terracotta-500 shrink-0" />
                          <a
                            href={tel}
                            className="text-stone-200 hover:text-white font-mono text-xs font-medium tracking-tight hover:underline transition-colors truncate"
                          >
                            {number}
                          </a>
                        </div>
                        <div className="text-[10px] text-stone-500 truncate mt-0.5 pl-4">
                          {shortLabel}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={tel}
                          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-[10px] font-medium transition-colors"
                        >
                          Call
                        </a>
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-950/70 border border-emerald-900/40 text-emerald-400 hover:text-emerald-300 transition-colors"
                          title={`Chat with ${shortLabel} on WhatsApp`}
                        >
                          <MessageSquare size={11} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Buy Residential (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Buy Properties
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/buy?propertyType=Apartment/Flat" className="hover:text-stone-200 transition-colors">
                  Apartments & Flats
                </Link>
              </li>
              <li>
                <Link to="/buy?propertyType=Independent House/Villa" className="hover:text-stone-200 transition-colors">
                  Villas & Kothis
                </Link>
              </li>
              <li>
                <Link to="/buy?propertyType=Commercial Office/Shop" className="hover:text-stone-200 transition-colors">
                  Commercial Offices & Shops
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Vaishali%20Nagar" className="hover:text-stone-200 transition-colors">
                  Vaishali Nagar Homes
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Jagatpura" className="hover:text-stone-200 transition-colors">
                  Jagatpura Properties
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/buy/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium inline-flex items-center gap-1">
                  Post Property for Sale →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Land (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Commercial & Land
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/invest?assetClass=Pre-Leased%20Commercial" className="hover:text-stone-200 transition-colors">
                  Pre-Leased Commercial
                </Link>
              </li>
              <li>
                <Link to="/invest?assetClass=High-Growth%20Land" className="hover:text-stone-200 transition-colors">
                  Commercial & Growth Land
                </Link>
              </li>
              <li>
                <Link to="/invest?assetClass=Serviced%20Apartment" className="hover:text-stone-200 transition-colors">
                  Serviced Apartments
                </Link>
              </li>
              <li>
                <Link to="/invest/criteria" className="hover:text-stone-200 transition-colors">
                  Investor Criteria Matching
                </Link>
              </li>
              <li>
                <Link to="/invest" className="hover:text-stone-200 transition-colors">
                  Commercial Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Short-Term Stays (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Short-Term Stays
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/stay?stayType=Heritage%20Haveli" className="hover:text-stone-200 transition-colors">
                  Heritage Havelis
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Luxury%20Villa" className="hover:text-stone-200 transition-colors">
                  Luxury Private Villas
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Boutique%20Homestay" className="hover:text-stone-200 transition-colors">
                  Boutique Homestays
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Service%20Apartment" className="hover:text-stone-200 transition-colors">
                  Service Apartments
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/stay/host/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium inline-flex items-center gap-1">
                  Host an Accommodation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower note & copyright - pr-48 sm:pr-56 prevents overlap with QuickContact floating button */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between text-stone-500 text-[11px] gap-4 pr-0 sm:pr-48 lg:pr-56">
          <p>© {new Date().getFullYear()} JaipurEstates. Verified property listings across Rajasthan.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href="/pamphlet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta-400 hover:text-terracotta-300 font-medium"
            >
              Marketing Pamphlet (PDF) ↗
            </a>
            <Link to="/buy" className="hover:text-stone-300 transition-colors">Buy</Link>
            <Link to="/invest" className="hover:text-stone-300 transition-colors">Invest</Link>
            <Link to="/stay" className="hover:text-stone-300 transition-colors">Stay</Link>
            <Link to="/admin" className="hover:text-stone-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
