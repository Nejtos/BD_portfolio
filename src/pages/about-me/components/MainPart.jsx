import "./MainPart.css";
import Footer from "../../../components/Footer";
import photo1 from "../../../assets/aboutMePhoto.webp";
import igIcon from "../../../assets/icons/igIcon.webp";
import fbIcon from "../../../assets/icons/fbIcon.webp";
import tiktokIcon from "../../../assets/icons/tiktok.webp";
import vimeoIcon from "../../../assets/icons/vimeoIcon2.webp";

const MainPart = () => {
  return (
    <>
      <div className="about-me-page-container">
        <div className="container">
          <div className="about-me-box">
            <div className="about-me-grid">
            <div className="left-section">
              <div className="image-wrapper">
                <img
                  id="main-part-img"
                  src={photo1}
                  loading="lazy"
                  alt="Bartłomiej Dąbrowski image"
                />
                </div>
              </div>
              <div className="right-section">
                <div className="section-title">Bartłomiej Dąbrowski</div>
                <div className="left-section-mobile">
                  <img
                    src={photo1}
                    alt="Bartłomiej Dąbrowski image"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundSize: "contain",
                    }}
                  />
                </div>
                <div className="text-section-connector">
                  <div className="text-title">
                    Operator kamery i autor zdjęć filmowych
                  </div>
                  <div className="text-main-part">
                    Z wykształcenia Operator Filmowy, uczyłem się w Warszawskiej
                    Szkole Filmowej, mam za sobą udział w licznych szkoleniach i
                    warsztatach filmowych. Posiadam doświadczenie pracy na
                    planach różnego rodzaju produkcji, od filmów reklamowych,
                    przez teledyski, eventy, dokumenty, po filmy
                    krótkometrażowe. Poza planami filmowymi często
                    współpracuje z różnymi firmami, domami produkcyjnymi i
                    artystami. Lubie kreatywne podejście do twórczości i
                    niebanalne rozwiązania, które przerodzą się w nietuzinkowy
                    efekt.
                    <br></br>
                    <br></br>
                    Pracuje na planach również jako: 1AC, operator
                    gimbali, licencjonowany operator dronów.
                  </div>
                </div>
                <div className="icons-social-links">
                  <img
                    src={igIcon}
                    alt="Instagram icon"
                    onClick={() => {
                      window.open(
                        "https://www.instagram.com/bdabrowski_dop/",
                        "_blank"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={vimeoIcon}
                    alt="Vimeo icon"
                    onClick={() => {
                      window.open(
                        "https://vimeo.com/bartekdabrowski",
                        "_blank"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={fbIcon}
                    alt="Facebook icon"
                    onClick={() => {
                      window.open(
                        "https://www.facebook.com/bartek.dabrowski.106/",
                        "_blank"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    src={tiktokIcon}
                    alt="Tiktok icon"
                    onClick={() => {
                      window.open(
                        "https://www.tiktok.com/@bartekdabrowskii",
                        "_blank"
                      );
                    }}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainPart;
