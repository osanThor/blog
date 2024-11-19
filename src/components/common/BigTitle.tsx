"use client";

import { textAnimation } from "@/utils/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

type Props = {
  text: string;
};
export default function BigTitle({ text }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      ref.current && textAnimation(ref.current, text);
    },
    { scope: ref, dependencies: [text] }
  );
  return (
    <div
      ref={ref}
      className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-3"
    >
      Loading...
    </div>
  );
}
