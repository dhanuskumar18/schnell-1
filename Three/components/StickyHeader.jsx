"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const arrowRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initial animation setup
    gsap.set(menuItemsRef.current, { 
      opacity: 0, 
      y: 20, 
      scale: 0.8 
    });
    
    gsap.set(menuRef.current, { 
      opacity: 0,
      scale: 0.8,
      transformOrigin: "bottom right"
    });
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Opening animation
      setIsMenuOpen(true);
      
      // Animate menu container
      gsap.to(menuRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });

      // Animate arrow rotation
      gsap.to(arrowRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: "power2.out"
      });

      // Stagger animate menu items
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.1,
        ease: "back.out(1.7)"
      });
    } else {
      // Closing animation
      gsap.to(menuItemsRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: 0.2,
        stagger: 0.05,
        ease: "power2.in"
      });

      gsap.to(arrowRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => setIsMenuOpen(false)
      });
    }
  };

  const handleMenuItemHover = (index, isEntering) => {
    const item = menuItemsRef.current[index];
    if (isEntering) {
      gsap.to(item, {
        scale: 1.1,
        x: -10,
        duration: 0.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(item, {
        scale: 1,
        x: 0,
        duration: 0.2,
        ease: "power2.out"
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 transition-all`}>
      <div className="container mx-auto px-6 py-6">
        <Link href="/">
          <Image 
            src="/schnell-logo-new.png"
            alt="Schnell Energy"
            width={120}
            height={120}
            priority
            className="h-16 w-auto"
          />
        </Link>
      </div>

      {/* Navigation Menu - Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        {/* Menu Items */}
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="mb-4 flex flex-col space-y-3"
          >
            {['About', 'Products', 'Contact'].map((item, index) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                ref={el => menuItemsRef.current[index] = el}
                className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 text-gray-800 font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-center min-w-[120px]"
                onMouseEnter={() => handleMenuItemHover(index, true)}
                onMouseLeave={() => handleMenuItemHover(index, false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        {/* Menu Toggle Button */}
        {/* <button
          onClick={toggleMenu}
          className="bg-[#111b2d] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <div className="flex items-center space-x-2">
            <span className="font-medium">Menu</span>
            <svg
              ref={arrowRef}
              className="w-5 h-5 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button> */}
      </div>
    </header>
  );
}