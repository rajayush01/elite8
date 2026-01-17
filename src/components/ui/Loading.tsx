import React, { useEffect, useState } from 'react';
import dpslogo from '../../assets/images/schoologo-bg.png';

type SizeType = 'sm' | 'md' | 'lg';

interface DPSLoadingProps {
	size?: SizeType;
	duration?: number;
	onLoadingComplete?: () => void;
	showProgress?: boolean;
	mode?: 'timed' | 'suspense';
}

const DPSLoading: React.FC<DPSLoadingProps> = ({
	size = 'md',
	duration = 3000,
	onLoadingComplete,
	// showProgress = true,
	mode = 'timed',
}) => {
	const [isComplete, setIsComplete] = useState(false);

	const sizeClasses: Record<
		SizeType,
		{
			container: string;
			logo: string;
			text: string;
			ring: string;
		}
	> = {
		sm: {
			container: 'w-16 h-16 sm:w-20 sm:h-20',
			logo: 'w-10 h-10 sm:w-12 sm:h-12',
			text: 'text-xs sm:text-sm',
			ring: 'w-20 h-20 sm:w-24 sm:h-24',
		},
		md: {
			container: 'w-20 h-20 sm:w-28 sm:h-28',
			logo: 'w-12 h-12 sm:w-16 sm:h-16',
			text: 'text-sm sm:text-base',
			ring: 'w-24 h-24 sm:w-32 sm:h-32',
		},
		lg: {
			container: 'w-28 h-28 sm:w-36 sm:h-36',
			logo: 'w-16 h-16 sm:w-20 sm:h-20',
			text: 'text-base sm:text-lg',
			ring: 'w-32 h-32 sm:w-40 sm:h-40',
		},
	};

	const currentSize = sizeClasses[size];

	useEffect(() => {
		if (mode !== 'timed') return;

		const timer = setTimeout(() => {
			setIsComplete(true);
			setTimeout(() => {
				onLoadingComplete?.();
			}, 500);
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onLoadingComplete, mode]);

	// const getLoadingText = () => {
	// 	if (mode === 'suspense') return 'Loading...';

	// 	if (progress < 30) return 'Initializing...';
	// 	if (progress < 60) return 'Loading Resources...';
	// 	if (progress < 90) return 'Almost Ready...';
	// 	if (isComplete) return 'Complete!';
	// 	return 'Finalizing...';
	// };

	return (
		<div
			className={`flex flex-col items-center justify-center space-y-4 sm:space-y-6 p-4 sm:p-8 transition-opacity duration-500 ${isComplete ? 'opacity-90' : 'opacity-100'}`}
		>
			<div className="relative">
				{/* Subtle outer glow */}
				<div
					className={`${currentSize.ring} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full`}
					style={{
						background: 'radial-gradient(circle, rgba(105, 11, 34, 0.08), transparent 70%)',
						animation: 'pulse-gentle 3s ease-in-out infinite',
					}}
				/>

				{/* Single elegant rotating ring */}
				<div
					className={`${currentSize.container} relative rounded-full`}
					style={{
						background: 'conic-gradient(from 0deg, transparent 0%, #690B22 50%, transparent 100%)',
						animation: 'rotate-smooth 3s linear infinite',
						padding: '2px',
					}}
				>
					<div className="w-full h-full bg-white rounded-full shadow-lg" />
				</div>

				{/* Logo container */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div
						className={`${currentSize.logo} rounded-full flex items-center justify-center shadow-xl transform transition-transform duration-500 ${isComplete ? 'scale-110' : 'scale-100'}`}
						style={{
							boxShadow: '0 8px 20px rgba(105, 11, 34, 0.25)',
						}}
					>
						{/* Placeholder for logo - replace with actual logo */}
						<div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xs">
							<img src={dpslogo} alt="" className="w-full h-full object-contain" />
						</div>
					</div>
				</div>
			</div>

			{/* Text content */}
			<div className="text-center space-y-2 sm:space-y-3 max-w-xs sm:max-w-md px-4">
				<div className="relative">
					<h1
						className="text-[8px] xs:text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold tracking-wider"
						style={{
							color: '#ffffff',
						}}
					>
						STANFORD INTERNATIONAL SCHOOL
					</h1>
					<h1
						className="text-[6px] xs:text-[8px] sm:text-sm md:text-base lg:text-lg font-medium tracking-wider"
						style={{
							color: '#ffffff',
						}}
					>
						नहि ज्ञानेन सदृशं
					</h1>
					<div
						className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#690B22] to-transparent"
						style={{
							width: '50%',
							animation: 'expand 2s ease-in-out infinite alternate',
						}}
					/>
				</div>

				{/* <p
					className="text-sm font-medium transition-opacity duration-300"
					style={{ color: '#ffffff', opacity: 0.8 }}
				>
					{getLoadingText()}
				</p> */}

				{/* Simplified loading dots */}
				<div className="flex space-x-1.5 sm:space-x-2 justify-center pt-1">
					{[0, 1, 2].map((index) => (
						<div
							key={index}
							className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
							style={{
								background: '#ffffff',
								animation: `bounce-dot 1.4s ease-in-out ${index * 0.16}s infinite`,
								opacity: 0.6,
							}}
						/>
					))}
				</div>

				{/* Progress bar */}
				{/* {showProgress && mode === 'timed' && (
					<div className="pt-2 space-y-2">
						<div className="w-48 h-1.5 bg-gray-300 rounded-full overflow-hidden mx-auto">
							<div
								className="h-full rounded-full transition-all duration-300 ease-out"
								style={{
									background: 'linear-gradient(90deg, #690B22, #8B0E2D)',
									width: `${progress}%`,
								}}
							/>
						</div>
						<p className="text-xs font-medium" style={{ color: '#ffffff', opacity: 0.6 }}>
							{Math.round(progress)}%
						</p>
					</div>
				)} */}
			</div>

			<style>
				{`
					@keyframes rotate-smooth {
						from { transform: rotate(0deg); }
						to { transform: rotate(360deg); }
					}

					@keyframes pulse-gentle {
						0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.08; }
						50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.12; }
					}

					@keyframes bounce-dot {
						0%, 80%, 100% { transform: translateY(0); }
						40% { transform: translateY(-6px); }
					}

					@media (min-width: 640px) {
						@keyframes bounce-dot {
							0%, 80%, 100% { transform: translateY(0); }
							40% { transform: translateY(-8px); }
						}
					}

					@keyframes expand {
						0% { width: 40%; opacity: 0.6; }
						100% { width: 60%; opacity: 1; }
					}
				`}
			</style>
		</div>
	);
};

export default DPSLoading;
