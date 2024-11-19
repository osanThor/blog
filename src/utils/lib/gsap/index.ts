import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin, useGSAP);

export const textAnimation = (target: HTMLElement, text: string) => {
  gsap.to(target, {
    duration: 1,
    text,
  });
};
