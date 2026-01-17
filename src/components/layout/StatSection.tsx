import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="inline-block">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl w-full">
        <div className="mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Some numbers we're proud of
          </h2>
          <p className="text-gray-400 text-xl md:text-2xl">
            — not for bragging, but because they reflect real partnerships and real results.
          </p>
        </div>

        <div className="mb-12">
          <p className="text-white text-lg font-semibold">• Let's work together</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Clients */}
          <div className="text-center md:text-left font-['Brush_Script_MT',cursive] ">
            <div className="text-white text-7xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              <AnimatedCounter end={35} suffix="+" />
            </div>
            <h3 className="text-white text-6xl italic font-semibold mb-2">Clients</h3>
            <p className="text-gray-400 text-lg uppercase tracking-wider">From 8 countries</p>
          </div>

          {/* Projects */}
          <div className="text-center md:text-left font-['Brush_Script_MT',cursive]">
            <div className="text-white text-7xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              <AnimatedCounter end={120} suffix="+" />
            </div>
            <h3 className="text-white text-6xl font-semibold mb-2">Projects</h3>
            <p className="text-gray-400 text-lg uppercase tracking-wider">Launched and loved</p>
          </div>

          {/* Repeat client rate */}
          <div className="text-center md:text-left font-['Brush_Script_MT',cursive]">
            <div className="text-white text-7xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
              <AnimatedCounter end={98} suffix="%" />
            </div>
            <h3 className="text-white text-6xl font-semibold mb-2">Repeat client rate</h3>
            <p className="text-gray-400 text-lg uppercase tracking-wider">Yes, really</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;