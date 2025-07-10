
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
    >
      <Globe className="h-5 w-5" />
      <span className="sr-only">{language === "fr" ? "Changer de langue" : "Toggle language"}</span>
    </Button>
  );
}
