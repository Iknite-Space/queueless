import React from 'react';

function SliderContent ({activeIndex, SliderImage}){
  return
  <section>
    {SliderImage.map((slide, index) => (
      <div
        key={index}
        className={index === activeIndex ? "slides active" : "inactive"}
      >
        <img className="slide-image" src={slide.url} alt="" />
        <p className="head-text">{slide.title}</p>
        <p className="head-text">{slide.description}</p>

        {/* <p className="head-text">Book your spot in seconds.</p>
        <p className="head-text">Skip the queue</p> */}
      </div>
    ))}
  </section>;

}

export default SliderContent;