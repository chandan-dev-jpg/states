import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScheduleVisitForm } from '../components/forms/ScheduleVisitForm';
import { ContactForm } from '../components/forms/ContactForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const defaultTab =
    searchParams.get('tab') === 'general' ? 'general' : 'visit';

  const propertyParam =
    searchParams.get('propertyId') || undefined;

  const [activeTab, setActiveTab] = useState<'visit' | 'general'>(
    defaultTab
  );

  const [pageReady, setPageReady] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setPageReady(true);
    }, 120);

    const secondTimer = setTimeout(() => {
      setContentReady(true);
    }, 350);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(secondTimer);
    };
  }, []);

  const offices = [
    {
      city: 'Beverly Hills',
      address: '9460 Wilshire Blvd, Suite 800, Beverly Hills, CA 90212',
      phone: '+1 (310) 849-2100',
      email: 'beverlyhills@lumoraestates.com',
      hours: 'Mon – Sat: 09:00 – 19:00 PST',
    },
    {
      city: 'London Mayfair',
      address: '14 Berkeley Square, Mayfair, London W1J 6AE, UK',
      phone: '+44 20 7946 0912',
      email: 'mayfair@lumoraestates.com',
      hours: 'Mon – Sat: 09:00 – 18:30 GMT',
    },
    {
      city: 'Dubai DIFC',
      address: 'Gate Precinct 4, Level 5, DIFC, Dubai, UAE',
      phone: '+971 4 312 8900',
      email: 'dubai@lumoraestates.com',
      hours: 'Sun – Thu: 09:00 – 19:00 GST',
    },
  ];

  const faqs = [
    {
      q: 'How does Lumora handle confidential off-market showings?',
      a: 'All viewings require verified identification and execution of a brief mutual Non-Disclosure Agreement (NDA). Clients may request private aviation or unmarked vehicle transfers.',
    },
    {
      q: 'Can our family office retain Lumora for multi-territory acquisitions?',
      a: 'Yes. Our Private Client Syndicate regularly assists single and multi-family offices with synchronized acquisitions across North America, Europe, and the Middle East.',
    },
    {
      q: 'Are bespoke structural and architectural reports provided?',
      a: 'Every property dossier includes detailed engineering assessments, historical provenance records, and full CAD floor plans prepared by chartered surveying partners.',
    },
  ];

  return (
    <div className="w-full bg-[#FAF8F5] pt-28 sm:pt-36 pb-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= PAGE HEADER ================= */}

        <div
          className={`
            text-center
            max-w-3xl
            mx-auto
            mb-14
            transition-all
            duration-1000
            ease-out
            ${
              pageReady
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
            }
          `}
        >

          <div className="flex items-center justify-center gap-2 mb-3">

            <span
              className={`
                h-px
                bg-[#C5A880]
                transition-all
                duration-1000
                ${
                  pageReady
                    ? 'w-12 opacity-100'
                    : 'w-0 opacity-0'
                }
              `}
            />

            <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A880]">
              Private Client Desk
            </span>

            <span
              className={`
                h-px
                bg-[#C5A880]
                transition-all
                duration-1000
                ${
                  pageReady
                    ? 'w-12 opacity-100'
                    : 'w-0 opacity-0'
                }
              `}
            />

          </div>

          {/* =====================================================
              INFINITE HEADER ANIMATION
          ===================================================== */}

          <div className="relative overflow-hidden">

            <h1
              className="
                text-3xl
                sm:text-5xl
                font-serif-luxury
                font-normal
                text-[#0D0F12]
                leading-[1.12]
                will-change-transform

                animate-[contactTitleReveal_4.5s_ease-in-out_infinite]
              "
            >
              Schedule an Inspection or Advisory
            </h1>

          </div>

          <p className="mt-3 text-sm sm:text-base text-[#5A5E66] font-light leading-relaxed">
            Connect directly with a Senior Managing Partner. We respond with absolute discretion to all inquiries within two business hours.
          </p>

          {/* ================= TAB SELECTOR ================= */}

          <div
            className={`
              mt-8
              inline-flex
              p-1
              bg-white
              border
              border-[#E7E0D6]
              rounded-[4px]
              shadow-[0_8px_30px_rgba(13,15,18,0.06)]
              transition-all
              duration-1000
              delay-200
              ${
                pageReady
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }
            `}
          >

            {/* Visit */}

            <button
              type="button"
              onClick={() => setActiveTab('visit')}
              className={`
                group
                relative
                overflow-hidden
                min-w-[190px]
                px-6
                py-3
                rounded-[3px]
                text-[10px]
                uppercase
                tracking-[0.13em]
                font-semibold
                transition-all
                duration-500
                ${
                  activeTab === 'visit'
                    ? 'bg-[#0D0F12] text-white shadow-[0_6px_18px_rgba(13,15,18,0.20)]'
                    : 'text-[#5A5E66] hover:text-[#0D0F12] hover:bg-[#FAF8F5]'
                }
              `}
            >

              <span className="absolute inset-0 bg-gradient-to-r from-[#B99A6C] via-[#D9C396] to-[#B99A6C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

              {activeTab === 'visit' && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-[#DCC28F] shadow-[0_0_12px_#DCC28F]" />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">

                <span className="transition-all duration-500 group-hover:tracking-[0.18em] group-hover:text-[#0D0F12]">
                  Schedule Estate Visit
                </span>

                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#0D0F12]" />

              </span>

            </button>

            {/* General */}

            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`
                group
                relative
                overflow-hidden
                min-w-[220px]
                px-6
                py-3
                rounded-[3px]
                text-[10px]
                uppercase
                tracking-[0.13em]
                font-semibold
                transition-all
                duration-500
                ${
                  activeTab === 'general'
                    ? 'bg-[#0D0F12] text-white shadow-[0_6px_18px_rgba(13,15,18,0.20)]'
                    : 'text-[#5A5E66] hover:text-[#0D0F12] hover:bg-[#FAF8F5]'
                }
              `}
            >

              <span className="absolute inset-0 bg-gradient-to-r from-[#B99A6C] via-[#D9C396] to-[#B99A6C] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100" />

              {activeTab === 'general' && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-px bg-[#DCC28F] shadow-[0_0_12px_#DCC28F]" />
              )}

              <span className="relative z-10 flex items-center justify-center gap-2">

                <span className="transition-all duration-500 group-hover:tracking-[0.18em] group-hover:text-[#0D0F12]">
                  General Advisory Inquiry
                </span>

                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-[#0D0F12]" />

              </span>

            </button>

          </div>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* FORM */}

          <div
            className={`
              lg:col-span-7
              transition-all
              duration-1000
              delay-300
              ${
                contentReady
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }
            `}
          >

            <div
              key={activeTab}
              className="animate-contact-content"
            >
              {activeTab === 'visit' ? (
                <ScheduleVisitForm initialPropertyId={propertyParam} />
              ) : (
                <ContactForm />
              )}
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-5 space-y-8">

            {/* ================= GLOBAL SALONS ================= */}

            <div
              className={`
                relative
                group
                bg-white
                border
                border-[#EAE6DF]
                p-6
                sm:p-8
                rounded-sm
                shadow-[0_10px_35px_rgba(13,15,18,0.045)]
                overflow-hidden
                transition-all
                duration-1000
                delay-500
                hover:-translate-y-1
                hover:border-[#C5A880]/45
                hover:shadow-[0_20px_50px_rgba(197,168,128,0.12)]
                ${
                  contentReady
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                }
              `}
            >

              {/* Animated border */}

              <div className="absolute -inset-[1px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">

                <div className="absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#A88A60_325deg,#E7D3A8_345deg,transparent_360deg)] animate-[spin_4s_linear_infinite]" />

              </div>

              <div className="absolute inset-[1px] bg-white rounded-sm pointer-events-none" />

              <div className="relative z-10">

                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C6D45] font-semibold mb-6">

                  <ShieldCheck className="w-4 h-4 text-[#C5A880] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" />

                  <span>
                    Global Flagship Salons
                  </span>

                </div>

                <div className="space-y-6">

                  {offices.map((office, idx) => (
                    <div
                      key={idx}
                      className="pb-5 border-b border-[#EAE6DF] last:border-b-0 last:pb-0 space-y-2 text-xs transition-all duration-500 hover:pl-2"
                    >

                      <h4 className="font-serif-luxury text-base font-medium text-[#0D0F12] transition-all duration-500 hover:text-[#8C6D45] hover:translate-x-1">
                        {office.city}
                      </h4>

                      <p className="text-[#5A5E66] flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{office.address}</span>
                      </p>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#4B5563] pt-1">

                        <a
                          href={`tel:${office.phone}`}
                          className="flex items-center gap-1.5 hover:text-[#8C6D45] transition-all duration-300 hover:translate-x-0.5"
                        >
                          <Phone className="w-3 h-3 text-[#C5A880]" />
                          <span>{office.phone}</span>
                        </a>

                        <a
                          href={`mailto:${office.email}`}
                          className="flex items-center gap-1.5 hover:text-[#8C6D45] transition-all duration-300 hover:translate-x-0.5"
                        >
                          <Mail className="w-3 h-3 text-[#C5A880]" />
                          <span>{office.email}</span>
                        </a>

                      </div>

                      <p className="text-[11px] text-[#9CA3AF] flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#9CA3AF]" />
                        <span>{office.hours}</span>
                      </p>

                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* ================= FAQ ================= */}

            <div
              className={`
                relative
                group
                bg-white
                border
                border-[#EAE6DF]
                p-6
                sm:p-8
                rounded-sm
                shadow-[0_10px_35px_rgba(13,15,18,0.045)]
                space-y-4
                overflow-hidden
                transition-all
                duration-1000
                delay-700
                hover:-translate-y-1
                hover:border-[#C5A880]/45
                hover:shadow-[0_20px_50px_rgba(197,168,128,0.10)]
                ${
                  contentReady
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-10'
                }
              `}
            >

              <div className="absolute -inset-[1px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">

                <div className="absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#A88A60_325deg,#E7D3A8_345deg,transparent_360deg)] animate-[spin_4.5s_linear_infinite]" />

              </div>

              <div className="absolute inset-[1px] bg-white rounded-sm pointer-events-none" />

              <div className="relative z-10 space-y-4">

                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8C6D45] font-semibold mb-2">

                  <HelpCircle className="w-4 h-4 text-[#C5A880] transition-all duration-500 group-hover:scale-110" />

                  <span>
                    Private Inspection Protocol
                  </span>

                </div>

                <div className="space-y-4">

                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="relative space-y-1 p-3 -mx-3 rounded-sm transition-all duration-500 hover:bg-[#FAF8F5] hover:translate-x-1"
                    >

                      <h5 className="text-xs font-semibold text-[#0D0F12] hover:text-[#8C6D45] transition-colors duration-300">
                        {faq.q}
                      </h5>

                      <p className="text-xs text-[#5A5E66] font-light leading-relaxed">
                        {faq.a}
                      </p>

                    </div>
                  ))}

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}

      <style>{`

        /* Main contact heading:
           left → center → right → repeat */

        @keyframes contactTitleReveal {

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

        /* Form/tab content */

        @keyframes contactContent {

          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .animate-contact-content {
          animation:
            contactContent
            650ms
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Accessibility */

        @media (prefers-reduced-motion: reduce) {

          .animate-contact-content {
            animation: none;
          }

          .animate-\\[contactTitleReveal_4\\.5s_ease-in-out_infinite\\] {
            animation: none !important;
          }

        }

      `}</style>

    </div>
  );
};