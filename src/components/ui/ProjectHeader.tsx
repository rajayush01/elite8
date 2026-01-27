import React, { useState, useEffect } from 'react';

type Particle = {
	id: number;
	x: number;
	y: number;
	size: number;
	duration: number;
	delay: number;
};

export default function ProjectsHeader() {
	const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
	const [isHovered, setIsHovered] = useState(false);
	const [particles, setParticles] = useState<Particle[]>([]);

	useEffect(() => {
		// Generate subtle particles
		const newParticles = Array.from({ length: 20 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 2 + 1,
			duration: Math.random() * 4 + 3,
			delay: Math.random() * 2,
		}));
		setParticles(newParticles);
	}, []);

	const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		setMousePosition({
			x: ((e.clientX - rect.left) / rect.width) * 100,
			y: ((e.clientY - rect.top) / rect.height) * 100,
		});
	};

	return (
		<section
			className="w-full h-screen flex justify-center items-center text-white relative overflow-hidden bg-black"
			onMouseMove={handleMouseMove}
		>
			{/* Subtle animated gradient background */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #c82736 0%, #e77614 35%, #8d3dae 70%, transparent 100%)`,
					transition: 'background 0.5s ease',
				}}
			/>

			{/* Minimal floating particles */}
			{particles.map((particle) => (
				<div
					key={particle.id}
					className="absolute rounded-full bg-white opacity-5"
					style={{
						left: `${particle.x}%`,
						top: `${particle.y}%`,
						width: `${particle.size}px`,
						height: `${particle.size}px`,
						animation: `float ${particle.duration}s ease-in-out infinite`,
						animationDelay: `${particle.delay}s`,
					}}
				/>
			))}

			{/* Subtle grid pattern */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
					backgroundSize: '60px 60px',
				}}
			/>

			<div className="max-w-7xl w-full px-8 relative z-10">
				<div className="flex flex-col items-center justify-center gap-12">
					{/* Top - Elegant geometric illustration */}
					<div className="w-full max-w-xs relative opacity-0 animate-fadeInLeft">
						<div className="relative w-48 h-48 mx-auto">
							{/* Outer rotating ring */}
							<div
								className="absolute inset-0 rounded-full border border-gray-800 animate-spin-slow"
								style={{
									background: 'radial-gradient(circle, transparent 60%, rgba(200, 39, 54, 0.1) 100%)',
								}}
							/>

							{/* Middle ring */}
							<div
								className="absolute inset-8 rounded-full border border-gray-700"
								style={{
									background:
										'radial-gradient(circle, transparent 50%, rgba(231, 118, 20, 0.1) 100%)',
									animation: 'spin-slow-reverse 20s linear infinite',
								}}
							/>

							{/* Inner glow */}
							<div
								className="absolute inset-16 rounded-full"
								style={{
									background: 'radial-gradient(circle, rgba(141, 61, 174, 0.2) 0%, transparent 70%)',
									animation: 'pulse-glow 3s ease-in-out infinite',
								}}
							/>

							{/* Center dot */}
							<div className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 animate-pulse" />

							{/* Floating accent dots */}
							<div className="absolute top-8 right-8 w-2 h-2 bg-orange-500 rounded-full opacity-60 animate-float-slow" />
							<div className="absolute bottom-12 left-12 w-2 h-2 bg-purple-500 rounded-full opacity-60 animate-float-delayed" />
							<div className="absolute top-20 left-8 w-1.5 h-1.5 bg-red-500 rounded-full opacity-60 animate-float" />
						</div>
					</div>

					{/* Center - Main heading */}
					<div
						className="w-full text-center relative"
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{/* Subtle decorative lines */}
						<div className="absolute left-1/2 -translate-x-1/2 -top-8 w-px h-6 bg-gradient-to-b from-transparent via-gray-700 to-gray-600 opacity-0 animate-slideInTop" />
						<div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-px h-6 bg-gradient-to-t from-transparent via-gray-700 to-gray-600 opacity-0 animate-slideInBottom" />

						<h2 className="text-3xl md:text-8xl lg:text-9xl font-bold font-serif mb-6 relative inline-block cursor-pointer select-none">
							{/* Main text */}
							<span
								className="relative transition-all duration-500"
								style={{
									color: isHovered ? '#8d3dae' : '#ccc',
								}}
							>
								{'OUR PROJECTS'.split('').map((char, index) => (
									<span
										key={index}
										className="inline-block transition-all duration-300"
										style={{
											animation: isHovered ? `bounce 0.6s ease-in-out ${index * 0.05}s` : 'none',
										}}
									>
										{char === ' ' ? '\u00A0' : char}
									</span>
								))}
							</span>
						</h2>

						<p className="text-lg md:text-xl text-gray-500 font-light tracking-widest opacity-0 animate-fadeInUp uppercase">
							Crafting Digital Excellence
						</p>
					</div>

					{/* Bottom - Minimalist icon grid */}
					<div className="w-full max-w-xs opacity-0 animate-fadeInRight">
						<div className="grid grid-cols-3 gap-10 max-w-xs mx-auto">
							{[...Array(9)].map((_, i) => (
								<div
									key={i}
									className="aspect-square border border-gray-800 rounded-lg flex items-center justify-center group hover:border-gray-600 transition-all duration-500 relative overflow-hidden"
									style={{
										animation: `fadeInStagger 0.6s ease-out ${i * 0.1}s forwards`,
										opacity: 0,
									}}
								>
									<div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
									<div className="w-2 h-2 bg-gray-700 rounded-full group-hover:bg-gray-400 transition-colors duration-500 relative z-10" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes slideInTop {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes slideInBottom {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInStagger {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-slideInTop {
          animation: slideInTop 1s ease-out 0.8s forwards;
        }

        .animate-slideInBottom {
          animation: slideInBottom 1s ease-out 0.8s forwards;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 1.2s forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 1s ease-out 0.3s forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out 0.3s forwards;
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite 0.5s;
        }
      `}</style>
		</section>
	);
}
