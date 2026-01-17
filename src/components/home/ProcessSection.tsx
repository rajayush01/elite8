import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Waves } from 'lucide-react';

interface ProcessItem {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  label: string;
}

const ProcessSection = () => {
  const [activeItem, setActiveItem] = useState<number>(1);
  const [dotColors, setDotColors] = useState<boolean[][]>([]);

  const processItems: ProcessItem[] = [
    {
      id: 1,
      title: 'Neural Network',
      description: 'A self-learning intelligence core that observes, learns, and makes smart decisions in milliseconds to optimize your operations.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      icon: <Waves className="w-7 h-7" />,
      label: 'learning'
    },
    {
      id: 2,
      title: 'Smart Architecture',
      description: 'Scalable and resilient infrastructure designed to handle complex workflows with enterprise-grade reliability and performance.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      icon: <Waves className="w-7 h-7" />,
      label: 'architecture'
    },
    {
      id: 3,
      title: 'Data Protection',
      description: 'Advanced security protocols and encryption methods that safeguard your sensitive information across all touchpoints.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop',
      icon: <Waves className="w-7 h-7" />,
      label: 'protection'
    },
    {
      id: 4,
      title: 'Scalable Growth',
      description: 'Future-proof solutions that expand seamlessly with your business, ensuring consistent performance at any scale.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      icon: <Waves className="w-7 h-7" />,
      label: 'growth'
    }
  ];

  // Initialize dot grid (5 rows x 5 columns)
  useEffect(() => {
    const rows = 5;
    const cols = 5;
    const initialGrid = Array(rows).fill(null).map(() => 
      Array(cols).fill(false)
    );
    setDotColors(initialGrid);
  }, []);

  // Generate valid configuration - exactly one orange dot per row and column
  const generateValidConfiguration = () => {
    const rows = 5;
    const cols = 5;
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(false));
    
    // Create array of column indices and shuffle it
    const shuffleArray = (array: number[]) => {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    
    // Shuffle column positions
    const shuffledCols = shuffleArray([0, 1, 2, 3, 4]);
    
    // Place exactly one orange dot per row, each in different column
    for (let row = 0; row < rows; row++) {
      newGrid[row][shuffledCols[row]] = true;
    }
    
    return newGrid;
  };

  // Animate dots - change entire configuration
  useEffect(() => {
    const interval = setInterval(() => {
      setDotColors(generateValidConfiguration());
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Process Cards */}
        <div className="flex gap-5 mb-16">
          {processItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative max-w-lg cursor-pointer transition-all duration-700 ease-in-out rounded-3xl overflow-hidden ${
                activeItem === item.id
                  ? 'bg-purple-800 flex-[2] border-white border-2'
                  : 'shadow-lg shadow-gray-400 border-2 border-purple-800 flex-[0.5]'
              }`}
              style={{
                height: '750px'
              }}
            >
              {/* Arrow and Number */}
              <div className={`absolute top-8 flex items-center gap-3 transition-all duration-700 ${
                activeItem === item.id ? 'left-8' : 'left-1/2 -translate-x-1/2'
              }`}>
                {activeItem === item.id ? (
                  <ArrowUpRight className="w-7 h-7 text-white" strokeWidth={1.5} />
                ) : (
                  <svg className="w-7 h-7 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <span className={`text-6xl font-extralight transition-all duration-700 ${
                  activeItem === item.id ? 'text-white/90 opacity-100' : 'text-gray-700 opacity-0'
                }`}>
                  {String(item.id).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className={`p-8 h-full flex flex-col transition-all duration-700 ${
                activeItem === item.id ? 'pt-32' : 'pt-24'
              }`}>
                <h3 className={`text-2xl font-light mb-4 transition-all duration-700 ${
                  activeItem === item.id ? 'text-white text-left' : 'text-gray-500 text-center'
                }`}>
                  {item.title}
                </h3>

                {/* Expanded Content */}
                <div className={`flex-1 flex flex-col transition-all duration-700 ${
                  activeItem === item.id 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}>
                  <p className="text-white/90 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Image */}
                  <div className="rounded-2xl overflow-hidden mb-auto">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-72 object-cover"
                    />
                  </div>

                  {/* Icon and Label */}
                  <div className="flex items-center gap-3 text-white mt-8">
                    {item.icon}
                    <span className="text-lg font-light">{item.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Core Services Section */}
        <div className="border-2 border-purple-800 shadow-lg shadow-gray-400 rounded-3xl p-16">
          <div className="flex justify-between items-start mb-16">
            <div className="flex-1 max-w-2xl">
              <p className="text-gray-600 text-xs tracking-wider uppercase mb-6">Core Services — 4/4</p>
              <h2 className="text-5xl font-extralight text-gray-300 leading-tight mb-8">
                Modular, flexible<br />
                solutions for modern<br />
                digital infrastructure
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                We create future-proof systems that scale seamlessly and adapt to your business needs. Platforms key capabilities include:
              </p>
            </div>

            {/* Dot Grid Animation */}
            <div className="flex flex-col gap-12 ml-16">
              {dotColors.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-12">
                  {row.map((isOrange, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ease-in-out ${
                        isOrange ? 'bg-purple-600 scale-110' : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>Design, optimize, scale, and secure.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;