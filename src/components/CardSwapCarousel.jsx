import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const CardSwapCarousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [cards.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto group">
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-2">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0 scale-100' 
                  : index < currentIndex 
                  ? 'opacity-0 -translate-x-full scale-95'
                  : 'opacity-0 translate-x-full scale-95'
              }`}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <FaChevronLeft className="text-xl text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
      >
        <FaChevronRight className="text-xl text-gray-800" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center gap-3 mt-8">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 hover:scale-110 ${
              index === currentIndex 
                ? 'w-10 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] shadow-lg' 
                : 'w-3 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#8B3FDE] to-[#C837AB] rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default CardSwapCarousel;
