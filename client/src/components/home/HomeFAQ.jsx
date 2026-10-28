import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { CONTACT_NUMBERS } from '../../utils/contact';

const FAQS = [
  {
    question: 'Do you charge any upfront fees or registration charges?',
    answer:
      'No. There are zero upfront listing fees, zero registration charges, and no hidden costs. We operate with complete transparency and only work on successfully completed deals.',
  },
  {
    question: 'How do you help with buying or selling property in Jaipur?',
    answer:
      'For buyers, we find verified houses, flats, villas, and land plots based on your requirements. For property owners and sellers, we connect your property directly with genuine buyers and arrange site visits without any middlemen confusion.',
  },
  {
    question: 'Can I buy a property and earn rental income on Airbnb?',
    answer:
      'Yes. Jaipur has strong tourist demand throughout the year. We help you find villas, heritage havelis, and apartments that are ideal for Airbnb. We can also connect you with experienced local teams to handle guest check-ins, cleaning, and day-to-day hosting.',
  },
  {
    question: 'How does Rent and Lease work for commercial offices and shops?',
    answer:
      'We help businesses find offices, shops, and commercial spaces with fair market rates. For property owners, we connect you with reliable tenants and assist with complete rent agreement paperwork.',
  },
  {
    question: 'Are the property prices shown on the website final?',
    answer:
      'All prices shown on the website are estimated market prices based on current Jaipur rates. The final price is always agreed directly between buyer and seller during property inspection.',
  },
  {
    question: 'How do I arrange a property visit or speak with your team?',
    answer:
      'Our team is available all 7 days a week from 9:00 AM to 6:00 PM IST. You can click "Inquire Now" or call/WhatsApp our direct coordinator numbers to schedule a visit.',
  },
  {
    question: 'Can I make payments or book properties directly on this website?',
    answer:
      'No. This website is for direct consultation and inquiries. We do not collect online payments. All deals, paperwork, and payments happen directly between the buyer, seller, owner, or tenant, with our team guiding you at every step.',
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const primaryPhone = CONTACT_NUMBERS[0];

  return (
    <section className="py-24 bg-[#FAF8F5] border-t border-stone-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* Two-column layout: header + accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: Header */}
          <div className="lg:col-span-4">
            <span className="section-label mb-3">Helpful Information</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-950 leading-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-stone-500 text-base leading-relaxed mb-8">
              Clear and simple answers to help you with buying, selling, renting, or Airbnb in Jaipur.
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
