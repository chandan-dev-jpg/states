import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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
        threshold: 0.15,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#FAF8F5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            CTA CARD
        ====================================================== */}

        <div
          className={`
            group
            relative
            rounded-sm
            overflow-hidden
            bg-[#0D0F12]
            text-white
            p-8
            sm:p-14
            lg:p-20
            shadow-2xl
            transition-all
            duration-[1100ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-14 scale-[0.985]'
            }
          `}
        >

          {/* =================================================
              STATIC BORDER
          ================================================== */}

          <div className="absolute inset-0 border border-white/10 rounded-sm pointer-events-none z-30" />

          {/* =================================================
              ANIMATED HOVER BORDER
          ================================================== */}

          <div
            className="
              absolute
              inset-0
              rounded-sm
              pointer-events-none
              z-30
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          >
            {/* Moving perimeter light */}
            <span
              className="
                absolute
                inset-0
                rounded-sm
                border
                border-transparent
                bg-[linear-gradient(90deg,transparent,#C5A880,transparent)] 
                [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
                [mask-composite:exclude]
                animate-[borderFlow_3.5s_linear_infinite]
              "
            />
          </div>

          {/* =================================================
              SECOND SOFT GOLD BORDER
          ================================================== */}

          <div
            className="
              absolute
              -inset-px
              rounded-sm
              pointer-events-none
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-700
              shadow-[0_0_35px_rgba(197,168,128,0.12)]
            "
          />

          {/* =================================================
              BACKGROUND IMAGE
          ================================================== */}

          <div className="absolute inset-0 z-0 overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Luxury Estate"
              className="
                w-full
                h-full
                object-cover
                object-center
                opacity-25
                scale-105
                transition-all
                duration-[1600ms]
                ease-out
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0F12] via-[#0D0F12]/80 to-transparent" />

            {/* Extra cinematic bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12]/70 via-transparent to-transparent" />

          </div>

          {/* =================================================
              GOLD AMBIENT LIGHT
          ================================================== */}

          <div
            className="
              absolute
              -right-32
              -top-32
              w-[420px]
              h-[420px]
              rounded-full
              bg-[#C5A880]/10
              blur-[120px]
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-1000
              pointer-events-none
            "
          />

          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            className={`
              relative
              z-10
              max-w-2xl
              space-y-6
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

            {/* Eyebrow */}

            <div
              className={`
                inline-flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#C5A880]
                font-medium
                transition-all
                duration-700
                ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-5'
                }
              `}
            >

              <ShieldCheck
                className="
                  w-4
                  h-4
                  transition-transform
                  duration-500
                  group-hover:rotate-6
                  group-hover:scale-110
                "
              />

              <span>
                Confidential Private Advisory
              </span>

            </div>

            {/* Heading */}

            <h2
              className={`
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-serif-luxury
                font-normal
                leading-tight
                text-white
                transition-all
                duration-1000
                delay-100
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
              `}
            >
              Begin Your Private Acquisition Journey
            </h2>

            {/* Description */}

            <p
              className={`
                text-sm
                sm:text-base
                font-light
                text-[#DCD6CD]
                leading-relaxed
                transition-all
                duration-1000
                delay-200
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }
              `}
            >
              Whether you are acquiring a historic European estate or seeking
              an off-market penthouse overlooking Central Park, our private
              partners provide direct, discreet representation.
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div
              className={`
                pt-4
                flex
                flex-col
                sm:flex-row
                items-stretch
                sm:items-center
                gap-4
                transition-all
                duration-1000
                delay-300
                ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }
              `}
            >

              {/* Private Visit */}

              <Link
                to="/contact"
                className="
                  group/primary
                  relative
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  px-8
                  py-4
                  bg-[#C5A880]
                  hover:bg-[#D4AF37]
                  text-black
                  text-xs
                  uppercase
                  tracking-widest
                  font-semibold
                  rounded-sm
                  transition-all
                  duration-500
                  shadow-[0_0_20px_rgba(197,168,128,0.3)]
                  hover:shadow-[0_0_35px_rgba(197,168,128,0.45)]
                  hover:-translate-y-1
                  overflow-hidden
                "
              >

                {/* Button shine */}

                <span
                  className="
                    absolute
                    inset-0
                    bg-white/25
                    translate-x-[-120%]
                    group-hover/primary:translate-x-[120%]
                    transition-transform
                    duration-700
                    skew-x-[-20deg]
                  "
                />

                <span className="relative">
                  Schedule a Private Visit
                </span>

                <ArrowUpRight
                  className="
                    relative
                    w-4
                    h-4
                    transition-transform
                    duration-500
                    group-hover/primary:translate-x-1
                    group-hover/primary:-translate-y-1
                  "
                />

              </Link>

              {/* Phone */}

              <a
                href="tel:+91-98765-43210"
                className="
                  group/phone
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-6
                  py-4
                  bg-white/10
                  hover:bg-white/20
                  text-white
                  border
                  border-white/20
                  hover:border-[#C5A880]/70
                  text-xs
                  uppercase
                  tracking-widest
                  font-medium
                  rounded-sm
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  backdrop-blur-sm
                "
              >

                <Phone
                  className="
                    w-3.5
                    h-3.5
                    text-[#C5A880]
                    transition-transform
                    duration-500
                    group-hover/phone:rotate-12
                  "
                />

                <span>
                  +91-98765-43210
                </span>

              </a>

            </div>
          </div>

          {/* =================================================
              CORNER DECORATION
          ================================================== */}

          <div
            className="
              absolute
              right-6
              top-6
              w-14
              h-14
              border-t
              border-r
              border-[#C5A880]/20
              group-hover:border-[#C5A880]/70
              transition-colors
              duration-700
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              left-6
              bottom-6
              w-14
              h-14
              border-l
              border-b
              border-[#C5A880]/20
              group-hover:border-[#C5A880]/70
              transition-colors
              duration-700
              pointer-events-none
            "
          />

        </div>
      </div>

      {/* =====================================================
          REQUIRED ANIMATION
          Tailwind arbitrary animation ko reliable banane ke liye
          inline style keyframes
      ====================================================== */}

      <style>{`
        @keyframes borderFlow {
          0% {
            transform: rotate(0deg);
            opacity: 0.35;
          }

          50% {
            opacity: 1;
          }

          100% {
            transform: rotate(360deg);
            opacity: 0.35;
          }
        }
      `}</style>
    </section>
  );
};