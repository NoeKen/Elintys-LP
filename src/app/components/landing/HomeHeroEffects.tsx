"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HomeHeroScene = dynamic(() => import("./HomeHeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HomeHeroEffects() {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function updateCanvasPreference() {
      setShowCanvas(desktopQuery.matches && !reducedMotionQuery.matches);
    }

    updateCanvasPreference();
    desktopQuery.addEventListener("change", updateCanvasPreference);
    reducedMotionQuery.addEventListener("change", updateCanvasPreference);

    return () => {
      desktopQuery.removeEventListener("change", updateCanvasPreference);
      reducedMotionQuery.removeEventListener("change", updateCanvasPreference);
    };
  }, []);

  if (!showCanvas) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52vw] opacity-95 [mask-image:linear-gradient(90deg,transparent,black_22%,black_88%,transparent)] lg:block"
      data-testid="home-hero-r3f"
    >
      <HomeHeroScene />
    </div>
  );
}
