
import React, { useEffect, useState } from 'react';

const Caro = ({ children, autoSlide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = React.Children.count(children);

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [autoSlide, totalSlides]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex transition-transform duration-1000" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {React.Children.map(children, (child, index) => (
          <div className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Caro;
