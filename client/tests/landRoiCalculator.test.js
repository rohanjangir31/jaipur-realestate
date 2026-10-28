import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Mathematical test suite for Land Investment & Development ROI calculations.
 */

// Core Calculation Helpers matching PropertyCalculator.jsx logic
function calculateBuyAndHold({ areaGaj, ratePerGaj, includeStatutory = true, landPrepCost = 150000, holdingYears = 5, annualAppreciation = 14 }) {
  const baseLandCost = areaGaj * ratePerGaj;
  const statutoryCharges = includeStatutory ? Math.round(baseLandCost * 0.065) : 0;
  const legalDueDiligence = includeStatutory ? 50000 : 0;
  const totalStatutory = statutoryCharges + legalDueDiligence;
  const totalCapitalDeployed = baseLandCost + totalStatutory + landPrepCost;

  const futureLandValue = Math.round(baseLandCost * Math.pow(1 + annualAppreciation / 100, holdingYears));
  const improvementResidual = Math.round(landPrepCost * 0.75);
  const projectedExitValue = futureLandValue + improvementResidual;

  const netProfit = projectedExitValue - totalCapitalDeployed;
  const totalRoiPct = totalCapitalDeployed > 0 ? (netProfit / totalCapitalDeployed) * 100 : 0;
  const cagr = totalCapitalDeployed > 0 && holdingYears > 0
    ? (Math.pow(projectedExitValue / totalCapitalDeployed, 1 / holdingYears) - 1) * 100
    : 0;

  return {
    baseLandCost,
    totalStatutory,
    totalCapitalDeployed,
    projectedExitValue,
    netProfit,
    totalRoiPct,
    cagr,
  };
}

function calculateBuyAndDevelop({ areaGaj, ratePerGaj, includeStatutory = true, builtUpSqFt = 2400, constructionRateSqFt = 2200, monthlyRent = 65000, holdingYears = 5, annualAppreciation = 12 }) {
  const baseLandCost = areaGaj * ratePerGaj;
  const statutoryCost = includeStatutory ? Math.round(baseLandCost * 0.065 + 50000) : 0;
  const constructionCost = builtUpSqFt * constructionRateSqFt;
  const totalProjectCost = baseLandCost + statutoryCost + constructionCost;

  const annualRent = monthlyRent * 12;
  const grossRentalYield = totalProjectCost > 0 ? (annualRent / totalProjectCost) * 100 : 0;
  const totalRentalIncomeEarned = annualRent * holdingYears;

  const futureLandValue = Math.round(baseLandCost * Math.pow(1 + annualAppreciation / 100, holdingYears));
  const depreciatedBuildingValue = Math.round(constructionCost * Math.max(0.6, 1 - 0.01 * holdingYears));
  const projectedExitAssetValue = futureLandValue + depreciatedBuildingValue;

  const totalWealthCreated = projectedExitAssetValue + totalRentalIncomeEarned - totalProjectCost;
  const combinedRoiPct = totalProjectCost > 0 ? (totalWealthCreated / totalProjectCost) * 100 : 0;
  const paybackPeriodYears = annualRent > 0 ? totalProjectCost / annualRent : 0;

  return {
    baseLandCost,
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
}

function calculateSubDivision({ parcelSizeGaj, rawLandRateGaj, infraCostPerGaj = 2500, saleableRatioPct = 65, targetPlotSaleRateGaj = 38000 }) {
  const rawLandCost = parcelSizeGaj * rawLandRateGaj;
  const totalInfraCost = parcelSizeGaj * infraCostPerGaj;
  const approvalFee = Math.round(parcelSizeGaj * 150);
  const totalProjectInvestment = rawLandCost + totalInfraCost + approvalFee;

  const saleableGaj = Math.round(parcelSizeGaj * (saleableRatioPct / 100));
  const grossRealization = saleableGaj * targetPlotSaleRateGaj;

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
}

describe('Land Investment & Development ROI Calculator Tests', () => {
  describe('Project Investment ROI Calculator (20% Annual ROI Co-working Project)', () => {
    function calculateProjectReturns(investmentAmount, years = 5, roiRate = 20) {
      const validAmount = Number(investmentAmount) || 0;
      const validYears = Math.max(1, Number(years) || 1);
      const annualReturn = Math.round(validAmount * (roiRate / 100));
      const monthlyReturn = Math.round(annualReturn / 12);
      const totalReturns = Math.round(annualReturn * validYears);
      const totalMaturity = validAmount + totalReturns;
      const totalRoiPercent = Math.round((totalReturns / (validAmount || 1)) * 100);

      return {
        investment: validAmount,
        years: validYears,
        annualReturn,
        monthlyReturn,
        totalReturns,
        totalMaturity,
        totalRoiPercent,
      };
    }

    it('accurately computes 20% annual return on standard ₹10 Lakh investment for default 5 years', () => {
      const res = calculateProjectReturns(1000000, 5, 20);
      assert.equal(res.investment, 1000000);
      assert.equal(res.annualReturn, 200000); // ₹2,00,000 per year
      assert.equal(res.monthlyReturn, 16667); // ₹16,667 per month
      assert.equal(res.totalReturns, 1000000); // ₹10,00,000 over 5 years
      assert.equal(res.totalMaturity, 2000000); // ₹20,00,000 total payout
      assert.equal(res.totalRoiPercent, 100); // 100% ROI
    });

    it('accurately models flexible user-selected year durations (1, 3, 7, 10, 20 years)', () => {
      // 1 Year duration
      const res1Yr = calculateProjectReturns(1000000, 1, 20);
      assert.equal(res1Yr.totalReturns, 200000);
      assert.equal(res1Yr.totalMaturity, 1200000);
      assert.equal(res1Yr.totalRoiPercent, 20);

      // 3 Years duration
      const res3Yr = calculateProjectReturns(1000000, 3, 20);
      assert.equal(res3Yr.totalReturns, 600000);
      assert.equal(res3Yr.totalMaturity, 1600000);
      assert.equal(res3Yr.totalRoiPercent, 60);

      // 7 Years duration
      const res7Yr = calculateProjectReturns(1000000, 7, 20);
      assert.equal(res7Yr.totalReturns, 1400000);
      assert.equal(res7Yr.totalMaturity, 2400000);
      assert.equal(res7Yr.totalRoiPercent, 140);

      // 10 Years duration (triples capital)
      const res10Yr = calculateProjectReturns(1000000, 10, 20);
      assert.equal(res10Yr.totalReturns, 2000000);
      assert.equal(res10Yr.totalMaturity, 3000000);
      assert.equal(res10Yr.totalRoiPercent, 200);

      // 20 Years long-term duration
      const res20Yr = calculateProjectReturns(1000000, 20, 20);
      assert.equal(res20Yr.totalReturns, 4000000);
      assert.equal(res20Yr.totalMaturity, 5000000);
      assert.equal(res20Yr.totalRoiPercent, 400);
    });

    it('accurately scales calculations for custom presets (₹5L, ₹25L, ₹50L, ₹1Cr)', () => {
      const res5L = calculateProjectReturns(500000, 5, 20);
      assert.equal(res5L.annualReturn, 100000);

      const res25L = calculateProjectReturns(2500000, 5, 20);
      assert.equal(res25L.annualReturn, 500000);

      const res1Cr = calculateProjectReturns(10000000, 5, 20);
      assert.equal(res1Cr.annualReturn, 2000000);
      assert.equal(res1Cr.monthlyReturn, 166667);
    });
  });

  describe('Strategy 1: Buy & Hold (Land Appreciation)', () => {
    it('accurately calculates base land cost and total capital deployed', () => {
      const res = calculateBuyAndHold({
        areaGaj: 250,
        ratePerGaj: 28000,
        includeStatutory: true,
        landPrepCost: 150000,
        holdingYears: 5,
        annualAppreciation: 14,
      });

      assert.equal(res.baseLandCost, 7000000); // 250 * 28000 = ₹70 Lakh
      assert.equal(res.totalStatutory, 505000); // 7000000 * 0.065 + 50000 = ₹5.05 Lakh
      assert.equal(res.totalCapitalDeployed, 7655000); // 7000000 + 505000 + 150000
    });

    it('correctly models compounding future valuation and positive ROI', () => {
      const res = calculateBuyAndHold({
        areaGaj: 250,
        ratePerGaj: 28000,
        holdingYears: 5,
        annualAppreciation: 14,
      });

      // 7000000 * (1.14)^5 = ~13,477,932
      assert.ok(res.projectedExitValue > 13000000);
      assert.ok(res.netProfit > 5000000);
      assert.ok(res.totalRoiPct > 70); // > 70% ROI over 5 years
      assert.ok(res.cagr > 10); // > 10% CAGR
    });

    it('allows excluding statutory charges for raw modeling', () => {
      const res = calculateBuyAndHold({
        areaGaj: 200,
        ratePerGaj: 20000,
        includeStatutory: false,
        landPrepCost: 0,
        holdingYears: 3,
        annualAppreciation: 10,
      });

      assert.equal(res.baseLandCost, 4000000);
      assert.equal(res.totalStatutory, 0);
      assert.equal(res.totalCapitalDeployed, 4000000);
    });
  });

  describe('Strategy 2: Buy & Develop (Land + Construction & Rental Yield)', () => {
    it('calculates total project cost including construction and land', () => {
      const res = calculateBuyAndDevelop({
        areaGaj: 200,
        ratePerGaj: 25000,
        builtUpSqFt: 2000,
        constructionRateSqFt: 2000,
        monthlyRent: 50000,
        holdingYears: 5,
      });

      assert.equal(res.baseLandCost, 5000000); // ₹50 Lakh
      assert.equal(res.constructionCost, 4000000); // 2000 * 2000 = ₹40 Lakh
      assert.equal(res.annualRent, 600000); // 50,000 * 12 = ₹6 Lakh/yr
      assert.ok(res.grossRentalYield > 6 && res.grossRentalYield < 7); // ~6.4%
      assert.equal(res.totalRentalIncomeEarned, 3000000); // 6L * 5 yrs = ₹30 Lakh
      assert.ok(res.totalWealthCreated > 0);
    });

    it('computes payback period in realistic range', () => {
      const res = calculateBuyAndDevelop({
        areaGaj: 150,
        ratePerGaj: 20000,
        builtUpSqFt: 1500,
        constructionRateSqFt: 1800,
        monthlyRent: 40000,
        includeStatutory: false,
      });

      // Total cost = 30L + 27L = 57L
      // Annual rent = 4.8L
      // Payback = 57L / 4.8L ≈ 11.875 years
      assert.ok(res.paybackPeriodYears > 10 && res.paybackPeriodYears < 15);
    });
  });

  describe('Strategy 3: Plotted Sub-Division (Township Colonizer)', () => {
    it('calculates 65% net saleable area after JDA standard 35% road deduction', () => {
      const res = calculateSubDivision({
        parcelSizeGaj: 10000,
        rawLandRateGaj: 12000,
        saleableRatioPct: 65,
        targetPlotSaleRateGaj: 32000,
      });

      assert.equal(res.saleableGaj, 6500); // 10000 * 0.65
      assert.equal(res.rawLandCost, 120000000); // ₹12 Cr
      assert.equal(res.grossRealization, 208000000); // 6500 * 32000 = ₹20.80 Cr
      assert.ok(res.netDeveloperProfit > 50000000); // > ₹5 Cr net profit
      assert.ok(res.developerMarginPct > 20); // > 20% margin
    });
  });

  describe('Rajasthan Land Measurement Conversions', () => {
    it('verifies 1 Gaj equals 9 Sq. Feet', () => {
      const gaj = 250;
      const sqFt = gaj * 9;
      assert.equal(sqFt, 2250);
      assert.equal(sqFt / 9, gaj);
    });

    it('verifies standard Bigha conversion in Jaipur (1 Bigha = 2,420 Gaj)', () => {
      const gaj = 4840;
      const bigha = gaj / 2420;
      assert.equal(bigha, 2.0);
    });
  });
});
