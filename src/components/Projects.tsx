import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Built a scalable e-commerce solution with M-Pesa integration",
    video: "https://customer-m9ql2nocxd2xph0j.cloudflarestream.com/195b3810a8e2d6ad36a6a7f4fdf0101b/manifest/video.m3u8",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    tech: ["React", "Django", "PostgreSQL", "M-Pesa API"],
    link: "#",
    github: "#"
  },
  {
    title: "Remote Job Search",
    description: "Built a scalable remote job search web app with Api integration",
    video: "https://res.cloudinary.com/dzqt3usfp/video/upload/v1734454471/IMG_0076_efi3mh.mov",
    thumbnail: "https://res.cloudinary.com/dzqt3usfp/image/upload/v1734453990/RemoHive_-_Google_Chrome_03_12_2024_22_08_08_v1sk9x.png",
    tech: ["React", "IndexedDB", "PostgreSQL", "Jobicy API"],
    link: "https://remohive.vercel.app",
    github: "#"
  },
  {
    title: "Smart Agriculture",
    description: "Automated irrigation and crop monitoring system",
    video: "https://customer-m9ql2nocxd2xph0j.cloudflarestream.com/195b3810a8e2d6ad36a6a7f4fdf0101b/manifest/video.m3u8",
    thumbnail: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800",
    tech: ["Python", "Arduino", "TensorFlow", "LoRaWAN", "ESP32", "Zigbee", "Machine Learning"],
    link: "#",
    github: "#"
  }
];

export default function Projects() {
  const [playingVideos, setPlayingVideos] = React.useState<Set<string>>(new Set());
  const [showingThumbnails, setShowingThumbnails] = React.useState<Set<string>>(new Set());
  const timersRef = React.useRef<{ [key: string]: NodeJS.Timeout }>({});
  const videoRefs = React.useRef<{ [key: string]: HTMLVideoElement | null }>({});

  // Track section visibility
  const { elementRef: sectionRef, isVisible: isSectionVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Reset and restart animation when section visibility changes
  React.useEffect(() => {
    if (!isSectionVisible) {
      // Stop all videos when section is not visible
      Object.values(videoRefs.current).forEach(videoEl => {
        if (videoEl) {
          videoEl.pause();
          videoEl.currentTime = 0;
        }
      });
      setPlayingVideos(new Set());
      setShowingThumbnails(new Set());
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
      timersRef.current = {};
    }
    else {
      // Start fresh with thumbnails when section becomes visible
      setPlayingVideos(new Set());
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
      timersRef.current = {};

      const newThumbnails = new Set(projects.map(p => p.title));
      setShowingThumbnails(newThumbnails);

      const timer = setTimeout(() => {
        setShowingThumbnails(new Set());
        setPlayingVideos(new Set(projects.map(p => p.title)));
      }, 2000);

      timersRef.current['section'] = timer;
    }

    return () => {
      Object.values(timersRef.current).forEach(timer => clearTimeout(timer));
      timersRef.current = {};
    };
  }, [isSectionVisible]);

  return (
    <div className="bg-gray-50 py-24" id="projects" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
          Featured Projects
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const { elementRef, isVisible } = useIntersectionObserver({
              threshold: 0.5,
              rootMargin: '50px'
            });

            React.useEffect(() => {
              if (isVisible && isSectionVisible) {
                // When project comes into view, first show thumbnail
                setShowingThumbnails(prev => new Set(prev).add(project.title));
                
                // Clear any existing timer for this project
                if (timersRef.current[project.title]) {
                  clearTimeout(timersRef.current[project.title]);
                }
                
                // After 2 seconds, remove thumbnail and start playing video
                const timer = setTimeout(() => {
                  setShowingThumbnails(prev => {
                    const next = new Set(prev);
                    next.delete(project.title);
                    return next;
                  });
                  setPlayingVideos(prev => new Set(prev).add(project.title));
                  delete timersRef.current[project.title];
                }, 2000);

                timersRef.current[project.title] = timer;

                return () => {
                  if (timersRef.current[project.title]) {
                    clearTimeout(timersRef.current[project.title]);
                    delete timersRef.current[project.title];
                  }
                };
              } else {
                // When project leaves view, remove from both sets
                setPlayingVideos(prev => {
                  const next = new Set(prev);
                  next.delete(project.title);
                  return next;
                });
                setShowingThumbnails(prev => {
                  const next = new Set(prev);
                  next.delete(project.title);
                  return next;
                });
                // Clear any pending timer
                if (timersRef.current[project.title]) {
                  clearTimeout(timersRef.current[project.title]);
                  delete timersRef.current[project.title];
                }
              }
            }, [isVisible, isSectionVisible, project.title]);

            return (
              <div 
                key={project.title}
                ref={elementRef}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                {showingThumbnails.has(project.title) ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                ) : playingVideos.has(project.title) ? (
                  <video 
                    ref={el => videoRefs.current[project.title] = el}
                    src={project.video}
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs px-2 py-1 bg-white/20 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <a 
                        href={project.link} 
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      <a 
                        href={project.github} 
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}