import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Register GSAP plugin if needed (optional based on usage)
// gsap.registerPlugin(...); 

const Loader = ({ isLoading, progress }) => {
  useGSAP(() => {
    if (!isLoading) {
      const tl = gsap.timeline();

      // Animate loader out
      tl.to(".loader-progress", {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      })
        .to(
          ".loader-text",
          {
            y: -20,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          },
          "-=0.1"
        )
        .to(
          ".loader-container",
          {
            y: "-100%",
            duration: 0.8,
            ease: "power3.inOut"
          },
          "-=0.1"
        )
        .set(".loader-container", {
          display: "none"
        });
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loader-container fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111b2d] to-[#111b2d] opacity-80"></div>

      {/* Geometric shapes animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full animate-ping"></div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wider">LOADING EXPERIENCE</h1>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="bg-gray-800 rounded-full h-1 overflow-hidden">
            <div
              className="loader-progress bg-gradient-to-r from-[#bbcbe0] to-[#111b2d]  h-full origin-left transform transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${progress / 100})` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>Loading assets...</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="loader-text">
          <p className="text-gray-300 text-sm animate-pulse">Preparing your 3D experience</p>
        </div>

        {/* Loading indicators */}
        <div className="flex space-x-2 justify-center mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
