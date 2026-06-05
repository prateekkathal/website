"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

// Renders the current calendar year. useSyncExternalStore lets the client read
// the live year (so it rolls over on its own every Jan 1, no redeploy needed)
// while keeping SSR hydration-mismatch-free.
export function Year() {
  const year = useSyncExternalStore(subscribe, getYear, getYear);
  return <>{year}</>;
}
