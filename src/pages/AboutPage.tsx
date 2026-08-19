import React, { useEffect, useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { agents } from '../data/properties';
import {
  ShieldCheck,
  Globe,
  Compass,
  Mail,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const leadership = Object.values(agents);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full bg-[#FAF8F5] pt-28 sm:pt-36 pb-24 overflow-hidden">

      {/* ================= HERO ================= */}

      <div
        className={`
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          mb-20
          text-center

          transition-all
          duration-1000
          ease-[cubic-bezier(0.22,1,0.36,1)]

          ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }
        `}
      >

        {/* Decorative Header Line */}

        <div className="flex items-center justify-center gap-2 mb-3">

          <span
            className={`
              h-px
              bg-[#C5A880]
              transition-all
              duration-700
              ${
                isVisible
                  ? 'w-12'
                  : 'w-0'
              }
            `}
          />

          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              font-medium
              text-[#C5A880]
            "
          >
            The Heritage & Ethos
          </span>

          <span
            className={`
              h-px
              bg-[#C5A880]
              transition-all
              duration-700
              ${
                isVisible
                  ? 'w-12'
                  : 'w-0'
              }
            `}
          />

        </div>

        {/* =====================================================
            INFINITE LEFT → RIGHT HEADING
        ===================================================== */}

        <div className="relative overflow-hidden max-w-5xl mx-auto">

          <h1
            className="
              text-4xl
              sm:text-6xl
              font-serif-luxury
              font-normal
              text-[#0D0F12]
              leading-[1.12]

              animate-[aboutTitleReveal_4.5s_ease-in-out_infinite]
              will-change-transform
            "
          >
            Guardians of Architectural Pedigree & Private Capital
          </h1>

        </div>

        {/* Description */}

        <p
          className="
            mt-6
            text-base
            sm:text-lg
            text-[#5A5E66]
            font-light
            max-w-2xl
            mx-auto
            leading-relaxed

            transition-all
            duration-1000
            delay-200
          "
        >
          Founded in 2008 as a boutique advisory for private collectors and
          family offices, Lumora Estates has redefined international prime
          brokerage through rigorous curation and absolute confidentiality.
        </p>

      </div>

      {/* ================= SHOWCASE ================= */}

      <div
        className={`
          group
          relative
          aspect-[21/9]
          rounded-sm
          overflow-hidden
          border border-[#EAE6DF]
          shadow-2xl

          transition-all
          duration-1000
          delay-200

          ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-[0.97]'
          }
        `}
      >

        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
          alt="Lumora Architecture"
          className="
            w-full
            h-full
            object-cover
            object-[center_35%]
            scale-105

            transition-transform
            duration-[1400ms]
            ease-out

            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
          "
        />

        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            sm:bottom-10
            sm:left-10

            text-white
            max-w-xl

            transition-all
            duration-700

            group-hover:translate-y-[-6px]
          "
        >

          <span
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#C5A880]
              font-semibold
              block
              mb-1
            "
          >
            Curatorial Philosophy
          </span>

          <p
            className="
              text-lg
              sm:text-2xl
              font-serif-luxury
              leading-snug
            "
          >
            &ldquo;We view significant residences not as mere real estate
            square footage, but as timeless cultural and architectural
            heirlooms.&rdquo;
          </p>

        </div>

      </div>

      {/* ================= THREE TENETS ================= */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">

        <SectionHeader
          subtitle="Our Foundation"
          title="The Three Tenets of Lumora"
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* =====================================================
              CARD 01
          ===================================================== */}

          <div
            className={`
              group
              relative
              bg-white
              border border-[#EAE6DF]
              p-8
              rounded-sm
              overflow-hidden

              shadow-[0_8px_30px_rgba(13,15,18,0.04)]

              transition-all
              duration-700
              ease-out

              hover:-translate-y-4
              hover:border-[#C5A880]
              hover:shadow-[0_25px_60px_rgba(13,15,18,0.12)]

              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }
            `}
            style={{ transitionDelay: '300ms' }}
          >

            <div
              className="
                absolute
                top-0
                left-0
                h-[2px]
                w-0
                bg-gradient-to-r
                from-[#8C6D45]
                via-[#DCC28F]
                to-[#8C6D45]

                transition-all
                duration-700

                group-hover:w-full
              "
            />

            <span
              className="
                absolute
                -right-2
                -top-8
                text-[130px]
                leading-none
                font-serif-luxury
                text-[#C5A880]/[0.06]

                transition-all
                duration-700

                group-hover:text-[#C5A880]/[0.14]
                group-hover:-translate-y-3
              "
            >
              01
            </span>

            <div
              className="
                relative
                z-10
                w-14
                h-14
                bg-[#FAF8F5]
                border border-[#C5A880]
                rounded-sm
                flex
                items-center
                justify-center
                text-[#8C6D45]

                transition-all
                duration-700

                group-hover:bg-[#0D0F12]
                group-hover:text-[#DCC28F]
                group-hover:border-[#0D0F12]
                group-hover:scale-110
                group-hover:rotate-3
              "
            >
              <Compass
                className="
                  w-6
                  h-6

                  transition-transform
                  duration-700

                  group-hover:rotate-[35deg]
                "
              />
            </div>

            <div
              className="
                relative
                z-10
                mt-7
                flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#C5A880]

                transition-all
                duration-500

                group-hover:tracking-[0.35em]
              "
            >
              <span className="w-5 h-px bg-[#C5A880]" />
              Architectural
            </div>

            <h3
              className="
                relative
                z-10
                mt-3
                text-xl
                font-serif-luxury
                text-[#0D0F12]

                transition-all
                duration-500

                group-hover:text-[#8C6D45]
                group-hover:translate-x-1
              "
            >
              Architectural Connoisseurship
            </h3>

            <p
              className="
                relative
                z-10
                mt-4
                text-xs
                sm:text-sm
                text-[#5A5E66]
                font-light
                leading-relaxed
              "
            >
              Every residence we accept into our portfolio undergoes rigorous
              architectural, provenance, and structural vetting by in-house
              design historians and chartered engineers.
            </p>

            <div
              className="
                mt-7
                h-px
                w-8
                bg-[#C5A880]

                transition-all
                duration-700

                group-hover:w-20
              "
            />

          </div>

          {/* =====================================================
              CARD 02
          ===================================================== */}

          <div
            className={`
              group
              relative
              bg-white
              border border-[#EAE6DF]
              p-8
              rounded-sm
              overflow-hidden

              shadow-[0_8px_30px_rgba(13,15,18,0.04)]

              transition-all
              duration-700

              hover:-translate-y-4
              hover:border-[#C5A880]
              hover:shadow-[0_25px_60px_rgba(13,15,18,0.12)]

              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }
            `}
            style={{ transitionDelay: '450ms' }}
          >

            <div
              className="
                absolute
                top-0
                left-0
                h-[2px]
                w-0

                bg-gradient-to-r
                from-[#8C6D45]
                via-[#DCC28F]
                to-[#8C6D45]

                transition-all
                duration-700

                group-hover:w-full
              "
            />

            <span
              className="
                absolute
                -right-2
                -top-8
                text-[130px]
                leading-none
                font-serif-luxury
                text-[#C5A880]/[0.06]

                transition-all
                duration-700

                group-hover:text-[#C5A880]/[0.14]
                group-hover:-translate-y-3
              "
            >
              02
            </span>

            <div
              className="
                relative
                z-10
                w-14
                h-14
                bg-[#FAF8F5]
                border border-[#C5A880]
                rounded-sm
                flex
                items-center
                justify-center
                text-[#8C6D45]

                transition-all
                duration-700

                group-hover:bg-[#0D0F12]
                group-hover:text-[#DCC28F]
                group-hover:border-[#0D0F12]
                group-hover:scale-110
                group-hover:-rotate-3
              "
            >
              <ShieldCheck
                className="
                  w-6
                  h-6

                  transition-transform
                  duration-700

                  group-hover:scale-110
                "
              />
            </div>

            <div
              className="
                relative
                z-10
                mt-7
                flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#C5A880]

                transition-all
                duration-500

                group-hover:tracking-[0.35em]
              "
            >
              <span className="w-5 h-px bg-[#C5A880]" />
              Confidentiality
            </div>

            <h3
              className="
                relative
                z-10
                mt-3
                text-xl
                font-serif-luxury
                text-[#0D0F12]

                transition-all
                duration-500

                group-hover:text-[#8C6D45]
                group-hover:translate-x-1
              "
            >
              Institutional Discretion
            </h3>

            <p
              className="
                relative
                z-10
                mt-4
                text-xs
                sm:text-sm
                text-[#5A5E66]
                font-light
                leading-relaxed
              "
            >
              Representing royalty, founders, and private family offices
              demands ironclad confidentiality. Our off-market vault provides
              private showings under strict non-disclosure protections.
            </p>

            <div
              className="
                mt-7
                h-px
                w-8
                bg-[#C5A880]

                transition-all
                duration-700

                group-hover:w-20
              "
            />

          </div>

          {/* =====================================================
              CARD 03
          ===================================================== */}

          <div
            className={`
              group
              relative
              bg-white
              border border-[#EAE6DF]
              p-8
              rounded-sm
              overflow-hidden

              shadow-[0_8px_30px_rgba(13,15,18,0.04)]

              transition-all
              duration-700

              hover:-translate-y-4
              hover:border-[#C5A880]
              hover:shadow-[0_25px_60px_rgba(13,15,18,0.12)]

              ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }
            `}
            style={{ transitionDelay: '600ms' }}
          >

            <div
              className="
                absolute
                top-0
                left-0
                h-[2px]
                w-0

                bg-gradient-to-r
                from-[#8C6D45]
                via-[#DCC28F]
                to-[#8C6D45]

                transition-all
                duration-700

                group-hover:w-full
              "
            />

            <span
              className="
                absolute
                -right-2
                -top-8
                text-[130px]
                leading-none
                font-serif-luxury
                text-[#C5A880]/[0.06]

                transition-all
                duration-700

                group-hover:text-[#C5A880]/[0.14]
                group-hover:-translate-y-3
              "
            >
              03
            </span>

            <div
              className="
                relative
                z-10
                w-14
                h-14
                bg-[#FAF8F5]
                border border-[#C5A880]
                rounded-sm
                flex
                items-center
                justify-center
                text-[#8C6D45]

                transition-all
                duration-700

                group-hover:bg-[#0D0F12]
                group-hover:text-[#DCC28F]
                group-hover:border-[#0D0F12]
                group-hover:scale-110
                group-hover:rotate-3
              "
            >
              <Globe
                className="
                  w-6
                  h-6

                  transition-transform
                  duration-700

                  group-hover:rotate-[25deg]
                "
              />
            </div>

            <div
              className="
                relative
                z-10
                mt-7
                flex
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-[#C5A880]

                transition-all
                duration-500

                group-hover:tracking-[0.35em]
              "
            >
              <span className="w-5 h-px bg-[#C5A880]" />
              Global Network
            </div>

            <h3
              className="
                relative
                z-10
                mt-3
                text-xl
                font-serif-luxury
                text-[#0D0F12]

                transition-all
                duration-500

                group-hover:text-[#8C6D45]
                group-hover:translate-x-1
              "
            >
              Global Prime Syndicate
            </h3>

            <p
              className="
                relative
                z-10
                mt-4
                text-xs
                sm:text-sm
                text-[#5A5E66]
                font-light
                leading-relaxed
              "
            >
              Our partners in Beverly Hills, London, Paris, Zurich, and Dubai
              operate as a single unified desk, facilitating frictionless
              cross-border transactions and currency hedging.
            </p>

            <div
              className="
                mt-7
                h-px
                w-8
                bg-[#C5A880]

                transition-all
                duration-700

                group-hover:w-20
              "
            />

          </div>

        </div>
      </div>

      {/* ================= LEADERSHIP ================= */}

      <div className="bg-[#0D0F12] text-white py-24 mb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader
            theme="dark"
            subtitle="Advisory Partners"
            title="Senior Leadership"
            description="Our managing partners combine over four decades of prime market transacting and fine arts patronage."
            align="center"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {leadership.map((leader, index) => (
              <div
                key={leader.id}
                className="
                  group
                  relative
                  bg-white/5
                  border border-white/10
                  p-8
                  rounded-sm
                  flex
                  flex-col
                  justify-between
                  overflow-hidden

                  transition-all
                  duration-700

                  hover:-translate-y-3
                  hover:bg-white/[0.07]
                  hover:border-[#C5A880]/50
                  hover:shadow-[0_25px_60px_rgba(197,168,128,0.10)]

                  animate-[fadeInUp_0.8s_ease-out_both]
                "
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >

                <div
                  className="
                    absolute
                    top-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#C5A880]

                    transition-all
                    duration-700

                    group-hover:w-full
                  "
                />

                <div
                  className="
                    aspect-[4/5]
                    rounded-sm
                    overflow-hidden
                    mb-6
                    border border-white/10
                  "
                >

                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      grayscale

                      transition-all
                      duration-700

                      group-hover:grayscale-0
                      group-hover:scale-105
                    "
                  />

                </div>

                <h3
                  className="
                    text-xl
                    font-serif-luxury
                    text-white

                    transition-colors
                    duration-500

                    group-hover:text-[#DCC28F]
                  "
                >
                  {leader.name}
                </h3>

                <p
                  className="
                    text-xs
                    text-[#C5A880]
                    uppercase
                    tracking-wider
                    mt-1
                    font-medium
                  "
                >
                  {leader.title}
                </p>

                <p
                  className="
                    text-xs
                    text-[#9CA3AF]
                    mt-3
                    font-light
                    leading-relaxed
                  "
                >
                  {leader.experience} · Fluent in{' '}
                  {leader.languages.join(', ')}
                </p>

                <div
                  className="
                    mt-6
                    pt-4
                    border-t border-white/10
                    space-y-2
                    text-xs
                    text-[#DCD6CD]
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      transition-all
                      duration-300

                      hover:translate-x-1
                      hover:text-white
                    "
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C5A880]" />

                    <span>
                      {leader.phone}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      transition-all
                      duration-300

                      hover:translate-x-1
                      hover:text-white
                    "
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />

                    <span>
                      {leader.email}
                    </span>
                  </div>

                </div>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* ================= CTA ================= */}

      <div
        className={`
          max-w-4xl
          mx-auto
          px-4
          text-center

          transition-all
          duration-1000

          ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }
        `}
      >

        <h3
          className="
            text-2xl
            sm:text-3xl
            font-serif-luxury
            text-[#0D0F12]
            mb-3
          "
        >
          Engage Our Private Client Desk
        </h3>

        <p
          className="
            text-sm
            text-[#5A5E66]
            font-light
            mb-8
            max-w-lg
            mx-auto
          "
        >
          Contact our senior advisory team to discuss private sales,
          off-market acquisitions, or confidential portfolio valuation.
        </p>

        <Link
          to="/contact"
          className="
            group
            relative
            inline-flex
            items-center
            gap-3
            px-8
            py-3.5

            bg-[#C5A880]
            hover:bg-[#D4AF37]

            text-black
            text-xs
            uppercase
            tracking-widest
            font-semibold

            rounded-sm
            overflow-hidden

            transition-all
            duration-500

            hover:-translate-y-1
            hover:shadow-[0_15px_35px_rgba(197,168,128,0.25)]
          "
        >

          <span
            className="
              absolute
              inset-0
              bg-white/20

              translate-x-[-110%]
              group-hover:translate-x-[110%]

              transition-transform
              duration-700

              skew-x-[-20deg]
            "
          />

          <span className="relative z-10">
            Initiate Confidential Inquiry
          </span>

          <ArrowRight
            className="
              relative
              z-10
              w-3.5
              h-3.5

              transition-transform
              duration-500

              group-hover:translate-x-1
            "
          />

        </Link>

      </div>

      {/* ==========================================================
          CUSTOM ANIMATIONS
      ========================================================== */}

      <style>{`

        /* ========================================================
           INFINITE HERO TITLE
           
           Left → center → right → repeat
        ======================================================== */

        @keyframes aboutTitleReveal {

          0% {
            opacity: 0;
            transform: translateX(-55px);
          }

          12% {
            opacity: 1;
            transform: translateX(0);
          }

          72% {
            opacity: 1;
            transform: translateX(0);
          }

          86% {
            opacity: 0.55;
            transform: translateX(25px);
          }

          100% {
            opacity: 0;
            transform: translateX(55px);
          }

        }

        /* ========================================================
           LEADERSHIP CARDS
        ======================================================== */

        @keyframes fadeInUp {

          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

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

    </div>
  );
};