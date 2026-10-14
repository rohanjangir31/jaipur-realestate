import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TrendingUp,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { investApi } from '../../services/api';
import { JAIPUR_LOCALITIES } from '../../utils/formatters';
import FormError from '../../components/ui/FormError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ASSET_CLASSES = [
  'Pre-Leased Commercial',
  'High-Growth Land',
  'Serviced Apartment',
  'Industrial Warehouse',
  'Mixed Use Development',
];

const RISK_CATEGORIES = [
  'Conservative (Cash Flow)',
  'Moderate (Balanced)',
  'Growth (Capital Appreciation)',
];

const schema = z.object({
  budgetMinINR: z.coerce.number().min(500000, 'Minimum budget must be at least ₹5 Lakh'),
  budgetMaxINR: z.coerce.number().min(500000, 'Maximum budget must be at least ₹5 Lakh'),
  riskAppetite: z.string().min(1, 'Please select your risk appetite'),
  investmentHorizonYears: z.coerce.number().min(1).max(20),
});

export default function InvestorCriteria() {
  const navigate = useNavigate();
  const [selectedClasses, setSelectedClasses] = useState(['Pre-Leased Commercial']);
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [serverError, setServerError] = useState('');
  const [loadingInitial, setLoadingInitial] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      budgetMinINR: 2500000,
      budgetMaxINR: 15000000,
      riskAppetite: 'Moderate (Balanced)',
      investmentHorizonYears: 3,
    },
  });

  useEffect(() => {
    const fetchExisting = async () => {
      try {
        const res = await investApi.getMyCriteria();
        const existing = res.data.data.criteria;
        if (existing) {
          setValue('budgetMinINR', existing.budgetMinINR);
          setValue('budgetMaxINR', existing.budgetMaxINR);
          setValue('riskAppetite', existing.riskAppetite);
          setValue('investmentHorizonYears', existing.investmentHorizonYears);
          if (existing.preferredAssetClasses?.length) {
            setSelectedClasses(existing.preferredAssetClasses);
          }
          if (existing.preferredLocalities?.length) {
            setSelectedLocalities(existing.preferredLocalities);
          }
        }
      } catch (err) {
        // No existing criteria yet
      } finally {
        setLoadingInitial(false);
      }
    };
    fetchExisting();
  }, [setValue]);

  const toggleClass = (ac) => {
    if (selectedClasses.includes(ac)) {
      if (selectedClasses.length > 1) {
        setSelectedClasses(selectedClasses.filter((c) => c !== ac));
      }
    } else {
      setSelectedClasses([...selectedClasses, ac]);
    }
  };

  const toggleLocality = (loc) => {
    if (selectedLocalities.includes(loc)) {
      setSelectedLocalities(selectedLocalities.filter((l) => l !== loc));
    } else {
      setSelectedLocalities([...selectedLocalities, loc]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setServerError('');
      if (formData.budgetMaxINR < formData.budgetMinINR) {
        setServerError('Maximum budget must be greater than or equal to minimum budget');
        return;
      }

      await investApi.saveCriteria({
        budgetMinINR: Number(formData.budgetMinINR),
        budgetMaxINR: Number(formData.budgetMaxINR),
        preferredAssetClasses: selectedClasses,
        preferredLocalities: selectedLocalities,
        riskAppetite: formData.riskAppetite,
        investmentHorizonYears: Number(formData.investmentHorizonYears),
      });

      navigate('/invest/matches');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to save criteria');
    }
  };

  if (loadingInitial) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/invest" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700">
            <ArrowLeft size={16} /> Back to Investment Opportunities
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 mb-2">
              <Sparkles size={12} /> Transparent Matching Engine
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Define Your Investment Criteria</h1>
            <p className="text-gray-500 text-sm mt-1">
              Set your target capital, risk appetite, and asset classes. Our deterministic matching engine evaluates all approved opportunities with complete rule-by-rule transparency.
            </p>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Section 1: Capital Band */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">1. Capital Band (₹ INR)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Ticket Size</label>
                  <input
                    type="number"
                    step={100000}
                    className={`input-field ${errors.budgetMinINR ? 'input-error' : ''}`}
                    {...register('budgetMinINR')}
                  />
                  <FormError message={errors.budgetMinINR?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Maximum Capital Allocation</label>
                  <input
                    type="number"
                    step={100000}
                    className={`input-field ${errors.budgetMaxINR ? 'input-error' : ''}`}
                    {...register('budgetMaxINR')}
                  />
                  <FormError message={errors.budgetMaxINR?.message} />
                </div>
              </div>
            </div>

            {/* Section 2: Preferred Asset Categories */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">2. Preferred Asset Categories</h3>
              <p className="text-xs text-gray-500 mb-3">Select one or more categories that align with your strategy.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ASSET_CLASSES.map((ac) => {
                  const isChecked = selectedClasses.includes(ac);
                  return (
                    <button
                      type="button"
                      key={ac}
                      onClick={() => toggleClass(ac)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{ac}</span>
                      {isChecked && <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Risk Profile & Horizon */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">3. Risk Profile & Investment Horizon</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Risk Appetite</label>
                  <select className="input-field text-xs py-2.5" {...register('riskAppetite')}>
                    {RISK_CATEGORIES.map((rc) => (
                      <option key={rc} value={rc}>
                        {rc}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Target Horizon (Years)</label>
                  <select className="input-field text-xs py-2.5" {...register('investmentHorizonYears')}>
                    <option value="1">1 - 2 Years</option>
                    <option value="3">3 - 5 Years (Medium Term)</option>
                    <option value="7">7 - 10 Years (Long Term)</option>
                    <option value="15">10+ Years (Generational)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Target Jaipur Micro-Markets (Optional) */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-base font-semibold text-gray-900">4. Target Jaipur Micro-Markets</h3>
                <span className="text-xs text-gray-400">Leave unselected to match all Jaipur localities</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 max-h-40 overflow-y-auto p-1 border border-gray-100 rounded-lg">
                {JAIPUR_LOCALITIES.map((loc) => {
                  const isChecked = selectedLocalities.includes(loc);
                  return (
                    <button
                      type="button"
                      key={loc}
                      onClick={() => toggleLocality(loc)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition border ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {loc}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm justify-center bg-emerald-700 hover:bg-emerald-800"
              >
                {isSubmitting ? <LoadingSpinner size="sm" /> : <Sparkles size={16} />}
                {isSubmitting ? 'Evaluating Criteria...' : 'Save Criteria & Discover Matched Opportunities'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
