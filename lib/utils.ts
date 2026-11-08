import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Strips spaces, brackets and dashes so a display phone becomes a tel: href. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** True when the string is a bracketed placeholder such as "[PHONE]". */
export function isPlaceholder(value: string | undefined | null) {
  return !value || /^\[.*\]$/.test(value.trim());
}
