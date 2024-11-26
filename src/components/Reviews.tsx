import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Kamau",
    role: "CEO, TechStart Kenya",
    review: "Nicholas delivered exceptional results for our web platform. His expertise in full-stack development transformed our vision into reality. Highly recommended!",
    rating: 5
  },
  {
    name: "David Mwangi",
    role: "Founder, AgriTech Solutions",
    review: "Working with Nicholas was a game-changer for our agricultural monitoring system. His IoT integration skills are top-notch!",
    rating: 5
  },
  {
    name: "Elizabeth Ochieng",
    role: "Product Manager, FinTech Corp",
    review: "Nicholas's attention to detail and problem-solving abilities made our fintech application robust and user-friendly. A true professional!",
    rating: 5
  },
  {
    name: "James Kariuki",
    role: "CTO, Digital Solutions Ltd",
    review: "Exceptional developer with strong technical skills. Nicholas helped us modernize our entire tech stack with great results.",
    rating: 5
  },
  {
    name: "Linda Adhiambo",
    role: "Director, Global Innovations",
    review: "Nicholas's expertise in cloud solutions helped us scale our operations efficiently. His work ethic and communication are outstanding.",
    rating: 5
  }
];

export default function Reviews() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8" id="reviews">
      <div className="max-w-7xl mx-auto">
        <div className="">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
            What Clients Say
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Buttons - Hidden on mobile, shown on larger screens */}
            <button 
              onClick={prevSlide}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 
                bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10 
                transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 
                bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10 
                transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>

            {/* Reviews Slideshow */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 p-4 sm:p-6 md:p-8 bg-white"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                        {review.name}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        {review.role}
                      </p>
                    </div>
                    <div className="mb-4 flex justify-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl sm:text-2xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg italic leading-relaxed text-center 
                      px-2 sm:px-4 md:px-6">
                      "{review.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-between md:hidden mt-4 px-2">
              <button 
                onClick={prevSlide}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 
                  transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={nextSlide}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 
                  transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 
                    ${currentSlide === index 
                      ? 'bg-blue-600 w-4 sm:w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 