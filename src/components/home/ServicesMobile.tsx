import { useState } from 'react';
import ERPpic from '../../assets/ERP1.png';
import ecommercepic from '../../assets/ecommerce.png'
import webd from '../../assets/webd.png'
import SEO from '../../assets/mobile.png'
import software from '../../assets/software.png'
import business from '../../assets/business.png'
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
    title: 'ERP Solutions',
    description:
      'End-to-end ERP systems designed for schools, colleges, hospitals, and organizations to manage operations, data, and reporting from a single platform.',
    tags: ['School / College ERP', 'Billing & Invoicing', 'Attendance & Fees', 'Reports & Analytics'],
    image:ERPpic
  },
  {
    number: '02',
    title: 'Custom Website Design, Development & Maintenance',
    description:
      'We design and develop high-performance business websites focused on speed, usability, and conversions, with ongoing maintenance for long-term reliability.',
    tags: ['UI/UX Design', 'Custom Development', 'Performance Optimization', 'Ongoing Maintenance'],
    image:webd
  },
  {
    number: '03',
    title: 'E-Commerce Solutions',
    description:
      'Custom e-commerce platforms with seamless payments, inventory control, order management, and scalable backend systems.',
    tags: ['Custom Storefronts', 'Payment Gateway Integration', 'Inventory & Order Management', 'Admin Dashboard'],
    image:ecommercepic
  },
  {
    number: '04',
    title: 'Mobile Application Development',
    description:
      'We design and build secure, scalable mobile applications tailored to business workflows, with seamless performance across devices.',
    tags: ['Android & iOS Apps', 'Web Applications', 'Role-based Access', 'API & System Integration'],
    image:SEO
  },
  {
    number: '05',
    title: 'Business Web Applications & Dashboards',
    description:
      'We build secure, scalable web applications and admin dashboards to manage operations, users, data, and workflows efficiently.',
    tags: ['Admin Panels', 'Role-based Access', 'API Integration', 'Secure Architecture'],
    image:business
  },
  {
    number: '06',
    title: 'Custom Software Development',
    description:
      'Tailor-made software solutions built to automate processes, reduce manual work, and solve specific business problems.',
    tags: ['Automation Tools', 'Internal Systems', 'Custom Portals', 'Scalable Architecture'],
    image: software
  }
  // ,
  // {
  //   number: '07',
  //   title: 'ERP Systems',
  //   description:
  //     'End-to-end ERP solutions to manage operations, finance, HR, inventory, and reporting from a single unified platform.',
  //   tags: ['Enterprise Systems', 'Role Management', 'Analytics', 'Process Automation'],
  //   image:
  //     'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  // },
  // {
  //   number: '08',
  //   title: 'Booking Systems',
  //   description:
  //     'Custom booking and appointment systems with real-time availability, automated confirmations, and admin dashboards.',
  //   tags: ['Appointment Booking', 'Calendar Integration', 'Payment Support', 'Admin Dashboard'],
  //   image:
  //     'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=600&fit=crop'
  // },
  // {
  //   number: '09',
  //   title: 'Invoice Generator',
  //   description:
  //     'Automated invoice generation systems with GST support, PDF export, client management, and payment tracking.',
  //   tags: ['Invoice Automation', 'GST Support', 'PDF Export', 'Payment Tracking'],
  //   image:
  //     'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop'
  // }
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
                <h2 className="text-xl font-medium">
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
