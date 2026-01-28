import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'motion/react';
import img3 from '@/assets/lets-taxify.png'
import img2 from '@/assets/o-nesty.png'
import img1 from '@/assets/vikas.png'
import img4 from '@/assets/ib.png'
import img5 from '@/assets/vyshnavi.png'
import img6 from '@/assets/jk-hospital.png'
import img7 from '@/assets/stanford.gif'
import img8 from '@/assets/temple.png'
import img9 from '@/assets/reclipse.png'
import img10 from '@/assets/avnya.png'
import img11 from '@/assets/nym.jpg'
import img12 from '@/assets/sunita.png'

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);
  
  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);
  
  return width;
}

const Clients = () => {
  const baseX = useMotionValue(0);
  
  const copyRef = useRef<HTMLDivElement>(null);
  const copyWidth = useElementWidth(copyRef);
  
  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }
  
  const x = useTransform(baseX, v => {
    if (copyWidth === 0) return '0px';
    return `${wrap(-copyWidth, 0, v)}px`;
  });
  
  const baseVelocity = 50;
  
  useAnimationFrame((t, delta) => {
    const moveBy = -1 * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });
  
  const clientLogos = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
  
  return (
    <div className="relative overflow-hidden max-w-4xl mx-auto rounded-lg shadow-lg shadow-black mb-5 py-8">
      <motion.div className="text-center text-white text-3xl sm:text-6xl font-light mb-10 relative z-10 font-serif ">
        Built on <span className='text-purple-500'>trust</span><br/> Delivered with <span className='text-purple-500'>excellence</span>
      </motion.div>
      
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {[...Array(6)].map((_, copyIndex) => (
            <div
              key={copyIndex}
              className="flex flex-shrink-0"
              ref={copyIndex === 0 ? copyRef : null}
            >
              {clientLogos.map((logo, index) => (
                <img
                  key={`${copyIndex}-${index}`}
                  src={logo}
                  alt=""
                  className="h-16 w-auto object-contain mx-4"
                />
              ))}
            </div>
          ))}
        </motion.div>
        
        {/* Left gradient mask */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        
        {/* Right gradient mask */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default Clients;