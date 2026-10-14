/**
 * Format a number as Indian Rupee (e.g., 8500000 → "₹85 Lakh")
 */
export const formatINR = (amount) => {
  if (!amount && amount !== 0) return '—';
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`;
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(2)} Lakh`;
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Format a date string to Indian locale
 */
export const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
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
  buyer:       'Buyer',
  owner:       'Property Owner',
  investor:    'Investor',
  host:        'Stay Host',
  agent:       'Agent',
  admin:       'Admin',
  super_admin: 'Super Admin',
};
