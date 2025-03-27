import "./ContactForm.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import { useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import {
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Slide, ToastContainer, toast } from "react-toastify";

const ContactForm = () => {
  const form = useRef();
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const onVerify = useCallback(
    (token) => {
      setToken(token);
    },
    [refreshReCaptcha]
  );

  const sendEmail = async (e) => {
    e.preventDefault();
    if (token) {
      emailjs
        .sendForm(
          import.meta.env.VITE_YOUR_SERVICE_ID,
          import.meta.env.VITE_YOUR_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_YOUR_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      toast.success("Wiadomość email została wysłana", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      setRefreshReCaptcha((r) => !r);
      e.target.reset();
    } else {
      toast.warn("Captcha jest wymagana!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="contact-page-container">
        <div className="container">
          <div className="contact-form-container">
            <div className="contact-main-container">
              <div className="contact-form-box">
                <PageTitle titleText="Kontakt" id="Kontakt" />
                <div className="contact-form-desc">
                  Skontaktuj się z nami, aby wspólnie tworzyć kreatywne
                  projekty!
                </div>
                <div className="contact-form">
                  <form className="form" ref={form} onSubmit={sendEmail}>
                    <label htmlFor="form-input-name">Imie *</label>
                    <div className="form-inputs">
                      <input
                        className="form-input"
                        id="form-input-name"
                        type="text"
                        name="name"
                        placeholder="Enter your name ..."
                        required
                        style={{ backgroundColor: "#C4C4C4" }}
                        autoComplete="false"
                      />
                    </div>
                    <label htmlFor="form-input-email">Email *</label>
                    <div className="form-inputs">
                      <input
                        className="form-input"
                        id="form-input-email"
                        type="email"
                        name="email"
                        placeholder="Enter your email ..."
                        required
                        style={{ backgroundColor: "#C4C4C4" }}
                        autoComplete="false"
                      />
                    </div>
                    <label htmlFor="form-input-subject">Temat *</label>
                    <div className="form-inputs">
                      <input
                        className="form-input"
                        id="form-input-subject"
                        type="text"
                        name="subject"
                        placeholder="Enter a subject ..."
                        required
                        style={{ backgroundColor: "#C4C4C4" }}
                        autoComplete="false"
                      />
                    </div>
                    <label htmlFor="form-input-message">Wiadomość *</label>
                    <div className="form-inputs">
                      <textarea
                        className="form-input"
                        id="form-input-message"
                        type="text"
                        name="message"
                        wrap="soft"
                        maxLength="1000"
                        placeholder="Enter a message ..."
                        style={{
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingRight: "10px",
                          resize: "none",
                          backgroundColor: "#C4C4C4",
                        }}
                        required
                        autoComplete="false"
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        alignSelf: "flex-start",
                        marginLeft: "12px",
                        color: "rgb(256, 256, 256)",
                        fontFamily: "Open Sans, sans-serif",
                      }}
                    >
                      Wymagane pola *
                    </div>
                    <GoogleReCaptcha
                      onVerify={onVerify}
                      refreshReCaptcha={refreshReCaptcha}
                    />
                    <button className="form-input-submit-btn" type="submit">
                      Wyślij
                    </button>
                  </form>
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

export default ContactForm;
