"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Group } from "three";

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

function PizzaAura3D() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    // Smooth pointer-reactive tilt that blends with idle rotation for premium depth.
    const targetTiltX = pointer.y * 0.22;
    const targetTiltY = pointer.x * 0.28 + t * 0.18;

    groupRef.current.rotation.x += (targetTiltX - groupRef.current.rotation.x) * 0.045;
    groupRef.current.rotation.y += (targetTiltY - groupRef.current.rotation.y) * 0.045;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.55, 0.045, 16, 140]} />
        <meshStandardMaterial color="#ffb703" metalness={0.2} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0, -0.35]}>
        <sphereGeometry args={[1.08, 44, 44]} />
        <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={0.2} wireframe />
      </mesh>

      <mesh position={[0.58, 0.45, 0.7]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color="#ffb703" />
      </mesh>
      <mesh position={[-0.62, -0.35, 0.58]}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial color="#e63946" />
      </mesh>
    </group>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pb-20 lg:px-8 lg:pt-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(230,57,70,0.24),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(255,183,3,0.18),_transparent_40%)]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-[#ffb703]">
            Modern Dark Gourmet
          </p>

          <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Stone-Baked{" "}
            <span className="bg-gradient-to-r from-[#e63946] via-[#ff6b6b] to-[#ffb703] bg-clip-text text-transparent">
              Perfection
            </span>
            , Delivered to Your Door.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/75 lg:mx-0 lg:text-lg">
            Experience the authentic taste of Italy with our hand-stretched dough
            and farm-fresh ingredients.
          </p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.button
              type="button"
              aria-label="Order now from Crust and Craft"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(230,57,70,0.0)",
                  "0 0 28px rgba(230,57,70,0.45)",
                  "0 0 0 rgba(230,57,70,0.0)",
                ],
              }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
              className="w-full rounded-full bg-[#e63946] px-8 py-3 text-sm font-semibold text-white sm:w-auto"
            >
              Order Now
            </motion.button>

            <motion.button
              type="button"
              aria-label="View menu options"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-full border border-[#ffb703]/70 bg-transparent px-8 py-3 text-sm font-semibold text-[#ffb703] sm:w-auto"
            >
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[34rem]"
        >
          <div
            className="pointer-events-auto absolute inset-0 -z-10 opacity-80"
            aria-hidden="true"
          >
            {/* Lightweight Three.js ambient layer for subtle premium 3D depth. */}
            <Canvas camera={{ position: [0, 0, 3.4], fov: 44 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.9} />
              <pointLight position={[2.5, 2, 3]} intensity={1.5} color="#ffb703" />
              <pointLight position={[-2.2, -1.8, 2]} intensity={1.1} color="#e63946" />
              <PizzaAura3D />
            </Canvas>
          </div>

          {/* Keep motion transform-only for smooth GPU-accelerated breathing effect. */}
          <motion.div
            animate={{ y: [0, -12, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[2rem] border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-2xl shadow-black/40"
          >
            <Image
              src="/pizza-hero-placeholder.svg"
              alt="Signature stone-baked pizza with fresh toppings"
              width={920}
              height={920}
              priority
              className="h-auto w-full rounded-[1.4rem] object-cover"
            />
          </motion.div>

          {/* Ingredient layers move at different amplitudes to mimic subtle parallax drift. */}
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-14 sm:-left-8"
            aria-hidden="true"
          >
            <Image src="/ingredient-basil.svg" alt="" width={88} height={88} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 16, 0], x: [0, -10, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-10 sm:-right-7"
            aria-hidden="true"
          >
            <Image src="/ingredient-tomato.svg" alt="" width={102} height={102} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
