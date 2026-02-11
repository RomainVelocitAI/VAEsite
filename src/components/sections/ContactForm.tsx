"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { Link } from "@/i18n/navigation";

// Manual validation to avoid zod v4/resolver compatibility issues
function validateForm(data: Record<string, unknown>, t: ReturnType<typeof useTranslations>) {
  const errors: Record<string, { message: string }> = {};

  const fullName = (data.fullName as string) || "";
  const email = (data.email as string) || "";
  const phone = (data.phone as string) || "";
  const subject = (data.subject as string) || "";
  const message = (data.message as string) || "";
  const consent = data.consent as boolean;
  const honeypot = (data.honeypot as string) || "";

  if (honeypot.length > 0) return errors;

  if (!fullName || fullName.length < 2) {
    errors.fullName = { message: fullName ? t("validation.nameMin") : t("validation.nameRequired") };
  }

  if (!email) {
    errors.email = { message: t("validation.emailRequired") };
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = { message: t("validation.emailInvalid") };
  }

  if (phone && !/^\+?[\d\s\-().]{7,20}$/.test(phone)) {
    errors.phone = { message: t("validation.phoneInvalid") };
  }

  if (!subject) {
    errors.subject = { message: t("validation.subjectRequired") };
  }

  if (!message) {
    errors.message = { message: t("validation.messageRequired") };
  } else if (message.length < 20) {
    errors.message = { message: t("validation.messageMin") };
  }

  if (!consent) {
    errors.consent = { message: t("validation.consentRequired") };
  }

  return errors;
}

const SUBJECT_KEYS = [
  "realEstate",
  "energy",
  "fundraising",
  "commodities",
  "projectSupport",
  "partnership",
  "press",
  "other",
] as const;

const inputBase =
  "w-full bg-blanc border border-noir/10 p-3.5 text-base text-texte placeholder:text-texte/30 outline-none transition-all duration-300 focus:border-or focus:shadow-[0_0_0_1px_rgba(197,165,114,0.15)]";

const labelBase = "block text-[13px] font-bold uppercase tracking-[0.18em] text-noir mb-2";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Manual validation
    const validationErrors = validateForm(data as unknown as Record<string, unknown>, t);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, val]) => {
        setError(key as keyof ContactFormData, val);
      });
      return;
    }

    // Honeypot check
    if (data.honeypot) return;

    setStatus("sending");
    clearErrors();

    // Simulated submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    reset();
  };

  if (status === "success") {
    return (
      <div className="bg-blanc border border-or/20 p-10 text-center">
        <div className="w-12 h-12 mx-auto mb-4 border-2 border-or rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-or">
            <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-[17px] text-texte leading-relaxed">
          {t("form.success")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className={labelBase}>
            {t("form.fullName")} <span className="text-or">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            className={inputBase}
            placeholder={t("form.fullNamePlaceholder")}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-[11px] text-red-600 tracking-wide">{errors.fullName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>
            {t("form.email")} <span className="text-or">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputBase}
            placeholder={t("form.emailPlaceholder")}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-[11px] text-red-600 tracking-wide">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Phone + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelBase}>
            {t("form.phone")}
          </label>
          <input
            id="phone"
            type="tel"
            className={inputBase}
            placeholder={t("form.phonePlaceholder")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1.5 text-[11px] text-red-600 tracking-wide">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="company" className={labelBase}>
            {t("form.company")}
          </label>
          <input
            id="company"
            type="text"
            className={inputBase}
            placeholder={t("form.companyPlaceholder")}
            {...register("company")}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelBase}>
          {t("form.subject")} <span className="text-or">*</span>
        </label>
        <div className="relative">
          <select
            id="subject"
            className={`${inputBase} appearance-none pr-10 cursor-pointer`}
            defaultValue=""
            {...register("subject")}
          >
            <option value="" disabled>
              {t("form.subjectPlaceholder")}
            </option>
            {SUBJECT_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`form.subjectOptions.${key}`)}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-texte/30">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        {errors.subject && (
          <p className="mt-1.5 text-[11px] text-red-600 tracking-wide">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelBase}>
          {t("form.message")} <span className="text-or">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${inputBase} resize-none`}
          placeholder={t("form.messagePlaceholder")}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-[11px] text-red-600 tracking-wide">{errors.message.message}</p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-0.5 w-4 h-4 border border-noir/20 accent-or cursor-pointer"
          {...register("consent")}
        />
        <label htmlFor="consent" className="text-[15px] text-texte/60 leading-relaxed cursor-pointer">
          {t("form.consent")}{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-or hover:underline underline-offset-2"
          >
            →
          </Link>
        </label>
      </div>
      {errors.consent && (
        <p className="text-[11px] text-red-600 tracking-wide">{errors.consent.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-or text-noir text-[14px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-[#b8984f] hover:shadow-[0_4px_20px_rgba(197,165,114,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === "sending" ? t("form.sending") : t("form.submit")}
      </button>

      {status === "error" && (
        <p className="text-[13px] text-red-600">{t("form.error")}</p>
      )}
    </form>
  );
}
