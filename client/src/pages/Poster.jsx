import React from 'react';
import {
  Printer,
  Share2,
  ExternalLink,
  Phone,
  MessageSquare,
  Sparkles,
  Home as HomeIcon,
  Building,
  BedDouble,
  Check,
  CalendarCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Logo from '../components/ui/Logo';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../utils/contact';
import { usePageMeta } from '../utils/usePageMeta';

export default function Poster() {
  usePageMeta({
    title: 'Jaipur Estates — Official Marketing Poster & Client Prospectus',
    description:
      'Executive client overview of Jaipur Estates. Buy & Sell, Rent & Lease, and Airbnb Management with transparent 1% commission.',
  });

  const handlePrint = () => {
    window.print();
  };

  const whatsappShareText = encodeURIComponent(
    'Explore Jaipur Estates — Buy & Sell, Rent & Lease, and Airbnb Management in Jaipur with transparent 1% commission.\n\nView Website: https://client-five-delta-81.vercel.app\nView Client Poster: https://client-five-delta-81.vercel.app/poster.html\n\nDirect Phone Lines (Open All 7 Days):\n• +91 77372 13615\n• +91 96642 47662\n• +91 63763 12638'
  );

  return (
    <div className="min-h-screen bg-[#0D0C0B] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      {/* Action Bar (Hidden when printing) */}
      <div className="w-full max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#181715] border border-stone-800 text-xs print:hidden shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-stone-200">Client Marketing Poster</span>
          <span className="text-stone-500 hidden sm:inline">· 1-Glance Business Overview</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="btn-terracotta text-xs !py-1.5 !px-3.5 flex items-center gap-1.5 shadow"
          >
            <Printer size={13} />
            <span>Print / Save PDF</span>
          </button>
          <a
            href={`https://wa.me/?text=${whatsappShareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium text-xs transition-colors"
          >
            <Share2 size={13} />
            <span>Share on WhatsApp</span>
          </a>
          <a
            href="/poster.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs transition-colors"
          >
            <span>Raw HTML</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Main Poster Container */}
      <div className="w-full max-w-4xl bg-[#FAF8F5] text-stone-900 rounded-3xl shadow-2xl overflow-hidden border border-stone-300 print:border-none print:shadow-none print:rounded-none">
        {/* Top Dark Header */}
        <div className="bg-[#161513] text-stone-100 p-6 sm:p-10 border-b border-stone-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <Logo variant="dark" />
            <div className="flex flex-col items-start sm:items-end">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-terracotta-700 text-white text-xs font-mono font-bold tracking-wide shadow-md">
                <Sparkles size={12} />
                Standard 1% Listing Commission
              </span>
              <span className="text-[11px] text-stone-400 mt-1 font-mono">
                Open All 7 Days · Mon–Sun (9 AM – 8 PM)
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800/80">
            <h1 className="text-2xl sm:text-4xl font-serif text-white font-normal leading-snug">
              Jaipur’s Transparent Real Estate &amp; Airbnb Advisory
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-2.5 max-w-2xl leading-relaxed">
              A clean, read-only property directory. Explore verified market price estimates, connect directly with property owners, or purchase turnkey Airbnb-ready properties with complete hosting management.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700 font-medium">
                ✓ 1% Standard Commission
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700 font-medium">
                ✓ Estimated Market Prices (Est. ₹)
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700 font-medium">
                ✓ Turnkey Airbnb Management
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-200 border border-stone-700 font-medium">
                ✓ 7 Days a Week Direct Calling
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pillars Section */}
        <div className="p-6 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-terracotta-700 font-bold block mb-1">
              ✦ What We Do
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 font-semibold">
              Three Direct Services Under One Roof
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Clear, transparent real estate and hospitality solutions across Jaipur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Buy & Sell */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-terracotta-500 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-terracotta-700 mb-4">
                  <HomeIcon size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Buy &amp; Sell</h3>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                    1% Fee
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 mb-4">
                  Verified residential flats, independent duplex villas, penthouses, and plots in prime Jaipur localities like Vaishali Nagar, C-Scheme, Jagatpura, and Mansarovar.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Transparent estimated market prices (Est. ₹)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Direct owner introductions &amp; accompanied visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Post your property for sale with zero upfront charge</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Residential · Plots · Penthouses
                </span>
              </div>
            </div>

            {/* Pillar 2: Rent & Lease */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-terracotta-500 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 mb-4">
                  <Building size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Rent &amp; Lease</h3>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                    1% Fee
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 mb-4">
                  Commercial office plates, high-street retail showrooms, pre-leased bank branches, and industrial warehouses in prime Jaipur business corridors.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Pre-leased commercial spaces with proven rentals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Prime showrooms on Tonk Road, Sitapura &amp; Malviya Nagar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Direct lease deed negotiation with escalation clauses</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Offices · Retail · Pre-Leased Spaces
                </span>
              </div>
            </div>

            {/* Pillar 3: Airbnb Management */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-terracotta-500 transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-terracotta-700 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-bl-lg">
                High Growth
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
                  <BedDouble size={20} />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Airbnb Management</h3>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-medium">
                    Turnkey
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mt-2 mb-4">
                  Buy turnkey heritage havelis, luxury courtyard villas, and boutique studio apartments ready to start earning high nightly Airbnb revenue immediately.
                </p>
                <ul className="space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Purchase properties ready for instant Airbnb launch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Full host operations: check-in, housekeeping &amp; calendar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={14} className="text-terracotta-600 shrink-0 mt-0.5" />
                    <span>Existing homeowners: list your space for management</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100 text-center">
                <span className="text-[11px] font-mono text-stone-500">
                  Turnkey Purchase · Full Hosting Ops
                </span>
              </div>
            </div>
          </div>

          {/* 3 Simple Steps */}
          <div className="mt-10 p-6 rounded-2xl bg-stone-100 border border-stone-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                How Our Direct Advisory Works
              </h3>
              <span className="text-xs font-mono text-stone-600 bg-white px-3 py-1 rounded-full border border-stone-200">
                Standard 1% Commission on Successful Deals
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-terracotta-700 font-mono font-bold text-sm">
                  01. Browse Catalog
                </span>
                <p className="text-stone-600 mt-1">
                  Explore estimated prices, photos, and specs online across Jaipur.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-terracotta-700 font-mono font-bold text-sm">
                  02. 1-Click WhatsApp
                </span>
                <p className="text-stone-600 mt-1">
                  Click &ldquo;Inquire Now&rdquo; on any listing to chat with our Jaipur coordinators directly.
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200">
                <span className="text-terracotta-700 font-mono font-bold text-sm">
                  03. Visit &amp; Close
                </span>
                <p className="text-stone-600 mt-1">
                  Accompanied on-site inspection, owner meeting, and transparent 1% closing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Footer (Clean Numbers Only, Direct Call & WhatsApp) */}
        <div className="bg-[#161513] text-stone-100 p-6 sm:p-10 border-t border-stone-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                ● Direct Calling Lines · Open All 7 Days
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Connect Directly with our Jaipur Advisory Team
              </h3>
              <p className="text-xs text-stone-400 mt-1 flex items-center gap-1.5">
                <Clock size={13} className="text-terracotta-400" />
                <span>{OFFICE_HOURS}</span>
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-mono text-terracotta-400 block">Official Website</span>
              <span className="text-sm font-mono font-semibold text-white">
                client-five-delta-81.vercel.app
              </span>
            </div>
          </div>

          {/* 3 Clean Calling Lines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                    Direct Line {index + 1}
                  </span>
                  <a
                    href={tel}
                    className="font-mono text-base sm:text-lg font-bold text-white hover:text-terracotta-400 transition-colors block mt-1"
                  >
                    {number}
                  </a>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-800">
                  <a
                    href={tel}
                    className="flex-1 text-center py-1.5 px-3 rounded bg-stone-800 hover:bg-stone-700 text-xs font-medium text-stone-200"
                  >
                    Call
                  </a>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-3 rounded bg-emerald-950/80 border border-emerald-900/50 hover:bg-emerald-900/80 text-xs font-medium text-emerald-400"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t border-stone-800/70 text-[11px] text-stone-400 leading-relaxed text-center sm:text-left">
            <strong>Advisory &amp; Market Notice:</strong> JaipurEstates operates as an inquiry-driven, read-only property directory for Jaipur, Rajasthan. All property valuations, prices, and rental yields are presented as estimated market indicators (&ldquo;Est. ₹&rdquo;). Final price, lease covenants, and terms are mutually agreed upon during in-person visits directly between buyers, sellers, tenants, and owners. Standard 1% listing and brokerage commission applies upon closing. No commitments or future returns are guaranteed.
          </div>
        </div>
      </div>
    </div>
  );
}
