"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useI18n } from "@/contexts/I18nContext";
import { replaceToken } from "@/lib/i18n";

type WaitlistRole = "organisateur" | "prestataire" | "gestionnaire" | "visiteur";
type FormState = "idle" | "loading" | "success" | "error" | "exists";

interface EmailFormProps {
  source: "hero" | "cta";
  inputClassName?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
  buttonLabel?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm({
  source,
  inputClassName,
  buttonClassName,
  wrapperClassName,
  buttonLabel = "Rejoindre la liste d'attente",
}: EmailFormProps) {
  const { locale, messages } = useI18n();
  const copy = messages.form;
  const [firstName, setFirstName] = useState("");
  const [role, setRole] = useState<WaitlistRole | "">("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<{
    firstName?: string;
    role?: string;
    email?: string;
    global?: string;
  }>({});

  function clearErrors() {
    setErrors({});
    if (state === "error") {
      setState("idle");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: typeof errors = {};

    if (!firstName.trim()) {
      nextErrors.firstName = copy.errors.firstName;
    }

    if (!role) {
      nextErrors.role = copy.errors.role;
    }

    if (!email.trim()) {
      nextErrors.email = copy.errors.emailRequired;
    } else if (!EMAIL_REGEX.test(email)) {
      nextErrors.email = copy.errors.emailInvalid;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setState("error");
      return;
    }

    setState("loading");
    setErrors({});

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          role,
          email: email.trim(),
          source,
          locale,
        }),
      });
      const data = await res.json();

      if (res.status === 429) {
        setState("error");
        setErrors({ global: copy.errors.rateLimit });
      } else if (res.ok) {
        setState(data.alreadyExists ? "exists" : "success");
      } else {
        setState("error");
        setErrors({ global: data.error ?? copy.errors.generic });
      }
    } catch {
      setState("error");
      setErrors({ global: copy.errors.generic });
    }
  }

  if (state === "success" || state === "exists") {
    return (
      <div className={cn("flex items-center gap-3 py-3", wrapperClassName)}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white">
          ✓
        </div>
        <p className="text-sm text-brand-mid">
          {state === "exists"
            ? copy.exists
            : replaceToken(copy.success, "firstName", firstName.trim())}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-3", wrapperClassName)}>
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            clearErrors();
          }}
          placeholder={copy.firstNamePlaceholder}
          aria-label={copy.firstNamePlaceholder}
          disabled={state === "loading"}
          className={cn(
            "w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-ink placeholder:text-brand-soft outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20",
            errors.firstName && "border-red-400 focus:border-red-400 focus:ring-red-200",
            inputClassName
          )}
        />
        {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value as WaitlistRole | "");
            clearErrors();
          }}
          aria-label={copy.rolePlaceholder}
          disabled={state === "loading"}
          className={cn(
            "w-full appearance-none rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20",
            !role && "text-brand-soft",
            errors.role && "border-red-400 focus:border-red-400 focus:ring-red-200",
            inputClassName
          )}
        >
          <option value="" disabled>
            {copy.rolePlaceholder}
          </option>
          <option value="organisateur">{copy.roleOptions.organisateur}</option>
          <option value="prestataire">{copy.roleOptions.prestataire}</option>
          <option value="gestionnaire">{copy.roleOptions.gestionnaire}</option>
          <option value="visiteur">{copy.roleOptions.visiteur}</option>
        </select>
        {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearErrors();
          }}
          placeholder={copy.emailPlaceholder}
          aria-label={copy.emailPlaceholder}
          disabled={state === "loading"}
          className={cn(
            "w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-ink placeholder:text-brand-soft outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20",
            errors.email && "border-red-400 focus:border-red-400 focus:ring-red-200",
            inputClassName
          )}
        />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <motion.button
          type="submit"
          disabled={state === "loading"}
          whileHover={state === "loading" ? undefined : { y: -2, scale: 1.02 }}
          whileTap={state === "loading" ? undefined : { scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition-all hover:bg-ink-mid disabled:opacity-60",
            buttonClassName
          )}
        >
          {state === "loading" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <span>{buttonLabel}</span>
          )}
        </motion.button>
        {errors.global && <p className="text-xs text-red-500">{errors.global}</p>}
      </div>
    </form>
  );
}
