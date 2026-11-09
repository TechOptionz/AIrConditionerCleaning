"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Logo preview switcher. Lets the client flip between the approved wave logo
 * and two candidate marks site-wide (header, mobile drawer, footer). The
 * choice is remembered per browser in localStorage.
 */
export type LogoId = "wave" | "option-a" | "option-b";

export type LogoOption = {
  id: LogoId;
  label: string;
  note: string;
  mark: { src: string; width: number; height: number };
  markLight: { src: string; width: number; height: number };
  /** Rendered mark height in the header, so each option sits with similar visual weight. */
  headerHeight: number;
};

export const LOGO_OPTIONS: LogoOption[] = [
  {
    id: "wave",
    label: "Wave",
    note: "Approved",
    mark: { src: "/brand/logo-mark.png", width: 480, height: 169 },
    markLight: { src: "/brand/logo-mark-light.png", width: 480, height: 169 },
    headerHeight: 28,
  },
  {
    id: "option-a",
    label: "Option A",
    note: "Split unit + arc",
    mark: { src: "/brand/option-a-mark.png", width: 369, height: 172 },
    markLight: { src: "/brand/option-a-mark-light.png", width: 369, height: 172 },
    headerHeight: 34,
  },
  {
    id: "option-b",
    label: "Option B",
    note: "Swirl + leaf",
    mark: { src: "/brand/option-b-mark.png", width: 297, height: 225 },
    markLight: { src: "/brand/option-b-mark-light.png", width: 297, height: 225 },
    headerHeight: 38,
  },
];

const STORAGE_KEY = "nac-logo";
const DEFAULT: LogoId = "wave";

type Ctx = { logo: LogoOption; logoId: LogoId; setLogoId: (id: LogoId) => void };

const LogoContext = createContext<Ctx>({
  logo: LOGO_OPTIONS[0],
  logoId: DEFAULT,
  setLogoId: () => {},
});

function isLogoId(v: unknown): v is LogoId {
  return LOGO_OPTIONS.some((o) => o.id === v);
}

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logoId, setState] = useState<LogoId>(DEFAULT);

  // Hydrate from localStorage after mount so server and first client render agree.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLogoId(saved)) setState(saved);
    } catch {
      /* storage unavailable — keep default */
    }
  }, []);

  const setLogoId = useCallback((id: LogoId) => {
    setState(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const logo = LOGO_OPTIONS.find((o) => o.id === logoId) ?? LOGO_OPTIONS[0];
  return <LogoContext.Provider value={{ logo, logoId, setLogoId }}>{children}</LogoContext.Provider>;
}

export function useLogo() {
  return useContext(LogoContext);
}
