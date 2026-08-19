// ```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Instagram,
  Linkedin,
  Github,
  Globe,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');

      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/chandantech2026?igsh=MWhva2liMjE0c2Vi',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/chanadn123',
      icon: Linkedin,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/chandan-dev-jpg',
      icon: Github,
    },
  ];

  return (
    <footer className="bg-[#0A0B0D] text-[#DCD6CD] border-t border-white/10 relative overflow-hidden">

      {/* Luxury Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A880]/[0.025] rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2 space-y-5">

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center rotate-45 bg-[#0D0F12]">
                <span className="text-[#C5A880] font-serif-luxury font-bold text-base -rotate-45">
                  L
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-serif-luxury tracking-[0.2em] font-semibold text-lg text-white">
                  LUMORA
                </span>

                <span className="text-[8px] uppercase tracking-[0.35em] text-[#C5A880]">
                  ESTATES
                </span>
              </div>

            </div>

            <p className="text-sm font-light leading-relaxed text-[#9CA3AF] max-w-sm">
              An international private brokerage representing historically
              significant residences, trophy estates, and peerless contemporary
              masterworks across the world's prime destinations.
            </p>

            {/* Confidentiality */}
            <div className="flex items-center gap-2 text-xs text-[#C5A880] pt-1">
              <ShieldCheck className="w-4 h-4" />

              <span className="tracking-wide">
                Institutional Confidentiality & Discretion
              </span>
            </div>

            {/* Social Media */}
            <div className="pt-3">

              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-3">
                Follow Lumora
              </p>

              <div className="flex items-center gap-2">

                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Lumora Estates on ${social.name}`}
                      className="w-9 h-9 border border-white/10 bg-white/[0.02] flex items-center justify-center rounded-sm text-gray-400 hover:text-[#C5A880] hover:border-[#C5A880]/50 hover:bg-[#C5A880]/5 transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}

              </div>

            </div>

          </div>

          {/* ================= PORTFOLIO ================= */}
          <div className="space-y-4">

            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              Explore Portfolio
            </h4>

            <ul className="space-y-2.5 text-sm font-light">

              <li>
                <Link
                  to="/properties"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  All Properties
                </Link>
              </li>

              <li>
                <Link
                  to="/properties?type=Villa"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Coastal Villas
                </Link>
              </li>

              <li>
                <Link
                  to="/properties?type=Penthouse"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Skyline Penthouses
                </Link>
              </li>

              <li>
                <Link
                  to="/properties?type=Modernist Estate"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Architectural Mansions
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Our Heritage
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-[#C5A880] transition-colors"
                >
                  Private Advisory
                </Link>
              </li>

            </ul>

          </div>

          {/* ================= GLOBAL SALONS ================= */}
          <div className="space-y-4">

            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              Global Salons
            </h4>

            <ul className="space-y-4 text-xs text-[#9CA3AF]">

              {/* Delhi */}
              <li className="flex items-start gap-2">

                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white font-normal block">
                    Lutyens' Delhi
                  </strong>

                  New Delhi, India
                </div>

              </li>

              {/* Hyderabad */}
              <li className="flex items-start gap-2">

                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white font-normal block">
                    Hyderabad
                  </strong>

                  Telangana, India
                </div>

              </li>

              {/* GIFT City */}
              <li className="flex items-start gap-2">

                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />

                <div>
                  <strong className="text-white font-normal block">
                    GIFT City
                  </strong>

                  Gandhinagar, Gujarat
                </div>

              </li>

            </ul>

          </div>

          {/* ================= NEWSLETTER ================= */}
          <div className="space-y-4">

            <h4 className="text-xs uppercase tracking-[0.2em] text-white font-semibold">
              The Lumora Gazette
            </h4>

            <p className="text-xs font-light text-[#9CA3AF] leading-relaxed">
              Receive quarterly private offerings and architectural dossiers
              directly to your inbox.
            </p>

            {subscribed ? (

              <div className="p-3 bg-[#C5A880]/15 border border-[#C5A880]/40 rounded-sm flex items-center gap-2 text-xs text-[#EFECE6]">

                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />

                <span>
                  You have been added to our private advisory list.
                </span>

              </div>

            ) : (

              <form
                onSubmit={handleSubscribe}
                className="space-y-2"
              >

                <div className="relative">

                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/15 px-3 py-2.5 text-xs text-white placeholder-gray-500 rounded-sm focus:outline-none focus:border-[#C5A880] transition-colors pr-10"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#C5A880] hover:bg-[#D4AF37] text-black rounded-sm flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </div>

                <span className="text-[10px] text-gray-500 block">
                  Strictly confidential. No spam ever.
                </span>

              </form>

            )}

          </div>

        </div>

        {/* ================= CONTACT STRIP ================= */}
        <div className="py-7 border-b border-white/10">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            {/* Email */}
            <a
              href="mailto:concierge@lumoraestates.com"
              className="flex items-center gap-3 group"
            >

              <div className="w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-[#C5A880]/50 transition-colors">
                <Mail className="w-4 h-4 text-[#C5A880]" />
              </div>

              <div>

                <span className="block text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  Private Enquiries
                </span>

                <span className="text-xs text-gray-300 group-hover:text-[#C5A880] transition-colors">
                  concierge@lumoraestates.com
                </span>

              </div>

            </a>

            {/* Phone */}
            <a
              href="tel:+911140000000"
              className="flex items-center gap-3 group"
            >

              <div className="w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-[#C5A880]/50 transition-colors">
                <Phone className="w-4 h-4 text-[#C5A880]" />
              </div>

              <div>

                <span className="block text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  Private Concierge
                </span>

                <span className="text-xs text-gray-300 group-hover:text-[#C5A880] transition-colors">
                  +91 81 4400 7714
                </span>

              </div>

            </a>

            {/* Consultation */}
            <Link
              to="/contact"
              className="flex items-center gap-3 group"
            >

              <div className="w-9 h-9 border border-white/10 flex items-center justify-center group-hover:border-[#C5A880]/50 transition-colors">
                <Globe className="w-4 h-4 text-[#C5A880]" />
              </div>

              <div>

                <span className="block text-[9px] uppercase tracking-[0.2em] text-gray-500">
                  International Desk
                </span>

                <span className="text-xs text-gray-300 group-hover:text-[#C5A880] transition-colors">
                  Request a Private Consultation
                </span>

              </div>

            </Link>

          </div>

        </div>

        {/* BOTTOM BAR  */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-gray-500 font-light">

          <p className="text-center lg:text-left">
            © {new Date().getFullYear()} LUMORA ESTATES Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">

            <Link
              to="/contact"
              className="hover:text-white transition-colors"
            >
              Schedule Visit
            </Link>

            <Link
              to="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Engagement
            </Link>

            <Link
              to="/equal-housing"
              className="hover:text-white transition-colors"
            >
              Equal Housing Opportunity
            </Link>

          </div>

        </div>

        {/*DISCLAIMER */}
        <div className="pt-5 text-center">

          <p className="text-[9px] leading-relaxed text-gray-600 max-w-4xl mx-auto">
            Lumora Estates operates as a private luxury property brokerage.
            Property availability, pricing, imagery and specifications are
            subject to change without notice. All enquiries are handled with
            the highest degree of confidentiality and discretion.
          </p>

        </div>

      </div>
    </footer>
  );
};
