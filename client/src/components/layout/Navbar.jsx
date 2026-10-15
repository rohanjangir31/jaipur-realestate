import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  User,
  Plus,
  Phone,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS } from '../../utils/contact';

const NAV_LINKS = [
  { to: '/buy',    label: 'Buy Properties' },
  { to: '/invest', label: 'Commercial & Land' },
  { to: '/stay',   label: 'Heritage Stays' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setPhoneMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#161513] text-stone-200 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Official Vector Identity */}
          <Link to="/" className="flex items-center">
            <Logo variant="dark" />
          </Link>

          {/* Desktop Navigation Links - Natural, human labels */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded text-sm transition-colors ${
                    isActive
                      ? 'text-white font-medium bg-stone-800/80'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/40'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3 text-sm">
            {/* Direct Calling Desk Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPhoneMenuOpen(!phoneMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 border border-stone-700/80 transition-colors"
                title="Direct Phone Lines"
              >
                <Phone size={12} className="text-terracotta-400" />
                <span>Call Bureau</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${phoneMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {phoneMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#161513] border border-stone-800 rounded-xl shadow-2xl p-3 z-50 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-terracotta-400 uppercase tracking-wider px-1">
                    <span>Direct Bureau Lines</span>
                    <span className="text-emerald-400 font-sans">Active</span>
                  </div>
                  {CONTACT_NUMBERS.map(({ number, tel, shortLabel, role }) => (
                    <a
                      key={number}
                      href={tel}
                      className="block p-2 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-stone-800/80 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-xs font-mono font-medium text-white group-hover:text-terracotta-400">
                        <span>{number}</span>
                        <span className="text-[10px] text-stone-400 font-sans">{shortLabel}</span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">{role}</p>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* 1-Glance Prospectus */}
            <a
              href="/pamphlet.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-xs text-terracotta-400 hover:text-terracotta-300 font-medium px-2 py-1 rounded border border-stone-700/60 hover:border-terracotta-600/60 transition-colors"
              title="1-Glance Business Prospectus / Pamphlet"
            >
              <span>Prospectus</span>
              <span className="text-[9px] bg-terracotta-900/60 text-terracotta-300 px-1 rounded">1-Pg</span>
            </a>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 hover:bg-amber-900/60 transition-colors"
                  >
                    <LayoutDashboard size={14} />
                    Admin Portal
                  </Link>
                )}

                <Link
                  to={hasRole('host') ? '/stay/host/submit' : '/buy/submit'}
                  className="flex items-center gap-1 text-xs text-stone-300 hover:text-white px-2.5 py-1 rounded border border-stone-700 hover:border-stone-500 transition-colors"
                >
                  <Plus size={13} />
                  <span>List Property</span>
                </Link>

                {/* User Info */}
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-xs text-stone-200 font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-xs text-stone-300 max-w-[120px] truncate">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="text-stone-400 hover:text-stone-200 p-1.5 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/buy/submit"
                  className="text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                  List a Property
                </Link>
                <Link
                  to="/auth/login"
                  className="text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn-terracotta text-xs !py-1.5 !px-3.5 !rounded"
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
              className="p-2 text-stone-400 hover:text-white"
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
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded text-sm ${
                    isActive ? 'bg-stone-800 text-white font-medium' : 'text-stone-300'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-stone-800 pt-3 space-y-2 text-sm">
            {isAuthenticated ? (
              <>
                <div className="text-xs text-stone-400 px-3 py-1">
                  Signed in as <strong className="text-white">{user?.name}</strong>
                </div>
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="block px-3 py-1.5 text-xs text-amber-300 hover:bg-stone-800 rounded"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  to="/buy/submit"
                  className="block px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-800 rounded"
                >
                  Post a Property for Sale
                </Link>
                <Link
                  to="/stay/host/submit"
                  className="block px-3 py-1.5 text-xs text-stone-300 hover:bg-stone-800 rounded"
                >
                  List a Stay or Haveli
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-stone-800 rounded"
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
              <span className="text-[10px] font-mono text-terracotta-400 uppercase tracking-wider block px-3 mb-2">
                Direct Bureau Calling Lines
              </span>
              <div className="space-y-1.5 px-2">
                {CONTACT_NUMBERS.map(({ number, tel, shortLabel }) => (
                  <a
                    key={number}
                    href={tel}
                    className="flex items-center justify-between p-2 rounded bg-stone-900 border border-stone-800 text-xs font-mono text-stone-200"
                  >
                    <span className="flex items-center gap-2">
                      <Phone size={12} className="text-terracotta-500" />
                      {number}
                    </span>
                    <span className="text-[11px] font-sans text-stone-400">{shortLabel}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
