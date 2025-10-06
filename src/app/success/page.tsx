"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { gsap } from "gsap";

export default function ConfettiOnLoad() {
  const textRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Confetti Side Cannons ---
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

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
      <div
        ref={textRef}
        className="text-4xl md:text-6xl font-extrabold text-purple-700 text-center"
      >
        🎉 Registration Confirmed! 🎉
      </div>
      <div
        ref={subtitleRef}
        className="text-lg md:text-2xl text-gray-700 mt-4 text-center"
      >
        Thank you for registering. Your spot is secured!
      </div>
    </div>
  );
}
