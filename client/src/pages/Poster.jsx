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
    <div className="min-h-screen bg-[#0C0B0A] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center font-sans">
      {/* Top Action Bar (Hidden when printing - ZERO WEBSITE LINKS) */}
      <div className="w-full max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#161513] border border-stone-800 text-xs print:hidden shadow-xl">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-stone-200">Jaipur Estates · Official Marketing Poster</span>
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
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#065F46] hover:bg-[#044E39] text-white font-medium text-xs transition-colors"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* View Switcher Tabs (Hidden when printing) */}
      <div className="w-full max-w-4xl mb-6 flex items-center justify-center gap-2 print:hidden">
        <button
          type="button"
          onClick={() => setActiveView('graphic')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
            activeView === 'graphic'
              ? 'bg-[#994126] text-white shadow-md'
              : 'bg-[#161513] text-stone-400 hover:text-white border border-stone-800'
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
              : 'bg-[#161513] text-stone-400 hover:text-white border border-stone-800'
          }`}
        >
          <FileText size={13} />
          <span>Interactive 3-Column Flyer</span>
        </button>
      </div>

      {/* ── VIEW 1: Graphic Poster (Previous Format Graphic in Website Palette) ── */}
      {activeView === 'graphic' && (
        <div className="w-full max-w-xl bg-[#161513] border border-stone-800 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-2xl border border-stone-800 shadow-xl bg-[#FAF8F5]">
            <img
              src="/poster.jpg"
              alt="Jaipur Estates Marketing Poster"
              className="w-full h-auto object-contain mx-auto rounded-2xl"
            />
          </div>

          <div className="w-full mt-4 flex items-center justify-between gap-3 pt-3 border-t border-stone-800">
            <span className="text-[11px] text-stone-400">
              Editorial 3:4 Poster · Website Palette · Direct Calling
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

      {/* ── VIEW 2: Interactive 3-Column Flyer (EXACT WEBSITE PALETTE & ZERO COMMISSION) ── */}
      <div
        className={`w-full max-w-4xl bg-[#FAF8F5] text-stone-900 rounded-3xl shadow-2xl overflow-hidden border border-[#E7E5E4] print:border-none print:shadow-none print:rounded-none ${
          activeView === 'graphic' ? 'hidden print:block' : 'block'
        }`}
      >
        {/* Top Obsidian Brand Header */}
        <div className="bg-[#161513] text-stone-100 p-6 sm:p-8 border-b border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Logo variant="dark" />
            <div className="flex flex-col items-start sm:items-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#994126] text-white text-xs font-mono font-bold tracking-wide shadow-md">
                <Sparkles size={12} />
                Direct Advisory
              </span>
              <span className="text-[11px] text-[#E3A857] mt-1 font-mono">
                Open All 7 Days · Mon–Sun (9 AM – 8 PM)
              </span>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-800/80">
            <h1 className="text-xl sm:text-3xl font-serif text-white font-normal leading-snug">
              Jaipur’s Transparent Property Showcase
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
              Explore estimated market prices, connect directly with property owners, or purchase turnkey Airbnb-ready properties with complete hosting management. Zero broker markups.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Direct Owner Deals
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Market Estimates (Est. ₹)
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Turnkey Airbnb Management
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-200">
                ✓ Accompanied Site Visits
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillars Section in 3 Columns Side-by-Side */}
        <div className="p-6 sm:p-8 bg-[#FAF8F5]">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#994126] font-bold block mb-1">
              ✦ What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-semibold">
              Three Direct Services Under One Roof
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Clear, transparent real estate and hospitality solutions across Jaipur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Pillar 1: Buy & Sell */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E5E4] shadow-sm flex flex-col justify-between hover:border-[#994126] transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FDF6F3] border border-[#F5D8CD] flex items-center justify-center text-[#994126] mb-3">
                  <HomeIcon size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Buy &amp; Sell</h3>
                  <span className="text-[10px] font-mono bg-[#FDF6F3] text-[#994126] px-2 py-0.5 rounded font-medium border border-[#F5D8CD]">
                    Residential
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-1 mb-3">
                  Verified residential flats, independent duplex villas, builder floors &amp; plots in Vaishali Nagar, C-Scheme, Jagatpura, and Mansarovar.
                </p>
                <ul className="space-y-1.5 text-xs text-stone-700 border-t border-[#E7E5E4] pt-2.5">
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Transparent estimated market prices (Est. ₹)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Direct owner introductions &amp; accompanied visits</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Post property for sale with zero upfront charge</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Residential · Plots · Duplex Villas
                </span>
              </div>
            </div>

            {/* Pillar 2: Rent & Lease */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E5E4] shadow-sm flex flex-col justify-between hover:border-[#994126] transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#F4F7F5] border border-[#E5EEE7] flex items-center justify-center text-[#2C4B3A] mb-3">
                  <Building size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Rent &amp; Lease</h3>
                  <span className="text-[10px] font-mono bg-[#F4F7F5] text-[#2C4B3A] px-2 py-0.5 rounded font-medium border border-[#E5EEE7]">
                    Commercial
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-1 mb-3">
                  Commercial office plates, high-street retail showrooms, pre-leased bank branches &amp; industrial warehouses on Tonk Road, Sitapura &amp; Malviya Nagar.
                </p>
                <ul className="space-y-1.5 text-xs text-stone-700 border-t border-[#E7E5E4] pt-2.5">
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Pre-leased commercial spaces with verified rentals</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Retail showrooms in prime Jaipur business hubs</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Direct lease deed negotiation with escalation terms</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Offices · Retail · Pre-Leased Spaces
                </span>
              </div>
            </div>

            {/* Pillar 3: Airbnb Management */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E5E4] shadow-sm flex flex-col justify-between hover:border-[#994126] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#994126] text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg">
                High Growth
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FAECE6] border border-[#F5D8CD] flex items-center justify-center text-[#B65332] mb-3">
                  <BedDouble size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Airbnb Management</h3>
                  <span className="text-[10px] font-mono bg-[#FAECE6] text-[#994126] px-2 py-0.5 rounded font-medium border border-[#F5D8CD]">
                    Turnkey
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-1 mb-3">
                  Buy turnkey heritage havelis, luxury courtyard villas &amp; studio flats ready to start earning high nightly Airbnb revenue immediately.
                </p>
                <ul className="space-y-1.5 text-xs text-stone-700 border-t border-[#E7E5E4] pt-2.5">
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Purchase properties ready for Airbnb launch</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Full operations: check-in, cleaning &amp; dynamic pricing</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check size={14} className="text-[#994126] shrink-0 mt-0.5" />
                    <span>Existing homeowners: list for complete hosting ops</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-2.5 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Turnkey Purchase · Full Hosting Ops
                </span>
              </div>
            </div>
          </div>

          {/* 3-Step Simple Process Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-[#F4EFE8] border border-[#E8DDCE]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3">
              <h3 className="font-serif text-sm font-bold text-stone-900">
                How Our Direct Advisory Works
              </h3>
              <span className="text-[11px] font-mono text-stone-600 bg-white px-2.5 py-0.5 rounded-full border border-[#E8DDCE]">
                Direct Owner Transparency
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-[#E8DDCE]">
                <span className="text-[#994126] font-mono font-bold text-xs">
                  01. Browse Estimates
                </span>
                <p className="text-stone-600 text-[11px] mt-0.5">
                  Explore estimated prices, photos &amp; specs online across Jaipur.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8DDCE]">
                <span className="text-[#994126] font-mono font-bold text-xs">
                  02. Direct WhatsApp
                </span>
                <p className="text-stone-600 text-[11px] mt-0.5">
                  Connect directly with our Jaipur coordinators with zero delay.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-[#E8DDCE]">
                <span className="text-[#994126] font-mono font-bold text-xs">
                  03. Visit &amp; Close
                </span>
                <p className="text-stone-600 text-[11px] mt-0.5">
                  Accompanied on-site inspection, owner meeting &amp; clear paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Footer in Obsidian #161513 */}
        <div className="bg-[#161513] text-stone-100 p-6 sm:p-8 border-t border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                ● Direct Calling Desk · Open All 7 Days
              </span>
              <h3 className="font-serif text-xl font-normal text-white">
                Speak Directly with Our Jaipur Advisory Team
              </h3>
              <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1.5">
                <Clock size={13} className="text-[#E3A857]" />
                <span>{OFFICE_HOURS}</span>
              </p>
            </div>
            <span className="text-xs font-mono text-[#E3A857]">Jaipur, Rajasthan</span>
          </div>

          {/* 3 Clean Calling Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="bg-stone-900 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-stone-400">
                    Direct Line {index + 1}
                  </span>
                  <a
                    href={tel}
                    className="font-mono text-base font-bold text-white hover:text-[#DC9175] transition-colors block mt-0.5"
                  >
                    {number}
                  </a>
                </div>
                <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-stone-800">
                  <a
                    href={tel}
                    className="flex-1 text-center py-1 rounded bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200"
                  >
                    Call
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1 rounded bg-[#065F46] text-[#D1FAE5] text-xs font-medium hover:bg-[#044E39]"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800/80 text-[11px] text-stone-400 text-center sm:text-left leading-normal">
            <strong>Market Advisory Notice:</strong> All property valuations, prices, and rental yields are presented as estimated market indicators (&ldquo;Est. ₹&rdquo;). Direct advisory and verified property connections across Jaipur, Rajasthan.
          </div>
        </div>
      </div>
    </div>
  );
}
