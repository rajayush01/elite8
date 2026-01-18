import React, { useState } from 'react';
import mob from '@/assets/mob.jpg'

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};

type ServiceCardProps = {
  service: Service;
  index: number;
};


const services: Service[] = [
  {
    number: '01',
    title: 'Custom Website Design, Development & Maintenance',
    description:
      'We design tailored websites with modern aesthetics, solid development, and continuous maintenance to ensure long-term performance and reliability.',
    tags: ['UI/UX Design', 'Custom Development', 'Website Maintenance', 'Performance Optimization'],
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'
  },
  {
    number: '02',
    title: 'SEO Optimization',
    description:
      'We enhance your online visibility through advanced SEO strategies, keyword targeting, and site performance optimization to help your business rank higher.',
    tags: ['On-Page SEO', 'Keyword Research', 'Technical SEO', 'Performance Optimization'],
    image:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop'
  },
  {
    number: '03',
    title: 'E-commerce Solutions',
    description:
      'Complete online store development with secure payment integration, inventory management, and a smooth shopping experience that drives conversions.',
    tags: ['Online Store', 'Payment Gateway', 'Inventory Management', 'Checkout Flow'],
    image:
      'https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?w=800&h=600&fit=crop'
  },
  {
    number: '04',
    title: 'Mobile-Friendly Websites & Apps',
    description:
      'Responsive and adaptive websites and applications that deliver seamless user experiences across all devices.',
    tags: ['Responsive Design', 'Cross-Platform', 'Mobile UX', 'Performance'],
    image:
      mob
  },
  {
    number: '05',
    title: 'Android & iOS App Development',
    description:
      'We build powerful, scalable, and intuitive mobile apps for Android and iOS using modern frameworks and robust backend integrations.',
    tags: ['Android Apps', 'iOS Apps', 'API Integration', 'Scalable Architecture'],
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
  },
  {
    number: '06',
    title: 'Custom Software Development',
    description:
      'Tailored software solutions to optimize workflows, automate processes, and boost overall business efficiency.',
    tags: ['Business Automation', 'Custom Tools', 'Workflow Systems', 'Scalable Software'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop'
  },
  {
    number: '07',
    title: 'ERP Systems',
    description:
      'End-to-end ERP solutions to manage operations, finance, HR, inventory, and reporting from a single unified platform.',
    tags: ['Enterprise Systems', 'Role Management', 'Analytics', 'Process Automation'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  },
  {
    number: '08',
    title: 'Booking Systems',
    description:
      'Custom booking and appointment systems with real-time availability, automated confirmations, and admin dashboards.',
    tags: ['Appointment Booking', 'Calendar Integration', 'Payment Support', 'Admin Dashboard'],
    image:
      'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop'
  },
  {
    number: '09',
    title: 'Invoice Generator',
    description:
      'Automated invoice generation systems with GST support, PDF export, client management, and payment tracking.',
    tags: ['Invoice Automation', 'GST Support', 'PDF Export', 'Payment Tracking'],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop'
  }
];


const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative border-t border-gray-800 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-700 ease-out ${isHovered ? 'py-8 md:py-12' : 'py-6 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">
            {/* Number */}
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700">
              {service.number}
              <span className="text-purple-500">.</span>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row items-start md:items-center md:justify-end gap-6 md:gap-12 w-full md:w-auto">
              {/* Image - appears on hover */}
              <div
                className={`transition-all duration-700 ease-out w-full md:w-auto ${
                  isHovered ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 md:-translate-x-8 translate-x-0'
                }`}
              >
                <div className="relative w-full md:w-80 lg:w-96 h-56 sm:h-64 md:h-60 lg:h-72 rounded-2xl overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Decorative colored blocks */}
                  <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 w-20 sm:w-28 md:w-32 h-20 sm:h-28 md:h-32 bg-red-500 opacity-80 rounded-lg"></div>
                  <div className="absolute -bottom-4 sm:-bottom-8 right-12 sm:right-16 md:right-20 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 bg-purple-400 opacity-70 rounded-lg"></div>
                  <div className="absolute top-1/2 -right-3 sm:-right-4 md:-right-6 w-12 sm:w-16 md:w-20 h-24 sm:h-32 md:h-40 bg-teal-700 opacity-80 rounded-lg"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-left md:text-right w-full md:w-auto">
                <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-gray-200 mb-3 md:mb-4">
                  {service.title}
                </h2>
                
                {/* Description - appears on hover */}
                <div
                  className={`transition-all duration-500 delay-100 ${
                    isHovered ? 'opacity-100 max-h-20 md:max-h-20 mb-4 md:mb-6' : 'opacity-0 max-h-0 mb-0'
                  } overflow-hidden`}
                >
                  <p className="text-gray-400 text-base sm:text-lg md:text-xl">
                    {service.description}
                  </p>
                </div>

                {/* Tags - appear on hover */}
                <div
                  className={`transition-all duration-500 delay-200 ${
                    isHovered ? 'opacity-100 max-h-32 md:max-h-32' : 'opacity-0 max-h-0'
                  } overflow-hidden`}
                >
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-start md:justify-end">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 md:px-4 py-1.5 md:py-2 border border-gray-700 rounded-full text-gray-300 text-xs sm:text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white mt-6 sm:mt-8 md:mt-10">
      {/* Header */}
      <div className="border-b border-gray-800 py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-200 leading-tight tracking-tight text-center sm:text-left">
              HOW WE CAN HELP
            </h1>
            <span className="text-gray-500 text-xs sm:text-sm">(SERVICES)</span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div>
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}