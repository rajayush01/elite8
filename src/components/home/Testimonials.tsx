import React, { useEffect, useRef } from 'react';
import avatar1 from '@/assets/vikas.png';
import avatar2 from '@/assets/lets-taxify.png';
import avatar3 from '@/assets/sunita.png';
import avatar4 from '@/assets/unnamed.png';
import avatar6 from '@/assets/ib.png';
import team1 from '@/assets/o-nesty.png';


const testimonials = [
  {
    id:1,
    name: 'Dr. Vikas Bhalekar',
    role: 'MBBS, MD Radiation Oncology',
    content:
      'As a medical professional, I wanted a website that reflected both trust and quality — and Elite8 Digital absolutely delivered. Their team understood my vision from day one and built a platform that’s clean, fast, and easy for my patients to navigate. Since launching the new site, appointment inquiries have nearly doubled. Their attention to detail and design truly sets them apart.',
    image: avatar1,
    website: 'https://drvikasbhalekar.in/'
  },
  {
    id:2,
    name: 'CA Aastha Bansal',
    role: 'Founder, LetsTaxify',
    content:
      'I’m extremely pleased with the outstanding work delivered by Elite 8 Digital Private Limited on our website www.letstaxify.com. The team not only completed the project well before the committed deadline but also delivered a design that was modern, user-friendly, and exceeded expectations. Their professionalism, attention to detail, and creative approach made the entire experience seamless. I highly recommend them to anyone looking for top-notch web development services.',
    image: avatar2,
    website: 'https://letstaxify.com/'
  },
  {
    id:3,
    name: 'Tarunesh Bhargava',
    role: 'Owner, Sunita Infrastructure',
    content:
      'We partnered with Elite8 Digital to revamp our construction company’s website, and the results were outstanding. They created a modern, responsive platform that perfectly showcases our projects and services. The design reflects our brand’s professionalism, and we’ve seen a clear boost in client inquiries since the launch. Their team was proactive, creative, and always one step ahead throughout the process.',
    image: avatar3,
    website: null // add link later if available
  },
  {
    id:4,
    name: 'Umakant',
    role: 'Owner, Bharat O’Nesty Foods Pvt. Ltd.',
    content:
      'Great work by the Elite8 Digital Team! We truly appreciate your creativity, professionalism, and dedication in designing the website for Bharat O’Nesty Foods Pvt. Ltd. The site looks elegant, user-friendly, and perfectly represents our brand. Excellent teamwork and timely delivery — keep up the great work! — Team Bharat O’Nesty Foods Pvt. Ltd.',
    image: avatar4,
    website: 'https://bharatonesty.com/'
  },
  {
    id:5,
    name: 'IB Technologies',
    role: 'Technology Solutions Provider',
    content:
      'Elite8 Digital has done an outstanding job designing our company website. The layout is beautiful, easy to navigate, and perfectly showcases our services, team, and technological achievements. The admin panel they built makes updating content effortless. Our clients love the new site!',
    image: avatar6,
    website: 'https://ib-tech.netlify.app/'
  },
  {
    id:6,
  name: 'Team Bharat O’Nesty',
  role: 'Bharat O’Nesty Foods Pvt. Ltd.',
  content:
    'We’re extremely happy with the website created by Elite8 Digital! The design beautifully captures our brand’s essence — elegant, user-friendly, and impactful. The team’s creativity, attention to detail, and on-time delivery made the whole process seamless. Highly recommended!',
  image: team1,
  website: 'https://bharatonesty.com/'
}
]

export default function TestimonialScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.8;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollContainer.scrollHeight && scrollPosition >= scrollContainer.scrollHeight / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollTop = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-purple-200 text-lg">Trusted by thousands of satisfied users worldwide</p>
        </div>
        <div className='flex flex-row items-center justify-center gap-10'>
          <div className='text-white text-6xl '>What our clients say</div>
          <div 
          ref={scrollRef}
          className="h-[600px] overflow-hidden relative max-w-2xl"
          style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="space-y-6">
            {doubledTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-800 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 mb-4 leading-relaxed">"{testimonial.content}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-purple-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}