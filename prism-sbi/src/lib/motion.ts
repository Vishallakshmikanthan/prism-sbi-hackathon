/**
 * PRISM motion vocabulary — small, disciplined set used across the app.
 * Prevents scattered / inconsistent animations.
 */
import type { Transition, Variants } from "framer-motion";

export const ease = {
  standard: [0.4, 0, 0.2, 1],
  emphasized: [0.2, 0, 0, 1],
  entrance: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const duration = {
  fast: 0.18,
  base: 0.28,
  slow: 0.48,
  hero: 0.72,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const stagger = (delay = 0.06): Transition => ({
  staggerChildren: delay,
});

export const transitions = {
  base: { duration: duration.base, ease: ease.standard } as Transition,
  entrance: { duration: duration.slow, ease: ease.entrance } as Transition,
  hero: { duration: duration.hero, ease: ease.emphasized } as Transition,
};
