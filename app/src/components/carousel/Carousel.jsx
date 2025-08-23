// src/components/Carousel/Carousel.jsx
import React, { useEffect, useState } from "react";
import Slide from "./slides";
import "./carousel.css";
import PropTypes from "prop-types"

const slides = [
  {
    id: 1,
    image: "/assets/images/confirm-booking.jpg",
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
      action: "/contact",
    },
  },
  {
    id: 3,
    image: "/assets/images/waiting.jpg",
    headline: "Don't waste time waiting.",
    sub: " QLess is here.",
    description:
      "Tired of waiting at offices for a service and fail at meeting other needs?, visit QLess and escape the wait.",
    button1: {
      text: "View Organization",
      action: "/organizations",
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
    }, 7000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <Slide slide={slides[currentIndex]} navigate={navigate} />
    </div>
  );
}
