import "./Photos.css";
import { useState, useEffect } from "react";
import { getPhotos } from "../../../components/Data";
import Footer from "../../../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { InstagramEmbed } from "react-social-media-embed";

const Photos = () => {
  const { title } = useParams();
  const location = useLocation();
  const type = location.state?.type;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

  const data = getPhotos();
  const session = data.find((photo) => slugify(photo.title) === title);

  if (!session) return <p>Brak danych</p>;

  const content =
    session.content.length === 2 && Array.isArray(session.content[0])
      ? [...session.content[0], ...session.content[1]]
      : session.content;

  const [selectedSession] = useState(session);
  const [flattenedContent] = useState(content);

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

  const renderReels = (content) => {
    return (
      <div className="orlovski-reels-container">
        {content.map((item) => (
          <div key={item.id} className="reels-row">
            <div className="reels-row-bg">
              <div className="reels-video">
                <InstagramEmbed url={item.url} width={"100%"} caption={false} />
              </div>
              <div className="reels-description">{item.description} </div>
            </div>
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
      {type === "photos" ? (
        <div className="photography-page-container">
          <div className="container">
            <div className="photography-main-box">
              {selectedSession.title === "reel"
                ? renderReels(selectedSession.reels)
                : null}
              {selectedSession.title === "orlovski"
                ? renderReels(selectedSession.content)
                : renderPhotos(
                    selectedSession.content,
                    selectedSession.gridAreas
                  )}
            </div>
            {selectedSession.casts && (
              <div className="casts-box">{selectedSession.casts}</div>
            )}
          </div>
          <Footer />
        </div>
      ) : (
        <div className="photography-page-container">
          <div className="container">
            {selectedSession.reels != "" ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <InstagramEmbed
                  url={selectedSession.reels}
                  width={"30vw"}
                  height="200px"
                />
              </div>
            ) : null}
            {selectedSession.trailer != "" ? (
              <div className="trailer-main-box">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={selectedSession.trailer}
                  playing={false}
                  volume={0.4}
                  controls={true}
                />
              </div>
            ) : null}
            {selectedSession.content.length === 2 ? (
              <>
                {selectedSession.desc && (
                  <div className="description-box">{selectedSession.desc}</div>
                )}
                <div className="photography-main-box">
                  {renderPhotos(
                    selectedSession.content[0],
                    selectedSession.gridAreas
                  )}
                </div>
                <div className="photography-main-box">
                  {renderPhotos(
                    selectedSession.content[1],
                    selectedSession.gridAreas
                  )}
                </div>
              </>
            ) : (
              <>
                {selectedSession.desc && (
                  <div className="description-box">{selectedSession.desc}</div>
                )}
                {selectedSession.content != "" ? (
                  <div className="photography-main-box">
                    {renderPhotos(
                      selectedSession.content,
                      selectedSession.gridAreas
                    )}
                  </div>
                ) : null}
              </>
            )}
            {selectedSession.casts && (
              <div className="casts-box">{selectedSession.casts}</div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Photos;
