// import { useState, useEffect, useRef } from 'react';

// const LetsWork = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [showAllProjects, setShowAllProjects] = useState(false);
//   const containerRef = useRef(null);
//   const isScrolling = useRef(false);

//   const allProjects = [
//     {
//       id: 1,
//       number: '01.',
//       title: 'Arjuna',
//       subtitle: 'Personal Portfolio Website for talented design engineer',
//       tags: ['Arjuna', 'Bima', 'Mandala'],
//       image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
//       device: 'laptop'
//     },
//     {
//       id: 2,
//       number: '02.',
//       title: 'Bima',
//       subtitle: 'Website and branding for AI Automation Company',
//       tags: ['Arjuna', 'Bima', 'Mandala'],
//       image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
//       device: 'desktop'
//     },
//     {
//       id: 3,
//       number: '03.',
//       title: 'Mandala',
//       subtitle: 'Website and branding for Design Agency',
//       tags: ['Arjuna', 'Bima', 'Mandala'],
//       image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
//       device: 'laptop'
//     },
//     {
//       id: 4,
//       number: '04.',
//       title: 'Nexora',
//       subtitle: 'E-commerce platform for modern retail solutions',
//       tags: ['Nexora', 'Commerce', 'Retail'],
//       image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop',
//       device: 'desktop'
//     },
//     {
//       id: 5,
//       number: '05.',
//       title: 'Zenith',
//       subtitle: 'Mobile app design for fitness and wellness',
//       tags: ['Zenith', 'Health', 'Mobile'],
//       image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
//       device: 'laptop'
//     }
//   ];

//   const projects = showAllProjects ? allProjects : allProjects.slice(0, 3);
//   const currentProjectIndex = Math.floor(scrollProgress);
//   const isLastProject = currentProjectIndex >= projects.length - 1;

//   useEffect(() => {
//     const handleWheel = (e) => {
//       const container = containerRef.current;
//       if (!container) return;

//       // Check if we're inside the container
//       const rect = container.getBoundingClientRect();
//       const isInsideContainer = (
//         e.clientY >= rect.top &&
//         e.clientY <= rect.bottom &&
//         e.clientX >= rect.left &&
//         e.clientX <= rect.right
//       );

//       if (!isInsideContainer) return;

//       // Check if we're at the boundaries
//       const atStart = scrollProgress <= 0 && e.deltaY < 0;
//       const atEnd = scrollProgress >= projects.length - 1 && e.deltaY > 0;

//       // Allow normal page scroll at boundaries
//       if (atStart || atEnd) return;

//       // Prevent default only when scrolling within our projects
//       if (isScrolling.current) return;
//       e.preventDefault();
      
//       const delta = e.deltaY > 0 ? 0.15 : -0.15;
      
//       setScrollProgress(prev => {
//         const newProgress = prev + delta;
//         return Math.max(0, Math.min(projects.length - 1, newProgress));
//       });

//       isScrolling.current = true;
//       setTimeout(() => {
//         isScrolling.current = false;
//       }, 50);
//     };

//     const container = containerRef.current;
//     if (container) {
//       container.addEventListener('wheel', handleWheel, { passive: false });
//     }

//     return () => {
//       if (container) {
//         container.removeEventListener('wheel', handleWheel);
//       }
//     };
//   }, [projects.length, scrollProgress]);

//   const getProjectStyle = (index) => {
//     const distance = scrollProgress - index;
//     const absDistance = Math.abs(distance);
    
//     // Calculate opacity: fully visible when current, fades out as you scroll away
//     let opacity = 1;
//     if (distance > 0) {
//       // Project is being scrolled up/away
//       opacity = Math.max(0.2, 1 - distance * 0.5);
//     } else if (distance < 0) {
//       // Project is coming up
//       opacity = Math.max(0.2, 1 - absDistance * 0.5);
//     }
    
//     // Calculate translateY: smooth scrolling effect with minimal gap
//     const translateY = distance * -30; // Reduced from -100 to -30 for minimal gap
    
//     // Calculate scale: slight scale down as it fades
//     const scale = 1 - absDistance * 0.03;
    
//     return {
//       opacity,
//       transform: `translateY(${translateY}vh) scale(${Math.max(0.95, scale)})`,
//       transition: 'all 0.3s ease-out',
//       position: 'absolute',
//       top: `${index * 35}vh`, // Reduced spacing between cards
//       left: 0,
//       right: 0,
//     };
//   };

//   return (
//     <div 
//       ref={containerRef}
//       className="w-full bg-black text-white overflow-hidden relative py-20"
//       style={{ height: 'auto', minHeight: '100vh' }}
//     >
//       {/* Header */}
//       <div className="px-6 md:px-16 lg:px-24 py-6 md:py-12 mb-10">
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl md:text-6xl lg:text-8xl font-black text-gray-300 tracking-tight animate-slideDown">
//             LATEST WORK
//           </h1>
//         </div>
//       </div>

//       {/* Project Content */}
//       <div className="relative" style={{ height: `${projects.length * 35}vh`, minHeight: '300vh' }}>
//         {projects.map((project, index) => (
//           <div 
//             key={project.id}
//             className="min-h-screen flex items-center px-6 md:px-16 lg:px-24"
//             style={getProjectStyle(index)}
//           >
//             <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center w-full">
//               {/* Left Side - Text */}
//               <div className="space-y-6 md:space-y-8">
//                 <div className="space-y-4">
//                   <h2 className="text-6xl md:text-7xl lg:text-9xl font-black text-gray-800">
//                     {project.number}
//                   </h2>
//                   <div className="space-y-2 text-gray-500 text-xs md:text-sm">
//                     {project.tags.map((tag, i) => (
//                       <div 
//                         key={i} 
//                         className="flex items-center gap-2"
//                       >
//                         <span className="w-6 md:w-8 h-px bg-gray-700"></span>
//                         <span className={tag === project.title ? 'text-white font-semibold' : ''}>
//                           {tag}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-4 pt-4 md:pt-8">
//                   <h3 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-300">
//                     {project.title}
//                   </h3>
//                   <p className="text-gray-500 text-sm md:text-lg leading-relaxed max-w-md">
//                     {project.subtitle}
//                   </p>
//                 </div>
//               </div>

//               {/* Right Side - Image */}
//               <div className="relative">
//                 <div className="relative group">
//                   {project.device === 'laptop' ? (
//                     <div className="relative perspective-1000 transition-transform duration-700 hover:scale-105">
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-auto transform shadow-2xl transition-all duration-700"
//                         style={{
//                           transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
//                           clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
//                         }}
//                       />
//                       <div
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//                         style={{
//                           transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
//                           clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)'
//                         }}
//                       ></div>
//                     </div>
//                   ) : (
//                     <div className="relative transition-transform duration-700 hover:scale-105">
//                       <img
//                         src={project.image}
//                         alt={project.title}
//                         className="w-full h-auto shadow-2xl transform transition-all duration-700"
//                         style={{
//                           transform: 'perspective(1500px) rotateY(-10deg) rotateX(2deg)'
//                         }}
//                       />
//                       <div
//                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//                         style={{
//                           transform: 'perspective(1500px) rotateY(-10deg) rotateX(2deg)'
//                         }}
//                       ></div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Show All Projects Button */}
//       {!showAllProjects && isLastProject && (
//         <div className="flex justify-center items-center mt-16 mb-8 z-50 animate-fadeInUp">
//           <button
//             onClick={() => {
//               setShowAllProjects(true);
//               setScrollProgress(3);
//             }}
//             className="group relative px-6 md:px-12 py-3 md:py-5 bg-transparent border-2 border-gray-700 text-gray-300 text-sm md:text-lg font-semibold overflow-hidden hover:border-gray-500 transition-all duration-500 hover:scale-105"
//           >
//             <span className="relative z-10 flex items-center gap-3">
//               SHOW ALL PROJECTS
//               <svg
//                 className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </span>
//             <div className="absolute inset-0 bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
//           </button>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-100%);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slideDown {
//           animation: slideDown 0.8s ease-out forwards;
//         }

//         .animate-fadeInUp {
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LetsWork;