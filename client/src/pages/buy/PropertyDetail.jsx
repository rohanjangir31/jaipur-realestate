import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Layers,
  Compass,
  Car,
  Bath,
  ArrowLeft,
  Send,
  MessageSquare,
  Phone,
  ExternalLink,
} from 'lucide-react';
import { buyApi, inquiryApi } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { usePageMeta } from '../../utils/usePageMeta';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FormError from '../../components/ui/FormError';

const inquirySchema = z.object({
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  preferredVisitDate: z.string().optional(),
  financingRequired: z.boolean().default(false),
  message: z.string().max(1000).optional(),
});

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [activeImage, setActiveImage] = useState('');

  usePageMeta({
    title: property ? `${property.title} in ${property.locality}` : 'Property Details',
    description: property?.description || 'Verified residential property listing in Jaipur.',
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
      financingRequired: false,
      message: 'I am interested in this property. Please share further details and arrange a visit.',
    },
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await buyApi.getProperty(id);
        const prop = res.data.data.property;
        setProperty(prop);
        setActiveImage(prop.coverImageUrl);
      } catch (err) {
        setError(err.response?.data?.message || 'Property not found or unavailable');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const onInquirySubmit = async (formData) => {
    try {
      setInquiryError('');
      await inquiryApi.submitInquiry({
        inquiryType: 'BUY',
        referenceId: id,
        referenceModel: 'BuyProperty',
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        message: formData.message,
        details: {
          preferredVisitDate: formData.preferredVisitDate,
          financingRequired: formData.financingRequired,
          propertyTitle: property?.title,
          locality: property?.locality,
        },
      });
      setInquirySuccess(true);
      reset();
    } catch (err) {
      setInquiryError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6">
          {error || 'Property not found'}
        </div>
        <Link to="/buy" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Back to Listings
        </Link>
      </div>
    );
  }

  const allImages = [property.coverImageUrl, ...(property.galleryImageUrls || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/buy" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600">
            <ArrowLeft size={16} /> Back to Buy Listings
          </Link>
        </div>

        {/* Top Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="badge-blue">{property.propertyType}</span>
                <span className="badge-green inline-flex items-center gap-1">
                  1% Listing Commission
                </span>
                <span className="text-xs text-stone-500 font-mono">Market Estimate</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">{property.title}</h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <MapPin size={15} className="text-brand-600" />
                <span>
                  {property.address}, {property.locality}, Jaipur — {property.pinCode}
                </span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-0.5">Estimated Price</div>
              <div className="text-3xl font-bold text-terracotta-700">Est. {formatINR(property.price)}</div>
              {property.pricePerSqFt && (
                <div className="text-xs text-stone-500 mt-1">
                  Est. ₹{property.pricePerSqFt.toLocaleString('en-IN')} per sq.ft
                </div>
              )}
              {property.isNegotiable && (
                <span className="inline-block text-xs font-medium text-emerald-600 mt-1">Price Negotiable</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery View */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={activeImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';
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
                        activeImage === img ? 'border-brand-600' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Overview / Specs Grid */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Specifications & Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Bedrooms (BHK)</span>
                  <span className="font-semibold text-gray-900">{property.bhk} BHK</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Super Built-up Area</span>
                  <span className="font-semibold text-gray-900">{property.superAreaSqFt} sq.ft</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Carpet Area</span>
                  <span className="font-semibold text-gray-900">{property.carpetAreaSqFt ? `${property.carpetAreaSqFt} sq.ft` : 'N/A'}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Possession</span>
                  <span className="font-semibold text-gray-900">{property.possessionStatus}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Bathrooms</span>
                  <span className="font-semibold text-gray-900">{property.bathrooms}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Floor / Total Floors</span>
                  <span className="font-semibold text-gray-900">{property.floor} of {property.totalFloors}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Facing</span>
                  <span className="font-semibold text-gray-900">{property.facing}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Ownership Type</span>
                  <span className="font-semibold text-gray-900">{property.ownershipType}</span>
                </div>

                {property.carpetAreaSqFt && property.superAreaSqFt && (
                  <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-lg col-span-2 sm:col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-amber-900">
                    <span>
                      <strong>Carpet Area Efficiency: {((property.carpetAreaSqFt / property.superAreaSqFt) * 100).toFixed(0)}%</strong> (Net usable carpet space: {property.carpetAreaSqFt} sq.ft vs {property.superAreaSqFt} sq.ft super built-up)
                    </span>
                    <span className="text-[11px] font-semibold text-amber-800">
                      Usable Carpet Area Disclosed
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">About this Property</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-brand-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Inquiry Form (1 Column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Interested in this Property?</h3>
              <p className="text-gray-500 text-xs mb-4">
                Send an inquiry to schedule a verified property visit or connect directly with our advisory desk.
              </p>

              {/* Instant WhatsApp Inquiry */}
              <a
                href={`https://wa.me/917737213615?text=${encodeURIComponent(`Hello Jaipur Estates, I would like to inquire about "${property.title}" (ID: ${property._id || id}) in ${property.locality}. Please share verified documents and arrange a visit.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mb-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
              >
                <MessageSquare size={15} />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <div className="relative flex py-1 items-center mb-4">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-[10px] text-gray-400 uppercase tracking-wider">or submit visit request</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {inquirySuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-lg text-center space-y-3">
                  <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                  <h4 className="font-semibold text-sm">Inquiry Logged with Jaipur Advisory</h4>
                  <p className="text-xs leading-relaxed text-emerald-700">
                    Your request for <strong>{property.title}</strong> has been registered. An advisor will reach out within 24 business hours.
                  </p>
                  <div className="pt-2 border-t border-emerald-200 flex flex-col gap-2">
                    <a
                      href={`https://wa.me/917737213615?text=${encodeURIComponent(`Hello, I just submitted an inquiry on Jaipur Estates for "${property.title}" (Ref: ${property._id || id}). Looking forward to details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                    >
                      <MessageSquare size={13} /> Open in WhatsApp Desk
                    </a>
                    <a
                      href="tel:+917737213615"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors"
                    >
                      <Phone size={13} /> Call Primary Desk (+91 77372 13615)
                    </a>
                  </div>
                  <button
                    onClick={() => setInquirySuccess(false)}
                    className="text-xs text-stone-500 underline hover:text-stone-800 mt-2 block"
                  >
                    Submit another inquiry
                  </button>
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
                      placeholder="e.g. Anand Sharma"
                      {...register('contactName')}
                    />
                    <FormError message={errors.contactName?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className={`input-field ${errors.contactEmail ? 'input-error' : ''}`}
                      placeholder="anand@example.com"
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
                        placeholder="9876543210"
                        {...register('contactPhone')}
                      />
                    </div>
                    <FormError message={errors.contactPhone?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Visit Date</label>
                    <input
                      type="date"
                      className="input-field"
                      {...register('preferredVisitDate')}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="financingRequired"
                      className="rounded text-brand-600 focus:ring-brand-500"
                      {...register('financingRequired')}
                    />
                    <label htmlFor="financingRequired" className="text-xs text-gray-700 cursor-pointer">
                      I require bank loan / financing assistance
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={3}
                      className="input-field text-xs resize-none"
                      {...register('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-xs py-2.5 justify-center"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" /> : <Send size={14} />}
                    {isSubmitting ? 'Submitting...' : 'Send Inquiry & Schedule Visit'}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    By submitting, you agree to receive follow-up communication regarding this listing.
                  </p>
                </form>
              )}

              {/* Direct Call Desk */}
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs">
                <span className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Prefer direct phone assistance?
                </span>
                <div className="flex items-center justify-between">
                  <a href="tel:+917737213615" className="font-mono font-bold text-terracotta-700 hover:underline">
                    +91 77372 13615
                  </a>
                  <a
                    href="https://wa.me/917737213615?text=Hello%20Jaipur%20Estates%2C%20inquiry%20regarding%20listing"
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
