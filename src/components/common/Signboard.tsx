"use client";

import { transformVisible } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";

export default function Signboard() {
  const HeaderRef = useRef<HTMLHeadingElement>(null);
  useGSAP(
    async () => {
      if (HeaderRef.current) await transformVisible(HeaderRef.current);
    },
    { scope: HeaderRef, dependencies: [] }
  );

  return (
    <h1 ref={HeaderRef} className="max-w-[calc(100%-32px)] h-[84px]">
      <Image
        className="dark:invert object-cover"
        src="/blog/logo.svg"
        alt="Give's log logo"
        width={320}
        height={92}
        priority
      />
    </h1>
  );
}
