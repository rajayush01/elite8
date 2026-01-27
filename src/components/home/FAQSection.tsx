import { useState } from 'react';

const FAQSection = () => {
 const [openIndex, setOpenIndex] = useState<number | null>(null);


  const faqs = [
    {
      question: "What exactly is Elite8 Digital?",
      answer: "Elite8 Digital is a technology and digital solutions company focused on building scalable, high-performance products for businesses. We specialize in modern web development, backend systems, cloud solutions, and digital transformation that help organizations grow faster and operate smarter."
    },
    {
      question: "How does Elite8 Digital use AI in its solutions?",
      answer: "At Elite8 Digital, we use AI and data-driven technologies to enhance automation, analytics, and decision-making. Depending on the project, this can include intelligent recommendations, predictive insights, workflow optimization, and custom AI integrations tailored to your business needs."
    },
    {
      question: "How long does implementation usually take?",
      answer: "Implementation timelines vary based on project scope and complexity, but most solutions are delivered within 2–6 weeks. We follow an agile development process, allowing you to see progress early while ensuring quality, scalability, and performance."
    },
    {
      question: "What kind of support does Elite8 Digital provide?",
      answer: "We provide end-to-end support including onboarding, deployment, maintenance, and post-launch optimization. Our team offers ongoing technical support, performance monitoring, and feature enhancements to ensure long-term success."
    },
    {
      question: "How does pricing work at Elite8 Digital?",
      answer: "Our pricing is flexible and project-based. Costs depend on the scope, features, technology stack, and timeline. We believe in transparent pricing and provide detailed proposals so you know exactly what you're paying for—no hidden fees."
    },
    {
      question: "Is Elite8 Digital secure?",
      answer: "Yes. Security is built into everything we develop. Elite8 Digital follows industry best practices including secure authentication, data encryption, role-based access control, and regular security reviews to ensure your applications and data remain protected."
    },
    {
      question: "Can Elite8 Digital integrate with our existing tools and systems?",
      answer: "Absolutely. We specialize in building integrations with existing tools, APIs, and third-party platforms such as CRMs, payment gateways, analytics tools, and cloud services. We also develop custom APIs when needed."
    },
    {
      question: "How is Elite8 Digital different from traditional IT service providers?",
      answer: "Unlike traditional IT providers, Elite8 Digital focuses on modern, scalable, and future-ready solutions. We combine clean architecture, cloud-native development, automation, and performance optimization to deliver products that are easy to maintain, scale, and evolve."
    }
  ];

  const toggleFAQ = (index: number) => {

    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/50 rounded-full px-6 py-2 mb-6 backdrop-blur-sm">
            <span className="text-purple-300 text-sm font-semibold tracking-wide">Got Questions?</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-300 via-purple-100 to-purple-300 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-purple-200/70 text-xl max-w-2xl mx-auto">
            Everything you need to know about Elite8 Digital
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-purple-500/20 rounded-2xl overflow-hidden backdrop-blur-sm bg-purple-900/20 hover:bg-purple-800/30 hover:border-purple-400/40 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg lg:text-xl text-purple-100 group-hover:text-white transition-colors duration-200 pr-4 font-semibold">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 relative w-8 h-8 flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      {/* Two horizontal lines that transform to X */}
                      {/* Top line */}
                      <div
                        className={`absolute top-1/2 left-0 w-8 h-0.5 bg-purple-400 transition-all duration-900 ease-in-out origin-center ${
                          openIndex === index 
                            ? 'rotate-45 translate-y-0' 
                            : '-translate-y-2'
                        }`}
                      ></div>
                      {/* Bottom line */}
                      <div
                        className={`absolute top-1/2 left-0 w-8 h-0.5 bg-purple-400 transition-all duration-900 ease-in-out origin-center ${
                          openIndex === index 
                            ? '-rotate-45 translate-y-0' 
                            : 'translate-y-2'
                        }`}
                      ></div>
                    </div>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-purple-200/80 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Content */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
              
            </div>

            {/* Call to Action */}
            <div className="space-y-6 backdrop-blur-sm bg-purple-900/20 border border-purple-500/30 rounded-2xl p-8">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Still have questions?
              </h2>
              <p className="text-purple-200/70 leading-relaxed text-lg">
                Every project is unique. Let our experts show you how Elite8 Digital can work for your specific requirements—let's have a chat and find the right solution for you.
              </p>
              <button className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:gap-4 shadow-lg shadow-purple-500/50 hover:shadow-purple-400/60 transform hover:scale-105">
                <span className="font-semibold">Let's have a chat</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FAQSection;