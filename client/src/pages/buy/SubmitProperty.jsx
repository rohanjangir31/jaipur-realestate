import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Building, ShieldCheck, CheckCircle2, ArrowLeft, UploadCloud } from 'lucide-react';
import { buyApi } from '../../services/api';
import { JAIPUR_LOCALITIES } from '../../utils/formatters';
import FormError from '../../components/ui/FormError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const PROPERTY_TYPES = [
  'Apartment/Flat',
  'Independent House/Villa',
  'Plot/Land',
  'Commercial Office/Shop',
  'Penthouse',
];

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(150),
  description: z.string().min(20, 'Please provide at least 20 characters for description'),
  locality: z.string().min(1, 'Please select a Jaipur locality'),
  address: z.string().min(5, 'Full street address is required'),
  landmark: z.string().optional(),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'),
  propertyType: z.string().min(1, 'Property type is required'),
  transactionType: z.enum(['Resale', 'New Construction']),
  facing: z.string(),
  bhk: z.coerce.number().min(0).max(10),
  bathrooms: z.coerce.number().min(0).default(1),
  superAreaSqFt: z.coerce.number().min(50, 'Minimum 50 sq ft required'),
  carpetAreaSqFt: z.coerce.number().optional().nullable(),
  possessionStatus: z.enum(['Ready to Move', 'Under Construction']),
  price: z.coerce.number().min(100000, 'Minimum price is ₹1 Lakh'),
  isNegotiable: z.boolean().default(false),
  ownershipType: z.enum(['Freehold', 'Leasehold', 'Patta', 'Other']),
  coverImageUrl: z.string().url('Cover image must be a valid image URL'),
  galleryImages: z.string().optional(),
  amenitiesList: z.string().optional(),
});

export default function SubmitProperty() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionType: 'Resale',
      possessionStatus: 'Ready to Move',
      ownershipType: 'Freehold',
      facing: 'East',
      bhk: 2,
      bathrooms: 2,
      isNegotiable: false,
      coverImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
  });

  const onSubmit = async (formData) => {
    try {
      setServerError('');

      // Process comma-separated gallery images & amenities
      const galleryImageUrls = formData.galleryImages
        ? formData.galleryImages.split('\n').map((u) => u.trim()).filter((u) => u.startsWith('http'))
        : [];

      const amenities = formData.amenitiesList
        ? formData.amenitiesList.split(',').map((a) => a.trim()).filter(Boolean)
        : [];

      const payload = {
        title: formData.title,
        description: formData.description,
        locality: formData.locality,
        address: formData.address,
        landmark: formData.landmark || '',
        pinCode: formData.pinCode,
        propertyType: formData.propertyType,
        transactionType: formData.transactionType,
        facing: formData.facing,
        bhk: Number(formData.bhk),
        bathrooms: Number(formData.bathrooms),
        superAreaSqFt: Number(formData.superAreaSqFt),
        carpetAreaSqFt: formData.carpetAreaSqFt ? Number(formData.carpetAreaSqFt) : null,
        possessionStatus: formData.possessionStatus,
        price: Number(formData.price),
        isNegotiable: formData.isNegotiable,
        ownershipType: formData.ownershipType,
        coverImageUrl: formData.coverImageUrl,
        galleryImageUrls,
        amenities,
      };

      await buyApi.createProperty(payload);
      setSuccess(true);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to submit property listing');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Submitted for Review</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your property listing has been successfully submitted! Our team will review the details and verify pricing before making it publicly visible on the platform. Standard 1% commission applies upon deal closing.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link to="/buy" className="btn-primary text-sm justify-center">
              Browse Buy Listings
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="text-xs text-gray-500 hover:text-gray-700 py-1"
            >
              Submit Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/buy" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600">
            <ArrowLeft size={16} /> Back to Listings
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <h1 className="text-2xl font-serif font-bold text-gray-900">Post a Property in Jaipur</h1>
            <p className="text-gray-500 text-sm mt-1">
              List your residential or commercial property. All listings undergo administrative verification before publishing.
            </p>
          </div>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Section 1: Basic Info */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">1. Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Property Title</label>
                  <input
                    type="text"
                    className={`input-field ${errors.title ? 'input-error' : ''}`}
                    placeholder="e.g. 3 BHK Luxury Apartment near Amrapali Circle, Vaishali Nagar"
                    {...register('title')}
                  />
                  <FormError message={errors.title?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Property Type</label>
                    <select
                      className={`input-field ${errors.propertyType ? 'input-error' : ''}`}
                      {...register('propertyType')}
                    >
                      <option value="">Select Property Type</option>
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <FormError message={errors.propertyType?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Transaction Type</label>
                    <select className="input-field" {...register('transactionType')}>
                      <option value="Resale">Resale</option>
                      <option value="New Construction">New Construction</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    className={`input-field ${errors.description ? 'input-error' : ''}`}
                    placeholder="Describe the property layout, ventilation, neighborhood highlights, proximity to metro or key markets..."
                    {...register('description')}
                  />
                  <FormError message={errors.description?.message} />
                </div>
              </div>
            </div>

            {/* Section 2: Jaipur Location */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">2. Jaipur Location Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Locality</label>
                  <select
                    className={`input-field ${errors.locality ? 'input-error' : ''}`}
                    {...register('locality')}
                  >
                    <option value="">Select Jaipur Locality</option>
                    {JAIPUR_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <FormError message={errors.locality?.message} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 302021"
                    className={`input-field ${errors.pinCode ? 'input-error' : ''}`}
                    {...register('pinCode')}
                  />
                  <FormError message={errors.pinCode?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Detailed Street Address</label>
                  <input
                    type="text"
                    placeholder="Plot / Flat number, building name, street"
                    className={`input-field ${errors.address ? 'input-error' : ''}`}
                    {...register('address')}
                  />
                  <FormError message={errors.address?.message} />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Prominent Landmark (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Akshardham Temple"
                    className="input-field"
                    {...register('landmark')}
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Configuration & Area */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">3. Configuration & Measurements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bedrooms (BHK)</label>
                  <input type="number" min={0} max={10} className="input-field" {...register('bhk')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bathrooms</label>
                  <input type="number" min={0} className="input-field" {...register('bathrooms')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Super Area (sq.ft)</label>
                  <input
                    type="number"
                    className={`input-field ${errors.superAreaSqFt ? 'input-error' : ''}`}
                    {...register('superAreaSqFt')}
                  />
                  <FormError message={errors.superAreaSqFt?.message} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Carpet Area (sq.ft)</label>
                  <input type="number" className="input-field" {...register('carpetAreaSqFt')} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Facing</label>
                  <select className="input-field" {...register('facing')}>
                    <option value="East">East</option>
                    <option value="North">North</option>
                    <option value="North-East">North-East</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Possession Status</label>
                  <select className="input-field" {...register('possessionStatus')}>
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Ownership Type</label>
                  <select className="input-field" {...register('ownershipType')}>
                    <option value="Freehold">Freehold</option>
                    <option value="Leasehold">Leasehold</option>
                    <option value="Patta">Patta</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Pricing */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">4. Pricing & Commission</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Expected Price (₹ INR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 7500000"
                    className={`input-field ${errors.price ? 'input-error' : ''}`}
                    {...register('price')}
                  />
                  <FormError message={errors.price?.message} />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isNegotiable"
                    className="rounded text-brand-600 focus:ring-brand-500"
                    {...register('isNegotiable')}
                  />
                  <label htmlFor="isNegotiable" className="text-xs text-gray-700 font-medium cursor-pointer">
                    Price is negotiable
                  </label>
                </div>

                <div className="sm:col-span-2 bg-stone-50 border border-stone-200 p-3.5 rounded-xl text-xs text-stone-600">
                  <strong className="text-stone-900 block font-semibold mb-0.5">Transparent 1% Listing Commission</strong>
                  Standard 1% listing and brokerage commission applies only upon successfully concluded transactions. No upfront fees.
                </div>
              </div>
            </div>

            {/* Section 5: Media & Amenities */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">5. Photos & Features</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/property-cover.jpg"
                    className={`input-field ${errors.coverImageUrl ? 'input-error' : ''}`}
                    {...register('coverImageUrl')}
                  />
                  <FormError message={errors.coverImageUrl?.message} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Additional Gallery Image URLs (one per line)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                    className="input-field text-xs resize-none"
                    {...register('galleryImages')}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Amenities (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Lift, Power Backup, Covered Parking, Security, Club House, Modular Kitchen"
                    className="input-field text-xs"
                    {...register('amenitiesList')}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm justify-center"
              >
                {isSubmitting ? <LoadingSpinner size="sm" /> : <UploadCloud size={18} />}
                {isSubmitting ? 'Submitting Property...' : 'Submit Listing for Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
