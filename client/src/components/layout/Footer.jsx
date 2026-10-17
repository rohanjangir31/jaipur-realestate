import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Mail, MessageSquare, ArrowUpRight, ArrowUp, Sparkles } from 'lucide-react';
import Logo from '../ui/Logo';
import { useInquiry } from '../../context/InquiryContext';
import { CONTACT_NUMBERS, OFFICE_ADDRESS, CONTACT_EMAIL, OFFICE_HOURS } from '../../utils/contact';

const ADVISORY_PRACTICES = {
  'Buy & Sell Advisory': {
    vertical: 'buy',
    catalogPath: '/buy',
    catalogLabel: 'Browse Buy & Sell Catalog →',
    items: [
      { label: 'Independent Luxury Villas', action: 'buy' },
      { label: 'High-Rise Penthouses & Flats', action: 'buy' },
      { label: 'Commercial Land & Plots', action: 'buy' },
      { label: 'Vaishali Nagar & C-Scheme Sourcing', action: 'buy' },
      { label: 'Jagatpura & Malviya Nagar Corridor', action: 'buy' },
    ],
    whatsapp: {
      label: 'WhatsApp Desk 1 (+91 77372 13615) →',
      url: 'https://wa.me/917737213615?text=Hello%20Jaipur%20Estates%2C%20I%20would%20like%20to%20inquire%20about%20Buy%20%26%20Sell%20Advisory',
    },
  },
  'Rent & Lease Advisory': {
    vertical: 'rent',
    catalogPath: '/invest',
    catalogLabel: 'View Rent & Lease Catalog →',
    items: [
      { label: 'Corporate Office Floor Plates', action: 'rent' },
      { label: 'High-Street Retail Showrooms', action: 'rent' },
      { label: 'Industrial & Warehousing Hubs', action: 'rent' },
      { label: 'Pre-Leased High-Yield Assets', action: 'rent' },
      { label: 'Tonk Road & Sitapura Zones', action: 'rent' },
    ],
    whatsapp: {
      label: 'WhatsApp Desk 2 (+91 96642 47662) →',
      url: 'https://wa.me/919664247662?text=Hello%20Jaipur%20Estates%2C%20I%20would%20like%20to%20inquire%20about%20Commercial%20Rent%20%26%20Lease%20Advisory',
    },
  },
  'Airbnb & Hospitality': {
    vertical: 'stay',
    catalogPath: '/stay',
    catalogLabel: 'Explore Airbnb Properties →',
    items: [
      { label: 'Turnkey Restored Havelis', action: 'stay' },
      { label: 'Luxury Private Pool Villas', action: 'stay' },
      { label: 'Boutique Homestays (4–8 Keys)', action: 'stay' },
      { label: 'Full 360° Hosting & Revenue Ops', action: 'stay' },
      { label: 'Bani Park & Walled City Enclaves', action: 'stay' },
    ],
    whatsapp: {
      label: 'WhatsApp Desk 3 (+91 63763 12638) →',
      url: 'https://wa.me/916376312638?text=Hello%20Jaipur%20Estates%2C%20I%20would%20like%20to%20inquire%20about%20Airbnb%20Turnkey%20and%20Hosting%20Operations',
    },
  },
};

export default function Footer() {
  const { openInquiry } = useInquiry();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavAnchor = (hash) => {
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#0f0e0d] text-stone-400 border-t border-stone-900 mt-auto">

      {/* ── Main Footer Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Column 1: Brand + Contact (span 4) */}
          <div className="lg:col-span-4">
            <Link to="/" onClick={scrollToTop} className="inline-block mb-6">
              <Logo variant="dark" />
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm mb-6">
              Jaipur's bespoke property advisory — off-market sourcing, direct owner introductions,
              commercial leasing, and turnkey Airbnb hospitality management. Zero public catalog clutter.
            </p>

            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400
                            bg-emerald-950/60 border border-emerald-900/60 px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              {OFFICE_HOURS}
            </div>

            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-terracotta-500" />
                </div>
                <span className="text-xs text-stone-400 leading-relaxed">{OFFICE_ADDRESS}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-terracotta-500" />
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xs text-stone-300 hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="border-t border-stone-800 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-500 block mb-4">
                Direct Coordinator Desks
              </span>
              <div className="space-y-2.5">
                {CONTACT_NUMBERS.map(({ number, tel, whatsapp }) => (
                  <div
                    key={number}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl
                               bg-stone-900/80 border border-stone-800 hover:border-stone-700
                               transition-colors group"
                  >
                    <a
                      href={tel}
                      className="font-mono text-sm font-bold text-stone-200 hover:text-white transition-colors"
                    >
                      {number}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <a
                        href={tel}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700
                                   text-xs font-semibold text-stone-200 transition-colors"
                      >
                        Call
                      </a>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-900/60
                                   text-emerald-400 hover:text-emerald-300 hover:bg-emerald-900/60 transition-colors flex items-center gap-1 text-xs font-semibold"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare size={12} />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2-4: Service Verticals & Sourcing Triggers */}
          {Object.entries(ADVISORY_PRACTICES).map(([category, config], idx) => (
            <div
              key={category}
              className={idx === 2 ? 'lg:col-span-2 md:col-span-1' : 'lg:col-span-3 md:col-span-1'}
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-stone-200 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {config.items.map(({ label, action }) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => openInquiry(action)}
                      className="text-sm text-stone-400 hover:text-stone-100 hover:underline transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    to={config.catalogPath}
                    onClick={scrollToTop}
                    className="text-xs text-stone-300 hover:text-white font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    {config.catalogLabel}
                  </Link>
                </li>
                <li>
                  <a
                    href={config.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-terracotta-400 hover:text-terracotta-300 font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    {config.whatsapp.label}
                  </a>
                </li>
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-stone-800 bg-[#0a0908]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 text-center md:text-left">
            © {new Date().getFullYear()} Jaipur Estates. Direct property &amp; Airbnb advisory in Jaipur, Rajasthan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-stone-300 font-medium">
            <Link to="/" onClick={scrollToTop} className="hover:text-terracotta-400 transition-colors">
              Home
            </Link>
            <button
              type="button"
              onClick={() => handleNavAnchor('#services')}
              className="hover:text-terracotta-400 transition-colors cursor-pointer"
            >
              Advisory Verticals
            </button>
            <button
              type="button"
              onClick={() => handleNavAnchor('#process')}
              className="hover:text-terracotta-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleNavAnchor('#calculator')}
              className="hover:text-terracotta-400 transition-colors cursor-pointer"
            >
              Stamp Duty Tool
            </button>
            <button
              type="button"
              onClick={() => handleNavAnchor('#contact')}
              className="hover:text-terracotta-400 transition-colors cursor-pointer"
            >
              Direct Desks
            </button>
            <Link
              to="/poster"
              onClick={scrollToTop}
              className="text-terracotta-400 hover:text-terracotta-300 font-semibold flex items-center gap-0.5 transition-colors"
            >
              Poster <ArrowUpRight size={12} />
            </Link>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-all text-xs font-semibold shadow-sm cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
