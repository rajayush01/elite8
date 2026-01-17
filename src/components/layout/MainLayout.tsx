import { ReactNode, useRef } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
// import EnquiryFormModal from './EnquiryFormModal';

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const topRef = useRef<HTMLDivElement>(null);
	// const isAtTop = useInView(topRef, { margin: '0px 0px -50px 0px' });
	// const [showForm, setShowForm] = useState(false);

	return (
		<div className="flex flex-col min-h-screen bg-black">
			<div ref={topRef} className="absolute top-0 h-20 w-full pointer-events-none" />
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />

			{/* Floating Enquire Now Button */}
			{/* <AnimatePresence>
				{!isAtTop && (
					<motion.div
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 100, opacity: 0 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className="fixed top-1/2 right-[-55px] z-50"
						style={{
							transform: "translateY(-50%) rotate(-90deg)",
							transformOrigin: "right center",
						}}
					>
						<button
							onClick={() => setShowForm(true)}
							className="text-white font-medium shadow-md hover:brightness-110 transition-all duration-300"
							style={{
								backgroundColor: "#800000",
								height: "30px",
								transform: "translateY(-50%) rotate(-90deg)",
								width: "150px",
								fontSize: "0.9rem",
								borderRadius: "6px 6px 0 0",
								fontFamily: "Poppins, sans-serif",
								boxShadow: "0 2px 5px rgba(0,0,0,0.25)",
								letterSpacing: "0.3px",
							}}
						>
							Enquire now
						</button>
					</motion.div>
				)}
			</AnimatePresence> */}

			{/* Modal */}
			{/* <EnquiryFormModal isOpen={showForm} onClose={() => setShowForm(false)} /> */}
		</div>
	);
};

export default MainLayout;
