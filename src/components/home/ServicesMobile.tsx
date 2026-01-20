import { useState } from 'react';

interface Service {
  number: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

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
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
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

export default function ServicesMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-black text-white px-4 py-8">

          <div className="border-b border-gray-800 py-2 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-200 leading-tight tracking-tight text-center sm:text-left">
              HOW WE CAN HELP
            </h1>
            <span className="text-gray-500 text-xs sm:text-sm">(SERVICES)</span>
          </div>
        </div>
      </div>


      <div className="max-w-2xl mx-auto">
        {services.map((service, index) => (
          <div
            key={service.number}
            className="border-b border-gray-800 last:border-b-0"
          >
            {/* HEADER */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full py-8 flex items-start justify-between text-left transition-opacity hover:opacity-80"
            >
              <div className="flex items-start gap-4">
                <span className="text-gray-600 text-lg font-light">
                  {service.number}.
                </span>
                <h2 className="text-2xl font-medium">
                  {service.title}
                </h2>
              </div>

              <div
                className={`w-6 h-6 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'rotate-45' : 'rotate-0'
                }`}
              >
                <span className="text-purple-500 text-3xl font-light leading-none">
                  +
                </span>
              </div>
            </button>

            {/* CONTENT */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? 'max-h-[900px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pb-8 pl-10">
                <p className="text-gray-400 text-lg mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-6 py-3 border border-gray-700 rounded-full text-gray-400 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl overflow-hidden max-w-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
