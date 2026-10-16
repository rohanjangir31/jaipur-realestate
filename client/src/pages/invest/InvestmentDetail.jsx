import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  TrendingUp,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  Building2,
  Calendar,
  Lock,
  ArrowLeft,
  Send,
  FileCheck2,
  Layers,
  Percent,
  MessageSquare,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { investApi, inquiryApi } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FormError from '../../components/ui/FormError';

const inquirySchema = z.object({
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  intendedCapital: z.coerce.number().min(500000, 'Minimum capital is ₹5 Lakh'),
  investmentHorizonYears: z.coerce.number().min(1).max(20).default(3),
  message: z.string().max(1000).optional(),
});

export default function InvestmentDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  usePageMeta({
    title: asset ? `${asset.title} in ${asset.locality}` : 'Commercial Investment Opportunity',
    description: asset?.description || 'Pre-leased commercial real estate and growth land in Jaipur.',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      contactName: user?.name || '',
      contactEmail: user?.email || '',
      contactPhone: user?.phone || '',
      intendedCapital: 1000000,
      investmentHorizonYears: 3,
      message: 'I am interested in reviewing the legal diligence and lease agreement for this investment asset.',
    },
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        const res = await investApi.getAsset(id);
        const data = res.data.data.asset;
        setAsset(data);
        setActiveImage(data.coverImageUrl);
      } catch (err) {
        setError(err.response?.data?.message || 'Investment asset not found');
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  const onInquirySubmit = async (formData) => {
    try {
      setInquiryError('');
      setSubmittedLead(formData);

      const waText = `Hello Jaipur Estates, I have submitted an expression of interest for "${asset?.title}":\n• Investor: ${formData.contactName}\n• Phone: +91 ${formData.contactPhone}\n• Intended Capital: ₹${formData.intendedCapital?.toLocaleString('en-IN')}\n• Horizon: ${formData.investmentHorizonYears} years\n• Note: ${formData.message || 'Looking for lease diligence.'}`;
      const waUrl = `https://wa.me/919664247662?text=${encodeURIComponent(waText)}`;

      await inquiryApi.submitInquiry({
        inquiryType: 'INVEST',
        referenceId: id,
        referenceModel: 'InvestmentAsset',
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        message: formData.message,
        details: {
          assetTitle: asset?.title,
          assetClass: asset?.assetClass,
          locality: asset?.locality,
          intendedCapital: formData.intendedCapital,
          investmentHorizonYears: formData.investmentHorizonYears,
        },
      });

      setInquirySuccess(true);
      try {
        window.open(waUrl, '_blank');
      } catch {
        /* Ignore popup blockers */
      }
      reset();
    } catch (err) {
      setInquiryError(err.response?.data?.message || 'Failed to submit investor inquiry');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6">
          {error || 'Asset not found'}
        </div>
        <Link to="/invest" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Back to Investment Opportunities
        </Link>
      </div>
    );
  }

  const allImages = [asset.coverImageUrl, ...(asset.galleryImageUrls || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/invest" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-700">
            <ArrowLeft size={16} /> Back to Investment Opportunities
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge bg-emerald-100 text-emerald-800 font-semibold">{asset.assetClass}</span>
                <span className="badge-green">Verified Asset</span>
                <span className="text-xs text-stone-500 font-mono">Market Estimate</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">{asset.title}</h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <MapPin size={15} className="text-emerald-600" />
                <span>
                  {asset.address}, {asset.locality}, Jaipur — {asset.pinCode}
                </span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-xs text-stone-500 uppercase font-semibold tracking-wider block">Estimated Minimum Ticket</span>
              <div className="text-3xl font-bold text-stone-900">Est. {formatINR(asset.entryTicketSizeINR)}</div>
              <div className="text-xs text-stone-500 mt-1">Total Asset Value: Est. {formatINR(asset.totalAssetValueINR)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={activeImage}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`w-20 h-16 rounded-md overflow-hidden shrink-0 border-2 transition ${
                        activeImage === img ? 'border-emerald-600' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Financial & Contractual Due Diligence Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Verified Financial & Lease Metrics</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Historical Rental Yield</span>
                  <span className="text-base font-bold text-emerald-700">
                    {asset.historicalRentalYieldPct ? `${asset.historicalRentalYieldPct}% p.a.` : 'N/A (Capital Gain)'}
                  </span>
                  {asset.lastRentalYieldYear && (
                    <span className="text-[10px] text-gray-500 block mt-0.5">Ref: {asset.lastRentalYieldYear} actuals</span>
                  )}
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Current Tenant Profile</span>
                  <span className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {asset.currentTenantProfile || 'Unleased / Land Parcel'}
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    {asset.leaseRegistered ? 'Registered Lease Deed' : 'Not Registered'}
                  </span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Contractual Escalation</span>
                  <span className="text-base font-bold text-gray-900">
                    {asset.annualEscalationPct ? `${asset.annualEscalationPct}% every 3 yrs` : 'Standard'}
                  </span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Lock-in Period</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {asset.lockInPeriodMonths ? `${asset.lockInPeriodMonths} Months` : 'None'}
                  </span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Lease Term Remaining</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {asset.leaseRemainingMonths ? `${asset.leaseRemainingMonths} Months` : 'N/A'}
                  </span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg">
                  <span className="text-gray-400 block mb-1">Ownership Type</span>
                  <span className="text-sm font-semibold text-gray-800">{asset.ownershipType}</span>
                </div>
              </div>

              {/* Compliance & Verification Alerts */}
              <div className="mt-5 p-4 bg-emerald-50/60 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <FileCheck2 size={18} className="text-emerald-700 shrink-0" />
                  <span>
                    <strong>Title Verification:</strong> Verified against Revenue Records & Sub-Registrar Registry.
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">Asset Overview & Business Plan</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{asset.description}</p>
            </div>
          </div>

          {/* Sidebar Investor Inquiry Form (1 Column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">Express Investment Interest</h3>
              <p className="text-gray-500 text-xs mb-4">
                Submit an inquiry to receive full legal title packs, tenant lease copies, and schedule a private briefing.
              </p>

              {/* Instant WhatsApp to Commercial Desk */}
              <a
                href={`https://wa.me/919664247662?text=${encodeURIComponent(`Hello Jaipur Estates Commercial Desk, I would like to review the due diligence docket and lease agreement for "${asset.title}" (Ref: ${asset._id || id}) in ${asset.locality}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs transition-colors shadow-sm"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Commercial Desk</span>
              </a>

              <div className="relative flex py-1 items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-[10px] text-gray-400 uppercase tracking-wider">or request docket below</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {inquirySuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-3.5 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-stone-900">Request Registered</h4>
                    <p className="text-xs text-stone-600 leading-relaxed mt-1">
                      Thank you{submittedLead?.contactName ? `, ${submittedLead.contactName}` : ''}! Your interest in <strong>{asset.title}</strong> has been forwarded to our commercial desk.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-emerald-200 rounded-xl text-left space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Instant Fast-Track</span>
                    <p className="text-[11px] text-stone-500 leading-relaxed">
                      To receive lease agreements, tenant covenants, and tenant ROI schedules immediately:
                    </p>
                    <a
                      href={`https://wa.me/919664247662?text=${encodeURIComponent(
                        `Hello Jaipur Estates, I have submitted an expression of interest for "${asset?.title}":\n• Investor: ${submittedLead?.contactName || ''}\n• Phone: +91 ${submittedLead?.contactPhone || ''}\n• Capital: ₹${submittedLead?.intendedCapital?.toLocaleString('en-IN') || ''}\n• Horizon: ${submittedLead?.investmentHorizonYears || ''} years\n• Note: ${submittedLead?.message || 'Please share docket.'}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-terracotta w-full justify-center text-xs py-2.5 flex items-center gap-1.5 shadow"
                    >
                      <MessageSquare size={14} /> Open WhatsApp with My Details
                    </a>
                  </div>

                  <div className="pt-2 border-t border-emerald-200 flex flex-col gap-2">
                    <a
                      href="tel:+919664247662"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors"
                    >
                      <Phone size={13} /> Call Commercial Desk (+91 96642 47662)
                    </a>
                    <button
                      onClick={() => { setInquirySuccess(false); setSubmittedLead(null); }}
                      className="text-xs text-stone-500 hover:text-stone-800 underline transition-colors pt-1"
                    >
                      Submit another expression of interest
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onInquirySubmit)} noValidate className="space-y-4">
                  {inquiryError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs">
                      {inquiryError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      className={`input-field ${errors.contactName ? 'input-error' : ''}`}
                      placeholder="e.g. Vikram Khaitan"
                      {...register('contactName')}
                    />
                    <FormError message={errors.contactName?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      className={`input-field ${errors.contactEmail ? 'input-error' : ''}`}
                      placeholder="vikram@khaitanfamily.in"
                      {...register('contactEmail')}
                    />
                    <FormError message={errors.contactEmail?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs rounded-l-lg">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        className={`input-field rounded-l-none ${errors.contactPhone ? 'input-error' : ''}`}
                        placeholder="9829012345"
                        {...register('contactPhone')}
                      />
                    </div>
                    <FormError message={errors.contactPhone?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Intended Capital Allocation (₹)</label>
                    <input
                      type="number"
                      step={500000}
                      className={`input-field ${errors.intendedCapital ? 'input-error' : ''}`}
                      {...register('intendedCapital')}
                    />
                    <FormError message={errors.intendedCapital?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Target Horizon (Years)</label>
                    <select className="input-field text-xs py-2" {...register('investmentHorizonYears')}>
                      <option value="1">1 - 2 Years</option>
                      <option value="3">3 - 5 Years</option>
                      <option value="7">7 - 10 Years</option>
                      <option value="15">10+ Years (Long Term Yield)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Requirements</label>
                    <textarea
                      rows={2}
                      className="input-field text-xs resize-none"
                      {...register('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-xs py-2.5 justify-center bg-emerald-700 hover:bg-emerald-800"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" /> : <Send size={14} />}
                    {isSubmitting ? 'Submitting...' : 'Request Due Diligence Docket'}
                  </button>

                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
                    <strong>Notice:</strong> Submission of interest creates no purchase obligation. All transactions are bilateral and subject to formal title deeds.
                  </div>
                </form>
              )}

              {/* Direct Commercial Desk */}
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                <span className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Commercial &amp; Land Advisory Direct Line
                </span>
                <div className="flex items-center justify-between">
                  <a href="tel:+919664247662" className="font-mono font-bold text-emerald-800 hover:underline">
                    +91 96642 47662
                  </a>
                  <a
                    href="https://wa.me/919664247662?text=Hello%20Jaipur%20Estates%2C%20inquiry%20regarding%20commercial%20asset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-medium hover:underline text-[11px]"
                  >
                    WhatsApp Desk →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
