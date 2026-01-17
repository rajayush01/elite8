// import React, { useState, useEffect } from 'react';
// import { Check, X, Sparkles } from 'lucide-react';

// // export default function UsVsOthers() {
// //   const [visibleRows, setVisibleRows] = useState([]);
  
// //   const features = [
// //     { name: '24/7 Customer Support', us: true, others: false },
// //     { name: 'Free Lifetime Updates', us: true, others: false },
// //     { name: 'No Hidden Fees', us: true, others: false },
// //     { name: 'Advanced Analytics', us: true, others: true },
// //     { name: 'Mobile App Access', us: true, others: true },
// //     { name: 'AI-Powered Insights', us: true, others: false },
// //     { name: 'Custom Integrations', us: true, others: false },
// //     { name: 'Money-Back Guarantee', us: true, others: false },
// //   ];

// //   useEffect(() => {
// //     features.forEach((_, index) => {
// //       setTimeout(() => {
// //         setVisibleRows(prev => [...prev, index]);
// //       }, index * 150);
// //     });
// //   }, []);

// export default function UsVsOthers() {
//   const [visibleRows, setVisibleRows] = useState([]);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [clickedCells, setClickedCells] = useState({});
  
//   const features = [
//     { name: '24/7 Customer Support', us: true, others: false },
//     { name: 'Free Lifetime Updates', us: true, others: false },
//     { name: 'No Hidden Fees', us: true, others: false },
//     { name: 'Advanced Analytics', us: true, others: true },
//     { name: 'Mobile App Access', us: true, others: true },
//     { name: 'AI-Powered Insights', us: true, others: false },
//     { name: 'Custom Integrations', us: true, others: false },
//     { name: 'Money-Back Guarantee', us: true, others: false },
//   ];

//   useEffect(() => {
//     features.forEach((_, index) => {
//       setTimeout(() => {
//         setVisibleRows(prev => [...prev, index]);
//       }, index * 150);
//     });
//   }, []);

//   const handleCellClick = (rowIndex, column) => {
//     const key = `${rowIndex}-${column}`;
//     setClickedCells(prev => ({ ...prev, [key]: true }));
//     setTimeout(() => {
//       setClickedCells(prev => {
//         const newState = { ...prev };
//         delete newState[key];
//         return newState;
//       });
//     }, 600);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white py-16 px-4 relative overflow-hidden">
      
//       <div className="max-w-6xl mx-auto relative z-10">
//         <div className="text-center mb-16 space-y-4">
//           <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-4">
//             <Sparkles className="w-4 h-4 text-purple-800" />
//             <span className="text-purple-800 text-sm font-medium">The Clear Choice</span>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-pulse">
//             Why Choose Us?
//           </h1>
//           <p className="text-gray-400 text-xl max-w-2xl mx-auto">
//             See how we deliver exceptional value that others simply can't match
//           </p>
//         </div>

//         <div className="backdrop-blur-xl bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
//           {/* Header */}
//           <div className="grid grid-cols-3 gap-4 p-8 border-b border-white/10 bg-gradient-to-r from-transparent via-white/5 to-transparent">
//             <div className="col-span-1"></div>
//             <div className="text-center transform hover:scale-105 transition-transform">
//               <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg shadow-green-500/50">
//                 Us
//               </div>
//             </div>
//             <div className="text-center transform hover:scale-105 transition-transform">
//               <div className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-full font-bold text-lg">
//                 Others
//               </div>
//             </div>
//           </div>

//           {/* Feature rows */}
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className={`grid grid-cols-3 gap-4 p-6 transition-all duration-500 ${
//                 index !== features.length - 1 ? 'border-b border-white/5' : ''
//               } ${
//                 visibleRows.includes(index) 
//                   ? 'opacity-100 translate-x-0' 
//                   : 'opacity-0 -translate-x-10'
//               } hover:bg-white/5 group`}
//               style={{ transitionDelay: `${index * 50}ms` }}
//             >
//               <div className="flex items-center">
//                 <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
//                   {feature.name}
//                 </span>
//               </div>
//               <div className="flex justify-center items-center">
//                 {feature.us ? (
//                   <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2.5 shadow-lg shadow-green-500/50 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                     <Check className="w-6 h-6 text-black" strokeWidth={3} />
//                   </div>
//                 ) : (
//                   <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-full p-2.5 shadow-lg shadow-red-500/50 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
//                     <X className="w-6 h-6 text-white" strokeWidth={3} />
//                   </div>
//                 )}
//               </div>
//               <div className="flex justify-center items-center">
//                 {feature.others ? (
//                   <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-2.5 shadow-lg shadow-green-500/30 transform group-hover:scale-110 transition-all duration-300">
//                     <Check className="w-6 h-6 text-black" strokeWidth={3} />
//                   </div>
//                 ) : (
//                   <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-full p-2.5 shadow-lg shadow-gray-500/30 transform group-hover:scale-110 transition-all duration-300 opacity-50">
//                     <X className="w-6 h-6 text-white" strokeWidth={3} />
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-16">
//           <button className="group relative bg-gradient-to-r from-purple-500 to-purple-500 hover:from-purple-400 hover:to-purple-400 text-black font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70">
//             <span className="relative z-10">Get Started Today</span>
//             <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


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
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950 text-white py-20 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-1/3 w-96 h-96 bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/20 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Us vs Others
          </span>
          <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
            A side-by-side comparison that shows the real difference.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`relative p-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/0 backdrop-blur-xl transition-all duration-500
                ${
                  visibleRows.includes(i)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }
                hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]`}
              >
                {/* Glow border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-500/40 to-pink-500/40 opacity-0 hover:opacity-100 blur transition" />

                {/* Content */}
                <div className="relative space-y-6">
                  {/* Feature title */}
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-purple-400" />
                    <span className="font-semibold text-lg">
                      {f.name}
                    </span>
                  </div>

                  {/* Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Us */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-purple-300">Us</span>
                        <span className="text-purple-300 font-semibold">
                          {f.us}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-purple-900/40 overflow-hidden">
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
                      <div className="h-3 rounded-full bg-red-950/40 overflow-hidden">
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
        <div className="text-center mt-20">
          <button className="relative px-12 py-5 rounded-full font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-110 transition shadow-[0_0_60px_rgba(168,85,247,0.6)]">
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              Get Started Today
              <Sparkles className="w-5 h-5" />
            </span>
          </button>
          <p className="mt-4 text-sm text-gray-500">
            30-day money-back guarantee • No credit card required
          </p>
        </div>
      </div>
    </section>
  );
}
