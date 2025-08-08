"use client";
import React from "react";
import styles from "../../public/styles/GlowingBackground.module.css";

type GlowingProps = {
  className?: string; // lets parent pass positioning like "absolute inset-0 -z-10"
};

const COLORS = [
  "rgba(0, 97, 11, 0.7)",
    "rgba(0, 100, 12, 0.7)","rgba(0, 100, 12, 0.7)","rgba(0, 100, 12, 0.7)","rgba(0, 100, 12, 0.7)","rgba(0, 100, 12, 0.7)","rgba(0, 100, 12, 0.7)",

];

const BUBBLES: Array<[string, string, number, number]> = [
  ["10%", "15%", 320, 0],
  ["55%", "18%", 260, 1],
  ["25%", "65%", 360, 2],
  ["70%", "70%", 240, 3],
  ["60%", "50%", 230, 4],
  ["20%", "45%", 200, 5],
  ["42%", "75%", 280, 6],
];

export default function GlowingBackground({ className = "" }: GlowingProps) {
  return (
    <div
      className={`${styles.bubbleContainer} ${className}`}
      // Safety defaults if parent forgets to position it
      style={{ backgroundColor: "#000" }}
    >
      {BUBBLES.map(([top, left, size, colorIdx], i) => {
        const color = COLORS[colorIdx];
        const ring = Math.max(2, Math.round(Number(size) * 0.06)); // ~6% thickness

        return (
          <div
            key={i}
            className={`${styles.bubble} ${styles[`bubble${i}`]}`}
            style={
              {
                top,
                left,
                width: size,
                height: size,
                // Hollow ring via border + multi-layer glow
                background: "transparent",
                border: `${ring}px solid ${color}`,
                boxShadow: `
                  0 0 20px ${color},
                  0 0 40px ${color},
                  0 0 80px ${color},
                  0 0 120px ${color}
                `,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
