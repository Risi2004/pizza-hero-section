"use client";

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroAssets = [
  "/pizza-realistic.webp",
  "/pizza-hero-placeholder.svg",
  "/ingredient-basil.svg",
  "/ingredient-tomato.svg",
];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      if (typeof image.decode === "function") {
        image.decode().finally(resolve);
        return;
      }
      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });
}

function preloadOptionalGlb(url: string): Promise<void> {
  return fetch(url, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) return;
      return response.arrayBuffer().then(() => undefined);
    })
    .catch(() => undefined);
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const maxWaitGuard = new Promise((resolve) => window.setTimeout(resolve, 7000));
    const preloadHeroResources = Promise.all([
      ...heroAssets.map((asset) => preloadImage(asset)),
      // Optional model preload for smoother hero entry when GLB exists.
      preloadOptionalGlb("/models/pizza.glb"),
    ]);

    void Promise.race([preloadHeroResources, maxWaitGuard]).then(() => {
      if (active) setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Navbar />
            <main>
              <Hero />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
