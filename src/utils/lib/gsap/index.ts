let isPluginRegistered = false;

export const transformTextAnimation = async (
  target: HTMLElement,
  text: string,
  options?: { duration?: number; ease?: string }
) => {
  const gsap = (await import("gsap")).default;
  if (!isPluginRegistered) {
    const textPlugin = (await import("gsap/TextPlugin")).TextPlugin;
    gsap.registerPlugin(textPlugin);
    isPluginRegistered = true;
  }

  gsap.to(target, {
    text,
    duration: options?.duration || 1,
    ease: options?.ease || "power1.out",
  });
};

export type Direction = "up" | "left" | "down" | "right";

export const transformVisible = async (
  target: HTMLElement | Element[],
  options?: {
    time?: number;
    direction?: Direction;
    stagger?: number;
    ease?: string;
  }
) => {
  const gsap = (await import("gsap")).default;

  const duration = options?.time || 0.35;
  const stagger = options?.stagger || 0.1;
  const ease = options?.ease || "power1.out";

  let initialPosition = {};
  let finalPosition = {};
  switch (options?.direction || "up") {
    case "up":
      initialPosition = { y: 10 };
      finalPosition = { y: 0 };
      break;
    case "down":
      initialPosition = { y: -10 };
      finalPosition = { y: 0 };
      break;
    case "left":
      initialPosition = { x: 10 };
      finalPosition = { x: 0 };
      break;
    case "right":
      initialPosition = { x: -10 };
      finalPosition = { x: 0 };
      break;
  }
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
      stagger,
      ease,
      ...finalPosition,
    });
};
