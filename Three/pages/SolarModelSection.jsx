"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Float } from "@react-three/drei"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { SolarModel } from "../components/SolarModel"
import { LedModel } from "../components/LedModel"
import { FuseModel } from "../components/FuseModel"
import { MacModel } from "../components/MacModel"

gsap.registerPlugin(ScrollTrigger)

const HorizontalScrollSection = () => {
  const component = useRef(null)
  const slider = useRef(null)
  const [currentPanel, setCurrentPanel] = useState(0)

  const panelContent = [
    {
      title: "Solar Energy",
      subtitle: "Harness the Power of the Sun",
      description:
        "Cutting-edge photovoltaic technology that converts sunlight into clean, renewable energy with exceptional efficiency and durability.",
      features: ["Sustainable", "Efficient", "Future-Ready"],
      color: "from-yellow-500/20 to-orange-600/20",
      borderColor: "border-yellow-500/30",
      titleColor: "text-yellow-400",
      dotColor: "bg-yellow-400",
    },
    {
      title: "LED Innovation",
      subtitle: "Brilliant Illumination Technology",
      description:
        "Next-generation LED technology delivering superior brightness while reducing environmental impact through energy-efficient solutions.",
      features: ["Ultra-Bright", "Long-Lasting", "Energy-Efficient"],
      color: "from-blue-500/20 to-purple-600/20",
      borderColor: "border-blue-400/30",
      titleColor: "text-blue-400",
      dotColor: "bg-blue-400",
    },
    {
      title: "Safety First",
      subtitle: "Advanced Circuit Protection",
      description:
        "Intelligent fuse technology providing reliable circuit protection and preventing electrical overloads across all applications.",
      features: ["99.9% Reliable", "24/7 Protection", "Smart Detection"],
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-400/30",
      titleColor: "text-red-400",
      dotColor: "bg-red-400",
    },
    {
      title: "Premium Computing",
      subtitle: "Excellence in Every Detail",
      description:
        "Seamless integration of hardware and software excellence with unmatched performance and elegant design.",
      features: ["Lightning-Fast", "Stunning Clarity", "Intuitive Design"],
      color: "from-gray-500/20 to-indigo-500/20",
      borderColor: "border-gray-400/30",
      titleColor: "text-gray-300",
      dotColor: "bg-gray-300",
    },
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel")
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.4 },
            ease: "power1.inOut",
          },
          end: () => "+=" + (slider.current?.offsetWidth || 0),
          onUpdate: (self) => {
            const progress = self.progress
            const newPanel = Math.round(progress * (panels.length - 1))
            setCurrentPanel(newPanel)
          },
        },
      })
    }, component)

    return () => ctx.revert()
  }, [])

  const current = panelContent[currentPanel]

  return (
    <div ref={component} className="bg-[#111b2d] text-white font-serif overflow-hidden">
      {/* First Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl mb-6 font-bold">Innovative Technology Showcase</h1>
        <h2 className="text-2xl text-gray-300">Scroll to explore our cutting-edge solutions</h2>
      </section>

      {/* Horizontal Slider */}
      <div className="relative">
        <div ref={slider} className="flex w-[400vw] h-screen">
          {/* Panel 1 - Solar Model */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <Canvas shadows camera={{ position: [0, 0, 400], fov: 60 }} gl={{ antialias: true }}>
              <ambientLight intensity={2} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <SolarModel />
              </Float>
            </Canvas>
          </div>

          {/* Panel 2 - LED Model */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <Canvas shadows camera={{ position: [0, 0, 300], fov: 60 }} gl={{ antialias: true }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
                <LedModel />
              </Float>
            </Canvas>
          </div>

          {/* Panel 3 - Fuse Model */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <Canvas shadows camera={{ position: [0, 0, 300], fov: 60 }} gl={{ antialias: true }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
                <FuseModel />
              </Float>
            </Canvas>
          </div>

          {/* Panel 4 - Mac Model */}
          <div className="panel flex-shrink-0 w-screen h-screen flex items-center justify-center">
            <Canvas shadows camera={{ position: [0, 0, 300], fov: 60 }} gl={{ antialias: true }}>
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Environment preset="city" />
              <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.3}>
                <MacModel />
              </Float>
            </Canvas>
          </div>
        </div>

        {/* Dynamic Content Card - Fixed and Centered */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
          <div
            className={`bg-gradient-to-r ${current.color} backdrop-blur-xl rounded-3xl p-8 border ${current.borderColor} shadow-2xl transition-all duration-500 ease-in-out`}
          >
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className={`w-3 h-3 ${current.dotColor} rounded-full mr-3 shadow-lg`}></div>
                <h3 className={`text-2xl font-bold ${current.titleColor}`}>{current.title}</h3>
              </div>

              <h4 className="text-lg text-gray-200 mb-4 font-medium">{current.subtitle}</h4>

              <p className="text-gray-200 leading-relaxed text-base mb-6">{current.description}</p>

              <div className="flex justify-center gap-3 flex-wrap">
                {current.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-200 border border-white/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

    
    </div>
  )
}

export default HorizontalScrollSection
