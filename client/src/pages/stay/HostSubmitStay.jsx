import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BedDouble, CheckCircle2, ArrowLeft, UploadCloud, Sparkles } from 'lucide-react';
import { stayApi } from '../../services/api';
import { JAIPUR_LOCALITIES } from '../../utils/formatters';
import FormError from '../../components/ui/FormError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const STAY_TYPES = [
  'Airbnb Haveli',
  'Airbnb Homestay',
  'Airbnb Luxury Villa',
  'Airbnb Studio Apartment',
  'Airbnb Vacation Home',
];

const AMENITY_OPTIONS = [
  'WiFi',
  'Air Conditioning',
  'Traditional Rajasthani Decor',
  'Swimming Pool',
  'Kitchen Facility',
  'Caretaker On-site',
  'Power Backup',
  'Dedicated Workspace',
  'Complimentary Breakfast',
  'Free Parking',
  'CCTV in Common Areas',
  'Terrace / Courtyard',
];

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(150),
  description: z.string().min(20, 'Please provide at least 20 characters for description'),
  stayType: z.string().min(1, 'Please select a stay type'),
  locality: z.string().min(1, 'Please select a Jaipur locality'),
  address: z.string().min(5, 'Street address is required'),
  landmark: z.string().optional(),
  pinCode: z.string().regex(/^[1-9][0-9]{5}$/, 'Valid 6-digit PIN code required'),
  maxGuests: z.coerce.number().min(1).max(50),
  bedrooms: z.coerce.number().min(1),
  beds: z.coerce.number().min(1),
  bathrooms: z.coerce.number().min(1),
  basePricePerNight: z.coerce.number().min(500, 'Minimum nightly rate is ₹500'),
  weekendPriceMultiplier: z.coerce.number().min(1.0).max(2.5).default(1.0),
  cleaningFee: z.coerce.number().min(0).default(0),
  minNights: z.coerce.number().min(1).default(1),
  checkInTime: z.string().default('14:00'),
  checkOutTime: z.string().default('11:00'),
  petsAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  partiesAllowed: z.boolean().default(false),
  coverImageUrl: z.string().url('Cover image must be a valid image URL'),
  galleryImages: z.string().optional(),
  landmarksInput: z.string().optional(),
});

export default function HostSubmitStay() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([
    'WiFi',
    'Air Conditioning',
    'Traditional Rajasthani Decor',
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      stayType: 'Heritage Haveli',
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 2,
      basePricePerNight: 4500,
      weekendPriceMultiplier: 1.0,
      cleaningFee: 500,
      minNights: 1,
      checkInTime: '14:00',
      checkOutTime: '11:00',
      petsAllowed: false,
      smokingAllowed: false,
      partiesAllowed: false,
      coverImageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    },
  });

  const toggleAmenity = (item) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const onSubmit = async (formData) => {
    try {
      setServerError('');

      const galleryImageUrls = formData.galleryImages
        ? formData.galleryImages.split('\n').map((u) => u.trim()).filter((u) => u.startsWith('http'))
        : [];

      // Parse landmarks formatted as "Hawa Mahal: 2.5, Amer Fort: 8"
      const nearbyAttractions = formData.landmarksInput
        ? formData.landmarksInput
            .split(',')
            .map((item) => {
              const [name, dist] = item.split(':').map((s) => s.trim());
              return name && dist ? { name, distanceKm: Number(dist) || 1 } : null;
            })
            .filter(Boolean)
        : [];

      const payload = {
        title: formData.title,
        description: formData.description,
        stayType: formData.stayType,
        locality: formData.locality,
        address: formData.address,
        landmark: formData.landmark || '',
        pinCode: formData.pinCode,
        maxGuests: Number(formData.maxGuests),
        bedrooms: Number(formData.bedrooms),
        beds: Number(formData.beds),
        bathrooms: Number(formData.bathrooms),
        basePricePerNight: Number(formData.basePricePerNight),
        weekendPriceMultiplier: Number(formData.weekendPriceMultiplier),
        cleaningFee: Number(formData.cleaningFee),
        minNights: Number(formData.minNights),
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime,
        amenities: selectedAmenities,
        petsAllowed: formData.petsAllowed,
        smokingAllowed: formData.smokingAllowed,
        partiesAllowed: formData.partiesAllowed,
        nearbyAttractions,
        coverImageUrl: formData.coverImageUrl,
        galleryImageUrls,
      };

      await stayApi.createStay(payload);
      setSuccess(true);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to submit stay listing');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Accommodation Submitted</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your stay listing has been submitted for verification. Once approved by our team, guests visiting Jaipur can discover your property and send reservation inquiries.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link to="/stay" className="btn-primary text-sm justify-center bg-rose-600 hover:bg-rose-700">
              Browse Jaipur Stays
            </Link>
            <button
              onClick={() => setSuccess(false)}
              className="text-xs text-gray-500 hover:text-gray-700 py-1"
            >
              List Another Property
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
          <Link to="/stay" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-600">
            <ArrowLeft size={16} /> Back to Stays
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 mb-2">
              <Sparkles size={12} /> Airbnb Management &amp; Hosting
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">List Your Place for Airbnb Hosting</h1>
            <p className="text-gray-500 text-sm mt-1">
              List your courtyard haveli, luxury villa, or studio flat for Airbnb turnkey hosting or acquisition in Jaipur. Standard 1% commission.
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
              <h3 className="text-base font-semibold text-gray-900 mb-3">1. Basic Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Listing Title</label>
                  <input
                    type="text"
                    className={`input-field ${errors.title ? 'input-error' : ''}`}
                    placeholder="e.g. Royal Heritage Villa with Courtyard in Bani Park"
                    {...register('title')}
                  />
                  <FormError message={errors.title?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Stay Type</label>
                    <select
                      className={`input-field ${errors.stayType ? 'input-error' : ''}`}
                      {...register('stayType')}
                    >
                      {STAY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <FormError message={errors.stayType?.message} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Jaipur Locality</label>
                    <select
                      className={`input-field ${errors.locality ? 'input-error' : ''}`}
                      {...register('locality')}
                    >
                      <option value="">Select Locality</option>
                      {JAIPUR_LOCALITIES.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <FormError message={errors.locality?.message} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Street Address</label>
                  <input
                    type="text"
                    placeholder="House/Haveli name, street, nearby landmark"
                    className={`input-field ${errors.address ? 'input-error' : ''}`}
                    {...register('address')}
                  />
                  <FormError message={errors.address?.message} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 302016"
                      className={`input-field ${errors.pinCode ? 'input-error' : ''}`}
                      {...register('pinCode')}
                    />
                    <FormError message={errors.pinCode?.message} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nearby Jaipur Attractions (format: Landmark: DistanceKm)
                    </label>
                    <input
                      type="text"
                      placeholder="Hawa Mahal: 3.5, City Palace: 4.0, Airport: 12"
                      className="input-field text-xs"
                      {...register('landmarksInput')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    className={`input-field ${errors.description ? 'input-error' : ''}`}
                    placeholder="Describe the ambiance, traditional Rajasthani features, courtyard, surrounding quietness, proximity to sights..."
                    {...register('description')}
                  />
                  <FormError message={errors.description?.message} />
                </div>
              </div>
            </div>

            {/* Section 2: Capacity & Configuration */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">2. Capacity & Rooms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Max Guests</label>
                  <input type="number" min={1} max={50} className="input-field" {...register('maxGuests')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bedrooms</label>
                  <input type="number" min={1} className="input-field" {...register('bedrooms')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Beds</label>
                  <input type="number" min={1} className="input-field" {...register('beds')} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Bathrooms</label>
                  <input type="number" min={1} className="input-field" {...register('bathrooms')} />
                </div>
              </div>
            </div>

            {/* Section 3: Pricing & Timing */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">3. Nightly Pricing & Timings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Base Price / Night (₹ INR)</label>
                  <input
                    type="number"
                    className={`input-field ${errors.basePricePerNight ? 'input-error' : ''}`}
                    {...register('basePricePerNight')}
                  />
                  <FormError message={errors.basePricePerNight?.message} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cleaning Fee (₹)</label>
                  <input type="number" min={0} className="input-field" {...register('cleaningFee')} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Minimum Stay (Nights)</label>
                  <input type="number" min={1} className="input-field" {...register('minNights')} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in Time</label>
                  <input type="text" placeholder="14:00" className="input-field text-xs" {...register('checkInTime')} />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out Time</label>
                  <input type="text" placeholder="11:00" className="input-field text-xs" {...register('checkOutTime')} />
                </div>
              </div>
            </div>

            {/* Section 4: Amenities Checkbox Grid */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">4. Available Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {AMENITY_OPTIONS.map((item) => {
                  const isChecked = selectedAmenities.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleAmenity(item)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                        isChecked
                          ? 'border-rose-500 bg-rose-50 text-rose-900 font-medium'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{item}</span>
                      {isChecked && <CheckCircle2 size={14} className="text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section 5: House Rules */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">5. House Rules</h3>
              <div className="flex flex-wrap gap-6 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-rose-600 focus:ring-rose-500" {...register('petsAllowed')} />
                  <span>Pets Allowed</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-rose-600 focus:ring-rose-500" {...register('smokingAllowed')} />
                  <span>Smoking Permitted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-rose-600 focus:ring-rose-500" {...register('partiesAllowed')} />
                  <span>Parties / Events Allowed</span>
                </label>
              </div>
            </div>

            {/* Section 6: Photos */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">6. Photos</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Cover Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/haveli-cover.jpg"
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
                    placeholder="https://example.com/bedroom.jpg&#10;https://example.com/courtyard.jpg"
                    className="input-field text-xs resize-none"
                    {...register('galleryImages')}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm justify-center bg-rose-600 hover:bg-rose-700"
              >
                {isSubmitting ? <LoadingSpinner size="sm" /> : <UploadCloud size={18} />}
                {isSubmitting ? 'Submitting Stay Listing...' : 'Submit Accommodation for Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
