import React, { useState } from 'react';
import {
  Printer,
  Share2,
  Download,
  Image as ImageIcon,
  FileText,
  Phone,
  MessageSquare,
  Sparkles,
  Clock,
} from 'lucide-react';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../utils/contact';
import { usePageMeta } from '../utils/usePageMeta';

export default function Poster() {
  usePageMeta({
    title: 'Jaipur Estates — Official Marketing Poster & Client Brief',
    description:
      'Executive client overview of Jaipur Estates. Buy & Sell, Rent & Lease, and Airbnb Management with transparent 1% commission.',
  });

  const [activeView, setActiveView] = useState('graphic'); // 'graphic' or 'document'

  const handlePrint = () => {
    window.print();
  };

  const whatsappShareText = encodeURIComponent(
    '🏛️ JAIPUR ESTATES — Direct Real Estate & Airbnb Advisory, Jaipur\n\n✦ Direct Owner Connections · Verified Listings\n\n• BUY & SELL: Villas, Apartments, Plots · Direct Owner Deals\n• RENT & LEASE: Offices, Retail Showrooms, Pre-Leased Spaces\n• AIRBNB MANAGEMENT: Buy Turnkey Stays · Full Hosting Operations\n\nEstimated Market Pricing (Est. ₹) · Accompanied Site Visits\n\nOpen All 7 Days (Mon–Sun, 9:00 AM – 6:00 PM IST)\nDirect Calling Lines:\n• +91 77372 13615\n• +91 96642 47662\n• +91 63763 12638'
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      {/* Top Action Bar (Hidden when printing - ZERO WEBSITE LINKS) */}
      <div className="w-full max-w-lg mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border border-stone-200 text-xs print:hidden shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium text-stone-800">Jaipur Estates · Official Poster</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Download JPG button */}
          <a
            href="/poster.jpg"
            download="JaipurEstates_Marketing_Poster.jpg"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 text-xs font-medium transition-colors"
          >
            <Download size={13} />
            <span>Download Poster (.JPG)</span>
          </a>

          {/* Print PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="btn-terracotta text-xs !py-1.5 !px-3.5 flex items-center gap-1.5 shadow"
          >
            <Printer size={13} />
            <span>Print / Save PDF</span>
          </button>

          {/* Share WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#065F46] hover:bg-[#044E39] text-white font-medium text-xs transition-colors"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* View Switcher Tabs (Hidden when printing) */}
      <div className="w-full max-w-lg mb-6 flex items-center justify-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setActiveView('graphic')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'graphic'
              ? 'bg-[#994126] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
          }`}
        >
          <ImageIcon size={13} />
          <span>Graphic Poster View</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveView('document')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'document'
              ? 'bg-[#994126] text-white shadow-md'
              : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200'
          }`}
        >
          <FileText size={13} />
          <span>Interactive Text Flyer</span>
        </button>
      </div>

      {/* ── VIEW 1: Graphic Poster (Exact Screenshot Layout in White Light Palette) ── */}
      {activeView === 'graphic' && (
        <div className="w-full max-w-lg bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-stone-200 shadow-sm bg-white">
            <img
              src="/poster.jpg"
              alt="Jaipur Estates Marketing Poster"
              className="w-full h-auto object-contain mx-auto rounded-2xl"
            />
          </div>

          <div className="w-full mt-4 flex items-center justify-between gap-3 pt-3 border-t border-stone-200">
            <span className="text-[11px] text-stone-500">
              White &amp; Light Palette (#FFFFFF, #FAF8F5, #994126)
            </span>
            <a
              href="/poster.jpg"
              download="JaipurEstates_Marketing_Poster.jpg"
              className="btn-terracotta text-xs !py-1.5 !px-3.5 flex items-center gap-1.5 shadow"
            >
              <Download size={13} />
              <span>Download (.JPG)</span>
            </a>
          </div>
        </div>
      )}

      {/* ── VIEW 2: Interactive Card View (EXACT SCREENSHOT LAYOUT IN WHITE LIGHT PALETTE) ── */}
      <div
        className={`poster-card w-full max-w-lg bg-white text-stone-900 rounded-3xl shadow-xl p-6 sm:p-8 border border-stone-200 flex flex-col items-center text-center relative overflow-hidden print:border-none print:shadow-none print:rounded-none ${
          activeView === 'graphic' ? 'hidden print:flex' : 'flex'
        }`}
      >
        {/* Subtle warm glow background accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#994126]/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Minimalist Royal Jharokha Arch Logo */}
        <div className="mb-3 relative">
          <svg className="w-12 h-12 text-[#994126]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 40V24C12 16 18 10 24 6C30 10 36 16 36 24V40" stroke="#994126" />
            <path d="M18 40V26C18 22 20 18 24 15C28 18 30 22 30 26V40" stroke="#C88A3E" strokeWidth="1.5" />
            <line x1="8" y1="40" x2="40" y2="40" stroke="#994126" strokeWidth="2" />
            <polygon points="24,2 26,5 24,7 22,5" fill="#C88A3E" />
          </svg>
        </div>

        {/* 2. Header Brand Title */}
        <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#181716] leading-none">
          JAIPUR <span className="text-[#994126]">ESTATES</span>
        </h1>
        <p className="text-xs sm:text-sm font-sans text-stone-600 mt-1.5 tracking-wide">
          Direct Real Estate &amp; Airbnb Advisory · Jaipur, Rajasthan
        </p>

        {/* 3. Prominent Trust Badge (Direct Connections - NO COMMISSION MARKS) */}
        <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#994126]/30 text-stone-800 text-xs font-mono tracking-wide shadow-sm">
          <Sparkles size={12} className="text-[#994126]" />
          <span className="text-stone-900 font-semibold">Direct Owner Connections</span>
          <span className="text-stone-600 font-normal hidden sm:inline">· Verified Listings</span>
        </div>

        {/* 4. Three Stacked Cards (Exact Format - Light Theme) */}
        <div className="w-full mt-6 space-y-3">
          {/* Box 1: BUY & SELL */}
          <div className="w-full bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 hover:border-[#994126] transition-colors text-center shadow-sm">
            <h2 className="text-lg font-serif font-bold text-stone-900 tracking-wide">
              BUY &amp; SELL
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Villas, Apartments, Plots · Direct Owner Deals
            </p>
          </div>

          {/* Box 2: RENT & LEASE */}
          <div className="w-full bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 hover:border-[#994126] transition-colors text-center shadow-sm">
            <h2 className="text-lg font-serif font-bold text-stone-900 tracking-wide">
              RENT &amp; LEASE
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Offices, Retail Showrooms, Pre-Leased Spaces
            </p>
          </div>

          {/* Box 3: AIRBNB MANAGEMENT */}
          <div className="w-full bg-[#FAF8F5] rounded-2xl p-4 border border-stone-200 hover:border-[#994126] transition-colors text-center shadow-sm">
            <h2 className="text-lg font-serif font-bold text-stone-900 tracking-wide">
              AIRBNB MANAGEMENT
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Buy Turnkey Stays · Full Hosting Operations
            </p>
          </div>
        </div>

        {/* 5. Sub-text Line */}
        <div className="mt-4 text-xs font-sans text-stone-500 tracking-wide">
          Estimated Market Pricing (Est. ₹) · Accompanied Site Visits
        </div>

        {/* 6. Bottom Contact Box */}
        <div className="w-full mt-4 p-4 rounded-2xl border border-[#994126]/30 bg-[#FAF7F2] text-center">
          <div className="text-[11px] font-mono text-[#994126] font-semibold tracking-wide uppercase mb-1">
            Open All 7 Days (Mon–Sun, 9 AM – 6 PM)
          </div>
          <div className="font-mono text-xs sm:text-sm font-bold text-stone-900 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a href="tel:+917737213615" className="hover:text-[#994126] transition-colors">
              +91 77372 13615
            </a>
            <span className="text-[#994126]">·</span>
            <a href="tel:+919664247662" className="hover:text-[#994126] transition-colors">
              +91 96642 47662
            </a>
            <span className="text-[#994126]">·</span>
            <a href="tel:+916376312638" className="hover:text-[#994126] transition-colors">
              +91 63763 12638
            </a>
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-2">
            <a
              href="tel:+917737213615"
              className="px-2.5 py-1 rounded bg-white border border-stone-200 text-[10px] text-stone-700 hover:bg-stone-50"
            >
              Call Line 1
            </a>
            <a
              href="https://wa.me/917737213615?text=Hello%20Jaipur%20Estates%2C%20I%20am%20inquiring%20about%20Jaipur%20properties"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-[#065F46] text-white text-[10px] font-medium hover:bg-[#044E39]"
            >
              WhatsApp Line 1
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
