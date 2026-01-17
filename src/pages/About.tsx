import React, { useState, useEffect } from 'react';
import { Award, Users, Target, Zap, TrendingUp, Heart, Code, Rocket, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  const stats = [
    { number: '150+', label: 'Projects Delivered', icon: Award },
    { number: '50+', label: 'Happy Clients', icon: Users },
    { number: '8+', label: 'Years Experience', icon: TrendingUp },
    { number: '98%', label: 'Client Satisfaction', icon: Heart }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every pixel, every line of code, and every client interaction.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Staying ahead of trends and leveraging cutting-edge technologies to deliver exceptional results.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients as partners to understand their vision and bring it to life.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent communication, honest feedback, and ethical practices in everything we do.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      specialty: 'Digital Strategy'
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      specialty: 'Brand Design'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      specialty: 'Full Stack Development'
    },
    {
      name: 'David Kim',
      role: 'Marketing Strategist',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      specialty: 'Digital Marketing'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(100px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.8); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        >
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-40 right-10 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/2 w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 relative px-2 mt-10">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent inline-block animate-pulse">
                Crafting Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block">
                Excellence
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              We're not just a digital agency—we're your partners in innovation, 
              transforming visions into powerful digital experiences.
            </p>
          </div>

          {/* Stats Grid with Animation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={i}
                  className="relative group"
                  style={{ 
                    animation: `float ${3 + i}s infinite ease-in-out`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/60 transition-all duration-300 overflow-hidden">
                    <div className="shimmer absolute inset-0" />
                    <Icon className="w-7 h-7 sm:w-10 sm:h-10 text-purple-400 mb-3 sm:mb-4 relative z-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 relative z-10">{stat.number}</div>
                    <div className="text-gray-400 text-xs sm:text-sm relative z-10">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ animation: 'pulse-glow 2s infinite' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl sm:rounded-3xl shadow-2xl relative z-10 w-full transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                <Code className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                <span className="text-purple-300 text-xs sm:text-sm font-medium">Our Journey</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">Our Story</h2>
              <div className="space-y-3 sm:space-y-4 text-gray-400 text-base sm:text-lg">
                <p className="leading-relaxed">
                  Founded in 2016, Elite8 Digital emerged from a simple belief: that exceptional 
                  digital experiences should be accessible to businesses of all sizes.
                </p>
                <p className="leading-relaxed">
                  What started as a small team of passionate designers and developers has grown 
                  into a full-service digital agency, serving clients across the globe with 
                  innovative solutions that drive real results.
                </p>
                <p className="leading-relaxed">
                  Today, we combine strategic thinking, creative excellence, and technical 
                  expertise to help brands thrive in the digital landscape. Our commitment 
                  remains unchanged: delivering work that exceeds expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values Tabs */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 text-white px-4">
            What Drives Us
          </h2>
          <p className="text-center text-gray-400 text-base sm:text-lg mb-8 sm:mb-12 px-4">Our core principles and aspirations</p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            {['mission', 'vision', 'values'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden text-sm sm:text-base ${
                  activeTab === tab
                    ? 'text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" style={{ animation: 'pulse-glow 2s infinite' }} />
                )}
                <span className="relative z-10">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
              </button>
            ))}
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-500/20 overflow-hidden">
              <div className="shimmer absolute inset-0" />
              
              {activeTab === 'mission' && (
                <div className="text-center relative z-10">
                  <div className="inline-block mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl">
                    <Target className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Our Mission</h3>
                  <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    To empower businesses with innovative digital solutions that amplify their 
                    brand presence, engage their audience, and drive measurable growth in an 
                    ever-evolving digital landscape.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="text-center relative z-10">
                  <div className="inline-block mb-4 sm:mb-6 p-3 sm:p-4 bg-purple-500/20 rounded-2xl">
                    <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Our Vision</h3>
                  <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
                    To be the most trusted digital partner for ambitious brands worldwide, 
                    recognized for our creativity, technical excellence, and unwavering 
                    commitment to client success.
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 relative z-10">
                  {values.map((value, i) => {
                    const Icon = value.icon;
                    return (
                      <div 
                        key={i} 
                        className="flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                        style={{ 
                          animation: `float ${3 + i}s infinite ease-in-out`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">{value.title}</h4>
                          <p className="text-sm sm:text-base text-gray-400">{value.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" style={{ animation: 'pulse-glow 3s infinite' }}></div>
            <div className="relative border-white border-2 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center overflow-hidden">
              <div className="shimmer absolute inset-0" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white px-2">Ready to Start Your Journey?</h2>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-purple-100 px-2">
                  Let's collaborate to bring your digital vision to life
                </p>
                <button className="bg-white text-purple-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl relative overflow-hidden group/btn">
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}