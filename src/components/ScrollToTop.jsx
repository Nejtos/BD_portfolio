import "./ScrollToTop.css";
import scrollUp from "../assets/icons/scrollTop.webp";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
        onClick={scrollToTop}
      >
        <img src={scrollUp} alt="Scroll to top icon" />
      </div>
    </>
  );
};

export default ScrollToTop;
