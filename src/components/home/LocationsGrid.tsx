import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';

import { locationsData } from '../../data/locations';
import { SectionHeader } from '../common/SectionHeader';

export const LocationsGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [showHeader, setShowHeader] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  /* ============================================================
     SCROLL + FAST SET TIMEOUT
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearAllTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];
    };

    const resetAnimation = () => {
      clearAllTimers();

      setShowHeader(false);
      setVisibleCards([]);
    };

    const playAnimation = () => {
      clearAllTimers();

      setShowHeader(false);
      setVisibleCards([]);

      // Header
      timers.push(
        setTimeout(() => {
          setShowHeader(true);
        }, 100)
      );

      // Cards
      locationsData.forEach((_, index) => {
        timers.push(
          setTimeout(() => {
            setVisibleCards((prev) => {
              if (prev.includes(index)) return prev;

              return [...prev, index];
            });
          }, 180 + index * 80)
        );
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playAnimation();
        } else {
          resetAnimation();
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(section);

    return () => {
      clearAllTimers();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#FAF8F5]
        py-20
        sm:py-28
        lg:py-32
      "
    >
      {/* ==========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            -right-40
            top-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C5A880]/[0.045]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            -bottom-40
            -left-40
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#C5A880]/[0.025]
            blur-[120px]
          "
        />
      </div>

      {/* ==========================================================
          CONTENT
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1400px]
          px-5
          sm:px-8
          lg:px-12
        "
      >
        {/* ========================================================
            HEADER
        ======================================================== */}

        <div
          className={`
            transition-all
            duration-600
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              showHeader
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }
          `}
        >
          <SectionHeader
            subtitle="Prime Territories"
            title="World's Most Coveted Addresses"
            description="Explore iconic international enclaves where architectural rarity and unmatched prestige converge."
            align="center"
            className="mb-12 sm:mb-14 lg:mb-16"
          />
        </div>

        {/* ========================================================
            GRID
        ======================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-7
          "
        >
          {locationsData.map((loc, index) => {
            const isVisible = visibleCards.includes(index);

            return (
              <Link
                key={loc.id}
                to={`/properties?location=${encodeURIComponent(
                  loc.name.split('&')[0].trim()
                )}`}
                className={`
                  location-card
                  group
                  relative
                  flex
                  h-[390px]
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-[4px]
                  border
                  border-[#EAE6DF]
                  bg-[#0D0F12]
                  p-6
                  sm:h-[410px]
                  sm:p-7
                  lg:h-[420px]
                  lg:p-8

                  shadow-[0_12px_35px_rgba(13,15,18,0.06)]

                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-1
                  hover:border-[#C5A880]/70
                  hover:shadow-[0_22px_55px_rgba(13,15,18,0.16)]

                  ${
                    isVisible
                      ? 'translate-y-0 scale-100 opacity-100'
                      : 'translate-y-6 scale-[0.985] opacity-0'
                  }
                `}
              >
                {/* ==================================================
                    IMAGE
                ================================================== */}

                <img
                  src={loc.image}
                  alt={loc.name}
                  loading="lazy"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-center

                    transition-transform
                    duration-700
                    ease-out

                    group-hover:scale-[1.06]
                  "
                />

                {/* ==================================================
                    OVERLAY
                ================================================== */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#0D0F12]/95
                    via-[#0D0F12]/55
                    to-[#0D0F12]/15

                    transition-all
                    duration-500

                    group-hover:from-[#0D0F12]/90
                    group-hover:via-[#0D0F12]/45
                  "
                />

                {/* ==================================================
                    HOVER GOLD GLOW
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-0

                    bg-gradient-to-br
                    from-[#C5A880]/10
                    via-transparent
                    to-transparent

                    transition-opacity
                    duration-500

                    group-hover:opacity-100
                  "
                />

                {/* ==================================================
                    MOVING BORDER
                ================================================== */}

                <div className="location-border">
                  <span className="location-border-top" />
                  <span className="location-border-right" />
                  <span className="location-border-bottom" />
                  <span className="location-border-left" />
                </div>

                {/* ==================================================
                    TOP
                ================================================== */}

                <div
                  className="
                    relative
                    z-30
                    flex
                    items-start
                    justify-between
                  "
                >
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-[3px]
                      border
                      border-white/10
                      bg-black/45
                      px-3
                      py-1.5
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-white/90
                      backdrop-blur-md

                      transition-all
                      duration-300

                      group-hover:border-[#C5A880]/50
                    "
                  >
                    <MapPin className="h-3 w-3 text-[#C5A880]" />

                    {loc.country}
                  </span>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/30
                      text-white
                      backdrop-blur-md

                      transition-all
                      duration-300

                      group-hover:border-[#C5A880]
                      group-hover:bg-[#C5A880]
                      group-hover:text-black
                      group-hover:scale-105
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>
                </div>

                {/* ==================================================
                    BOTTOM
                ================================================== */}

                <div
                  className="
                    relative
                    z-30
                    space-y-2
                  "
                >
                  <div
                    className="
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-[#C5A880]
                    "
                  >
                    {loc.propertiesCount} Active Properties
                    <span className="mx-1.5 text-white/30">
                      ·
                    </span>
                    Avg. {loc.averagePrice}
                  </div>

                  <h3
                    className="
                      font-serif-luxury
                      text-2xl
                      leading-tight
                      text-white

                      transition-all
                      duration-300

                      group-hover:translate-x-1
                      group-hover:text-[#C5A880]
                    "
                  >
                    {loc.name}
                  </h3>

                  <p
                    className="
                      line-clamp-2
                      max-w-[95%]
                      text-xs
                      font-light
                      leading-relaxed
                      text-white/70

                      transition-colors
                      duration-300

                      group-hover:text-white/90
                    "
                  >
                    {loc.description}
                  </p>

                  <div
                    className="
                      flex
                      translate-y-2
                      items-center
                      gap-2
                      pt-2
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-transparent

                      transition-all
                      duration-300

                      group-hover:translate-y-0
                      group-hover:text-[#C5A880]
                    "
                  >
                    <span className="h-px w-5 bg-[#C5A880]" />

                    Explore Territory

                    <ArrowUpRight
                      className="
                        h-3
                        w-3
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ========================================================
            BOTTOM LABEL
        ======================================================== */}

        <div
          className={`
            mt-7
            flex
            items-center
            justify-between
            transition-all
            duration-600

            ${
              showHeader
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C5A880]" />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.24em]
                text-[#8C6D45]
              "
            >
              Prime Territories
            </span>
          </div>

          <span
            className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#9CA3AF]
              sm:block
            "
          >
            Global Collection
          </span>
        </div>
      </div>

      {/* ==========================================================
          BORDER ANIMATION CSS
      ========================================================== */}

      <style>{`
        .location-border {
          position: absolute;
          inset: 0;
          z-index: 25;
          pointer-events: none;
          border-radius: 4px;
          overflow: hidden;
          opacity: 0;
          transition: opacity 300ms ease;
        }

        .location-card:hover .location-border {
          opacity: 1;
        }

        .location-border span {
          position: absolute;
          display: block;
          background: linear-gradient(
            90deg,
            transparent,
            #D6B879,
            #C5A880,
            transparent
          );
          box-shadow: 0 0 8px rgba(197, 168, 128, 0.5);
        }

        /* TOP */

        .location-border-top {
          top: 0;
          left: -35%;
          width: 35%;
          height: 2px;
          animation: moveTop 2.4s linear infinite;
        }

        /* RIGHT */

        .location-border-right {
          top: -35%;
          right: 0;
          width: 2px;
          height: 35%;
          background: linear-gradient(
            180deg,
            transparent,
            #D6B879,
            #C5A880,
            transparent
          ) !important;
          animation: moveRight 2.4s linear infinite;
          animation-delay: 0.6s;
        }

        /* BOTTOM */

        .location-border-bottom {
          right: -35%;
          bottom: 0;
          width: 35%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #D6B879,
            #C5A880,
            transparent
          ) !important;
          animation: moveBottom 2.4s linear infinite;
          animation-delay: 1.2s;
        }

        /* LEFT */

        .location-border-left {
          bottom: -35%;
          left: 0;
          width: 2px;
          height: 35%;
          background: linear-gradient(
            180deg,
            transparent,
            #D6B879,
            #C5A880,
            transparent
          ) !important;
          animation: moveLeft 2.4s linear infinite;
          animation-delay: 1.8s;
        }

        @keyframes moveTop {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(385%);
          }
        }

        @keyframes moveRight {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(385%);
          }
        }

        @keyframes moveBottom {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-385%);
          }
        }

        @keyframes moveLeft {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-385%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .location-border span {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};