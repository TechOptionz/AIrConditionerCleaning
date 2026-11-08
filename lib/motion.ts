/**
 * Motion tokens shared by every animated component.
 * Mirrors the approved design: ease-out curve .22,1,.36,1, 600 ms reveals,
 * 24 px travel, 80 ms stagger. Change here to retune the whole site.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DUR = {
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  reveal: 0.6,
  hero: 0.9,
  media: 1.4,
} as const;

export const REVEAL_Y = 24;
export const STAGGER = 0.08;

export const revealVariants = {
  hidden: { opacity: 0, y: REVEAL_Y },
  show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE_OUT } },
};

export const staggerContainer = (stagger = STAGGER, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const heroUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.reveal, ease: EASE_OUT, delay },
});

export const VIEWPORT = { once: true, amount: 0.12, margin: "0px 0px -6% 0px" } as const;
