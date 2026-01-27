// Create a new file: SecondSectionMobWrapper.tsx
import { useEffect, useState, useRef } from 'react';
import SecondSectionMob from './SecondSectionMob';

const SecondSectionMobWrapper = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress based on when section enters viewport
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            
            // Progress from 0 to 1 as section scrolls through viewport
            const progress = Math.min(
                Math.max(
                    (windowHeight - sectionTop) / (windowHeight + sectionHeight),
                    0
                ),
                1
            );
            
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={sectionRef} className="relative w-full">
            <SecondSectionMob scrollProgress={scrollProgress} />
        </div>
    );
};

export default SecondSectionMobWrapper;