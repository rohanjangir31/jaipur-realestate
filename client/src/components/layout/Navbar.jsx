import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, LayoutDashboard, LogOut, Phone, ChevronDown, MessageSquare, Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInquiry } from '../../context/InquiryContext';
import Logo from '../ui/Logo';
import { CONTACT_NUMBERS, OFFICE_HOURS } from '../../utils/contact';

const NAV_ITEMS = [
  { label: 'Advisory Verticals', hash: '#services' },
  { label: 'How It Works',       hash: '#process' },
  { label: 'Stamp Duty Tool',    hash: '#calculator' },
  { label: 'Direct Desks',       hash: '#contact' },
];

export default function Navbar() {
  const { isAuthenticated, user, logout, hasRole } = useAuth();
  const { openInquiry } = useInquiry();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const phoneRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* Close menus on route change */
  useEffect(() => {
    setMenuOpen(false);
    setPhoneOpen(false);
  }, [location.pathname]);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close phone popover on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target)) setPhoneOpen(false);
    };
    if (phoneOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [phoneOpen]);

  const handleNavClick = (hash) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#161513] text-stone-100 border-b border-stone-800
        transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] gap-4">

          {/* ── Brand Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <Logo variant="dark" />
          </Link>

          {/* ── Desktop Nav Links (Anchor Navigation) ── */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {NAV_ITEMS.map(({ label, hash }) => (
              <button
                key={hash}
                type="button"
                onClick={() => handleNavClick(hash)}
                className="h-10 inline-flex items-center px-3.5 rounded-xl text-sm font-medium
                           text-stone-300 hover:text-white hover:bg-stone-800/70
                           transition-all duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* ── Desktop Right Zone ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">

            {/* Request Sourcing Intake Modal Trigger */}
            <button
              type="button"
              onClick={() => openInquiry('buy')}
              className="h-10 inline-flex items-center gap-1.5 px-4 rounded-xl text-xs font-bold
                         bg-terracotta-700 hover:bg-terracotta-600 text-white shadow-sm
                         hover:shadow-glow-terracotta transition-all duration-200 cursor-pointer"
            >
              <Sparkles size={13} />
              <span>Request Sourcing</span>
            </button>

            {/* Phone Popover */}
            <div className="relative" ref={phoneRef}>
              <button
                type="button"
                onClick={() => setPhoneOpen(!phoneOpen)}
                className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl text-xs
                           font-semibold text-stone-200 bg-stone-800 border border-stone-700
                           hover:border-terracotta-700 hover:text-white transition-all duration-200"
              >
                <Phone size={13} className="text-terracotta-400" />
                <span>Direct Desks</span>
                <ChevronDown
                  size={12}
                  className={`text-stone-400 transition-transform duration-200 ${phoneOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {phoneOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#1a1816] border border-stone-800
                                rounded-2xl shadow-elevated p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-400">
                      Direct Coordinator Lines
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400
                                     bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      7 Days · 9AM–6PM
                    </span>
                  </div>
                  <div className="space-y-2">
                    {CONTACT_NUMBERS.map(({ number, tel, whatsapp }) => (
                      <div
                        key={number}
                        className="flex items-center justify-between p-3 rounded-xl
                                   bg-stone-900 border border-stone-800 hover:border-stone-700 transition-colors"
                      >
                        <a
                          href={tel}
                          className="font-mono text-sm font-bold text-white hover:text-terracotta-300 transition-colors"
                        >
                          {number}
                        </a>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={tel}
                            className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700
                                       text-[10px] font-bold text-stone-200 transition-colors"
                          >
                            Call
                          </a>
                          <a
                            href={whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-900/60
                                       text-emerald-400 hover:text-emerald-300 transition-colors"
                            title="WhatsApp"
                          >
                            <MessageSquare size={12} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auth Area */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="h-10 inline-flex items-center gap-1.5 px-3 rounded-xl text-xs
                               font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/60
                               hover:bg-amber-900/60 transition-all whitespace-nowrap"
                  >
                    <LayoutDashboard size={13} />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-stone-800/60 border border-stone-700">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-terracotta-600 to-terracotta-800
                                  flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden xl:inline text-xs font-medium text-stone-300 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign out"
                  className="h-10 w-10 inline-flex items-center justify-center rounded-xl
                             text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  to="/auth/login"
                  className="h-10 inline-flex items-center text-xs font-medium text-stone-300
                             hover:text-white px-3 rounded-xl hover:bg-stone-800/60 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-[#161513] px-4 py-5 space-y-4 animate-fadeIn">
          {/* Quick Request Sourcing CTA */}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openInquiry('buy');
            }}
            className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold
                       bg-terracotta-700 hover:bg-terracotta-600 text-white shadow-sm"
          >
            <Sparkles size={15} /> Request Sourcing Consultation
          </button>

          {/* Nav Links */}
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ label, hash }) => (
              <button
                key={hash}
                type="button"
                onClick={() => handleNavClick(hash)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold
                           text-stone-300 hover:bg-stone-800/50 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Direct lines */}
          <div className="border-t border-stone-800 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-terracotta-400 block mb-3">
              Direct Coordinator Lines · 7 Days · 9AM–6PM
            </span>
            <div className="space-y-2">
              {CONTACT_NUMBERS.map(({ number, tel, whatsapp }) => (
                <div
                  key={number}
                  className="flex items-center justify-between p-3 rounded-xl
                             bg-stone-900 border border-stone-800 text-sm"
                >
                  <a href={tel} className="font-mono font-bold text-white">
                    {number}
                  </a>
                  <div className="flex gap-2">
                    <a
                      href={tel}
                      className="px-2.5 py-1 rounded-lg bg-stone-800 text-[11px] font-bold text-stone-200"
                    >
                      Call
                    </a>
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-900/60 text-emerald-400"
                    >
                      <MessageSquare size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auth */}
          <div className="border-t border-stone-800 pt-4">
            {isAuthenticated ? (
              <div className="space-y-1.5">
                <div className="text-xs text-stone-400 px-3 py-1">
                  Signed in as <strong className="text-white">{user?.name}</strong>
                </div>
                {hasRole('admin', 'super_admin') && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2.5 text-xs font-semibold text-amber-300
                               hover:bg-stone-800 rounded-xl transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-400
                             hover:bg-stone-800 rounded-xl transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link to="/auth/login" className="btn-secondary text-center text-sm !py-2.5 !px-4">
                  Sign In
                </Link>
                <Link to="/auth/register" className="btn-terracotta text-center text-sm !py-2.5 !px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
