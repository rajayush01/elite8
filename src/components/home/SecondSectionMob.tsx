import { useRef } from 'react';

interface SecondSectionProps {
    scrollProgress?: number;
}

const SecondSectionMob = ({ scrollProgress = 0 }: SecondSectionProps) => {
    const textRef = useRef<HTMLDivElement | null>(null);

    const secondTextProgress =
        scrollProgress < 0.5
            ? 0
            : Math.max(0, Math.min((scrollProgress - 0.5) * 5, 1));

    // --- Text Reveal Logic ---
    const text =
        'We craft scalable websites, applications, and platforms—engineered for performance and built to help businesses grow.';
    const words = text.split(' ');

    const getCharOpacity = (wordIndex: number, charIndexInWord: number): number => {
        const allChars: string[] = [];
        words.forEach((word) => {
            word.split('').forEach((char) => allChars.push(char));
            allChars.push(' ');
        });

        let currentCharIndex = 0;
        for (let i = 0; i < wordIndex; i++) {
            currentCharIndex += words[i].length + 1;
        }
        currentCharIndex += charIndexInWord;

        const totalChars = allChars.length;
        const revealedChars = secondTextProgress * totalChars;

        if (currentCharIndex < revealedChars) {
            return 1;
        } else if (currentCharIndex < revealedChars + 1) {
            return 0.6;
        } else {
            return 0.6;
        }
    };

    return (
        <div
            ref={textRef}
            className="sticky top-0 h-screen flex items-center justify-center px-0 md:px-8 z-20"
           
        >
            <div
                className="w-screen bg-black rounded-3xl shadow-2xl overflow-hidden"
            >
                <div className="px-6 py-12 md:px-16 md:py-20">
                    <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
                        <div className="flex-shrink-0">
                            <span className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                                (ABOUT)
                            </span>
                        </div>
                        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            {words.map((word, wordIndex) => (
                                <span key={wordIndex} className="inline-block mr-3 mb-2">
                                    {word.split('').map((char, charIndex) => {
                                        const opacity = getCharOpacity(wordIndex, charIndex);
                                        const isHighlighted = opacity === 1;
                                        return (
                                            <span
                                                key={charIndex}
                                                style={{
                                                    color: isHighlighted ? 'white' : '#4a4a4a',
                                                    opacity: opacity,
                                                    display: 'inline-block',
                                                    transition: 'color 0.8s ease, opacity 0.8s ease',
                                                }}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondSectionMob;