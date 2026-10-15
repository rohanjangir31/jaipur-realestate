import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS, OFFICE_ADDRESS, CONTACT_EMAIL, OFFICE_HOURS } from '../../utils/contact';

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-stone-400 border-t border-stone-800 mt-auto text-xs pb-16 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Identity & Direct Lines (Span 4) */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="dark" />
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mb-4">
              A transparent, read-only property showcase for Jaipur, Rajasthan. Covering Buy &amp; Sell, commercial Rent &amp; Lease, and turnkey Airbnb vacation homes with standard 1% commission.
            </p>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-terracotta-300 bg-stone-900 border border-stone-800 px-2.5 py-1 rounded-md mb-5">
              <Sparkles size={11} className="text-terracotta-400" />
              <span>Standard 1% Listing &amp; Brokerage Commission</span>
            </div>

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
                  Direct Calling Lines · Open All 7 Days (9 AM – 6 PM)
                </span>
                <div className="space-y-2">
                  {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
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
                          title="WhatsApp"
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

          {/* Column 2: Buy & Sell (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Buy &amp; Sell
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/buy?propertyType=Apartment/Flat" className="hover:text-stone-200 transition-colors">
                  Apartments &amp; Flats
                </Link>
              </li>
              <li>
                <Link to="/buy?propertyType=Independent House/Villa" className="hover:text-stone-200 transition-colors">
                  Independent Villas &amp; Kothis
                </Link>
              </li>
              <li>
                <Link to="/buy?propertyType=Commercial Office/Shop" className="hover:text-stone-200 transition-colors">
                  Commercial Offices &amp; Shops
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Vaishali%20Nagar" className="hover:text-stone-200 transition-colors">
                  Vaishali Nagar Properties
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Jagatpura" className="hover:text-stone-200 transition-colors">
                  Jagatpura Properties
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/buy/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium inline-flex items-center gap-1">
                  Post a Property for Sale →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Rent & Lease (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Rent &amp; Lease
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/invest?assetClass=Pre-Leased%20Commercial" className="hover:text-stone-200 transition-colors">
                  Pre-Leased Commercial
                </Link>
              </li>
              <li>
                <Link to="/invest?assetClass=Industrial%20Lease" className="hover:text-stone-200 transition-colors">
                  Industrial &amp; Warehousing
                </Link>
              </li>
              <li>
                <Link to="/invest?assetClass=Commercial%20Office%20Lease" className="hover:text-stone-200 transition-colors">
                  Commercial Offices for Lease
                </Link>
              </li>
              <li>
                <Link to="/invest" className="hover:text-stone-200 transition-colors">
                  Commercial Lease Catalog
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={`https://wa.me/${CONTACT_NUMBERS[0].cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%20want%20to%20list%20a%20property%20for%20rent%20or%20lease`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terracotta-400 hover:text-terracotta-300 font-medium inline-flex items-center gap-1"
                >
                  List for Rent / Lease →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Airbnb & Stays (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Airbnb &amp; Stays
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link to="/stay?stayType=Airbnb%20Haveli" className="hover:text-stone-200 transition-colors">
                  Turnkey Airbnb Havelis
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Airbnb%20Luxury%20Villa" className="hover:text-stone-200 transition-colors">
                  Luxury Airbnb Villas
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Airbnb%20Homestay" className="hover:text-stone-200 transition-colors">
                  Boutique Homestays
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Airbnb%20Studio%20Apartment" className="hover:text-stone-200 transition-colors">
                  Airbnb Studio Flats
                </Link>
              </li>
              <li className="pt-1">
                <Link to="/stay/host/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium inline-flex items-center gap-1">
                  List for Airbnb Hosting →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower note & copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between text-stone-500 text-[11px] gap-4 pr-0 sm:pr-48 lg:pr-56">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} JaipurEstates. Estimated market pricing across Jaipur.</p>
            <span className="hidden sm:inline text-stone-700">·</span>
            <span className="text-terracotta-400 font-medium">1% Standard Listing Commission</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/" className="hover:text-stone-300 transition-colors">Home</Link>
            <Link
              to="/poster"
              className="text-terracotta-400 hover:text-terracotta-300 font-medium"
            >
              Marketing Poster ↗
            </Link>
            <Link to="/buy" className="hover:text-stone-300 transition-colors">Buy &amp; Sell</Link>
            <Link to="/invest" className="hover:text-stone-300 transition-colors">Rent &amp; Lease</Link>
            <Link to="/stay" className="hover:text-stone-300 transition-colors">Airbnb</Link>
            <Link to="/admin" className="hover:text-stone-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
