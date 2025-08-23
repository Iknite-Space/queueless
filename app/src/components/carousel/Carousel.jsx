// src/components/Carousel/Carousel.jsx
import React, { useEffect, useState } from "react";
import Slide from "./slides";
import "./carousel.css";
import PropTypes from "prop-types"

const slides = [
  {
    id: 1,
    image: "/assets/images/queue.jpg",
    headline: "Book your spot in seconds.",
    sub: "Skip the queue",
    description:
      "Find the services you want and reserve your spot for a hassle-free visit.",
    button1: {
      text: "View Organizations",
      action: "/organizations",
    },

  },
  {
    id: 2,
    image: "/assets/images/servicing.jpg",
    headline: "Manage queues easily.",
    sub: "offering better service",
    description:
      "Register your organization and streamline your appointment process.",
    button1: {
      text: "Register Organization",
      action: "/register",
    },
  
  },
];

Carousel.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default function Carousel({ navigate }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 10000); // Slide every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <Slide slide={slides[currentIndex]} navigate={navigate} />
    </div>
  );
}
