"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Dictionary, SiteLocale } from "@/lib/i18n";

interface I18nContextValue {
  locale: SiteLocale;
  messages: Dictionary;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: SiteLocale;
  messages: Dictionary;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
