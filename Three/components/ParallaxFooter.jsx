"use client";
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxFooter() {
  const footerRef = useRef();
  const contentRef = useRef();

  useGSAP(() => {
    gsap.to(contentRef.current, {
      yPercent: 120,
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        // markers: true
      }
    });
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef}
      className="relative w-screen h-dvh bg-[#BBCBE0] text-[#111B2D] mt-auto" // Added mt-auto
    >
      <div className="container mx-auto">
        <div 
          ref={contentRef}
          className="flex flex-col items-center justify-center gap-8 p-12 min-h-[40vh]"
        >
          <div className="text-center">
            <h3 className="text-8xl font-bold mb-4">Let's Work Together</h3>
            <p className="max-w-md mx-auto text-[#111B2D]">
              Interested in our energy solutions? Contact us today.
            </p>
          </div>
          <button className="px-8 py-3 bg-[#111B2D] text-[#BBCBE0] hover:bg-blue-200 hover:text-[#111B2D] rounded-full font-medium transition-colors">
            Contact Us
          </button>
          <div className="text-sm text-[#111B2D] mt-8">
            © {new Date().getFullYear()} Schnell Energy
          </div>
        </div>
      </div>
    </footer>
  );
}