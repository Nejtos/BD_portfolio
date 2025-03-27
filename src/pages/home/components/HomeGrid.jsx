import "./HomeGrid.css";
import { useState, useEffect } from "react";
import { getPhotos } from "../../../components/Data";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

const HomeGrid = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    getPhotos().then(setPhotos);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <>
      <div className="portfolio-container-box">
        <div className="home-main-grid">
          {photos.map((photo) => {
            const defaultCover = photo.covers[0]?.img || "";
            const hoverCover = photo.covers[1]?.img || defaultCover;
            return (
              <div
                key={photo.id}
                className="home-main-grid-item"
                style={{
                  backgroundImage: `url(${
                    hoveredId === photo.id ? hoverCover : defaultCover
                  })`,
                  backgroundSize: photo.size,
                  backgroundPosition: photo.backgroundPosition,
                  cursor: "pointer",
                  transition: "background-image 0.3s ease-in-out",
                  position: "relative",
                }}
                onMouseEnter={() => setHoveredId(photo.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  navigate(`/${photo.title}`, { state: { type: photo.type } });
                  window.scrollTo(0, 0);
                }}
              >
                {(hoveredId === photo.id || isMobile) && photo.visible === "1" ? (
                  <div className="home-main-grid-item-title">
                    {photo.title.toUpperCase()}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomeGrid;
