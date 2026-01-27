// videos ke saath

import vid1 from '../../assets/nymara_demo.mp4';
import vid2 from '../../assets/stanford.webm';
import vid3 from '../../assets/IB.mp4';
import { useState, useEffect, useRef } from 'react';

export default function LetsWorkMob() {
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const scrollTimeout = useRef<number | null>(null);

	const isTransitioning = useRef(false);

	const allProjects = [
		{
			id: 1,
			number: '01.',
			title: 'Nymara',
			names: ['Nymara', 'Standford', 'IB Tech'],
			subtitle: 'Personal Portfolio Website for talented design engineer',
			video: vid1,
		},
		{
			id: 2,
			number: '02.',
			title: 'Standford',
			names: ['Nymara', 'Standford', 'IB Tech'],
			subtitle: 'Website and branding for AI Automation Company',
			video: vid2,
		},
		{
			id: 3,
			number: '03.',
			title: 'IB Tech',
			names: ['Nymara', 'Standford', 'IB Tech'],
			subtitle: 'Website and branding for all kind of Design Agency',
			video: vid3,
		},
	];

	useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    // Desktop only
    if (window.innerWidth < 1024) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const containerBottom = rect.bottom;
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const containerCenter = containerTop + rect.height / 2;

    const isCentered = Math.abs(containerCenter - viewportCenter) < 100;
    const isContainerVisible = containerTop < viewportHeight && containerBottom > 0;
    const isAtTop = containerTop >= -5;

    if (!isContainerVisible || !isCentered) return;

    // Scroll down
    if (e.deltaY > 0) {
      if (activeIndex < allProjects.length - 1) {
        e.preventDefault();
        if (isTransitioning.current) return;

        if (scrollTimeout.current !== null) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = window.setTimeout(() => {
          isTransitioning.current = true;
          setActiveIndex(prev => prev + 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 300);
        }, 50);
      }
    }

    // Scroll up
    else if (e.deltaY < 0) {
      if (activeIndex > 0) {
        e.preventDefault();
        if (isTransitioning.current) return;

        if (scrollTimeout.current !== null) {
          clearTimeout(scrollTimeout.current);
        }

        scrollTimeout.current = window.setTimeout(() => {
          isTransitioning.current = true;
          setActiveIndex(prev => prev - 1);
          setTimeout(() => {
            isTransitioning.current = false;
          }, 300);
        }, 50);
      } else if (activeIndex === 0 && !isAtTop) {
        e.preventDefault();
      }
    }
  };

  window.addEventListener('wheel', handleWheel, { passive: false });

  return () => {
    window.removeEventListener('wheel', handleWheel);
    if (scrollTimeout.current !== null) {
      clearTimeout(scrollTimeout.current);
    }
  };
}, [activeIndex, allProjects.length]);


	return (
		<div className="bg-black">
			{/* Mobile Version - Normal Scroll */}
			<div className="lg:hidden">
				{allProjects.map((project, index) => (
					<div key={project.id} className="max-h-screen w-full bg-black flex flex-col">
						{/* Video Section */}
						<div className="w-full h-[50vh] flex items-center justify-center p-4 sm:p-6">
							<video
								src={project.video}
								autoPlay
								loop
								muted
								playsInline
								className="w-full h-full max-w-[550px] max-h-[550px] mx-auto object-contain rounded-xl"
							/>
						</div>

						{/* Content Section */}
						<div className="w-full h-[28vh] flex items-center justify-center px-4 sm:px-8 mb-8">
							<div className="max-w-xl w-full">
								<div className="text-gray-500 text-4xl sm:text-sm font-mono mb-2 sm:mb-4">
									{project.number}
								</div>
								<h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">
									{project.title}
								</h1>
								<p className="text-gray-400 text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
									{project.subtitle}
								</p>
								<div className="flex flex-wrap gap-2 sm:gap-3">
									{project.names.map((name, i) => (
										<span
											key={i}
											className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm ${
												name === project.title
													? 'bg-white text-black'
													: 'bg-gray-800 text-gray-400'
											}`}
										>
											{name}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Desktop Version - Scroll Hijacking */}
			<div
				ref={containerRef}
				className="hidden lg:flex min-h-screen w-full overflow-hidden bg-black sticky top-0"
			>
				{/* Video Section - Right on desktop */}
				<div className="w-1/2 h-full flex items-center justify-center p-8 relative order-2">
					{allProjects.map((project, index) => (
						<div
							key={project.id}
							className="absolute inset-8 transition-all duration-1000 ease-out"
							style={{
								opacity: activeIndex === index ? 1 : 0,
								transform: activeIndex === index ? 'scale(1)' : 'scale(0.95)',
								pointerEvents: activeIndex === index ? 'auto' : 'none',
							}}
						>
							<video
								src={project.video}
								autoPlay
								loop
								muted
								playsInline
								className="w-full h-full max-w-[550px] max-h-[550px] mx-auto object-contain rounded-2xl"
							/>
						</div>
					))}
				</div>

				{/* Content Section - Left on desktop */}
				<div className="w-1/2 h-full flex items-center justify-center px-16 relative order-1">
					{allProjects.map((project, index) => (
						<div
							key={project.id}
							className="absolute inset-0 flex items-center justify-center px-16 transition-opacity duration-700 ease-in-out"
							style={{
								opacity: activeIndex === index ? 1 : 0,
								pointerEvents: activeIndex === index ? 'auto' : 'none',
							}}
						>
							<div className="max-w-xl w-full">
								<div className="text-gray-500 text-sm font-mono mb-4">{project.number}</div>
								<h1 className="text-white text-7xl font-bold mb-6">{project.title}</h1>
								<p className="text-gray-400 text-xl mb-8">{project.subtitle}</p>
								<div className="flex flex-wrap gap-4">
									{project.names.map((name, i) => (
										<span
											key={i}
											className={`px-4 py-2 rounded-full text-sm ${
												name === project.title
													? 'bg-white text-black'
													: 'bg-gray-800 text-gray-400'
											}`}
										>
											{name}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Scroll Indicator - Desktop only */}
				<div className="fixed bottom-8 right-8 flex flex-col gap-2 z-10">
					{allProjects.map((_, index) => (
						<div
							key={index}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								activeIndex === index ? 'bg-white h-8' : 'bg-gray-600'
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
