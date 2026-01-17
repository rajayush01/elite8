import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../assets/img1.avif';
import StatsSection from '@/components/layout/StatSection';
import img from '@/assets/try.jpg'
import img10 from '@/assets/bharatonesty.png';
import img2 from '@/assets/doctor.png';
import img3 from '@/assets/lets.png';
import img4 from '@/assets/ib1.png';
import img5 from '@/assets/nymara1.png';
import img8 from '@/assets/temple1.png';
import img7 from '@/assets/milk.png';
import img9 from '@/assets/photography.png';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioMobile() {
	const containerRef = useRef<HTMLDivElement>(null);
	const words = ['together.', 'brands.', 'products.', 'designs.', 'ideas.'];
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

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
		window.scrollTo(0, 0);
		if (window.history.scrollRestoration) {
			window.history.scrollRestoration = 'manual';
		}
	}, []);

	// Vertical scroll animations
	useEffect(() => {
		if (!containerRef.current) return;

		const sections = containerRef.current.querySelectorAll('.section');

		sections.forEach((section, index) => {
			if (index === 0) return; // Skip hero section

			// Animate text elements
			const textElements = section.querySelectorAll('.animate-slide');
			textElements.forEach((element, i) => {
				gsap.fromTo(
					element,
					{
						y: 60,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						duration: 1,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: section,
							start: 'top 80%',
							end: 'top 50%',
							scrub: 1,
						},
						delay: i * 0.1,
					}
				);
			});

			// Animate images
			const images = section.querySelectorAll('img');
			images.forEach((img) => {
				gsap.fromTo(
					img,
					{
						y: 80,
						opacity: 0,
						scale: 0.95,
					},
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 1.2,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: section,
							start: 'top 80%',
							end: 'top 50%',
							scrub: 1,
						},
					}
				);
			});
		});

		// Animate "Our Projects" text
		const ourProjectsText = document.querySelector('.our-projects-text');
		if (ourProjectsText) {
			gsap.fromTo(
				ourProjectsText,
				{
					x: 150,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					duration: 1.5,
					ease: 'power2.out',
					scrollTrigger: {
						trigger: '.projects-section',
						start: 'top 80%',
						end: 'top 50%',
						scrub: 1,
					},
				}
			);
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	const projectData = [
			{
				category: 'BRANDING / IDENTITY',
				title: 'Bharat Honesty',
				description:
					'A comprehensive branding initiative for Bharat Honesty, focusing on trust and transparency. We developed a modern identity system that communicates integrity while maintaining cultural relevance.',
				image: img10,
				color: '#1a1a2e',
			},
			{
				category: 'HEALTHCARE / DIGITAL',
				title: 'Dr. Vikas Bhalekar',
				description:
					'Revolutionizing healthcare communication through strategic digital transformation. We created an approachable yet professional brand that bridges the gap between medical expertise and patient care.',
				image: img2,
				color: '#0f3460',
			},
			{
				category: 'EVENT / EXPERIENCE',
				title: "Let's Taxify",
				description:
					'Building meaningful connections through immersive event experiences. Our strategy focused on creating memorable touchpoints that transform attendees into brand advocates.',
				image: img3,
				color: '#16213e',
			},
			{
				category: 'TECHNOLOGY / INNOVATION',
				title: 'IB Technology',
				description:
					'Empowering businesses through cutting-edge technology solutions. We positioned IB as a forward-thinking partner that simplifies complex technical challenges with elegant solutions.',
				image: img4,
				color: '#1a1a2e',
			},
			{
				category: 'LUXURY / LIFESTYLE',
				title: 'Nymara',
				description:
					'Crafting an exclusive luxury experience for Nymara. We developed a sophisticated brand language that speaks to discerning customers who appreciate timeless elegance and exceptional quality.',
				image: img5,
				color: '#2d4059',
			},
			{
				category: 'CREATIVE / PHOTOGRAPHY',
				title: 'Reclipse',
				description:
					'Elevating visual storytelling through innovative photography platforms. We created a digital ecosystem that showcases artistic vision while providing seamless client experiences.',
				image: img9,
				color: '#1a1a2e',
			},
			{
				category: 'HERITAGE / CULTURE',
				title: 'Nashville Temple',
				description:
					'Preserving cultural heritage through thoughtful restoration and modern documentation. Our approach balanced traditional values with contemporary presentation methods.',
				image: img8,
				color: '#0f3460',
			},
			{
				category: 'FOOD & BEVERAGE',
				title: 'Vyshnavi',
				description:
					'Reimagining traditional dairy products for modern consumers. We developed a farm-to-table narrative that emphasizes quality, sustainability, and authentic craftsmanship.',
				image: img7,
				color: '#16213e',
			},
		];

		
	return (
		<div ref={containerRef} className="bg-black">
			{/* Hero Section */}
			<section className="section min-h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-8 bg-black">
				<div className="max-w-4xl">
					<h1 className="text-5xl md:text-8xl mb-8">
						<span className="font-serif">Let's create</span>
						<br />
						<span className="font-['Brush_Script_MT',cursive] italic text-6xl md:text-8xl ml-32 md:ml-64">
							{currentText}
							<span className="animate-pulse">|</span>
						</span>
					</h1>

					<p className="text-gray-400 text-lg md:text-xl max-w-2xl ml-auto">
						We help businesses find their voice, shape their identity, and connect with their audience.{' '}
						<span className="font-bold text-gray-700">Less talk. More craft.</span>
					</p>

                    <h1 className="-rotate-12 mt-20">
							<span
								className="font-serif italic text-8xl md:text-8xl ml-"
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

			{/* Our Projects Section */}
			<section className="section projects-section min-h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border py-20">
				<div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-7xl mx-auto">
					<div className="relative">
						<img
							src={img1}
							alt="Project showcase"
							className="w-[500px] h-[600px] object-cover rounded-lg"
						/>
						<div className="our-projects-text mt-8 md:mt-0 md:absolute md:top-1/2 md:-translate-y-1/2 md:-right-[400px] text-6xl md:text-8xl lg:text-[120px] font-bold font-serif">
							Our Projects
						</div>
					</div>
				</div>
			</section>

			{/* Project Case Studies */}
			{projectData.map((project, idx) => (
				<section
					key={idx}
					className="section min-h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border py-20 px-8"
				>
					<div className="flex flex-col md:flex-row items-center max-w-7xl gap-8">
						<div className="w-full md:w-1/2">
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
							/>
						</div>

						<div className="w-full md:w-1/2 bg-black p-8 md:p-16 flex flex-col justify-center md:-ml-32 relative z-10">
							<div className="animate-slide text-sm text-gray-500 tracking-wider mb-8 text-left">
								{project.category}
							</div>

							<h1 className="animate-slide text-4xl md:text-7xl font-serif mb-8 leading-tight text-left">
								{project.title.split(' ').map((word, i) => (
									<React.Fragment key={i}>
										{word}
										{i < project.title.split(' ').length - 1 && <br />}
									</React.Fragment>
								))}
							</h1>

							<p className="animate-slide text-gray-400 text-base md:text-lg mb-12 leading-relaxed text-left">
								{project.description}
							</p>

							<div className="animate-slide flex items-center">
								<span className="w-2 h-2 bg-white rounded-full mr-3"></span>
								<span className="text-base font-semibold">Case Study</span>
							</div>
						</div>
					</div>
				</section>
			))}
            <section className="section projects-section min-h-screen flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border py-20">
				<div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-7xl mx-auto px-8">
					<StatsSection/>
				</div>
			</section>
		</div>
	);
}