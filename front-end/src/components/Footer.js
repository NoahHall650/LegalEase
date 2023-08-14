import React from 'react';
import { ReactComponent as LegaleaseLogo } from '../images/legaleaseLogo.svg';
import { ReactComponent as Facebook } from '../images/facebook.svg';
import { ReactComponent as LinkedIn } from '../images/linkedIn.svg';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <Row>
        <Col md={7}>
          <LegaleaseLogo className="logo" />
        </Col>
        <Col md={1}>
          <Link className="footer-links" to="/about">
            About
          </Link>
        </Col>
        <Col md={1}>
          <Link className="footer-links" to="/contact">
            Contact
          </Link>
        </Col>
        <Col md={1}>
          <Link className="footer-links" to="/faq">
            FAQ
          </Link>
        </Col>
      </Row>
      <Row className="align-bottom">
        <Col md={7}>
          <p className="footer-copyright">&copy; 2023 Bethel Tech, MannaSoft. All Rights Reserved</p>
        </Col>
        <Col md={1}>
          <Facebook className="social-media-icons" />
        </Col>
        <Col md={1}>
          <LinkedIn className="social-media-icons" />
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
