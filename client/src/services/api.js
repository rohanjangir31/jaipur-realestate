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

export const buyApi = {
  getProperties: (params) => api.get('/buy', { params }),
  getProperty:   (id)     => api.get(`/buy/${id}`),
  createProperty:(data)   => api.post('/buy', data),
  getMyListings: ()       => api.get('/buy/my/listings'),
  updateProperty:(id, d)  => api.patch(`/buy/${id}`, d),
};

export const stayApi = {
  getStays:          (params)     => api.get('/stay', { params }),
  getStay:           (id)         => api.get(`/stay/${id}`),
  createStay:        (data)       => api.post('/stay', data),
  getMyStays:        ()           => api.get('/stay/my/listings'),
  updateStay:        (id, data)   => api.patch(`/stay/${id}`, data),
  addBlockedDates:   (id, data)   => api.post(`/stay/${id}/blocked-dates`, data),
  removeBlockedDates:(id, rangeId)=> api.delete(`/stay/${id}/blocked-dates/${rangeId}`),
};

export const investApi = {
  getAssets:    (params) => api.get('/invest/assets', { params }),
  getAsset:     (id)     => api.get(`/invest/assets/${id}`),
  saveCriteria: (data)   => api.post('/invest/criteria', data),
  getMyCriteria:()       => api.get('/invest/criteria'),
  getMatches:   ()       => api.get('/invest/matches'),
  createAsset:  (data)   => api.post('/invest/assets', data),
};

export const inquiryApi = {
  submitInquiry: (data)   => api.post('/inquiries', data),
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
