import React from 'react';
import { Link } from 'react-scroll';
import {FooterStyles} from './FooterStyles';
import Logo from '../../images/logo.png';
import ParagraphText from './ParagraphText';



function Footer() {
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer__wrapper">
          <Link to="home" smooth>
            <Logo className="footer__logo" />
          </Link>
          <ParagraphText className="footer__desc">
            “Artistic” is a studio of some passionate photographer. Our Goal is
            to capture your experience.
          </ParagraphText>
          <div className="footer__links">
            <ul>
              <li>
                <Link to="home" smooth>
                  Home
                </Link>
              </li>
              <li>
                <Link to="services" smooth>
                  Services
                </Link>
              </li>
              <li>
                <Link to="about" smooth>
                  About
                </Link>
              </li>
              <li>
                <Link to="contact" smooth>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <ParagraphText className="footer__copyright">
            © Artistic Creative {new Date().getFullYear()}. All rights reserved
          </ParagraphText>
        </div>
      </div>
    </FooterStyles>
  );
}

export default Footer;