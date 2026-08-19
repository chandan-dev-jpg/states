import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Thumbs,
  EffectFade,
  Keyboard,
} from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper/types';
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({
  images,
  title,
}) => {
  const [thumbsSwiper, setThumbsSwiper] =
    useState<SwiperClass | null>(null);

  const [mainSwiper, setMainSwiper] =
    useState<SwiperClass | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /*
   * =========================================================
   * FULLSCREEN ESC SUPPORT
   * =========================================================
   */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  /*
   * =========================================================
   * SAFETY
   * =========================================================
   */

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-[#0D0F12] flex items-center justify-center text-white/50 text-xs uppercase tracking-widest">
        No Images Available
      </div>
    );
  }

  /*
   * =========================================================
   * MAIN GALLERY
   * =========================================================
   */

  return (
    <div className="space-y-4">

      {/* =====================================================
          MAIN IMAGE GALLERY
      ====================================================== */}

      <div
        className="
          group/gallery
          relative
          rounded-sm
          overflow-hidden
          bg-[#0D0F12]
          border
          border-[#EAE6DF]
          aspect-[16/9]
          md:aspect-[21/9]
          shadow-[0_15px_50px_rgba(13,15,18,0.10)]
        "
      >

        <Swiper
          modules={[
            Navigation,
            Pagination,
            Thumbs,
            EffectFade,
            Keyboard,
          ]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={1100}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            type: 'fraction',
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed
                ? thumbsSwiper
                : null,
          }}
          onSwiper={(swiper) => {
            setMainSwiper(swiper);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="h-full w-full property-main-gallery"
        >

          {images.map((img, idx) => (
            <SwiperSlide
              key={idx}
              className="relative h-full w-full overflow-hidden"
            >

              {/* Image */}

              <img
                src={img}
                alt={`${title} - Photo ${idx + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  object-center
                  transition-transform
                  duration-[1800ms]
                  ease-out
                "
              />

              {/* Cinematic overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/55
                  via-transparent
                  to-black/25
                  pointer-events-none
                "
              />

              {/* Top subtle gradient */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-24
                  bg-gradient-to-b
                  from-black/35
                  to-transparent
                  pointer-events-none
                "
              />

            </SwiperSlide>
          ))}

        </Swiper>

        {/* =================================================
            CUSTOM LEFT ARROW
        ================================================== */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => mainSwiper?.slidePrev()}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              z-20
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-full
              bg-black/45
              hover:bg-[#C5A880]
              backdrop-blur-md
              border
              border-white/15
              hover:border-[#C5A880]
              text-white
              hover:text-black
              flex
              items-center
              justify-center
              opacity-0
              -translate-x-2
              group-hover/gallery:opacity-100
              group-hover/gallery:translate-x-0
              transition-all
              duration-500
            "
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* =================================================
            CUSTOM RIGHT ARROW
        ================================================== */}

        {images.length > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={() => mainSwiper?.slideNext()}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              z-20
              w-10
              h-10
              sm:w-11
              sm:h-11
              rounded-full
              bg-black/45
              hover:bg-[#C5A880]
              backdrop-blur-md
              border
              border-white/15
              hover:border-[#C5A880]
              text-white
              hover:text-black
              flex
              items-center
              justify-center
              opacity-0
              translate-x-2
              group-hover/gallery:opacity-100
              group-hover/gallery:translate-x-0
              transition-all
              duration-500
            "
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* =================================================
            TOP LABEL
        ================================================== */}

        <div
          className="
            absolute
            top-4
            left-4
            z-20
            flex
            items-center
            gap-2
            px-3
            py-1.5
            bg-black/45
            backdrop-blur-md
            border
            border-white/10
            rounded-sm
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/90
          "
        >
          <Images className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Property Gallery</span>
        </div>

        {/* =================================================
            BOTTOM CONTROLS
        ================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-4
            right-4
            z-20
            flex
            items-center
            justify-between
          "
        >

          {/* Counter */}

          <div
            className="
              flex
              items-center
              gap-2
              bg-black/65
              backdrop-blur-md
              text-white
              px-3
              py-1.5
              rounded-sm
              border
              border-white/10
            "
          >
            <span className="text-[#C5A880] text-[10px] font-semibold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            <span className="text-white/40 text-[10px]">
              /
            </span>

            <span className="text-white/70 text-[10px]">
              {String(images.length).padStart(2, '0')}
            </span>
          </div>

          {/* Fullscreen */}

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label="View fullscreen gallery"
            className="
              group/full
              w-9
              h-9
              flex
              items-center
              justify-center
              bg-black/65
              hover:bg-[#C5A880]
              text-white
              hover:text-black
              backdrop-blur-md
              rounded-sm
              border
              border-white/10
              transition-all
              duration-500
            "
          >
            <Maximize2
              className="
                w-4
                h-4
                transition-transform
                duration-500
                group-hover/full:scale-110
              "
            />
          </button>

        </div>

        {/* =================================================
            PROGRESS LINE
        ================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-[2px]
            z-20
            bg-white/10
          "
        >
          <div
            className="
              h-full
              bg-[#C5A880]
              transition-all
              duration-700
              ease-out
            "
            style={{
              width: `${
                ((activeIndex + 1) / images.length) * 100
              }%`,
            }}
          />
        </div>

      </div>

      {/* =====================================================
          THUMBNAILS
      ====================================================== */}

      {images.length > 1 && (
        <div className="hidden sm:block">

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={Math.min(images.length, 5)}
            watchSlidesProgress
            freeMode
            className="property-thumbs-slider cursor-pointer"
          >

            {images.map((img, idx) => (
              <SwiperSlide
                key={idx}
                className="rounded-sm overflow-hidden"
              >

                <button
                  type="button"
                  onClick={() =>
                    mainSwiper?.slideTo(idx, 1000)
                  }
                  className="block w-full"
                  aria-label={`View photo ${idx + 1}`}
                >

                  <div
                    className={`
                      relative
                      aspect-[16/10]
                      overflow-hidden
                      rounded-sm
                      border-2
                      transition-all
                      duration-700
                      ${
                        activeIndex === idx
                          ? 'border-[#C5A880] opacity-100 shadow-[0_8px_25px_rgba(197,168,128,0.15)]'
                          : 'border-transparent opacity-55 hover:opacity-100'
                      }
                    `}
                  >

                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      className="
                        w-full
                        h-full
                        object-cover
                        object-center
                        transition-transform
                        duration-700
                        hover:scale-105
                      "
                    />

                    {/* Active overlay */}

                    <div
                      className={`
                        absolute
                        inset-0
                        bg-[#C5A880]/10
                        transition-opacity
                        duration-500
                        ${
                          activeIndex === idx
                            ? 'opacity-100'
                            : 'opacity-0'
                        }
                      `}
                    />

                    {/* Thumbnail number */}

                    <span
                      className="
                        absolute
                        bottom-1.5
                        right-1.5
                        text-[8px]
                        font-medium
                        bg-black/60
                        text-white
                        px-1.5
                        py-0.5
                        rounded-sm
                        backdrop-blur-sm
                      "
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                  </div>

                </button>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>
      )}

      {/* =====================================================
          MOBILE DOTS
      ====================================================== */}

      {images.length > 1 && (
        <div className="flex sm:hidden items-center justify-center gap-1.5 pt-1">

          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to photo ${idx + 1}`}
              onClick={() =>
                mainSwiper?.slideTo(idx, 900)
              }
              className="p-1"
            >
              <span
                className={`
                  block
                  h-1
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    activeIndex === idx
                      ? 'w-6 bg-[#C5A880]'
                      : 'w-1.5 bg-[#D1CCC4]'
                  }
                `}
              />
            </button>
          ))}

        </div>
      )}

      {/* =====================================================
          FULLSCREEN LIGHTBOX
      ====================================================== */}

      {isFullscreen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#070809]/[0.97]
            backdrop-blur-2xl
            flex
            flex-col
          "
          onClick={() => setIsFullscreen(false)}
        >

          {/* =================================================
              LIGHTBOX HEADER
          ================================================== */}

          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-between
              px-5
              sm:px-8
              py-5
              border-b
              border-white/10
            "
          >

            <div>

              <h3
                className="
                  font-serif-luxury
                  text-lg
                  sm:text-xl
                  text-white
                "
              >
                {title}
              </h3>

              <p
                className="
                  text-[9px]
                  text-[#C5A880]
                  uppercase
                  tracking-[0.22em]
                  mt-1
                "
              >
                Full-Resolution Dossier
              </p>

            </div>

            {/* Close */}

            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="
                group/close
                flex
                items-center
                gap-2
                text-white/80
                hover:text-[#C5A880]
                text-[9px]
                uppercase
                tracking-[0.2em]
                px-3
                sm:px-4
                py-2
                border
                border-white/15
                hover:border-[#C5A880]/60
                rounded-sm
                transition-all
                duration-500
              "
            >
              <span className="hidden sm:inline">
                Close
              </span>

              <X
                className="
                  w-4
                  h-4
                  transition-transform
                  duration-500
                  group-hover/close:rotate-90
                "
              />
            </button>

          </div>

          {/* =================================================
              LIGHTBOX IMAGE
          ================================================== */}

          <div
            className="
              relative
              flex-1
              flex
              items-center
              justify-center
              p-5
              sm:p-10
              min-h-0
            "
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={images[activeIndex]}
              alt={`${title} - Fullscreen`}
              className="
                max-h-full
                max-w-full
                object-contain
                rounded-sm
                shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                select-none
              "
            />

            {/* Previous */}

            {images.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  mainSwiper?.slidePrev()
                }
                className="
                  absolute
                  left-3
                  sm:left-8
                  top-1/2
                  -translate-y-1/2
                  w-11
                  h-11
                  rounded-full
                  bg-white/10
                  hover:bg-[#C5A880]
                  border
                  border-white/15
                  hover:border-[#C5A880]
                  text-white
                  hover:text-black
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                "
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next */}

            {images.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  mainSwiper?.slideNext()
                }
                className="
                  absolute
                  right-3
                  sm:right-8
                  top-1/2
                  -translate-y-1/2
                  w-11
                  h-11
                  rounded-full
                  bg-white/10
                  hover:bg-[#C5A880]
                  border
                  border-white/15
                  hover:border-[#C5A880]
                  text-white
                  hover:text-black
                  backdrop-blur-md
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                "
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

          </div>

          {/* =================================================
              LIGHTBOX FOOTER
          ================================================== */}

          <div
            className="
              relative
              z-20
              px-5
              sm:px-8
              py-4
              border-t
              border-white/10
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            {/* Counter */}

            <div
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/50
              "
            >
              <span className="text-[#C5A880]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <span className="mx-2 text-white/20">
                /
              </span>

              {String(images.length).padStart(2, '0')}
            </div>

            {/* Dots */}

            <div className="flex items-center gap-1.5">

              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    mainSwiper?.slideTo(i, 900);
                  }}
                  aria-label={`View photo ${i + 1}`}
                  className="p-1"
                >
                  <span
                    className={`
                      block
                      h-1
                      rounded-full
                      transition-all
                      duration-500
                      ${
                        activeIndex === i
                          ? 'w-8 bg-[#C5A880]'
                          : 'w-1.5 bg-white/30 hover:bg-white/70'
                      }
                    `}
                  />
                </button>
              ))}

            </div>

            <span
              className="
                hidden
                sm:block
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              Use ← → to navigate · ESC to close
            </span>

          </div>

        </div>
      )}

      {/* =====================================================
          CUSTOM SWIPER STYLES
      ====================================================== */}

      <style>{`
        .property-main-gallery .swiper-wrapper {
          transition-timing-function:
            cubic-bezier(
              0.22,
              0.61,
              0.36,
              1
            ) !important;
        }

        .property-main-gallery .swiper-slide-active img {
          transform: scale(1.025);
        }

        .property-main-gallery .swiper-slide-prev img,
        .property-main-gallery .swiper-slide-next img {
          transform: scale(1);
        }

        .property-main-gallery .swiper-pagination {
          display: none;
        }

        .property-thumbs-slider .swiper-wrapper {
          align-items: stretch;
        }

        .property-thumbs-slider .swiper-slide {
          height: auto;
        }

        @media (max-width: 639px) {
          .property-main-gallery .swiper-slide img {
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .property-main-gallery .swiper-wrapper,
          .property-main-gallery .swiper-slide img {
            transition-duration: 300ms !important;
          }
        }
      `}</style>

    </div>
  );
};