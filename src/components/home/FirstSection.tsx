import {  useRef } from 'react';
import vid from '../../assets/hero.mp4';

interface FirstSectionProps {
	scrollProgress: number;
	isLoaded: boolean;
	videoOpacity: number;
}

const FirstSection = ({ scrollProgress, isLoaded, videoOpacity }: FirstSectionProps) => {
	const sectionRef = useRef<HTMLDivElement | null>(null);

	const firstTextOpacity = scrollProgress < 0.5 ? Math.max(0, 1 - scrollProgress * 4) : 0;

	return (
		<>
			{/* Video Background Layer */}
			<div
				className="fixed inset-0 z-0 transition-opacity duration-500"
				style={{
					opacity: videoOpacity,
					pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
				}}
			>
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover"
				>
					<source src={vid} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Galaxy Canvas Layer */}
			<div
				className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-500"
				style={{ opacity: videoOpacity }}
			>
				<canvas id="galaxyCanvas" className="w-full h-full opacity-40 bg-[#151d58]"></canvas>
			</div>

			{/* Section 1: Imagination to Innovation */}
			<div
				ref={sectionRef}
				className="sticky top-0 h-screen flex flex-col px-6 md:px-20 z-10 mt-12 md:mt-0"
				style={{
					opacity: firstTextOpacity,
					transform: `translateX(${isLoaded ? 0 : -100}px) translateY(-${scrollProgress * 50}px)`,
					transition: isLoaded
						? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out'
						: 'none',
					pointerEvents: firstTextOpacity === 0 ? 'none' : 'auto',
				}}
			>
				<div className="flex-1 flex items-center justify-center">
					<div className="max-w-7xl w-full text-center flex flex-col justify-center items-center">
						<h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-light leading-tight tracking-tight mt-16 md:mt-10">
							<span
								className="block mb-2"
								style={{
									opacity: isLoaded ? 1 : 0,
									transform: `translateX(${isLoaded ? 0 : -50}px)`,
									transition:
										'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
								}}
							>
								<span className="inline-block w-16 md:w-24 h-0.5 bg-white/80 mr-4 mb-2 md:mb-4"></span>
								From
							</span>
							<span
								className="block mb-2"
								style={{
									opacity: isLoaded ? 1 : 0,
									transform: `translateX(${isLoaded ? 0 : -50}px)`,
									transition:
										'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
								}}
							>
								<span className="text-purple-400 font-normal">Imagination </span>to
							</span>
							<span
								className="block"
								style={{
									opacity: isLoaded ? 1 : 0,
									transform: `translateX(${isLoaded ? 0 : -50}px)`,
									transition:
										'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
								}}
							>
								<span className="text-purple-400 font-normal">Innovation</span> - We Build It.
							</span>
						</h1>
					</div>
				</div>

				{/* CTA Bottom Bar */}
				<div
					className="mb-28 md:mb-16 "
					style={{
						opacity: isLoaded ? 1 : 0,
						transform: `translateY(${isLoaded ? 0 : 20}px)`,
						transition:
							'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
					}}
				>
					<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
						<div className="text-white">
							<div className="text-xl md:text-2xl font-light mb-2">Bring your idea to life</div>
							<div className="text-sm md:text-base text-gray-400 font-light">
								Got an idea in mind? Let's turn it into reality.
							</div>
						</div>
						<div className="w-20 md:w-32 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
						<button className="bg-purple-600 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 group">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
								<rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
								<path
									d="M3 10H21M7 3V6M17 3V6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								/>
							</svg>
							Let's Talk
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default FirstSection