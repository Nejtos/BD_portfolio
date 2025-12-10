import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import igIcon from "../assets/icons/igIcon2.webp";
import vimeoIcon from "../assets/icons/vimeoIcon.webp";
import tiktokIcon from "../assets/icons/tiktokIcon2.webp";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <div className={`mobile-nav ${mobileNav ? "open-flex" : "closed-flex"}`}>
        <div
          className="btn-close-mobile-nav"
          onClick={() => setMobileNav(!mobileNav)}
        />
        <div className="mobile-links">
          <div
            className="nav-link"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          >
            Projekty
          </div>
          <div
            className="nav-link"
            onClick={() => {
              navigate("/o-mnie");
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          >
            O mnie
          </div>
          <div
            className="nav-link"
            onClick={() => {
              navigate("/kontakt");
              window.scrollTo(0, 0);
              setMobileNav(!mobileNav);
            }}
          >
            Kontakt
          </div>
          <div
            className="nav-link"
            onClick={() => {
              window.open(
                "https://www.instagram.com/bartek_dabrowskii/",
                "_blank"
              );
            }}
          >
            Instagram
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="navbar-container">
          <div className="navbar-links">
            <div
              className="nav-link"
              onClick={() => {(navigate("/"), window.scrollTo(0, 0));
              }}
            >
              PROJEKTY
            </div>
            <div
              className="nav-link"
              onClick={() => {
                navigate("/kontakt");
                window.scrollTo(0, 0);
              }}
            >
              KONTAKT
            </div>
            <div
              className="nav-link"
              onClick={() => {
                navigate("/o-mnie");
                window.scrollTo(0, 0);
              }}
            >
              O MNIE
            </div>
          </div>
          <div
            className="hamburger-menu"
            onClick={() => setMobileNav(!mobileNav)}
          />
          <div
            className="main-logo"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            BARTŁOMIEJ DĄBROWSKI
          </div>
          <div className="nav-social-links">
            <div className="nav-social-links-icon">
              <img
                src={igIcon}
                alt="Instagram icon"
                onClick={() => {
                  window.open(
                    "https://www.instagram.com/bartek_dabrowskii/",
                    "_blank"
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="nav-social-links-icon">
              <img
                src={vimeoIcon}
                alt="Vimeo icon"
                onClick={() => {
                  window.open("https://vimeo.com/bartekdabrowski", "_blank");
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="nav-social-links-icon">
              <img
                src={tiktokIcon}
                alt="Tiktok icon"
                onClick={() => {
                  window.open(
                    "https://www.tiktok.com/@bartek_dabrowskii",
                    "_blank"
                  );
                }}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
