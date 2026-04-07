"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { addToWaitlist } from "@/lib/waitlist";

type FormState = "idle" | "loading" | "success" | "error" | "exists";

interface EmailFormProps {
  source: "hero" | "cta";
  inputClassName?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
  placeholder?: string;
  buttonLabel?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm({
  source,
  inputClassName,
  buttonClassName,
  wrapperClassName,
  placeholder = "votre@email.com",
  buttonLabel = "Rejoindre la liste d'attente",
}: EmailFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setErrorMsg("Veuillez entrer une adresse email valide.");
      setState("error");
      return;
    }
    setState("loading");
    setErrorMsg("");
    try {
      const result = await addToWaitlist(email, source, "fr");
      if (result.success) {
        setState(result.alreadyExists ? "exists" : "success");
      } else {
        setState("error");
        setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch {
      setState("error");
      setErrorMsg("Une erreur est survenue. Veuillez réessayer.");
    }
  }

  if (state === "success" || state === "exists") {
    return (
      <div className={cn("flex items-center gap-3 py-3", wrapperClassName)}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-white text-sm font-semibold">
          ✓
        </div>
        <p className="text-sm text-brand-mid">
          {state === "exists"
            ? "Vous êtes déjà sur la liste ! On vous contacte bientôt."
            : "Parfait ! Vous êtes sur la liste. On vous contactera bientôt."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-2", wrapperClassName)}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") {
              setState("idle");
              setErrorMsg("");
            }
          }}
          placeholder={placeholder}
          disabled={state === "loading"}
          className={cn(
            "flex-1 rounded-xl border border-brand-border bg-white px-4 py-3 text-sm text-ink placeholder:text-brand-soft outline-none focus:border-teal transition-colors",
            state === "error" && "border-red-400 focus:border-red-400",
            inputClassName
          )}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={cn(
            "flex shrink-0 items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white transition-all hover:bg-ink-mid disabled:opacity-60",
            buttonClassName
          )}
        >
          {state === "loading" ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <span>{buttonLabel}</span>
              <span className="inline-block rotate-45">↗</span>
            </>
          )}
        </button>
      </div>
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
    </form>
  );
}
