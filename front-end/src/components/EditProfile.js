import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/global.css';

const EditProfile = () => {
  const [verify, setVerify] = useState(null);
  let { editUser, getUser, verifyUser } = useContext(UserContext);
  let { userId } = useParams();
  let navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    async function fetch() {
      await getUser(userId).then((userId) => setUser(userId));
      setVerify(await verifyUser());
    }
    fetch();
  }, [getUser, userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editUser(user.userId, user.username, user.email, user.phoneNumber)
      .then(() => {
        navigate('/displayprofile');
      })
      .catch((error) => {
        console.log(error);
        window.alert('Failed Edit: error updating user');
      });
  };

  if (verify) {
    return (
      <Container className="page-container">
        <Row style={{ border: 'solid', padding: '40px', borderRadius: '20px' }}>
          <Col md={6}>
            <h1 className="display-5">Edit Profile</h1>
          </Col>

          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="custom-form" controlId="username">
                <Form.Label className="custom-label">Username</Form.Label>
                <Form.Control type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
              </Form.Group>

              <Form.Group className="custom-form" controlId="email">
                <Form.Label className="custom-label">Email</Form.Label>
                <Form.Control type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
              </Form.Group>

              <Form.Group className="custom-form" controlId="phoneNumber">
                <Form.Label className="custom-label">Phone Number</Form.Label>
                <Form.Control type="text" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="888-888-8888" />
              </Form.Group>

              <Button type="submit">Save Changes</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        <h2>403 NOT SIGNED IN</h2>
      </Container>
    );
  }
};

export default EditProfile;
