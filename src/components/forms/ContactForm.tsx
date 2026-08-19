import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  Loader2,
  Send,
} from 'lucide-react';

interface GeneralContactData {
  name: string;
  email: string;
  phone: string;
  inquiryType:
    | 'Buying'
    | 'Selling / Listing'
    | 'Family Office Advisory'
    | 'Press & Editorial';
  budgetRange: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GeneralContactData>({
    defaultValues: {
      inquiryType: 'Buying',
      budgetRange: '$15M - $30M',
      phone: '',
    },
  });

  const onSubmit = async (data: GeneralContactData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log('Contact inquiry transmitted:', data);

    setIsSuccess(true);
  };

  const inputBase =
    'w-full bg-[#FAF8F5] border border-[#EAE6DF] rounded-sm text-xs text-[#0D0F12] outline-none transition-all duration-500 ease-out hover:bg-white hover:border-[#C5A880]/60 focus:outline-none focus:border-[#C5A880] focus:bg-white focus:shadow-[0_0_0_4px_rgba(197,168,128,0.10)] hover:-translate-y-[1px]';

  /* ================= SUCCESS ================= */

  if (isSuccess) {
    return (
      <div className="relative group overflow-hidden bg-white border border-[#EAE6DF] rounded-sm p-8 text-center shadow-[0_12px_45px_rgba(13,15,18,0.055)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(197,168,128,0.12)]">

        {/* Animated Border */}
        <div className="absolute -inset-[1px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#A88A60_325deg,#E7D3A8_345deg,transparent_360deg)] animate-[spin_4s_linear_infinite]" />
        </div>

        {/* Inner Surface */}
        <div className="absolute inset-[1px] bg-white rounded-sm pointer-events-none" />

        <div className="relative z-10">

          <div
            className="
              w-14 h-14
              bg-[#C5A880]/15
              border border-[#C5A880]
              rounded-full
              flex items-center justify-center
              mx-auto mb-5
              transition-all duration-700
              hover:scale-110
              hover:rotate-6
              hover:bg-[#C5A880]/20
              hover:shadow-[0_10px_30px_rgba(197,168,128,0.20)]
            "
          >
            <CheckCircle2 className="w-7 h-7 text-[#8C6D45]" />
          </div>

          <h4 className="font-serif-luxury text-2xl text-[#0D0F12] mb-2">
            Inquiry Successfully Transmitted
          </h4>

          <p className="text-xs text-[#5A5E66] font-light max-w-sm mx-auto mb-6">
            A Managing Director from our Private Client Syndicate will reach out
            to you directly within 2 business hours.
          </p>

          <button
            onClick={() => {
              setIsSuccess(false);
              reset();
            }}
            className="
              group/reset
              px-5 py-2.5
              bg-[#0D0F12]
              text-white
              text-xs
              uppercase
              tracking-wider
              rounded-sm
              transition-all duration-500
              hover:bg-[#C5A880]
              hover:text-[#0D0F12]
              hover:-translate-y-1
              hover:shadow-[0_10px_25px_rgba(197,168,128,0.20)]
              active:translate-y-0
            "
          >
            Send Another Message
          </button>

        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        relative
        group
        bg-white
        border border-[#EAE6DF]
        rounded-sm
        p-6 sm:p-8
        shadow-[0_12px_45px_rgba(13,15,18,0.055)]
        space-y-5
        overflow-hidden
        transition-all duration-500
        hover:shadow-[0_20px_60px_rgba(197,168,128,0.12)]
      "
      noValidate
    >

      {/* =========================================
          ANIMATED OUTER BORDER
      ========================================== */}

      <div className="absolute -inset-[1px] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden z-0">
        <div className="absolute left-1/2 top-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#A88A60_325deg,#E7D3A8_345deg,transparent_360deg)] animate-[spin_3.5s_linear_infinite]" />
      </div>

      {/* Inner White Surface */}
      <div className="absolute inset-[1px] bg-white rounded-sm pointer-events-none z-[1]" />

      <div className="relative z-10 space-y-5">

        {/* Name + Email */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name */}

          <div className="group/field">

            <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0F12] mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className="relative">

              <User
                className="
                  w-4 h-4
                  text-[#9CA3AF]
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  transition-all duration-500
                  group-hover/field:text-[#C5A880]
                  group-focus-within/field:text-[#C5A880]
                "
              />

              <input
                type="text"
                placeholder="Your name"
                {...register('name', {
                  required: 'Please enter your name',
                })}
                className={`${inputBase} pl-9 pr-3 py-2`}
              />

            </div>

            {errors.name && (
              <p className="text-[10px] text-red-600 mt-1">
                {errors.name.message}
              </p>
            )}

          </div>

          {/* Email */}

          <div className="group/field">

            <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0F12] mb-1">
              Email <span className="text-red-500">*</span>
            </label>

            <div className="relative">

              <Mail
                className="
                  w-4 h-4
                  text-[#9CA3AF]
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  transition-all duration-500
                  group-hover/field:text-[#C5A880]
                  group-focus-within/field:text-[#C5A880]
                "
              />

              <input
                type="email"
                placeholder="your@email.com"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format',
                  },
                })}
                className={`${inputBase} pl-9 pr-3 py-2`}
              />

            </div>

            {errors.email && (
              <p className="text-[10px] text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}

          </div>

        </div>

        {/* Phone + Inquiry */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Phone */}

          <div className="group/field">

            <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0F12] mb-1">
              Phone / Mobile
            </label>

            <div className="relative">

              <Phone
                className="
                  w-4 h-4
                  text-[#9CA3AF]
                  absolute left-3 top-1/2
                  -translate-y-1/2
                  transition-all duration-500
                  group-hover/field:text-[#C5A880]
                  group-focus-within/field:text-[#C5A880]
                "
              />

              <input
                type="tel"
                placeholder="+91 81440 07714"
                {...register('phone')}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');

                  // Remove +91 if user pastes/types country code
                  if (value.startsWith('91')) {
                    value = value.slice(2);
                  }

                  // Maximum 10 digit Indian mobile number
                  value = value.slice(0, 10);

                  let formatted = '';

                  if (value.length > 0) {
                    formatted = `+91 ${value.slice(0, 5)}`;

                    if (value.length > 5) {
                      formatted += ` ${value.slice(5)}`;
                    }
                  }

                  e.target.value = formatted;
                }}
                className={`${inputBase} pl-9 pr-3 py-2`}
              />

            </div>

            {errors.phone && (
              <p className="text-[10px] text-red-600 mt-1">
                {errors.phone.message}
              </p>
            )}

          </div>

          {/* Inquiry */}

          <div className="group/field">

            <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0F12] mb-1">
              Inquiry Focus
            </label>

            <div className="relative">

              <select
                {...register('inquiryType')}
                className="
                  w-full
                  bg-[#FAF8F5]
                  border border-[#EAE6DF]
                  rounded-sm
                  px-3
                  py-2
                  pr-9
                  text-xs
                  text-[#0D0F12]
                  outline-none
                  appearance-none
                  cursor-pointer
                  transition-all duration-500
                  hover:bg-white
                  hover:border-[#C5A880]/60
                  hover:-translate-y-[1px]
                  focus:outline-none
                  focus:border-[#C5A880]
                  focus:bg-white
                  focus:shadow-[0_0_0_4px_rgba(197,168,128,0.10)]
                "
              >

                <option value="Buying">
                  Acquiring a Luxury Property
                </option>

                <option value="Selling / Listing">
                  Private Portfolio Listing
                </option>

                <option value="Family Office Advisory">
                  Family Office Retainer
                </option>

                <option value="Press & Editorial">
                  Press & Architectural Archival
                </option>

              </select>

              {/* Animated Arrow */}

              <span
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                  text-[#9CA3AF]
                  transition-all duration-500
                  group-hover/field:text-[#C5A880]
                "
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

            </div>

          </div>

        </div>

        {/* Message */}

        <div className="group/field">

          <label className="block text-xs uppercase tracking-wider font-semibold text-[#0D0F12] mb-1">
            Message & Confidential Details{' '}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">

            <textarea
              rows={4}
              placeholder="Tell us about the property criteria or transaction you are exploring..."
              {...register('message', {
                required: 'Please provide brief details on your inquiry',
              })}
              className="
                w-full
                bg-[#FAF8F5]
                border border-[#EAE6DF]
                rounded-sm
                p-3
                text-xs
                text-[#0D0F12]
                placeholder:text-[#9CA3AF]
                outline-none
                resize-none
                transition-all duration-500
                hover:bg-white
                hover:border-[#C5A880]/60
                hover:-translate-y-[1px]
                focus:outline-none
                focus:border-[#C5A880]
                focus:bg-white
                focus:shadow-[0_0_0_4px_rgba(197,168,128,0.10)]
              "
            />

          </div>

          {errors.message && (
            <p className="text-[10px] text-red-600 mt-1">
              {errors.message.message}
            </p>
          )}

        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={isSubmitting}
          className="
            group/submit
            relative
            w-full
            h-12
            overflow-hidden
            bg-[#0D0F12]
            text-white
            text-xs
            uppercase
            tracking-[0.2em]
            font-semibold
            rounded-sm
            transition-all duration-500
            hover:-translate-y-1
            hover:shadow-[0_15px_35px_rgba(197,168,128,0.22)]
            active:translate-y-0
            disabled:opacity-70
            disabled:hover:translate-y-0
          "
        >

          {/* Gold Hover Background */}

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
              transition-transform duration-700 ease-out
            "
          />

          {/* Moving Shine */}

          <span
            className="
              absolute
              top-0
              bottom-0
              w-16
              bg-white/20
              blur-xl
              -translate-x-20
              group-hover/submit:translate-x-[35rem]
              transition-transform duration-1000 ease-out
            "
          />

          <span className="relative z-10 flex items-center justify-center gap-2">

            {isSubmitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />

                <span>
                  Sending...
                </span>
              </>
            ) : (
              <>
                <Send
                  className="
                    w-3.5 h-3.5
                    text-[#C5A880]
                    transition-all duration-500
                    group-hover/submit:text-[#0D0F12]
                    group-hover/submit:-rotate-12
                  "
                />

                <span
                  className="
                    transition-colors duration-300
                    group-hover/submit:text-[#0D0F12]
                  "
                >
                  Transmit Message
                </span>
              </>
            )}

          </span>

        </button>

      </div>
    </form>
  );
};