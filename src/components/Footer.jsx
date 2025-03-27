import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-content">
        Skontaktuj się mailowo, lub na Instagramie: @bartek_dabrowskii
        <br />
        &copy; {new Date().getFullYear()} Bartłomiej Dąbrowski. Wszystkie prawa zastrzeżone.
      </div>
    </>
  );
};

export default Footer;
