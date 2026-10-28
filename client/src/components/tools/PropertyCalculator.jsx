import React, { useState, useMemo } from 'react';
import {
  Calculator, TrendingUp, Building2, ShieldCheck,
  ArrowRight, Sparkles, MessageSquare, Check, Calendar,
  ChevronRight, Coins, Percent
} from 'lucide-react';
import { CONTACT_NUMBERS } from '../../utils/contact';
import { useInquiry } from '../../context/InquiryContext';

/**
 * Format number into Indian currency display (e.g., 1000000 -> "10,00,000")
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

  // Investment amount (default: 10 Lakhs)
  const [amount, setAmount] = useState(1000000);
  const [inputVal, setInputVal] = useState('10,00,000');

  // Duration in years (default: 5 years, user can select any duration 1 to 25 years)
  const [years, setYears] = useState(5);

  const [roiRate] = useState(20); // 20% annual ROI
  const [showCalculatedAlert, setShowCalculatedAlert] = useState(false);

  // Quick preset amounts
  const PRESETS_AMOUNT = [
    { label: '₹5 Lakh', val: 500000 },
    { label: '₹10 Lakh', val: 1000000 },
    { label: '₹25 Lakh', val: 2500000 },
    { label: '₹50 Lakh', val: 5000000 },
    { label: '₹1 Crore', val: 10000000 },
  ];

  // Quick preset durations in years
  const PRESETS_YEARS = [1, 2, 3, 5, 7, 10, 15, 20];

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const parsed = parseIndianNumber(raw);
    setAmount(parsed);
    setInputVal(parsed > 0 ? formatIndianNumber(parsed) : '');
  };

  const handleAmountPreset = (val) => {
    setAmount(val);
    setInputVal(formatIndianNumber(val));
    triggerCalculate();
  };

  const handleYearsChange = (val) => {
    const parsed = Math.max(1, Math.min(30, parseInt(val, 10) || 1));
    setYears(parsed);
    triggerCalculate();
  };

  const triggerCalculate = () => {
    setShowCalculatedAlert(true);
    setTimeout(() => setShowCalculatedAlert(false), 2000);
  };

  // Comprehensive calculations
  const returns = useMemo(() => {
    const validAmount = Number(amount) || 0;
    const validYears = Math.max(1, Number(years) || 1);

    const annualReturn = Math.round(validAmount * (roiRate / 100));
    const monthlyReturn = Math.round(annualReturn / 12);
    const totalReturns = Math.round(annualReturn * validYears);
    const totalMaturity = validAmount + totalReturns;
    const totalRoiPercent = Math.round((totalReturns / (validAmount || 1)) * 100);
    const capitalMultiple = validAmount > 0 ? (totalMaturity / validAmount).toFixed(1) : '1.0';

    // Milestone projections for quick comparison
    const milestones = [1, 3, 5, 10].map((yr) => {
      const ret = Math.round(annualReturn * yr);
      return {
        years: yr,
        returns: ret,
        total: validAmount + ret,
        roiPct: Math.round(roiRate * yr),
      };
    });

    return {
      investment: validAmount,
      years: validYears,
      annualReturn,
      monthlyReturn,
      totalReturns,
      totalMaturity,
      totalRoiPercent,
      capitalMultiple,
      milestones,
    };
  }, [amount, years, roiRate]);

  const waMessage = `Hello Jaipur Estates, I am interested in the Co-Working Space Project with ${roiRate}% annual ROI. My planned investment is ₹${formatIndianNumber(returns.investment)} for ${returns.years} year(s). Projected returns: ₹${formatIndianNumber(returns.totalReturns)} (Total Payout: ₹${formatIndianNumber(returns.totalMaturity)}). Please share project details.`;
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
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Calculator size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Calculate Your Returns
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  Enter your investment amount and select your preferred duration to see your returns grow.
                </p>
              </div>
            </div>

            {/* ── 1. Investment Amount Field ── */}
            <div>
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
                  className="w-full bg-stone-50/70 border border-stone-300 rounded-2xl pl-10 pr-4 py-3.5 text-lg sm:text-xl font-bold text-stone-900 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 transition-all"
                />
              </div>

              {/* Quick Preset Amount Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3">
                <span className="text-[11px] font-medium text-stone-400 mr-1">Quick Select:</span>
                {PRESETS_AMOUNT.map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => handleAmountPreset(p.val)}
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

            {/* ── 2. Investment Duration (Years Range) ── */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={13} className="text-emerald-700" />
                  <span>Investment Duration (Years)</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-extrabold text-emerald-800">
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {returns.totalRoiPercent}% ROI
                  </span>
                </div>
              </div>

              {/* Interactive Duration Slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={years}
                  onChange={(e) => handleYearsChange(e.target.value)}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-medium px-0.5">
                  <span>1 Year</span>
                  <span>5 Years</span>
                  <span>10 Years</span>
                  <span>15 Years</span>
                  <span>20 Years</span>
                </div>
              </div>

              {/* Quick Year Pill Selectors */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3">
                <span className="text-[11px] font-medium text-stone-400 mr-1">Duration:</span>
                {PRESETS_YEARS.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => handleYearsChange(yr)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      years === yr
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
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
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                <div className="text-emerald-700 mt-1">
                  <TrendingUp size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800/80 block">
                    YOUR ANNUAL RETURN
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-6xl font-extrabold text-[#1b6b50] tracking-tight">
                      20%
                    </span>
                    <span className="text-stone-600 font-medium text-xs sm:text-base">
                      per year on your investment
                    </span>
                  </div>
                </div>
              </div>

              {/* Duration Multiplier Badge */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Duration Horizon
                </span>
                <span className="text-sm font-bold text-emerald-900 bg-white/80 border border-emerald-200 px-2.5 py-1 rounded-xl mt-1">
                  {years} {years === 1 ? 'Year' : 'Years'} ({returns.capitalMultiple}x Payout)
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-emerald-200/70 my-5" />

            {/* Example Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Projected Return Example
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  {returns.totalRoiPercent}% Total Gain
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/95 rounded-2xl p-5 border border-emerald-100 shadow-sm">
                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">
                    If you invest ({years} {years === 1 ? 'yr' : 'yrs'})
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-stone-900">
                    ₹{formatIndianNumber(returns.investment)}
                  </span>
                </div>

                <div className="hidden sm:flex items-center justify-center text-stone-400">
                  <ArrowRight size={24} />
                </div>

                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">
                    Total Returns Earned
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#1b6b50]">
                    ₹{formatIndianNumber(returns.totalReturns)}
                  </span>
                </div>
              </div>

              {/* 4 Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5">
                <div className="bg-white/80 rounded-xl p-3 border border-emerald-100 text-center sm:text-left">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Monthly Payout</span>
                  <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                    ₹{formatIndianNumber(returns.monthlyReturn)}
                  </span>
                </div>

                <div className="bg-white/80 rounded-xl p-3 border border-emerald-100 text-center sm:text-left">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Annual Earning</span>
                  <span className="text-xs sm:text-sm font-bold text-stone-900 block mt-0.5">
                    ₹{formatIndianNumber(returns.annualReturn)}
                  </span>
                </div>

                <div className="bg-white/80 rounded-xl p-3 border border-emerald-100 text-center sm:text-left">
                  <span className="text-[10px] text-stone-500 block uppercase font-medium">Total Returns</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1b6b50] block mt-0.5">
                    ₹{formatIndianNumber(returns.totalReturns)}
                  </span>
                </div>

                <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200 text-center sm:text-left">
                  <span className="text-[10px] text-emerald-800 block uppercase font-bold">Total Maturity</span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-900 block mt-0.5">
                    ₹{formatIndianNumber(returns.totalMaturity)}
                  </span>
                </div>
              </div>

              {/* Duration Comparison Milestones */}
              <div className="mt-3.5 bg-white/70 rounded-xl p-3 border border-emerald-100 text-xs">
                <div className="flex items-center justify-between text-[11px] font-semibold text-stone-600 mb-2">
                  <span>Growth by Year Horizon</span>
                  <span className="text-emerald-700">Annual 20% Guaranteed</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {returns.milestones.map((m) => (
                    <div
                      key={m.years}
                      className={`p-1.5 rounded-lg border transition-all ${
                        years === m.years
                          ? 'bg-emerald-100/90 border-emerald-400 font-bold'
                          : 'bg-stone-50/80 border-stone-200/80'
                      }`}
                    >
                      <div className="text-[10px] text-stone-500">{m.years} {m.years === 1 ? 'Year' : 'Years'}</div>
                      <div className="text-xs text-stone-900 font-bold">₹{formatIndianNumber(m.total)}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">+{m.roiPct}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex flex-col sm:flex-row gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1b6b50] hover:bg-[#155a43] text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare size={16} />
              <span>Inquire for {years} {years === 1 ? 'Year' : 'Years'} Investment</span>
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
