import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/property/PropertyCard';
import { PropertyFilter } from '../components/property/PropertyFilter';
import { FilterState } from '../types/property';
import { X, SearchX } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialLocation = searchParams.get('location') || '';
  const initialType = searchParams.get('type') || '';
  const initialSearch = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    location: initialLocation,
    propertyType: initialType,
    minPrice: 0,
    maxPrice: 100000000,
    bedrooms: '',
    sortBy: 'featured',
  });

  /* -----------------------------------------
     Page title animation
  ----------------------------------------- */
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  /* -----------------------------------------
     Sync state if URL query params change
  ----------------------------------------- */
  useEffect(() => {
    const loc = searchParams.get('location') || '';
    const typ = searchParams.get('type') || '';
    const q = searchParams.get('q') || '';

    if (loc || typ || q) {
      setFilters((prev) => ({
        ...prev,
        location: loc || prev.location,
        propertyType: typ || prev.propertyType,
        search: q || prev.search,
      }));
    }
  }, [searchParams]);

  /* -----------------------------------------
     Filter change
  ----------------------------------------- */
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);

    const params = new URLSearchParams();

    if (newFilters.search) {
      params.set('q', newFilters.search);
    }

    if (newFilters.location) {
      params.set('location', newFilters.location);
    }

    if (newFilters.propertyType) {
      params.set('type', newFilters.propertyType);
    }

    setSearchParams(params);
  };

  /* -----------------------------------------
     Reset filters
  ----------------------------------------- */
  const handleReset = () => {
    const resetState: FilterState = {
      search: '',
      location: '',
      propertyType: '',
      minPrice: 0,
      maxPrice: 100000000,
      bedrooms: '',
      sortBy: 'featured',
    };

    setFilters(resetState);
    setSearchParams({});
  };

  /* -----------------------------------------
     Filter & Sort Logic
  ----------------------------------------- */
  const filteredProperties = useMemo(() => {
    return propertiesData
      .filter((item) => {
        /* Search */
        if (filters.search.trim()) {
          const query = filters.search.toLowerCase();

          const matchTitle = item.title.toLowerCase().includes(query);

          const matchCity = item.location.city
            .toLowerCase()
            .includes(query);

          const matchCountry = item.location.country
            .toLowerCase()
            .includes(query);

          const matchDesc = item.description
            .toLowerCase()
            .includes(query);

          const matchType = item.propertyType
            .toLowerCase()
            .includes(query);

          if (
            !matchTitle &&
            !matchCity &&
            !matchCountry &&
            !matchDesc &&
            !matchType
          ) {
            return false;
          }
        }

        /* Property Type */
        if (
          filters.propertyType &&
          filters.propertyType !== 'All Types'
        ) {
          if (item.propertyType !== filters.propertyType) {
            return false;
          }
        }

        /* Location */
        if (
          filters.location &&
          filters.location !== 'All Locations'
        ) {
          const locQuery = filters.location.toLowerCase();

          const inCity = item.location.city
            .toLowerCase()
            .includes(locQuery);

          const inCountry = item.location.country
            .toLowerCase()
            .includes(locQuery);

          const inAddress = item.location.address
            .toLowerCase()
            .includes(locQuery);

          if (!inCity && !inCountry && !inAddress) {
            return false;
          }
        }

        /* Bedrooms */
        if (filters.bedrooms) {
          const minBeds = parseInt(filters.bedrooms, 10);

          if (item.bedrooms < minBeds) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-desc') {
          return b.price - a.price;
        }

        if (filters.sortBy === 'price-asc') {
          return a.price - b.price;
        }

        if (filters.sortBy === 'area-desc') {
          return b.areaSqFt - a.areaSqFt;
        }

        return (
          (b.featured ? 1 : 0) -
          (a.featured ? 1 : 0)
        );
      });
  }, [filters]);

  /* -----------------------------------------
     Active filter count
  ----------------------------------------- */
  const activeTagCount =
    (filters.search ? 1 : 0) +
    (filters.location ? 1 : 0) +
    (filters.propertyType ? 1 : 0) +
    (filters.bedrooms ? 1 : 0);

  return (
    <div className="w-full bg-[#FAF8F5] pt-28 sm:pt-36 pb-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================
            PAGE HERO / TITLE
        ========================================== */}

        <div className="mb-10 text-center max-w-3xl mx-auto">

          {/* Eyebrow */}

          <div
            className={`
              flex
              items-center
              justify-center
              gap-2
              mb-3
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                showTitle
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }
            `}
          >

            <span
              className={`
                h-px
                bg-[#C5A880]
                transition-all
                duration-700
                delay-100
                ${
                  showTitle
                    ? 'w-6 opacity-100'
                    : 'w-0 opacity-0'
                }
              `}
            />

            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A880]">
              Curated Ledger
            </span>

            <span
              className={`
                h-px
                bg-[#C5A880]
                transition-all
                duration-700
                delay-100
                ${
                  showTitle
                    ? 'w-6 opacity-100'
                    : 'w-0 opacity-0'
                }
              `}
            />

          </div>

          {/* =========================================
              INFINITE TITLE
          ========================================== */}

          <div className="relative overflow-hidden">

            <h1
              className="
                text-3xl
                sm:text-5xl
                font-serif-luxury
                font-normal
                text-[#0D0F12]
                leading-tight
                will-change-transform
                animate-[propertiesTitleReveal_4.5s_ease-in-out_infinite]
              "
            >
              Signature Properties
            </h1>

          </div>

          {/* Description */}

          <p
            className={`
              mt-3
              text-sm
              sm:text-base
              text-[#5A5E66]
              font-light
              leading-relaxed
              transition-all
              duration-1000
              delay-200
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                showTitle
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-5'
              }
            `}
          >
            Explore our curated global portfolio of landmark residences,
            private waterfront villas, and modernist estates.
          </p>

        </div>

        {/* =========================================
            FILTER TOOLBAR
        ========================================== */}

        <div
          className={`
            transition-all
            duration-1000
            delay-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              showTitle
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }
          `}
        >

          <PropertyFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            totalResults={filteredProperties.length}
          />

        </div>

        {/* =========================================
            ACTIVE FILTERS
        ========================================== */}

        {activeTagCount > 0 && (
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              mb-8
              bg-white
              border
              border-[#EAE6DF]
              p-3
              rounded-sm
              shadow-[0_4px_18px_rgba(13,15,18,0.04)]
              animate-[fadeIn_0.4s_ease-out]
            "
          >

            <span className="text-xs font-semibold text-[#0D0F12] uppercase tracking-wider mr-2">
              Active Filters:
            </span>

            {/* Search Tag */}

            {filters.search && (
              <span
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  bg-[#FAF8F5]
                  border
                  border-[#EAE6DF]
                  px-2.5
                  py-1
                  rounded-sm
                  text-[#0D0F12]
                  transition-all
                  duration-300
                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]/10
                "
              >

                Keyword: &ldquo;{filters.search}&rdquo;

                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filters,
                      search: '',
                    })
                  }
                  className="
                    text-[#9CA3AF]
                    hover:text-red-500
                    transition-colors
                  "
                >
                  <X className="w-3 h-3" />
                </button>

              </span>
            )}

            {/* Location Tag */}

            {filters.location && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  bg-[#FAF8F5]
                  border
                  border-[#EAE6DF]
                  px-2.5
                  py-1
                  rounded-sm
                  text-[#0D0F12]
                  transition-all
                  duration-300
                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]/10
                "
              >

                Location: {filters.location}

                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filters,
                      location: '',
                    })
                  }
                  className="
                    text-[#9CA3AF]
                    hover:text-red-500
                    transition-colors
                  "
                >
                  <X className="w-3 h-3" />
                </button>

              </span>
            )}

            {/* Property Type */}

            {filters.propertyType && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  bg-[#FAF8F5]
                  border
                  border-[#EAE6DF]
                  px-2.5
                  py-1
                  rounded-sm
                  text-[#0D0F12]
                  transition-all
                  duration-300
                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]/10
                "
              >

                Type: {filters.propertyType}

                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filters,
                      propertyType: '',
                    })
                  }
                  className="
                    text-[#9CA3AF]
                    hover:text-red-500
                    transition-colors
                  "
                >
                  <X className="w-3 h-3" />
                </button>

              </span>
            )}

            {/* Bedrooms */}

            {filters.bedrooms && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  bg-[#FAF8F5]
                  border
                  border-[#EAE6DF]
                  px-2.5
                  py-1
                  rounded-sm
                  text-[#0D0F12]
                  transition-all
                  duration-300
                  hover:border-[#C5A880]
                  hover:bg-[#C5A880]/10
                "
              >

                {filters.bedrooms}+ Suites

                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filters,
                      bedrooms: '',
                    })
                  }
                  className="
                    text-[#9CA3AF]
                    hover:text-red-500
                    transition-colors
                  "
                >
                  <X className="w-3 h-3" />
                </button>

              </span>
            )}

            {/* Clear All */}

            <button
              type="button"
              onClick={handleReset}
              className="
                group/clear
                relative
                ml-auto
                overflow-hidden
                text-xs
                text-[#8C6D45]
                font-medium
                px-3
                py-1.5
                rounded-sm
                border
                border-transparent
                transition-all
                duration-300
                hover:border-[#C5A880]/40
                hover:bg-[#C5A880]/10
              "
            >

              <span className="relative z-10">
                Clear All
              </span>

              <span
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-[#C5A880]
                  transition-all
                  duration-300
                  group-hover/clear:w-[70%]
                "
              />

            </button>

          </div>
        )}

        {/* =========================================
            RESULTS
        ========================================== */}

        {filteredProperties.length > 0 ? (

          <div
            className={`
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-8
              transition-all
              duration-1000
              delay-500
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                showTitle
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }
            `}
          >

            {filteredProperties.map((property, index) => (

              <div
                key={property.id}
                className="
                  transition-all
                  duration-700
                  ease-out
                "
                style={{
                  transitionDelay: `${Math.min(index * 100, 500)}ms`,
                }}
              >

                <PropertyCard property={property} />

              </div>

            ))}

          </div>

        ) : (

          /* =========================================
             EMPTY STATE
          ========================================== */

          <div
            className="
              bg-white
              border
              border-[#EAE6DF]
              rounded-sm
              p-12
              text-center
              max-w-md
              mx-auto
              my-12
              shadow-[0_10px_35px_rgba(13,15,18,0.05)]
            "
          >

            <div
              className="
                w-14
                h-14
                bg-[#FAF8F5]
                border
                border-[#EAE6DF]
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-4
                text-[#A0A3A8]
              "
            >
              <SearchX className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-serif-luxury text-[#0D0F12] mb-2">
              No Matching Estates Found
            </h3>

            <p className="text-xs text-[#6B7280] font-light mb-6 leading-relaxed">
              We could not find active public listings matching all
              of your filter parameters. Many of our highest-value
              residences are maintained in our private off-market
              registry.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="
                group
                relative
                overflow-hidden
                px-6
                py-2.5
                bg-[#C5A880]
                hover:bg-[#D4AF37]
                text-black
                text-xs
                uppercase
                tracking-widest
                font-semibold
                rounded-sm
                transition-all
                duration-300
                hover:shadow-[0_8px_25px_rgba(197,168,128,0.25)]
                hover:-translate-y-0.5
              "
            >

              <span className="relative z-10">
                Reset Filters
              </span>

              <span
                className="
                  absolute
                  inset-y-0
                  -left-full
                  w-1/2
                  bg-white/30
                  skew-x-[-20deg]
                  transition-all
                  duration-700
                  group-hover:left-[130%]
                "
              />

            </button>

          </div>

        )}

      </div>

      {/* =========================================
          CUSTOM ANIMATIONS
      ========================================== */}

      <style>{`

        /* -----------------------------------------
           Signature Properties
           Left → Center → Right → Repeat
        ----------------------------------------- */

        @keyframes propertiesTitleReveal {

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

        /* -----------------------------------------
           Active Filter Fade
        ----------------------------------------- */

        @keyframes fadeIn {

          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        /* -----------------------------------------
           Reduced Motion
        ----------------------------------------- */

        @media (prefers-reduced-motion: reduce) {

          .animate-\\[propertiesTitleReveal_4\\.5s_ease-in-out_infinite\\] {
            animation: none !important;
          }

        }

      `}</style>

    </div>
  );
};