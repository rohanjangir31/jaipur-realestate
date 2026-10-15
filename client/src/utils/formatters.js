/**
 * Format a number as Indian Rupee with clear estimate notation (e.g., 8500000 → "Est. ₹85 Lakh")
 */
export const formatINR = (amount, includeEstimate = true) => {
  if (!amount && amount !== 0) return '—';
  let formatted = '';
  if (amount >= 10_000_000) {
    formatted = `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  } else if (amount >= 100_000) {
    formatted = `₹${(amount / 100_000).toFixed(2)} Lakh`;
  } else {
    formatted = `₹${amount.toLocaleString('en-IN')}`;
  }
  return includeEstimate ? `Est. ${formatted}` : formatted;
};

/**
 * Format a date string to Indian locale
 */
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Jaipur localities for dropdowns
 */
export const JAIPUR_LOCALITIES = [
  'Vaishali Nagar',
  'Malviya Nagar',
  'Mansarovar',
  'Jagatpura',
  'C-Scheme',
  'Raja Park',
  'Ajmer Road',
  'Tonk Road',
  'Pratap Nagar',
  'Murlipura',
  'Sitapura',
  'Sanganer',
  'Jhotwara',
  'Shyam Nagar',
  'Adarsh Nagar',
  'Civil Lines',
  'Bani Park',
  'Pink City (Walled City)',
  'Gopalpura',
  'Durgapura',
  'Other',
];

/**
 * Get role display label
 */
export const ROLE_LABELS = {
  buyer: 'Buyer / Seller',
  owner: 'Property Owner',
  investor: 'Tenant / Investor',
  host: 'Airbnb Host',
  agent: 'Associate',
  admin: 'Admin',
  super_admin: 'Super Admin',
};
