import React, { useState, useMemo, useCallback } from 'react';
import {
  TrendingUp, Building2, TreePine, ArrowRight, Sparkles, Copy, Check,
  HelpCircle, Layers, Coins, Calendar, Percent, ShieldCheck, Phone,
  ChevronDown, ChevronUp, MapPin
} from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { useInquiry } from '../../context/InquiryContext';
import { CONTACT_NUMBERS } from '../../utils/contact';

/**
 * JAIPUR MICRO-MARKET BENCHMARK PRESETS
 * Realistic baseline parameters across top Jaipur land investment hubs.
 */
const JAIPUR_PRESETS = [
  {
    id: 'ajmer-road',
    name: 'Ajmer Road (SEZ / JDA)',
    areaGaj: 250,
    rateGaj: 28000,
    appreciationRate: 14,
    horizon: 5,
    tag: 'High Growth Corridor',
  },
  {
    id: 'jagatpura',
    name: 'Jagatpura Ext. (Ring Road)',
    areaGaj: 200,
    rateGaj: 45000,
    appreciationRate: 13,
    horizon: 5,
    tag: 'Prime Residential',
  },
  {
    id: 'tonk-road',
    name: 'Tonk Road (Commercial Belt)',
    areaGaj: 500,
    rateGaj: 58000,
    appreciationRate: 15,
    horizon: 5,
    tag: 'Commercial / Pre-Leased',
  },
  {
    id: 'delhi-highway',
    name: 'Delhi Highway / Kukas',
    areaGaj: 1000,
    rateGaj: 14000,
    appreciationRate: 11,
    horizon: 5,
    tag: 'Farmstay & Resort Land',
  },
  {
    id: 'sirsi-road',
    name: 'Sirsi Road / Bindayaka',
    areaGaj: 150,
    rateGaj: 22000,
    appreciationRate: 12,
    horizon: 3,
    tag: 'Budget Gated Township',
  },
];

/**
 * DEVELOPMENT TYPOLOGIES (FOR BUY & DEVELOP MODE)
 */
const DEV_TYPES = [
  {
    id: 'villa',
    label: 'Duplex Villa',
    desc: 'Independent luxury residence',
    builtUpMultiplier: 1.2, // built-up relative to plot
    constructionRateSqFt: 2200,
    expectedMonthlyRentRatio: 0.0035, // ~0.35% monthly rent on total cost (~4.2% gross yield)
  },
  {
    id: 'farmstay',
    label: 'Farmstay / Villa Stay',
    desc: 'Airbnb hospitality stay',
    builtUpMultiplier: 0.8,
    constructionRateSqFt: 2500,
    expectedMonthlyRentRatio: 0.0065, // ~0.65% monthly on cost (~7.8% hospitality yield)
  },
  {
    id: 'commercial',
    label: 'Commercial Showroom',
    desc: 'High-street retail or office',
    builtUpMultiplier: 1.5,
    constructionRateSqFt: 2800,
    expectedMonthlyRentRatio: 0.006, // ~0.60% monthly on cost (~7.2% commercial yield)
  },
  {
    id: 'warehouse',
    label: 'Industrial Shed',
    desc: 'Storage / logistics on highway',
    builtUpMultiplier: 0.7,
    constructionRateSqFt: 1400,
    expectedMonthlyRentRatio: 0.0075, // ~0.75% monthly on cost (~9.0% industrial yield)
  },
];

export default function PropertyCalculator() {
  const { openInquiry } = useInquiry();

  // Mode: 'appreciation' (Buy & Hold) | 'develop' (Buy & Build / Yield) | 'subdivision' (Plotted Colony)
  const [strategy, setStrategy] = useState('appreciation');

  // Measurement unit: 'gaj' (Sq. Yards) | 'sqft' (Sq. Feet) — 1 Gaj = 9 Sq Ft
  const [unit, setUnit] = useState('gaj');

  // Common Land Inputs
  const [areaGaj, setAreaGaj] = useState(250); // in Sq. Yards (Gaj)
  const [ratePerGaj, setRatePerGaj] = useState(28000); // in ₹ per Sq. Yard (Gaj)
  const [includeStatutory, setIncludeStatutory] = useState(true); // Rajasthan Stamp Duty (~6.5%) + Due Diligence
  const [landPrepCost, setLandPrepCost] = useState(150000); // Boundary wall, levelling, gate (₹)
  const [holdingYears, setHoldingYears] = useState(5); // 1, 2, 3, 5, 7, 10
  const [annualAppreciation, setAnnualAppreciation] = useState(14); // % per year

  // Buy & Develop Specific Inputs
  const [devTypeId, setDevTypeId] = useState('villa');
  const [customBuiltUpSqFt, setCustomBuiltUpSqFt] = useState(2400);
  const [constructionRateSqFt, setConstructionRateSqFt] = useState(2200);
  const [expectedMonthlyRent, setExpectedMonthlyRent] = useState(65000);

  // Sub-division / Colonization Specific Inputs
  const [parcelSizeGaj, setParcelSizeGaj] = useState(5000);
  const [rawLandRateGaj, setRawLandRateGaj] = useState(15000);
  const [infraCostPerGaj, setInfraCostPerGaj] = useState(2500); // Roads, transformer, sewage
  const [saleableRatioPct, setSaleableRatioPct] = useState(65); // JDA 35% deduction
  const [targetPlotSaleRateGaj, setTargetPlotSaleRateGaj] = useState(38000);

  // UI state
  const [showYearlyBreakdown, setShowYearlyBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // Apply a Jaipur micro-market preset
  const applyPreset = (preset) => {
    setAreaGaj(preset.areaGaj);
    setRatePerGaj(preset.rateGaj);
    setAnnualAppreciation(preset.appreciationRate);
    setHoldingYears(preset.horizon);
  };

  // Convert display area according to selected unit
  const displayArea = unit === 'gaj' ? areaGaj : areaGaj * 9;
  const displayRate = unit === 'gaj' ? ratePerGaj : Math.round(ratePerGaj / 9);

  const handleAreaChange = (val) => {
    const num = Math.max(1, Number(val) || 0);
    setAreaGaj(unit === 'gaj' ? num : Math.round(num / 9));
  };

  const handleRateChange = (val) => {
    const num = Math.max(0, Number(val) || 0);
    setRatePerGaj(unit === 'gaj' ? num : Math.round(num * 9));
  };

  // ─────────────────────────────────────────────────────────────
  // FINANCIAL CALCULATIONS
  // ─────────────────────────────────────────────────────────────

  // Strategy 1: Buy & Hold (Land Appreciation)
  const buyAndHoldModel = useMemo(() => {
    const baseLandCost = areaGaj * ratePerGaj;
    // Rajasthan statutory charges: ~5% stamp duty + 20% surcharge on stamp duty (1%) + 1% registration = ~7%
    // Plus legal due diligence / title search ₹50,000
    const stampRate = 0.065;
    const statutoryCharges = includeStatutory ? Math.round(baseLandCost * stampRate) : 0;
    const legalDueDiligence = includeStatutory ? 50000 : 0;
    const totalStatutory = statutoryCharges + legalDueDiligence;

    const totalCapitalDeployed = baseLandCost + totalStatutory + (Number(landPrepCost) || 0);

    // Compounded future land value: FV = PV * (1 + r)^t
    const futureLandValue = Math.round(
      baseLandCost * Math.pow(1 + annualAppreciation / 100, holdingYears)
    );
    // Boundary wall/improvements retain residual value (~75%)
    const improvementResidual = Math.round((Number(landPrepCost) || 0) * 0.75);
    const projectedExitValue = futureLandValue + improvementResidual;

    const netProfit = projectedExitValue - totalCapitalDeployed;
    const totalRoiPct = totalCapitalDeployed > 0 ? (netProfit / totalCapitalDeployed) * 100 : 0;

    // CAGR = (FV / PV)^(1/t) - 1
    const cagr =
      totalCapitalDeployed > 0 && holdingYears > 0
        ? (Math.pow(projectedExitValue / totalCapitalDeployed, 1 / holdingYears) - 1) * 100
        : 0;

    // Year-by-year compounding progression
    const yearlyProgression = [];
    for (let yr = 1; yr <= holdingYears; yr++) {
      const yrVal = Math.round(baseLandCost * Math.pow(1 + annualAppreciation / 100, yr));
      const yrProfit = yrVal - totalCapitalDeployed;
      yearlyProgression.push({
        year: yr,
        value: yrVal,
        profit: yrProfit,
        roiPct: totalCapitalDeployed > 0 ? ((yrProfit / totalCapitalDeployed) * 100).toFixed(1) : '0',
      });
    }

    return {
      baseLandCost,
      totalStatutory,
      landPrepCost: Number(landPrepCost) || 0,
      totalCapitalDeployed,
      projectedExitValue,
      netProfit,
      totalRoiPct,
      cagr,
      yearlyProgression,
    };
  }, [areaGaj, ratePerGaj, includeStatutory, landPrepCost, holdingYears, annualAppreciation]);

  // Strategy 2: Buy & Develop (Land + Construction / Rental Yield)
  const buyAndDevelopModel = useMemo(() => {
    const baseLandCost = areaGaj * ratePerGaj;
    const statutoryCost = includeStatutory ? Math.round(baseLandCost * 0.065 + 50000) : 0;
    const constructionCost = (Number(customBuiltUpSqFt) || 0) * (Number(constructionRateSqFt) || 0);
    const totalProjectCost = baseLandCost + statutoryCost + constructionCost;

    const annualRent = (Number(expectedMonthlyRent) || 0) * 12;
    const grossRentalYield = totalProjectCost > 0 ? (annualRent / totalProjectCost) * 100 : 0;

    // Over holding period: cumulative rental cashflow + asset appreciation
    const totalRentalIncomeEarned = annualRent * holdingYears;
    // Land appreciates at annualAppreciation rate
    const futureLandValue = Math.round(
      baseLandCost * Math.pow(1 + annualAppreciation / 100, holdingYears)
    );
    // Building depreciates at 1.5% per year, or appreciates with inflation (conservative: 1% dep)
    const depreciatedBuildingValue = Math.round(
      constructionCost * Math.max(0.6, 1 - 0.01 * holdingYears)
    );
    const projectedExitAssetValue = futureLandValue + depreciatedBuildingValue;

    // Total wealth created = Future Asset Value + Cumulative Rent - Total Project Cost
    const totalWealthCreated = projectedExitAssetValue + totalRentalIncomeEarned - totalProjectCost;
    const combinedRoiPct = totalProjectCost > 0 ? (totalWealthCreated / totalProjectCost) * 100 : 0;
    const paybackPeriodYears = annualRent > 0 ? (totalProjectCost / annualRent).toFixed(1) : '—';

    return {
      baseLandCost,
      statutoryCost,
      constructionCost,
      totalProjectCost,
      annualRent,
      grossRentalYield,
      totalRentalIncomeEarned,
      projectedExitAssetValue,
      totalWealthCreated,
      combinedRoiPct,
      paybackPeriodYears,
    };
  }, [
    areaGaj, ratePerGaj, includeStatutory, customBuiltUpSqFt, constructionRateSqFt,
    expectedMonthlyRent, holdingYears, annualAppreciation
  ]);

  // Strategy 3: Plotted Colony / Sub-Division Development
  const subDivisionModel = useMemo(() => {
    const rawLandCost = parcelSizeGaj * rawLandRateGaj;
    const totalInfraCost = parcelSizeGaj * (Number(infraCostPerGaj) || 0);
    // JDA layout approval & statutory fees: ~₹150/Gaj
    const approvalFee = Math.round(parcelSizeGaj * 150);
    const totalProjectInvestment = rawLandCost + totalInfraCost + approvalFee;

    // Saleable area after 35% JDA road/park deduction
    const saleableGaj = Math.round(parcelSizeGaj * (saleableRatioPct / 100));
    const grossRealization = saleableGaj * (Number(targetPlotSaleRateGaj) || 0);

    const netDeveloperProfit = grossRealization - totalProjectInvestment;
    const developerMarginPct = grossRealization > 0 ? (netDeveloperProfit / grossRealization) * 100 : 0;
    const projectRoiPct = totalProjectInvestment > 0 ? (netDeveloperProfit / totalProjectInvestment) * 100 : 0;

    return {
      rawLandCost,
      totalInfraCost,
      approvalFee,
      totalProjectInvestment,
      saleableGaj,
      grossRealization,
      netDeveloperProfit,
      developerMarginPct,
      projectRoiPct,
    };
  }, [parcelSizeGaj, rawLandRateGaj, infraCostPerGaj, saleableRatioPct, targetPlotSaleRateGaj]);

  // Copy Calculation Summary to Clipboard
  const handleCopySummary = useCallback(() => {
    let summaryText = '';
    if (strategy === 'appreciation') {
      summaryText = `[JAIPUR ESTATES - LAND INVESTMENT ROI MODEL]
Strategy: Buy & Hold (Land Capital Appreciation)
• Plot Size: ${areaGaj} Sq. Yards (Gaj) [≈ ${(areaGaj * 9).toLocaleString()} Sq. Ft]
• Purchase Rate: ₹${ratePerGaj.toLocaleString()}/Gaj
• Base Land Outlay: ${formatINR(buyAndHoldModel.baseLandCost, false)}
• Statutory & Closing: ${formatINR(buyAndHoldModel.totalStatutory, false)}
• Boundary/Prep Cost: ${formatINR(buyAndHoldModel.landPrepCost, false)}
• Total Capital Deployed: ${formatINR(buyAndHoldModel.totalCapitalDeployed, false)}
• Holding Horizon: ${holdingYears} Years @ ${annualAppreciation}% p.a. expected growth
• Projected Exit Valuation: ${formatINR(buyAndHoldModel.projectedExitValue, false)}
• Net Wealth Created: ${formatINR(buyAndHoldModel.netProfit, false)}
• Total ROI: ${buyAndHoldModel.totalRoiPct.toFixed(1)}% | CAGR: ${buyAndHoldModel.cagr.toFixed(1)}% p.a.
Modeled via Jaipur Estates Land Advisory Portal`;
    } else if (strategy === 'develop') {
      summaryText = `[JAIPUR ESTATES - LAND & DEVELOPMENT ROI MODEL]
Strategy: Buy & Develop (Construction + Rental Yield)
• Land Size: ${areaGaj} Gaj @ ₹${ratePerGaj.toLocaleString()}/Gaj (${formatINR(buyAndDevelopModel.baseLandCost, false)})
• Built-Up: ${customBuiltUpSqFt} Sq. Ft @ ₹${constructionRateSqFt}/Sq. Ft (${formatINR(buyAndDevelopModel.constructionCost, false)})
• Total Project Outlay: ${formatINR(buyAndDevelopModel.totalProjectCost, false)}
• Expected Monthly Rent: ${formatINR(expectedMonthlyRent, false)}/mo (${formatINR(buyAndDevelopModel.annualRent, false)}/yr)
• Gross Rental Yield: ${buyAndDevelopModel.grossRentalYield.toFixed(2)}% p.a.
• ${holdingYears}-Year Asset Valuation: ${formatINR(buyAndDevelopModel.projectedExitAssetValue, false)}
• Total Combined Wealth: ${formatINR(buyAndDevelopModel.totalWealthCreated, false)} (${buyAndDevelopModel.combinedRoiPct.toFixed(1)}% Combined ROI)
Modeled via Jaipur Estates Land Advisory Portal`;
    } else {
      summaryText = `[JAIPUR ESTATES - PLOTTED TOWNSHIP SUB-DIVISION MODEL]
Strategy: Plotted Sub-Division Development
• Land Parcel: ${parcelSizeGaj.toLocaleString()} Gaj @ ₹${rawLandRateGaj.toLocaleString()}/Gaj (${formatINR(subDivisionModel.rawLandCost, false)})
• Development & Infrastructure: ${formatINR(subDivisionModel.totalInfraCost, false)}
• Total Project Outlay: ${formatINR(subDivisionModel.totalProjectInvestment, false)}
• Saleable Plotted Area (65% JDA ratio): ${subDivisionModel.saleableGaj.toLocaleString()} Gaj
• Projected Retail Plot Rate: ₹${targetPlotSaleRateGaj.toLocaleString()}/Gaj
• Gross Sales Realization: ${formatINR(subDivisionModel.grossRealization, false)}
• Net Developer Profit: ${formatINR(subDivisionModel.netDeveloperProfit, false)} (${subDivisionModel.developerMarginPct.toFixed(1)}% Margin | ${subDivisionModel.projectRoiPct.toFixed(1)}% ROI)
Modeled via Jaipur Estates Land Advisory Portal`;
    }

    navigator.clipboard?.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  }, [
    strategy, areaGaj, ratePerGaj, holdingYears, annualAppreciation,
    buyAndHoldModel, buyAndDevelopModel, subDivisionModel,
    customBuiltUpSqFt, constructionRateSqFt, expectedMonthlyRent,
    parcelSizeGaj, rawLandRateGaj, targetPlotSaleRateGaj
  ]);

  // Direct WhatsApp Consultation Link
  const whatsappUrl = useMemo(() => {
    let msg = '';
    if (strategy === 'appreciation') {
      msg = `Hello Jaipur Estates, I modeled a land investment on your portal:
• Plot Size: ${areaGaj} Gaj in Jaipur
• Total Outlay: ${formatINR(buyAndHoldModel.totalCapitalDeployed, false)}
• Projected ${holdingYears}-Year Net Profit: ${formatINR(buyAndHoldModel.netProfit, false)} (${buyAndHoldModel.totalRoiPct.toFixed(1)}% ROI)
I would like to explore verified land options with clear JDA titles matching this budget.`;
    } else if (strategy === 'develop') {
      msg = `Hello Jaipur Estates, I modeled a Land + Development project:
• Land: ${areaGaj} Gaj (${formatINR(buyAndDevelopModel.baseLandCost, false)})
• Total Outlay: ${formatINR(buyAndDevelopModel.totalProjectCost, false)}
• Target Monthly Rent: ${formatINR(expectedMonthlyRent, false)} (${buyAndDevelopModel.grossRentalYield.toFixed(1)}% yield)
Can you assist in sourcing suitable land with construction feasibility in Jaipur?`;
    } else {
      msg = `Hello Jaipur Estates, I am evaluating a ${parcelSizeGaj.toLocaleString()} Gaj plotted township development in Jaipur with an estimated project cost of ${formatINR(subDivisionModel.totalProjectInvestment, false)}. I would like to consult your land acquisition desk.`;
    }
    return `https://wa.me/917737213615?text=${encodeURIComponent(msg)}`;
  }, [strategy, areaGaj, holdingYears, buyAndHoldModel, buyAndDevelopModel, expectedMonthlyRent, parcelSizeGaj, subDivisionModel]);

  return (
    <div className="border border-stone-200 bg-white rounded-3xl p-6 sm:p-10 shadow-sm transition-all duration-300">

      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-stone-100">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-terracotta-700 bg-terracotta-50 border border-terracotta-200/60 px-3 py-1 rounded-full">
              <Coins size={12} /> Land & Capital Advisory
            </span>
            <span className="text-xs text-stone-400 font-medium hidden sm:inline">•</span>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              Jaipur Micro-Market Financial Modeler
            </span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight">
            Land Investment & Development <span className="text-terracotta-700">ROI Calculator</span>
          </h3>
          <p className="text-sm text-stone-500 mt-2 leading-relaxed">
            Model land acquisition capital, development costs, appreciation rates, and projected returns across Jaipur's key investment corridors.
          </p>
        </div>

        {/* Strategy Switcher */}
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-2xl self-start lg:self-center border border-stone-200/80">
          <button
            type="button"
            onClick={() => setStrategy('appreciation')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              strategy === 'appreciation'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <TrendingUp size={14} className={strategy === 'appreciation' ? 'text-terracotta-700' : 'text-stone-400'} />
            <span>Buy & Hold (Appreciation)</span>
          </button>

          <button
            type="button"
            onClick={() => setStrategy('develop')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              strategy === 'develop'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 size={14} className={strategy === 'develop' ? 'text-terracotta-700' : 'text-stone-400'} />
            <span>Buy & Develop (Yield)</span>
          </button>

          <button
            type="button"
            onClick={() => setStrategy('subdivision')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              strategy === 'subdivision'
                ? 'bg-white text-stone-900 shadow-sm font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Layers size={14} className={strategy === 'subdivision' ? 'text-terracotta-700' : 'text-stone-400'} />
            <span>Plot Sub-Division</span>
          </button>
        </div>
      </div>

      {/* ── JAIPUR PRESET HOTSPOTS ── */}
      {strategy !== 'subdivision' && (
        <div className="pt-6 pb-4">
          <div className="flex items-center gap-2 mb-2.5">
            <MapPin size={13} className="text-terracotta-600" />
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Quick Benchmarks (Jaipur Prime Corridors)
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {JAIPUR_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-100 hover:border-stone-300 text-xs font-medium text-stone-700 transition-all cursor-pointer"
              >
                <span className="font-semibold text-stone-900">{preset.name}</span>
                <span className="text-[11px] text-terracotta-700 font-mono">₹{(preset.rateGaj / 1000).toFixed(0)}k/Gaj</span>
                <span className="text-[10px] bg-stone-200/70 text-stone-600 px-1.5 py-0.5 rounded-md font-semibold">
                  {preset.appreciationRate}% p.a.
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN WORKSPACE (INPUTS + OUTPUT SUMMARY) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">

        {/* ── LEFT COLUMN: INPUT CONTROLS (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-6">

          {/* SECTION A: STRATEGY 1 & 2 INPUTS */}
          {strategy !== 'subdivision' ? (
            <>
              {/* Plot Area & Unit Toggle */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Plot Measurement & Area
                  </label>
                  {/* Unit Toggle */}
                  <div className="inline-flex rounded-lg bg-stone-200/80 p-0.5 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setUnit('gaj')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        unit === 'gaj' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-600'
                      }`}
                    >
                      Sq. Yards (Gaj)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('sqft')}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        unit === 'sqft' ? 'bg-white text-stone-900 shadow-sm font-bold' : 'text-stone-600'
                      }`}
                    >
                      Sq. Feet
                    </button>
                  </div>
                </div>

                {/* Input with slider */}
                <div>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="50"
                        step={unit === 'gaj' ? 25 : 225}
                        value={displayArea}
                        onChange={(e) => handleAreaChange(e.target.value)}
                        className="input-field font-mono font-bold text-base text-stone-900"
                      />
                      <span className="absolute right-3.5 top-3 text-xs text-stone-400 font-medium">
                        {unit === 'gaj' ? 'Gaj (Sq. Yards)' : 'Sq. Ft'}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-medium text-stone-500">Equivalent</div>
                      <div className="font-mono text-xs font-bold text-stone-800">
                        {unit === 'gaj'
                          ? `≈ ${(areaGaj * 9).toLocaleString()} Sq. Ft`
                          : `≈ ${areaGaj.toLocaleString()} Gaj`}
                      </div>
                    </div>
                  </div>

                  {/* Quick Size Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {[100, 150, 200, 250, 500, 1000].map((gajVal) => (
                      <button
                        key={gajVal}
                        type="button"
                        onClick={() => setAreaGaj(gajVal)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          areaGaj === gajVal
                            ? 'bg-stone-900 text-white border-stone-900 font-bold'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        {gajVal} Gaj {gajVal >= 1000 ? `(≈ ${(gajVal / 2420).toFixed(2)} Bigha)` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Land Purchase Rate */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Land Purchase Rate
                  </label>
                  <span className="text-xs font-mono font-semibold text-terracotta-700">
                    Total Base Land: {formatINR(areaGaj * ratePerGaj)}
                  </span>
                </div>

                <div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-stone-400 text-sm font-medium">₹</span>
                    <input
                      type="number"
                      min="1000"
                      step={unit === 'gaj' ? 1000 : 100}
                      value={displayRate}
                      onChange={(e) => handleRateChange(e.target.value)}
                      className="input-field pl-8 font-mono font-bold text-base text-stone-900"
                    />
                    <span className="absolute right-3.5 top-3 text-xs text-stone-400 font-medium">
                      per {unit === 'gaj' ? 'Sq. Yard (Gaj)' : 'Sq. Ft'}
                    </span>
                  </div>

                  {/* Quick Rate Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {[15000, 22000, 28000, 35000, 48000, 65000].map((rateVal) => (
                      <button
                        key={rateVal}
                        type="button"
                        onClick={() => setRatePerGaj(rateVal)}
                        className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          ratePerGaj === rateVal
                            ? 'bg-stone-900 text-white border-stone-900 font-bold'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        ₹{(rateVal / 1000).toFixed(0)}k / Gaj
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strategy 1 Specifics: Boundary wall & Appreciation */}
              {strategy === 'appreciation' && (
                <>
                  {/* Land Prep & Boundary Wall */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        Boundary Wall, Fencing & Land Preparation (₹)
                      </label>
                      <span className="text-xs font-mono text-stone-500">
                        {formatINR(landPrepCost)}
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-stone-400 text-sm">₹</span>
                      <input
                        type="number"
                        min="0"
                        step="25000"
                        value={landPrepCost}
                        onChange={(e) => setLandPrepCost(Math.max(0, Number(e.target.value) || 0))}
                        className="input-field pl-8 font-mono text-sm"
                      />
                    </div>
                    <p className="text-[11px] text-stone-400">
                      Standard stone boundary wall and MS iron gate across Jaipur outskirts costs ≈ ₹1.2L – ₹2.5L for a 200–300 Gaj plot.
                    </p>
                  </div>

                  {/* Holding Horizon & Expected Appreciation Rate */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        Holding Horizon & Annual Appreciation
                      </label>
                      <span className="text-xs font-bold text-terracotta-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {annualAppreciation}% p.a. over {holdingYears} Years
                      </span>
                    </div>

                    {/* Horizon selection */}
                    <div>
                      <span className="text-[11px] font-medium text-stone-500 block mb-1.5">
                        Holding Period:
                      </span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {[1, 2, 3, 5, 7, 10].slice(0, 5).map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            onClick={() => setHoldingYears(yr)}
                            className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              holdingYears === yr
                                ? 'bg-terracotta-700 text-white border-terracotta-700 font-bold shadow-sm'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {yr} {yr === 1 ? 'Year' : 'Years'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Appreciation Slider */}
                    <div>
                      <div className="flex justify-between text-xs text-stone-600 mb-1">
                        <span>Projected Annual Growth Rate:</span>
                        <span className="font-mono font-bold text-stone-900">{annualAppreciation}% p.a.</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="28"
                        step="1"
                        value={annualAppreciation}
                        onChange={(e) => setAnnualAppreciation(Number(e.target.value))}
                        className="w-full accent-terracotta-700 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                        <span>Conservative (8%)</span>
                        <span>Corridor Average (14%)</span>
                        <span>High Infrastructure Surge (22%+)</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Strategy 2 Specifics: Development & Rental Yield */}
              {strategy === 'develop' && (
                <>
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                      Select Development Typology
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {DEV_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => {
                            setDevTypeId(type.id);
                            const sqft = Math.round(areaGaj * 9 * type.builtUpMultiplier);
                            setCustomBuiltUpSqFt(sqft);
                            setConstructionRateSqFt(type.constructionRateSqFt);
                            const totalEstCost = (areaGaj * ratePerGaj) + (sqft * type.constructionRateSqFt);
                            setExpectedMonthlyRent(Math.round(totalEstCost * type.expectedMonthlyRentRatio));
                          }}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            devTypeId === type.id
                              ? 'border-terracotta-700 bg-amber-50/40 text-stone-900 font-medium shadow-sm'
                              : 'border-stone-200 bg-white hover:border-stone-300 text-stone-600'
                          }`}
                        >
                          <div className="text-xs font-bold text-stone-900">{type.label}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5">{type.desc}</div>
                          <div className="text-[10px] font-mono font-semibold text-terracotta-700 mt-1">
                            ₹{type.constructionRateSqFt}/Sq. Ft
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Built-up area and Construction Cost */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-[11px] font-medium text-stone-600 block mb-1">
                          Built-Up Area (Sq. Ft)
                        </label>
                        <input
                          type="number"
                          step="100"
                          value={customBuiltUpSqFt}
                          onChange={(e) => setCustomBuiltUpSqFt(Math.max(0, Number(e.target.value) || 0))}
                          className="input-field font-mono text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-medium text-stone-600 block mb-1">
                          Construction Rate (₹ / Sq. Ft)
                        </label>
                        <input
                          type="number"
                          step="100"
                          value={constructionRateSqFt}
                          onChange={(e) => setConstructionRateSqFt(Math.max(0, Number(e.target.value) || 0))}
                          className="input-field font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="text-right text-xs text-stone-500">
                      Total Construction Outlay: <span className="font-mono font-bold text-stone-900">{formatINR(buyAndDevelopModel.constructionCost)}</span>
                    </div>
                  </div>

                  {/* Rental Inflow */}
                  <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                        Expected Monthly Rental / Stay Inflow
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        {formatINR(buyAndDevelopModel.annualRent)} / year
                      </span>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-stone-400 text-sm">₹</span>
                      <input
                        type="number"
                        step="5000"
                        value={expectedMonthlyRent}
                        onChange={(e) => setExpectedMonthlyRent(Math.max(0, Number(e.target.value) || 0))}
                        className="input-field pl-8 font-mono text-sm font-bold text-stone-900"
                      />
                      <span className="absolute right-3.5 top-3 text-xs text-stone-400">/ month</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-stone-500 pt-1">
                      <span>Gross Rental Yield on Total Project:</span>
                      <span className="font-mono font-bold text-emerald-700 text-sm">
                        {buyAndDevelopModel.grossRentalYield.toFixed(2)}% p.a.
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Statutory Toggle (Common to 1 & 2) */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50/60">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="statutory-toggle"
                    checked={includeStatutory}
                    onChange={(e) => setIncludeStatutory(e.target.checked)}
                    className="w-4 h-4 rounded text-terracotta-700 accent-terracotta-700 cursor-pointer"
                  />
                  <label htmlFor="statutory-toggle" className="text-xs font-medium text-stone-700 cursor-pointer">
                    Include Rajasthan Registry & Legal Due Diligence (~6.5% + ₹50k title search)
                  </label>
                </div>
                <span className="text-xs font-mono font-semibold text-stone-600">
                  {includeStatutory ? formatINR(buyAndHoldModel.totalStatutory) : 'Excluded'}
                </span>
              </div>
            </>
          ) : (
            /* SECTION B: STRATEGY 3 (PLOT SUB-DIVISION / COLONIZATION) */
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Total Land Parcel Size & Raw Land Cost
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Total Parcel Area (Gaj)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={parcelSizeGaj}
                      onChange={(e) => setParcelSizeGaj(Math.max(500, Number(e.target.value) || 0))}
                      className="input-field font-mono text-sm font-bold"
                    />
                    <div className="text-[10px] text-stone-400 mt-1">
                      ≈ {(parcelSizeGaj / 2420).toFixed(2)} Bigha (1 Bigha = 2,420 Gaj)
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Raw Land Acquisition Rate (₹ / Gaj)
                    </label>
                    <input
                      type="number"
                      step="500"
                      value={rawLandRateGaj}
                      onChange={(e) => setRawLandRateGaj(Math.max(0, Number(e.target.value) || 0))}
                      className="input-field font-mono text-sm font-bold"
                    />
                    <div className="text-[10px] text-stone-400 mt-1">
                      Raw Land Cost: {formatINR(subDivisionModel.rawLandCost)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Township Development Infrastructure */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Infrastructure, Roads & JDA Compliance
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Development Cost (₹ / Gaj)
                    </label>
                    <input
                      type="number"
                      step="200"
                      value={infraCostPerGaj}
                      onChange={(e) => setInfraCostPerGaj(Math.max(0, Number(e.target.value) || 0))}
                      className="input-field font-mono text-sm"
                    />
                    <div className="text-[10px] text-stone-400 mt-1">
                      Roads, electrification, water line, parks
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-stone-600 block mb-1">
                      Saleable Area Ratio (%)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="50"
                        max="80"
                        value={saleableRatioPct}
                        onChange={(e) => setSaleableRatioPct(Number(e.target.value))}
                        className="input-field font-mono text-sm"
                      />
                      <span className="text-xs font-semibold text-stone-500">%</span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1">
                      Standard JDA 90A deduction is 35% (65% saleable)
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-between text-xs text-stone-600">
                  <span>Net Saleable Plotted Inventory:</span>
                  <span className="font-mono font-bold text-stone-900">
                    {subDivisionModel.saleableGaj.toLocaleString()} Gaj
                  </span>
                </div>
              </div>

              {/* Target Selling Rate */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Target Retail Plot Selling Rate (₹ / Gaj)
                  </label>
                  <span className="text-xs font-mono font-bold text-emerald-700">
                    Gross Realization: {formatINR(subDivisionModel.grossRealization)}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-stone-400 text-sm">₹</span>
                  <input
                    type="number"
                    step="1000"
                    value={targetPlotSaleRateGaj}
                    onChange={(e) => setTargetPlotSaleRateGaj(Math.max(0, Number(e.target.value) || 0))}
                    className="input-field pl-8 font-mono text-sm font-bold text-stone-900"
                  />
                  <span className="absolute right-3.5 top-3 text-xs text-stone-400">/ Gaj</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT COLUMN: EXECUTIVE OUTPUT DASHBOARD (5 COLS) ── */}
        <div className="lg:col-span-5 bg-[#161513] text-stone-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-stone-800 shadow-xl relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-900/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">

            {/* Dashboard Header */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <span className="text-[11px] font-mono uppercase tracking-widest text-terracotta-400 font-bold">
                {strategy === 'appreciation'
                  ? 'Projected Wealth Summary'
                  : strategy === 'develop'
                  ? 'Cash Flow & Equity Projections'
                  : 'Township Project Returns'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  title="Copy calculation summary"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* HERO KPI CARDS */}
            {strategy === 'appreciation' && (
              <div>
                <span className="text-xs text-stone-400 block mb-1">
                  Projected Net Profit ({holdingYears}-Year Horizon)
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {formatINR(buyAndHoldModel.netProfit)}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Total ROI
                    </span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      +{buyAndHoldModel.totalRoiPct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Annualized Return (CAGR)
                    </span>
                    <span className="text-xl font-mono font-bold text-terracotta-400">
                      {buyAndHoldModel.cagr.toFixed(1)}% <span className="text-xs font-sans font-normal text-stone-400">p.a.</span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {strategy === 'develop' && (
              <div>
                <span className="text-xs text-stone-400 block mb-1">
                  Total Combined Wealth ({holdingYears} Yrs Rent + Asset)
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {formatINR(buyAndDevelopModel.totalWealthCreated)}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Gross Rental Yield
                    </span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      {buyAndDevelopModel.grossRentalYield.toFixed(2)}% <span className="text-xs font-sans font-normal text-stone-400">p.a.</span>
                    </span>
                  </div>
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Combined ROI
                    </span>
                    <span className="text-xl font-mono font-bold text-terracotta-400">
                      +{buyAndDevelopModel.combinedRoiPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {strategy === 'subdivision' && (
              <div>
                <span className="text-xs text-stone-400 block mb-1">
                  Net Developer Profit Realization
                </span>
                <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                  {formatINR(subDivisionModel.netDeveloperProfit)}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Developer Margin
                    </span>
                    <span className="text-xl font-mono font-bold text-emerald-400">
                      {subDivisionModel.developerMarginPct.toFixed(1)}%
                    </span>
                  </div>
                  <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                      Project Outlay ROI
                    </span>
                    <span className="text-xl font-mono font-bold text-terracotta-400">
                      +{subDivisionModel.projectRoiPct.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* DETAILED CAPITAL OUTLAY BREAKDOWN */}
            <div className="space-y-2.5 pt-4 border-t border-stone-800 text-xs">
              {strategy === 'appreciation' && (
                <>
                  <div className="flex justify-between text-stone-400">
                    <span>Base Land Acquisition:</span>
                    <span className="font-mono text-stone-200 font-semibold">{formatINR(buyAndHoldModel.baseLandCost)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Rajasthan Registry & Due Diligence:</span>
                    <span className="font-mono text-stone-200">{formatINR(buyAndHoldModel.totalStatutory)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Boundary Wall & Preparation:</span>
                    <span className="font-mono text-stone-200">{formatINR(buyAndHoldModel.landPrepCost)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-stone-800 text-sm">
                    <span>Total Capital Deployed:</span>
                    <span className="font-mono text-terracotta-400">{formatINR(buyAndHoldModel.totalCapitalDeployed)}</span>
                  </div>
                  <div className="flex justify-between text-stone-300 pt-1">
                    <span>Projected Exit Value (Year {holdingYears}):</span>
                    <span className="font-mono font-semibold text-emerald-400">{formatINR(buyAndHoldModel.projectedExitValue)}</span>
                  </div>
                </>
              )}

              {strategy === 'develop' && (
                <>
                  <div className="flex justify-between text-stone-400">
                    <span>Land Outlay + Closing:</span>
                    <span className="font-mono text-stone-200 font-semibold">{formatINR(buyAndDevelopModel.baseLandCost + buyAndDevelopModel.statutoryCost)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Construction Capital:</span>
                    <span className="font-mono text-stone-200">{formatINR(buyAndDevelopModel.constructionCost)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-stone-800 text-sm">
                    <span>Total Project Investment:</span>
                    <span className="font-mono text-terracotta-400">{formatINR(buyAndDevelopModel.totalProjectCost)}</span>
                  </div>
                  <div className="flex justify-between text-stone-300 pt-1">
                    <span>{holdingYears}-Yr Cumulative Rent Inflow:</span>
                    <span className="font-mono font-semibold text-emerald-400">{formatINR(buyAndDevelopModel.totalRentalIncomeEarned)}</span>
                  </div>
                  <div className="flex justify-between text-stone-300">
                    <span>Projected Asset Value (Year {holdingYears}):</span>
                    <span className="font-mono font-semibold text-stone-100">{formatINR(buyAndDevelopModel.projectedExitAssetValue)}</span>
                  </div>
                </>
              )}

              {strategy === 'subdivision' && (
                <>
                  <div className="flex justify-between text-stone-400">
                    <span>Raw Land Acquisition:</span>
                    <span className="font-mono text-stone-200 font-semibold">{formatINR(subDivisionModel.rawLandCost)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Roads & Infrastructure Dev:</span>
                    <span className="font-mono text-stone-200">{formatINR(subDivisionModel.totalInfraCost)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>JDA 90A Statutory & Approvals:</span>
                    <span className="font-mono text-stone-200">{formatINR(subDivisionModel.approvalFee)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-stone-800 text-sm">
                    <span>Total Project Cost:</span>
                    <span className="font-mono text-terracotta-400">{formatINR(subDivisionModel.totalProjectInvestment)}</span>
                  </div>
                  <div className="flex justify-between text-stone-300 pt-1">
                    <span>Gross Realization ({subDivisionModel.saleableGaj.toLocaleString()} Gaj):</span>
                    <span className="font-mono font-semibold text-emerald-400">{formatINR(subDivisionModel.grossRealization)}</span>
                  </div>
                </>
              )}
            </div>

            {/* VISUAL ALLOCATION BAR */}
            {strategy === 'appreciation' && buyAndHoldModel.totalCapitalDeployed > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                  Capital Allocation Mix
                </span>
                <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(buyAndHoldModel.baseLandCost / buyAndHoldModel.totalCapitalDeployed) * 100}%` }}
                    className="bg-terracotta-500 h-full"
                    title="Base Land Cost"
                  />
                  <div
                    style={{ width: `${(buyAndHoldModel.totalStatutory / buyAndHoldModel.totalCapitalDeployed) * 100}%` }}
                    className="bg-amber-400 h-full"
                    title="Statutory / Legal"
                  />
                  <div
                    style={{ width: `${(buyAndHoldModel.landPrepCost / buyAndHoldModel.totalCapitalDeployed) * 100}%` }}
                    className="bg-stone-500 h-full"
                    title="Preparation / Boundary"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" /> Land ({((buyAndHoldModel.baseLandCost / buyAndHoldModel.totalCapitalDeployed) * 100).toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Legal/Govt ({((buyAndHoldModel.totalStatutory / buyAndHoldModel.totalCapitalDeployed) * 100).toFixed(0)}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500" /> Prep ({((buyAndHoldModel.landPrepCost / buyAndHoldModel.totalCapitalDeployed) * 100).toFixed(0)}%)
                  </span>
                </div>
              </div>
            )}

            {/* YEAR-BY-YEAR ACCORDION (STRATEGY 1 ONLY) */}
            {strategy === 'appreciation' && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowYearlyBreakdown(!showYearlyBreakdown)}
                  className="w-full flex items-center justify-between py-2 text-xs text-stone-300 hover:text-white border-t border-stone-800 cursor-pointer"
                >
                  <span className="font-semibold">Year-by-Year Growth Progression</span>
                  {showYearlyBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showYearlyBreakdown && (
                  <div className="mt-2 space-y-1.5 bg-stone-900/90 p-3 rounded-xl border border-stone-800 max-h-48 overflow-y-auto text-xs">
                    {buyAndHoldModel.yearlyProgression.map((item) => (
                      <div key={item.year} className="flex justify-between items-center text-stone-300 py-0.5">
                        <span className="text-stone-400 font-mono">Year {item.year}:</span>
                        <span className="font-mono font-medium text-stone-100">{formatINR(item.value)}</span>
                        <span className="font-mono text-emerald-400 text-[11px]">+{item.roiPct}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ACTION BUTTONS */}
          <div className="relative z-10 space-y-2.5 pt-6 border-t border-stone-800 mt-6">
            <button
              type="button"
              onClick={() => openInquiry('buy')}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-terracotta-700 hover:bg-terracotta-600 text-white shadow-sm hover:shadow-glow-terracotta transition-all cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Inquire for Verified Land in Jaipur</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:border-emerald-600 text-stone-200 hover:text-white transition-all cursor-pointer"
            >
              <Phone size={13} className="text-emerald-400" />
              <span>Send This Model to Land Advisory Desk</span>
            </a>

            <div className="text-[10px] text-stone-500 text-center leading-normal pt-1">
              Direct Land Coordinator: <a href="tel:+917737213615" className="text-stone-300 font-mono underline">+91 77372 13615</a> · 7 Days a Week (9 AM – 6 PM)
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTNOTE / REGULATORY DISCLOSURE ── */}
      <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-terracotta-700 shrink-0" />
          <span>
            Financial models are analytical benchmarks. On-ground valuation in Jaipur depends on JDA approval, road width, corner orientation, and Registry/DLC rates.
          </span>
        </div>
        <span className="shrink-0 font-mono text-[11px] text-stone-500">
          Jaipur Estates Land Advisory System
        </span>
      </div>
    </div>
  );
}
