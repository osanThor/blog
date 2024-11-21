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

export const transformVisible = (
  target: HTMLElement | Element[],
  time?: number | null
) => {
  const duration = time || 1;
  gsap
    .timeline()
    .set(target, {
      opacity: 0,
      y: 10,
    })
    .to(target, {
      duration,
      y: 0,
      opacity: 1,
      stagger: 0.1,
    });
};
