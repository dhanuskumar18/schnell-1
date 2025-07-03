"use client";

import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { LampModel } from "../components/LampModel";
import { OrbitControls, Text, Html, Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const [lampRotation, setLampRotation] = useState(0);
  const [lampScale, setLampScale] = useState(1);
  const [cameraPosition, setCameraPosition] = useState(150);

  // Replace useEffect with useGSAP
  useGSAP(
    () => {
      const heroElement = heroRef.current;

      if (heroElement) {
        gsap.set(heroElement, {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          scale: 1,
        });

        gsap.to(heroElement, {
          clipPath: "inset(10% 10% 10% 10% round 50px)",
          scrollTrigger: {
            trigger: heroElement,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
          },
        });

        gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: heroElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
              onUpdate: (self) => {
                setLampRotation(self.progress * Math.PI * 2);
                setLampScale(1 - self.progress * 0.3);
                setCameraPosition(150 + self.progress * 30);
              },
            },
          }
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="h-screen w-screen bg-[#BBCBE0] relative">
      <header className={`fixed top-0 left-0 right-4 z-60 transition-all`}>
        <div className="container mx-auto px-6 py-6">
          <Link href="/">
            <Image
              src="/Mask_group.png"
              alt="Schnell Energy"
              width={120}
              height={120}
              priority
              className="h-16 w-auto"
            />
          </Link>
        </div>
      </header>
      {/* Text overlay positioned absolutely */}
      <div className="absolute inset-0 z-10 flex flex-row justify-between items-center px-60 text-left">
        <h1 className="text-6xl font-bold text-[#192947] max-w-2xl leading-tight">
          The Power to Change - Is Already Here.
        </h1>
        <p className="text-xl text-[#192947] max-w-xl opacity-80 text-right">
          Schnell Energy delivers smart, sustainable energy solutions powered by
          technology, performance, and purpose.
        </p>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 0, cameraPosition], fov: 60 }}
        gl={{ antialias: true }}
      >
        {/* Ambient light */}
        <ambientLight intensity={5} />

        {/* Directional light for shadows */}
        <directionalLight
          position={[10, 10, 10]}
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
        {/* <Environment preset="city" /> */}

        {/* Ground plane to receive shadows */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -40, 0]}
          receiveShadow
        >
          <planeGeometry args={[1000, 400]} />
          <meshStandardMaterial color="#4c5e7d" />
        </mesh>

        <LampModel
          rotation={[0, lampRotation, 0]}
          scale={lampScale}
          position={[0, -40, 0]}
        />

        {/* Alternative: 3D Text inside Canvas if you prefer */}
        {/* 
        <Text
          fontSize={40}
          color="#4C5E7D"
          anchorX="center"
          anchorY="middle"
          position={[0, 10, 0]}
        >
          Schnell Energy
        </Text>
        */}
      </Canvas>
    </div>
  );
};

export default Hero;
