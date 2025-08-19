import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import Arrows from "./Arrows";
import SliderContent from "./SliderContent";

const len = ImageSlider.length - 1;

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(activeSlide === len ? 0 : activeSlide + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <section style={{ margin: "78px"}}>
      <SliderContent />
      <Arrows
        prevSlide={() =>
          setActiveSlide(activeSlide < 1 ? len : activeSlide - 1)
        }
        nextSlide={() =>
          setActiveSlide(activeSlide === len ? 0 : activeSlide + 1)
        }
      />
    </section>
  );
}

export default Carousel;
