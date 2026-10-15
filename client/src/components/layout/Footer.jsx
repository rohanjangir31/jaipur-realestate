import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS } from '../../utils/contact';

export default function Footer() {
  return (
    <footer className="bg-[#141312] text-stone-400 border-t border-stone-800 mt-auto text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Bureau Identity */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="dark" />
            </Link>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm mb-5">
              A verified property directory for Jaipur, Rajasthan. Covering residential apartments, independent villas, pre-leased commercial assets, and heritage stays.
            </p>

            <div className="space-y-3 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-stone-500 shrink-0 mt-0.5" />
                <span>Civil Lines & C-Scheme, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-stone-500 shrink-0" />
                <a href="mailto:inquiries@jaipurestates.in" className="hover:text-stone-200 transition-colors">
                  inquiries@jaipurestates.in
                </a>
              </div>

              <div className="pt-2 border-t border-stone-800/80">
                <span className="text-[10px] font-mono text-terracotta-400 uppercase tracking-wider block mb-2">
                  Direct Calling Lines · Mon–Sat, 9:30 AM – 6:30 PM
                </span>
                <div className="space-y-2">
                  {CONTACT_NUMBERS.map(({ number, tel, whatsapp, shortLabel }) => (
                    <div key={number} className="flex items-center justify-between text-xs pr-2">
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-terracotta-500 shrink-0" />
                        <a href={tel} className="text-stone-200 hover:text-white font-mono transition-colors">
                          {number}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-stone-500">{shortLabel}</span>
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-emerald-400 transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare size={12} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Buy Residential */}
          <div>
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Buy Properties
            </h4>
            <ul className="space-y-2 text-stone-400">
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
                <Link to="/buy?locality=Vaishali%20Nagar" className="hover:text-stone-200 transition-colors">
                  Vaishali Nagar Homes
                </Link>
              </li>
              <li>
                <Link to="/buy?locality=Jagatpura" className="hover:text-stone-200 transition-colors">
                  Jagatpura High-Rises
                </Link>
              </li>
              <li>
                <Link to="/buy/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium">
                  Submit a Property for Sale →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Land */}
          <div>
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Commercial & Land
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link to="/invest?assetClass=Pre-Leased%20Commercial" className="hover:text-stone-200 transition-colors">
                  Pre-Leased Commercial
                </Link>
              </li>
              <li>
                <Link to="/invest?assetClass=High-Growth%20Land" className="hover:text-stone-200 transition-colors">
                  Commercial & Plot Land
                </Link>
              </li>
              <li>
                <Link to="/invest/criteria" className="hover:text-stone-200 transition-colors">
                  Investor Criteria Matching
                </Link>
              </li>
              <li>
                <Link to="/invest/matches" className="hover:text-stone-200 transition-colors">
                  View Matched Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Short-Term Stays */}
          <div>
            <h4 className="font-sans font-semibold text-stone-200 uppercase tracking-wider text-[11px] mb-3">
              Short-Term Stays
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link to="/stay?stayType=Heritage%20Haveli" className="hover:text-stone-200 transition-colors">
                  Heritage Havelis
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Luxury%20Villa" className="hover:text-stone-200 transition-colors">
                  Private Villas
                </Link>
              </li>
              <li>
                <Link to="/stay?stayType=Boutique%20Homestay" className="hover:text-stone-200 transition-colors">
                  Boutique Homestays
                </Link>
              </li>
              <li>
                <Link to="/stay/host/submit" className="text-terracotta-400 hover:text-terracotta-300 font-medium">
                  Host an Accommodation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower note & copyright */}
        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px] gap-3">
          <p>© {new Date().getFullYear()} JaipurEstates. Verified property listings across Rajasthan.</p>
          <div className="flex items-center gap-5">
            <Link to="/buy" className="hover:text-stone-300">Buy</Link>
            <Link to="/invest" className="hover:text-stone-300">Invest</Link>
            <Link to="/stay" className="hover:text-stone-300">Stay</Link>
            <Link to="/admin" className="hover:text-stone-300">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
