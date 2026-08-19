import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

import { testimonialsData } from '../../data/testimonials';
import { SectionHeader } from '../common/SectionHeader';

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [showHeader, setShowHeader] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let timers: ReturnType<typeof setTimeout>[] = [];

    const clearTimers = () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers = [];
    };

    const resetAnimation = () => {
      clearTimers();
      setShowHeader(false);
      setVisibleCards([]);
    };

    const startAnimation = () => {
      clearTimers();

      setShowHeader(false);
      setVisibleCards([]);

      timers.push(
        setTimeout(() => {
          setShowHeader(true);
        }, 120)
      );

      testimonialsData.forEach((_, index) => {
        timers.push(
          setTimeout(() => {
            setVisibleCards((prev) =>
              prev.includes(index)
                ? prev
                : [...prev, index]
            );
          }, 300 + index * 130)
        );
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          resetAnimation();
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(section);

    return () => {
      clearTimers();
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-[#0D0F12]
        py-24
        text-white
        sm:py-32
      "
    >
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none absolute inset-0">

        {/* Main background */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#0D0F12]
            via-[#111419]
            to-[#0A0C0F]
          "
        />

        {/* Gold ambient glow */}

        <div
          className="
            absolute
            -left-40
            -bottom-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#C5A880]/10
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            -right-40
            -top-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#C5A880]/[0.065]
            blur-[140px]
          "
        />

        {/* Center light */}

        <div
          className="
            absolute
            left-1/2
            top-[45%]
            h-[450px]
            w-[750px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#C5A880]/[0.025]
            blur-[120px]
          "
        />

        {/* Fine texture */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            bg-[radial-gradient(#C5A880_0.8px,transparent_0.8px)]
            [background-size:28px_28px]
          "
        />

        {/* Architectural lines */}

        <div
          className="
            absolute
            left-[7%]
            top-0
            h-full
            w-px
            bg-white/[0.035]
          "
        />

        <div
          className="
            absolute
            right-[7%]
            top-0
            h-full
            w-px
            bg-white/[0.035]
          "
        />
      </div>

      {/* ============================================================
          CONTENT
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
                : 'translate-y-8 opacity-0'
            }
          `}
        >
          <SectionHeader
            theme="dark"
            subtitle="Client Perspectives"
            title="Private Client Endorsements"
            description="Reflections from the collectors, global families, and founders who have entrusted us with their landmark acquisitions."
            align="center"
            className="mb-14 sm:mb-16"
          />
        </div>

        {/* ============================================================
            SLIDER AREA
        ============================================================ */}

        <div className="relative">

          {/* Soft left fade */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              bottom-0
              z-20
              w-8
              bg-gradient-to-r
              from-[#0D0F12]
              to-transparent
              sm:w-14
            "
          />

          {/* Soft right fade */}

          <div
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              bottom-0
              z-20
              w-8
              bg-gradient-to-l
              from-[#0D0F12]
              to-transparent
              sm:w-14
            "
          />

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}

            /* ========================================================
               SLIDER BEHAVIOUR
            ======================================================== */

            loop={true}

            /* Natural card-to-card movement */

            speed={1200}

            /* Wait between slides */

            autoplay={{
              delay: 3800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            grabCursor={true}

            slidesPerView={1}
            spaceBetween={20}

            breakpoints={{
              480: {
                slidesPerView: 1.05,
                spaceBetween: 20,
              },

              640: {
                slidesPerView: 1.15,
                spaceBetween: 24,
              },

              768: {
                slidesPerView: 2,
                spaceBetween: 28,
              },

              1100: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
            }}

            navigation={{
              prevEl: '.testimonial-prev',
              nextEl: '.testimonial-next',
            }}

            pagination={{
              el: '.testimonial-pagination',
              clickable: true,
            }}

            className="!overflow-visible !pb-20"
          >
            {testimonialsData.map((item, index) => {
              const isVisible =
                visibleCards.includes(index);

              return (
                <SwiperSlide
                  key={item.id}
                  className="!h-auto"
                >
                  {/* ==================================================
                      PREMIUM CARD
                  ================================================== */}

                  <article
                    className={`
                      testimonial-card
                      group
                      relative
                      h-full
                      min-h-[380px]
                      overflow-hidden
                      rounded-[5px]

                      border
                      border-white/[0.11]

                      bg-gradient-to-br
                      from-white/[0.075]
                      via-white/[0.045]
                      to-white/[0.025]

                      p-7
                      sm:p-9

                      shadow-[0_18px_60px_rgba(0,0,0,0.22)]

                      transition-all
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      hover:-translate-y-1.5
                      hover:border-[#C5A880]/45
                      hover:bg-white/[0.06]
                      hover:shadow-[0_25px_75px_rgba(0,0,0,0.32)]

                      ${
                        isVisible
                          ? 'translate-y-0 scale-100 opacity-100'
                          : 'translate-y-12 scale-[0.98] opacity-0'
                      }
                    `}
                  >

                    {/* ==================================================
                        PREMIUM MOVING BORDER
                    ================================================== */}

                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-30
                        rounded-[5px]
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
                          h-px
                          w-[35%]
                          bg-gradient-to-r
                          from-transparent
                          via-[#D6B879]
                          to-transparent
                          group-hover:animate-[borderTop_3.5s_linear_infinite]
                        "
                      />

                      {/* Right */}

                      <span
                        className="
                          absolute
                          right-0
                          top-0
                          h-[35%]
                          w-px
                          bg-gradient-to-b
                          from-transparent
                          via-[#D6B879]
                          to-transparent
                          group-hover:animate-[borderRight_3.5s_linear_infinite]
                        "
                      />

                      {/* Bottom */}

                      <span
                        className="
                          absolute
                          bottom-0
                          right-0
                          h-px
                          w-[35%]
                          bg-gradient-to-l
                          from-transparent
                          via-[#D6B879]
                          to-transparent
                          group-hover:animate-[borderBottom_3.5s_linear_infinite]
                        "
                      />

                      {/* Left */}

                      <span
                        className="
                          absolute
                          bottom-0
                          left-0
                          h-[35%]
                          w-px
                          bg-gradient-to-t
                          from-transparent
                          via-[#D6B879]
                          to-transparent
                          group-hover:animate-[borderLeft_3.5s_linear_infinite]
                        "
                      />
                    </div>

                    {/* ==================================================
                        GOLD ACCENT
                    ================================================== */}

                    <div
                      className="
                        absolute
                        left-7
                        top-0
                        h-[2px]
                        w-12
                        bg-[#C5A880]

                        transition-all
                        duration-500

                        group-hover:w-24

                        sm:left-9
                      "
                    />

                    {/* ==================================================
                        QUOTE ICON
                    ================================================== */}

                    <div
                      className="
                        absolute
                        right-7
                        top-7
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C5A880]/10
                        bg-[#C5A880]/[0.035]
                        transition-all
                        duration-500
                        group-hover:border-[#C5A880]/25
                        group-hover:bg-[#C5A880]/[0.07]
                      "
                    >
                      <Quote
                        className="
                          h-5
                          w-5
                          text-[#C5A880]/45
                          transition-all
                          duration-500
                          group-hover:scale-110
                          group-hover:text-[#C5A880]
                        "
                      />
                    </div>

                    {/* ==================================================
                        CARD CONTENT
                    ================================================== */}

                    <div
                      className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        justify-between
                      "
                    >

                      {/* TOP */}

                      <div>

                        {/* Rating */}

                        <div
                          className="
                            mb-7
                            flex
                            items-center
                            justify-between
                            pr-14
                          "
                        >
                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map(
                              (_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className="
                                    h-3.5
                                    w-3.5
                                    fill-[#C5A880]
                                    text-[#C5A880]
                                    transition-transform
                                    duration-300
                                    group-hover:scale-105
                                  "
                                />
                              )
                            )}
                          </div>

                          <span
                            className="
                              rounded-full
                              border
                              border-[#C5A880]/15
                              bg-[#C5A880]/[0.035]
                              px-2.5
                              py-1
                              text-[8px]
                              uppercase
                              tracking-[0.22em]
                              text-[#C5A880]/75
                            "
                          >
                            Verified
                          </span>
                        </div>

                        {/* Quote text */}

                        <p
                          className="
                            max-w-[620px]
                            font-serif-luxury
                            text-sm
                            font-light
                            italic
                            leading-[1.9]
                            text-[#DCD6CD]

                            transition-colors
                            duration-500

                            group-hover:text-white

                            sm:text-[15px]
                          "
                        >
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      </div>

                      {/* ==================================================
                          CLIENT FOOTER
                      ================================================== */}

                      <div
                        className="
                          mt-8
                          flex
                          items-center
                          gap-4
                          border-t
                          border-white/[0.09]
                          pt-6
                        "
                      >

                        {/* Avatar */}

                        <div className="relative shrink-0">

                          <div
                            className="
                              absolute
                              -inset-1
                              rounded-full
                              border
                              border-transparent
                              transition-all
                              duration-500
                              group-hover:scale-110
                              group-hover:border-[#C5A880]/35
                            "
                          />

                          <img
                            src={item.avatar}
                            alt={item.clientName}
                            className="
                              relative
                              h-12
                              w-12
                              rounded-full
                              border
                              border-[#C5A880]/55
                              object-cover

                              transition-all
                              duration-500

                              group-hover:scale-105
                              group-hover:border-[#C5A880]
                            "
                          />
                        </div>

                        {/* Details */}

                        <div className="min-w-0 flex-1">

                          <h4
                            className="
                              truncate
                              text-sm
                              font-semibold
                              tracking-wide
                              text-white
                            "
                          >
                            {item.clientName}
                          </h4>

                          <p
                            className="
                              mt-1
                              truncate
                              text-[11px]
                              font-light
                              text-[#92979E]
                            "
                          >
                            {item.clientRole}
                            <span className="mx-1.5 text-[#C5A880]/50">
                              •
                            </span>
                            {item.location}
                          </p>

                          {item.propertyName && (
                            <p
                              className="
                                mt-1
                                truncate
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.08em]
                                text-[#C5A880]/80
                              "
                            >
                              Acquired · {item.propertyName}
                            </p>
                          )}
                        </div>

                        {/* Small index */}

                        <div
                          className="
                            hidden
                            text-[9px]
                            font-medium
                            tracking-[0.2em]
                            text-white/20
                            sm:block
                          "
                        >
                          0{index + 1}
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* ==========================================================
              CONTROLS
          ========================================================== */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-30
              flex
              items-center
              justify-between
            "
          >

            {/* Progress */}

            <div
              className="
                testimonial-pagination
                !relative
                !bottom-auto
                !left-auto
                flex
                !w-auto
                items-center
              "
            />

            {/* Navigation */}

            <div className="flex items-center gap-2.5">

              {/* Previous */}

              <button
                type="button"
                aria-label="Previous testimonial"
                className="
                  testimonial-prev
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-white/10

                  bg-white/[0.035]

                  text-white/55

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-[#C5A880]/50
                  hover:bg-[#C5A880]
                  hover:text-[#0D0F12]

                  hover:shadow-[0_8px_30px_rgba(197,168,128,0.18)]

                  active:scale-90
                  sm:h-11
                  sm:w-11
                "
              >
                <ArrowLeft
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:-translate-x-0.5
                  "
                />
              </button>

              {/* Next */}

              <button
                type="button"
                aria-label="Next testimonial"
                className="
                  testimonial-next
                  group
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full

                  border
                  border-[#C5A880]/35

                  bg-[#C5A880]/[0.07]

                  text-[#C5A880]

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]
                  hover:text-[#0D0F12]

                  hover:shadow-[0_8px_30px_rgba(197,168,128,0.2)]

                  active:scale-90
                  sm:h-11
                  sm:w-11
                "
              >
                <ArrowRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            BOTTOM LABEL
        ============================================================ */}

        <div
          className={`
            mt-8
            flex
            items-center
            justify-between

            transition-all
            duration-1000
            delay-500

            ${
              showHeader
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C5A880]/70" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.28em]
                text-[#C5A880]/75
              "
            >
              Trusted By Collectors
            </span>
          </div>

          <span
            className="
              hidden
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/20
              sm:block
            "
          >
            Private Client Registry
          </span>
        </div>
      </div>

      {/* ============================================================
          CUSTOM CSS
      ============================================================ */}

      <style>{`

        /* ==========================================================
           SMOOTH SWIPER
        ========================================================== */

        .swiper-wrapper {
          transition-timing-function:
            cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        /* ==========================================================
           PREMIUM PAGINATION
        ========================================================== */

        .testimonial-pagination
        .swiper-pagination-bullet {
          width: 16px;
          height: 2px;

          margin: 0 3px !important;

          border-radius: 999px;

          background: rgba(255,255,255,0.16);

          opacity: 1;

          transition:
            width 450ms cubic-bezier(0.22,1,0.36,1),
            background 350ms ease,
            box-shadow 350ms ease;
        }

        .testimonial-pagination
        .swiper-pagination-bullet:hover {
          background: rgba(197,168,128,0.55);
        }

        .testimonial-pagination
        .swiper-pagination-bullet-active {
          width: 42px;

          background: #C5A880;

          box-shadow:
            0 0 14px
            rgba(197,168,128,0.30);
        }

        /* ==========================================================
           MOVING BORDER
        ========================================================== */

        @keyframes borderTop {
          0% {
            transform: translateX(-160%);
          }

          100% {
            transform: translateX(420%);
          }
        }

        @keyframes borderRight {
          0% {
            transform: translateY(-160%);
          }

          100% {
            transform: translateY(420%);
          }
        }

        @keyframes borderBottom {
          0% {
            transform: translateX(160%);
          }

          100% {
            transform: translateX(-420%);
          }
        }

        @keyframes borderLeft {
          0% {
            transform: translateY(160%);
          }

          100% {
            transform: translateY(-420%);
          }
        }

        /* ==========================================================
           MOBILE
        ========================================================== */

        @media (max-width: 640px) {

          .testimonial-pagination
          .swiper-pagination-bullet {
            width: 10px;
          }

          .testimonial-pagination
          .swiper-pagination-bullet-active {
            width: 28px;
          }
        }

        /* ==========================================================
           REDUCED MOTION
        ========================================================== */

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