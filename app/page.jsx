"use client";

import { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Hero from "@/Three/pages/Hero";
import SolarModelSection from "@/Three/pages/SolarModelSection";
import LedModelSection from "@/Three/pages/LedModelSection";
import MacbookModelSection from "@/Three/pages/MacbookModelSection";
import ParallaxFooter from "@/Three/components/ParallaxFooter";
import Loader from "@/Three/components/Loader";
import HorizondalScrollSection from "@/Three/pages/HorizondalScrollSection";
import ThirdSection from "@/Three/pages/ThirdSection";
import FourthSection from "@/Three/pages/FourthSection";

// Mock components for demonstration
// const Hero = () => <div className="h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex items-center justify-center text-white text-4xl">Hero Section</div>;
// const SolarModelSection = () => <div className="h-screen bg-gradient-to-b from-yellow-400 to-orange-500 flex items-center justify-center text-white text-3xl">Solar Model Section</div>;
// const LedModelSection = () => <div className="h-screen bg-gradient-to-b from-green-400 to-blue-500 flex items-center justify-center text-white text-3xl">LED Model Section</div>;
// const MacbookModelSection = () => <div className="h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center text-white text-3xl">MacBook Model Section</div>;
// const ParallaxFooter = () => <div className="h-96 bg-black flex items-center justify-center text-white text-2xl">Footer</div>;

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading process
    const loadingSteps = [
      { message: "Initializing...", progress: 10 },
      { message: "Loading 3D models...", progress: 30 },
      { message: "Setting up animations...", progress: 50 },
      { message: "Preparing scroll effects...", progress: 70 },
      { message: "Optimizing performance...", progress: 90 },
      { message: "Ready!", progress: 100 },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 500);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    if (!isLoading) {
      // Initialize ScrollSmoother after loading
      ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();

      // Animate content in
      gsap.fromTo(
        "#smooth-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.3 }
      );
    }
  }, [isLoading]);

  return (
    <>
       <Loader isLoading={isLoading} progress={loadingProgress} /> 

     {!isLoading && ( 
        <div id="smooth-wrapper" className="fixed inset-0 overflow-hidden">
          <div id="smooth-content" className="will-change-transform">
            <Hero />
            <HorizondalScrollSection />
            <ThirdSection />
            <FourthSection />
            {/* <SolarModelSection /> */}
            {/* <LedModelSection /> */}
            {/* <MacbookModelSection /> */}
            <ParallaxFooter />
            
          </div>
        </div>
       )} 
    </>
  );
}
