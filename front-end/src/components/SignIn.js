import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const SignIn = () => {
  const [verify, setVerify] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let { signInUser, verifyUser } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      setVerify(await verifyUser());
    }
    const token = localStorage.getItem('myUserToken');
    if (token) {
      fetch();
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    signInUser(username, password)
      .then(() => {
        navigate(`/displayprofile`);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert('Failed login');
      });
  }

  if (verify) {
    return <h2>You are already signed in</h2>;
  } else {
    return (
      <Container className="page-container">
        <Row>
          <Col md={6}>
            {' '}
            <h1 className="display-5">Welcome Back</h1>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="custom-form" controlId="username">
                <Form.Label className="custom-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="custom-form" controlId="password">
                <Form.Label className="custom-label">Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button type="submit" size="lg">
                Sign In
              </Button>
            </Form>
            <p style={{ paddingTop: '1rem' }}>
              <span>No account?</span>
            </p>
            <Button variant="secondary" href="/signup">
              Create Account
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default SignIn;
