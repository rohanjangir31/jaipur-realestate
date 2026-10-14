import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Users,
  Bed,
  Bath,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowLeft,
  Send,
  Sparkles,
  Info,
} from 'lucide-react';
import { stayApi, inquiryApi } from '../../services/api';
import { formatINR } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import FormError from '../../components/ui/FormError';

const stayInquirySchema = z.object({
  contactName: z.string().min(2, 'Name must be at least 2 characters'),
  contactEmail: z.string().email('Invalid email address'),
  contactPhone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  guestsCount: z.coerce.number().min(1, 'At least 1 guest required'),
  purposeOfStay: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export default function StayDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [stay, setStay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImage, setActiveImage] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState('');

  const initialCheckIn = searchParams.get('checkIn') || '';
  const initialCheckOut = searchParams.get('checkOut') || '';
  const initialGuests = Number(searchParams.get('guests')) || 2;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(stayInquirySchema),
    defaultValues: {
      contactName: user?.name || '',
      contactEmail: user?.email || '',
      contactPhone: user?.phone || '',
      checkInDate: initialCheckIn,
      checkOutDate: initialCheckOut,
      guestsCount: initialGuests,
      purposeOfStay: 'Vacation / Leisure',
      message: 'Hello, I would like to inquire about staying at your property for these dates.',
    },
  });

  const watchedCheckIn = watch('checkInDate');
  const watchedCheckOut = watch('checkOutDate');

  useEffect(() => {
    const fetchStay = async () => {
      try {
        setLoading(true);
        const res = await stayApi.getStay(id);
        const st = res.data.data.stay;
        setStay(st);
        setActiveImage(st.coverImageUrl);
      } catch (err) {
        setError(err.response?.data?.message || 'Accommodation not found');
      } finally {
        setLoading(false);
      }
    };
    fetchStay();
  }, [id]);

  // Calculate estimated cost
  let calculatedNights = 0;
  let estimatedTotal = 0;
  if (watchedCheckIn && watchedCheckOut && stay) {
    const start = new Date(watchedCheckIn);
    const end = new Date(watchedCheckOut);
    if (!isNaN(start) && !isNaN(end) && end > start) {
      calculatedNights = Math.round((end - start) / (1000 * 60 * 60 * 24));
      estimatedTotal = calculatedNights * stay.basePricePerNight + (stay.cleaningFee || 0);
    }
  }

  const onInquirySubmit = async (formData) => {
    try {
      setInquiryError('');
      await inquiryApi.submitInquiry({
        inquiryType: 'STAY',
        referenceId: id,
        referenceModel: 'StayListing',
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        message: formData.message,
        details: {
          stayTitle: stay?.title,
          locality: stay?.locality,
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          guestsCount: formData.guestsCount,
          purposeOfStay: formData.purposeOfStay,
          nights: calculatedNights,
          estimatedCost: estimatedTotal,
        },
      });
      setInquirySuccess(true);
      reset();
    } catch (err) {
      setInquiryError(err.response?.data?.message || 'Failed to submit stay inquiry');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !stay) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6">
          {error || 'Accommodation not found'}
        </div>
        <Link to="/stay" className="btn-primary inline-flex">
          <ArrowLeft size={16} /> Back to Stays
        </Link>
      </div>
    );
  }

  const allImages = [stay.coverImageUrl, ...(stay.galleryImageUrls || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link to="/stay" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600">
            <ArrowLeft size={16} /> Back to Jaipur Stays
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-rose-100 text-rose-800 font-semibold">{stay.stayType}</span>
                <span className="badge-green">Verified Host Listing</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">{stay.title}</h1>
              <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                <MapPin size={15} className="text-rose-600" />
                <span>
                  {stay.address}, {stay.locality}, Jaipur — {stay.pinCode}
                </span>
              </p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-3xl font-bold text-gray-900">
                ₹{stay.basePricePerNight.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-gray-500 ml-1">/ night</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Accommodates up to {stay.maxGuests} guests
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={activeImage}
                  alt={stay.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
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
                        activeImage === img ? 'border-rose-600' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accommodation Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Capacity & Configuration</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Max Capacity</span>
                  <span className="font-semibold text-gray-900">{stay.maxGuests} Guests</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Bedrooms</span>
                  <span className="font-semibold text-gray-900">{stay.bedrooms} Bed</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Beds</span>
                  <span className="font-semibold text-gray-900">{stay.beds} Beds</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Bathrooms</span>
                  <span className="font-semibold text-gray-900">{stay.bathrooms} Bath</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Check-in</span>
                  <span className="font-semibold text-gray-900">{stay.checkInTime}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Check-out</span>
                  <span className="font-semibold text-gray-900">{stay.checkOutTime}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Min Stay</span>
                  <span className="font-semibold text-gray-900">{stay.minNights} Night(s)</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-xs text-gray-500 block">Cleaning Fee</span>
                  <span className="font-semibold text-gray-900">₹{stay.cleaningFee}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">About this Accommodation</h2>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{stay.description}</p>
            </div>

            {/* Nearby Jaipur Attractions */}
            {stay.nearbyAttractions && stay.nearbyAttractions.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Proximity to Jaipur Landmarks</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {stay.nearbyAttractions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-xs text-rose-600 font-semibold">{item.distanceKm} km away</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {stay.amenities && stay.amenities.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">Amenities & Conveniences</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stay.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-rose-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-3">House Rules</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Pets:</strong> {stay.petsAllowed ? 'Allowed' : 'Not Allowed'}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Smoking:</strong> {stay.smokingAllowed ? 'Permitted' : 'Strictly Non-Smoking'}
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <strong>Parties / Events:</strong> {stay.partiesAllowed ? 'Allowed upon request' : 'No Parties'}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking / Inquiry Form (1 Column) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">Request a Stay</h3>
              <p className="text-gray-500 text-xs mb-4">
                Inquiry-based reservation. Our team verifies host availability and coordinates directly.
              </p>

              {inquirySuccess ? (
                <div className="bg-rose-50 border border-rose-200 text-rose-900 p-5 rounded-lg text-center space-y-2">
                  <CheckCircle2 size={32} className="mx-auto text-rose-600" />
                  <h4 className="font-semibold text-sm">Stay Request Sent</h4>
                  <p className="text-xs leading-relaxed">
                    We have received your dates inquiry. The host will confirm availability shortly.
                  </p>
                  <button
                    onClick={() => setInquirySuccess(false)}
                    className="text-xs text-rose-700 underline font-medium mt-2"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onInquirySubmit)} noValidate className="space-y-4">
                  {inquiryError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs">
                      {inquiryError}
                    </div>
                  )}

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        className={`input-field text-xs ${errors.checkInDate ? 'input-error' : ''}`}
                        {...register('checkInDate')}
                      />
                      <FormError message={errors.checkInDate?.message} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        min={watchedCheckIn || undefined}
                        className={`input-field text-xs ${errors.checkOutDate ? 'input-error' : ''}`}
                        {...register('checkOutDate')}
                      />
                      <FormError message={errors.checkOutDate?.message} />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Total Guests</label>
                    <input
                      type="number"
                      min={1}
                      max={stay.maxGuests}
                      className={`input-field ${errors.guestsCount ? 'input-error' : ''}`}
                      {...register('guestsCount')}
                    />
                    <FormError message={errors.guestsCount?.message} />
                  </div>

                  {/* Estimated Price Breakdown */}
                  {calculatedNights > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg text-xs space-y-1.5 border border-gray-100">
                      <div className="flex justify-between text-gray-600">
                        <span>
                          ₹{stay.basePricePerNight.toLocaleString('en-IN')} × {calculatedNights} nights
                        </span>
                        <span>₹{(calculatedNights * stay.basePricePerNight).toLocaleString('en-IN')}</span>
                      </div>
                      {stay.cleaningFee > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Cleaning fee</span>
                          <span>₹{stay.cleaningFee.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-gray-900 text-sm">
                        <span>Estimated Total</span>
                        <span className="text-rose-700">₹{estimatedTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      className={`input-field ${errors.contactName ? 'input-error' : ''}`}
                      placeholder="e.g. Priya Sen"
                      {...register('contactName')}
                    />
                    <FormError message={errors.contactName?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className={`input-field ${errors.contactEmail ? 'input-error' : ''}`}
                      placeholder="priya@example.com"
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Special Requests / Message</label>
                    <textarea
                      rows={2}
                      className="input-field text-xs resize-none"
                      {...register('message')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full text-xs py-2.5 justify-center bg-rose-600 hover:bg-rose-700"
                  >
                    {isSubmitting ? <LoadingSpinner size="sm" /> : <Send size={14} />}
                    {isSubmitting ? 'Sending Request...' : 'Send Stay Reservation Inquiry'}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    Direct host contact following review. No payments processed on this portal.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
