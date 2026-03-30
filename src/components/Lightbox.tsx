"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  style: string;
  caption: string;
}

export default function Lightbox({
  isOpen,
  onClose,
  image,
  style,
  caption,
}: LightboxProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(13,13,13,0.96)",
              zIndex: 1000,
              cursor: "pointer",
            }}
          />

          {/* Lightbox panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1001,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
              pointerEvents: "none",
            }}
          >
            {/* Image container — stops click propagation */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "800px",
                maxHeight: "75vh",
                aspectRatio: "3/4",
                borderRadius: "4px",
                overflow: "hidden",
                pointerEvents: "auto",
              }}
            >
              <Image
                src={image}
                alt={caption}
                fill
                style={{ objectFit: "cover" }}
                sizes="800px"
                priority
              />
            </div>

            {/* Text below image */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                marginTop: "24px",
                textAlign: "center",
                pointerEvents: "auto",
              }}
            >
              {/* Style tag */}
              <p
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "#C4FF61",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {style}
              </p>

              {/* Caption */}
              <p
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "rgba(253,255,233,0.75)",
                  lineHeight: 1.4,
                }}
              >
                {caption}
              </p>
            </div>

            {/* Close button — top right */}
            <button
              onClick={onClose}
              style={{
                position: "fixed",
                top: "32px",
                right: "40px",
                background: "none",
                border: "none",
                cursor: "pointer",
                pointerEvents: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "8px",
              }}
              aria-label="Close lightbox"
            >
              {/* X from two rotated lines */}
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "#FDFFE9",
                  transform: "rotate(45deg) translateY(3px)",
                  transition: "background 0.2s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "24px",
                  height: "1px",
                  background: "#FDFFE9",
                  transform: "rotate(-45deg) translateY(-3px)",
                  transition: "background 0.2s",
                }}
              />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
