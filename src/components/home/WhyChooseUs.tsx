import React, { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import {
  Compass,
  ShieldCheck,
  Globe,
  Key,
  Sparkles,
  Building,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [showHeader, setShowHeader] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showCta, setShowCta] = useState(false);

  /* ============================================================
     SCROLL ENTER / LEAVE + SET TIMEOUT ANIMATION
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearAnimationTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];
    };

    const resetAnimation = () => {
      clearAnimationTimers();

      setShowHeader(false);
      setVisibleCards([]);
      setShowCta(false);
    };

    const startAnimation = () => {
      clearAnimationTimers();

      /*
       * Reset first so animation can replay
       * every time the section enters viewport.
       */
      setShowHeader(false);
      setVisibleCards([]);
      setShowCta(false);

      /* ---------------------------------------------
         HEADER
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setShowHeader(true);
        }, 150)
      );

      /* ---------------------------------------------
         CARD 01
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setVisibleCards((prev) =>
            prev.includes(0) ? prev : [...prev, 0]
          );
        }, 350)
      );

      /* ---------------------------------------------
         CARD 02
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setVisibleCards((prev) =>
            prev.includes(1) ? prev : [...prev, 1]
          );
        }, 500)
      );

      /* ---------------------------------------------
         CARD 03
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setVisibleCards((prev) =>
            prev.includes(2) ? prev : [...prev, 2]
          );
        }, 650)
      );

      /* ---------------------------------------------
         CARD 04
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setVisibleCards((prev) =>
            prev.includes(3) ? prev : [...prev, 3]
          );
        }, 800)
      );

      /* ---------------------------------------------
         CTA
      --------------------------------------------- */

      timers.push(
        setTimeout(() => {
          setShowCta(true);
        }, 1050)
      );
    };

    /* ============================================================
       INTERSECTION OBSERVER
    ============================================================ */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          /*
           * User section mein enter hua
           */
          startAnimation();
        } else {
          /*
           * User section se bahar gaya
           */
          resetAnimation();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(section);

    return () => {
      clearAnimationTimers();
      observer.disconnect();
    };
  }, []);

  /* ============================================================
     PILLARS DATA
  ============================================================ */

  const pillars = [
    {
      icon: Compass,
      title: 'Architectural Curation',
      label: 'Architectural',
      description:
        'We do not list volume; we curate pedigree. Every estate on our roster represents notable provenance, master craftsmanship, and irreplaceable site topography.',
    },
    {
      icon: ShieldCheck,
      title: 'Institutional Discretion',
      label: 'Confidentiality',
      description:
        'Over 85% of our highest-tier acquisitions are concluded off-market. We safeguard private family office identities with strict NDA protocols.',
    },
    {
      icon: Globe,
      title: 'Global Prime Syndicate',
      label: 'Global Network',
      description:
        'Synchronized advisory across New York, London, Beverly Hills, Paris, and Dubai allows our clients seamless cross-border capital deployment.',
    },
    {
      icon: Key,
      title: 'Private Aviation & Escort',
      label: 'Private Access',
      description:
        'Complimentary private helicopter transfers, maritime yacht viewings, and bespoke structural dossiers prepared for every private inspection.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#F1ECE4]
        py-24
        sm:py-32
      "
    >
      {/* ============================================================
          PREMIUM BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none absolute inset-0">

        {/* Base */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#FBF9F5]
            via-[#F3EEE6]
            to-[#EDE6DB]
          "
        />

        {/* Top gold glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[600px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-[#C5A880]/[0.13]
            blur-[150px]
          "
        />

        {/* Left glow */}
        <div
          className="
            absolute
            -left-48
            top-[35%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#D7BE96]/[0.13]
            blur-[120px]
          "
        />

        {/* Right glow */}
        <div
          className="
            absolute
            -right-48
            bottom-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C5A880]/[0.10]
            blur-[130px]
          "
        />

        {/* Fine texture */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[radial-gradient(#80633D_0.8px,transparent_0.8px)]
            [background-size:30px_30px]
          "
        />

        {/* Architectural lines */}
        <div
          className="
            absolute
            left-[8%]
            top-0
            h-full
            w-px
            bg-[#C5A880]/10
          "
        />

        <div
          className="
            absolute
            right-[8%]
            top-0
            h-full
            w-px
            bg-[#C5A880]/10
          "
        />
      </div>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* ============================================================
            HEADER
        ============================================================ */}

        <div
          className={`
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              showHeader
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }
          `}
        >
          <SectionHeader
            subtitle="The Lumora Standard"
            title="Why Discerning Collectors Trust Lumora"
            description="A private advisory model built from the ground up to serve high-net-worth individuals, family offices, and architectural connoisseurs."
            align="center"
            className="mb-16"
          />
        </div>

        {/* ============================================================
            CARDS
        ============================================================ */}

        <div
          className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const cardVisible = visibleCards.includes(index);

            return (
              <article
                key={pillar.title}
                className={`
                  group
                  relative
                  min-h-[425px]
                  overflow-hidden
                  rounded-[3px]
                  border
                  border-[#D5C9B9]
                  bg-[#FFFEFC]
                  p-7
                  sm:p-8

                  shadow-[0_12px_35px_rgba(55,42,27,0.08)]

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:-translate-y-2
                  hover:border-[#B99663]
                  hover:bg-white
                  hover:shadow-[0_25px_65px_rgba(55,42,27,0.15)]

                  ${
                    cardVisible
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-16 opacity-0 scale-[0.97]'
                  }
                `}
              >

                {/* ==================================================
                    ANIMATED BORDER
                ================================================== */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-30
                    rounded-[3px]
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                >

                  {/* Top */}
                  <span
                    className="
                      absolute
                      left-0
                      top-0
                      h-[2px]
                      w-[38%]
                      bg-gradient-to-r
                      from-transparent
                      via-[#C5A880]
                      to-transparent
                      group-hover:animate-[lineTop_2.5s_linear_infinite]
                    "
                  />

                  {/* Right */}
                  <span
                    className="
                      absolute
                      right-0
                      top-0
                      h-[38%]
                      w-[2px]
                      bg-gradient-to-b
                      from-transparent
                      via-[#C5A880]
                      to-transparent
                      group-hover:animate-[lineRight_2.5s_linear_infinite]
                    "
                  />

                  {/* Bottom */}
                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-[2px]
                      w-[38%]
                      bg-gradient-to-l
                      from-transparent
                      via-[#C5A880]
                      to-transparent
                      group-hover:animate-[lineBottom_2.5s_linear_infinite]
                    "
                  />

                  {/* Left */}
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[38%]
                      w-[2px]
                      bg-gradient-to-t
                      from-transparent
                      via-[#C5A880]
                      to-transparent
                      group-hover:animate-[lineLeft_2.5s_linear_infinite]
                    "
                  />
                </div>

                {/* ==================================================
                    LARGE NUMBER
                ================================================== */}

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    right-[-8px]
                    top-[-25px]
                    select-none
                    font-serif-luxury
                    text-[125px]
                    font-normal
                    leading-none
                    tracking-[-0.08em]
                    text-[#C5A880]/[0.10]
                    transition-all
                    duration-700
                    group-hover:scale-105
                    group-hover:text-[#C5A880]/[0.18]
                  "
                >
                  0{index + 1}
                </span>

                {/* Inner frame */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[5px]
                    rounded-[2px]
                    border
                    border-[#C5A880]/[0.04]
                    transition-colors
                    duration-500
                    group-hover:border-[#C5A880]/15
                  "
                />

                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-full
                    flex-col
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-sm
                      border
                      border-[#B99663]
                      bg-[#F8F3EA]
                      shadow-[0_6px_18px_rgba(85,65,40,0.07)]
                      transition-all
                      duration-500
                      group-hover:border-[#8C6D45]
                      group-hover:bg-[#0D0F12]
                      group-hover:shadow-[0_10px_28px_rgba(13,15,18,0.15)]
                    "
                  >
                    <Icon
                      className="
                        h-6
                        w-6
                        text-[#8C6D45]
                        transition-all
                        duration-500
                        group-hover:scale-110
                        group-hover:text-[#C5A880]
                      "
                    />
                  </div>

                  {/* LABEL */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span
                      className="
                        h-px
                        w-7
                        bg-[#B99663]
                        transition-all
                        duration-500
                        group-hover:w-12
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.3em]
                        text-[#9A7445]
                      "
                    >
                      {pillar.label}
                    </span>
                  </div>

                  {/* TITLE */}

                  <h3
                    className="
                      mt-5
                      max-w-[260px]
                      font-serif-luxury
                      text-[22px]
                      font-normal
                      leading-[1.18]
                      text-[#101114]
                      transition-colors
                      duration-500
                      group-hover:text-[#8C6D45]
                    "
                  >
                    {pillar.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      mt-5
                      text-[13px]
                      font-light
                      leading-[1.85]
                      text-[#666B70]
                    "
                  >
                    {pillar.description}
                  </p>

                  {/* FOOTER */}

                  <div className="mt-auto pt-8">

                    <div
                      className="
                        h-[2px]
                        w-20
                        bg-[#C5A880]
                        transition-all
                        duration-700
                        group-hover:w-36
                      "
                    />

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.28em]
                          text-[#9A7445]
                        "
                      >
                        Pillar 0{index + 1}
                      </span>

                      <Sparkles
                        className="
                          h-3.5
                          w-3.5
                          text-[#B99663]
                          transition-all
                          duration-500
                          group-hover:rotate-90
                          group-hover:text-[#8C6D45]
                        "
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ============================================================
            CTA
        ============================================================ */}

        <div
          className={`
            group/cta
            relative
            mt-16
            overflow-hidden
            rounded-[3px]
            border
            border-[#D5C9B9]
            bg-[#FFFEFC]
            p-7
            sm:p-8

            shadow-[0_12px_35px_rgba(55,42,27,0.07)]

            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            hover:-translate-y-1
            hover:border-[#B99663]
            hover:shadow-[0_22px_55px_rgba(55,42,27,0.12)]

            ${
              showCta
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-12 opacity-0 scale-[0.98]'
            }
          `}
        >

          {/* ==================================================
              CTA BORDER
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              rounded-[3px]
              opacity-0
              transition-opacity
              duration-300
              group-hover/cta:opacity-100
            "
          >

            <span
              className="
                absolute
                left-0
                top-0
                h-[2px]
                w-[24%]
                bg-gradient-to-r
                from-transparent
                via-[#C5A880]
                to-transparent
                group-hover/cta:animate-[ctaTop_3s_linear_infinite]
              "
            />

            <span
              className="
                absolute
                right-0
                top-0
                h-[45%]
                w-[2px]
                bg-gradient-to-b
                from-transparent
                via-[#C5A880]
                to-transparent
                group-hover/cta:animate-[ctaRight_3s_linear_infinite]
              "
            />

            <span
              className="
                absolute
                bottom-0
                right-0
                h-[2px]
                w-[24%]
                bg-gradient-to-l
                from-transparent
                via-[#C5A880]
                to-transparent
                group-hover/cta:animate-[ctaBottom_3s_linear_infinite]
              "
            />

            <span
              className="
                absolute
                bottom-0
                left-0
                h-[45%]
                w-[2px]
                bg-gradient-to-t
                from-transparent
                via-[#C5A880]
                to-transparent
                group-hover/cta:animate-[ctaLeft_3s_linear_infinite]
              "
            />
          </div>

          {/* CTA Glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-120px]
              top-1/2
              h-[280px]
              w-[280px]
              -translate-y-1/2
              rounded-full
              bg-[#C5A880]/[0.08]
              blur-[90px]
              opacity-0
              transition-opacity
              duration-700
              group-hover/cta:opacity-100
            "
          />

          {/* ==================================================
              CTA CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
              justify-between
              gap-6
              md:flex-row
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-4">

              {/* Icon */}

              <button
                type="button"
                aria-label="Private ledger"
                className="
                  group/icon
                  relative
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C5A880]/40
                  bg-[#F8F3EA]
                  text-[#8C6D45]
                  transition-all
                  duration-500
                  hover:scale-105
                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]
                  hover:text-[#0D0F12]
                "
              >

                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-[#C5A880]
                    opacity-0
                    group-hover/icon:animate-[iconPulse_1.6s_ease-out_infinite]
                  "
                />

                <Building
                  className="
                    relative
                    z-10
                    h-6
                    w-6
                    transition-all
                    duration-500
                    group-hover/icon:scale-110
                    group-hover/icon:rotate-3
                  "
                />
              </button>

              {/* Text */}

              <div>
                <h4
                  className="
                    font-serif-luxury
                    text-lg
                    text-[#101114]
                    transition-colors
                    duration-500
                    group-hover/cta:text-[#8C6D45]
                    sm:text-xl
                  "
                >
                  Seeking an Off-Market Trophy Asset?
                </h4>

                <p
                  className="
                    mt-1
                    max-w-2xl
                    text-xs
                    font-light
                    leading-relaxed
                    text-[#70757A]
                  "
                >
                  Access our private confidential ledger with exclusive global
                  properties not published online.
                </p>
              </div>
            </div>

            {/* BUTTON */}

            <a
              href="/contact"
              className="
                group/button
                relative
                inline-flex
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-sm
                bg-[#C5A880]
                px-7
                py-3.5
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-[#0D0F12]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#D4AF37]
                hover:shadow-[0_10px_30px_rgba(197,168,128,0.28)]
              "
            >

              {/* Button shine */}

              <span
                className="
                  absolute
                  inset-y-0
                  -left-[100%]
                  w-1/2
                  skew-x-[-20deg]
                  bg-white/30
                  transition-all
                  duration-700
                  group-hover/button:left-[150%]
                "
              />

              <span className="relative z-10">
                Request Private Ledger
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================
          ANIMATIONS
      ============================================================ */}

      <style>{`

        /* CARD TOP */
        @keyframes lineTop {
          0% {
            transform: translateX(-140%);
          }

          100% {
            transform: translateX(390%);
          }
        }

        /* CARD RIGHT */
        @keyframes lineRight {
          0% {
            transform: translateY(-140%);
          }

          100% {
            transform: translateY(390%);
          }
        }

        /* CARD BOTTOM */
        @keyframes lineBottom {
          0% {
            transform: translateX(140%);
          }

          100% {
            transform: translateX(-390%);
          }
        }

        /* CARD LEFT */
        @keyframes lineLeft {
          0% {
            transform: translateY(140%);
          }

          100% {
            transform: translateY(-390%);
          }
        }

        /* CTA TOP */
        @keyframes ctaTop {
          0% {
            transform: translateX(-150%);
          }

          100% {
            transform: translateX(500%);
          }
        }

        /* CTA RIGHT */
        @keyframes ctaRight {
          0% {
            transform: translateY(-150%);
          }

          100% {
            transform: translateY(350%);
          }
        }

        /* CTA BOTTOM */
        @keyframes ctaBottom {
          0% {
            transform: translateX(150%);
          }

          100% {
            transform: translateX(-500%);
          }
        }

        /* CTA LEFT */
        @keyframes ctaLeft {
          0% {
            transform: translateY(150%);
          }

          100% {
            transform: translateY(-350%);
          }
        }

        /* ICON PULSE */
        @keyframes iconPulse {
          0% {
            transform: scale(1);
            opacity: 0.65;
          }

          70% {
            transform: scale(1.5);
            opacity: 0;
          }

          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

      `}</style>
    </section>
  );
};