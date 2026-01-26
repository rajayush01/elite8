import { useEffect, useState, useRef } from 'react';
import vid from '../../assets/hero.mp4';
const HeroSection = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const textRef = useRef<HTMLDivElement | null>(null);

	// --- Galaxy Canvas Animation ---
	useEffect(() => {
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

		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle(canvas));
		}

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
	const firstTextOpacity = scrollProgress < 0.5 ? Math.max(0, 1 - scrollProgress * 4) : 0;
	const secondTextProgress = scrollProgress < 0.5 ? 0 : Math.max(0, Math.min((scrollProgress - 0.5) * 2, 1));

	// Card slide effect - starts from bottom
	const cardTranslateY = scrollProgress < 0.4 ? 100 : Math.max(0, 100 - ((scrollProgress - 0.4) / 0.6) * 100);
	const cardScale = scrollProgress < 0.4 ? 0.9 : Math.min(1, 0.9 + ((scrollProgress - 0.4) / 0.6) * 0.1);
	const cardOpacity = scrollProgress < 0.35 ? 0 : Math.min(1, (scrollProgress - 0.35) / 0.15);

	// Video fades out as card comes in
	const videoOpacity = scrollProgress < 0.4 ? 1 : Math.max(0, 1 - (scrollProgress - 0.4) / 0.3);

	// --- Text Reveal Logic ---
	const text =
		'We craft scalable websites, applications, and platforms—engineered for performance and built to help businesses grow.';
	const words = text.split(' ');

	const getCharOpacity = (wordIndex: number, charIndexInWord: number): number => {
		const allChars: string[] = [];
		words.forEach((word) => {
			word.split('').forEach((char) => allChars.push(char));
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

	return (
		<div ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
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
				<div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black"></div>
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

			{/* Section 2: Card-like scroll over effect */}
			<div
				ref={textRef}
				className="sticky top-0 h-screen flex items-center justify-center px-0 md:px-8 z-20"
				style={{
					opacity: cardOpacity,
					pointerEvents: cardOpacity === 0 ? 'none' : 'auto',
				}}
			>
				<div
					className="w-full max-w-7xl bg-black rounded-3xl shadow-2xl overflow-hidden"
					style={{
						transform: `translateY(${cardTranslateY}%) scale(${cardScale})`,
						transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
						boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.8), 0 30px 60px -30px rgba(139, 92, 246, 0.3)',
					}}
				>
					<div className="px-6 py-12 md:px-16 md:py-20">
						<div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
							<div className="flex-shrink-0">
								<span className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
									(ABOUT)
								</span>
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
														transition: 'color 0.8s ease, opacity 0.8s ease',
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
		</div>
	);
};

export default HeroSection;
