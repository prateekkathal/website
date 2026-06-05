"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

// Enter-only route transition: remounting on pathname change replays the fade.
// (Exit animations are unreliable with the App Router, so we keep it to enter.)
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
