// import "./HomeGrid.css";
// import { useState, useEffect, lazy } from "react";
// import { getPhotos } from "../../../components/Data";
// import Footer from "../../../components/Footer";
// import { useNavigate } from "react-router-dom";

// const HomeGrid = () => {
//   const navigate = useNavigate();
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [photos] = useState(() => getPhotos());
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const [hoveredId, setHoveredId] = useState(null);

//   return (
//     <>
//       <div className="portfolio-container-box">
//         <div className="home-main-grid">
//           {photos.map((photo, index) => {
//             const defaultCover = photo.covers[0]?.img || "";
//             const hoverCover = photo.covers[1]?.img || defaultCover;
//             return (
//               <div
//                 key={photo.id}
//                 className="home-main-grid-item"
//                 style={{ cursor: "pointer", position: "relative" }}
//                 onMouseEnter={() => setHoveredId(photo.id)}
//                 onMouseLeave={() => setHoveredId(null)}
//                 onClick={() => {
//                   const slug = photo.title.toLowerCase().replace(/\s+/g, "-");
//                   navigate(`projekty/${slug}`, { state: { type: photo.type } });
//                   window.scrollTo(0, 0);
//                 }}
//               >
//                 <img
//                   src={defaultCover}
//                   alt={photo.title}
//                   sizes="(max-width: 480px) 92vw,
//                     (max-width: 768px) 46vw,
//                     (max-width: 1440px) 30.6vw,
//                     30.6vw
//                   "
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: photo.size,
//                     objectPosition: photo.backgroundPosition,
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     opacity: hoveredId === photo.id ? 0 : 1,
//                     transition: "opacity 0.4s ease-in-out",
//                   }}
//                   loading={
//                     isMobile
//                       ? index < 2
//                         ? "eager"
//                         : "lazy"
//                       : index < 9
//                       ? "eager"
//                       : "lazy"
//                   }
//                   fetchpriority={
//                     isMobile
//                       ? index < 2
//                         ? "high"
//                         : undefined
//                       : index < 9
//                       ? "high"
//                       : undefined
//                   }
//                 />
//                 <img
//                   src={hoverCover}
//                   alt={photo.title}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: photo.size,
//                     objectPosition: photo.backgroundPosition,
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     opacity: hoveredId === photo.id ? 1 : 0,
//                     transition: "opacity 0.4s ease-in-out",
//                   }}
//                   loading="lazy"
//                 />

//                 {(hoveredId === photo.id || isMobile) &&
//                 photo.visible === "1" ? (
//                   <div className="home-main-grid-item-title">
//                     {photo.title.toUpperCase()}
//                   </div>
//                 ) : null}
//               </div>
//             );
//           })}
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default HomeGrid;

import "./HomeGrid.css";
import { useState, useEffect, useMemo } from "react";
import { getPhotos } from "../../../components/Data";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import React from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
};

const HomeGridItem = React.memo(({ photo, index, isMobile, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const defaultCover = photo.covers[0]?.img || "";
  const hoverCover = photo.covers[1]?.img || defaultCover;

  const loading = isMobile
    ? index < 2
      ? "eager"
      : "lazy"
    : index < 9
    ? "eager"
    : "lazy";

  const fetchpriority = isMobile
    ? index < 2
      ? "high"
      : undefined
    : index < 9
    ? "high"
    : undefined;

  return (
    <div
      className="home-main-grid-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        cursor: "pointer",
        position: "relative",
        willChange: "opacity",
      }}
    >
      <img
        src={defaultCover}
        alt={photo.title}
        sizes="(max-width: 480px) 92vw,
               (max-width: 768px) 46vw,
               (max-width: 1440px) 30.6vw,
               30.6vw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: photo.size,
          objectPosition: photo.backgroundPosition,
          position: "absolute",
          inset: 0,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.4s ease-in-out",
        }}
        loading={loading}
        fetchpriority={fetchpriority}
      />

      <img
        src={hoverCover}
        alt={photo.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: photo.size,
          objectPosition: photo.backgroundPosition,
          position: "absolute",
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
        loading="lazy"
      />

      {(hovered || isMobile) && photo.visible === "1" && (
        <div className="home-main-grid-item-title">
          {photo.title.toUpperCase()}
        </div>
      )}
    </div>
  );
});

const HomeGrid = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const photos = useMemo(() => getPhotos(), []);

  const handleNavigation = (title, type) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`projekty/${slug}`, { state: { type } });
    window.scrollTo(0, 0);
  };

  return (
    <div className="portfolio-container-box">
      <div className="home-main-grid">
        {photos.map((photo, index) => (
          <HomeGridItem
            key={photo.id}
            photo={photo}
            index={index}
            isMobile={isMobile}
            onClick={() => handleNavigation(photo.title, photo.type)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomeGrid;
