"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SolarModel } from "../components/SolarModel";
import { LedModel } from "../components/LedModel";
import { LightModel } from "../components/LightModel";
import { FuseModel } from "../components/FuseModel";
import { MacModel } from "../components/MacModel";
import { MainBoxModel } from "../components/MainBoxModel";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    name: "Solar Panel Pro",
    description: "High-efficiency monocrystalline solar panel",
    features: ["25-year warranty", "22% efficiency", "400W output"],
    color: "#bbcbe0",
    modelType: "solar",
  },
  {
    id: 2,
    name: "LED Floodlight Ultra",
    description: "High-performance LED floodlight for outdoor use",
    features: ["50,000 hour lifespan", "IP65 waterproof", "200W LED"],
    color: "#ff8c42",
    modelType: "led",
  },
  {
    id: 3,
    name: "Smart Light Pole",
    description: "Intelligent street lighting with IoT connectivity",
    features: ["Smart controls", "Energy efficient", "Remote monitoring"],
    color: "#ffa726",
    modelType: "fuse",
  },
  {
    id: 4,
    name: "Solar Panel Max",
    description: "Premium solar panel for maximum energy output",
    features: ["30-year warranty", "24% efficiency", "450W output"],
    color: "#ffb74d",
    modelType: "macbook",
  },
  {
    id: 5,
    name: "LED Floodlight Pro",
    description: "Professional-grade LED lighting solution",
    features: ["60,000 hour lifespan", "IP67 waterproof", "300W LED"],
    color: "#ff7043",
    modelType: "mainbox",
  },
];

// 3D Product Component
function Product3D({ color, modelType, scrollProgress, index, totalProducts }) {
  const groupRef = useRef();
  const modelRef = useRef();
  const prevScrollProgress = useRef(0);
  const rotationSpeed = useRef(0);

  const handleModelReady = (model) => {
    modelRef.current = model;
  };

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Apply rotation based on scroll speed
      modelRef.current.rotation.y += rotationSpeed.current * delta;
      modelRef.current.rotation.x += rotationSpeed.current * delta;
      
      // Gradually slow down rotation when not scrolling
      if (Math.abs(rotationSpeed.current) > 0.001) {
        rotationSpeed.current *= 0.95; // Damping effect
      } else {
        rotationSpeed.current = 0;
      }

      // Zero gravity floating
      const time = state.clock.getElapsedTime();
      if (groupRef.current) {
        groupRef.current.position.y = Math.sin(time * 0.5 + index) * 0.1;
        groupRef.current.position.z = Math.cos(time * 0.4 + index) * 0.1;
      }
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      // Calculate product position based on scroll progress
      const productSpacing = 1 / totalProducts; // Equal spacing for each product
      const productStart = index * productSpacing;
      const productEnd = (index + 1) * productSpacing;
      
      // Normalize scroll progress for this specific product
      const localProgress = Math.max(0, Math.min(1, (scrollProgress - productStart) / (productEnd - productStart)));
      
      // Calculate position (starts from right, moves to left)
      const startX = 15; // Start position (off-screen right)
      const endX = -15; // End position (off-screen left)
      const xPosition = startX + (endX - startX) * localProgress;

      // Calculate scroll speed for rotation
      const scrollDelta = scrollProgress - prevScrollProgress.current;
      prevScrollProgress.current = scrollProgress;
      rotationSpeed.current = scrollDelta * 5;

      // Calculate opacity (fade in/out as it approaches/leaves center)
      let opacity = 0;
      const centerZone = 8; // Distance from center where object is fully visible
      const fadeZone = 2; // Fade zone distance
      
      if (Math.abs(xPosition) <= centerZone) {
        if (Math.abs(xPosition) <= centerZone - fadeZone) {
          opacity = 1;
        } else {
          opacity = (centerZone - Math.abs(xPosition)) / fadeZone;
        }
      }

      // Apply transformations
      gsap.set(groupRef.current.position, { x: xPosition });
      gsap.set(groupRef.current, { opacity: Math.max(0, opacity) });
    }
  }, [scrollProgress, index, totalProducts]);

  const renderModel = () => {
    switch (modelType) {
      case "solar":
        return (
          <SolarModel
            onModelReady={handleModelReady}
            scale={[0.01, 0.01, 0.01]}
          />
        );
      case "led":
        return (
          <LedModel
            onModelReady={handleModelReady}
            scale={[0.5, 0.5, 0.5]}
          />
        );
      case "fuse":
        return (
          <FuseModel
            onModelReady={handleModelReady}
            scale={[0.04, 0.04, 0.04]}
          />
        );
      case "macbook":
        return (
          <MacModel
            onModelReady={handleModelReady}
            scale={[0.02, 0.02, 0.02]}
          />
        );
      case "mainbox":
        return (
          <MainBoxModel
            onModelReady={handleModelReady}
            scale={[0.02, 0.02, 0.02]}
          />
        );
      default:
        return (
          <SolarModel
            onModelReady={handleModelReady}
            scale={[0.01, 0.01, 0.01]}
          />
        );
    }
  };

  return (
    <group ref={groupRef} position={[15, 0, 0]}>
      {renderModel()}
      <pointLight
        position={[0, 2, 2]}
        intensity={0.5}
        color={color}
        distance={5}
        decay={2}
      />
    </group>
  );
}

// 3D Scene Component
function Scene({ scrollProgress }) {
  return (
    <>
      {products.map((product, index) => (
        <Product3D
          key={product.id}
          color={product.color}
          modelType={product.modelType}
          scrollProgress={scrollProgress}
          index={index}
          totalProducts={products.length}
        />
      ))}
      <Environment preset="studio" />
    </>
  );
}

// Main Component
const HorizontalScrollSection = () => {
  const containerRef = useRef(null);
  const infoCardRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(-1);
  const isInitialRender = useRef(true);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Calculate scroll distance based on number of products and desired smoothness
    // Each product needs enough scroll distance for smooth animation
    const scrollDistancePerProduct = 800; // Pixels per product for smooth scrolling
    const totalScrollDistance = products.length * scrollDistancePerProduct;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${totalScrollDistance}px`,
      pin: true,
      scrub: 1.5, // Slightly higher scrub value for smoother feel
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const getCenterProduct = () => {
    const productSpacing = 1 / products.length;
    
    for (let i = 0; i < products.length; i++) {
      const productStart = i * productSpacing;
      const productEnd = (i + 1) * productSpacing;
      const productCenter = (productStart + productEnd) / 2;
      const centerTolerance = productSpacing * 0.3; // 30% of product spacing
      
      if (Math.abs(scrollProgress - productCenter) <= centerTolerance) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    const centerIndex = getCenterProduct();
    if (centerIndex !== currentProductIndex) {
      setCurrentProductIndex(centerIndex);
    }
  }, [scrollProgress, currentProductIndex]);

  useEffect(() => {
    if (currentProductIndex === -1 || !infoCardRef.current) return;

    const cardElements = infoCardRef.current.querySelectorAll('h3, p, ul li, button');
    if (!cardElements || cardElements.length === 0) return;

    if (isInitialRender.current) {
      gsap.set(cardElements, {
        opacity: 0,
        y: 20
      });
      
      animationRef.current = gsap.to(cardElements, {
        duration: 0.7,
        opacity: 1,
        y: 0,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => {
          isInitialRender.current = false;
        }
      });
    } else {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.timeline()
        .to(cardElements, {
          duration: 0.3,
          opacity: 0,
          y: -20,
          ease: "power2.in",
          stagger: 0.05
        })
        .set(cardElements, {
          opacity: 0,
          y: 20
        })
        .to(cardElements, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          stagger: 0.07
        });
    }
  }, [currentProductIndex]);

  return (
    <div className="relative">
      {/* Sticky Container */}
      <div ref={containerRef} className="h-screen">
        <div className="h-full w-full relative">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 50 }}
            className="w-full h-full"
          >
            <Scene scrollProgress={scrollProgress} />
          </Canvas>

          {/* Background Text */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            <h1 className="text-8xl font-bold text-white/5 select-none">
              Smart Energy Solutions
            </h1>
          </div>

          {/* Product Info Card */}
          {currentProductIndex >= 0 && (
            <div 
              ref={infoCardRef}
              className="absolute top-[60%] left-1/2 transform -translate-x-1/2 bg-[#bbcbe04f] backdrop-blur-sm rounded-2xl p-6 w-80 border border-white/20"
            >
              <div className="text-white">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: products[currentProductIndex].color }}
                >
                  {products[currentProductIndex].name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {products[currentProductIndex].description}
                </p>
                <ul className="space-y-2">
                  {products[currentProductIndex].features.map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-400"
                      >
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{
                            backgroundColor: products[currentProductIndex].color,
                          }}
                        />
                        {feature}
                      </li>
                    )
                  )}
                </ul>
                <button
                  className="mt-6 px-6 py-2 rounded-full text-white font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: products[currentProductIndex].color,
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="absolute top-8 right-8 flex space-x-2">
            {products.map((_, index) => {
              const productSpacing = 1 / products.length;
              const productStart = index * productSpacing;
              const productEnd = (index + 1) * productSpacing;
              const productCenter = (productStart + productEnd) / 2;
              const isActive = Math.abs(scrollProgress - productCenter) <= productSpacing * 0.3;

              return (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? "bg-[#bbcbe0] scale-125" : "bg-gray-600"
                  }`}
                />
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
            Scroll to explore →
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;