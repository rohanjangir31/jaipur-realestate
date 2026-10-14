import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import FormError from '../../components/ui/FormError';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ROLE_OPTIONS = [
  { value: 'buyer',    label: 'Buyer', desc: 'I want to buy property' },
  { value: 'owner',    label: 'Owner', desc: 'I want to list property for sale' },
  { value: 'investor', label: 'Investor', desc: 'I want to invest in property' },
  { value: 'host',     label: 'Host', desc: 'I want to list accommodation for stays' },
];

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number')
    .optional()
    .or(z.literal(''))
    .transform((v) => v === '' ? undefined : v),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  roles: z
    .array(z.enum(['buyer', 'owner', 'investor', 'host']))
    .min(1, 'Select at least one role'),
});

export default function Register() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [selectedRoles, setSelectedRoles] = useState(['buyer']);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { roles: ['buyer'] },
  });

  const toggleRole = (role) => {
    const next = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(next);
    setValue('roles', next, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await authRegister(data);
      navigate('/');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-jaipur-marble flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join JaipurEstates — free to get started</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a…</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_OPTIONS.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleRole(value)}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    selectedRoles.includes(value)
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm text-gray-900">{label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
            <FormError message={errors.roles?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Ramesh Sharma"
              className={`input-field ${errors.name ? 'input-error' : ''}`}
              {...register('name')}
            />
            <FormError message={errors.name?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            <FormError message={errors.email?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                +91
              </span>
              <input
                type="tel"
                placeholder="9876543210"
                maxLength={10}
                className={`input-field rounded-l-none ${errors.phone ? 'input-error' : ''}`}
                {...register('phone')}
              />
            </div>
            <FormError message={errors.phone?.message} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              className={`input-field ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            <FormError message={errors.password?.message} />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
            {isSubmitting ? <LoadingSpinner size="sm" /> : null}
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
