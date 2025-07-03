"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const cards = [
  {
    id: 1,
    title: "LIGHTING SOLUTION",
    subtitle: "STREET LIGHTING, SMART POLES",
    description: "Empowering cities with energy-efficient street lighting and intelligent smart poles for enhanced safety, sustainability, and connectivity.",
    color: "bg-gradient-to-br from-[#111b2d] to-[#1a2942]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "SMART SYSTEM",
    subtitle: "INDUSTRIAL, AGRI, HOME",
    description: "Integrated IoT solutions for industrial automation, smart agriculture, and connected homes—enabling real-time monitoring, control, and optimization.",
    color: "bg-gradient-to-br from-[#1a2942] to-[#233857]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "IT & WEB",
    subtitle: "SAAS, WEB & MOBILE APPS",
    description: "Custom software development for SaaS, web, and mobile platforms—driving digital transformation and seamless user experiences for businesses and communities.",
    color: "bg-gradient-to-br from-[#233857] to-[#2c466c]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
  }
]

export default function ThirdSection() {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const imageRefs = useRef([])
  const contentRefs = useRef([])
  const titleRefs = useRef([])
  const subtitleRefs = useRef([])
  const descriptionRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    const cardElements = cardsRef.current

    if (!container || cardElements.length === 0) return

    // Set initial positions
    cardElements.forEach((card, index) => {
      gsap.set(card, {
        position: "sticky",
        top: `${index * 2}rem`,
        zIndex: cardElements.length - index,
      })

      // Set up hover animations for each card
      const imageOverlay = imageRefs.current[index]
      const content = contentRefs.current[index]
      const title = titleRefs.current[index]
      const subtitle = subtitleRefs.current[index]
      const description = descriptionRefs.current[index]

      // Create hover timeline
      const hoverTimeline = gsap.timeline({ paused: true })
      
      hoverTimeline
        .to(imageOverlay, {
          opacity: 1,
          scale: 1.15,
          duration: 1,
          ease: "power2.out"
        })
        .to(content, {
          backgroundColor: "rgba(17, 27, 45, 0.75)",
          backdropFilter: "blur(12px)",
          duration: 0.75,
          ease: "power2.out"
        }, 0)
        .to(title, {
          y: -10,
          scale: 1.05,
          duration: 0.75,
          ease: "back.out(1.7)"
        }, 0.1)
        .to(subtitle, {
          y: -5,
          x: 20,
          duration: 0.75,
          ease: "back.out(1.7)"
        }, 0.2)
        .to(description, {
          y: 10,
          opacity: 0.95,
          duration: 0.75,
          ease: "power2.out"
        }, 0.3)

      // Add hover event listeners
      card.addEventListener("mouseenter", () => hoverTimeline.play())
      card.addEventListener("mouseleave", () => hoverTimeline.reverse())

      // Add mousemove parallax effect
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const percentX = (mouseX - centerX) / centerX
        const percentY = (mouseY - centerY) / centerY

        gsap.to(card, {
          rotateY: percentX * 7.5,
          rotateX: -percentY * 7.5,
          duration: 0.75,
          ease: "power2.out"
        })

        gsap.to(imageOverlay, {
          x: percentX * 25,
          y: percentY * 25,
          duration: 0.75,
          ease: "power2.out"
        })
      })

      // Reset on mouse leave
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "power2.out"
        })
        gsap.to(imageOverlay, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "power2.out"
        })
      })
    })

    // Create scroll animations for each card
    cardElements.forEach((card, index) => {
      const isLast = index === cardElements.length - 1

      if (!isLast) {
        gsap.to(card, {
          scale: 0.8,
          opacity: 0.5,
          filter: "blur(2px)",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: false,
            onUpdate: (self) => {
              const progress = self.progress

              gsap.set(card, {
                y: -progress * 100,
                rotationX: progress * 15,
                transformOrigin: "center bottom",
              })

              if (progress > 0.1) {
                gsap.set(card, {
                  zIndex: 1,
                  pointerEvents: "none",
                })
              } else {
                gsap.set(card, {
                  zIndex: cardElements.length - index,
                  pointerEvents: "auto",
                })
              }
            },
          },
        })
      } else {
        gsap.set(card, {
          zIndex: cardElements.length,
          pointerEvents: "auto",
        })
      }
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      cardElements.forEach(card => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
        card.removeEventListener("mousemove", () => {})
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#bbcbe0] perspective-1000">
      <section ref={containerRef} className="relative">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#111b2d] mb-6">
              Our Partners For Smart City and IOT
            </h2>
          </div>

          <div className="space-y-8">
            {cards.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => cardsRef.current[index] = el}
                className={`${card.color} ${card.textColor} rounded-3xl shadow-2xl min-h-[500px] relative overflow-hidden cursor-pointer transform-gpu`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Background Image Overlay */}
                <div 
                  ref={el => imageRefs.current[index] = el}
                  className="absolute inset-0 w-full h-full opacity-0 scale-110"
                >
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div 
                  ref={el => contentRefs.current[index] = el}
                  className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full backdrop-blur-0"
                >
                  <div 
                    ref={el => subtitleRefs.current[index] = el}
                    className="text-sm font-semibold mb-4 opacity-80"
                  >
                    {card.subtitle}
                  </div>
                  <h3 
                    ref={el => titleRefs.current[index] = el}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    {card.title}
                  </h3>
                  <p 
                    ref={el => descriptionRefs.current[index] = el}
                    className="text-lg md:text-xl opacity-90 max-w-2xl leading-relaxed"
                  >
                    {card.description}
                  </p>
                  <div className="mt-8">
                    <button className="bg-white/20 backdrop-blur-sm border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
