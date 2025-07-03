import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FourthSection = () => {
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        circleRef.current,
        { scale: 0.05 },
        {
          scale: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        circle2Ref.current,
        { scale: 0.08 },
        {
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
      gsap.fromTo(
        circle3Ref.current,
        { scale: 0.12 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          transformOrigin: "50% 50%",
          ease: "power1.inOut",
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[100vh] bg-white overflow-hidden"
    >
      {/* Radar Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          ref={circle3Ref}
          className="absolute rounded-full bg-[#111b2d] opacity-70"
          style={{
            width: "300vw",
            height: "300vw",
            filter: "blur(8px)",
          }}
        />
        <div
          ref={circleRef}
          className="absolute rounded-full bg-[#111b2d] opacity-80"
          style={{
            width: "220vw",
            height: "220vw",
            filter: "blur(4px)",
          }}
        />
        <div
          ref={circle2Ref}
          className="absolute rounded-full bg-[#111b2d] opacity-100"
          style={{
            width: "160vw",
            height: "160vw",
            filter: "blur(0px)",
          }}
        />
      </div>
      {/* Centered Text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4">
        <h1 className="text-8xl font-semibold text-white mb-12 drop-shadow-lg">
          Smart City Lighting
        </h1>
        <p className="text-base md:text-xl text-white drop-shadow-lg mb-6 leading-relaxed">
          Schnell has evolved as a one-stop Smart City Lighting Solution provider to make all things Smart so as to enable you to track, monitor, and control your assets. We deliver multi-faceted products and solutions ranging from wiring-harness to a wide range of remote monitoring solutions & highway street light controller.
        </p>
        <p className="text-base md:text-xl text-white drop-shadow-lg leading-relaxed">
          Schnell is considered the professional market leader in Street Light Controllers, Remote Controlled Street Light Monitoring and works across technologies. Remotely managing more than 100MW load including lakhs of street lamps, tens of thousands of pumps, solar pumps, and domestic solar roof-tops.
        </p>
      </div>
    </section>
  );
};

export default FourthSection;
