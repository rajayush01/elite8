import React, { useEffect, useState, useRef } from 'react';
import vid from '../../assets/hero.mp4';

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  // --- Galaxy Canvas Animation ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const canvas = document.getElementById('galaxyCanvas');
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.2;
        this.speedX = (Math.random() - 0.5) * 0.08;
        this.speedY = (Math.random() - 0.5) * 0.08;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.twinkleSpeed = Math.random() * 0.015 + 0.003;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.twinklePhase += this.twinkleSpeed;
        this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.currentOpacity * 0.5})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.currentOpacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.sort((a, b) => a.size - b.size);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  // --- Scroll Tracking ---
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Easing and Animation Values ---
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const firstTextOpacity = Math.max(0, 1 - scrollProgress * 2);
  const secondTextProgress = Math.max(0, (scrollProgress - 0.5) * 2);
  const smoothSecondTextProgress = easeInOutCubic(secondTextProgress);

  // Video fades out near the end of the scroll
  const videoOpacity = scrollProgress < 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.2);

  // --- Text Reveal Logic ---
  const text = 'We craft sleek, scalable websites, apps, and platforms — built to perform, designed to inspire, and made for everyone.';
  const words = text.split(' ');

  const getWordOpacity = (wordIndex, charIndexInWord) => {
    const totalChars = text.length;
    const currentCharIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndexInWord;

    if (smoothSecondTextProgress < 0.5) return 0.2;

    const colorProgress = (smoothSecondTextProgress - 0.5) * 2;
    const charsToHighlight = colorProgress * totalChars;
    const distance = currentCharIndex - charsToHighlight;

    if (distance > 5) return 0.2;
    if (distance > 0) return 0.2 + (1 - distance / 5) * 0.8;
    return 1;
  };

  const shapeRotation = smoothSecondTextProgress * 360;
  const shapeScale = 0.7 + smoothSecondTextProgress * 0.3;

  return (
    <div ref={sectionRef} className="relative w-full" style={{ height: '200vh' }}>
      {/* Video Background Layer */}
      <div
        className="fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: videoOpacity,
          pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={vid} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Galaxy Canvas Layer */}
      <div
        className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-300"
        style={{ opacity: videoOpacity }}
      >
        <canvas id="galaxyCanvas" className="w-full h-full opacity-40 bg-[#151d58]"></canvas>
      </div>

      {/* Section 1: Imagination to Innovation */}
      <div
        className="sticky top-0 h-screen flex flex-col px-6 md:px-20 z-10"
        style={{
          opacity: firstTextOpacity,
          transform: `translateX(${isLoaded ? 0 : -100}px) translateY(-${scrollProgress * 50}px)`,
          transition: isLoaded ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out' : 'none',
          pointerEvents: firstTextOpacity === 0 ? 'none' : 'auto',
        }}
      >
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl w-full text-center flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-tight mt-10">
              <span
                className="block mb-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: `translateX(${isLoaded ? 0 : -50}px)`,
                  transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }}
              >
                <span className="inline-block w-16 md:w-24 h-0.5 bg-white/80 mr-4 mb-2 md:mb-4"></span>
                From
              </span>
              <span
                className="block mb-2"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: `translateX(${isLoaded ? 0 : -50}px)`,
                  transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
                }}
              >
                <span className="text-purple-400 font-normal">Imagination </span>to
              </span>
              <span
                className="block"
                style={{
                  opacity: isLoaded ? 1 : 0,
                  transform: `translateX(${isLoaded ? 0 : -50}px)`,
                  transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
                }}
              >
                <span className="text-purple-400 font-normal">Innovation</span> - We Build It.
              </span>
            </h1>
          </div>
        </div>

        {/* CTA Bottom Bar */}
        <div
          className="mb-12 md:mb-16"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: `translateY(${isLoaded ? 0 : 20}px)`,
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="text-white">
              <div className="text-xl md:text-2xl font-light mb-2">Bring your idea to life</div>
              <div className="text-sm md:text-base text-gray-400 font-light">Got an idea in mind? Let’s turn it into reality.</div>
            </div>
            <div className="w-20 md:w-32 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
            <button className="bg-purple-600 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 group">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10H21M7 3V6M17 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Let's Talk
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Character-by-character reveal */}
      <div
        className="relative z-20 min-h-screen flex items-center justify-center px-6 md:px-20"
        style={{
          opacity: smoothSecondTextProgress,
          transform: `translateY(${(1 - smoothSecondTextProgress) * 80}px)`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          pointerEvents: secondTextProgress === 0 ? 'none' : 'auto',
        }}
      >
        <div className="max-w-6xl w-full flex items-center justify-between gap-12">
          <div
            ref={textRef}
            className="flex-1"
            style={{
              opacity: smoothSecondTextProgress,
              transform: `translateX(${(1 - smoothSecondTextProgress) * -60}px)`,
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-3 mb-2 whitespace-nowrap">
                  {word.split('').map((char, charIndex) => {
                    const opacity = getWordOpacity(wordIndex, charIndex);
                    return (
                      <span
                        key={charIndex}
                        style={{
                          color: 'white',
                          opacity: opacity,
                          transform: `translateY(${(1 - opacity) * 20}px)`,
                          display: 'inline-block',
                          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              ))}
            </p>
          </div>

          {/* Decorative SVG Shape */}
          <div
            className="hidden lg:block"
            style={{
              opacity: smoothSecondTextProgress,
              transform: `translateX(${(1 - smoothSecondTextProgress) * 120}px) scale(${shapeScale}) rotate(${shapeRotation * 0.3}deg)`,
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              style={{ filter: `drop-shadow(0 0 ${20 + smoothSecondTextProgress * 20}px rgba(255, 107, 53, 0.4))` }}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ff6b35', stopOpacity: 0.8 }} />
                  <stop offset="100%" style={{ stopColor: '#f7931e', stopOpacity: 0.9 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <polygon
                points="150,50 250,100 230,180 150,220 70,180 50,100"
                fill="url(#grad1)"
                opacity={0.7 + smoothSecondTextProgress * 0.2}
                filter="url(#glow)"
              />
              {/* Floating animated circles within the SVG */}
              {[
                { cx: 180, cy: 80, r: 4, dur: '2s' },
                { cx: 120, cy: 90, r: 3, dur: '3s' },
                { cx: 200, cy: 140, r: 3, dur: '2.5s' },
              ].map((circle, i) => (
                <circle key={i} cx={circle.cx} cy={circle.cy} r={circle.r} fill="white" opacity={0.5}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur={circle.dur} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
