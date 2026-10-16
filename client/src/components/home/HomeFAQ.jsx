import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { CONTACT_NUMBERS } from '../../utils/contact';

const FAQS = [
  {
    question: 'What fees or advisory charges apply?',
    answer:
      'We operate with complete fee transparency on successfully completed transactions only. There are zero upfront listing charges, zero subscription fees, and no hidden markups.',
  },
  {
    question: 'How do you assist with Buy & Sell across Jaipur?',
    answer:
      'For buyers, we curate verified residential flats, duplex villas, and plots across top Jaipur localities — Vaishali Nagar, Jagatpura, Mansarovar, and C-Scheme. For owners and sellers, we showcase your property to vetted buyers and coordinate site visits directly, without intermediary confusion.',
  },
  {
    question: 'Can I buy a property and run it on Airbnb with your help?',
    answer:
      'Yes. Jaipur is one of India\'s highest-demand tourism markets. We curate turnkey Airbnb-ready villas, heritage havelis, and studio apartments. You can buy the asset, and our team connects you with professional homestay management to handle guest hosting, housekeeping, and calendar operations.',
  },
  {
    question: 'How does Rent & Lease work for commercial spaces?',
    answer:
      'We provide verified market estimates for commercial offices, retail high-street shops, and warehouses. We assist both property owners and prospective tenants with direct introductions, property walkthroughs, and clear lease deed documentation.',
  },
  {
    question: 'Are all prices on the website final or estimated?',
    answer:
      'All figures shown on the website are estimated market prices ("Est."). These serve as reliable reference benchmarks. Final figures are always finalized directly between the buyer and owner during inspection and mutually agreed paperwork.',
  },
  {
    question: 'How do I schedule a site visit or speak with your team?',
    answer:
      'Our direct calling lines and WhatsApp are open all 7 days of the week from 9:00 AM to 6:00 PM IST. Click "Inquire Now" on any property or call us directly to schedule a convenient viewing time.',
  },
  {
    question: 'Is this a booking platform or a property directory?',
    answer:
      'JaipurEstates is a read-only property directory and advisory platform. We do not process payments or bookings online. All transactions, pricing negotiations, and agreements happen directly between the buyer, seller, owner, or tenant — facilitated by our local coordinators.',
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const primaryPhone = CONTACT_NUMBERS[0];

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Two-column layout: header + accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Header */}
          <div className="lg:col-span-4">
            <span className="section-label mb-3">Helpful Information</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-950 leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8">
              Clear, honest answers about our direct advisory, Buy &amp; Sell, Airbnb management,
              and Rent &amp; Lease in Jaipur.
            </p>

            {/* Contact prompt */}
            <div className="bg-[#161513] rounded-2xl p-6 text-sm">
              <p className="text-stone-400 leading-relaxed mb-4">
                Can't find what you're looking for? Reach us directly on WhatsApp.
              </p>
              <a
                href={`https://wa.me/${primaryPhone.cleanNumber}?text=Hello%20Jaipur%20Estates%2C%20I%20have%20a%20question`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white
                           bg-terracotta-700 hover:bg-terracotta-800
                           px-4 py-2.5 rounded-xl transition-all"
              >
                <MessageSquare size={13} /> Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden
                                ${isOpen
                                  ? 'border-terracotta-200 shadow-lift'
                                  : 'border-stone-200 hover:border-stone-300 shadow-soft'}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between text-left
                                 px-6 py-5 gap-4 focus:outline-none group"
                    >
                      <span className={`font-semibold text-sm sm:text-base transition-colors ${
                        isOpen ? 'text-terracotta-700' : 'text-stone-900 group-hover:text-terracotta-700'
                      }`}>
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                                    border transition-all duration-200 ${
                          isOpen
                            ? 'bg-terracotta-700 border-terracotta-700 text-white rotate-180'
                            : 'bg-stone-100 border-stone-200 text-stone-500'
                        }`}
                      >
                        <ChevronDown size={15} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 animate-fadeIn">
                        <div className="border-t border-stone-100 pt-4">
                          <p className="text-stone-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
