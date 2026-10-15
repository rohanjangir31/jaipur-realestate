import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Plus,
  Phone,
  ChevronDown,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../../utils/contact';

const NAV_LINKS = [
  { to: '/', shortLabel: 'Home', fullLabel: 'Home' },
  { to: '/buy', shortLabel: 'Buy & Sell', fullLabel: 'Buy & Sell' },
  { to: '/invest', shortLabel: 'Rent & Lease', fullLabel: 'Rent & Lease' },
  { to: '/stay', shortLabel: 'Airbnb', fullLabel: 'Airbnb & Stays' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const phoneMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setPhoneMenuOpen(false);
  }, [location.pathname]);

  // Close phone popover on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (phoneMenuRef.current && !phoneMenuRef.current.contains(e.target)) {
        setPhoneMenuOpen(false);
      }
    };
    if (phoneMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [phoneMenuOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#161513] text-stone-200 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation Links with Home, Buy & Sell, Rent & Lease, Airbnb */}
          <nav className="hidden md:flex items-center gap-1 shrink-0">
            {NAV_LINKS.map(({ to, shortLabel, fullLabel }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `h-9 inline-flex items-center px-3 lg:px-3.5 rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'text-white bg-stone-800/90 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
                  }`
                }
              >
                <span className="lg:hidden">{shortLabel}</span>
                <span className="hidden lg:inline">{fullLabel}</span>
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5 shrink-0 text-sm">
            {/* 1% Commission Tag */}
            <span className="hidden 2xl:inline-flex items-center gap-1 text-[11px] font-mono text-stone-400 bg-stone-900 border border-stone-800 px-2 py-1 rounded">
              <Sparkles size={11} className="text-terracotta-400" />
              1% Listing Commission
            </span>

            {/* Direct Calling Desk Popover with numbers only (no job tags) */}
            <div className="relative" ref={phoneMenuRef}>
              <button
                type="button"
                onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                className="h-9 inline-flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 transition-colors whitespace-nowrap"
                title="Direct Phone Lines"
              >
                <Phone size={12} className="text-terracotta-400 shrink-0" />
                <span>Direct Calling</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 text-stone-400 ${phoneMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {phoneMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#161513] border border-stone-800 rounded-xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between text-[10px] font-mono text-terracotta-400 uppercase tracking-wider px-1">
                    <span>Direct Lines · Open All 7 Days</span>
                    <span className="text-emerald-400 font-sans">Active</span>
                  </div>
                  {CONTACT_NUMBERS.map(({ number, tel, whatsapp }, index) => (
                    <div
                      key={number}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800/80 transition-colors"
                    >
                      <a
                        href={tel}
                        className="text-xs font-mono font-medium text-white hover:text-terracotta-400"
                      >
                        {number}
                      </a>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={tel}
                          className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[10px] text-stone-300 font-medium"
                        >
                          Call
                        </a>
                        <a
                          href={whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-950/70 border border-emerald-900/40 text-emerald-400 hover:text-emerald-300"
                          title="WhatsApp"
                        >
                          <MessageSquare size={11} />
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="text-[10px] text-stone-500 text-center pt-1">
                    {OFFICE_HOURS}
                  </div>
                </div>
              )}
            </div>

            {/* Client Marketing Poster Link */}
            <Link
              to="/poster"
              className="hidden xl:inline-flex h-9 items-center gap-1.5 text-xs text-terracotta-400 hover:text-terracotta-300 font-medium px-2.5 rounded-lg border border-stone-700/60 hover:border-terracotta-600/60 transition-colors whitespace-nowrap"
              title="Official Marketing Poster / Client Brief"
            >
              <span>Marketing Poster</span>
              <span className="text-[9px] bg-terracotta-900/60 text-terracotta-300 px-1 py-0.5 rounded font-mono">1%</span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="h-9 inline-flex items-center gap-1.5 px-3 rounded-lg text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 hover:bg-amber-900/60 transition-colors whitespace-nowrap"
                  >
                    <LayoutDashboard size={13} />
                    <span>Admin</span>
                  </Link>
                )}

                <Link
                  to="/buy/submit"
                  className="hidden lg:inline-flex h-9 items-center gap-1 text-xs text-stone-300 hover:text-white px-2.5 rounded-lg border border-stone-700 hover:border-stone-500 transition-colors whitespace-nowrap"
                >
                  <Plus size={13} />
                  <span>Post Property</span>
                </Link>

                <div className="flex items-center gap-2 pl-1">
                  <div className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs text-stone-200 font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden xl:inline text-xs text-stone-300 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="h-9 w-9 inline-flex items-center justify-center text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 lg:gap-2">
                <Link
                  to="/buy/submit"
                  className="hidden lg:inline-flex h-9 items-center text-xs text-stone-300 hover:text-white px-3 rounded-lg hover:bg-stone-800/40 transition-colors whitespace-nowrap"
                >
                  Post Property
                </Link>
                <Link
                  to="/auth/login"
                  className="h-9 inline-flex items-center text-xs text-stone-300 hover:text-white px-3 rounded-lg hover:bg-stone-800/40 transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="h-9 inline-flex items-center justify-center text-xs font-medium text-white bg-terracotta-600 hover:bg-terracotta-700 px-3.5 rounded-lg transition-colors shadow-sm whitespace-nowrap"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-[#161513] px-4 py-4 space-y-3">
          <nav className="space-y-1">
            {NAV_LINKS.map(({ to, fullLabel }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm ${
                    isActive ? 'bg-stone-800 text-white font-medium' : 'text-stone-300 hover:bg-stone-800/50'
                  }`
                }
              >
                {fullLabel}
              </NavLink>
            ))}
            <NavLink
              to="/poster"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm ${
                  isActive ? 'bg-stone-800 text-white font-medium' : 'text-stone-300 hover:bg-stone-800/50'
                }`
              }
            >
              Marketing Poster (1-Glance)
            </NavLink>
          </nav>

          <div className="border-t border-stone-800 pt-3 space-y-2 text-sm">
            <div className="px-3 py-1 text-xs text-terracotta-400 font-mono">
              ★ 1% Transparent Listing Commission
            </div>

            {isAuthenticated ? (
              <>
                <div className="text-xs text-stone-400 px-3 py-1">
                  Signed in as <strong className="text-white">{user?.name}</strong>
                </div>
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="block px-3 py-1.5 text-xs text-amber-300 hover:bg-stone-800 rounded-lg"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/buy/submit"
                  className="block px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-800 rounded-lg"
                >
                  Post a Property
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-stone-800 rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/auth/login"
                  className="btn-secondary !text-stone-900 text-center text-xs py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn-terracotta text-center text-xs py-2"
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* Mobile Calling Lines */}
            <div className="pt-3 border-t border-stone-800">
              <span className="text-[10px] font-mono text-terracotta-400 uppercase tracking-wider block px-3 mb-2 font-medium">
                Direct Calling · All 7 Days
              </span>
              <div className="space-y-1.5 px-2">
                {CONTACT_NUMBERS.map(({ number, tel, whatsapp }) => (
                  <div
                    key={number}
                    className="flex items-center justify-between p-2 rounded-lg bg-stone-900 border border-stone-800 text-xs font-mono text-stone-200"
                  >
                    <a href={tel} className="flex items-center gap-2 hover:text-white">
                      <Phone size={12} className="text-terracotta-500" />
                      {number}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <a href={tel} className="px-2 py-0.5 rounded bg-stone-800 text-[10px] text-stone-300">
                        Call
                      </a>
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded bg-emerald-950 text-emerald-400"
                      >
                        <MessageSquare size={11} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
