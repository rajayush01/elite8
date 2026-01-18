import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/elite8digital-nav-cropped.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Check if we're on the portfolio page
  const isPortfolioPage = location.pathname === '/portfolio';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
  className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
    isPortfolioPage
      ? 'bg-transparent'
      : isScrolled
        ? 'bg-black/90 backdrop-blur-sm'
        : 'bg-transparent'
  } ${isOpen ? 'z-[60]' : 'z-50'}`}
>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={closeMenu}>
              <img src={logo} alt="logo" className="h-16" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="w-10 h-10 flex flex-col justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`w-7 h-0.5 bg-purple-200 transition-all ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-7 h-0.5 bg-purple-200 transition-all ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-7 h-0.5 bg-purple-200 transition-all ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-purple-900 bg-opacity-70 z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-8">
          <nav className="flex flex-col gap-6">
            <Link to="/" onClick={closeMenu} className="text-purple-200 text-xl">
              Home
            </Link>
            <Link to="/portfolio" onClick={closeMenu} className="text-purple-200 text-xl">
              Portfolio
            </Link>
            {/* <Link to="/careers" onClick={closeMenu} className="text-purple-200 text-xl">
              Careers
            </Link> */}
            <Link to="/about" onClick={closeMenu} className="text-purple-200 text-xl">
              About
            </Link>
            <Link to="/contact" onClick={closeMenu} className="text-purple-200 text-xl">
              Let's Talk
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleMenu}
        />
      )}
    </>
  );
}