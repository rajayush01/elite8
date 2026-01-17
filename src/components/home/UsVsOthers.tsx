import React, { useState, useEffect } from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function UsVsOthers() {
  const [visibleRows, setVisibleRows] = useState([]);
  
  const features = [
    { name: '24/7 Customer Support', us: true, others: false },
    { name: 'Free Lifetime Updates', us: true, others: false },
    { name: 'No Hidden Fees', us: true, others: false },
    { name: 'Advanced Analytics', us: true, others: true },
    { name: 'Mobile App Access', us: true, others: true },
    { name: 'AI-Powered Insights', us: true, others: false },
    { name: 'Custom Integrations', us: true, others: false },
    { name: 'Money-Back Guarantee', us: true, others: false },
  ];

  useEffect(() => {
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleRows(prev => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-4 h-4 text-purple-800" />
            <span className="text-purple-800 text-sm font-medium">The Clear Choice</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-pulse">
            Why Choose Us?
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            See how we deliver exceptional value that others simply can't match
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-8 border-b border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
            <div className="col-span-1"></div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg shadow-green-500/50">
                Us
              </div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold text-lg">
                Others
              </div>
            </div>
          </div>

          {/* Feature rows */}
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 gap-4 p-6 transition-all duration-500 ${
                index !== features.length - 1 ? 'border-b border-white/5' : ''
              } ${
                visibleRows.includes(index) 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              } hover:bg-white/5 group`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center">
                <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                  {feature.name}
                </span>
              </div>
              <div className="flex justify-center items-center">
                {feature.us ? (
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2.5 shadow-lg shadow-green-500/50 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Check className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-2.5 shadow-lg shadow-red-500/50 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <X className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center">
                {feature.others ? (
                  <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2.5 shadow-lg shadow-green-500/30 transform group-hover:scale-110 transition-all duration-300">
                    <Check className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-full p-2.5 shadow-lg shadow-gray-500/30 transform group-hover:scale-110 transition-all duration-300 opacity-50">
                    <X className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="group relative bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-400 hover:to-purple-400 text-black font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70">
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
}