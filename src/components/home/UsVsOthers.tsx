import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Zap,
  Rocket,
  Trophy,
  Crown,
  Shield,
  TrendingUp
} from 'lucide-react';

export default function UsVsOthers() {
  const [visibleRows, setVisibleRows] = useState<number[]>([]);
  const [animateBars, setAnimateBars] = useState(false);

  const features = [
    { name: '24/7 Customer Support', us: 100, others: 30, icon: Zap },
    { name: 'Free Lifetime Updates', us: 100, others: 20, icon: Rocket },
    { name: 'No Hidden Fees', us: 100, others: 25, icon: Shield },
    { name: 'Advanced Analytics', us: 90, others: 65, icon: TrendingUp },
    { name: 'Mobile App Access', us: 95, others: 70, icon: Sparkles },
    { name: 'AI-Powered Insights', us: 100, others: 15, icon: Trophy },
    { name: 'Custom Integrations', us: 90, others: 35, icon: Zap },
    { name: 'Money-Back Guarantee', us: 100, others: 10, icon: Crown }
  ];

  useEffect(() => {
    features.forEach((_, i) => {
      setTimeout(() => {
        setVisibleRows(prev => [...prev, i]);
        if (i === features.length - 1) {
          setTimeout(() => setAnimateBars(true), 300);
        }
      }, i * 120);
    });
  }, []);

  return (
    <section className="min-h-screen text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/4 sm:left-1/3 w-64 h-64 sm:w-96 sm:h-96 bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-red-600/20 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs sm:text-sm mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            Us vs Others
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent px-4">
            Why Choose Us
          </h2>
          <p className="mt-4 sm:mt-6 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-4">
            A side-by-side comparison that shows the real difference.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-xl transition-all duration-500
                ${
                  visibleRows.includes(i)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] sm:hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]`}
              >
                {/* Glow border */}
                <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 opacity-0 hover:opacity-100 blur transition" />

                {/* Content */}
                <div className="relative space-y-4 sm:space-y-6">
                  {/* Feature title */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                    <span className="font-semibold text-base sm:text-lg">
                      {f.name}
                    </span>
                  </div>

                  {/* Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Us */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-purple-300">Us</span>
                        <span className="text-purple-300 font-semibold">
                          {f.us}%
                        </span>
                      </div>
                      <div className="h-2.5 sm:h-3 rounded-full bg-purple-900/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 ease-out"
                          style={{
                            width: animateBars ? `${f.us}%` : '0%'
                          }}
                        />
                      </div>
                    </div>

                    {/* Others */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-red-400">Others</span>
                        <span className="text-red-400 font-semibold">
                          {f.others}%
                        </span>
                      </div>
                      <div className="h-2.5 sm:h-3 rounded-full bg-red-950/40 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-1000 ease-out"
                          style={{
                            width: animateBars ? `${f.others}%` : '0%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 px-4">
          <button className="relative px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg bg-gradient-to-r from-purple-600 to-purple-600 hover:scale-105 sm:hover:scale-110 transition shadow-[0_0_40px_rgba(168,85,247,0.5)] sm:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-300 w-full sm:w-auto">
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              Get Started Today
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </span>
          </button>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
            30-day money-back guarantee • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}