
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Loader2,
  ArrowRight,
  LockKeyhole,
} from 'lucide-react';
import { VisitInquiryFormData } from '../../types/property';
import { propertiesData } from '../../data/properties';

interface ScheduleVisitFormProps {
  initialPropertyId?: string;
  onSuccess?: () => void;
  className?: string;
}

export const ScheduleVisitForm: React.FC<ScheduleVisitFormProps> = ({
  initialPropertyId,
  className = '',
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] =
    useState<VisitInquiryFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VisitInquiryFormData>({
    defaultValues: {
      propertyId: initialPropertyId || '',
      preferredTime: 'Afternoon (14:00 - 17:00)',
      investmentTier: '$20M - $50M',
      agreeToTerms: true,
    },
  });

  const onSubmit = async (data: VisitInquiryFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  const selectedProperty = propertiesData.find(
    (p) => p.id === (submittedData?.propertyId || initialPropertyId)
  );

  const inputBase =
    'w-full h-12 bg-[#FCFBF8] border rounded-sm pl-11 pr-4 text-[13px] text-[#0D0F12] placeholder:text-[#A5A29C] outline-none transition-all duration-500 ease-out';

  const getInputClass = (hasError: boolean) =>
    `${inputBase} ${
      hasError
        ? 'border-red-300 bg-red-50/20 focus:border-red-400'
        : 'border-[#E5E0D7] hover:border-[#C5A880]/60 hover:bg-white focus:border-[#C5A880] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,168,128,0.10)]'
    } hover:-translate-y-[1px]`;

  /* ================= SUCCESS STATE ================= */

  if (isSubmitted && submittedData) {
    return (
      <div
        className={`
          relative group
          bg-white
          border border-[#E5E0D7]
          rounded-sm
          overflow-hidden
          shadow-[0_20px_60px_rgba(13,15,18,0.08)]
          transition-all duration-500
          hover:shadow-[0_25px_70px_rgba(197,168,128,0.12)]
          ${className}
        `}
      >
        {/* Animated Border */}
        <div
          className="
            absolute
            -inset-[1px]
            rounded-sm
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            pointer-events-none
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-1/2
              w-[200%]
              h-[200%]
              -translate-x-1/2
              -translate-y-1/2
              bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#C5A880_330deg,#E7D3A8_350deg,transparent_360deg)]
              animate-[spin_4s_linear_infinite]
            "
          />
        </div>

        {/* Inner Cover */}
        <div className="absolute inset-[1px] bg-white rounded-sm pointer-events-none" />

        <div className="relative z-10 p-7 sm:p-10 text-center">

          <div
            className="
              w-20 h-20 mx-auto mb-6
              rounded-full
              bg-[#C5A880]/10
              border border-[#C5A880]/40
              flex items-center justify-center
              transition-all duration-700
              hover:scale-110
              hover:rotate-6
              hover:bg-[#C5A880]/20
              hover:shadow-[0_10px_30px_rgba(197,168,128,0.20)]
            "
          >
            <CheckCircle2 className="w-9 h-9 text-[#8C6D45]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6D45] font-semibold">
            Private Inspection Requested
          </span>

          <h3 className="mt-3 text-2xl sm:text-3xl font-serif-luxury text-[#0D0F12]">
            Appointment Scheduled
          </h3>

          <p className="mt-4 text-sm text-[#686C73] font-light max-w-lg mx-auto leading-7">
            Thank you,{' '}
            <strong className="font-medium text-[#0D0F12]">
              {submittedData.fullName}
            </strong>
            . A dedicated Senior Private Client Partner has received your
            confidential itinerary request for{' '}
            <strong className="font-medium text-[#0D0F12]">
              {selectedProperty?.title || 'Selected Estate'}
            </strong>
            .
          </p>

          {/* Request Summary */}
          <div
            className="
              mt-8
              bg-[#FAF8F5]
              border border-[#EAE6DF]
              rounded-sm
              p-5 sm:p-6
              max-w-lg mx-auto
              text-left
              transition-all duration-500
              hover:border-[#C5A880]/50
              hover:shadow-[0_10px_30px_rgba(13,15,18,0.05)]
            "
          >
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-[#C5A880]" />

              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C6D45]">
                Request Summary
              </span>
            </div>

            <div className="space-y-3 text-xs">

              <div className="flex justify-between gap-4 pb-3 border-b border-[#E5E0D7]">
                <span className="text-[#858990]">
                  Date Requested
                </span>

                <span className="font-medium text-[#0D0F12] text-right">
                  {submittedData.preferredDate}
                </span>
              </div>

              <div className="flex justify-between gap-4 pb-3 border-b border-[#E5E0D7]">
                <span className="text-[#858990]">
                  Preferred Time
                </span>

                <span className="font-medium text-[#0D0F12] text-right">
                  {submittedData.preferredTime}
                </span>
              </div>

              <div className="flex justify-between gap-4 pb-3 border-b border-[#E5E0D7]">
                <span className="text-[#858990]">
                  Email
                </span>

                <span className="font-medium text-[#0D0F12] text-right break-all">
                  {submittedData.email}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-[#858990]">
                  Direct Phone
                </span>

                <span className="font-medium text-[#0D0F12] text-right">
                  {submittedData.phone}
                </span>
              </div>

            </div>
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="
              mt-8
              inline-flex
              items-center
              justify-center
              gap-2
              px-7
              h-11
              bg-[#0D0F12]
              hover:bg-[#C5A880]
              hover:text-[#0D0F12]
              text-white
              text-[10px]
              uppercase
              tracking-[0.2em]
              font-semibold
              rounded-sm
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-[0_10px_25px_rgba(197,168,128,0.20)]
              active:translate-y-0
            "
          >
            Schedule Another Inspection

            <ArrowRight
              className="
                w-3.5 h-3.5
                transition-transform duration-500
                group-hover:translate-x-1
              "
            />
          </button>

        </div>
      </div>
    );
  }

  /* ================= MAIN FORM ================= */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`
        relative
        group
        bg-white
        border border-[#E5E0D7]
        rounded-sm
        overflow-hidden
        shadow-[0_12px_45px_rgba(13,15,18,0.055)]
        transition-all duration-500
        hover:shadow-[0_20px_60px_rgba(197,168,128,0.12)]
        ${className}
      `}
    >

      {/* =====================================================
          ANIMATED GOLD BORDER
          Appears only when user hovers the form
      ====================================================== */}

      <div
        className="
          absolute
          -inset-[1px]
          rounded-sm
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
          overflow-hidden
          z-0
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[200%]
            h-[200%]
            -translate-x-1/2
            -translate-y-1/2
            bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#A88A60_325deg,#E7D3A8_345deg,transparent_360deg)]
            animate-[spin_3.5s_linear_infinite]
          "
        />
      </div>

      {/* Inner white surface keeps the animation only on border */}
      <div
        className="
          absolute
          inset-[1px]
          bg-white
          rounded-sm
          pointer-events-none
          z-[1]
        "
      />

      {/* =====================================================
          FORM CONTENT
      ====================================================== */}

      <div className="relative z-10 p-6 sm:p-9 lg:p-10">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 pb-7 border-b border-[#EAE6DF]">

          <div>

            <div className="flex items-center gap-2 mb-2">

              <ShieldCheck
                className="
                  w-4 h-4
                  text-[#C5A880]
                  transition-all duration-500
                  group-hover:scale-110
                "
              />

              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6D45] font-semibold">
                Confidential Itinerary
              </span>

            </div>

            <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#0D0F12]">
              Schedule a Private Viewing
            </h2>

            <p className="mt-2 text-xs text-[#74777D] font-light leading-relaxed max-w-lg">
              Share your preferred arrangements below. A dedicated Private
              Client Partner will personally coordinate your visit.
            </p>

          </div>

          {/* Confidential Badge */}

          <div
            className="
              hidden sm:flex
              items-center
              gap-2
              px-3 py-2
              bg-[#FAF8F5]
              border border-[#EAE6DF]
              rounded-sm
              transition-all duration-500
              group-hover:border-[#C5A880]/50
              group-hover:bg-[#C5A880]/5
            "
          >
            <LockKeyhole className="w-3.5 h-3.5 text-[#C5A880]" />

            <span className="text-[9px] uppercase tracking-wider text-[#777B81]">
              Discreet & Confidential
            </span>
          </div>

        </div>

        {/* ================= CLIENT INFORMATION ================= */}

        <div className="pt-7">

          <div className="flex items-center gap-3 mb-5">

            <span
              className="
                flex
                items-center
                justify-center
                w-7 h-7
                rounded-full
                bg-[#0D0F12]
                text-white
                text-[10px]
                font-semibold
                transition-all
                duration-500
                hover:bg-[#C5A880]
                hover:text-[#0D0F12]
                hover:scale-110
                hover:rotate-6
                hover:shadow-[0_5px_15px_rgba(197,168,128,0.25)]
              "
            >
              01
            </span>

            <div>
              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#0D0F12]">
                Client Information
              </h3>

              <p className="text-[10px] text-[#92959A] mt-0.5">
                Your details remain strictly confidential.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Full Name */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Full Name <span className="text-[#B45345]">*</span>
              </label>

              <div className="relative">

                <User
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <input
                  type="text"
                  placeholder="Eleanor Vance"
                  {...register('fullName', {
                    required:
                      'Please provide your full legal or representative name',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                  })}
                  className={getInputClass(!!errors.fullName)}
                />

              </div>

              {errors.fullName && (
                <p className="text-[10px] text-red-600 mt-1.5">
                  {errors.fullName.message}
                </p>
              )}

            </div>

            {/* Email */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Email Address <span className="text-[#B45345]">*</span>
              </label>

              <div className="relative">

                <Mail
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <input
                  type="email"
                  placeholder="principal@familyoffice.com"
                  {...register('email', {
                    required:
                      'Email address is required for itinerary confirmation',
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className={getInputClass(!!errors.email)}
                />

              </div>

              {errors.email && (
                <p className="text-[10px] text-red-600 mt-1.5">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Phone */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Direct Phone / WhatsApp{' '}
                <span className="text-[#B45345]">*</span>
              </label>

              <div className="relative">

                <Phone
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <input
                  type="tel"
                  placeholder="+91 81440 07714"
                  {...register('phone', {
                    required:
                      'Phone number is required for security verification',
                    minLength: {
                      value: 7,
                      message: 'Please provide a valid phone number',
                    },
                  })}
                  className={getInputClass(!!errors.phone)}
                />

              </div>

              {errors.phone && (
                <p className="text-[10px] text-red-600 mt-1.5">
                  {errors.phone.message}
                </p>
              )}

            </div>

            {/* Property */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Select Property <span className="text-[#B45345]">*</span>
              </label>

              <div className="relative">

                <Building
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <select
                  {...register('propertyId', {
                    required: 'Please select a property to tour',
                  })}
                  className={`${getInputClass(
                    !!errors.propertyId
                  )} appearance-none cursor-pointer`}
                >
                  <option value="">
                    Choose an Estate / Portfolio Property
                  </option>

                  {propertiesData.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.formattedPrice})
                    </option>
                  ))}
                </select>

                <ArrowRight
                  className="
                    w-3.5 h-3.5
                    text-[#A6A29B]
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    rotate-90
                    pointer-events-none
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

              </div>

              {errors.propertyId && (
                <p className="text-[10px] text-red-600 mt-1.5">
                  {errors.propertyId.message}
                </p>
              )}

            </div>

          </div>
        </div>

        {/* ================= VISIT DETAILS ================= */}

        <div className="pt-8 mt-8 border-t border-[#EAE6DF]">

          <div className="flex items-center gap-3 mb-5">

            <span
              className="
                flex
                items-center
                justify-center
                w-7 h-7
                rounded-full
                bg-[#0D0F12]
                text-white
                text-[10px]
                font-semibold
                transition-all
                duration-500
                hover:bg-[#C5A880]
                hover:text-[#0D0F12]
                hover:scale-110
                hover:rotate-6
                hover:shadow-[0_5px_15px_rgba(197,168,128,0.25)]
              "
            >
              02
            </span>

            <div>

              <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-[#0D0F12]">
                Visit Details
              </h3>

              <p className="text-[10px] text-[#92959A] mt-0.5">
                Tell us when and how you would like to visit.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Date */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Preferred Visit Date{' '}
                <span className="text-[#B45345]">*</span>
              </label>

              <div className="relative">

                <Calendar
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register('preferredDate', {
                    required: 'Please select your preferred date',
                  })}
                  className={`${getInputClass(
                    !!errors.preferredDate
                  )} cursor-pointer`}
                />

              </div>

              {errors.preferredDate && (
                <p className="text-[10px] text-red-600 mt-1.5">
                  {errors.preferredDate.message}
                </p>
              )}

            </div>

            {/* Time */}

            <div className="group/field">

              <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
                Preferred Time Window
              </label>

              <div className="relative">

                <Clock
                  className="
                    w-4 h-4
                    text-[#A6A29B]
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

                <select
                  {...register('preferredTime')}
                  className={`${getInputClass(
                    false
                  )} appearance-none cursor-pointer`}
                >
                  <option value="Morning (09:00 - 12:00)">
                    Morning (09:00 - 12:00)
                  </option>

                  <option value="Afternoon (13:00 - 16:00)">
                    Afternoon (13:00 - 16:00)
                  </option>

                  <option value="Sunset Champagne Viewing (17:00 - 19:30)">
                    Sunset Champagne Viewing (17:00 - 19:30)
                  </option>

                  <option value="Private Helicopter Transfer Requested">
                    Private Aviation Transfer Needed
                  </option>
                </select>

                <ArrowRight
                  className="
                    w-3.5 h-3.5
                    text-[#A6A29B]
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    rotate-90
                    pointer-events-none
                    transition-all
                    duration-500
                    group-hover/field:text-[#C5A880]
                  "
                />

              </div>

            </div>

          </div>

          {/* Special Requests */}

          <div className="mt-5 group/field">

            <label className="block text-[10px] uppercase tracking-[0.16em] font-semibold text-[#34363A] mb-2">
              Special Requests & Logistics Notes
            </label>

            <textarea
              rows={4}
              placeholder="Security requirements, architect accompaniment, airport pick-up, private family office preferences..."
              {...register('message')}
              className="
                w-full
                bg-[#FCFBF8]
                border border-[#E5E0D7]
                rounded-sm
                px-4 py-3.5
                text-[13px]
                text-[#0D0F12]
                placeholder:text-[#A5A29C]
                outline-none
                resize-none
                transition-all
                duration-500
                ease-out
                hover:border-[#C5A880]/60
                hover:bg-white
                focus:border-[#C5A880]
                focus:bg-white
                focus:shadow-[0_0_0_4px_rgba(197,168,128,0.10)]
                focus:-translate-y-[1px]
              "
            />

          </div>

        </div>

        {/* ================= CONFIDENTIALITY ================= */}

        <div
          className="
            mt-8
            p-4 sm:p-5
            bg-[#FAF8F5]
            border border-[#EAE6DF]
            rounded-sm
            transition-all
            duration-500
            hover:border-[#C5A880]/50
            hover:bg-[#FCFBF8]
            hover:shadow-[0_10px_30px_rgba(13,15,18,0.045)]
            hover:-translate-y-0.5
          "
        >

          <label className="flex items-start gap-3 cursor-pointer">

            <input
              type="checkbox"
              {...register('agreeToTerms', {
                required:
                  'Please confirm agreement to our private client advisory protocols',
              })}
              className="
                mt-0.5
                w-4 h-4
                rounded-sm
                border-[#CFC9BE]
                accent-[#C5A880]
                focus:ring-0
                cursor-pointer
                transition-transform
                duration-300
                hover:scale-110
              "
            />

            <div>

              <div className="flex items-center gap-2">

                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />

                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#34363A]">
                  Confidentiality Protocol
                </span>

              </div>

              <p className="mt-1.5 text-[11px] text-[#777B81] leading-relaxed">
                I agree to the confidential treatment of property addresses and
                private client protocols of Lumora Estates.
              </p>

            </div>

          </label>

          {errors.agreeToTerms && (
            <p className="text-[10px] text-red-600 mt-2">
              {errors.agreeToTerms.message}
            </p>
          )}

        </div>

        {/* ================= SUBMIT BUTTON ================= */}

        <div className="mt-7">

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              group/submit
              relative
              w-full
              h-14
              overflow-hidden
              bg-[#0D0F12]
              text-white
              rounded-sm
              transition-all
              duration-500
              ease-out
              hover:-translate-y-1
              hover:shadow-[0_15px_35px_rgba(197,168,128,0.22)]
              active:translate-y-0
              disabled:opacity-70
              disabled:hover:translate-y-0
            "
          >

            {/* Gold Background */}

            <span
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#B99A6C]
                via-[#D8C092]
                to-[#B99A6C]
                translate-x-[-101%]
                group-hover/submit:translate-x-0
                transition-transform
                duration-700
                ease-out
              "
            />

            {/* Moving Shine */}

            <span
              className="
                absolute
                top-0
                bottom-0
                w-20
                bg-white/20
                blur-xl
                -translate-x-32
                group-hover/submit:translate-x-[32rem]
                transition-transform
                duration-1000
                ease-out
              "
            />

            <span className="relative z-10 flex items-center justify-center gap-3">

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />

                  <span className="text-[10px] uppercase tracking-[0.22em] font-semibold">
                    Transmitting Confidential Request...
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.22em]
                      font-semibold
                      group-hover/submit:text-[#0D0F12]
                      transition-colors
                      duration-300
                    "
                  >
                    Submit Private Visit Request
                  </span>

                  <ArrowRight
                    className="
                      w-4 h-4
                      transition-all
                      duration-500
                      group-hover/submit:translate-x-2
                      group-hover/submit:text-[#0D0F12]
                    "
                  />
                </>
              )}

            </span>

          </button>

          <div className="flex items-center justify-center gap-2 mt-3">

            <LockKeyhole className="w-3 h-3 text-[#AAA59D]" />

            <span className="text-[9px] text-[#99958E] tracking-wide">
              Your information is handled with complete discretion.
            </span>

          </div>

        </div>

      </div>
    </form>
  );
};
