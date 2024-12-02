export const transformTextAnimation = async (
  target: HTMLElement,
  text: string
) => {
  const gsap = (await import("gsap")).default;
  const textPlugin = (await import("gsap/TextPlugin")).TextPlugin;
  gsap.registerPlugin(textPlugin);

  gsap.to(target, {
    duration: 1,
    text,
  });
};

export type Direction = "up" | "left";

export const transformVisible = async (
  target: HTMLElement | Element[],
  time?: number | null,
  direction: Direction = "up",
  stagger: number = 0.1
) => {
  const gsap = (await import("gsap")).default;

  const duration = time || 0.35;
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
      stagger,
      ...finalPosition,
    });
};
