import { useEffect, useState, useRef } from 'react';
import vid from '../../assets/hero.mp4';

const HeroSection = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const textRef = useRef<HTMLDivElement | null>(null);

	// --- Galaxy Canvas Animation ---
	useEffect(() => {
		// Trigger initial animation after component mounts
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);

		const canvas = document.getElementById('galaxyCanvas') as HTMLCanvasElement | null;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles: Particle[] = [];
		const particleCount = 150;

		class Particle {
			x!: number;
			y!: number;
			size!: number;
			speedX!: number;
			speedY!: number;
			opacity!: number;
			twinkleSpeed!: number;
			twinklePhase!: number;
			currentOpacity!: number;

			constructor(private canvas: HTMLCanvasElement) {
				this.reset();
			}

			reset() {
				this.x = Math.random() * this.canvas.width;
				this.y = Math.random() * this.canvas.height;
				this.size = Math.random() * 1 + 0.2;
				this.speedX = (Math.random() - 0.5) * 0.08;
				this.speedY = (Math.random() - 0.5) * 0.08;
				this.opacity = Math.random() * 0.4 + 0.1;
				this.twinkleSpeed = Math.random() * 0.015 + 0.003;
				this.twinklePhase = Math.random() * Math.PI * 2;
				this.currentOpacity = this.opacity;
			}

			update() {
				this.x += this.speedX;
				this.y += this.speedY;

				if (this.x < 0) this.x = this.canvas.width;
				if (this.x > this.canvas.width) this.x = 0;
				if (this.y < 0) this.y = this.canvas.height;
				if (this.y > this.canvas.height) this.y = 0;

				this.twinklePhase += this.twinkleSpeed;
				this.currentOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
			}

			draw(ctx: CanvasRenderingContext2D) {
				const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);

				gradient.addColorStop(0, `rgba(255, 255, 255, ${this.currentOpacity * 0.5})`);
				gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.currentOpacity * 0.2})`);
				gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
				ctx.fill();

				ctx.fillStyle = `rgba(255, 255, 255, ${this.currentOpacity})`;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		// Normal particles
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle(canvas));
		}

		// Brighter particles
		for (let i = 0; i < 20; i++) {
			const p = new Particle(canvas);
			p.size = Math.random() * 1.5 + 0.8;
			p.opacity = Math.random() * 0.3 + 0.2;
			particles.push(p);
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			particles
				.sort((a, b) => a.size - b.size)
				.forEach((p) => {
					p.update();
					p.draw(ctx);
				});

			requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			clearTimeout(timer);
		};
	}, []);

	// --- Scroll Tracking ---
	useEffect(() => {
		const handleScroll = () => {
			if (!sectionRef.current) return;
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const progress = Math.min(Math.max(scrollY / (windowHeight * 2), 0), 1);
			setScrollProgress(progress);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// --- Animation Values ---
	const firstTextOpacity = scrollProgress < 0.5 ? Math.max(0, 1 - scrollProgress * 4) : 0.5;
	const secondTextProgress = scrollProgress < 0.5 ? 0 : Math.max(0, Math.min((scrollProgress - 0.5) * 2, 1));

	// Text slides up from bottom smoothly - starts very close to bottom
	const textSlideProgress = scrollProgress < 0.5 ? 0 : Math.min((scrollProgress - 0.5) * 2.5, 1);
	const textTranslateY = (1 - textSlideProgress) * 200; // Starts at 200px below (closer to bottom)

	// Video fades out near the end of the scroll
	const videoOpacity = scrollProgress < 0.8 ? 1 : Math.max(0, 1 - (scrollProgress - 0.8) / 0.2);

	// --- Text Reveal Logic - Character by Character with Opacity (Very Slow) ---
	const text = 'We craft scalable websites, applications, and platforms—engineered for performance and built to help businesses grow.';
	const words = text.split(' ');

	const getCharOpacity = (wordIndex: number, charIndexInWord: number): number => {
		const allChars: string[] = [];
		words.forEach(word => {
			word.split('').forEach(char => allChars.push(char));
			allChars.push(' ');
		});
		
		let currentCharIndex = 0;
		for (let i = 0; i < wordIndex; i++) {
			currentCharIndex += words[i].length + 1;
		}
		currentCharIndex += charIndexInWord;

		const totalChars = allChars.length;
		const revealedChars = secondTextProgress * totalChars;

		if (currentCharIndex < revealedChars) {
			return 1;
		} else if (currentCharIndex < revealedChars + 1) {
			return 0.6;
		} else {
			return 0.6;
		}
	};






	const handleScrollDown = () => {
		window.scrollTo({
			top: window.innerHeight * 1.1,
			behavior: 'smooth'
		});
	};

	return (
		<div ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
			{/* Video Background Layer */}
			<div
				className="fixed inset-0 z-0 transition-opacity duration-300"
				style={{
					opacity: videoOpacity,
					pointerEvents: videoOpacity === 0 ? 'none' : 'auto',
				}}
			>
				<video autoPlay loop muted playsInline className="w-full h-full object-cover">
					<source src={vid} type="video/mp4" />
				</video>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Galaxy Canvas Layer */}
			<div
				className="fixed inset-0 z-[5] pointer-events-none transition-opacity duration-300"
				style={{ opacity: videoOpacity }}
			>
				<canvas id="galaxyCanvas" className="w-full h-full opacity-40 bg-[#151d58]"></canvas>
			</div>

			{/* Section 1: Imagination to Innovation */}
			<div
				className="sticky top-0 h-screen flex flex-col px-6 md:px-20 z-10"
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
					className="mb-28 md:mb-16"
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

				{/* Scroll Down Button */}
				<div
					className="absolute bottom-2 sm:bottom-36 left-1/2 transform -translate-x-1/2 z-20"
					style={{
						opacity: isLoaded ? 1 : 0,
						transform: `translateX(-50%) translateY(${isLoaded ? 0 : 20}px)`,
						transition:
							'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
					}}
				>
					<button
						onClick={handleScrollDown}
						className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
					>
						<div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 group-hover:border-white transition-colors duration-300">
							<div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce group-hover:bg-white"></div>
						</div>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							className="group-hover:translate-y-1 transition-transform duration-300"
						>
							<path
								d="M12 5V19M12 19L5 12M12 19L19 12"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Section 2: Character-by-character reveal with slide-up animation */}
			<div
				ref={textRef}
				className="sticky top-0 min-h-screen flex items-center justify-center px-6 md:px-20 z-20 bg-black"
				style={{
					opacity: scrollProgress >= 0.5 ? 1 : 0,
					transition: 'opacity 0.3s ease',
				}}
			>
				<div
					className="max-w-7xl w-full sm:mt-0 mt-28 flex flex-col md:flex-row items-center justify-between gap-12"
					style={{
						transform: `translateY(${textTranslateY}px)`,
						transition: 'transform 0.3s ease-out',
					}}
				>
					<div className="flex sm:flex-row flex-col sm:gap-10">
						<div className="mb-6">
							<span className="text-gray-400 text-sm md:text-base uppercase tracking-wider">(ABOUT)</span>
						</div>
						<p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
							{words.map((word, wordIndex) => (
								<span key={wordIndex} className="inline-block mr-3 mb-2">
									{word.split('').map((char, charIndex) => {
										const opacity = getCharOpacity(wordIndex, charIndex);
										const isHighlighted = opacity === 1;
										return (
											<span
												key={charIndex}
												style={{
													color: isHighlighted ? 'white' : '#4a4a4a',
													opacity: opacity,
													display: 'inline-block',
													transition: 'color 0.8s ease, opacity 0.8s ease', // Slow transition
												}}
											>
												{char}
											</span>
										);
									})}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;