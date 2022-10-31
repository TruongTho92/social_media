import React from "react";
import "./footerStyles.scss";

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__list d-flex justify-content-center align-items-center">
        <li className="footer__item">Mete</li>
        <li className="footer__item">About</li>
        <li className="footer__item">Blog</li>
        <li className="footer__item">Jobs</li>
        <li className="footer__item">Help</li>
        <li className="footer__item">Api</li>
        <li className="footer__item">Term</li>
        <li className="footer__item">Privacy</li>
        <li className="footer__item">Instagram Life</li>
        <li className="footer__item">Hashtags</li>
        <li className="footer__item">Location</li>
        <li className="footer__item">Contact</li>
      </ul>
      <div className="footer__item d-flex justify-content-center align-items-center">
        © 2022 Instagram from Meta
      </div>
    </div>
  );
};

export default Footer;
