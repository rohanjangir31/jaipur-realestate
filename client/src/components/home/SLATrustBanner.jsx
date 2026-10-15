import React from 'react';
import { Clock, ShieldCheck, UserCheck, FileText, ArrowRight } from 'lucide-react';

export default function SLATrustBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-7 sm:p-10 shadow-elevated border border-stone-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-400 block mb-1">
              Client Protection Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal leading-snug">
              What happens when you send an inquiry to our bureau?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 leading-relaxed">
              We operate an accountable advisory desk in Jaipur. Every inquiry is handled directly by local team members who have inspected the properties.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <a
              href="/pamphlet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-terracotta-700 hover:bg-terracotta-800 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <FileText size={15} />
              <span>1-Glance Business Prospectus</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-stone-700/80">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 text-terracotta-400">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">24-Hour Desk SLA</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                A dedicated advisor reviews your request and reaches out within 24 business hours to answer questions and schedule site inspections.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 text-terracotta-400">
              <UserCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Direct Principal Introduction</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                No middleman markup. Once title diligence is cross-checked, we introduce you directly to the verified property owner or stay host.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0 text-terracotta-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Strict Zero-Spam Policy</h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                Your contact details are encrypted and never traded or sold to telemarketers. You communicate solely with our Jaipur bureau desks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
