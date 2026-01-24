import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '@/assets/try.jpg';
import ProjectsHeader from '@/components/ui/ProjectHeader';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSnap() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const words = ['together.', 'brands.', 'products.', 'designs.', 'ideas.'];
	const [currentWordIndex, setCurrentWordIndex] = useState(0);

	// Typing effect
	useEffect(() => {
		const currentWord = words[currentWordIndex];
		const typingSpeed = isDeleting ? 50 : 150;
		const pauseTime = 2000;

		const timer = setTimeout(() => {
			if (!isDeleting) {
				if (currentText.length < currentWord.length) {
					setCurrentText(currentWord.slice(0, currentText.length + 1));
				} else {
					setTimeout(() => setIsDeleting(true), pauseTime);
				}
			} else {
				if (currentText.length > 0) {
					setCurrentText(currentText.slice(0, -1));
				} else {
					setIsDeleting(false);
					setCurrentWordIndex((prev) => (prev + 1) % words.length);
				}
			}
		}, typingSpeed);

		return () => clearTimeout(timer);
	}, [currentText, isDeleting, currentWordIndex, words]);

	useEffect(() => {
		if (!containerRef.current) return;

		const panels = containerRef.current.querySelectorAll('.panel');

		const ctx = gsap.context(() => {
			gsap.to(panels, {
				xPercent: -100 * (panels.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: containerRef.current,
					pin: true,
					scrub: 1,
					snap: 1 / (panels.length - 1),
					start: 'top top',
					end: '+=3500',
				},
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div id="root">
			<div ref={containerRef} className="w-[600%] flex flex-nowrap bg-black">
				<div className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5">
					<section className=" font-semibold text-2xl text-center text-white relative box-border p-2.5 ">
						<div className="max-w-4xl mt-44">
							<h1 className="text-5xl md:text-8xl mb-8">
								<span className="font-serif">Let's create</span>
								<br />
								<span className="font-['Brush_Script_MT',cursive] italic text-6xl md:text-8xl">
									{currentText}
									<span className="animate-pulse">|</span>
								</span>
							</h1>

							<p className="text-gray-400 text-lg md:text-xl max-w-2xl ml-32">
								We help businesses find their voice, shape their identity, and connect with their
								audience. <span className="font-bold text-gray-700">Less talk. More craft.</span>
							</p>

							<h1 className="-rotate-12 mt-20">
								<span
									className="font-serif italic text-6xl md:text-8xl md:text-[250px]"
									style={{
										backgroundImage: `url(${img})`,
										backgroundSize: 'cover',
										backgroundPosition: 'center',
										backgroundClip: 'text',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										color: 'transparent',
									}}
								>
									ELITE8
								</span>
							</h1>
						</div>
					</section>
				</div>


				<section className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden">
					<ProjectsHeader/>
				</section>

				<section className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden">
					<div className="max-w-7xl w-full px-8">
						{/* Animated Header */}
						<div className="mb-16 relative">
							<h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 relative inline-block">
								<span
									className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
								<span
									className="relative"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
							</h2>
						</div>

						{/* Project Showcase */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Project Image with Hover Effect */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#c82736] to-[#e77614] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<img
										src={img}
										alt="Featured Project"
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Brand Evolution</h3>
											<p className="text-gray-300">Complete visual identity redesign</p>
										</div>
									</div>
								</div>
							</div>

							{/* Project Video with Animated Border */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#8d3dae] to-[#28a92b] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<video
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									>
										<source
											src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-34487-large.mp4"
											type="video/mp4"
										/>
									</video>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Digital Experience</h3>
											<p className="text-gray-300">Interactive web platform</p>
										</div>
									</div>
									<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Animated Stats */}
						<div className="mt-16 flex flex-col justify-center items-center">
							<div>Description</div>
						</div>
					</div>
				</section>

				<section className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden">
					<div className="max-w-7xl w-full px-8">
						{/* Animated Header */}
						<div className="mb-16 relative">
							<h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 relative inline-block">
								<span
									className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
								<span
									className="relative"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
							</h2>
						</div>

						{/* Project Showcase */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Project Image with Hover Effect */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#c82736] to-[#e77614] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<img
										src={img}
										alt="Featured Project"
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Brand Evolution</h3>
											<p className="text-gray-300">Complete visual identity redesign</p>
										</div>
									</div>
								</div>
							</div>

							{/* Project Video with Animated Border */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#8d3dae] to-[#28a92b] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<video
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									>
										<source
											src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-34487-large.mp4"
											type="video/mp4"
										/>
									</video>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Digital Experience</h3>
											<p className="text-gray-300">Interactive web platform</p>
										</div>
									</div>
									<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Animated Stats */}
						<div className="mt-16 flex flex-col justify-center items-center">
							<div>Title</div>
							<div>Description</div>
						</div>
					</div>
				</section>

				<section className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden">
					<div className="max-w-7xl w-full px-8">
						{/* Animated Header */}
						<div className="mb-16 relative">
							<h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 relative inline-block">
								<span
									className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
								<span
									className="relative"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
							</h2>
						</div>

						{/* Project Showcase */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Project Image with Hover Effect */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#c82736] to-[#e77614] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<img
										src={img}
										alt="Featured Project"
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Brand Evolution</h3>
											<p className="text-gray-300">Complete visual identity redesign</p>
										</div>
									</div>
								</div>
							</div>

							{/* Project Video with Animated Border */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#8d3dae] to-[#28a92b] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<video
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									>
										<source
											src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-34487-large.mp4"
											type="video/mp4"
										/>
									</video>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Digital Experience</h3>
											<p className="text-gray-300">Interactive web platform</p>
										</div>
									</div>
									<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Animated Stats */}
						<div className="mt-16 flex flex-col justify-center items-center">
							<div>Title</div>
							<div>Description</div>
						</div>
					</div>
				</section>

				<section className="panel w-full h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden">
					<div className="max-w-7xl w-full px-8">
						{/* Animated Header */}
						<div className="mb-16 relative">
							<h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 relative inline-block">
								<span
									className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
								<span
									className="relative"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										backgroundClip: 'text',
									}}
								>
									TITLE
								</span>
							</h2>
						</div>

						{/* Project Showcase */}
						<div className="grid md:grid-cols-2 gap-12 items-center">
							{/* Project Image with Hover Effect */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#c82736] to-[#e77614] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<img
										src={img}
										alt="Featured Project"
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Brand Evolution</h3>
											<p className="text-gray-300">Complete visual identity redesign</p>
										</div>
									</div>
								</div>
							</div>

							{/* Project Video with Animated Border */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-[#8d3dae] to-[#28a92b] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<video
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
									>
										<source
											src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-34487-large.mp4"
											type="video/mp4"
										/>
									</video>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-3xl font-bold mb-2">Digital Experience</h3>
											<p className="text-gray-300">Interactive web platform</p>
										</div>
									</div>
									<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fillRule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Animated Stats */}
						<div className="mt-16 flex flex-col justify-center items-center">
							<div>Title</div>
							<div>Description</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
