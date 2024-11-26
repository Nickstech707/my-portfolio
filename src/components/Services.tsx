import { Code2, Server, Database, Cloud, Smartphone, Shield, Cpu, LineChart, CreditCard, Receipt, MessageSquare, Cog, Lightbulb, Webhook, Palette, CloudCog, Network, Bot } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Web Development",
    description: "Custom web applications using React, Next.js, Vue.js, HTML5, CSS3, JavaScript, Vite, and Material UI",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps using React Native and Flutter",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend Development",
    description: "Scalable solutions with Node.js, Django, Spring Boot, SQLite, Flask, and MongoDB",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database Design",
    description: "Efficient database architecture using PostgreSQL, MongoDB, and Redis",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "M-Pesa Integration",
    description: "Seamless integration of M-Pesa payment solutions for businesses",
  },
  {
    icon: <Receipt className="w-6 h-6" />,
    title: "Billing Systems",
    description: "Advanced billing systems for automated payment processing",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Chatbot Integration",
    description: "Intelligent chatbot development for customer service",
  },
  {
    icon: <Cog className="w-6 h-6" />,
    title: "Automation",
    description: "Streamlining operations through custom automation solutions",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consulting & Training",
    description: "Technical consulting and hands-on development workshops",
  },
  {
    icon: <Webhook className="w-6 h-6" />,
    title: "API Development",
    description: "Custom API creation and third-party integrations",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "UI/UX Design",
    description: "User-centered interface and experience design",
  },
  {
    icon: <CloudCog className="w-6 h-6" />,
    title: "Cloud Solutions",
    description: "Cloud infrastructure on AWS, Vercel, and Render",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Networking Solutions",
    description: "Network architecture, security, and infrastructure setup",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Integration",
    description: "Machine learning and AI solutions for business automation",
  }
];

export default function Services() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div className="bg-gray-50 py-24" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef}
          className={`
            text-center mb-16 transform transition-all duration-700
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
          `}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
            Services I Offer
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive software solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const { elementRef, isVisible } = useIntersectionObserver({
              threshold: 0.1,
              rootMargin: '50px',
            });

            return (
              <div 
                key={service.title}
                ref={elementRef}
                className={`
                  bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
                  transition-all duration-500 transform h-full flex flex-col
                  ${isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                  }
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
                {/* <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button> */}
              </div>
            );
          })}
        </div>
{/* 
        <div className="mt-16 text-center">
          <a 
            href="#contact"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>Discuss Your Project</span>
          </a>
        </div> */}
      </div>
    </div>
  );
}