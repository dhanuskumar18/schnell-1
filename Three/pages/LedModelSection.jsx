"use client";

import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { SolarModel } from "../components/SolarModel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { LedModel } from "../components/LedModel";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, SplitText);

const LedModelSection = () => {
  const sectionRef = useRef();
  const titleRef = useRef();
  const canvasRef = useRef();
  const [solarModelRef, setSolarModelRef] = useState(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !titleRef.current || !canvasRef.current)
        return;

      // Fixed rotation values for consistent animation
      const rotationOffsetX = 0.5;
      const rotationOffsetY = 0.1;
      const rotationOffsetZ = 0.15;

      // Initialize SplitText
      const splitTitle = new SplitText(titleRef.current, {
        type: "words,lines",
        wordsClass: "word",
        linesClass: "line",
      });

      // Set initial state (hidden)
      gsap.set(splitTitle.words, {
        opacity: 0,
        y: "100%",
        rotation: 5,
      });

      // Animate words in on scroll
      gsap.to(splitTitle.words, {
        opacity: 1,
        y: "0%",
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none none",
        },
      });

      // Title animation on scroll
      // gsap.fromTo(
      //   titleRef.current,
      //   {
      //     opacity: 0,
      //     y: 50,
      //     scale: 0.9,
      //   },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     scale: 1,
      //     duration: 1,
      //     ease: "power2.out",
      //     scrollTrigger: {
      //       trigger: sectionRef.current,
      //       start: "top 80%",
      //       end: "top 20%",
      //       toggleActions: "play none none reverse",
      //     },
      //   }
      // );

      // Canvas container animation
      gsap.fromTo(
        canvasRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Solar panel scroll animation
      let solarAnimation;
      if (solarModelRef) {
        // Set initial position and rotation
        gsap.set(solarModelRef.position, { y: -150, x: -50, z: 0 });
        gsap.set(solarModelRef.rotation, {
          x: -2.356 + rotationOffsetX,
          y: 15 + rotationOffsetY,
          z: 0.7 + rotationOffsetZ,
        });

        // Create scroll-triggered timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 30%",
            end: "bottom 50%",
            scrub: 1.5,
            // markers: true,

            onUpdate: (self) => {
              const progress = self.progress;

              // Vertical movement with easing curve
              const yPosition = gsap.utils.interpolate(-150, 150, progress);
              const xPosition = gsap.utils.interpolate(
                100,
                -50,
                Math.sin(progress * Math.PI)
              );

              solarModelRef.position.y = yPosition;
              solarModelRef.position.x = xPosition;

              // Dynamic rotation during scroll
              solarModelRef.rotation.x =
                -2.356 +
                rotationOffsetX +
                Math.sin(progress * Math.PI * 2) * 0.1;
              solarModelRef.rotation.y =
                10 + rotationOffsetY + Math.cos(progress * Math.PI * 1) * 1;
              solarModelRef.rotation.z =
                0.3 + rotationOffsetZ + Math.sin(progress * Math.PI * 2) * 0.8;
            },
          },
        });

        solarAnimation = tl;
      }

      // Background parallax effect
      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // // markers: true
        },
      });

      // Text color transition on scroll
      const spans = titleRef.current.querySelectorAll("span");
      spans.forEach((span, index) => {
        gsap.to(span, {
          color: "#ffffff",
          duration: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 40%",
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(span, {
                  color: "#ffffff",
                  duration: 0.3,
                  delay: index * 0.1,
                });
              } else {
                gsap.to(span, {
                  color: "#BCCBE0",
                  duration: 0.3,
                  delay: index * 0.1,
                });
              }
            },
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [solarModelRef] }
  );

  return (
    <div
      ref={sectionRef}
      className="w-screen h-dvh flex flex-col justify-center items-center px-8 relative overflow-hidden"
      // style={{
      //   background: "linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.8) 100%)"
      // }}
    >
      <div ref={canvasRef} className="w-full h-full absolute z-20 inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 0, 300], fov: 60 }}
          gl={{ antialias: true }}
        >
          {/* Ambient light with scroll-based intensity */}
          <ambientLight intensity={1} />

          {/* Directional light for shadows */}
          <directionalLight
            position={[-20, -560, 0]}
            intensity={15}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={500}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />

          <LedModel onModelReady={setSolarModelRef} />
        </Canvas>
      </div>
      <h2
        ref={titleRef}
        className="text-4xl text-center font-bold text-white max-w-5xl mb-8 z-10 relative"
      >
        {/* <span className="text-[#BCCBE0]">LUMINODES</span> is our flagship smart
        lighting technology, designed to deliver unparalleled energy savings
        while providing high-quality lighting. Whether it's a commercial
        building, industrial complex, or smart city installation,{" "}
        <span className="text-[#BCCBE0]">LUMINODES</span> adjusts lighting
        intensity based on real-time environmental data, ensuring optimal
        lighting at{" "}
        <span className="text-[#BCCBE0]">the lowest energy cost.</span> */}
        <span className="text-[#94bbf3] font-bold">LUMINODES</span> is our flagship <span className="text-[#94bbf3] font-bold">smart lighting technology,</span> designed to deliver
        unparalleled energy savings while providing <span className="text-[#94bbf3] font-bold">high-quality lighting.</span>
        Whether it's a commercial building, industrial complex, or smart city
        installation, LUMINODES adjusts lighting intensity based on real-time
        environmental data, ensuring <span className="text-[#94bbf3] font-bold">optimal lighting at the lowest energy cost.</span>
      </h2>
    </div>
  );
};

export default LedModelSection;
