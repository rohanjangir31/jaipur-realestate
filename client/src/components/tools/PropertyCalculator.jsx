import React, { useState } from 'react';
import { Calculator, HelpCircle, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

export default function PropertyCalculator() {
  const [mode, setMode] = useState('stamp'); // 'stamp' | 'yield'

  // Stamp Duty State
  const [propertyPrice, setPropertyPrice] = useState(8500000); // Default ₹85 Lakh
  const [buyerGender, setBuyerGender] = useState('male'); // 'male' (5%), 'female' (4%), 'joint' (4.5%)

  // Yield State
  const [assetValue, setAssetValue] = useState(18000000); // ₹1.8 Cr
  const [monthlyRent, setMonthlyRent] = useState(108000); // ₹1.08 Lakh/mo

  // Calculation for Rajasthan Stamp Duty
  // Standard Rajasthan Rates: Male: 5%, Female: 4%, Joint: 4.5%
  // Surcharge (Gaushala / Infra surcharge): 20% on Stamp Duty amount
  // Registration Fee: 1% of property value (capped at ₹4 Lakhs for standard residential deeds)
  const stampRate = buyerGender === 'female' ? 0.04 : buyerGender === 'joint' ? 0.045 : 0.05;
  const baseStampDuty = propertyPrice * stampRate;
  const surcharge = baseStampDuty * 0.20; // 20% on stamp duty in Rajasthan
  const totalStampDuty = baseStampDuty + surcharge;
  const registrationFee = Math.min(propertyPrice * 0.01, 400000);
  const totalGovernmentFee = totalStampDuty + registrationFee;
  const effectivePct = propertyPrice > 0 ? ((totalGovernmentFee / propertyPrice) * 100).toFixed(2) : 0;

  // Calculation for Commercial Yield
  const annualRent = monthlyRent * 12;
  const grossYield = assetValue > 0 ? ((annualRent / assetValue) * 100).toFixed(2) : 0;

  return (
    <div className="border border-stone-200 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-terracotta-600 block mb-1">
            Financial Planning Tools
          </span>
          <h3 className="font-serif text-2xl text-stone-900 font-normal">
            Rajasthan Stamp Duty & Commercial Yield Estimator
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Accurate statutory calculations based on current Government of Rajasthan registration schedules.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-stone-100 p-1 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('stamp')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'stamp'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Stamp Duty & Registration
          </button>
          <button
            type="button"
            onClick={() => setMode('yield')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === 'yield'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Commercial Rental Yield
          </button>
        </div>
      </div>

      {mode === 'stamp' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Inputs */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Agreement Value / Circle Rate Value (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  min="500000"
                  step="100000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="input-field pl-8 font-mono text-sm"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[4500000, 8500000, 16500000, 25000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPropertyPrice(val)}
                    className="text-[11px] px-2 py-1 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded text-stone-600"
                  >
                    {formatINR(val)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Primary Buyer Category (Rajasthan Concession Schedule)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'male', label: 'Male Buyer (5%)', sub: 'Standard rate' },
                  { id: 'female', label: 'Female Buyer (4%)', sub: '1% State rebate' },
                  { id: 'joint', label: 'Joint (M + F) (4.5%)', sub: 'Blended rate' },
                ].map(({ id, label, sub }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setBuyerGender(id)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      buyerGender === id
                        ? 'border-terracotta-700 bg-amber-50/40 text-stone-900 font-medium'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    <div className="text-xs font-semibold">{label}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              * Calculations include base stamp duty, 20% Rajasthan Gaushala & Infrastructure development surcharge on the stamp amount, and 1% state registration charges. DLC/Circle rate thresholds may apply.
            </p>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono font-medium text-stone-500 uppercase tracking-wider block mb-1">
                Estimated Government Charges
              </span>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {formatINR(totalGovernmentFee)}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                ≈ {effectivePct}% of agreement value
              </div>

              <div className="space-y-2.5 mt-5 pt-4 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Base Stamp Duty ({stampRate * 100}%):</span>
                  <span className="font-mono font-medium text-stone-900">{formatINR(baseStampDuty)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>State Surcharges (20% on duty):</span>
                  <span className="font-mono font-medium text-stone-900">{formatINR(surcharge)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Registration Fee (1%):</span>
                  <span className="font-mono font-medium text-stone-900">{formatINR(registrationFee)}</span>
                </div>
                <div className="flex justify-between text-stone-900 font-semibold pt-2 border-t border-stone-200">
                  <span>Total All-In Acquisition:</span>
                  <span className="font-mono text-terracotta-800">{formatINR(propertyPrice + totalGovernmentFee)}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-1.5">
              <HelpCircle size={13} className="text-terracotta-600 shrink-0" />
              <span>Need help verifying Jaipur circle rates? Call Desk 1: +91 77372 13615</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Inputs for Yield */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Total Commercial Asset Purchase Price (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  min="1000000"
                  step="500000"
                  value={assetValue}
                  onChange={(e) => setAssetValue(Math.max(0, Number(e.target.value)))}
                  className="input-field pl-8 font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1.5">
                Monthly Rental Inflow (₹ / month)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-stone-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                  className="input-field pl-8 font-mono text-sm"
                />
              </div>
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              * Gross Rental Yield = (Annual Rental Inflow ÷ Total Asset Purchase Price) × 100. High-street retail in Jaipur typically yields 6.5% – 7.5%, while industrial warehouses range from 8.0% – 9.0%.
            </p>
          </div>

          {/* Results Summary Box for Yield */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono font-medium text-stone-500 uppercase tracking-wider block mb-1">
                Gross Pre-Tax Rental Yield
              </span>
              <div className="text-3xl font-serif font-bold text-emerald-800">
                {grossYield}% <span className="text-sm font-sans font-normal text-stone-600">p.a.</span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Annual Rental Revenue: <span className="font-mono font-semibold text-stone-800">{formatINR(annualRent)}</span>
              </div>

              <div className="space-y-2 mt-5 pt-4 border-t border-stone-200 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Monthly Inflow:</span>
                  <span className="font-mono text-stone-900">{formatINR(monthlyRent)} / mo</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Payback Period (Gross):</span>
                  <span className="font-mono text-stone-900">{grossYield > 0 ? (100 / grossYield).toFixed(1) : 0} Years</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Benchmark High-Street Jaipur:</span>
                  <span className="font-mono text-stone-900">6.8% - 7.5%</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-1.5">
              <HelpCircle size={13} className="text-terracotta-600 shrink-0" />
              <span>Explore pre-leased bank branches. Call Desk 2: +91 96642 47662</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
