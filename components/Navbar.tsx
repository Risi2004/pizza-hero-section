"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#e63946] font-semibold text-white">
            C
          </span>
          <span className="font-semibold tracking-wide">Crust & Craft</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/85 transition-colors hover:text-[#ffb703]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <motion.button
          type="button"
          aria-label="Open cart"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:border-[#ffb703] hover:text-[#ffb703]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H7" />
            <circle cx="10" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
        </motion.button>
      </nav>
    </header>
  );
}
