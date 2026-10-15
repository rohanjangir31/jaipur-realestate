import React, { useState } from 'react';
import { Phone, MessageSquare, X, Clock, Sparkles } from 'lucide-react';
import { CONTACT_NUMBERS, OFFICE_HOURS, OFFICE_ADDRESS } from '../../utils/contact';

export default function QuickContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden font-sans">
      {/* Popover Card */}
      {open && (
        <div className="mb-3 w-[340px] sm:w-[360px] bg-[#161513] text-stone-200 border border-stone-800 rounded-2xl shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between border-b border-stone-800 pb-3">
            <div>
              <div className="flex items-center gap-1.5 text-terracotta-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Standard 1% Commission</span>
              </div>
              <h3 className="font-serif text-lg text-white font-medium mt-0.5">
                Direct Calling Lines
              </h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed">
            Connect directly with our local coordinators. Open all 7 days for Buy &amp; Sell, commercial Rent &amp; Lease, and Airbnb inquiries.
          </p>

          {/* Direct Lines without job tags */}
          <div className="space-y-2.5">
            {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
              <div
                key={number}
                className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <a
                    href={tel}
                    className="inline-flex items-center gap-2 text-sm font-mono font-medium text-stone-100 hover:text-terracotta-400 transition-colors"
                  >
                    <Phone size={13} className="text-terracotta-500" />
                    <span>{number}</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <a
                      href={tel}
                      className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors"
                    >
                      Call
                    </a>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/80 text-xs font-medium transition-colors"
                    >
                      <MessageSquare size={12} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Clock size={11} /> {OFFICE_HOURS}
            </span>
            <span>{OFFICE_ADDRESS.split(',')[0]}</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 bg-[#161513] text-stone-100 hover:text-white border border-stone-700 hover:border-terracotta-500 px-4 py-2.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-terracotta-600 to-terracotta-700 text-white flex items-center justify-center text-xs shadow-sm group-hover:scale-105 transition-transform">
          <Phone size={12} />
        </div>
        <span className="text-xs font-medium tracking-wide">
          Direct Calling Lines
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>
    </div>
  );
}
