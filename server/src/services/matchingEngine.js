/**
 * Transparent Matching Engine for Jaipur Real Estate Platform
 *
 * Evaluates an Investment Asset against an Investor Criteria Profile.
 * Fully explainable: Returns rule-by-rule evaluations with plain-language reasons.
 * No arbitrary scores or false guarantees.
 */

export const evaluateInvestmentMatch = (criteria, asset) => {
  const rules = [];
  let score = 0;
  const totalWeight = 100;

  // ── Rule 1: Ticket Size / Budget Fit (Weight: 30) ───────────────────
  const assetTicket = asset.entryTicketSizeINR;
  const minBudget = criteria.budgetMinINR;
  const maxBudget = criteria.budgetMaxINR;

  if (assetTicket >= minBudget && assetTicket <= maxBudget) {
    rules.push({
      id: 'budget_fit',
      name: 'Budget Alignment',
      passed: true,
      status: 'pass',
      scoreImpact: 30,
      details: `Ticket size ₹${(assetTicket / 100000).toFixed(1)} Lakh is within your specified range (₹${(minBudget / 100000).toFixed(1)}L – ₹${(maxBudget / 100000).toFixed(1)}L).`,
    });
    score += 30;
  } else if (assetTicket >= minBudget * 0.85 && assetTicket <= maxBudget * 1.15) {
    rules.push({
      id: 'budget_fit',
      name: 'Budget Alignment',
      passed: true,
      status: 'partial',
      scoreImpact: 15,
      details: `Ticket size ₹${(assetTicket / 100000).toFixed(1)} Lakh is within ±15% of your target budget band.`,
    });
    score += 15;
  } else {
    rules.push({
      id: 'budget_fit',
      name: 'Budget Alignment',
      passed: false,
      status: 'fail',
      scoreImpact: 0,
      details: `Ticket size ₹${(assetTicket / 100000).toFixed(1)} Lakh is outside your specified range (₹${(minBudget / 100000).toFixed(1)}L – ₹${(maxBudget / 100000).toFixed(1)}L).`,
    });
  }

  // ── Rule 2: Asset Class Match (Weight: 25) ─────────────────────────
  const preferredClasses = criteria.preferredAssetClasses || [];
  if (preferredClasses.length === 0 || preferredClasses.includes(asset.assetClass)) {
    rules.push({
      id: 'asset_class',
      name: 'Asset Category Fit',
      passed: true,
      status: 'pass',
      scoreImpact: 25,
      details: `Asset category "${asset.assetClass}" matches your preferred investment criteria.`,
    });
    score += 25;
  } else {
    rules.push({
      id: 'asset_class',
      name: 'Asset Category Fit',
      passed: false,
      status: 'fail',
      scoreImpact: 0,
      details: `Category "${asset.assetClass}" is outside your selected preferences (${preferredClasses.join(', ')}).`,
    });
  }

  // ── Rule 3: Locality Preference (Weight: 20) ───────────────────────
  const preferredLocalities = criteria.preferredLocalities || [];
  if (preferredLocalities.length === 0) {
    rules.push({
      id: 'locality_fit',
      name: 'Jaipur Micro-Market Fit',
      passed: true,
      status: 'pass',
      scoreImpact: 20,
      details: `Located in ${asset.locality}. (You selected all Jaipur micro-markets).`,
    });
    score += 20;
  } else if (preferredLocalities.includes(asset.locality)) {
    rules.push({
      id: 'locality_fit',
      name: 'Jaipur Micro-Market Fit',
      passed: true,
      status: 'pass',
      scoreImpact: 20,
      details: `Located in ${asset.locality}, which is one of your preferred investment zones.`,
    });
    score += 20;
  } else {
    rules.push({
      id: 'locality_fit',
      name: 'Jaipur Micro-Market Fit',
      passed: false,
      status: 'fail',
      scoreImpact: 0,
      details: `Located in ${asset.locality}, which is outside your target localities (${preferredLocalities.join(', ')}).`,
    });
  }

  // ── Rule 4: Risk Profile Compatibility (Weight: 15) ────────────────
  if (criteria.riskAppetite === asset.riskCategory) {
    rules.push({
      id: 'risk_profile',
      name: 'Risk Appetite Alignment',
      passed: true,
      status: 'pass',
      scoreImpact: 15,
      details: `Asset risk rating "${asset.riskCategory}" aligns directly with your stated risk tolerance.`,
    });
    score += 15;
  } else {
    rules.push({
      id: 'risk_profile',
      name: 'Risk Appetite Alignment',
      passed: false,
      status: 'partial',
      scoreImpact: 5,
      details: `Asset risk rating is "${asset.riskCategory}", whereas your profile is "${criteria.riskAppetite}".`,
    });
    score += 5;
  }

  // ── Rule 5: Investment Horizon & Lock-in Compatibility (Weight: 10) ─
  const investorHorizonMonths = (criteria.investmentHorizonYears || 3) * 12;
  const lockInMonths = asset.lockInPeriodMonths || 0;

  if (lockInMonths === 0 || lockInMonths <= investorHorizonMonths) {
    rules.push({
      id: 'horizon_fit',
      name: 'Investment Horizon Fit',
      passed: true,
      status: 'pass',
      scoreImpact: 10,
      details: `Lease lock-in period (${lockInMonths} months) falls within your ${criteria.investmentHorizonYears}-year investment horizon.`,
    });
    score += 10;
  } else {
    rules.push({
      id: 'horizon_fit',
      name: 'Investment Horizon Fit',
      passed: false,
      status: 'fail',
      scoreImpact: 0,
      details: `Lease lock-in period (${lockInMonths} months) exceeds your targeted horizon (${investorHorizonMonths} months).`,
    });
  }

  return {
    scorePct: Math.min(100, Math.round((score / totalWeight) * 100)),
    isRecommended: score >= 60,
    rules,
  };
};
