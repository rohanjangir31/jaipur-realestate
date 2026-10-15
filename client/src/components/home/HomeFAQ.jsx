import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'What is your listing and brokerage commission?',
    answer:
      'We operate on a transparent, standard 1% listing and brokerage commission on successfully completed transactions. There are zero upfront listing charges, zero subscription fees, and no hidden markups.',
  },
  {
    question: 'How do you assist with Buy & Sell across Jaipur?',
    answer:
      'For buyers, we curate verified residential flats, duplex villas, and plots across top Jaipur localities like Vaishali Nagar, Jagatpura, Mansarovar, and C-Scheme. For owners and sellers, we showcase your property to vetted buyers and coordinate site visits directly without intermediary confusion.',
  },
  {
    question: 'Can I purchase a property and run it on Airbnb with your management?',
    answer:
      'Yes. Jaipur is one of India’s highest-demand tourism markets. We curate turnkey Airbnb-ready villas, heritage havelis, and studio apartments. You can buy the asset, and our team connects you with professional homestay management to handle guest hosting, housekeeping, and calendar operations.',
  },
  {
    question: 'How does Rent & Lease work for residential and commercial spaces?',
    answer:
      'We provide verified market estimates for commercial offices, retail high-street shops, and warehouses. We assist both property owners and prospective tenants with direct introductions, property walkthroughs, and clear lease deed documentation.',
  },
  {
    question: 'Are all property prices displayed on the website final or estimated?',
    answer:
      'All figures shown on the website are estimated market prices ("Est."). These serve as reliable reference benchmarks. Final figures are always finalized directly between the buyer and owner during inspection and mutually agreed paperwork.',
  },
  {
    question: 'How do I schedule a site visit or speak with your team?',
    answer:
      'Our direct calling lines and WhatsApp are open all 7 days of the week from 9:00 AM to 6:00 PM IST. Click "Inquire Now" on any property or call us directly to schedule a convenient viewing time.',
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-stone-200">
      <div className="max-w-2xl mb-12">
        <span className="section-label">Helpful Information</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Clear answers regarding our 1% commission, Buy & Sell, Airbnb management, and Rent & Lease in Jaipur.
        </p>
      </div>

      <div className="max-w-4xl divide-y divide-stone-200 border-y border-stone-200">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="py-5">
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-start justify-between text-left gap-4 focus:outline-none group"
              >
                <span className="font-serif text-lg font-medium text-stone-900 group-hover:text-terracotta-800 transition-colors">
                  {faq.question}
                </span>
                <span
                  className={`mt-1 p-1 rounded-full border border-stone-200 text-stone-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-stone-100 text-stone-900' : ''
                  }`}
                >
                  <ChevronDown size={16} />
                </span>
              </button>

              {isOpen && (
                <div className="mt-3.5 pr-8 text-sm text-stone-600 leading-relaxed animate-fadeIn">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
