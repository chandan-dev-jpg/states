import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { propertiesData } from '../../data/properties';
import { PropertySlider } from '../property/PropertySlider';
import { SectionHeader } from '../common/SectionHeader';

export const FeaturedSection: React.FC = () => {
  const featuredEstates = propertiesData.filter((p) => p.featured);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#FAF8F5] overflow-hidden"
    >
      {/* =====================================================
          LUXURY BACKGROUND
      ====================================================== */}

      <div
        className={`
          absolute
          top-0
          right-0
          w-[500px]
          h-[500px]
          rounded-full
          bg-[#C5A880]/[0.035]
          blur-[120px]
          pointer-events-none
          transition-all
          duration-[1400ms]
          ease-out
          ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75'
          }
        `}
      />

      <div
        className={`
          absolute
          bottom-[-200px]
          left-[-150px]
          w-[450px]
          h-[450px]
          rounded-full
          bg-[#C5A880]/[0.025]
          blur-[110px]
          pointer-events-none
          transition-all
          duration-[1600ms]
          delay-200
          ${
            isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75'
          }
        `}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div
          className={`
            flex
            flex-col
            md:flex-row
            md:items-end
            justify-between
            mb-12
            gap-6
            transition-all
            duration-1000
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }
          `}
        >
          <div className="relative">

            {/* Decorative gold line */}

            <div
              className={`
                flex
                items-center
                gap-2
                mb-3
                transition-all
                duration-700
                ${
                  isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-6'
                }
              `}
            >
              <span
                className={`
                  h-px
                  bg-[#C5A880]
                  transition-all
                  duration-700
                  ${
                    isVisible
                      ? 'w-7'
                      : 'w-0'
                  }
                `}
              />

              <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#C5A880]">
                Curated Portfolio
              </span>

              <span
                className={`
                  h-px
                  bg-[#C5A880]
                  transition-all
                  duration-700
                  delay-100
                  ${
                    isVisible
                      ? 'w-7'
                      : 'w-0'
                  }
                `}
              />
            </div>

            <SectionHeader
              subtitle=""
              title="Featured Architectural Masterpieces"
              description="Exemplary residences selected for their irreplaceable locations, architectural pedigree, and exceptional finish standards."
              align="left"
              className="mb-0"
            />
          </div>

          {/* =================================================
              VIEW ALL
          ================================================== */}

          <Link
            to="/properties"
            className="
              group
              relative
              inline-flex
              items-center
              gap-2.5
              text-[10px]
              uppercase
              tracking-[0.2em]
              font-semibold
              text-[#0D0F12]
              self-start
              md:self-end
              pb-2
              transition-all
              duration-500
              hover:text-[#8C6D45]
            "
          >
            <span>
              View Complete Collection
            </span>

            <ArrowUpRight
              className="
                w-4
                h-4
                transition-all
                duration-500
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />

            {/* Original underline */}

            <span
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-full
                bg-[#0D0F12]
                origin-left
                transition-transform
                duration-500
                group-hover:scale-x-0
              "
            />

            {/* Gold hover underline */}

            <span
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-full
                bg-[#C5A880]
                origin-right
                scale-x-0
                transition-transform
                duration-500
                group-hover:scale-x-100
              "
            />
          </Link>
        </div>

        {/* =====================================================
            PROPERTY SLIDER
        ====================================================== */}

        <div
          className={`
            relative
            -mx-1
            sm:mx-0
            transition-all
            duration-[1100ms]
            delay-200
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-14 scale-[0.985]'
            }
          `}
        >

          {/* Left edge fade */}

          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-8
              sm:w-14
              bg-gradient-to-r
              from-[#FAF8F5]
              to-transparent
              z-20
              pointer-events-none
            "
          />

          {/* Right edge fade */}

          <div
            className="
              absolute
              right-0
              top-0
              bottom-0
              w-8
              sm:w-14
              bg-gradient-to-l
              from-[#FAF8F5]
              to-transparent
              z-20
              pointer-events-none
            "
          />

          <PropertySlider properties={featuredEstates} />
        </div>

        {/* =====================================================
            BOTTOM PORTFOLIO LABEL
        ====================================================== */}

        <div
          className={`
            mt-8
            flex
            items-center
            justify-between
            transition-all
            duration-1000
            delay-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }
          `}
        >

          <div className="flex items-center gap-3">

            <span
              className={`
                h-px
                bg-[#C5A880]
                transition-all
                duration-700
                ${
                  isVisible
                    ? 'w-8'
                    : 'w-0'
                }
              `}
            />

            <span className="text-[9px] uppercase tracking-[0.25em] text-[#8C6D45] font-medium">
              Private Collection
            </span>

          </div>

          <span className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-[#9CA3AF]">
            Selected Estates
          </span>
        </div>

      </div>
    </section>
  );
};