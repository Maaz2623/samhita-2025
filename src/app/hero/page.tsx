import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/hero.jpg"
          alt="Hero Background"
          fill
          className="w-full h-full object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 max-w-3xl text-white space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Welcome to Samhitha
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200">
          Join us for an unforgettable experience full of creativity, talent,
          and fun events!
        </p>
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 mt-4 transition-all"
        >
          Register Now
        </Button>
      </div>
    </section>
  );
};

export default Hero;
