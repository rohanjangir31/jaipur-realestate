import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ExternalLink } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I verify whether a project or property in Jaipur is RERA approved and JDA sanctioned?',
    answer:
      'Under Rajasthan RERA regulations, all ongoing and new residential or commercial projects exceeding 500 sq. meters or 8 apartments must be registered on the official state portal (rera.rajasthan.gov.in). Each registered project receives a unique alphanumeric registration number (e.g., RAJ/P/2022/XXXX). On Jaipur Estates, every project with RERA registration displays a direct link and registration number. You can verify the sanctioned maps, completion dates, and promoter details directly on the Rajasthan RERA public portal. For plotted layouts, ensure the land has a valid 90A conversion and JDA layout approval lease deed (Patta).',
  },
  {
    question: 'What is the difference between Super Built-Up Area and Carpet Area under Rajasthan RERA?',
    answer:
      'Under the Real Estate (Regulation and Development) Act, carpet area is strictly defined as the net usable floor area of an apartment, excluding external walls, areas under service shafts, exclusive balcony or verandah area, and common terrace area. Super Built-Up Area traditionally includes common areas such as lift lobbies, staircases, and corridors. At Jaipur Estates, we mandate the explicit disclosure of both Net Carpet Area and Super Built-Up Area so you know exactly what usable living space you are paying for.',
  },
  {
    question: 'Can Non-Resident Indians (NRIs) and OCIs buy residential or commercial property in Jaipur?',
    answer:
      'Yes. Under RBI and FEMA guidelines, NRIs and PIOs/OCIs can freely acquire any residential or commercial real estate in Jaipur without requiring prior approval from the Reserve Bank of India. The acquisition funds must be remitted into India through normal banking channels (NRE/NRO/FCNR accounts). However, agricultural land, plantation property, and farmhouse land cannot be purchased by NRIs without specific prior permissions.',
  },
  {
    question: 'How does Jaipur Estates protect me from broker spam and fake listings?',
    answer:
      'Unlike open classified websites that sell your phone number to hundreds of third-party telemarketers, Jaipur Estates operates a closed-loop advisory model. Your inquiry is handled solely by our local Jaipur advisory desks. We verify the physical title, possession status, and owner identity before arranging any introduction or site inspection. Your personal contact details are never resold or distributed to unauthorized third parties.',
  },
  {
    question: 'What are the current stamp duty, registration fees, and state surcharges in Rajasthan?',
    answer:
      'In Rajasthan, base stamp duty is 5% for male purchasers and 4% for female purchasers (or 4.5% for joint ownership where a woman is co-owner). Additionally, the state levies a statutory 20% surcharge (Gaushala and basic infrastructure development) on the stamp duty amount, along with a 1% state registration fee on the total agreement/circle rate value. Use our interactive calculator above to estimate your total acquisition costs accurately.',
  },
  {
    question: 'How do site inspections and physical viewings work through the platform?',
    answer:
      'When you submit an inquiry on any residential or commercial property, our Jaipur desk contacts you within 24 business hours to confirm your preferred timing and specific queries. We coordinate directly with the property owner or project curator to arrange an accompanied site inspection with all title documents and sanctioned plans ready for review.',
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
        <span className="section-label">Buyer & Investor Guide</span>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Essential legal, regulatory, and procedural guidance for acquiring property or booking stays in Jaipur.
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
                  {i === 0 && (
                    <a
                      href="https://rera.rajasthan.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-terracotta-700 hover:text-terracotta-900 mt-3"
                    >
                      <span>Visit Rajasthan RERA Public Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
