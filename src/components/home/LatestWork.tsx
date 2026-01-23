// import { useState, useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const LatestWork = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [showAllProjects, setShowAllProjects] = useState(false);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//     const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
//     const [scrollProgress, setScrollProgress] = useState(0);

//     const allProjects = [
//         {
//             id: 1,
//             number: '01.',
//             title: 'Arjuna',
//             names: ['Arjuna', 'Bima', 'Mandala'],
//             subtitle: 'Personal Portfolio Website for talented design engineer',
//             image:
//                 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
//         },
//         {
//             id: 2,
//             number: '02.',
//             title: 'Bima',
//             names: ['Arjuna', 'Bima', 'Mandala'],
//             subtitle: 'Website and branding for AI Automation Company',
//             image:
//                 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
//         },
//         {
//             id: 3,
//             number: '03.',
//             title: 'Mandala',
//             names: ['Arjuna', 'Bima', 'Mandala'],
//             subtitle: 'Website and branding for Design Agency',
//             image:
//                 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
//         },
//         {
//             id: 4,
//             number: '04.',
//             title: 'Nexora',
//             names: ['Nexora', 'Commerce', 'Retail'],
//             subtitle: 'E-commerce platform for modern retail solutions',
//             image:
//                 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop',
//         },
//         {
//             id: 5,
//             number: '05.',
//             title: 'Zenith',
//             names: ['Zenith', 'Health', 'Mobile'],
//             subtitle: 'Mobile app design for fitness and wellness',
//             image:
//                 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
//         },
//         {
//             id: 6,
//             number: '06.',
//             title: 'Phoenix',
//             names: ['Phoenix', 'Tech', 'Startup'],
//             subtitle: 'Brand identity for innovative tech startup',
//             image:
//                 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
//         },
//     ];

//     const projects = showAllProjects ? allProjects : allProjects.slice(0, 3);

//     // Handle responsive resize
//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Desktop scroll animation - smooth image transitions
//     useEffect(() => {
//         if (isMobile || showAllProjects || !containerRef.current) return;

//         const timer = setTimeout(() => {
//             const section = containerRef.current;
//             if (!section) return;

//             scrollTriggersRef.current.forEach((trigger) => trigger.kill());
//             scrollTriggersRef.current = [];

//             ScrollTrigger.refresh();

//             const pinTrigger = ScrollTrigger.create({
//                 trigger: section,
//                 start: 'top top',
//                 end: () => `+=${projects.length * 800}`,  // Longer scroll for smoother transitions
//                 pin: true,
//                 scrub: 1.5,  // Higher value = smoother, slower transitions
//                 anticipatePin: 1,
//                 onUpdate: (self) => {
//                     const progress = self.progress;
//                     setScrollProgress(progress);
//                     const newIndex = Math.min(
//                         Math.floor(progress * projects.length),
//                         projects.length - 1
//                     );
//                     setCurrentIndex(newIndex);
//                 },
//             });
            
//             scrollTriggersRef.current.push(pinTrigger);
//         }, 100);

//         return () => {
//             clearTimeout(timer);
//             scrollTriggersRef.current.forEach((trigger) => trigger.kill());
//             scrollTriggersRef.current = [];
//         };
//     }, [isMobile, projects.length, showAllProjects]);

//     // Refresh ScrollTrigger when images load
//     useEffect(() => {
//         if (!isMobile && !showAllProjects) {
//             const handleLoad = () => {
//                 ScrollTrigger.refresh();
//             };

//             window.addEventListener('load', handleLoad);
            
//             const refreshTimer = setTimeout(() => {
//                 ScrollTrigger.refresh();
//             }, 500);

//             return () => {
//                 window.removeEventListener('load', handleLoad);
//                 clearTimeout(refreshTimer);
//             };
//         }
//     }, [isMobile, showAllProjects]);

//     const currentProject = projects[currentIndex];

//     // Ultra smooth animation with pause at center
//     const getImageTransform = (index: number) => {
//         const totalProjects = projects.length;
//         const progressPerProject = 1 / totalProjects;
//         const projectStart = index * progressPerProject;
//         const projectEnd = (index + 1) * progressPerProject;
        
//         // Very wide overlap for ultra smooth transitions
//         const overlapStart = Math.max(0, projectStart - progressPerProject * 0.6);
//         const overlapEnd = projectEnd;
        
//         let localProgress = 0;
//         if (scrollProgress >= overlapStart && scrollProgress <= overlapEnd) {
//             localProgress = (scrollProgress - overlapStart) / (overlapEnd - overlapStart);
//         } else if (scrollProgress > overlapEnd) {
//             localProgress = 1;
//         }
        
//         // Add pause in center - image stays stable for middle portion
//         let adjustedProgress = localProgress;
//         if (localProgress < 0.3) {
//             // Coming in phase (0 to 0.3 maps to 0 to 0.3)
//             adjustedProgress = localProgress;
//         } else if (localProgress < 0.7) {
//             // Stable at center (0.3 to 0.7 stays at 0.3)
//             adjustedProgress = 0.3;
//         } else {
//             // Going up phase (0.7 to 1 maps to 0.3 to 1)
//             adjustedProgress = 0.3 + ((localProgress - 0.7) / 0.3) * 0.7;
//         }
        
//         // Apply easing for even smoother feel
//         const easeProgress = adjustedProgress < 0.5 
//             ? 2 * adjustedProgress * adjustedProgress 
//             : 1 - Math.pow(-2 * adjustedProgress + 2, 2) / 2;
        
//         const isCurrent = index === currentIndex;
//         const isNext = index === currentIndex + 1;
        
//         if (isCurrent) {
//             // Current image: ultra smooth upward movement with scale
//             const translateY = easeProgress * -350;
//             const scale = 1 + (easeProgress * 0.5);  // Gradual 1.0 -> 1.5x
//             const opacity = 1 - (easeProgress * 0.95);
//             return { translateY, scale, opacity, zIndex: 10 + index };
//         } else if (isNext) {
//             // Next image: gentle arrival from below
//             const translateY = 250 - (easeProgress * 250);
//             const scale = 0.85 + (easeProgress * 0.15);
//             const opacity = Math.min(1, easeProgress * 1.5);
//             return { translateY, scale, opacity, zIndex: 10 + index };
//         } else if (index < currentIndex) {
//             // Past images
//             return { translateY: -400, scale: 1.5, opacity: 0, zIndex: index };
//         } else {
//             // Future images
//             return { translateY: 300, scale: 0.85, opacity: 0, zIndex: index };
//         }
//     };

//     // Full Page Grid View
//     if (showAllProjects) {
//         return (
//             <div className="w-full min-h-screen bg-black py-12 md:py-20 px-6 md:px-12">
//                 <div className="mb-12 md:mb-16">
//                     <h2 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
//                         OUR WORKS
//                     </h2>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
//                     {allProjects.map((project, idx) => (
//                         <div
//                             key={project.id}
//                             className="group space-y-4 md:space-y-6 transition-all duration-500 hover:scale-105 animate-fade-in-up"
//                             style={{ animationDelay: `${idx * 0.1}s` }}
//                         >
//                             <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
//                                 <img
//                                     src={project.image}
//                                     alt={project.title}
//                                     className="w-full h-full object-cover shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
//                                     style={{
//                                         transform: 'perspective(1500px) rotateY(-10deg) rotateX(3deg)',
//                                         clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
//                                     }}
//                                 />
//                                 <div
//                                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                                     style={{
//                                         transform: 'perspective(1500px) rotateY(-10deg) rotateX(3deg)',
//                                         clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
//                                     }}
//                                 ></div>
//                             </div>

//                             <div className="space-y-2 md:space-y-3">
//                                 <div className="flex items-center gap-3 md:gap-4">
//                                     <h4 className="text-2xl md:text-3xl font-bold text-white transform transition-all duration-300 group-hover:translate-x-2">
//                                         {project.title}
//                                     </h4>
//                                 </div>
//                                 <p className="text-gray-400 text-sm md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
//                                     {project.subtitle}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex justify-center mt-12 md:mt-16">
//                     <button
//                         onClick={() => setShowAllProjects(false)}
//                         className="group relative px-8 md:px-12 py-3 md:py-4 bg-transparent border-2 border-gray-700 text-white text-sm md:text-base font-semibold overflow-hidden hover:border-red-500 transition-all duration-500 rounded-full"
//                     >
//                         <span className="relative z-10 flex items-center gap-3">
//                             BACK TO SCROLL VIEW
//                         </span>
//                         <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Mobile View
//     if (isMobile) {
//         return (
//             <div className="w-full bg-black py-16 px-6">
//                 <div className="mb-12">
//                     <h2 className="text-5xl font-bold text-white mb-2 animate-fade-in-up">
//                         LATEST WORK
//                     </h2>
//                 </div>

//                 <div className="space-y-20">
//                     {projects.map((project, idx) => (
//                         <div 
//                             key={project.id} 
//                             className="space-y-6 animate-fade-in-up"
//                             style={{ animationDelay: `${idx * 0.2}s` }}
//                         >
//                             <div className="relative overflow-hidden rounded-lg">
//                                 <img
//                                     src={project.image}
//                                     alt={project.title}
//                                     className="w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-700 hover:scale-105"
//                                 />
//                             </div>

//                             <div className="space-y-3">
//                                 <h4 className="text-4xl font-bold text-white transform transition-all duration-300 hover:translate-x-2">
//                                     {project.title}
//                                 </h4>
//                                 <p className="text-gray-400 text-base leading-relaxed transition-colors duration-300 hover:text-gray-300">
//                                     {project.subtitle}
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex justify-center mt-12">
//                     <button
//                         onClick={() => setShowAllProjects(true)}
//                         className="group relative px-12 py-4 bg-transparent border-2 border-gray-700 text-red-500 text-base font-semibold overflow-hidden hover:border-red-500 transition-all duration-500"
//                     >
//                         <span className="relative z-10">MORE PROJECTS</span>
//                         <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
//                         <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
//                             MORE PROJECTS
//                         </span>
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Desktop Scroll View with smooth image transitions
//     return (
//         <div className="w-full bg-black">
//             <div
//                 ref={containerRef}
//                 className="w-full h-screen bg-black overflow-hidden relative"
//             >
//                 <div className="h-screen flex flex-col justify-center px-0">
//                     <div className="mb-10">
//                         <h2 className="text-7xl mb-4 text-center font-bold text-white">
//                             LATEST WORK
//                         </h2>
//                     </div>

//                     <div className="grid grid-cols-2 gap-12 items-center px-12">
//                         {/* Left Side - Text Content - stays in place, smaller container */}
//                         <div className="space-y-8">
//                             {/* Number */}
//                             <div className="relative h-40 overflow-visible">
//                                 {projects.map((project, index) => (
//                                     <h3
//                                         key={project.id}
//                                         className="text-9xl pl-4 font-bold text-gray-800 absolute top-0 left-0"
//                                         style={{
//                                             opacity: currentIndex === index ? 1 : 0,
//                                             transform: currentIndex === index 
//                                                 ? 'translateY(0) scale(1)' 
//                                                 : currentIndex > index 
//                                                     ? 'translateY(-80px) scale(0.9)' 
//                                                     : 'translateY(120px) scale(0.9)',
//                                             transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                                         }}
//                                     >
//                                         {project.number}
//                                     </h3>
//                                 ))}
//                             </div>

//                             {/* Names List */}
//                             <div className="space-y-2">
//                                 {currentProject.names.map((name, i) => (
//                                     <div 
//                                         key={i} 
//                                         className="flex items-center gap-2 text-sm animate-slide-in-left"
//                                         style={{ 
//                                             animationDelay: `${i * 0.1}s`
//                                         }}
//                                     >
//                                         <span className="w-3 h-px bg-gray-700 transition-all duration-300 hover:w-12 hover:bg-red-500"></span>
//                                         <span
//                                             className={`transition-all duration-300 ${name === currentProject.title
//                                                 ? 'text-white font-semibold text-base'
//                                                 : 'text-gray-500 hover:text-gray-300'
//                                                 }`}
//                                         >
//                                             {name}
//                                         </span>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Title and Description */}
//                             <div className="space-y-3 relative h-36 overflow-visible">
//                                 {projects.map((project, index) => (
//                                     <div
//                                         key={project.id}
//                                         className="absolute top-0 left-0 pl-6 space-y-3"
//                                         style={{
//                                             opacity: currentIndex === index ? 1 : 0,
//                                             transform: currentIndex === index 
//                                                 ? 'translateY(0) scale(1)' 
//                                                 : currentIndex > index 
//                                                     ? 'translateY(-60px) scale(0.95)' 
//                                                     : 'translateY(100px) scale(0.95)',
//                                             transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
//                                         }}
//                                     >
//                                         <h4 className="text-6xl font-bold text-white">
//                                             {project.title}
//                                         </h4>
//                                         <p className="text-gray-400 text-xl leading-relaxed max-w-md">
//                                             {project.subtitle}
//                                         </p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Right Side - Images scale up smoothly while moving up */}
//                         <div className="relative w-[500px] h-[550px] overflow-visible flex items-center justify-center">
//                             {projects.map((project, index) => {
//                                 const transform = getImageTransform(index);
                                
//                                 return (
//                                     <div
//                                         key={project.id}
//                                         className="absolute"
//                                         style={{
//                                             opacity: transform.opacity,
//                                             transform: `translateY(${transform.translateY}px) scale(${transform.scale})`,
//                                             transition: 'transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease-out',
//                                             zIndex: transform.zIndex,
//                                             width: '100%',
//                                             height: '400px',
//                                         }}
//                                     >
//                                         <div className="relative group w-full h-full">
//                                             <img
//                                                 src={project.image}
//                                                 alt={project.title}
//                                                 className="w-full h-full object-cover shadow-2xl"
//                                                 style={{
//                                                     transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
//                                                     clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
//                                                 }}
//                                             />
//                                             <div
//                                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                                                 style={{
//                                                     transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
//                                                     clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* More Projects Button */}
//             <div className="flex justify-center py-16 bg-black">
//                 <button
//                     onClick={() => setShowAllProjects(true)}
//                     className="group relative px-16 py-5 bg-transparent border-2 border-gray-700 text-red-500 text-lg font-semibold overflow-hidden hover:border-red-500 transition-all duration-500 rounded-full hover:scale-105"
//                 >
//                     <span className="relative z-10">MORE PROJECTS</span>
//                     <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
//                     <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
//                         MORE PROJECTS
//                     </span>
//                 </button>
//             </div>

//             <style>{`
//                 @keyframes fade-in-up {
//                     from {
//                         opacity: 0;
//                         transform: translateY(30px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }

//                 @keyframes slide-in-left {
//                     from {
//                         opacity: 0;
//                         transform: translateX(-20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }

//                 .animate-fade-in-up {
//                     animation: fade-in-up 0.8s ease-out;
//                 }

//                 .animate-slide-in-left {
//                     animation: slide-in-left 0.6s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default LatestWork;












import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LatestWork = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
    const [scrollProgress, setScrollProgress] = useState(0);

    const allProjects = [
        {
            id: 1,
            number: '01.',
            title: 'Arjuna',
            names: ['Arjuna', 'Bima', 'Mandala'],
            subtitle: 'Personal Portfolio Website for talented design engineer',
            image:
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        },
        {
            id: 2,
            number: '02.',
            title: 'Bima',
            names: ['Arjuna', 'Bima', 'Mandala'],
            subtitle: 'Website and branding for AI Automation Company',
            image:
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        },
        {
            id: 3,
            number: '03.',
            title: 'Mandala',
            names: ['Arjuna', 'Bima', 'Mandala'],
            subtitle: 'Website and branding for all kind of Design Agency',
            image:
                'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=800&fit=crop',
        },
        {
            id: 4,
            number: '04.',
            title: 'Nexora',
            names: ['Nexora', 'Commerce', 'Retail'],
            subtitle: 'E-commerce platform for modern retail solutions',
            image:
                'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=1200&h=800&fit=crop',
        },
        {
            id: 5,
            number: '05.',
            title: 'Zenith',
            names: ['Zenith', 'Health', 'Mobile'],
            subtitle: 'Mobile app design for fitness and wellness',
            image:
                'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop',
        },
        {
            id: 6,
            number: '06.',
            title: 'Phoenix',
            names: ['Phoenix', 'Tech', 'Startup'],
            subtitle: 'Brand identity for innovative tech startup',
            image:
                'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
        },
    ];

    const projects = showAllProjects ? allProjects : allProjects.slice(0, 3);

    // Handle responsive resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Desktop scroll animation - smooth image transitions
    useEffect(() => {
        if (isMobile || showAllProjects || !containerRef.current) return;

        const timer = setTimeout(() => {
            const section = containerRef.current;
            if (!section) return;

            scrollTriggersRef.current.forEach((trigger) => trigger.kill());
            scrollTriggersRef.current = [];

            ScrollTrigger.refresh();

            const pinTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${projects.length * 800}`,  // Longer scroll for smoother transitions
                pin: true,
                scrub: 1.5,  // Higher value = smoother, slower transitions
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    setScrollProgress(progress);
                    const newIndex = Math.min(
                        Math.floor(progress * projects.length),
                        projects.length - 1
                    );
                    setCurrentIndex(newIndex);
                },
            });
            
            scrollTriggersRef.current.push(pinTrigger);
        }, 100);

        return () => {
            clearTimeout(timer);
            scrollTriggersRef.current.forEach((trigger) => trigger.kill());
            scrollTriggersRef.current = [];
        };
    }, [isMobile, projects.length, showAllProjects]);

    // Refresh ScrollTrigger when images load
    useEffect(() => {
        if (!isMobile && !showAllProjects) {
            const handleLoad = () => {
                ScrollTrigger.refresh();
            };

            window.addEventListener('load', handleLoad);
            
            const refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 500);

            return () => {
                window.removeEventListener('load', handleLoad);
                clearTimeout(refreshTimer);
            };
        }
    }, [isMobile, showAllProjects]);

    const currentProject = projects[currentIndex];

    // Ultra smooth animation - no jerks, silk-like transitions




 const getImageTransform = (index: number) => {
        const totalProjects = projects.length;
        const progressPerProject = 1 / totalProjects;
        const projectStart = index * progressPerProject;
        const projectEnd = (index + 1) * progressPerProject;
        
        // Very wide overlap for ultra smooth transitions
        const overlapStart = Math.max(0, projectStart - progressPerProject * 0.6);
        const overlapEnd = projectEnd;
        
        let localProgress = 0;
        if (scrollProgress >= overlapStart && scrollProgress <= overlapEnd) {
            localProgress = (scrollProgress - overlapStart) / (overlapEnd - overlapStart);
        } else if (scrollProgress > overlapEnd) {
            localProgress = 1;
        }
        
        // Add pause in center - image stays stable for middle portion
        let adjustedProgress = localProgress;
        if (localProgress < 0.3) {
            // Coming in phase (0 to 0.3 maps to 0 to 0.3)
            adjustedProgress = localProgress;
        } else if (localProgress < 0.7) {
            // Stable at center (0.3 to 0.7 stays at 0.3)
            adjustedProgress = 0.3;
        } else {
            // Going up phase (0.7 to 1 maps to 0.3 to 1)
            adjustedProgress = 0.3 + ((localProgress - 0.7) / 0.3) * 0.7;
        }
        
        // Apply easing for even smoother feel
        const easeProgress = adjustedProgress < 0.5 
            ? 2 * adjustedProgress * adjustedProgress 
            : 1 - Math.pow(-2 * adjustedProgress + 2, 2) / 2;
        
        const isCurrent = index === currentIndex;
        const isNext = index === currentIndex + 1;
        
        if (isCurrent) {
            // Current image: ultra smooth upward movement with scale
            const translateY = easeProgress * -350;
            const scale = 1 + (easeProgress * 0.5);  // Gradual 1.0 -> 1.5x
            const opacity = 1 - (easeProgress * 0.95);
            return { translateY, scale, opacity, zIndex: 10 + index };
        } else if (isNext) {
            // Next image: gentle arrival from below
            const translateY = 250 - (easeProgress * 250);
            const scale = 0.85 + (easeProgress * 0.15);
            const opacity = Math.min(1, easeProgress * 1.5);
            return { translateY, scale, opacity, zIndex: 10 + index };
        } else if (index < currentIndex) {
            // Past images
            return { translateY: -400, scale: 1.5, opacity: 0, zIndex: index };
        } else {
            // Future images
            return { translateY: 300, scale: 0.85, opacity: 0, zIndex: index };
        }
    };



    // Full Page Grid View
    if (showAllProjects) {
        return (
            <div className="w-full min-h-screen bg-black py-12 md:py-20 px-6 md:px-12">
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
                        OUR WORKS
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {allProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="group sm:mb-0 mb-8 space-y-2 sm:space-y-4 md:space-y-6 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover shadow-2xl transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    style={{
                                        transform: 'perspective(1500px) rotateY(-10deg) rotateX(3deg)',
                                        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        transform: 'perspective(1500px) rotateY(-10deg) rotateX(3deg)',
                                        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                                    }}
                                ></div>
                            </div>

                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white transform transition-all duration-300 group-hover:translate-x-2">
                                        {project.title}
                                    </h4>
                                </div>
                                <p className="text-gray-400 text-sm  md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12 md:mt-16">
                    <button
                        onClick={() => setShowAllProjects(false)}
                        className="group relative px-8 md:px-12 py-3 md:py-4 bg-transparent border-2 border-gray-700 text-white text-sm md:text-base font-semibold overflow-hidden hover:border-red-500 transition-all duration-500 rounded-full"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            BACK TO SCROLL VIEW
                        </span>
                        <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                    </button>
                </div>
            </div>
        );
    }

    // Mobile View
    if (isMobile) {
        return (
            <div className="w-full bg-black py-16 px-6">
                <div className="mb-12">
                    <h2 className="text-5xl font-bold text-white mb-2 animate-fade-in-up">
                        LATEST WORK
                    </h2>
                </div>

                <div className="space-y-20">
                    {projects.map((project, idx) => (
                        <div 
                            key={project.id} 
                            className="space-y-6 animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            <div className="space-y-3">
                                <h4 className="text-4xl font-bold text-white transform transition-all duration-300 hover:translate-x-2">
                                    {project.title}
                                </h4>
                                <p className="text-gray-400 text-base leading-relaxed transition-colors duration-300 hover:text-gray-300">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAllProjects(true)}
                        className="group relative rounded-full px-12 py-4 bg-transparent border-2 border-gray-700 text-red-500 text-base font-semibold overflow-hidden hover:border-red-500 transition-all duration-500"
                    >
                        <span className="relative z-10">MORE PROJECTS</span>
                        <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                            MORE PROJECTS
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    // Desktop Scroll View with smooth image transitions
    return (
        <div className="w-full bg-black">
                        <h2 className="text-7xl mb-4 text-center font-bold text-white">
                            LATEST WORK
                        </h2>
            <div
                ref={containerRef}
                className="w-full h-screen bg-black overflow-hidden relative"
            >
                        
                <div className="h-screen flex flex-col justify-center px-0">
                    {/* <div className="mb-12 mt-10">
                       
                    </div> */}

                    <div className="grid grid-cols-2 gap-12 items-center px-2">
                        {/* Left Side - Text Content - stays in place, smaller container */}
                        <div className="space-y-8">
                            {/* Number */}
                            <div className="relative h-40 overflow-visible">
                                {projects.map((project, index) => (
                                    <h3
                                        key={project.id}
                                        className="text-9xl pl-4 pt-4 font-bold text-gray-400 absolute top-0 left-0"
                                        style={{
                                            opacity: currentIndex === index ? 1 : 0,
                                            transform: currentIndex === index 
                                                ? 'translateY(0) scale(1)' 
                                                : currentIndex > index 
                                                    ? 'translateY(-80px) scale(0.9)' 
                                                    : 'translateY(120px) scale(0.9)',
                                            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        }}
                                    >
                                        {project.number}
                                    </h3>
                                ))}
                            </div>

                            {/* Names List */}
                            <div className="space-y-2">
                                {currentProject.names.map((name, i) => (
                                    <div 
                                        key={i} 
                                        className="flex items-center gap-2 text-sm animate-slide-in-left"
                                        style={{ 
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    >
                                        <span className="w-3 h-px bg-gray-700 transition-all duration-300 hover:w-12 hover:bg-red-500"></span>
                                        <span
                                            className={`transition-all duration-300 ${name === currentProject.title
                                                ? 'text-white font-semibold text-base'
                                                : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                        >
                                            {name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Title and Description */}
                            <div className="space-y-3 relative h-36 overflow-visible">
                                {projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="absolute top-0 left-0 pl-6 pt-20 space-y-3"
                                        style={{
                                            opacity: currentIndex === index ? 1 : 0,
                                            transform: currentIndex === index 
                                                ? 'translateY(0) scale(1)' 
                                                : currentIndex > index 
                                                    ? 'translateY(-60px) scale(0.95)' 
                                                    : 'translateY(100px) scale(0.95)',
                                            transition: 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        }}
                                    >
                                        <h4 className="text-6xl font-bold text-white">
                                            {project.title}
                                        </h4>
                                        <p className="text-gray-400 text-xl leading-relaxed max-w-md">
                                            {project.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Images scale up smoothly while moving up */}
                        <div className="relative w-[500px] h-[550px] overflow-visible flex items-center justify-center">
                            {projects.map((project, index) => {
                                const transform = getImageTransform(index);
                                
                                return (
                                    <div
                                        key={project.id}
                                        className="absolute"
                                        style={{
                                            opacity: transform.opacity,
                                            transform: `translateY(${transform.translateY}px) scale(${transform.scale})`,
                                            transition: 'transform 1.4s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1s ease-out',
                                            zIndex: transform.zIndex,
                                            width: '100%',
                                            height: '400px',
                                        }}
                                    >
                                        <div className="relative group w-full h-full">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover shadow-2xl"
                                                style={{
                                                    transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
                                                    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                style={{
                                                    transform: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
                                                    clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* More Projects Button */}
            <div className="flex justify-center py-16 bg-black">
                <button
                    onClick={() => setShowAllProjects(true)}
                    className="group relative px-16 py-5 bg-transparent border-2 border-gray-700 text-red-500 text-lg font-semibold overflow-hidden hover:border-red-500 transition-all duration-500 rounded-full hover:scale-105"
                >
                    <span className="relative z-10">MORE PROJECTS</span>
                    <div className="absolute inset-0 bg-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        MORE PROJECTS
                    </span>
                </button>
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default LatestWork;