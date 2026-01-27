import { useEffect, useState, useRef } from 'react';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';

const HeroSection = () => {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);

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

	// Video fades out as card comes in
	const videoOpacity = scrollProgress < 0.4 ? 1 : Math.max(0, 1 - (scrollProgress - 0.4) / 0.3);

	return (
		<div ref={sectionRef} className="relative w-full" style={{ height: '300vh' }}>
			<FirstSection scrollProgress={scrollProgress} isLoaded={isLoaded} videoOpacity={videoOpacity} />
			<SecondSection scrollProgress={scrollProgress} />
		</div>
	);
};

export default HeroSection;