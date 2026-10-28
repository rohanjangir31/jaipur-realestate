import React, { useState, useMemo } from 'react';
import {
  Calculator, TrendingUp, Building2, ShieldCheck,
  ArrowRight, Sparkles, MessageSquare, Phone, Check, RefreshCw
} from 'lucide-react';
import { CONTACT_NUMBERS } from '../../utils/contact';
import { useInquiry } from '../../context/InquiryContext';

/**
 * Format number into Indian currency display (e.g., 1000000 -> "10,00,000" or "₹10 Lakh")
 */
function formatIndianNumber(num) {
  if (num === '' || isNaN(num) || num === null || num === undefined) return '';
  const n = Number(num);
  return n.toLocaleString('en-IN');
}

function parseIndianNumber(str) {
  if (!str) return 0;
  const clean = String(str).replace(/[^0-9]/g, '');
  return clean ? parseInt(clean, 10) : 0;
}

export default function PropertyCalculator() {
  const { openInquiry } = useInquiry();
  const primaryPhone = CONTACT_NUMBERS[0];

  // Default investment amount: 10 Lakhs (from reference screenshot)
  const [amount, setAmount] = useState(1000000);
  const [inputVal, setInputVal] = useState('10,00,000');
  const [roiRate] = useState(20); // 20% annual ROI as per screenshot
  const [showCalculatedAlert, setShowCalculatedAlert] = useState(false);

  // Quick preset amounts
  const PRESETS = [
    { label: '₹5 Lakh', val: 500000 },
    { label: '₹10 Lakh', val: 1000000 },
    { label: '₹25 Lakh', val: 2500000 },
    { label: '₹50 Lakh', val: 5000000 },
    { label: '₹1 Crore', val: 10000000 },
  ];

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const parsed = parseIndianNumber(raw);
    setAmount(parsed);
    setInputVal(parsed > 0 ? formatIndianNumber(parsed) : '');
  };

  const handlePresetClick = (val) => {
    setAmount(val);
    setInputVal(formatIndianNumber(val));
    triggerCalculate();
  };

  const triggerCalculate = () => {
    setShowCalculatedAlert(true);
    setTimeout(() => setShowCalculatedAlert(false), 2000);
  };

  // Calculations
  const returns = useMemo(() => {
    const validAmount = Number(amount) || 0;
    const annualReturn = Math.round(validAmount * (roiRate / 100));
    const monthlyReturn = Math.round(annualReturn / 12);
    const threeYearReturn = annualReturn * 3;
    const fiveYearReturn = annualReturn * 5;
    const totalWealthFiveYears = validAmount + fiveYearReturn;

    return {
      investment: validAmount,
      annualReturn,
      monthlyReturn,
      threeYearReturn,
      fiveYearReturn,
      totalWealthFiveYears,
    };
  }, [amount, roiRate]);

  const waMessage = `Hello Jaipur Estates, I am interested in the Co-Working Space Project with ${roiRate}% annual ROI. My planned investment amount is ₹${formatIndianNumber(returns.investment)}. Please share more details.`;
  const waUrl = `https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="w-full">
      {/* ── Top Header Eyebrow & Title ── */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-[1px] w-8 bg-stone-300" />
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-stone-500 uppercase">
            INVESTMENT ROI CALCULATOR
          </span>
          <span className="h-[1px] w-8 bg-stone-300" />
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-stone-900 tracking-tight leading-tight">
          Invest with Us, Earn{' '}
          <span className="text-emerald-700 font-extrabold">20% ROI Annually</span>
        </h2>

        <p className="mt-4 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Be a part of our co-working space project and get a guaranteed 20% return on your investment, every year.
        </p>
      </div>

      {/* ── Main Two-Column Box ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
        {/* Left Card: Input Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-stone-200 p-7 sm:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Calculate Your Returns
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  Enter your investment amount to see how much you can earn with 20% annual ROI.
                </p>
              </div>
            </div>

            {/* Input Label & Field */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Investment Amount
              </label>

              <div className="relative flex items-center">
                <span className="absolute left-4 text-lg font-semibold text-stone-500 select-none">
                  ₹
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={handleInputChange}
                  placeholder="10,00,000"
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-2xl pl-10 pr-4 py-4 text-lg sm:text-xl font-bold text-stone-900 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-[11px] font-medium text-stone-400 mr-1">Quick Select:</span>
                {PRESETS.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => handlePresetClick(p.val)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      amount === p.val
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={triggerCalculate}
              className="w-full bg-[#1b6b50] hover:bg-[#155a43] active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Calculate Returns</span>
              {showCalculatedAlert && <Check size={18} className="animate-scaleIn" />}
            </button>
          </div>
        </div>

        {/* Right Card: Output & Example Display */}
        <div className="lg:col-span-6 bg-[#F2FAF6] rounded-3xl border border-emerald-100/90 p-7 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Top Stat Row */}
            <div className="flex items-start gap-4 mb-3">
              <div className="text-emerald-700 mt-1">
                <TrendingUp size={36} strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800/80 block">
                  YOUR ANNUAL RETURN
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl sm:text-6xl font-extrabold text-[#1b6b50] tracking-tight">
                    20%
                  </span>
                  <span className="text-stone-600 font-medium text-sm sm:text-base">
                    per year on your investment
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-emerald-200/70 my-6" />

            {/* Example Section */}
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-3">
                Example
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 rounded-2xl p-5 border border-emerald-100 shadow-sm">
                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">If you invest</span>
                  <span className="text-xl sm:text-2xl font-bold text-stone-900">
                    ₹{formatIndianNumber(returns.investment)}
                  </span>
                </div>

                <div className="hidden sm:flex items-center justify-center text-stone-400">
                  <ArrowRight size={24} />
                </div>

                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">You earn</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#1b6b50]">
                    ₹{formatIndianNumber(returns.annualReturn)}
                  </span>
                  <span className="text-xs text-stone-500 ml-1.5 font-medium">per year</span>
                </div>
              </div>

              {/* Monthly & Multi-Year Breakdown */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white/70 rounded-xl p-3.5 border border-emerald-100">
                  <span className="text-[11px] text-stone-500 block">Monthly Payout</span>
                  <span className="text-sm sm:text-base font-bold text-stone-900">
                    ₹{formatIndianNumber(returns.monthlyReturn)} <span className="text-xs font-normal text-stone-500">/ mo</span>
                  </span>
                </div>
                <div className="bg-white/70 rounded-xl p-3.5 border border-emerald-100">
                  <span className="text-[11px] text-stone-500 block">3-Year Total Returns</span>
                  <span className="text-sm sm:text-base font-bold text-[#1b6b50]">
                    ₹{formatIndianNumber(returns.threeYearReturn)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-4 border-t border-emerald-200/60 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1b6b50] hover:bg-[#155a43] text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare size={16} />
              <span>Inquire About Co-Working Project</span>
            </a>
            <button
              type="button"
              onClick={() => openInquiry('buy')}
              className="bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles size={15} className="text-amber-600" />
              <span>Register Requirement</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom 4 Feature Pills / Badges ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-stone-200">
        {/* Badge 1: Attractive Returns */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 font-extrabold text-lg shrink-0">
            %
          </div>
          <div>
            <div className="font-bold text-stone-900 text-xs sm:text-sm">Attractive Returns</div>
            <div className="text-[11px] sm:text-xs text-stone-500">20% annual ROI</div>
          </div>
        </div>

        {/* Badge 2: Growing Asset */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <div className="font-bold text-stone-900 text-xs sm:text-sm">Growing Asset</div>
            <div className="text-[11px] sm:text-xs text-stone-500">Co-working space project</div>
          </div>
        </div>

        {/* Badge 3: Secure Investment */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="font-bold text-stone-900 text-xs sm:text-sm">Secure Investment</div>
            <div className="text-[11px] sm:text-xs text-stone-500">Transparent &amp; reliable</div>
          </div>
        </div>

        {/* Badge 4: Long Term Value */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-stone-200 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
            <svg
              className="w-5 h-5 text-emerald-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0l-2 2" />
              <path d="m18 10 1.4-1.4a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6" />
              <path d="m3 11 2.4-2.4a1 1 0 0 1 1.4 0l2.3 2.3" />
              <path d="m7 15 2 2a1 1 0 0 0 1.4 0l2-2" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-stone-900 text-xs sm:text-sm">Long Term Value</div>
            <div className="text-[11px] sm:text-xs text-stone-500">Be part of a sustainable future</div>
          </div>
        </div>
      </div>
    </div>
  );
}
