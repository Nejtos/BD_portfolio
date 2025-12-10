import "../photography/components/Photos.css";
import { useState, useEffect } from "react";
import { getHiddenPhotos } from "../../components/HiddenData";
import Footer from "../../components/Footer";

const SecretPage = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const data = getHiddenPhotos();
  const selectedSession = data.find((photo) => photo.title === "hidden");
  const flattenedContent = selectedSession.content;

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [openModal]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) =>
      prev === 0 ? flattenedContent.length - 1 : prev - 1
    );
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setPhotoIndex((prev) =>
      prev === flattenedContent.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenModal = (index) => {
    setPhotoIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!openModal) return;

      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") handleCloseModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, flattenedContent]);

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => document.removeEventListener("contextmenu", disableRightClick);
  }, []);

  if (!selectedSession) return <p>Ładowanie...</p>;

  const renderPhotos = (content, gridAreas) => {
    return (
      <div className="photo-grid">
        {content.map((photo, index) => (
          <div
            key={index}
            className="photo-item"
            style={{
              gridArea: gridAreas[index],
            }}
          >
            <img
              src={photo.img}
              alt={photo.alt}
              onClick={() => handleOpenModal(index)}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {openModal && (
        <div className="sliderWrap">
          <button className="close-button" onClick={handleCloseModal}>
            ✖
          </button>
          <div className="fullScreenImage">
            <button className="nav-button left" onClick={handlePrev}>
              ❮
            </button>
            <img src={flattenedContent[photoIndex]?.img} alt="" />
            <button className="nav-button right" onClick={handleNext}>
              ❯
            </button>
          </div>
        </div>
      )}
      <div className="photography-page-container">
        <div className="container">
          <div className="photography-main-box">
            {renderPhotos(selectedSession.content, selectedSession.gridAreas)}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default SecretPage;
