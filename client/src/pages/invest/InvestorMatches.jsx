import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  MapPin,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';
import { investApi } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function InvestorMatches() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await investApi.getMatches();
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to retrieve investment matches');
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6">
          {error}
        </div>
        <Link to="/invest" className="btn-primary inline-flex">
          Back to Investments
        </Link>
      </div>
    );
  }

  if (!data?.hasCriteria) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
            <SlidersHorizontal size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">No Criteria Configured</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please define your investment capital band, preferred asset classes, and risk profile to run our transparent matching engine.
          </p>
          <div className="pt-2">
            <Link to="/invest/criteria" className="btn-primary text-sm justify-center bg-emerald-700 hover:bg-emerald-800 w-full">
              Set Investment Criteria
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { criteria, matches } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 mb-2">
              <Sparkles size={13} />
              Transparent Matching Results
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Your Matched Opportunities</h1>
            <p className="text-gray-500 text-sm mt-1">
              Every asset evaluated against your specified criteria using explicit, deterministic rules.
            </p>
          </div>

          <Link to="/invest/criteria" className="btn-secondary text-xs self-start md:self-auto">
            <SlidersHorizontal size={14} /> Adjust Criteria
          </Link>
        </div>

        {/* Active Profile Summary Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-8 shadow-sm text-xs">
          <div className="font-semibold text-gray-900 mb-3 flex items-center gap-1.5 text-sm">
            <ShieldCheck size={16} className="text-emerald-700" />
            Active Investor Profile Parameters:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600">
            <div>
              <span className="text-gray-400 block text-[11px]">Capital Band</span>
              <span className="font-semibold text-gray-800">
                {formatINR(criteria.budgetMinINR)} – {formatINR(criteria.budgetMaxINR)}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Risk Appetite</span>
              <span className="font-semibold text-gray-800">{criteria.riskAppetite}</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Target Horizon</span>
              <span className="font-semibold text-gray-800">{criteria.investmentHorizonYears} Years</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[11px]">Asset Preferences</span>
              <span className="font-semibold text-gray-800 line-clamp-1">
                {criteria.preferredAssetClasses?.join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Matches List */}
        {matches.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
            <Building2 size={40} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-serif font-semibold text-gray-800">No approved assets available yet</h3>
            <p className="text-gray-500 text-sm mt-1">
              Check back soon as new verified commercial and land assets are listed by the administration.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map(({ asset, matchEvaluation }) => {
              const isExpanded = expandedId === asset._id;
              const isRecommended = matchEvaluation.isRecommended;

              return (
                <div
                  key={asset._id}
                  className={`bg-white rounded-2xl border transition-shadow shadow-sm overflow-hidden ${
                    isRecommended ? 'border-emerald-200' : 'border-gray-200'
                  }`}
                >
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="flex gap-4 items-start flex-1">
                      <img
                        src={asset.coverImageUrl}
                        alt={asset.title}
                        className="w-28 h-28 object-cover rounded-xl bg-gray-100 shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="badge bg-emerald-100 text-emerald-800 font-semibold text-xs">
                            {asset.assetClass}
                          </span>
                          <span className="badge-blue text-xs">{asset.riskCategory}</span>
                          {asset.jdaApproved && <span className="badge-green text-xs">JDA Approved</span>}
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1">{asset.title}</h3>
                        <p className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                          <MapPin size={13} className="text-emerald-600" />
                          <span>{asset.address}, {asset.locality}, Jaipur</span>
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                          <span>
                            <strong>Min Ticket:</strong> {formatINR(asset.entryTicketSizeINR)}
                          </span>
                          <span>
                            <strong>Total Value:</strong> {formatINR(asset.totalAssetValueINR)}
                          </span>
                          {asset.historicalRentalYieldPct && (
                            <span>
                              <strong>Hist. Yield:</strong> {asset.historicalRentalYieldPct}% p.a.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Match Score & CTA */}
                    <div className="flex flex-col items-end gap-3 shrink-0 self-end md:self-center w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 uppercase font-semibold tracking-wider block">
                          Compatibility Score
                        </span>
                        <div className="flex items-baseline gap-1 justify-end">
                          <span
                            className={`text-3xl font-extrabold ${
                              matchEvaluation.scorePct >= 80
                                ? 'text-emerald-700'
                                : matchEvaluation.scorePct >= 60
                                ? 'text-amber-600'
                                : 'text-gray-500'
                            }`}
                          >
                            {matchEvaluation.scorePct}%
                          </span>
                          <span className="text-xs text-gray-400">Match</span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full md:w-auto">
                        <button
                          onClick={() => toggleExpand(asset._id)}
                          className="btn-ghost text-xs py-2 px-3 flex items-center gap-1 border border-gray-200"
                        >
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          {isExpanded ? 'Hide Rules' : 'Explain Match Rules'}
                        </button>
                        <Link
                          to={`/invest/${asset._id}`}
                          className="btn-primary text-xs py-2 px-4 bg-emerald-700 hover:bg-emerald-800"
                        >
                          Review Docket <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Transparent Rule-by-Rule Breakdown */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/70 p-6 space-y-3">
                      <div className="font-semibold text-xs text-gray-700 mb-2">
                        Rule Evaluation Explainer (5 Transparent Checks):
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {matchEvaluation.rules.map((rule) => {
                          const isPass = rule.status === 'pass';
                          const isPartial = rule.status === 'partial';

                          return (
                            <div
                              key={rule.id}
                              className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                                isPass
                                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                                  : isPartial
                                  ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                                  : 'bg-red-50/60 border-red-200 text-red-950'
                              }`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isPass ? (
                                  <CheckCircle2 size={16} className="text-emerald-700" />
                                ) : isPartial ? (
                                  <AlertCircle size={16} className="text-amber-700" />
                                ) : (
                                  <XCircle size={16} className="text-red-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold flex items-center justify-between">
                                  <span>{rule.name}</span>
                                  <span className="text-[10px] uppercase font-bold opacity-75">
                                    {rule.scoreImpact} pts
                                  </span>
                                </div>
                                <p className="mt-0.5 text-[11px] leading-relaxed opacity-90">
                                  {rule.details}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
