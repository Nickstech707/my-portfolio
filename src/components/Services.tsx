import { Code2, Server, Database,  Smartphone,   CreditCard, Receipt, MessageSquare, Cog, Lightbulb, Webhook, Palette, CloudCog, Network, Bot } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const services = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Web Development",
    description: "Transform your ideas into stunning web applications! I specialize in creating custom solutions using React, Next.js, Vue.js, HTML5, CSS3, JavaScript, Vite, and Material UI.",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Development",
    description: "Bring your app to life! Whether it's native or cross-platform, I craft beautiful mobile experiences using React Native and Flutter.",
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "Backend Development",
    description: "Power your applications with robust backend solutions! I build scalable systems using Node.js, Django, Spring Boot, SQLite, Flask, and MongoDB.",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Database Design",
    description: "Let’s create a solid foundation for your data! My efficient database architectures utilize PostgreSQL, MongoDB, and Redis to keep your information organized and accessible.",
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "M-Pesa Integration",
    description: "Make payments a breeze! I seamlessly integrate M-Pesa payment solutions, ensuring your business transactions are smooth and secure.",
  },
  {
    icon: <Receipt className="w-6 h-6" />,
    title: "Billing Systems",
    description: "Say goodbye to manual billing! Myadvanced billing systems automate payment processing, saving you time and reducing errors.",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Chatbot Integration",
    description: "Enhance your customer service with intelligent chatbots! I develop smart solutions that engage and assist your users 24/7.",
  },
  {
    icon: <Cog className="w-6 h-6" />,
    title: "Automation",
    description: "Streamline your operations! My custom automation solutions help you save time and focus on what really matters.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consulting",
    description: "Need guidance? My technical consulting and hands-on development workshops empower you with the knowledge to succeed.",
  },
  {
    icon: <Webhook className="w-6 h-6" />,
    title: "API Development",
    description: "Connect and integrate! I create custom APIs and facilitate third-party integrations to enhance your applications.",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "UI/UX Design",
    description: "Crafting delightful experiences! My user-centered design approach ensures your interface is not only beautiful but also intuitive.",
  },
  {
    icon: <CloudCog className="w-6 h-6" />,
    title: "Cloud Solutions",
    description: "Elevate your infrastructure! I provide cloud solutions on AWS, Vercel, and Render to ensure your applications are scalable and reliable.",
  },
  {
    icon: <Network className="w-6 h-6" />,
    title: "Networking Solutions",
    description: "Build a secure and efficient network! I design network architecture and infrastructure setups tailored to your needs.",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Integration",
    description: "Unlock the power of AI! I implement machine learning and AI solutions to automate processes and enhance your business operations.",
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
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 flex-grow">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}