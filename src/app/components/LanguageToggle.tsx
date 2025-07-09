
    "use client";

    import { useLanguage } from "@/contexts/LanguageContext";

    export default function LanguageToggle() {
      const { language, setLanguage } = useLanguage();
      
      return (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all hover:bg-gray-100"
            >
              <span className="text-lg">{language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              <span>{language === "fr" ? "FR" : "EN"}</span>
            </button>
          </div>
        </div>
      );
    }
  