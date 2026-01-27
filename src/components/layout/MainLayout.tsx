import { ReactNode, useRef } from 'react';
// import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
// import EnquiryFormModal from './EnquiryFormModal';

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	const topRef = useRef(null);
	const location = useLocation();
	
	// Check if current route is /portfolio
	const isPortfolioPage = location.pathname === '/portfolio';
	// const isAtTop = useInView(topRef, { margin: '0px 0px -50px 0px' });
	// const [showForm, setShowForm] = useState(false);

	return (
		<div>
			<div ref={topRef}>
				<Header />
			</div>
			{children}

			{/* Conditionally render Footer - hide on portfolio page */}
			{!isPortfolioPage && <Footer />}

			{/* Floating Enquire Now Button */}
			{/* {!isAtTop && (
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
			)} */}

			{/* Modal */}
			{/* <EnquiryFormModal isOpen={showForm} onClose={() => setShowForm(false)} /> */}
		</div>
	);
};

export default MainLayout;