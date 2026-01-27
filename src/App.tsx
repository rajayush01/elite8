import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './components/layout/MainLayout';
//import Portfolio from './pages/Portfolio';
import AboutPage from './pages/About';
import ContactSection from './pages/LetsTalk';
import 'remixicon/fonts/remixicon.css';
import ScrollToTop from './components/layout/ScrollToTop';
import PortfolioWrapper from './pages/PortfolioWrapper';

// 🧭 Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));

function App() {

	return (
		<Suspense
			// fallback={
			// 	<div className="flex items-center justify-center min-h-screen bg-[#690B22]">
			// 		<div className="scale-[2]">
			// 			<DPSLoading mode="suspense" size="md" />
			// 		</div>
			// 	</div>
			// }
		>
			<ScrollToTop/>
			<Routes>
				{/* 🏠 Main Layout Wrapper */}
				<Route
					path="/"
					element={
						<MainLayout>
							<Outlet />
						</MainLayout>
					}
				>
					{/* ✅ Main Pages */}
					<Route index element={<Home />} />
					<Route path="portfolio" element={<PortfolioWrapper />} />
					<Route path="contact" element={<ContactSection />} />
					<Route path="about" element={<AboutPage />} />


					{/* 🚫 Catch-all for invalid routes */}
					<Route path="*" element={<Navigate to="/404" replace />} />
				</Route>

				{/* 🧱 Standalone 404 page */}
				{/* <Route
					path="/404"
					element={
						<MainLayout>
							<NotFound />
						</MainLayout>
					}
				/> */}
			</Routes>
		</Suspense>
	);
}

export default App;
