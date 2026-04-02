"use client";

import { motion } from "framer-motion";

export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
      aria-label="Loading Crust and Craft experience"
      role="status"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          className="relative h-28 w-28"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-[#ffb703]/25" />
          <motion.div
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#e63946]/80"
            animate={{ rotate: -360, scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbiting pizza-slice marker creates a creative branded loader motion. */}
          <motion.span
            className="absolute left-1/2 top-0 -ml-3 inline-flex h-6 w-6 items-center justify-center text-lg"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            🍕
          </motion.span>
        </motion.div>

        <div className="text-center">
          <motion.p
            className="font-serif text-2xl tracking-wide text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Crust & Craft
          </motion.p>
          <motion.p
            className="mt-2 text-sm uppercase tracking-[0.28em] text-[#ffb703]"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Preheating the Oven
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
