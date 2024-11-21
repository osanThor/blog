import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

export const transformTextAnimation = (target: HTMLElement, text: string) => {
  gsap.to(target, {
    duration: 1,
    text,
  });
};

export type Direction = "up" | "left";

export const transformVisible = (
  target: HTMLElement | Element[],
  time?: number | null,
  direction: Direction = "up"
) => {
  const duration = time || 1;
  // 위치 설정
  const initialPosition = direction === "left" ? { x: 10 } : { y: 10 };
  const finalPosition = direction === "left" ? { x: 0 } : { y: 0 };

  gsap
    .timeline()
    .set(target, {
      opacity: 0,
      ...initialPosition,
    })
    .to(target, {
      duration,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ...finalPosition,
    });
};
