"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";
import Image from "next/image";

export default function ConfettiOnLoad() {
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Confetti Side Cannons ---
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = [
      "#a786ff",
      "#fd8bbc",
      "#eca184",
      "#f8deb1",
      "#ff6b6b",
      "#6bc5ff",
      "#ffd93d",
      "#8aff8a",
      "#ff8aff",
      "#4d94ff",
      "#ffb84d",
      "#ff4da6",
      "#00ffcc",
      "#ff7f50",
      "#d4ff7f",
      "#ff5c5c",
    ];

    const frame = () => {
      if (Date.now() > end) return;

      // Side cannons
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      // Random emoji bursts
      const emojis = ["🎉", "✨", "💜", "🎊"];
      confetti({
        particleCount: 1,
        startVelocity: 40,
        spread: 70,
        ticks: 200,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        shapes: ["circle", "square"],
        scalar: 1.5,
      });

      requestAnimationFrame(frame);
    };

    frame();

    // --- GSAP Text Animation ---
    if (textRef.current && subtitleRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "bounce.out" }
      );
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <Image
        src="/assets/success-lamp.jpg"
        alt="Background"
        fill
        className="object-cover object-center z-0 scale-100"
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
      <div
        ref={textRef}
        className="text-4xl md:text-6xl font-extrabold z-100 text-white text-center"
      >
        🎉 Registration Confirmed! 🎉
      </div>
      <div
        ref={subtitleRef}
        className="text-lg md:text-2xl text-white mt-4 text-center"
      >
        Thank you for registering. Your spot is secured!
      </div>
    </div>
  );
}
