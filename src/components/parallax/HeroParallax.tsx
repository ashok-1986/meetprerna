"use client";

import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import { motion } from "framer-motion";

export default function HeroParallax() {
  return (
    <motion.section
      style={{
        position: "relative",
        height: "350vh",
        background: "#0D0D0D",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollyCanvas />
      <Overlay />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background: "linear-gradient(to right, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.3) 50%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 5,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(13,13,13,0.6) 0%, transparent 30%)",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 6,
          pointerEvents: "none",
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.section>
  );
}