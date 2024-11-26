import React, { useState } from 'react';
import { Monitor, Server, Terminal, Cpu, ExternalLink, Network, Bot } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import type { Skill } from '../types';

const skills: Skill[] = [
  {
    category: "Frontend Development",
    icon: <Monitor className="w-6 h-6" />,
    description: "Creating beautiful, responsive, and performant user interfaces that delight your customers",
    technologies: [
      { 
        name: "React", 
        proficiency: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "Building modern, scalable web applications"
      },
      { 
        name: "TypeScript", 
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Type-safe, maintainable code"
      },
      { 
        name: "Next.js", 
        proficiency: 80,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "SEO-optimized, server-side rendered apps"
      },
      { 
        name: "Tailwind CSS", 
        proficiency: 95,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        description: "Rapid, responsive UI development"
      }
    ]
  },
  {
    category: "Backend Solutions",
    icon: <Server className="w-6 h-6" />,
    description: "Building robust, scalable server infrastructure that powers your business",
    technologies: [
      { 
        name: "Django", 
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
        description: "Secure, scalable Python web framework"
      },
      { 
        name: "Node.js", 
        proficiency: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        description: "High-performance JavaScript runtime"
      },
      { 
        name: "PostgreSQL", 
        proficiency: 80,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        description: "Reliable, robust database solutions"
      },
      { 
        name: "Redis", 
        proficiency: 75,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
        description: "High-speed caching and real-time data"
      }
    ]
  },
  {
    category: "DevOps & Cloud",
    icon: <Terminal className="w-6 h-6" />,
    description: "Automating deployment and ensuring high availability of your applications",
    technologies: [
      { 
        name: "Docker", 
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        description: "Containerized application deployment"
      },
      { 
        name: "Kubernetes", 
        proficiency: 75,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        description: "Container orchestration at scale"
      },
      { 
        name: "AWS", 
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        description: "Cloud infrastructure and services"
      },
      { 
        name: "GitHub", 
        proficiency: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        description: "CI/CD and version control"
      }
    ]
  },
  {
    category: "IoT & Embedded",
    icon: <Cpu className="w-6 h-6" />,
    description: "Connecting the physical world with digital solutions",
    technologies: [
      { 
        name: "Raspberry Pi", 
        proficiency: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
        description: "Edge computing and IoT hubs"
      },
      { 
        name: "Arduino", 
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        description: "Embedded systems development"
      },
      { 
        name: "Python", 
        proficiency: 90,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        description: "IoT data processing and analysis"
      },
      { 
        name: "MQTT", 
        proficiency: 80,
        logo: "https://mqtt.org/assets/downloads/mqtt-ver.png",
        description: "Real-time IoT communication"
      }
    ]
  },
  {
    category: "Network Engineering",
    icon: <Network className="w-6 h-6" />,
    description: "Designing and implementing secure, scalable network infrastructure",
    technologies: [
      {
        name: "Cisco",
        proficiency: 85,
        logo: "https://onepublishing.my.salesforce-sites.com/logotool/resource/1356227231000/logo",
        description: "Enterprise networking solutions"
      },
      {
        name: "Wireshark",
        proficiency: 80,
        logo: "https://www.wireshark.org/assets/theme-2015/images/wireshark_logo.png",
        description: "Network protocol analysis"
      },
      {
        name: "pfSense",
        proficiency: 75,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pfsense/pfsense-original-wordmark.svg",
        description: "Network security and firewall"
      },
      {
        name: "OpenVPN",
        proficiency: 85,
        logo: "https://openvpn.net/_next/static/media/open-vpn-logo.238dc4d9.svg",
        description: "Secure remote access solutions"
      }
    ]
  },
  {
    category: "AI & Machine Learning",
    icon: <Bot className="w-6 h-6" />,
    description: "Implementing intelligent solutions for complex business problems",
    technologies: [
      {
        name: "TensorFlow",
        proficiency: 85,
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        description: "Deep learning and neural networks"
      },
      {
        name: "PyTorch",
        proficiency: 80,
        logo: "https://pytorch.org/assets/images/pytorch-logo.png",
        description: "Machine learning research and deployment"
      },
      {
        name: "scikit-learn",
        proficiency: 90,
        logo: "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png",
        description: "Statistical modeling and ML pipelines"
      },
      {
        name: "OpenAI",
        proficiency: 85,
        logo: "https://openai.com/favicon.ico",
        description: "AI model integration and fine-tuning"
      }
    ]
  }
];

function SkillCard({ skill }: { skill: Skill }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div 
      ref={elementRef}
      className={`
        transform transition-all duration-500
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
    >
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl 
          transition-all duration-300 cursor-pointer
          ${isExpanded ? 'ring-2 ring-blue-500' : ''}
        `}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
            {skill.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{skill.category}</h3>
            <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
          </div>
        </div>
        
        <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden'}`}>
          {skill.technologies.map((tech) => (
            <div key={tech.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={tech.logo} 
                    alt={tech.name} 
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-sm text-blue-600">{tech.proficiency}%</span>
                    </div>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000"
                  style={{ 
                    width: isVisible ? `${tech.proficiency}%` : '0%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {!isExpanded && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {skill.technologies.map((tech) => (
              <div 
                key={tech.name}
                className="flex flex-col items-center space-y-2 group"
              >
                <img 
                  src={tech.logo} 
                  alt={tech.name}
                  className="w-10 h-10 object-contain transform transition-transform group-hover:scale-110"
                />
                <span className="text-sm text-gray-600 text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        )}

        <button 
          className="mt-4 w-full flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-700"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <div className="bg-white py-24" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
            Technical Expertise
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering end-to-end solutions with modern technologies and best practices. 
            From concept to deployment, I ensure your project succeeds with:
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">
            Ready to bring your project to life? Let's discuss how these technologies 
            can solve your business challenges.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10">Discuss Your Project</span>
            <ExternalLink className="w-4 h-4 relative z-10" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-600 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </div>
  );
}