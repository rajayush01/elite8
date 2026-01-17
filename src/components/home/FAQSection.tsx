import { useState } from 'react';
import logo from "../../assets/elite8digital-nav-cropped.png"

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What exactly is Platform?",
      answer: "Platform is a comprehensive solution designed to streamline your business operations. It combines cutting-edge technology with intuitive design to help teams collaborate more effectively and achieve their goals faster."
    },
    {
      question: "How does Platform's AI actually work?",
      answer: "Our AI leverages advanced machine learning algorithms to understand your business processes and provide intelligent recommendations. It learns from your team's interactions and continuously improves to deliver more accurate and relevant insights."
    },
    {
      question: "How long does implementation take?",
      answer: "Implementation typically takes 2-4 weeks depending on your specific requirements and team size. Our dedicated onboarding team works closely with you to ensure a smooth transition with minimal disruption to your operations."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 customer support through multiple channels including live chat, email, and phone. Our expert team is always ready to help with technical issues, training, and strategic guidance to maximize your success."
    },
    {
      question: "How does pricing work?",
      answer: "Our pricing is flexible and scales with your needs. We offer tiered plans based on team size and features required. Contact our sales team for a customized quote that fits your budget and requirements."
    },
    {
      question: "Is Platform secure?",
      answer: "Security is our top priority. Platform employs enterprise-grade encryption, regular security audits, and compliance with industry standards including SOC 2, GDPR, and ISO 27001 to protect your data."
    },
    {
      question: "Can Platform integrate with our existing tools?",
      answer: "Yes! Platform offers seamless integrations with over 100+ popular business tools including Slack, Salesforce, Google Workspace, Microsoft 365, and many more. Our API also allows for custom integrations."
    },
    {
      question: "How is Platform different from traditional infrastructure?",
      answer: "Unlike traditional infrastructure, Platform is cloud-native, highly scalable, and requires minimal IT overhead. It offers real-time collaboration, AI-powered insights, and automatic updates without the need for complex on-premise setup."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-800 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 flex items-center justify-between text-left group hover:opacity-80 transition-opacity duration-200"
                >
                  <span className="text-lg lg:text-xl text-gray-300 group-hover:text-white transition-colors duration-200 pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 relative w-8 h-8 flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      {/* Horizontal line 1 */}
                      <div
                        className={`absolute top-3 left-0 w-8 h-0.5 bg-purple-400 transition-all duration-300 ease-in-out ${
                          openIndex === index ? 'rotate-45 translate-y-1' : ''
                        }`}
                      ></div>
                      {/* Horizontal line 2 */}
                      <div
                        className={`absolute top-5 left-0 w-8 h-0.5 bg-purple-400 transition-all duration-300 ease-in-out ${
                          openIndex === index ? '-rotate-45 -translate-y-1' : ''
                        }`}
                      ></div>
                    </div>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-6 text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Content */}
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* Image Section */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-6 right-6">
                <div className="relative">
                  <svg className="w-24 h-24 animate-spin-slow" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id="circle"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text className="text-[10px] fill-white uppercase tracking-wider">
                      <textPath href="#circle">
                        The future you lead. Imagine. • The future you lead. Imagine. •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-black rounded-full flex flex-col justify-center items-center">
                        <img src={logo} alt="" className='w-10'/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-200">
                You still have questions?
              </h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Every team's needs are different. Let our experts show you how Platform can work
                for your specific requirements — let's have a chat and find the right solution for you.
              </p>
              <button className="group flex items-center gap-3 bg-purple-600 hover:bg-purple-800 text-white px-8 py-4 rounded-lg transition-all duration-300 hover:gap-4">
                <span className="font-medium">Let's have a chat</span>
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

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FAQSection;