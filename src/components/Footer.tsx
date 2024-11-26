import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, ChevronRight, MessageSquare } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Donate', href: '#donate' },
  { name: 'Contact', href: '#contact' },
];

const services = [
  { name: 'Web Development', href: '#services' },
  { name: 'Mobile Apps', href: '#services' },
  { name: 'IoT Solutions', href: '#services' },
  { name: 'Cloud Services', href: '#services' },
  { name: 'AI Integration', href: '#services' },
  { name: 'M-Pesa Integration', href: '#services' },
];

const conversationStarters = [
  "Hi Nicholas! I'd like to discuss a project with you.",
  "Hello! I'm interested in your development services.",
  "Hi! I need help with a web application.",
  "Hello Nicholas, I'd like to get a quote for my project.",
];

export default function Footer() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleWhatsAppClick = (message: string = '') => {
    const phone = '254721990244';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowWhatsAppModal(false);
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nicholas Muturi
            </h3>
            <p className="text-gray-400">
              Full-stack developer specializing in modern web applications, IoT solutions 
              and mobile development. Based in Nairobi, Kenya.
            </p>
            <div className="flex space-x-4">
            <a 
                href="https://github.com/Nickstech707?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-yellow-400"
              >
                <Github className="w-8 h-8" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nicholas-muriithi-707682276" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-blue-400"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nickstech707@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-red-400"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
              <button
                onClick={() => setShowWhatsAppModal(true)}
                className="transform hover:scale-110 transition-transform duration-300 hover:text-green-400"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-8 h-8 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform" />
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nickstech707@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>nickstech707@gmail.com</span>
              </a>
              <a 
                href="tel:+254721990244"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+254 721 990 244</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Nicholas Muturi. All rights reserved.</p>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Start a Conversation</h3>
              <button 
                onClick={() => setShowWhatsAppModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              {conversationStarters.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleWhatsAppClick(message)}
                  className="w-full p-3 text-left rounded-lg hover:bg-gray-50 flex items-center space-x-3 group transition-colors"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700">{message}</span>
                </button>
              ))}
              
              <button
                onClick={() => handleWhatsAppClick()}
                className="w-full p-3 text-left rounded-lg hover:bg-gray-50 flex items-center space-x-3 group transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600">
                    <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </div>
                <span className="text-gray-700">Write custom message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}