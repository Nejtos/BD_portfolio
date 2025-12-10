import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutMe from "./pages/about-me/AboutMe";
import Contact from "./pages/contact/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Photography from "./pages/photography/Photography";
import HomePage from "./pages/home/HomePage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect } from "react";
import { Suspense, lazy } from "react";

const SecretPage = lazy(() => import("./pages/secret/SecretPage"));

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
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projekty/:title" element={<Photography />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/o-mnie" element={<AboutMe />} />
            <Route
              path="/hidden"
              element={
                <Suspense fallback={<div>Ładowanie strony...</div>}>
                  <SecretPage />
                </Suspense>
              }
            />
            <Route path="/*" element={<HomePage />} />
          </Routes>
        <ScrollToTop />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
