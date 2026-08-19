import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

import { FilterState } from '../../types/property';

interface PropertyFilterProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export const PropertyFilter: React.FC<PropertyFilterProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalResults,
}) => {
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  /* ============================================================
     DATA
  ============================================================ */

  const propertyTypes = [
    'All Types',
    'Villa',
    'Penthouse',
    'Mansion',
    'Waterfront',
    'Modernist Estate',
    'Chalet',
  ];

  const locations = [
    'All Locations',
    'Malabar Hill',
    'Udaipur',
    'South Mumbai',
    'Goa',
    'Gulmarg',
    'Alibaug',
    'Chennai',
    'New Delhi',
  ];

  /* ============================================================
     SCROLL REVEAL + SET TIMEOUT
     
     Section enter:
     hidden → wait → visible

     Section leave:
     reset

     Enter again:
     animation plays again
  ============================================================ */

  useEffect(() => {
    const element = filterRef.current;

    if (!element) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timer) {
            clearTimeout(timer);
          }

          setIsVisible(false);

          timer = setTimeout(() => {
            setIsVisible(true);
          }, 180);
        } else {
          if (timer) {
            clearTimeout(timer);
          }

          setIsVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
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
     HANDLERS
  ============================================================ */

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    });
  };

  const handleTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      propertyType:
        e.target.value === 'All Types'
          ? ''
          : e.target.value,
    });
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      location:
        e.target.value === 'All Locations'
          ? ''
          : e.target.value,
    });
  };

  const handleBedroomsChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      bedrooms: e.target.value,
    });
  };

  const handleSortChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onFilterChange({
      ...filters,
      sortBy:
        e.target.value as FilterState['sortBy'],
    });
  };

  return (
    <div
      ref={filterRef}
      className={`
        relative
        mb-8
        overflow-hidden
        rounded-[4px]
        border
        border-[#EAE6DF]
        bg-white
        p-4
        shadow-[0_12px_40px_rgba(13,15,18,0.045)]
        transition-all
        duration-1000
        ease-[cubic-bezier(0.22,1,0.36,1)]
        sm:p-6

        ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-10 opacity-0'
        }
      `}
    >
      {/* ==========================================================
          PREMIUM GOLD BORDER EFFECT
      ========================================================== */}

      <div
        className={`
          pointer-events-none
          absolute
          left-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#C5A880]
          to-transparent
          transition-all
          duration-1000
          ${
            isVisible
              ? 'w-full opacity-70'
              : 'w-0 opacity-0'
          }
        `}
      />

      {/* ==========================================================
          TOP ROW
      ========================================================== */}

      <div
        className={`
          flex
          flex-col
          gap-4
          border-b
          border-[#EAE6DF]
          pb-5
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:flex-row
          md:items-center
          md:justify-between

          ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-5 opacity-0'
          }
        `}
      >
        {/* ========================================================
            SEARCH
        ======================================================== */}

        <div className="relative min-w-0 flex-1">
          <Search
            className="
              pointer-events-none
              absolute
              left-3.5
              top-1/2
              z-10
              h-4
              w-4
              -translate-y-1/2
              text-[#9CA3A8]
              transition-colors
              duration-300
            "
          />

          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by estate name, architectural style, or city..."
            className="
              peer
              w-full
              rounded-[3px]
              border
              border-[#EAE6DF]
              bg-[#FAF8F5]
              py-3
              pl-10
              pr-4

              text-sm
              text-[#0D0F12]

              placeholder:text-[#8C9098]

              outline-none

              transition-all
              duration-300

              focus:border-[#C5A880]
              focus:bg-white
              focus:shadow-[0_0_0_3px_rgba(197,168,128,0.08)]

              hover:border-[#D6C4A7]
            "
          />

          {/* Search active line */}

          <span
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-[1px]
              w-0
              bg-[#C5A880]
              transition-all
              duration-500
              peer-focus:w-full
            "
          />
        </div>

        {/* ========================================================
            RESULTS + SORT
        ======================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            md:justify-end
          "
        >
          {/* Results */}

          <div
            className="
              whitespace-nowrap
              text-[11px]
              text-[#7A7E85]
            "
          >
            Showing{' '}
            <span className="font-semibold text-[#0D0F12]">
              {totalResults}
            </span>{' '}
            estates
          </div>

          {/* Sort */}

          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="
                h-3.5
                w-3.5
                shrink-0
                text-[#C5A880]
              "
            />

            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="
                  appearance-none
                  cursor-pointer
                  rounded-[3px]
                  border
                  border-[#EAE6DF]
                  bg-[#FAF8F5]

                  py-2.5
                  pl-3
                  pr-9

                  text-[11px]
                  font-medium
                  text-[#0D0F12]

                  outline-none

                  transition-all
                  duration-300

                  hover:border-[#D6C4A7]
                  focus:border-[#C5A880]
                  focus:bg-white
                  focus:shadow-[0_0_0_3px_rgba(197,168,128,0.08)]
                "
              >
                <option value="featured">
                  Featured Curations
                </option>

                <option value="price-desc">
                  Price: Highest to Lowest
                </option>

                <option value="price-asc">
                  Price: Lowest to Highest
                </option>

                <option value="area-desc">
                  Largest Living Area
                </option>
              </select>

              <ChevronDown
                className="
                  pointer-events-none
                  absolute
                  right-2.5
                  top-1/2
                  h-3.5
                  w-3.5
                  -translate-y-1/2
                  text-[#8C6D45]
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          FILTER CONTROLS
      ========================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          pt-5
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        {/* ========================================================
            PROPERTY TYPE
        ======================================================== */}

        <div
          className={`
            filter-control
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-7 opacity-0'
            }
          `}
          style={{
            transitionDelay: isVisible
              ? '120ms'
              : '0ms',
          }}
        >
          <label
            className="
              mb-1.5
              block
              text-[10px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#6B7280]
            "
          >
            Architecture Type
          </label>

          <div className="relative">
            <select
              value={
                filters.propertyType ||
                'All Types'
              }
              onChange={handleTypeChange}
              className="
                w-full
                appearance-none
                cursor-pointer
                rounded-[3px]
                border
                border-[#EAE6DF]
                bg-[#FAF8F5]

                py-3
                pl-3
                pr-9

                text-xs
                text-[#0D0F12]

                outline-none

                transition-all
                duration-300

                hover:border-[#D6C4A7]
                focus:border-[#C5A880]
                focus:bg-white
                focus:shadow-[0_0_0_3px_rgba(197,168,128,0.08)]
              "
            >
              {propertyTypes.map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-3.5
                w-3.5
                -translate-y-1/2
                text-[#8C6D45]
              "
            />
          </div>
        </div>

        {/* ========================================================
            LOCATION
        ======================================================== */}

        <div
          className={`
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-7 opacity-0'
            }
          `}
          style={{
            transitionDelay: isVisible
              ? '220ms'
              : '0ms',
          }}
        >
          <label
            className="
              mb-1.5
              block
              text-[10px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#6B7280]
            "
          >
            Destination / Region
          </label>

          <div className="relative">
            <select
              value={
                filters.location ||
                'All Locations'
              }
              onChange={handleLocationChange}
              className="
                w-full
                appearance-none
                cursor-pointer
                rounded-[3px]
                border
                border-[#EAE6DF]
                bg-[#FAF8F5]

                py-3
                pl-3
                pr-9

                text-xs
                text-[#0D0F12]

                outline-none

                transition-all
                duration-300

                hover:border-[#D6C4A7]
                focus:border-[#C5A880]
                focus:bg-white
                focus:shadow-[0_0_0_3px_rgba(197,168,128,0.08)]
              "
            >
              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-3.5
                w-3.5
                -translate-y-1/2
                text-[#8C6D45]
              "
            />
          </div>
        </div>

        {/* ========================================================
            BEDROOMS
        ======================================================== */}

        <div
          className={`
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-7 opacity-0'
            }
          `}
          style={{
            transitionDelay: isVisible
              ? '320ms'
              : '0ms',
          }}
        >
          <label
            className="
              mb-1.5
              block
              text-[10px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-[#6B7280]
            "
          >
            Bedrooms Minimum
          </label>

          <div className="relative">
            <select
              value={filters.bedrooms}
              onChange={handleBedroomsChange}
              className="
                w-full
                appearance-none
                cursor-pointer
                rounded-[3px]
                border
                border-[#EAE6DF]
                bg-[#FAF8F5]

                py-3
                pl-3
                pr-9

                text-xs
                text-[#0D0F12]

                outline-none

                transition-all
                duration-300

                hover:border-[#D6C4A7]
                focus:border-[#C5A880]
                focus:bg-white
                focus:shadow-[0_0_0_3px_rgba(197,168,128,0.08)]
              "
            >
              <option value="">
                Any Bedrooms
              </option>

              <option value="4">
                4+ Suites
              </option>

              <option value="5">
                5+ Suites
              </option>

              <option value="6">
                6+ Suites
              </option>

              <option value="7">
                7+ Suites
              </option>
            </select>

            <ChevronDown
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-3.5
                w-3.5
                -translate-y-1/2
                text-[#8C6D45]
              "
            />
          </div>
        </div>

        {/* ========================================================
            RESET
        ======================================================== */}

        <div
          className={`
            flex
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-7 opacity-0'
            }
          `}
          style={{
            transitionDelay: isVisible
              ? '420ms'
              : '0ms',
          }}
        >
          <button
            type="button"
            onClick={onReset}
            className="
              group
              inline-flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-[3px]
              border
              border-[#EAE6DF]

              bg-[#FAF8F5]

              px-4
              py-3

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#0D0F12]

              transition-all
              duration-300

              hover:border-[#C5A880]
              hover:bg-[#C5A880]
              hover:text-[#0D0F12]

              hover:shadow-[0_8px_25px_rgba(197,168,128,0.16)]

              active:scale-[0.98]
            "
          >
            <RotateCcw
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-500
                group-hover:-rotate-180
              "
            />

            <span>
              Clear All
            </span>
          </button>
        </div>
      </div>

      {/* ==========================================================
          BOTTOM MICRO LABEL
      ========================================================== */}

      <div
        className={`
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-[#EAE6DF]/70
          pt-4

          transition-all
          duration-700
          delay-500

          ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }
        `}
      >
        <div className="flex items-center gap-2">
          <span className="h-px w-5 bg-[#C5A880]" />

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-[#9A8060]
            "
          >
            Curated Search
          </span>
        </div>

        <span
          className="
            hidden
            text-[8px]
            uppercase
            tracking-[0.2em]
            text-[#A0A3A8]
            sm:block
          "
        >
          Refine Your Selection
        </span>
      </div>
    </div>
  );
};