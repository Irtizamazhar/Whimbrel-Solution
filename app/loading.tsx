"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

function getLoaderLogoSrc(): string {
  if (typeof document === "undefined") return "/whimbrel-logo-3.png";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "/whimbrel-logo.png"
    : "/whimbrel-logo-3.png";
}

export default function Loading() {
  const [logoSrc, setLogoSrc] = useState("/whimbrel-logo-3.png");

  useEffect(() => {
    setLogoSrc(getLoaderLogoSrc());
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-navy">
      <div className="relative h-24 w-24 sm:h-[84px] sm:w-[84px]">
        <Image
          src={logoSrc}
          alt="Whimbrel Solution logo"
          width={84}
          height={84}
          priority
          className="h-full w-auto object-contain"
        />
      </div>
      <p className="mt-4 font-cormorant text-3xl text-text">Loading...</p>
    </div>
  );
}
