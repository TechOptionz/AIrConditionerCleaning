"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const noop = () => () => {};

/**
 * `useReducedMotion` can differ between server (false) and first client render
 * (true), which causes hydration mismatches. This returns false until the
 * component has mounted, then the real preference, so SSR markup always matches.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  return mounted && Boolean(reduce);
}
