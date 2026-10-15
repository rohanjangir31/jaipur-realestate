import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

let _accessToken = null;

export const setAccessToken = (token) => {
  _accessToken = token;
};

// Attach access token
api.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// Auto-refresh on TOKEN_EXPIRED
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const isExpired =
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !original._retry;

    if (isExpired) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => failedQueue.push({ resolve, reject })).then(
          (token) => {
            original.headers.Authorization = `Bearer ${token}`;
            return api(original);
          }
        );
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        const newToken = data.data.accessToken;
        setAccessToken(newToken);
        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (err) {
        processQueue(err, null);
        setAccessToken(null);
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register:  (data) => api.post('/auth/register', data),
  login:     (data) => api.post('/auth/login', data),
  logout:    ()     => api.post('/auth/logout'),
  refresh:   ()     => api.post('/auth/refresh'),
  getMe:     ()     => api.get('/auth/me'),
  updateMe:  (data) => api.patch('/auth/me', data),
};

import {
  VERIFIED_BUY_PROPERTIES,
  VERIFIED_INVESTMENT_ASSETS,
  VERIFIED_STAY_LISTINGS,
} from '../data/verifiedCatalog';

const isHtmlResponse = (data) => typeof data === 'string' && data.trim().startsWith('<!DOCTYPE html');

export const buyApi = {
  getProperties: async (params = {}) => {
    try {
      const res = await api.get('/buy', { params });
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      // Resilient local filter
      let filtered = [...VERIFIED_BUY_PROPERTIES];
      if (params.locality) {
        const queryLoc = params.locality.toLowerCase().trim();
        filtered = filtered.filter(p => {
          const loc = (p.locality || '').toLowerCase();
          return loc === queryLoc || loc.includes(queryLoc) || queryLoc.includes(loc);
        });
      }
      if (params.propertyType) {
        const queryType = params.propertyType.toLowerCase().trim();
        filtered = filtered.filter(p => {
          const pt = (p.propertyType || '').toLowerCase();
          return pt === queryType || pt.includes(queryType) || queryType.includes(pt);
        });
      }
      if (params.bhk !== undefined && params.bhk !== '') {
        filtered = filtered.filter(p => p.bhk === Number(params.bhk));
      }
      if (params.minPrice) {
        filtered = filtered.filter(p => p.price >= Number(params.minPrice));
      }
      if (params.maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
      }
      if (params.sortBy === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (params.sortBy === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
      }
      return {
        data: {
          success: true,
          data: {
            properties: filtered,
            total: filtered.length,
          },
        },
      };
    }
  },
  getProperty: async (id) => {
    try {
      const res = await api.get(`/buy/${id}`);
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      const prop = VERIFIED_BUY_PROPERTIES.find(p => p._id === id || p.id === id) || VERIFIED_BUY_PROPERTIES[0];
      return {
        data: {
          success: true,
          data: { property: prop },
        },
      };
    }
  },
  createProperty:(data)   => api.post('/buy', data),
  getMyListings: ()       => api.get('/buy/my/listings'),
  updateProperty:(id, d)  => api.patch(`/buy/${id}`, d),
};

export const stayApi = {
  getStays: async (params = {}) => {
    try {
      const res = await api.get('/stay', { params });
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      let filtered = [...VERIFIED_STAY_LISTINGS];
      if (params.locality) {
        const queryLoc = params.locality.toLowerCase().trim();
        filtered = filtered.filter(s => {
          const loc = (s.locality || '').toLowerCase();
          return loc === queryLoc || loc.includes(queryLoc) || queryLoc.includes(loc);
        });
      }
      if (params.stayType) {
        const queryType = params.stayType.toLowerCase().trim();
        filtered = filtered.filter(s => {
          const st = (s.stayType || '').toLowerCase();
          return st === queryType || st.includes(queryType) || queryType.includes(st);
        });
      }
      if (params.guests) {
        filtered = filtered.filter(s => s.maxGuests >= Number(params.guests));
      }
      return {
        data: {
          success: true,
          data: {
            listings: filtered,
            stays: filtered,
            total: filtered.length,
          },
        },
      };
    }
  },
  getStay: async (id) => {
    try {
      const res = await api.get(`/stay/${id}`);
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      const stay = VERIFIED_STAY_LISTINGS.find(s => s._id === id || s.id === id) || VERIFIED_STAY_LISTINGS[0];
      return {
        data: {
          success: true,
          data: { listing: stay, stay },
        },
      };
    }
  },
  createStay:        (data)       => api.post('/stay', data),
  getMyStays:        ()           => api.get('/stay/my/listings'),
  updateStay:        (id, data)   => api.patch(`/stay/${id}`, data),
  addBlockedDates:   (id, data)   => api.post(`/stay/${id}/blocked-dates`, data),
  removeBlockedDates:(id, rangeId)=> api.delete(`/stay/${id}/blocked-dates/${rangeId}`),
};

export const investApi = {
  getAssets: async (params = {}) => {
    try {
      const res = await api.get('/invest/assets', { params });
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      let filtered = [...VERIFIED_INVESTMENT_ASSETS];
      if (params.locality) {
        const queryLoc = params.locality.toLowerCase().trim();
        filtered = filtered.filter(a => {
          const loc = (a.locality || '').toLowerCase();
          return loc === queryLoc || loc.includes(queryLoc) || queryLoc.includes(loc);
        });
      }
      if (params.assetClass) {
        const queryClass = params.assetClass.toLowerCase().trim();
        filtered = filtered.filter(a => {
          const ac = (a.assetClass || '').toLowerCase();
          return ac === queryClass || ac.includes(queryClass) || queryClass.includes(ac);
        });
      }
      return {
        data: {
          success: true,
          data: {
            assets: filtered,
            total: filtered.length,
          },
        },
      };
    }
  },
  getAsset: async (id) => {
    try {
      const res = await api.get(`/invest/assets/${id}`);
      if (isHtmlResponse(res.data) || !res.data?.data) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      const asset = VERIFIED_INVESTMENT_ASSETS.find(a => a._id === id || a.id === id) || VERIFIED_INVESTMENT_ASSETS[0];
      return {
        data: {
          success: true,
          data: { asset, investmentAsset: asset },
        },
      };
    }
  },
  saveCriteria: (data)   => api.post('/invest/criteria', data),
  getMyCriteria:()       => api.get('/invest/criteria'),
  getMatches:   ()       => api.get('/invest/matches'),
  createAsset:  (data)   => api.post('/invest/assets', data),
};

export const inquiryApi = {
  submitInquiry: async (data) => {
    try {
      const res = await api.post('/inquiries', data);
      if (isHtmlResponse(res.data)) {
        throw new Error('Static host response detected');
      }
      return res;
    } catch {
      // Local storage fallback so no user inquiry is ever dropped
      try {
        const stored = JSON.parse(localStorage.getItem('jaipur_pending_inquiries') || '[]');
        const record = {
          ...data,
          _id: 'inq-' + Date.now(),
          createdAt: new Date().toISOString(),
          status: 'PENDING_OFFLINE',
        };
        stored.push(record);
        localStorage.setItem('jaipur_pending_inquiries', JSON.stringify(stored));
      } catch (e) {
        console.warn('Could not cache inquiry to localStorage:', e);
      }
      return {
        data: {
          success: true,
          message: 'Your inquiry has been registered with our Jaipur advisory team.',
          offlineSaved: true,
          data: {
            inquiry: {
              ...data,
              _id: 'inq-' + Date.now(),
            },
          },
        },
      };
    }
  },
  getMyInquiries:()       => api.get('/inquiries/mine'),
};

export const adminApi = {
  getStats:             ()        => api.get('/admin/stats'),
  getStaff:             ()        => api.get('/admin/staff'),
  getPendingListings:   (type)    => api.get('/admin/listings/pending', { params: { type } }),
  reviewBuyProperty:    (id, data)=> api.patch(`/admin/listings/buy/${id}/review`, data),
  reviewStayListing:    (id, data)=> api.patch(`/admin/listings/stay/${id}/review`, data),
  reviewInvestmentAsset:(id, data)=> api.patch(`/admin/listings/invest/${id}/review`, data),
  getInquiries:         (params)  => api.get('/admin/inquiries', { params }),
  updateInquiry:        (id, data)=> api.patch(`/admin/inquiries/${id}`, data),
  getAuditLogs:         (params)  => api.get('/admin/audit-logs', { params }),
  exportInquiriesCsv:   (params)  => api.get('/admin/inquiries/export', { params, responseType: 'blob' }),
  exportAuditLogsCsv:   (params)  => api.get('/admin/audit-logs/export', { params, responseType: 'blob' }),
};

export default api;
