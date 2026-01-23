import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
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

			const steps = section.querySelectorAll('.step-card');
			if (steps.length === 0) return;

			// Kill only THIS component's ScrollTriggers
			scrollTriggersRef.current.forEach((trigger) => trigger.kill());
			scrollTriggersRef.current = [];

			ScrollTrigger.refresh();

			// Store the pin ScrollTrigger
			const pinTrigger = ScrollTrigger.create({
				trigger: section,
				start: 'top top',
				end: () => `+=${steps.length * 1000}`,
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
					x: () => `-${(steps.length - 1) * 17}%`,
					ease: 'none',
					scrollTrigger: {
						trigger: section,
						start: 'top top',
						end: () => `+=${steps.length * 900}`,
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
					{/* Left Side - HOW WE WORK Title */}
					<div className="w-1/2 h-full flex items-start justify-start pl-16 pt-32 flex-shrink-0">
						<div className="text-left sm:flex sm:flex-row gap-2">
							<h2 className="text-8xl font-bold leading-[0.9] text-white">
								HOW WE
								<br />
								WORK
							</h2>
							<p className="text-white text-md mb-4 tracking-wider">(PROCESS)</p>
						</div>
					</div>

					{/* Right Side - Cards in horizontal row */}
					<div className="flex items-center h-screen">
						{/* Step 1 - Discovery Phase */}
						<div className="step-card w-[25vw] max-h-screen flex items-center justify-center flex-shrink-0">
							<div className="border-2 border-gray-800 p-10 pl-10 pr-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
								<div className="mb-6">
									<span className="text-3xl font-bold text-gray-400">STEP 1</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="text-5xl font-bold mb-6 mt-40 text-white leading-tight transition-colors duration-300">
									Discovery
									<br />
									Phase
								</h3>
								<p className="text-gray-400 text-xl leading-relaxed">
									Understanding your, goals, pain points, audience, and
									<br />
									what sets you apart.
								</p>
							</div>
						</div>

						{/* Step 2 - Project Kickoff */}
						<div className="step-card w-[25vw] min-h-screen flex items-center justify-center flex-shrink-0">
							<div className="border-2 border-gray-800 p-10 pl-10 pr-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">STEP 2</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="text-5xl font-bold mb-6 mt-40 text-white leading-tight transition-colors duration-300">
									Project
									<br />
									Kickoff
								</h3>
								<p className="text-gray-400 text-xl leading-relaxed">
									Setting up projects, aligning on scope and milestones,
									<br />
									and diving into the work.
								</p>
							</div>
						</div>

						{/* Step 3 - Receive & Refine */}
						<div className="step-card w-[25vw] min-h-screen flex items-center justify-center flex-shrink-0">
							<div className="border-2 border-gray-800 p-10 pl-10 pr-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">STEP 3</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="text-5xl font-bold mt-40 mb-6 text-white leading-tight transition-colors duration-300">
									Receive
									<br />& Refine
								</h3>
								<p className="text-gray-400 text-xl leading-relaxed">
									Sharing initial designs, gathering feedback, and fine-
									<br />
									tuning together.
								</p>
							</div>
						</div>

						{/* Step 4 - Continue & Grow */}
						<div className="step-card w-[25vw] min-h-screen flex items-center justify-center flex-shrink-0">
							<div className="border-2 border-gray-800 p-10 pl-10 pr-2 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
								<div className="mb-6">
									<span className="text-3xl font-bold text-white">STEP 4</span>
									<span className="text-white text-5xl">.</span>
								</div>
								<h3 className="text-5xl font-bold mb-6 mt-40 text-white leading-tight transition-colors duration-300 hover:text-purple-400">
									Continue<br />
									& Grow
								</h3>
								<p className="text-gray-400 text-xl leading-relaxed">
									Launching your project and supporting ongoing growth
									<br />
									and extraordinary work.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile View */}
			<div ref={mobileContainerRef} className="md:hidden w-full bg-black py-12 mt-8 px-6">
				<div className="mb-12">
					<p className="text-white text-sm mt-2 tracking-wider">(PROCESS)</p>
					<h2 className="text-5xl sm:text-6xl font-bold leading-tight text-white">
						HOW WE
						<br />
						WORK
					</h2>
				</div>

				<div className="space-y-3">
					<div className="border-gray-700 border-2 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
						<div className="mb-24">
							<span className="text-2xl font-bold text-gray-400">STEP 1</span>
							<span className="text-white text-3xl">.</span>
						</div>
						<h3 className="text-4xl font-bold mb-4 text-white leading-tight">
							Discovery
							<br />
							Phase
						</h3>
						<p className="text-gray-400 text-md leading-relaxed">
							Understanding your goals, pain points, audience, and what sets you apart.
						</p>
					</div>

					<div className="border-gray-700 border-2 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
						<div className="mb-24">
							<span className="text-2xl font-bold text-white">STEP 2</span>
							<span className="text-white text-3xl">.</span>
						</div>
						<h3 className="text-4xl font-bold mb-4 text-white leading-tight">
							Project
							<br />
							Kickoff
						</h3>
						<p className="text-gray-400 text-md leading-relaxed">
							Setting up projects, aligning on scope and milestones, and diving into the work.
						</p>
					</div>

					<div className="border-gray-700 border-2 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
						<div className="mb-24">
							<span className="text-2xl font-bold text-white">STEP 3</span>
							<span className="text-white text-3xl">.</span>
						</div>
						<h3 className="text-4xl font-bold mb-4 text-white leading-tight">
							Receive
							<br />& Refine
						</h3>
						<p className="text-gray-400 text-md leading-relaxed">
							Sharing initial designs, gathering feedback, and fine-tuning together.
						</p>
					</div>

					<div className="border-gray-700 border-2 p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20">
						<div className="mb-24">
							<span className="text-2xl font-bold text-white">STEP 4</span>
							<span className="text-white text-3xl">.</span>
						</div>
						<h3 className="text-4xl font-bold mb-4 text-white leading-tight">
							Continue &<br />
							Grow
						</h3>
						<p className="text-gray-400 text-md leading-relaxed">
							Launching your project and supporting ongoing growth and extraordinary work.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}