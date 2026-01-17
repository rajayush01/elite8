import React, { useState } from 'react';
import { Monitor, ArrowRight } from 'lucide-react';
import Clients from '@/components/home/Clients';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white mx-4 sm:mx-8 md:mx-12 lg:mx-20 xl:mx-40 my-28 sm:my-20 md:my-20 lg:my-24 border border-gray-800">
      {/* Hero Section */}
      <div className="border-b border-gray-800">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-14 lg:py-16">
          <h1 className="text-[clamp(2.5rem,10vw,10rem)] sm:text-[clamp(3rem,11vw,10rem)] md:text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.9] text-purple-900 tracking-tight">
            Let's Talk.
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="border-b border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Column */}
          <div className="py-8 sm:py-10 md:py-12 lg:py-16 border-b lg:border-b-0 lg:border-r border-gray-800 space-y-8 sm:space-y-12 md:space-y-16">
            {/* What we offer */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12">
              <h2 className="text-lg sm:text-xl md:text-2xl font-normal mb-2 text-white">What we offer</h2>
              <ul className="space-y-0.5 text-xs sm:text-sm">
                <li className="flex items-start text-gray-400">
                  <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">AI tools built for scale</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">Real-time optimization</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">Scalable global setup</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">Automated resource handling</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-3 mt-2 w-1 h-1 bg-gray-400 rounded-full flex-shrink-0"></span>
                  <span className="leading-relaxed">Around-the-clock support</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 gap-8 sm:gap-10 md:gap-12 border-t border-gray-800">
              {/* Digital */}
              <div className="mt-6 sm:mt-8 md:mt-10">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4 md:mb-5">
                  <Monitor size={20} className="text-gray-400 sm:w-[22px] sm:h-[22px]" />
                  <h3 className="text-lg sm:text-xl font-normal text-white">Digital</h3>
                </div>
                <button className="text-gray-400 hover:text-[#ff6b4a] transition-colors text-left text-sm sm:text-base break-all">
                  contact@elite8digital.in
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="">
            <div className="mb-6 sm:mb-8 md:mb-10 border-b border-gray-800 px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5">
              <h2 className="text-lg sm:text-xl md:text-2xl font-normal mb-2 sm:mb-3 text-white">Got a question, challenge, or idea?</h2>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">Fill out the form — we'll get back to you shortly.</p>
            </div>
            <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-12">
              <div className="space-y-1">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border-b border-gray-800 py-2.5 sm:py-3 text-sm sm:text-base text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#ff6b4a] transition-colors rounded-lg px-2"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border-b border-gray-800 py-2.5 sm:py-3 text-sm sm:text-base text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#ff6b4a] transition-colors rounded-lg px-2"
                  />
                </div>
                
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border-b border-gray-800 py-2.5 sm:py-3 text-sm sm:text-base text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#ff6b4a] transition-colors rounded-lg px-2"
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={1}
                    className="w-full bg-gray-900 border-b border-gray-800 py-2.5 sm:py-3 text-sm sm:text-base text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#ff6b4a] transition-colors rounded-lg px-2"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-6 gap-4 sm:gap-0">
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-full sm:max-w-[280px]">
                    By submitting, you agree to our <button className="text-purple-900 hover:underline">Privacy Policy.</button>
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="bg-purple-700 hover:bg-purple-900 text-white p-3 sm:p-4 rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 mb-3 sm:mb-5 self-end sm:self-auto"
                    aria-label="Submit form"
                  >
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Client Logos */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 opacity-50">
          <Clients/>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;