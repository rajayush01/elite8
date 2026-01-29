import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img from '@/assets/elite1.png';
import ProjectsHeader from '@/components/ui/ProjectHeader';
import vid1 from '@/assets/drvikas.mp4';
import vid2 from '@/assets/IB.mp4';
import vid3 from '@/assets/nymara_demo.mp4';
import vid4 from '@/assets/onesty_demo.mp4';
import vid5 from '@/assets/temple.mp4';
import vid6 from '@/assets/standford.mp4';
// import { link } from 'fs';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSnap() {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const verticalSectionRef = useRef<HTMLDivElement | null>(null);
	const [currentText, setCurrentText] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [showVerticalSection, setShowVerticalSection] = useState(false);
	const currentIndexRef = useRef(0);

	const words = ['together.', 'brands.', 'products.', 'designs.', 'ideas.'];

	const projects = [
		{
			title: 'NYMARA Jewells',
			description: 'Leading the future of design with cutting-edge technology and creative excellence',
			// imageUrl: img3,
			videoUrl: vid3,
			link: 'https://nymara.netlify.app/',
		},
		{
			title: "BHARAT O'nesty",
			description: 'Creating impactful narratives that engage, inspire, and drive meaningful results',
			// imageUrl: img4,
			videoUrl: vid4,
			link: 'https://bharatonesty.com/',
		},
		{
			title: "Standford School",
			description: 'Creating impactful narratives that engage, inspire, and drive meaningful results',
			// imageUrl: img4,
			videoUrl: vid6,
			link: 'https://bharatonesty.com/',
		},
		{
			title: 'Dr. Vikas Bhalekar',
			description:
				'Transforming ideas into reality through innovative design solutions that captivate and inspire audiences',
			// imageUrl: img1,
			videoUrl: vid1,
			link: 'http://www.drvikasbhalekar.in/',
		},
		{
			title: 'IB Technology',
			description:
				'Crafting memorable experiences that resonate with your audience and build lasting connections',
			// imageUrl: img2,
			videoUrl: vid2,
			link: 'https://ibtechnologiesgroup.com/',
		},
		
		
		{
			title: 'Hanuman Temple',
			description: 'Creating impactful narratives that engage, inspire, and drive meaningful results',
			// imageUrl: img5,
			videoUrl: vid5,
			link: 'http://nashvillehanuman.org/',
		},
		{
			title: 'School ERP',
			description: 'Creating impactful narratives that engage, inspire, and drive meaningful results',
			// imageUrl: img5,
			videoUrl: vid2,
			link: 'https://drvikasbhalekar.com/',
		},
		{
			title: 'College ERP',
			description: 'Creating impactful narratives that engage, inspire, and drive meaningful results',
			// imageUrl: img5,
			videoUrl: vid1,
			link: 'https://drvikasbhalekar.com/',
		},
	];

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

		const panels = containerRef.current.querySelectorAll<HTMLElement>('.panel');
		let isScrolling = false;

		const scrollToPanel = (index: number) => {
			if (index < 0 || index >= panels.length) return;
			currentIndexRef.current = index;
			const translateX = -index * 100;

			panels.forEach((panel: HTMLElement) => {
				panel.style.transform = `translateX(${translateX}%)`;
			});

			// Show vertical section when reaching the last panel
			if (index === panels.length - 1) {
				setTimeout(() => {
					setShowVerticalSection(true);
				}, 500);
			} else {
				setShowVerticalSection(false);
			}
		};

		const handleWheel = (e: WheelEvent) => {
			// Allow normal scrolling in vertical section
			if (showVerticalSection && verticalSectionRef.current) {
				const verticalSection = verticalSectionRef.current;
				const isAtTop = verticalSection.scrollTop === 0;

				// If scrolling up and at the top of vertical section, go back to panels
				if (e.deltaY < 0 && isAtTop) {
					e.preventDefault();
					setShowVerticalSection(false);
					scrollToPanel(currentIndexRef.current - 1);
					return;
				}
				return;
			}

			e.preventDefault();

			if (isScrolling) return;

			isScrolling = true;

			if (e.deltaY > 0) {
				// Scroll down/right
				if (currentIndexRef.current < panels.length - 1) {
					scrollToPanel(currentIndexRef.current + 1);
				}
			} else {
				// Scroll up/left
				if (currentIndexRef.current > 0) {
					scrollToPanel(currentIndexRef.current - 1);
				}
			}

			setTimeout(() => {
				isScrolling = false;
			}, 1000);
		};

		window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleWheel);
		};
	}, [showVerticalSection]);

	return (
		<div className="relative">
			<div id="root" className="overflow-hidden h-screen">
				<div ref={containerRef} className="w-[700%] h-screen flex flex-nowrap">
					{/* Hero Section */}
					<div className="panel w-screen h-screen flex-shrink-0 flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 transition-transform duration-1000 ease-out bg-black">
						<section className="font-semibold text-2xl text-center text-white relative box-border p-2.5">
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
										className="font-serif italic text-6xl md:text-8xl md:text-[250px] bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
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

					{/* Projects Header */}
					<section className="panel w-screen h-screen flex-shrink-0 flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black transition-transform duration-1000 ease-out">
						<ProjectsHeader />
					</section>

					{/* Project Panels */}
					{projects.map((project, index) => (
						<section
							key={index}
							className={`panel w-screen h-screen flex-shrink-0 flex justify-center items-center relative overflow-hidden transition-transform duration-1000 ease-out ${
								index % 2 === 0 ? 'bg-black' : 'bg-black'
							}`}
						>
							<div className="absolute inset-0 opacity-20"></div>

							<div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 xl:gap-20 items-center relative z-10">
								<div className={`space-y-6 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
									<div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
										<span className="text-blue-300 text-sm font-semibold">
											PROJECT {String(index + 1).padStart(2, '0')}
										</span>
									</div>
									<h2 className="text-6xl font-bold text-white leading-tight">{project.title}</h2>
									<p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
									<a
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
										className="group inline-block px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
									>
										View Website
										<span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">
											→
										</span>
									</a>	
								</div>

								<div className={`relative ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-30 animate-pulse"></div>
									<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-500">
										<video
											src={project.videoUrl}
											autoPlay
											loop
											muted
											playsInline
											className="w-full h-full xl:h-full object-contain"
										/>
									</div>
								</div>
							</div>
						</section>
					))}
				</div>
			</div>

			{/* Vertical Scrolling Section */}
			{showVerticalSection && (
				<div ref={verticalSectionRef} className="relative bg-black text-white overflow-y-auto"></div>
			)}
		</div>
	);
}

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import img from '@/assets/try.jpg';
// import ProjectsHeader from '@/components/ui/ProjectHeader';

// import vid1 from "@/assets/drvikas.mp4";
// import vid2 from "@/assets/IB.mp4";
// import vid3 from "@/assets/nymara_demo.mp4";
// import vid4 from "@/assets/onesty_demo.mp4";
// import vid5 from "@/assets/temple.mp4";
// import img1 from '.././assets/doctor.png'
// import img2 from '.././assets/ib1.png';
// import img3 from '.././assets/nymara1.png';
// import img4 from '.././assets/bharatonesty.png';
// import img5 from '.././assets/temple1.png';

// gsap.registerPlugin(ScrollTrigger);

// export default function HorizontalScrollSnap() {
// 	const containerRef = useRef<HTMLDivElement | null>(null);
// 	const [currentText, setCurrentText] = useState('');
// 	const [isDeleting, setIsDeleting] = useState(false);
// 	const words = ['together.', 'brands.', 'products.', 'designs.', 'ideas.'];
// 	const [currentWordIndex, setCurrentWordIndex] = useState(0);

// 	const projects = [
// 		{
// 			title: "Dr. Vikas Bhalekar",
// 			description: "Transforming ideas into reality through innovative design solutions that captivate and inspire audiences",
// 			imageUrl: img1,
// 			videoUrl: vid1
// 		},
// 		{
// 			title: "IB Technology",
// 			description: "Crafting memorable experiences that resonate with your audience and build lasting connections",
// 			imageUrl: img2,
// 			videoUrl: vid2
// 		},
// 		{
// 			title: "NYMARA Jewells",
// 			description: "Leading the future of design with cutting-edge technology and creative excellence",
// 			imageUrl: img3,
// 			videoUrl: vid3
// 		},
// 		{
// 			title: "BHARAT O'nesty",
// 			description: "Creating impactful narratives that engage, inspire, and drive meaningful results",
// 			imageUrl: img4,
// 			videoUrl: vid4
// 		},
// 		{
// 			title: "Hanuman Temple",
// 			description: "Creating impactful narratives that engage, inspire, and drive meaningful results",
// 			imageUrl: img5,
// 			videoUrl: vid5
// 		}
// 	];

// 	// Typing effect
// 	useEffect(() => {
// 		const currentWord = words[currentWordIndex];
// 		const typingSpeed = isDeleting ? 50 : 150;
// 		const pauseTime = 2000;

// 		const timer = setTimeout(() => {
// 			if (!isDeleting) {
// 				if (currentText.length < currentWord.length) {
// 					setCurrentText(currentWord.slice(0, currentText.length + 1));
// 				} else {
// 					setTimeout(() => setIsDeleting(true), pauseTime);
// 				}
// 			} else {
// 				if (currentText.length > 0) {
// 					setCurrentText(currentText.slice(0, -1));
// 				} else {
// 					setIsDeleting(false);
// 					setCurrentWordIndex((prev) => (prev + 1) % words.length);
// 				}
// 			}
// 		}, typingSpeed);

// 		return () => clearTimeout(timer);
// 	}, [currentText, isDeleting, currentWordIndex, words]);

// 	useEffect(() => {
// 		if (!containerRef.current) return;

// 		const panels = containerRef.current.querySelectorAll<HTMLElement>('.panel');

// 		// Simple scroll-based horizontal movement
// 		const handleScroll = () => {
// 			if (!containerRef.current) return;
// 			const scrolled = window.scrollY;
// 			const maxScroll = 3500;
// 			const percentage = Math.min(scrolled / maxScroll, 1);
// 			const translateX = -percentage * 100 * (panels.length - 1);

// 			panels.forEach((panel: HTMLElement) => {
// 				panel.style.transform = `translateX(${translateX}%)`;
// 			});
// 		};

// 		window.addEventListener('scroll', handleScroll);

// 		return () => {
// 			window.removeEventListener('scroll', handleScroll);
// 		};
// 	}, []);

// 	return (
// 		<div className="relative" style={{ height: '4500px' }}>
// 			<div className="sticky top-0 h-screen overflow-hidden">
// 				<div ref={containerRef} className="w-full h-screen flex flex-nowrap bg-black">
// 					<div className="panel w-screen h-screen flex-shrink-0 flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 transition-transform duration-100">
// 						<section className="font-semibold text-2xl text-center text-white relative box-border p-2.5">
// 							<div className="max-w-4xl mt-44">
// 								<h1 className="text-5xl md:text-8xl mb-8">
// 									<span className="font-serif">Let's create</span>
// 									<br />
// 									<span className="font-['Brush_Script_MT',cursive] italic text-6xl md:text-8xl">
// 										{currentText}
// 										<span className="animate-pulse">|</span>
// 									</span>
// 								</h1>

// 								<p className="text-gray-400 text-lg md:text-xl max-w-2xl ml-32">
// 									We help businesses find their voice, shape their identity, and connect with their
// 									audience. <span className="font-bold text-gray-700">Less talk. More craft.</span>
// 								</p>

// 								<h1 className="-rotate-12 mt-20">
// 									<span
// 										className="font-serif italic text-6xl md:text-8xl md:text-[250px]"
// 										style={{
// 											backgroundImage: `url(${img})`,
// 											backgroundSize: 'cover',
// 											backgroundPosition: 'center',
// 											backgroundClip: 'text',
// 											WebkitBackgroundClip: 'text',
// 											WebkitTextFillColor: 'transparent',
// 											color: 'transparent',
// 										}}
// 									>
// 										ELITE8
// 									</span>
// 								</h1>
// 							</div>
// 						</section>
// 					</div>

// 					<section className="panel w-screen h-screen flex-shrink-0 flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden transition-transform duration-100">
// 						<ProjectsHeader />
// 					</section>

// 					{projects.map((project, index) => (
// 						<section
// 							key={index}
// 							className="panel w-screen h-screen flex-shrink-0 flex justify-center items-center font-semibold text-2xl text-center text-white relative box-border p-2.5 overflow-hidden transition-transform duration-100"
// 						>
// 							<div className="max-w-7xl w-full px-8">
// 								{/* Animated Header */}
// 								<div className="mb-16 relative">
// 									<h2 className="text-5xl md:text-7xl font-bold font-serif mb-4 relative inline-block">
// 										<span
// 											className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
// 											style={{
// 												background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
// 												WebkitBackgroundClip: 'text',
// 												backgroundClip: 'text',
// 											}}
// 										>
// 											{project.title}
// 										</span>
// 										<span
// 											className="relative"
// 											style={{
// 												background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
// 												WebkitBackgroundClip: 'text',
// 												WebkitTextFillColor: 'transparent',
// 												backgroundClip: 'text',
// 											}}
// 										>
// 											{project.title}
// 										</span>
// 									</h2>
// 								</div>

// 								{/* Project Showcase */}
// 								<div className="grid md:grid-cols-2 gap-12 items-center">
// 									{/* Project Image with Hover Effect */}
// 									<div className="relative group cursor-pointer">
// 										<div className="absolute inset-0 bg-gradient-to-r from-[#c82736] to-[#e77614] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
// 										<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
// 											<img
// 												src={project.imageUrl}
// 												alt={project.title}
// 												className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
// 											/>
// 											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
// 												<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
// 													<h3 className="text-3xl font-bold mb-2">Brand Evolution</h3>
// 													<p className="text-gray-300">Complete visual identity redesign</p>
// 												</div>
// 											</div>
// 										</div>
// 									</div>

// 									{/* Project Video with Animated Border */}
// 									<div className="relative group cursor-pointer">
// 										<div className="absolute inset-0 bg-gradient-to-r from-[#8d3dae] to-[#28a92b] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
// 										<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
// 											<video
// 												autoPlay
// 												loop
// 												muted
// 												playsInline
// 												className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
// 											>
// 												<source src={project.videoUrl} type="video/mp4" />
// 											</video>
// 											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
// 												<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
// 													<h3 className="text-3xl font-bold mb-2">Digital Experience</h3>
// 													<p className="text-gray-300">Interactive web platform</p>
// 												</div>
// 											</div>
// 											<div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
// 												<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
// 													<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
// 													<path
// 														fillRule="evenodd"
// 														d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
// 														clipRule="evenodd"
// 													/>
// 												</svg>
// 											</div>
// 										</div>
// 									</div>
// 								</div>

// 								{/* Animated Stats */}
// 								<div className="mt-16 flex flex-col justify-center items-center">
// 									<div className="text-xl font-normal text-gray-300 max-w-3xl">
// 										{project.description}
// 									</div>
// 								</div>
// 							</div>
// 						</section>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
