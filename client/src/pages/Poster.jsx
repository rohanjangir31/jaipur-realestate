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
  Home as HomeIcon,
  Building,
  BedDouble,
  Check,
  CalendarCheck,
  Clock,
} from 'lucide-react';
import Logo from '../components/ui/Logo';
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
    '🏛️ JAIPUR ESTATES — Direct Real Estate & Airbnb Advisory, Jaipur\n\n• Standard 1% Transparent Commission (No Hidden Fees)\n• Buy & Sell | Rent & Lease | Airbnb Management\n• Open All 7 Days (Mon–Sun, 9:00 AM – 8:00 PM IST)\n\nDirect Calling Lines:\n• +91 77372 13615\n• +91 96642 47662\n• +91 63763 12638'
  );

  return (
    <div className="min-h-screen bg-[#0D0C0B] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      {/* Top Action Bar (Hidden when printing - ZERO WEBSITE LINKS) */}
      <div className="w-full max-w-2xl mb-4 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#181715] border border-stone-800 text-xs print:hidden shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-stone-200">Marketing Poster</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Download JPG button */}
          <a
            href="/poster.jpg"
            download="JaipurEstates_Marketing_Poster.jpg"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-medium transition-colors"
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
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* View Switcher Tabs (Hidden when printing) */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setActiveView('graphic')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'graphic'
              ? 'bg-terracotta-700 text-white shadow-md'
              : 'bg-[#181715] text-stone-400 hover:text-white border border-stone-800'
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
              ? 'bg-terracotta-700 text-white shadow-md'
              : 'bg-[#181715] text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <FileText size={13} />
          <span>Interactive Text Flyer</span>
        </button>
      </div>

      {/* ── VIEW 1: Graphic Poster (Moderate, Crisp Dimensions) ── */}
      {activeView === 'graphic' && (
        <div className="w-full max-w-lg bg-[#161513] border border-stone-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-stone-800 shadow-xl">
            <img
              src="/poster.jpg"
              alt="Jaipur Estates Marketing Poster"
              className="w-full max-h-[620px] object-contain mx-auto rounded-2xl"
            />
          </div>

          <div className="w-full mt-4 flex items-center justify-between gap-3 pt-3 border-t border-stone-800">
            <span className="text-[11px] text-stone-400">
              Clean 3:4 Poster · No Website Links · Clean Numbers
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

      {/* ── VIEW 2: Compact Interactive Flyer (NO GIGANTIC PICTURES, ZERO WEB LINKS) ── */}
      <div
        className={`w-full max-w-2xl bg-[#FAF8F5] text-stone-900 rounded-3xl shadow-2xl overflow-hidden border border-stone-300 print:border-none print:shadow-none print:rounded-none ${
          activeView === 'graphic' ? 'hidden print:block' : 'block'
        }`}
      >
        {/* Compact Obsidian Header */}
        <div className="bg-[#161513] text-stone-100 p-5 sm:p-7 border-b border-stone-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Logo variant="dark" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-terracotta-400 font-medium block">
                  Direct Property &amp; Airbnb Advisory
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-terracotta-700 text-white text-[11px] font-mono font-bold shadow">
                <Sparkles size={11} />
                1% Commission
              </span>
              <div className="text-[10px] font-mono text-stone-400 mt-0.5">No Hidden Fees</div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-stone-800/80">
            <h1 className="text-lg sm:text-xl font-serif text-white font-normal leading-snug">
              Direct Real Estate &amp; Airbnb Solutions in Jaipur
            </h1>
            <p className="text-stone-300 text-xs mt-1 leading-relaxed">
              Transparent market price estimates, direct owner meetings, and turnkey Airbnb setup with zero broker markups.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200">
                ✓ 1% Standard Fee
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Market Estimates (Est. ₹)
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Open All 7 Days
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Direct Owners
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Services */}
        <div className="p-5 sm:p-7 space-y-3.5">
          {/* Buy & Sell */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-terracotta-500 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-terracotta-700 shrink-0 mt-0.5">
                <HomeIcon size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base font-bold text-stone-900">Buy &amp; Sell</h2>
                  <span className="text-[10px] font-mono bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-medium">
                    Residential
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Apartments, luxury duplex villas, builder floors &amp; residential plots across prime Jaipur localities. Direct owner meetings &amp; accompanied visits.
                </p>
              </div>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-terracotta-700 font-semibold bg-stone-50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded border sm:border-0 border-stone-200">
              1% Closing Fee
            </div>
          </div>

          {/* Rent & Lease */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-terracotta-500 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                <Building size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base font-bold text-stone-900">Rent &amp; Lease</h2>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-medium">
                    Commercial
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Grade-A office plates, high-street retail showrooms &amp; pre-leased bank branches on Tonk Road, Sitapura &amp; Malviya Nagar. Clear lease deeds.
                </p>
              </div>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-terracotta-700 font-semibold bg-stone-50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded border sm:border-0 border-stone-200">
              1% Closing Fee
            </div>
          </div>

          {/* Airbnb Management */}
          <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-terracotta-500 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                <BedDouble size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base font-bold text-stone-900">Airbnb Management</h2>
                  <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-medium">
                    Turnkey
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Buy turnkey heritage havelis, luxury courtyard villas &amp; studio flats ready to launch on Airbnb. Full host operations: check-in, cleaning &amp; revenue optimization.
                </p>
              </div>
            </div>
            <div className="shrink-0 font-mono text-[11px] text-terracotta-700 font-semibold bg-stone-50 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded border sm:border-0 border-stone-200">
              Turnkey Setup
            </div>
          </div>

          {/* 3-Step Process Strip */}
          <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between gap-2 text-[11px] text-stone-700">
            <span className="font-bold text-stone-900">Advisory Process:</span>
            <span className="flex items-center gap-1.5 flex-wrap">
              <span><strong className="text-terracotta-700">1.</strong> Inquire Direct</span>
              <span>→</span>
              <span><strong className="text-terracotta-700">2.</strong> On-Site Inspection</span>
              <span>→</span>
              <span><strong className="text-terracotta-700">3.</strong> 1% Success Closing</span>
            </span>
          </div>
        </div>

        {/* Contact Footer (ZERO WEBSITE LINKS) */}
        <div className="bg-[#161513] text-stone-100 p-5 sm:p-6 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                ● Direct Calling Desk · Open All 7 Days
              </span>
              <div className="text-sm font-medium text-white flex items-center gap-1.5">
                <Clock size={13} className="text-terracotta-400" />
                <span>{OFFICE_HOURS}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-stone-400">Jaipur, Rajasthan</span>
          </div>

          {/* 3 Clean Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="bg-stone-900 border border-stone-800 rounded-xl p-2.5 flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-stone-400 block uppercase">
                    Line {index + 1}
                  </span>
                  <a
                    href={tel}
                    className="font-mono text-xs sm:text-sm font-bold text-white hover:text-terracotta-400 transition-colors"
                  >
                    {number}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={tel}
                    className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-200 hover:bg-stone-700"
                  >
                    Call
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 text-[10px]"
                  >
                    WA
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-stone-800/80 text-[10px] text-stone-400 text-center sm:text-left leading-normal">
            All prices displayed are estimated market benchmarks (&ldquo;Est. ₹&rdquo;). Standard 1% commission on successful closing.
          </div>
        </div>
      </div>
    </div>
  );
}
