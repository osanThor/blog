"use client";

import { transformTextAnimation } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

type Props = {
  text: string;
};
function BigTitle({ text }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLHeadingElement>(null);
  useGSAP(
    () => {
      if (ref.current) transformTextAnimation(ref.current, text);
    },
    { scope: ref, dependencies: [text] }
  );
  useEffect(() => {
    setTimeout(() => setMounted(true), 1100);
  }, []);

  return (
    <div className="flex gap-2">
      <h1
        ref={ref}
        className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-3 text-wrap truncate"
      >
        {mounted ? text : "Loading..."}
      </h1>
    </div>
  );
}
export default React.memo(BigTitle);
