import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutMe from "./pages/about-me/AboutMe";
import Contact from "./pages/contact/Contact"
import ScrollToTop from "./components/ScrollToTop";
import Photography from "./pages/photography/Photography";
import HomePage from "./pages/home/HomePage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect } from "react";
import CookieConsentBanner from "./components/CookieConsentBanner";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigation = () => {
      navigate(-1);
    };

    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, [navigate]);
  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_CAPTCHA_PUBLIC_KEY}
      >
        <CookieConsentBanner />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:title" element={<Photography />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/o-mnie" element={<AboutMe />} />
        </Routes>
        <ScrollToTop />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
