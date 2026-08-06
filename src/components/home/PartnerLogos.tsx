"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partnerLogos = [
  "/images/partners/partner1.png",
  "/images/partners/partner2.png",
  "/images/partners/partner3.png",
  "/images/partners/partner4.png",
  "/images/partners/partner5.png",
];

export default function PartnerLogos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1);
      else if (window.innerWidth < 768) setItemsToShow(2);
      else if (window.innerWidth < 1024) setItemsToShow(3);
      else setItemsToShow(4);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, partnerLogos.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="py-12 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-6 uppercase tracking-wider">
          Đối tác của chúng tôi
        </h2>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          {partnerLogos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? "bg-blue-600 w-6" 
                  : "bg-gray-300 w-2.5 hover:bg-gray-400"
              }`}
              aria-label={`Go to partner ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="relative flex items-center px-4 md:px-8">
          <button 
            onClick={prevSlide}
            className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {partnerLogos.map((logo, index) => (
                <div 
                  key={index} 
                  className="p-2 flex justify-center items-center shrink-0"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="w-full h-24 bg-white shadow-sm rounded flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow p-4">
                    <img 
                      src={logo} 
                      alt={`Partner ${index + 1}`} 
                      className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 focus:outline-none"
            aria-label="Next partner"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
