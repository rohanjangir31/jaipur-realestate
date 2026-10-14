import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import { authApi, setAccessToken } from '../services/api';

const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, isLoading: false };
    case 'LOADING_DONE':
      return { ...state, isLoading: false };
    case 'UPDATE_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Silent session restore on mount
  useEffect(() => {
    const restore = async () => {
      try {
        const { data: refreshData } = await authApi.refresh();
        setAccessToken(refreshData.data.accessToken);
        const { data: meData } = await authApi.getMe();
        dispatch({ type: 'LOGIN', user: meData.data.user });
      } catch {
        dispatch({ type: 'LOGOUT' });
      }
    };
    restore();
  }, []);

  // Listen for forced logout (e.g., refresh token expired)
  useEffect(() => {
    const handler = () => {
      setAccessToken(null);
      dispatch({ type: 'LOGOUT' });
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await authApi.login(credentials);
    setAccessToken(data.data.accessToken);
    dispatch({ type: 'LOGIN', user: data.data.user });
    return data.data.user;
  }, []);

  const register = useCallback(async (formData) => {
    const { data } = await authApi.register(formData);
    setAccessToken(data.data.accessToken);
    dispatch({ type: 'LOGIN', user: data.data.user });
    return data.data.user;
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* swallow */ }
    setAccessToken(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((user) => dispatch({ type: 'UPDATE_USER', user }), []);

  const hasRole = useCallback(
    (...roles) => roles.some((r) => state.user?.roles?.includes(r)),
    [state.user]
  );

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};
