import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Property } from '../../types/property';
import { PropertyCard } from './PropertyCard';

import 'swiper/css';

interface PropertySliderProps {
  properties: Property[];
  title?: string;
  subtitle?: string;
}

export const PropertySlider: React.FC<PropertySliderProps> = ({
  properties,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Update active slide
   */
  const updateSliderState = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  /*
   * Pause / Resume autoplay
   */
  useEffect(() => {
    const swiper = swiperRef.current;

    if (!swiper || !swiper.autoplay) return;

    if (isHovered) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [isHovered]);

  /*
   * Empty state
   */
  if (!properties.length) {
    return null;
  }

  return (
    <div
      className="relative w-full group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* =====================================================
          CUSTOM NAVIGATION
      ====================================================== */}

      <div className="flex items-center justify-end gap-2 mb-5">

        {/* Previous */}
        <button
          type="button"
          aria-label="Previous properties"
          onClick={() => swiperRef.current?.slidePrev()}
          className="
            group/prev
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-[#DED8CE]
            text-[#0D0F12]
            flex
            items-center
            justify-center
            shadow-sm
            transition-all
            duration-500
            hover:bg-[#0D0F12]
            hover:text-[#C5A880]
            hover:border-[#0D0F12]
            hover:-translate-x-0.5
            hover:shadow-lg
            active:scale-95
          "
        >
          <ChevronLeft
            className="
              w-4
              h-4
              transition-transform
              duration-500
              group-hover/prev:-translate-x-0.5
            "
          />
        </button>

        {/* Next */}
        <button
          type="button"
          aria-label="Next properties"
          onClick={() => swiperRef.current?.slideNext()}
          className="
            group/next
            w-10
            h-10
            rounded-full
            bg-[#0D0F12]
            border
            border-[#0D0F12]
            text-white
            flex
            items-center
            justify-center
            shadow-md
            transition-all
            duration-500
            hover:bg-[#C5A880]
            hover:text-[#0D0F12]
            hover:border-[#C5A880]
            hover:translate-x-0.5
            hover:shadow-lg
            active:scale-95
          "
        >
          <ChevronRight
            className="
              w-4
              h-4
              transition-transform
              duration-500
              group-hover/next:translate-x-0.5
            "
          />
        </button>

      </div>

      {/* =====================================================
          LEFT EDGE FADE
      ====================================================== */}

      <div
        className="
          absolute
          left-0
          top-14
          bottom-14
          w-7
          sm:w-12
          z-20
          pointer-events-none
          bg-gradient-to-r
          from-[#FAF8F5]
          via-[#FAF8F5]/70
          to-transparent
        "
      />

      {/* =====================================================
          RIGHT EDGE FADE
      ====================================================== */}

      <div
        className="
          absolute
          right-0
          top-14
          bottom-14
          w-7
          sm:w-12
          z-20
          pointer-events-none
          bg-gradient-to-l
          from-[#FAF8F5]
          via-[#FAF8F5]/70
          to-transparent
        "
      />

      {/* =====================================================
          SWIPER
      ====================================================== */}

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateSliderState(swiper);
        }}
        onSlideChange={updateSliderState}
        onRealIndexChange={updateSliderState}

        /*
         * Infinite loop
         */
        loop={properties.length > 1}

        /*
         * ⭐ Slow & smooth luxury movement
         */
        speed={1600}

        /*
         * ⭐ Soft drag / touch resistance
         */
        resistance
        resistanceRatio={0.85}

        /*
         * ⭐ Smooth cursor interaction
         */
        grabCursor

        /*
         * Better rendering
         */
        watchSlidesProgress

        /*
         * ⭐ Auto movement
         */
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}

        spaceBetween={20}
        slidesPerView={1}

        /*
         * Responsive spacing
         */
        breakpoints={{
          480: {
            slidesPerView: 1.12,
            spaceBetween: 20,
          },

          640: {
            slidesPerView: 1.5,
            spaceBetween: 22,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 26,
          },

          1024: {
            slidesPerView: 2.5,
            spaceBetween: 28,
          },

          1280: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}

        className="
          property-luxury-slider
          !overflow-visible
          pb-14
          pt-2
        "
      >

        {properties.map((property) => (
          <SwiperSlide
            key={property.id}
            className="h-auto"
          >
            <div
              className="
                h-full
                transition-transform
                duration-[1200ms]
                ease-out
              "
            >
              <PropertyCard
                property={property}
                className="
                  h-full
                  transition-all
                  duration-700
                "
              />
            </div>
          </SwiperSlide>
        ))}

      </Swiper>

      {/* =====================================================
          PREMIUM PROGRESS
      ====================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          flex
          items-center
          justify-between
          gap-4
        "
      >

        {/* Collection progress */}

        <div className="flex items-center gap-3">

          <span
            className="
              hidden
              sm:block
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-[#8C6D45]
              font-semibold
              whitespace-nowrap
            "
          >
            Collection
          </span>

          <div
            className="
              relative
              w-20
              sm:w-36
              h-px
              bg-[#DCD6CD]
              overflow-hidden
            "
          >
            <div
              className="
                absolute
                left-0
                top-0
                h-full
                bg-[#C5A880]
                transition-all
                duration-[1000ms]
                ease-out
              "
              style={{
                width: `${Math.max(
                  10,
                  ((activeIndex + 1) / properties.length) * 100
                )}%`,
              }}
            />
          </div>

          <span
            className="
              text-[9px]
              text-[#9CA3AF]
              tabular-nums
              whitespace-nowrap
            "
          >
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(properties.length).padStart(2, '0')}
          </span>

        </div>

        {/* =================================================
            PREMIUM DOTS
        ================================================== */}

        <div className="flex items-center gap-1">

          {properties.map((property, index) => (
            <button
              key={property.id}
              type="button"
              aria-label={`Go to property ${index + 1}`}
              onClick={() =>
                swiperRef.current?.slideToLoop(index, 1200)
              }
              className="
                group/dot
                p-1
                flex
                items-center
                justify-center
              "
            >
              <span
                className={`
                  block
                  h-1
                  rounded-full
                  transition-all
                  duration-700
                  ease-out
                  ${
                    index === activeIndex
                      ? 'w-6 bg-[#C5A880]'
                      : 'w-1.5 bg-[#C9C4BC] group-hover/dot:w-3 group-hover/dot:bg-[#8C6D45]'
                  }
                `}
              />
            </button>
          ))}

        </div>

      </div>

      {/* =====================================================
          PAUSED INDICATOR
      ====================================================== */}

      <div
        className={`
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          z-30
          pointer-events-none
          px-3
          py-1.5
          bg-[#0D0F12]/85
          backdrop-blur-md
          border
          border-[#C5A880]/30
          rounded-sm
          text-[8px]
          uppercase
          tracking-[0.25em]
          text-[#C5A880]
          transition-all
          duration-500
          ${
            isHovered
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }
        `}
      >
        Paused
      </div>

      {/* =====================================================
          EXTRA SMOOTH SWIPER STYLES
      ====================================================== */}

      <style>{`
        .property-luxury-slider .swiper-wrapper {
          align-items: stretch;

          /*
           * ⭐ Luxury easing curve
           * Makes movement softer at start/end
           */
          transition-timing-function:
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            ) !important;
        }

        .property-luxury-slider .swiper-slide {
          height: auto;

          transition:
            opacity 1200ms ease,
            transform 1200ms cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            );
        }

        .property-luxury-slider .swiper-slide > div {
          height: 100%;
        }

        /*
         * Soft inactive slides
         */
        .property-luxury-slider .swiper-slide-prev,
        .property-luxury-slider .swiper-slide-next {
          opacity: 0.97;
        }

        /*
         * Slightly smoother card rendering
         */
        .property-luxury-slider .swiper-slide {
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /*
         * Mobile
         */
        @media (max-width: 639px) {
          .property-luxury-slider {
            padding-left: 4px;
            padding-right: 4px;
          }
        }

        /*
         * Tablet
         */
        @media (min-width: 640px) and (max-width: 1023px) {
          .property-luxury-slider {
            padding-left: 2px;
            padding-right: 2px;
          }
        }

        /*
         * Desktop
         */
        @media (min-width: 1024px) {
          .property-luxury-slider {
            padding-left: 2px;
            padding-right: 2px;
          }
        }

        /*
         * Respect reduced-motion preference
         */
        @media (prefers-reduced-motion: reduce) {
          .property-luxury-slider .swiper-wrapper,
          .property-luxury-slider .swiper-slide {
            transition-duration: 300ms !important;
          }
        }
      `}</style>

    </div>
  );
};