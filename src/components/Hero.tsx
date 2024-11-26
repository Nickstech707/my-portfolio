import React, { useState } from 'react';
import { Code2, Server, Cpu, Rocket, Github, Linkedin, Download, MessageSquare, X } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';


const WHATSAPP_PHONE = '254721990244';
const conversationStarters = [
  "Hi Nicholas! I'd like to discuss a project with you.",
  "Hello! I'm interested in your development services.",
  "Hi! I need help with a web application.",
  "Hello Nicholas, I'd like to get a quote for my project.",
];

const downloadResume = async () => {
  const pdfUrl = 'https://res.cloudinary.com/dzqt3usfp/image/upload/v1731609396/Nicholas_Muturi_Resume_nzzrvo.pdf';

  try {
    const response = await fetch(pdfUrl);
    
    if (!response.ok) throw new Error('Failed to fetch PDF');
    
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Nicholas_Muturi_Resume.pdf';
    
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Error downloading resume:', error);
    // Fallback: Direct link to Cloudinary PDF
    window.open(pdfUrl, '_blank');
  }
};

export default function Hero() {
  const { elementRef: profileRef, isVisible: profileVisible } = useIntersectionObserver();
  const { elementRef: contentRef, isVisible: contentVisible } = useIntersectionObserver();
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const whatsappUrls = React.useMemo(() => 
    conversationStarters.reduce((acc, message) => ({
      ...acc,
      [message]: `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message).replace(/[!'()*]/g, escape)}`
    }), {} as Record<string, string>)
  , []);

  const handleWhatsAppClick = React.useCallback((message: string = '') => {
    let url;
    if (message) {
      // Use pre-generated URL for known messages
      url = whatsappUrls[message] || `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message).replace(/[!'()*]/g, escape)}`;
    } else {
      // Empty message for custom input
      url = `https://wa.me/${WHATSAPP_PHONE}`;
    }
    
    // Add a small delay to ensure WhatsApp Web has time to initialize
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setShowWhatsAppModal(false);
    }, 100);
  }, [whatsappUrls]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white" id="hero">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] opacity-10 bg-cover bg-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="flex flex-col items-center space-y-12">
          {/* Profile Image with Cool Border Effect */}
          <div 
            ref={profileRef}
            className={`
              relative group transform transition-all duration-700
              ${profileVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 rounded-full opacity-75 group-hover:opacity-100 blur-md animate-glow-rotate"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-blue-600 to-emerald-500 rounded-full opacity-75 group-hover:opacity-100 blur animate-glow-rotate-reverse"></div>
              
              <button 
                type="button"
                onClick={() => setShowImageModal(true)}
                className="relative w-48 h-48 rounded-full overflow-hidden ring-4 ring-white hover:ring-blue-500 hover:ring-emerald-500 cursor-pointer focus:outline-none z-10"
              >
                <img
                  src="https://res.cloudinary.com/dzqt3usfp/image/upload/v1725110467/IMG_20240822_171412_282-removebg_eznos0.png"
                  alt="Nicholas Muturi"
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </button>
            </div>
          </div>

          <div 
            ref={contentRef}
            className={`
              space-y-8 text-center max-w-3xl transform transition-all duration-700
              ${contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Nicholas Muturi
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Full-Stack Software Engineer
              </p>
            </div>

            <div className="prose prose-invert max-w-2xl mx-auto space-y-4 text-gray-300">
              <p className="leading-relaxed">
                With experience in software development, I specialize in creating innovative solutions 
                that bridge the gap between technology and real-world challenges. My expertise spans from crafting 
                elegant web applications to implementing complex IoT systems.
              </p>
              <p className="leading-relaxed">
                Based in Nairobi, Kenya, I'm passionate about leveraging technology to solve challenges. My work combines modern web technologies with 
                practical solutions that make a difference.
              </p>
            </div>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href="https://github.com/Nickstech707?tab=repositories" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-yellow-400 after:hidden"
                style={{ textDecoration: 'none' }}
              >
                <Github className="w-8 h-8" />
              </a>
              <a 
                href="https://www.linkedin.com/in/nicholas-muriithi-707682276" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-blue-400 after:hidden"
                style={{ textDecoration: 'none' }}
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=nickstech707@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send Email"
                className="transform hover:scale-110 transition-transform duration-300 hover:text-red-400 after:hidden"
                style={{ textDecoration: 'none' }}
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
            
            <div className="flex flex-wrap justify-center gap-6 text-gray-300">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Code2 className="w-6 h-6" />
                <span>Web Development</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Server className="w-6 h-6" />
                <span>Cloud Solutions</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Cpu className="w-6 h-6" />
                <span>IoT Integration</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Rocket className="w-6 h-6" />
                <span>DevOps</span>
              </div>
            </div>

            <div className="mt-12 flex justify-center space-x-6">
              <a 
                href="#projects" 
                className="flex-1 max-w-[200px] bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all transform hover:scale-105 hover:from-blue-600 hover:to-emerald-600 shadow-lg hover:shadow-xl text-center whitespace-nowrap"
              >
                View My Work
              </a>
              <button 
                onClick={downloadResume}
                className="flex-1 max-w-[200px] border-2 border-white/20 text-white font-semibold text-sm sm:text-base py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all transform hover:scale-105 hover:bg-white/10 backdrop-blur-sm flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Download CV</span>
              </button>
            </div>
          </div>
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

      {/* Image Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
          onClick={() => setShowImageModal(false)}
        >
          <div 
            className="relative w-full max-h-[90vh] overflow-hidden
              sm:max-w-[90%] md:max-w-[80%] lg:max-w-[1024px] xl:max-w-[1280px]
              transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-all duration-300 z-[70] p-2 rounded-full hover:bg-white/10 transform hover:rotate-90 hover:scale-110"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dzqt3usfp/image/upload/v1725110467/IMG_20240822_171412_282-removebg_eznos0.png"
                alt="Nicholas Muriithi"
                className="w-auto h-auto max-w-full max-h-[80vh] 
                  object-contain rounded-lg shadow-2xl
                  sm:max-h-[85vh] md:max-h-[90vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}