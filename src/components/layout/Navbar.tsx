import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact & Visits', path: '/contact' },
  ];

  const isDarkHero = location.pathname === '/' || location.pathname.startsWith('/properties/');

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0D0F12]/92 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
            : isDarkHero
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md py-5 border-b border-[#EAE6DF]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border border-[#C5A880] flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500 bg-[#0D0F12]">
              <span className="text-[#C5A880] font-serif-luxury font-bold text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                L
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif-luxury tracking-[0.2em] font-semibold text-lg leading-tight ${
                  isScrolled || isDarkHero ? 'text-white' : 'text-[#0D0F12]'
                }`}
              >
                LUMORA
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880] font-light">
                ESTATES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-wider uppercase transition-colors relative py-1 font-medium ${
                    isActive
                      ? 'text-[#C5A880]'
                      : isScrolled || isDarkHero
                      ? 'text-[#DCD6CD] hover:text-white'
                      : 'text-[#5A5E66] hover:text-[#0D0F12]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A880] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA & Private Client Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a
             href="tel:+918144007714"
              className={`flex items-center gap-2 text-xs uppercase tracking-wider font-medium transition-colors ${
                isScrolled || isDarkHero ? 'text-[#DCD6CD] hover:text-[#C5A880]' : 'text-[#5A5E66] hover:text-[#0D0F12]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>+91 81440 07714</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-[#0D0F12] text-xs font-semibold uppercase tracking-widest transition-all duration-300 rounded-sm hover:shadow-[0_0_20px_rgba(197,168,128,0.35)]"
            >
              <span>Schedule Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled || isDarkHero ? 'text-white hover:bg-white/10' : 'text-[#0D0F12] hover:bg-black/5'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0D0F12]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden transition-all">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              Curated Private Portfolio
            </p>
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-2xl font-serif-luxury text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="text-xs text-[#A0A3A8] space-y-1">
              <p>Direct Concierge Line:</p>
              <p className="text-white font-medium">+91 81440 07714</p>
              <p>concierge@lumoraestates.com</p>
            </div>
            <Link
              to="/contact"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C5A880] text-[#0D0F12] font-semibold text-xs uppercase tracking-widest rounded-sm"
            >
              <span>Schedule a Private Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
