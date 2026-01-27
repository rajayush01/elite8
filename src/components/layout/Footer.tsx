import React from 'react';
import logo from '../../assets/elite8digital-nav-cropped.png';
import vid from '../../assets/hero.mp4';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
	const socialLinks = [
		{
			name: 'linkedin',
			url: 'https://www.linkedin.com/company/elite8-digital/about/',
			icon: 'ri-linkedin-fill'
		},
		{
			name: 'instagram',
			url: 'https://www.instagram.com/elite8digital/?hl=en',
			icon: 'ri-instagram-fill'
		},
		{
			name: 'facebook',
			url: 'https://www.facebook.com/profile.php?id=61578168604952',
			icon: 'ri-facebook-fill'
		}
	];

	return (
		<div className="min-h-screen bg-black text-white mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-40 my-8 sm:my-12 md:my-16 lg:my-24 border border-gray-800">
			{/* Hero Section */}
			<div className="border-b border-gray-800">
				<div className="grid grid-cols-1 lg:grid-cols-4">
					{/* Left Sidebar */}
					<div className="lg:col-span-1 lg:border-r border-gray-800 px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 bg-black border-b lg:border-b-0">
						<div className="flex flex-col h-full">
							{/* Rotating Badge */}
							<div className="mb-8 sm:mb-10 md:mb-12 flex flex-col justify-center items-center">
								<div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
									<svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
										<defs>
											<path
												id="circle"
												d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
											/>
										</defs>
										<text className="text-[8px] sm:text-[9px] md:text-[10px] fill-white uppercase tracking-wider">
											<textPath href="#circle">
												The future you lead. Imagine. • The future you lead. Imagine. •
											</textPath>
										</text>
									</svg>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-black rounded-full flex items-center justify-center">
											<img src={logo} alt="" className="w-14 sm:w-16 md:w-18 lg:w-20" />
										</div>
									</div>
								</div>
							</div>

							{/* Tagline */}
							<div className="flex flex-col justify-center items-center text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[180px] sm:max-w-[200px] mx-auto text-center">
								The smarter way to build, run and scale your business
							</div>
						</div>
					</div>

					{/* Right Video Section */}
					<div className="lg:col-span-3 relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[370px] bg-black overflow-hidden">
						<video autoPlay loop muted playsInline className="w-full h-full object-cover">
							<source src={vid} type="video/mp4" />
						</video>

						{/* Overlay Text */}
						<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#151d58] bg-opacity-40">
							<div className="text-center px-4">
								<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide mb-2 sm:mb-4">
									<span className="text-purple-400">Elite8</span>
									<span className="text-white">Digital</span>
								</h1>
							</div>
						</div>

						{/* Top Right Corner Email */}
						<div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8">
							<p className="text-white text-xs sm:text-sm">contact@elite8digital.in</p>
						</div>
					</div>
				</div>
			</div>

			{/* Content Grid */}
			<div className="border-b border-gray-800">
				<div className="grid grid-cols-1 md:grid-cols-3">
					{/* Navigation Column */}
					<div className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b md:border-b-0 md:border-r border-gray-800">
						<h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Navigation</h3>
						<div className="space-y-2 sm:space-y-3">
							<Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
								Home
							</Link>
							<Link
								to="/about"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								About
							</Link>
							<Link
								to="/portfolio"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								Portfolio
							</Link>
							<Link
								to="/contact"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								Let's Talk
							</Link>
							{/* <Link
								to="/careers"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								Careers
							</Link> */}
						</div>
					</div>

					{/* Services Column */}
					<div className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b md:border-b-0 md:border-r border-gray-800">
						<h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Services</h3>
						<div className="space-y-2 sm:space-y-3 text-gray-400">
							<div>ERP Solutions</div>
							<div>Custom Website Design, Development & Maintenance</div>
							<div>E-Commerce Solutions</div>
							<div>Mobile Application Development</div>
							<div>Business Web Applications & Dashboards</div>
							<div>Custom Software Development</div>
						</div>
					</div>

					{/* Contact Column */}
					<div className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
						<h3 className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact</h3>
						<div className="space-y-2 sm:space-y-3">
							<a
								href="mailto:contact@elite8digital.in"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base break-all"
							>
								contact@elite8digital.in
							</a>
							<a
								href="tel:+916260894977"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								+91 6260894977
							</a>
							<a
								href="tel:+917303125674"
								className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
							>
								+91 7303125674
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Footer - Client Logos */}
			<div className="">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="py-6 sm:py-8 md:py-6 px-4 sm:px-6 md:px-8 lg:px-12 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col justify-center items-center gap-2 sm:gap-3">
						<div className="flex flex-col justify-center items-center text-xs sm:text-sm text-center">
							© {new Date().getFullYear()} ELITE8DIGITAL. All rights reserved.
						</div>
						<div className="text-center text-gray-400">
							<p className="text-xs sm:text-sm md:text-base lg:text-lg flex flex-col sm:flex-row items-center justify-center gap-1">
								<span>Built with ❤️ by</span>
								<Link
									to="https://elite8digital.in"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
								>
									Elite8 Digital
									<img
										src="/elite8digital-nav.png"
										alt="Elite8 Digital Logo"
										className="h-8 sm:h-10 md:h-12 ml-1 sm:ml-2"
									/>
								</Link>
							</p>
						</div>
					</div>
					<div className="py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
						<div className="text-xs sm:text-sm mb-4 sm:mb-6 text-gray-400">
							Creating immersive digital experiences that captivate and convert. We blend creativity with
							cutting-edge technology.
						</div>
						<div className="flex space-x-3 sm:space-x-4">
							{socialLinks.map((social) => (
								<motion.a
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white hover:text-purple-400 transition-colors"
									whileHover={{ y: -5, scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<i className={`${social.icon} text-base sm:text-lg`}></i>
								</motion.a>
							))}
						</div>
					</div>
				</div>
			</div>
			<link
				href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
				rel="stylesheet"
			/>
			<style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
		</div>
	);
};

export default Footer;