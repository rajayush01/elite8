import React from 'react';
import vid from '../../assets/hero.mp4';

export default function HeroSectionMobi() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden ">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={vid} type="video/mp4" />
      </video>

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-[#151d58] opacity-80" />

      {/* Animated particles overlay */}
      <div className="absolute inset-0 z-10">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      {/* Glowing arc effect */}
      <div className="absolute top-0 left-0 right-0 h-64 opacity-30 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent blur-3xl rounded-full transform -translate-y-1/2" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="mb-8 sm:mb-12 lg:mb-16">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-2 sm:mb-4">
              <span className="inline-block">—</span> From
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-4">
              Imagination to
            </div>
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white">
              Innovation <span className="text-white/80">- We Build It.</span>
            </div>
          </h1>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16 lg:mt-20">
            {/* Left Text */}
            <div className="text-center sm:text-left max-w-xs">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-white mb-2">
                Bring your idea to life
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Got an idea in mind? Let's turn it into reality.
              </p>
            </div>

            {/* Divider - hidden on mobile */}
            <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent" />

            {/* CTA Button */}
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg text-white font-medium text-base sm:text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95">
              <span className="flex items-center gap-2">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 8h10M7 12h10" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Let's Talk
              </span>
              <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}