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
  Clock,
} from 'lucide-react';
import Logo from '../components/ui/Logo';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../utils/contact';
import { usePageMeta } from '../utils/usePageMeta';

export default function Poster() {
  usePageMeta({
    title: 'Jaipur Estates — Official Marketing Poster & Client Brief',
    description:
      'Executive client overview of Jaipur Estates. Buy & Sell, Rent & Lease, and Airbnb Management.',
  });

  const [activeView, setActiveView] = useState('graphic'); // 'graphic' or 'document'

  const handlePrint = () => {
    window.print();
  };

  const whatsappShareText = encodeURIComponent(
    '🏛️ JAIPUR ESTATES — Direct Real Estate & Airbnb Advisory, Jaipur\n\n• Buy & Sell | Rent & Lease | Airbnb Management\n• Direct Owner Deals & Market Price Estimates (Est. ₹)\n• Open All 7 Days (Mon–Sun, 9:00 AM – 8:00 PM IST)\n\nDirect Calling Lines:\n• +91 77372 13615\n• +91 96642 47662\n• +91 63763 12638'
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292725] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      {/* Top Action Bar (Hidden when printing - ZERO WEBSITE LINKS) */}
      <div className="w-full max-w-xl mb-4 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#181716] border border-[#3D3A37] text-xs print:hidden shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-[#FAF8F5]">Marketing Brief · Jaipur Estates</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Download JPG button */}
          <a
            href="/poster.jpg"
            download="JaipurEstates_Marketing_Poster.jpg"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#292725] hover:bg-[#3D3A37] text-[#FAF8F5] border border-[#3D3A37] text-xs font-medium transition-colors"
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
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#2C4B3A] hover:bg-[#223C2E] text-white font-medium text-xs transition-colors"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* View Switcher Tabs (Hidden when printing) */}
      <div className="w-full max-w-xl mb-4 flex items-center justify-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setActiveView('graphic')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'graphic'
              ? 'bg-[#994126] text-white shadow-md'
              : 'bg-white text-[#57534E] hover:text-[#181716] border border-[#E8DDCE]'
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
              : 'bg-white text-[#57534E] hover:text-[#181716] border border-[#E8DDCE]'
          }`}
        >
          <FileText size={13} />
          <span>Interactive Text Flyer</span>
        </button>
      </div>

      {/* ── VIEW 1: Graphic Poster (Moderate, Crisp Dimensions) ── */}
      {activeView === 'graphic' && (
        <div className="w-full max-w-lg bg-white border border-[#E8DDCE] rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-[#E8DDCE] shadow-md bg-[#FAF8F5]">
            <img
              src="/poster.jpg"
              alt="Jaipur Estates Marketing Poster"
              className="w-full max-h-[620px] object-contain mx-auto rounded-2xl"
            />
          </div>

          <div className="w-full mt-4 flex items-center justify-between gap-3 pt-3 border-t border-[#E8DDCE]">
            <span className="text-[11px] text-[#7E5C41]">
              Refined Website Color Palette · Clean Numbers
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

      {/* ── VIEW 2: Compact Interactive Flyer (WEBSITE PALETTE & ZERO COMMISSION MARKS) ── */}
      <div
        className={`w-full max-w-xl bg-white text-[#292725] rounded-3xl shadow-xl overflow-hidden border border-[#E8DDCE] print:border-none print:shadow-none print:rounded-none ${
          activeView === 'graphic' ? 'hidden print:block' : 'block'
        }`}
      >
        {/* Compact Charcoal & Terracotta Header */}
        <div className="bg-[#181716] text-[#FAF8F5] p-5 sm:p-6 border-b border-[#292725]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Logo variant="dark" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E3A857] font-medium block">
                  Direct Property &amp; Airbnb Advisory
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#994126] text-white text-[11px] font-mono font-bold shadow-sm">
                <Sparkles size={11} />
                Direct Advisory
              </span>
              <div className="text-[10px] font-mono text-[#D7C4AC] mt-0.5">Jaipur, Rajasthan</div>
            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#292725]">
            <h1 className="text-base sm:text-lg font-serif text-white font-normal leading-snug">
              Jaipur’s Transparent Property &amp; Airbnb Showcase
            </h1>
            <p className="text-[#D7C4AC] text-xs mt-1 leading-relaxed">
              Estimated market pricing, direct owner introductions, and turnkey Airbnb hospitality across Jaipur.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
              <span className="px-2.5 py-0.5 rounded-md bg-[#292725] border border-[#3D3A37] text-[#FAF8F5]">
                ✓ Direct Owner Deals
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#292725] border border-[#3D3A37] text-[#FAF8F5]">
                ✓ Market Estimates (Est. ₹)
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#292725] border border-[#3D3A37] text-[#FAF8F5]">
                ✓ Open All 7 Days
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#292725] border border-[#3D3A37] text-[#FAF8F5]">
                ✓ Accompanied Visits
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Services in Website Sandstone Theme */}
        <div className="p-5 sm:p-6 space-y-3 bg-[#FAF8F5]">
          {/* Buy & Sell */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDCE] shadow-sm hover:border-[#994126] transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FDF6F3] border border-[#F5D8CD] flex items-center justify-center text-[#994126] shrink-0 mt-0.5">
                <HomeIcon size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base font-bold text-[#181716]">Buy &amp; Sell</h2>
                    <span className="text-[10px] font-mono bg-[#FDF6F3] text-[#994126] px-1.5 py-0.5 rounded font-medium border border-[#F5D8CD]">
                      Residential
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7E5C41] font-semibold">Direct Owner Access</span>
                </div>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Apartments, luxury duplex villas, builder floors &amp; residential plots across prime Jaipur localities (Vaishali Nagar, C-Scheme, Jagatpura). Direct owner meetings with transparent paperwork.
                </p>
              </div>
            </div>
          </div>

          {/* Rent & Lease */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDCE] shadow-sm hover:border-[#994126] transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F4F7F5] border border-[#E5EEE7] flex items-center justify-center text-[#2C4B3A] shrink-0 mt-0.5">
                <Building size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base font-bold text-[#181716]">Rent &amp; Lease</h2>
                    <span className="text-[10px] font-mono bg-[#F4F7F5] text-[#2C4B3A] px-1.5 py-0.5 rounded font-medium border border-[#E5EEE7]">
                      Commercial
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7E5C41] font-semibold">Clear Lease Deeds</span>
                </div>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Grade-A office plates, high-street retail showrooms &amp; pre-leased bank spaces on Tonk Road, Sitapura &amp; Malviya Nagar. Transparent lease structuring with clear escalation clauses.
                </p>
              </div>
            </div>
          </div>

          {/* Airbnb Management */}
          <div className="bg-white rounded-2xl p-4 border border-[#E8DDCE] shadow-sm hover:border-[#994126] transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FAECE6] border border-[#F5D8CD] flex items-center justify-center text-[#B65332] shrink-0 mt-0.5">
                <BedDouble size={16} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-base font-bold text-[#181716]">Airbnb Management</h2>
                    <span className="text-[10px] font-mono bg-[#FAECE6] text-[#994126] px-1.5 py-0.5 rounded font-medium border border-[#F5D8CD]">
                      Turnkey
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#7E5C41] font-semibold">Full Hosting Ops</span>
                </div>
                <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                  Buy turnkey heritage havelis, luxury courtyard villas &amp; studio flats ready to launch on Airbnb. Full host operations: guest check-in, professional housekeeping &amp; revenue optimization.
                </p>
              </div>
            </div>
          </div>

          {/* 3-Step Process Strip */}
          <div className="p-3 rounded-xl bg-[#F4EFE8] border border-[#E8DDCE] flex items-center justify-between text-[11px] text-[#57534E]">
            <span className="font-bold text-[#181716]">Advisory Process:</span>
            <span className="flex items-center gap-1.5 font-medium flex-wrap">
              <span><strong className="text-[#994126]">1.</strong> Direct Inquiry</span>
              <span>→</span>
              <span><strong className="text-[#994126]">2.</strong> On-Site Inspection</span>
              <span>→</span>
              <span><strong className="text-[#994126]">3.</strong> Direct Owner Closing</span>
            </span>
          </div>
        </div>

        {/* Contact Footer in Charcoal & Sage */}
        <div className="bg-[#181716] text-[#FAF8F5] p-5 sm:p-6 border-t border-[#292725]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                ● Direct Calling Desk · Open All 7 Days
              </span>
              <div className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5">
                <Clock size={13} className="text-[#DC9175]" />
                <span>{OFFICE_HOURS}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#D7C4AC]">Jaipur, Rajasthan</span>
          </div>

          {/* 3 Clean Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="bg-[#201F1D] border border-[#3D3A37] rounded-xl p-2.5 flex items-center justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono text-[#A8A29E] block uppercase">
                    Line {index + 1}
                  </span>
                  <a
                    href={tel}
                    className="font-mono text-xs sm:text-sm font-bold text-white hover:text-[#DC9175] transition-colors"
                  >
                    {number}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <a
                    href={tel}
                    className="px-2 py-0.5 rounded bg-[#292725] text-[10px] text-stone-200 hover:bg-[#3D3A37]"
                  >
                    Call
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-[#2C4B3A] text-emerald-300 border border-[#436D55] text-[10px]"
                  >
                    WA
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-[#292725] text-[10px] text-[#A8A29E] text-center sm:text-left leading-normal">
            All prices displayed are estimated market benchmarks (&ldquo;Est. ₹&rdquo;). Direct advisory and verified property connections.
          </div>
        </div>
      </div>
    </div>
  );
}
