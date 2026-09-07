"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type EstimatePrefill = {
  role?: "homeowner" | "contractor" | "gc" | "other";
  services?: string[];
  projectRef?: string;
  sourcePage?: string;
};

type EstimateContextValue = {
  open: boolean;
  prefill: EstimatePrefill;
  openEstimate: (prefill?: EstimatePrefill) => void;
  closeEstimate: () => void;
};

const EstimateContext = createContext<EstimateContextValue | null>(null);

export function EstimateProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<EstimatePrefill>({});

  const openEstimate = useCallback((next?: EstimatePrefill) => {
    setPrefill(next || {});
    setOpen(true);
  }, []);

  const closeEstimate = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeEstimate();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeEstimate]);

  const value = useMemo(
    () => ({ open, prefill, openEstimate, closeEstimate }),
    [open, prefill, openEstimate, closeEstimate]
  );

  return (
    <EstimateContext.Provider value={value}>{children}</EstimateContext.Provider>
  );
}

export function useEstimate() {
  const ctx = useContext(EstimateContext);
  if (!ctx) {
    throw new Error("useEstimate must be used within EstimateProvider");
  }
  return ctx;
}
