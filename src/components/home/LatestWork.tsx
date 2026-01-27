// videos ke saath

import vid1 from '../../assets/nymara_demo.mp4';
import vid2 from '../../assets/standford.mp4';
import vid3 from '../../assets/IB.mp4';
import { useState, useEffect, useRef } from 'react';

export default function ScrollVideoShowcase() {
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
						setActiveIndex((prev) => prev + 1);
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
						setActiveIndex((prev) => prev - 1);
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

	const handleNavigate = () => {
		// Replace '/your-target-page' with your actual route
		window.location.href = '/portfolio';
		// OR if you're using React Router:
		// navigate('/your-target-page');
	};

	return (
		<div className="bg-black">
			{/* Content above showcase */}

			{/* Scroll Video Showcase */}
			<div ref={containerRef} className="h-screen w-full overflow-hidden bg-black flex sticky top-0 relative">
				{/* Left Content Section */}
				<div className="w-1/2 h-full flex items-center justify-center px-16 relative">
					{allProjects.map((project, index) => (
						<div
							key={project.id}
							className="absolute inset-0 flex items-center justify-center px-16 transition-opacity duration-700 ease-in-out"
							style={{
								opacity: activeIndex === index ? 1 : 0,
								pointerEvents: activeIndex === index ? 'auto' : 'none',
							}}
						>
							<div className="max-w-xl">
								<div className="text-gray-500 text-7xl font-mono mb-4">{project.number}</div>
								<h1 className="text-white text-5xl font-bold mb-6">{project.title}</h1>
								<p className="text-gray-400 text-xl mb-8">{project.subtitle}</p>
								<div className="flex gap-4">
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

				{/* Right Video Section */}
				<div className="w-1/2 h-full flex items-center justify-center p-8 relative">
					{allProjects.map((project, index) => (
						<div
							key={project.id}
							className="absolute inset-8 transition-all duration-1000 ease-out flex flex-col justify-center items-center"
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
								className="w-[650px] h-[650px] object-contain rounded-2xl"
							/>
						</div>
					))}
				</div>

				{/* Bottom Center Button */}
				{/* Bottom Center Button */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
					<button
						onClick={handleNavigate}
						className="px-10 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 relative overflow-hidden group"
					>
						<span className="relative z-10">more projects</span>
						<span className="absolute inset-0 bg-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
						<span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
							more projects
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
