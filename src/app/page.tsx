"use client";

import { Cairo } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { gsap } from "gsap";
import { ChevronRightIcon } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

const Hero = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2, defaults: { ease: "power3.out" } });

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.6, y: -30 },
      { opacity: 1, scale: 1, y: 0, duration: 1 }
    );

    // Title animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, delay: 1.5, duration: 1 },
      "-=0.4"
    );

    // Button animation (pop effect)
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.3"
    );
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center brightness-[0.55]"
          priority
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl text-white space-y-6">
        {/* Logo + Title */}
        <div className="flex flex-col items-center justify-center gap-y-4">
          <div
            ref={logoRef}
            className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36"
          >
            <Image
              src="/assets/samhitha-icon.png"
              alt="Samhitha Icon"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            />
          </div>

          <h1
            // ref={titleRef}
            className={`ext-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg ${cairo.className}`}
          >
            <TextAnimate
              animation="slideUp"
              duration={1.5}
              delay={1}
              by="character"
            >
              Samhitha 2025
            </TextAnimate>
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-2xl text-background/70 leading-relaxed"
        >
          Celebrate innovation, creativity, and talent — join us for a festival
          of ideas, fun, and unforgettable memories!
        </p>

        {/* CTA */}
        <div ref={buttonRef} className="flex justify-center pt-4">
          <Button
            size="lg"
            asChild
            variant="secondary"
            className="px-10 bg-violet-900/70 text-white py-5 rounded-full text-lg font-medium hover:bg-violet-700 cursor-pointer shadow-lg transition-transform hover:scale-110 hover:shadow-violet-500/30"
          >
            <Link href="/register">
              Register Now
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-10 left-10 w-72 h-72 bg-indigo-600/10 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full animate-pulse delay-700"></div>
      </div>
    </section>
  );
};

export default Hero;
