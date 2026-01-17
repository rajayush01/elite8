
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' for immediate scroll, or 'smooth' for animated
    });

    // Also reset scroll restoration to prevent browser from restoring scroll position
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]);

  return null;
}