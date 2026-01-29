import { useEffect, useState } from 'react';
import img from '@/assets/elite1.png';
import ProjectsHeader from '@/components/ui/ProjectHeader';
import vid1 from "@/assets/drvikas.mp4";
import vid2 from "@/assets/IB.mp4";
import vid3 from "@/assets/nymara_demo.mp4";
import vid4 from "@/assets/onesty_demo.mp4";
import vid5 from "@/assets/temple.mp4";
import vid6 from "@/assets/standford.mp4";
// import img1 from '.././assets/doctor.png'
// import img2 from '.././assets/ib1.png';
// import img3 from '.././assets/nymara1.png';
// import img4 from '.././assets/bharatonesty.png';
// import img5 from '.././assets/temple1.png';

export default function MobileVerticalScroll() {
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

	return (
		<div className="bg-black text-white overflow-x-hidden">
			{/* Hero Section */}
			<section className="max-h-screen flex flex-col justify-center items-center px-6 py-12 mt-28">
				<div className="max-w-lg text-center">
					<h1 className="text-4xl sm:text-5xl mb-6">
						<span className="font-serif block mb-2">Let's create</span>
						<span className="font-['Brush_Script_MT',cursive] italic text-5xl sm:text-6xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
							{currentText}
							<span className="animate-pulse">|</span>
						</span>
					</h1>

					<p className="text-gray-400 text-base sm:text-lg mb-12">
						We help businesses find their voice, shape their identity, and connect with their
						audience. <span className="font-bold text-gray-600">Less talk. More craft.</span>
					</p>

					<h2 className="text-6xl sm:text-8xl font-serif italic -rotate-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
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
					</h2>
				</div>
			</section>

			{/* Projects Header Section */}
			<section className="max-h-screen flex flex-col justify-center items-center px-6 py-20">
				<div className="max-w-lg">
					<ProjectsHeader/>
				</div>
			</section>

			{/* Project Sections */}
			{projects.map((project, index) => (
				<section key={index} className="max-h-screen flex flex-col justify-center items-center px-6 py-12">
					<div className="max-w-lg w-full">
						{/* Animated Header */}
						<div className="mb-4 text-center">
							<h2 className="text-3xl sm:text-5xl font-bold font-serif mb-4 relative inline-block">
								<span
									className="absolute inset-0 blur-2xl opacity-50 animate-pulse"
									style={{
										background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
										WebkitBackgroundClip: 'text',
										backgroundClip: 'text',
									}}
								>
									{project.title}
								</span>
								<span
									className="relative"
									// style={{
									// 	background: 'linear-gradient(90deg, #c82736, #e77614, #8d3dae)',
									// 	WebkitBackgroundClip: 'text',
									// 	WebkitTextFillColor: 'transparent',
									// 	backgroundClip: 'text',
									// }}
								>
									{project.title}
								</span>
							</h2>
						</div>

						{/* Project Showcase */}
						<div className="space-y-3">
							{/* Project Image */}
							{/* <div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<img
										src={project.imageUrl}
										alt={project.title}
										className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-2xl font-bold mb-2">Brand Evolution</h3>
											<p className="text-gray-300">Complete visual identity redesign</p>
										</div>
									</div>
								</div>
							</div> */}

							{/* Project Video */}
							<div className="relative group cursor-pointer">
								<div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500 animate-pulse"></div>
								<div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-500 transform group-hover:scale-105">
									<video
										autoPlay
										loop
										muted
										playsInline
										className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
									>
										<source
											src={project.videoUrl}
											type="video/mp4"
										/>
									</video>
									{/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<h3 className="text-2xl font-bold mb-2">Digital Experience</h3>
											<p className="text-gray-300">Interactive web platform</p>
										</div>
									</div> */}
								</div>
							</div>
						</div>

						{/* Project Info */}
						<div className="mt-8 text-center space-y-2">
							{/* <h3 className="text-2xl font-bold">{project.title}</h3> */}
							<p className="text-gray-400">{project.description}</p>
						</div>
					</div>
				</section>
			))}

			{/* Footer */}
			<section className="max-h-screen flex flex-col justify-center items-center px-6 py-20">
				<div className="max-w-lg text-center">
					<h2 className="text-4xl sm:text-6xl font-bold font-serif mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
						Let's Connect
					</h2>
					<p className="text-gray-400 text-lg mb-8">
						Ready to create something amazing together?
					</p>
					<button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300">
						Get In Touch
					</button>
				</div>
			</section>
		</div>
	);
}