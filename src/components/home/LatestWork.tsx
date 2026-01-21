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
            subtitle: 'Website and branding for Design Agency',
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

    // Desktop scroll animation - faster transitions
    useEffect(() => {
        if (isMobile || showAllProjects || !containerRef.current) return;

        // Small delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            const section = containerRef.current;
            if (!section) return;

            // Kill only THIS component's ScrollTriggers
            scrollTriggersRef.current.forEach((trigger) => trigger.kill());
            scrollTriggersRef.current = [];

            // Refresh ScrollTrigger after a brief delay to ensure layout is complete
            ScrollTrigger.refresh();

            // Pin the section with shorter scroll distance for faster transitions
            const pinTrigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${projects.length * 400}`,
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const newIndex = Math.min(
                        Math.floor(progress * projects.length),
                        projects.length - 1
                    );
                    setCurrentIndex(newIndex);
                },
            });
            
            // Store the ScrollTrigger
            scrollTriggersRef.current.push(pinTrigger);
        }, 100);

        return () => {
            clearTimeout(timer);
            // Kill only THIS component's ScrollTriggers
            scrollTriggersRef.current.forEach((trigger) => trigger.kill());
            scrollTriggersRef.current = [];
        };
    }, [isMobile, projects.length, showAllProjects]);

    // Refresh ScrollTrigger when images load or content changes
    useEffect(() => {
        if (!isMobile && !showAllProjects) {
            const handleLoad = () => {
                ScrollTrigger.refresh();
            };

            window.addEventListener('load', handleLoad);
            
            // Also refresh after a delay in case images load later
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

    // Full Page Grid View
    if (showAllProjects) {
        return (
            <div className="w-full min-h-screen bg-black py-12 md:py-20 px-6 md:px-12">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
                        OUR WORKS
                    </h2>
                </div>

                {/* Grid - 1 card on mobile, 2 cards per row on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
                    {allProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="group space-y-4 md:space-y-6 transition-all duration-500 hover:scale-105 animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            {/* Image */}
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
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"
                                    style={{
                                        transform: 'perspective(1500px) rotateY(-10deg) rotateX(3deg)',
                                        clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                ></div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <h4 className="text-2xl md:text-3xl font-bold text-white transform transition-all duration-300 group-hover:translate-x-2">
                                        {project.title}
                                    </h4>
                                </div>
                                <p className="text-gray-400 text-sm md:text-lg leading-relaxed transition-colors duration-300 group-hover:text-gray-300">
                                    {project.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Back Button */}
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
                {/* Title */}
                <div className="mb-12">
                    <h2 className="text-5xl font-bold text-white mb-2 animate-fade-in-up">
                        LATEST WORK
                    </h2>
                </div>

                {/* Projects Stack */}
                <div className="space-y-20">
                    {projects.map((project, idx) => (
                        <div 
                            key={project.id} 
                            className="space-y-6 animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.2}s` }}
                        >
                            {/* Image */}
                            <div className="relative overflow-hidden rounded-lg">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Title and Description */}
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

                {/* More Projects Button */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowAllProjects(true)}
                        className="group relative px-12 py-4 bg-transparent border-2 border-gray-700 text-red-500 text-base font-semibold overflow-hidden hover:border-red-500 transition-all duration-500"
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

    // Desktop Scroll View - Smaller sizes
    return (
        <div className="w-full bg-black">
            <div
                ref={containerRef}
                className="w-full h-screen bg-black overflow-hidden relative"
            >
                <div className="h-screen flex flex-col justify-center px-12">
                    {/* Header */}
                    <div className="mb-10">
                        <h2 className="text-7xl mb-4 text-center font-bold text-white">
                            LATEST WORK
                        </h2>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-12 items-center">
                        {/* Left Side - Text Content */}
                        <div className="space-y-8">
                            {/* Number */}
                            <div className="relative h-24">
                                {projects.map((project, index) => (
                                    <h3
                                        key={project.id}
                                        className="text-7xl font-bold text-gray-800 absolute top-0 left-0 transition-all duration-700 ease-out"
                                        style={{
                                            opacity: currentIndex === index ? 1 : 0,
                                            transform: currentIndex === index 
                                                ? 'translateY(0) scale(1)' 
                                                : 'translateY(20px) scale(0.95)',
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
                                        <span className="w-6 h-px bg-gray-700 transition-all duration-300 hover:w-12 hover:bg-red-500"></span>
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
                            <div className="space-y-3 relative h-36">
                                {projects.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="absolute top-0 left-0 transition-all duration-700 ease-out space-y-3"
                                        style={{
                                            opacity: currentIndex === index ? 1 : 0,
                                            transform: currentIndex === index 
                                                ? 'translateX(0) scale(1)' 
                                                : 'translateX(-30px) scale(0.95)',
                                        }}
                                    >
                                        <h4 className="text-4xl font-bold text-white">
                                            {project.title}
                                        </h4>
                                        <p className="text-gray-400 text-base leading-relaxed max-w-md">
                                            {project.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Square Image */}
                        <div className="relative w-[450px] h-[450px]">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="absolute inset-0 transition-all duration-700 ease-out"
                                    style={{
                                        opacity: currentIndex === index ? 1 : 0,
                                        transform: currentIndex === index 
                                            ? 'translateX(0) scale(1)' 
                                            : 'translateX(50px) scale(0.9)',
                                    }}
                                >
                                    <div className="relative group w-full h-full">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover shadow-2xl transform transition-all duration-700 hover:scale-105 hover:brightness-110"
                                            style={{
                                                transform:
                                                    'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
                                                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                                            }}
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                transform:
                                                    'perspective(1500px) rotateY(-15deg) rotateX(5deg)',
                                                clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
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