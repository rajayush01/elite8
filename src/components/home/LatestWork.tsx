import vid1 from '../../assets/nymara_demo.mp4';
import vid2 from '../../assets/standford.mp4';
import vid3 from '../../assets/IB.mp4';
import { useState, useEffect, useRef } from 'react';

export default function ScrollVideoShowcase() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const autoScrollInterval = useRef<number | null>(null);

	const allProjects = [
		{
			id: 1,
			number: '01.',
			title: 'Nymara',
			subtitle: 'Personal Portfolio Website for talented design engineer',
			video: vid1,
		},
		{
			id: 2,
			number: '02.',
			title: 'Standford',
			subtitle: 'Website and branding for AI Automation Company',
			video: vid2,
		},
		{
			id: 3,
			number: '03.',
			title: 'IB Tech',
			subtitle: 'Website and branding for all kind of Design Agency',
			video: vid3,
		},
	];

	// Auto-scroll functionality
	useEffect(() => {
		if (!isPaused) {
			autoScrollInterval.current = window.setInterval(() => {
				setActiveIndex((prev) => (prev + 1) % allProjects.length);
			}, 10000); // Change slide every 4 seconds
		}

		return () => {
			if (autoScrollInterval.current !== null) {
				clearInterval(autoScrollInterval.current);
			}
		};
	}, [isPaused, allProjects.length]);

	const handleNavigate = () => {
		window.location.href = '/portfolio';
	};

	const goToSlide = (index: number) => {
		setActiveIndex(index);
		setIsPaused(true);
		// Resume auto-scroll after 8 seconds of manual interaction
		setTimeout(() => setIsPaused(false), 8000);
	};

	const nextSlide = () => {
		setActiveIndex((prev) => (prev + 1) % allProjects.length);
		setIsPaused(true);
		setTimeout(() => setIsPaused(false), 8000);
	};

	const prevSlide = () => {
		setActiveIndex((prev) => (prev - 1 + allProjects.length) % allProjects.length);
		setIsPaused(true);
		setTimeout(() => setIsPaused(false), 8000);
	};

	return (
		<div className="bg-black min-h-screen w-full py-8 md:py-0">
			{/* Carousel Container */}
			<div className="min-h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16">
				<div className="w-full max-w-7xl">
					{/* Main Content */}
					<div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative">
						{/* Left Content Section */}
						<div className="w-full lg:w-1/2 relative order-2 lg:order-1">
							<div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center">
								{allProjects.map((project, index) => (
									<div
										key={project.id}
										className="absolute inset-0 flex items-center transition-all duration-1000 ease-out"
										style={{
											opacity: activeIndex === index ? 1 : 0,
											transform: activeIndex === index ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.95)',
											pointerEvents: activeIndex === index ? 'auto' : 'none',
										}}
									>
										<div className="w-full px-4 md:px-0">
											<div className="text-gray-500 text-4xl md:text-6xl lg:text-7xl font-mono mb-3 md:mb-4 animate-fade-in">
												{project.number}
											</div>
											<h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-in-delay-1">
												{project.title}
											</h1>
											<p className="text-gray-400 text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-lg animate-fade-in-delay-2">
												{project.subtitle}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right Video Section */}
						<div className="w-full lg:w-1/2 relative order-1 lg:order-2">
							<div className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center">
								{allProjects.map((project, index) => (
									<div
										key={project.id}
										className="absolute inset-0 transition-all duration-1000 ease-out flex items-center justify-center p-4"
										style={{
											opacity: activeIndex === index ? 1 : 0,
											transform: activeIndex === index ? 'scale(1) rotateY(0deg)' : 'scale(0.9) rotateY(10deg)',
											pointerEvents: activeIndex === index ? 'auto' : 'none',
										}}
									>
										<video
											src={project.video}
											autoPlay
											loop
											muted
											playsInline
											className="w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[650px] lg:max-h-[650px] object-contain rounded-xl md:rounded-2xl shadow-2xl"
										/>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Navigation Controls */}
					<div className="flex items-center justify-center gap-6 md:gap-8 ">
						{/* Previous Button */}
						<button
							onClick={prevSlide}
							className="p-3 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-110"
							aria-label="Previous slide"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5 md:w-6 md:h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
							</svg>
						</button>

						{/* Dot Indicators */}
						<div className="flex gap-2 md:gap-3">
							{allProjects.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className="group relative"
									aria-label={`Go to slide ${index + 1}`}
								>
									<div
										className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
											activeIndex === index ? 'bg-white scale-125' : 'bg-gray-600 hover:bg-gray-500'
										}`}
									/>
									{activeIndex === index && (
										<div className="absolute inset-0 -m-1 md:-m-1.5 rounded-full border-2 border-white/30 animate-ping" />
									)}
								</button>
							))}
						</div>

						{/* Next Button */}
						<button
							onClick={nextSlide}
							className="p-3 md:p-4 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-110"
							aria-label="Next slide"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5 md:w-6 md:h-6"
							>
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
							</svg>
						</button>
					</div>

					{/* More Projects Button */}
					<div className="flex justify-center mt-8 md:mt-12">
						<button
							onClick={handleNavigate}
							className="px-6 md:px-10 py-3 md:py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 relative overflow-hidden group text-sm md:text-base"
						>
							<span className="relative z-10 transition-colors duration-500 group-hover:text-white">
								More Projects
							</span>
							<span className="absolute inset-0 bg-purple-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
						</button>
					</div>

					
				</div>
			</div>

			<style>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.8s ease-out forwards;
				}

				.animate-fade-in-delay-1 {
					animation: fade-in 0.8s ease-out 0.1s forwards;
					opacity: 0;
				}

				.animate-fade-in-delay-2 {
					animation: fade-in 0.8s ease-out 0.2s forwards;
					opacity: 0;
				}

				.animate-fade-in-delay-3 {
					animation: fade-in 0.8s ease-out 0.3s forwards;
					opacity: 0;
				}
			`}</style>
		</div>
	);
}