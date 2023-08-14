import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Faq = () => {
  return (
    <Container className="page-container">
      <Row>
        <Col md={4}>
          <h1 className="display-5">Frequently Asked Questions</h1>
        </Col>
        <Col md={8}>
          <ol>
            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Lorem ipsum dolor sit amet?</li>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec augue in mauris gravida fringilla. Morbi fringilla fringilla metus, sed dapibus sapien malesuada non. Suspendisse cursus, ligula sed ullamcorper tincidunt, lectus erat gravida massa, a sollicitudin turpis tortor a risus.</p>
            <br />

            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Quisque eget justo ac velit pellentesque rutrum?</li>
            <p>Quisque eget justo ac velit pellentesque rutrum. Phasellus nec congue nibh, vitae efficitur ex. Vestibulum in sem ac ligula venenatis lacinia id non lacus. Curabitur gravida elit et nunc maximus, quis feugiat lacus ullamcorper.</p>
            <br />

            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Sed tempus semper ante, quis malesuada sem auctor a?</li>
            <p>Sed tempus semper ante, quis malesuada sem auctor a. Vivamus vel justo mauris. Cras non ultrices metus, vel ultrices lorem. Maecenas auctor ligula vel urna venenatis, non volutpat dui pulvinar. Phasellus interdum euismod elit, ac ullamcorper risus pellentesque id.</p>
            <br />

            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Aliquam sed mi vel risus consectetur dapibus?</li>
            <p>Aliquam sed mi vel risus consectetur dapibus. Sed vel est euismod, elementum tortor in, fermentum ex. Mauris eu libero sed sem venenatis interdum. Suspendisse id fermentum ipsum. Sed a malesuada elit.</p>
            <br />

            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Integer vel tellus id velit venenatis pretium ut ac dui?</li>
            <p>Integer vel tellus id velit venenatis pretium ut ac dui. Nulla facilisi. Nunc vehicula fringilla ipsum ut vestibulum. Morbi ultricies, ipsum eget pharetra ullamcorper, ipsum libero tristique ante, at malesuada neque nisi eu nunc.</p>
            <br />

            <li style={{ fontFamily: 'var(--heading-font', fontSize: '24px' }}>Ut porta ipsum in dolor aliquet, quis placerat turpis pulvinar?</li>
            <p>Ut porta ipsum in dolor aliquet, quis placerat turpis pulvinar. Mauris suscipit, neque sed lobortis convallis, tellus neque vestibulum erat, vitae placerat elit velit nec felis. Cras non rhoncus nulla.</p>
          </ol>
        </Col>
      </Row>
    </Container>
  );
};

export default Faq;
