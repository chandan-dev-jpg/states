import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Search,
  MapPin,
  Building2,
  Shield,
  Award,
  Globe2,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [isVisible, setIsVisible] = useState(false);

  // Only heading animation
  const [showHeaderText, setShowHeaderText] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedType) {
      params.append('type', selectedType);
    }

    if (selectedLocation) {
      params.append('location', selectedLocation);
    }

    navigate(`/properties?${params.toString()}`);
  };

  /* ============================================================
     HERO SCROLL ANIMATION
  ============================================================ */

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timer) {
            clearTimeout(timer);
          }

          timer = setTimeout(() => {
            setIsVisible(true);
          }, 180);
        } else {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -70px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      observer.disconnect();
    };
  }, []);

  /* ============================================================
     HEADER TEXT SET TIMEOUT
     
     300ms ke baad heading left se right slide karegi.
     Section dobara viewport mein aaye to animation repeat hogi.
  ============================================================ */

  useEffect(() => {
    let headerTimer: ReturnType<typeof setTimeout> | null = null;

    if (isVisible) {
      setShowHeaderText(false);

      headerTimer = setTimeout(() => {
        setShowHeaderText(true);
      }, 300);
    } else {
      setShowHeaderText(false);
    }

    return () => {
      if (headerTimer) {
        clearTimeout(headerTimer);
      }
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        min-h-[92vh]
        lg:min-h-screen
        flex
        flex-col
        justify-between
        bg-[#0D0F12]
        text-white
        pt-32
        pb-16
        overflow-hidden
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=90"
          alt="Luxury Architecture Hero"
          className={`
            w-full
            h-full
            object-cover
            object-center
            scale-105
            transition-all
            duration-[1400ms]
            ease-out
            ${
              isVisible
                ? 'opacity-100 scale-105'
                : 'opacity-70 scale-[1.08]'
            }
          `}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F12]/95 via-[#0D0F12]/75 to-[#0D0F12]/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-[#0D0F12]/60" />

        <div
          className={`
            absolute
            left-[-10%]
            top-[20%]
            w-[500px]
            h-[500px]
            bg-[#C5A880]/10
            rounded-full
            blur-[120px]
            pointer-events-none
            transition-all
            duration-[1600ms]
            ${
              isVisible
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            }
          `}
        />
      </div>

      {/* =========================================================
          MAIN HERO CONTENT
      ========================================================= */}

      <div
        className={`
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          w-full
          my-auto
          py-12
          transition-all
          duration-1000
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-100 translate-y-0'
          }
        `}
      >
        <div className="max-w-3xl space-y-6">

          {/* =====================================================
              EYEBROW
          ===================================================== */}

          <div
            className={`
              inline-flex
              items-center
              gap-2
              px-3
              py-1
              bg-white/10
              backdrop-blur-md
              border
              border-white/15
              rounded-sm
              transition-all
              duration-700
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }
            `}
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#C5A880] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#C5A880]" />
            </span>

            <span className="text-[11px] uppercase tracking-[0.25em] text-[#EFECE6] font-medium">
              Private Real Estate Brokerage
            </span>
          </div>

          {/* =====================================================
              MAIN HEADING
              LEFT → RIGHT REVEAL
          ===================================================== */}

          <div className="overflow-hidden">

            <h1
              className={`
                text-4xl
                sm:text-6xl
                lg:text-7xl
                font-serif-luxury
                font-normal
                leading-[1.08]
                tracking-tight
                text-white

                transition-all
                duration-[1200ms]
                ease-[cubic-bezier(0.16,1,0.3,1)]

                ${
                  showHeaderText
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-[110%] opacity-0'
                }
              `}
            >
              Transcendent Living.

              <br />

              <span className="relative inline-block italic font-light text-[#C5A880]">

                Peerless

                <span
                  className="
                    absolute
                    left-0
                    right-0
                    -bottom-1
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-[#C5A880]
                    to-transparent
                    opacity-60
                  "
                />

              </span>

              {' '}Architecture.
            </h1>

          </div>

          {/* =====================================================
              SUBTITLE
          ===================================================== */}

          <p
            className={`
              text-base
              sm:text-xl
              font-light
              leading-relaxed
              text-[#DCD6CD]
              max-w-2xl
              transition-all
              duration-1000
              delay-200
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }
            `}
          >
            Representing the world&apos;s most coveted private estates,
            architectural monuments, and trophy waterfront residences
            with institutional discretion.
          </p>

          {/* =====================================================
              CTA BUTTONS
          ===================================================== */}

          <div
            className={`
              pt-2
              flex
              flex-col
              sm:flex-row
              items-stretch
              sm:items-center
              gap-4
              transition-all
              duration-1000
              delay-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }
            `}
          >

            {/* Explore Portfolio */}

            <button
              onClick={() => navigate('/properties')}
              className="
                group
                relative
                inline-flex
                items-center
                justify-center
                gap-2.5
                px-8
                py-4
                bg-[#C5A880]
                hover:bg-[#D4AF37]
                text-[#0D0F12]
                text-xs
                uppercase
                tracking-[0.2em]
                font-semibold
                transition-all
                duration-500
                rounded-sm
                shadow-[0_0_30px_rgba(197,168,128,0.3)]
                hover:shadow-[0_0_40px_rgba(197,168,128,0.5)]
                hover:-translate-y-0.5
                overflow-hidden
              "
            >
              <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-[-20deg]" />

              <span className="relative">
                Explore Portfolio
              </span>

              <ArrowUpRight
                className="
                  relative
                  w-4
                  h-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </button>

            {/* Private Tour */}

            <button
              onClick={() => navigate('/contact')}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2.5
                px-8
                py-4
                bg-white/10
                hover:bg-white/20
                text-white
                backdrop-blur-md
                border
                border-white/20
                text-xs
                uppercase
                tracking-[0.2em]
                font-medium
                transition-all
                duration-500
                rounded-sm
                hover:border-[#C5A880]
                hover:-translate-y-0.5
              "
            >
              <span>
                Schedule Private Tour
              </span>

              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

          </div>
        </div>

        {/* =========================================================
            QUICK SEARCH
        ========================================================= */}

        <div
          className={`
            mt-14
            max-w-4xl
            transition-all
            duration-1000
            delay-400
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }
          `}
        >
          <div className="relative group">

            <div className="absolute -inset-px rounded-sm bg-gradient-to-r from-transparent via-[#C5A880]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative bg-[#0D0F12]/85 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-sm shadow-2xl transition-all duration-500 group-hover:border-[#C5A880]/40">

              <form
                onSubmit={handleQuickSearch}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center"
              >

                {/* Location */}

                <div className="sm:col-span-5 relative">

                  <label className="block text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                    Destination
                  </label>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-xs text-white transition-all duration-300 hover:border-[#C5A880]/50 hover:bg-white/[0.08]">

                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />

                    <select
                      value={selectedLocation}
                      onChange={(e) =>
                        setSelectedLocation(e.target.value)
                      }
                      className="w-full bg-transparent text-white text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0D0F12] text-white">
                        All Global Enclaves
                      </option>

                      <option value="Bel-Air" className="bg-[#0D0F12] text-white">
                        Bel-Air & Beverly Hills
                      </option>

                      <option value="Lake Como" className="bg-[#0D0F12] text-white">
                        Lake Como, Italy
                      </option>

                      <option value="Manhattan" className="bg-[#0D0F12] text-white">
                        Manhattan Penthouse Row
                      </option>

                      <option value="Cap d’Antibes" className="bg-[#0D0F12] text-white">
                        French Riviera & Monaco
                      </option>

                      <option value="Aspen" className="bg-[#0D0F12] text-white">
                        Aspen & St. Moritz
                      </option>

                      <option value="Dubai" className="bg-[#0D0F12] text-white">
                        Palm Jumeirah, Dubai
                      </option>
                    </select>

                  </div>
                </div>

                {/* Architecture Type */}

                <div className="sm:col-span-4 relative">

                  <label className="block text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                    Typology
                  </label>

                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-xs text-white transition-all duration-300 hover:border-[#C5A880]/50 hover:bg-white/[0.08]">

                    <Building2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />

                    <select
                      value={selectedType}
                      onChange={(e) =>
                        setSelectedType(e.target.value)
                      }
                      className="w-full bg-transparent text-white text-xs focus:outline-none cursor-pointer"
                    >
                      <option value="" className="bg-[#0D0F12] text-white">
                        All Typologies
                      </option>

                      <option value="Villa" className="bg-[#0D0F12] text-white">
                        Coastal Villa
                      </option>

                      <option value="Penthouse" className="bg-[#0D0F12] text-white">
                        Sky Penthouse
                      </option>

                      <option value="Mansion" className="bg-[#0D0F12] text-white">
                        Historic Mansion
                      </option>

                      <option value="Modernist Estate" className="bg-[#0D0F12] text-white">
                        Modernist Estate
                      </option>

                      <option value="Waterfront" className="bg-[#0D0F12] text-white">
                        Prime Waterfront
                      </option>
                    </select>

                  </div>
                </div>

                {/* Search */}

                <div className="sm:col-span-3 pt-2 sm:pt-4">

                  <button
                    type="submit"
                    className="
                      group
                      relative
                      w-full
                      py-2.5
                      px-4
                      bg-[#C5A880]
                      hover:bg-[#D4AF37]
                      text-black
                      text-xs
                      uppercase
                      tracking-widest
                      font-semibold
                      rounded-sm
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition-all
                      duration-500
                      hover:shadow-[0_0_25px_rgba(197,168,128,0.35)]
                      overflow-hidden
                    "
                  >
                    <span className="absolute inset-0 bg-white/25 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 skew-x-[-20deg]" />

                    <Search className="relative w-3.5 h-3.5" />

                    <span className="relative">
                      Search
                    </span>
                  </button>

                </div>

              </form>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          STATS STRIP
      ========================================================= */}

      <div
        className={`
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          w-full
          border-t
          border-white/10
          pt-8
          transition-all
          duration-1000
          delay-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12'
          }
        `}
      >

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">

          {/* Stat 1 */}

          <div className="group space-y-1 cursor-default">

            <span className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white block transition-transform duration-300 group-hover:-translate-y-1">
              $2.8B+
            </span>

            <span className="text-xs text-[#A0A3A8] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">

              <Award className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />

              Volume Transacted

            </span>

          </div>

          {/* Stat 2 */}

          <div className="group space-y-1 cursor-default">

            <span className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white block transition-transform duration-300 group-hover:-translate-y-1">
              24
            </span>

            <span className="text-xs text-[#A0A3A8] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">

              <Globe2 className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />

              Prime Territories

            </span>

          </div>

          {/* Stat 3 */}

          <div className="group space-y-1 cursor-default">

            <span className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white block transition-transform duration-300 group-hover:-translate-y-1">
              88%
            </span>

            <span className="text-xs text-[#A0A3A8] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">

              <Shield className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />

              Off-Market Transactions

            </span>

          </div>

          {/* Stat 4 */}

          <div className="group space-y-1 cursor-default">

            <span className="text-2xl sm:text-3xl font-serif-luxury font-medium text-white block transition-transform duration-300 group-hover:-translate-y-1">
              100%
            </span>

            <span className="text-xs text-[#A0A3A8] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">

              <Shield className="w-3.5 h-3.5 text-[#C5A880] transition-transform duration-300 group-hover:scale-110" />

              Discretion Guaranteed

            </span>

          </div>

        </div>
      </div>

    </section>
  );
};