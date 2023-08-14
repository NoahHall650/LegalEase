import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="page-container">
      <Row>
        <Col md={4}>
          <h1>Contact Us</h1>
        </Col>
        <Col md={8}>
          <p>Thank you for your interest! If you have any questions or need assistance, feel free to reach out to us using the contact details below.</p>
          <p>
            <strong>Phone</strong>
            <br />
            <a href="tel:+1 123-456-7890" className="contact-links">
              +1 123-456-7890
            </a>
          </p>
          <p>
            <strong>Email</strong>
            <br />
            <a href="mailto:contact@legalease.com" className="contact-links">
              contact@example.com
            </a>
          </p>

          <p>We're available during from Monday to Friday, 9:00 AM - 5:00 PM.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
