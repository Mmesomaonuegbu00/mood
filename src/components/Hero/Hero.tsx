'use client';
/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [dots, setDots] = useState<
    { top: number; left: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const newDots = Array.from({ length: 30 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="relative pt-[14vh]">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 flex justify-center items-center -z-10 pointer-events-none mt-[14rem]">
        <div className="absolute inset-0 bg-black opacity-30 blur-[100px]" />
        <div className="w-[600px] h-[500px] rounded-full bg-blue-300 opacity-10 blur-[120px]" />
      </div>

      {/* Dots Layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none w-[80%] mx-auto">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-[5px] h-[5px] bg-white rounded-full"
            style={{
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              opacity: dot.opacity,
              filter: 'blur(1px) brightness(1.5)',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 justify-between">
          <div className="flex flex-col space-y-4 lg:col-span-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl capitalize font-bold">
              Track Your Mood with Us with{' '}
              <span className="bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent">
                Mood Tracker
              </span>
            </h1>
            <p className="text-base text-gray-300 pt-4 max-w-[500px]">
              Discover uplifting words, inspiring thoughts, and little things
              that can brighten your day — from motivational messages and daily
              affirmations to fun surprises and mindful moments designed to lift
              your spirits.
            </p>
            <div>
              <button
                onClick={() => signIn()}
                className="text-gray-900 py-2 px-8 rounded-md font-bold flex items-center gap-2 shadow-md cursor-pointer"
                style={{
                  background:
                    'linear-gradient(to right, #bfdbfe, #ffffff, #fbcfe8)',
                }}
              >
                Get Started
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* Image */}
          <img
            src="/m5.png"
            alt="Mood Tracker Illustration"
            className="w-full lg:col-span-7 flex justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
