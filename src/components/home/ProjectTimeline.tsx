import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectTimeline() {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const mobileContainerRef = useRef<HTMLDivElement>(null);
	const [isDesktop, setIsDesktop] = useState(false);
	const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

	useEffect(() => {
		const checkDesktop = () => {
			setIsDesktop(window.innerWidth >= 768);
		};
		
		checkDesktop();
		window.addEventListener('resize', checkDesktop);
		
		return () => window.removeEventListener('resize', checkDesktop);
	}, []);

	useEffect(() => {
		if (!isDesktop || !containerRef.current || !contentRef.current) return;

		const timer = setTimeout(() => {
			const section = containerRef.current;
			const content = contentRef.current;
			if (!section || !content) return;

			const cards = section.querySelectorAll('.timeline-card');
			if (cards.length === 0) return;

			// Kill only THIS component's ScrollTriggers
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];

			ScrollTrigger.refresh();

			// Store the pin ScrollTrigger
			const pinTrigger = ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: () => `+=${cards.length * 1000}`,
				pin: true,
				scrub: 1,
				anticipatePin: 1,
			});
			scrollTriggersRef.current.push(pinTrigger);

			// Animate content and store the ScrollTrigger
			const animationTrigger = gsap.fromTo(
				content,
				{
					x: '0%',
				},
				{
					x: () => `-${(cards.length - 1) * 16}%`,
					ease: 'none',
					scrollTrigger: {
						trigger: section,
						start: 'top top',
						end: () => `+=${cards.length * 900}`,
						scrub: 1,
						invalidateOnRefresh: true,
					},
				}
			).scrollTrigger;
			
			if (animationTrigger) {
				scrollTriggersRef.current.push(animationTrigger);
			}
		}, 100);

		return () => {
			clearTimeout(timer);
			// Kill only THIS component's ScrollTriggers
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];
		};
	}, [isDesktop]);

	useEffect(() => {
		if (isDesktop) {
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
	}, [isDesktop]);

	return (
		<>
			{/* Desktop View */}
			<div ref={containerRef} className="hidden md:block w-full h-screen bg-black overflow-hidden relative">
				<div ref={contentRef} className="absolute inset-0 flex">
					{/* Left Side - Header Section */}
					<div className="w-1/2 h-full flex items-start justify-start pl-16 pt-32 flex-shrink-0">
						<div className="text-left">
							<p className="text-purple-600 text-sm font-medium mb-4 tracking-wider uppercase">
								STOCKED OPERATION ACROSS THE WORLD
							</p>
							<h1 className="text-6xl font-bold mb-4 text-white">
								We have best 
								<br />
								team
								
								and best<br /> process
							</h1>
							<p className="text-gray-400 pt-4 text-lg max-w-md">
								Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing.
								Indulgence way everything joy.
							</p>
						</div>
					</div>

					{/* Right Side - Timeline Cards in horizontal row */}
					<div className="flex items-center h-screen">
						{/* Card 1 - Project Discovery Call */}
						<div className="timeline-card w-[25vw] h-screen flex items-center justify-center flex-shrink-0">
							<div className="bg-purple-900 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 max-w-sm">
								<div className="mb-6">
									<span className="text-3xl font-bold text-gray-400">1</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="font-bold text-2xl mb-40 text-white">
									Project Discovery Call
								</h3>
								<p className="text-gray-300 mt-40 text-base leading-relaxed">
									We start by understanding your business, goals, and target audience to define the
									project scope.
								</p>
							</div>
						</div>

						{/* Card 2 - Strategy */}
						<div className="timeline-card w-[25vw] h-screen flex items-center justify-center flex-shrink-0">
							<div className="bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 max-w-sm">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">2</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="font-bold text-2xl mb-48 text-white">
									Strategy
								</h3>
								<p className="text-gray-300 text-base leading-relaxed">
									His defective nor convinced residence own. Connection has put impossible own
									apartments boisterous.
								</p>
							</div>
						</div>

						{/* Card 3 - Design & Development */}
						<div className="timeline-card w-[25vw] h-screen flex items-center justify-center flex-shrink-0">
							<div className="bg-purple-900 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 max-w-sm">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">3</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="font-bold text-2xl mb-44 text-white">
									Design & Development
								</h3>
								<p className="text-gray-300 text-base mb-4 leading-relaxed">
									Our team creates stunning designs and builds robust, scalable solutions.
								</p>
							</div>
						</div>

						{/* Card 4 - Launch & Support */}
						<div className="timeline-card w-[25vw] h-screen flex items-center justify-center flex-shrink-0">
							<div className="bg-gray-800 rounded-lg p-8 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/40 max-w-sm">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">4</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="font-bold text-2xl mb-52 text-white">
									Launch & Support
								</h3>
								<p className="text-gray-300 text-base mb-4  leading-relaxed">
									We ensure a smooth launch and provide ongoing support to help you succeed.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile View */}
			<div ref={mobileContainerRef} className="md:hidden w-full bg-black py-12 px-6">
				<div className="mb-12">
					<p className="text-purple-600 text-xs font-medium mb-3 tracking-wider uppercase">
						STOCKED OPERATION ACROSS THE WORLD
					</p>
					<h1 className="text-3xl font-bold mb-3 text-white">
						We have best team
						
						and best process
					</h1>
					<p className="text-gray-400 text-sm max-w-md mb-6">
						Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing.
						Indulgence way everything joy.
					</p>
				</div>

				{/* Mobile - Vertical Timeline */}
				<div className="relative space-y-8">
					{/* Timeline Line */}
					<div className="absolute left-2 top-0 bottom-0 w-0.5 bg-purple-600"></div>

					{/* Card 1 */}
					<div className="relative pl-10">
						<div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
						<div className="bg-purple-900 rounded-lg p-4 shadow-lg">
							<h3 className="font-bold text-lg mb-2 text-white">Project Discovery Call</h3>
							<p className="text-gray-400 text-sm">
								We start by understanding your business, goals, and target audience to define the
								project scope.
							</p>
						</div>
					</div>

					{/* Card 2 */}
					<div className="relative pl-10">
						<div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
						<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
							<h3 className="font-bold text-lg mb-2 text-white">Strategy</h3>
							<p className="text-gray-400 text-sm">
								His defective nor convinced residence own. Connection has put impossible own
								apartments boisterous.
							</p>
						</div>
					</div>

					{/* Card 3 */}
					<div className="relative pl-10">
						<div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
						<div className="bg-purple-900 rounded-lg p-4 shadow-lg">
							<h3 className="font-bold text-lg mb-2 text-white">Design & Development</h3>
							<p className="text-gray-400  text-sm">
								Our team creates stunning designs and builds robust, scalable solutions.
							</p>
						</div>
					</div>

					{/* Card 4 */}
					<div className="relative pl-10">
						<div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
						<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
							<h3 className="font-bold text-lg mb-2 text-white">Launch & Support</h3>
							<p className="text-gray-400 text-sm">
								We ensure a smooth launch and provide ongoing support to help you succeed.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}







// import React from 'react';

// export default function ProjectTimeline() {
// 	return (
// 		<div className="min-h-screen flex items-center justify-center p-4 md:p-8 mb-20">
// 			<div className="bg-black rounded-lg shadow-lg p-6 md:p-12 max-w-7xl w-full">
// 				{/* Header Section */}
// 				<div className="mb-8 md:mb-16">
// 					<p className="text-purple-600 text-xs md:text-sm font-medium mb-3 md:mb-4 tracking-wider uppercase">
// 						STOCKED OPERATION ACROSS THE WORLD
// 					</p>
// 					<h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
// 						We have best team
// 						<br />
// 						and best process
// 					</h1>
// 					<p className="text-gray-400 text-sm md:text-base max-w-md mb-6">
// 						Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing.
// 						Indulgence way everything joy.
// 					</p>
// 				</div>

// 				{/* Timeline Section */}
// 				<div className="relative">
// 					{/* Desktop - Curved Timeline */}
// 					<div className="hidden md:block -rotate-12">
// 						{/* SVG Path */}
// 						<svg className="absolute w-full h-80" viewBox="0 0 1200 300" preserveAspectRatio="none">
// 							<path
// 								d="M 0,180 C 100,180 100,240 200,240 C 300,240 300,140 450,140 C 600,140 600,80 750,80 C 900,80 900,180 1050,180 C 1100,180 1150,180 1200,180"
// 								fill="none"
// 								stroke="#C084FC"
// 								strokeWidth="2.5"
// 							/>
// 							{/* Dots */}
// 							<circle cx="200" cy="240" r="7" fill="#9CA3AF" />
// 							<circle cx="450" cy="140" r="7" fill="#9CA3AF" />
// 							<circle cx="750" cy="80" r="7" fill="#9CA3AF" />
// 							<circle cx="1050" cy="180" r="7" fill="#9CA3AF" />
// 						</svg>

// 						{/* Timeline Cards */}
// 						<div className="relative pt-12">
// 							{/* Card 1 - Bottom Left */}
// 							<div className="absolute left-0 top-56 w-56 bg-purple-900 rounded-lg p-5 shadow-lg mt-16">
// 								<h3 className="font-bold text-base mb-2 text-white">Project Discovery Call</h3>
// 								<p className="text-gray-400 text-sm">
// 									We start by understanding your business, goals, and target audience to define the
// 									project scope.
// 								</p>
// 							</div>

// 							{/* Card 2 - Top Middle Left */}
// 							<div className="absolute left-96 -translate-x-1/2 top-16 w-56 bg-gray-800 rounded-lg p-5 shadow-lg -mt-28">
// 								<h3 className="font-bold text-base mb-2 text-white">Strategy</h3>
// 								<p className="text-gray-400 text-sm">
// 									His defective nor convinced residence own. Connection has put impossible own
// 									apartments boisterous.
// 								</p>
// 							</div>

// 							{/* Card 3 - Top Middle Right */}
// 							<div className="absolute left-1/2 translate-x-1/4 top-0 w-56 bg-purple-900 rounded-lg p-5 shadow-lg -mt-28">
// 								<h3 className="font-bold text-base mb-2 text-white">Design & Development</h3>
// 								<p className="text-gray-400 text-sm">
// 									Our team creates stunning designs and builds robust, scalable solutions.
// 								</p>
// 							</div>

// 							{/* Card 4 - Bottom Right */}
// 							<div className="absolute right-0 top-56 w-56 bg-gray-800 rounded-lg p-5 shadow-lg">
// 								<h3 className="font-bold text-base mb-2 text-white">PLaunch & Support</h3>
// 								<p className="text-gray-400 text-sm">
// 									We ensure a smooth launch and provide ongoing support to help you succeed.								</p>
// 							</div>

// 							{/* Spacer for layout */}
// 							<div className="h-96"></div>
// 						</div>
// 					</div>

// 					{/* Mobile - Vertical Timeline */}
// 					<div className="md:hidden space-y-8">
// 						{/* Timeline Line */}
// 						<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-purple-600"></div>

// 						{/* Card 1 */}
// 						<div className="relative pl-16">
// 							<div className="absolute left-6 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
// 							<div className="bg-purple-900 rounded-lg p-4 shadow-lg">
// 								<h3 className="font-bold text-sm mb-2 text-white">Project Discovery Call</h3>
// 								<p className="text-gray-400 text-xs">
// 									Fifteen we years to order allow asked of. We so opinion friends me message as
// 									delight.
// 								</p>
// 							</div>
// 						</div>

// 						{/* Card 2 */}
// 						<div className="relative pl-16">
// 							<div className="absolute left-6 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
// 							<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
// 								<h3 className="font-bold text-sm mb-2 text-white">Project Discovery Call</h3>
// 								<p className="text-gray-400 text-xs">
// 									His defective nor convinced residence own. Connection has put impossible own
// 									apartments boisterous.
// 								</p>
// 							</div>
// 						</div>

// 						{/* Card 3 */}
// 						<div className="relative pl-16">
// 							<div className="absolute left-6 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
// 							<div className="bg-purple-900 rounded-lg p-4 shadow-lg">
// 								<h3 className="font-bold text-sm mb-2 text-white">Project Discovery Call</h3>
// 								<p className="text-gray-400 text-xs">
// 									From they fine john he give of rich he. They age and draw mrs like. Improving end
// 									distrusts may instantly.
// 								</p>
// 							</div>
// 						</div>

// 						{/* Card 4 */}
// 						<div className="relative pl-16">
// 							<div className="absolute left-6 top-3 w-4 h-4 rounded-full bg-gray-400"></div>
// 							<div className="bg-gray-800 rounded-lg p-4 shadow-lg">
// 								<h3 className="font-bold text-sm mb-2 text-white">Project Discovery Call</h3>
// 								<p className="text-gray-400 text-xs">
// 									Enable middle music agree to. Assistance imprudence yet sentiments unpleasant
// 									expression met surrounded.
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
