import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as LegaleaseLogo } from '../images/legaleaseLogo.svg';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/Header.css';
import UserContext from '../contexts/UserContext';
import { Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  let navigate = useNavigate();
  const [verify, setVerify] = useState(null);
  let { userId } = useParams();

  const [user, setUser] = useState({
    firstName: '',
  });

  let { getUser, signOutUser, verifyUser } = useContext(UserContext);

  const handleSignOut = (event) => {
    event.preventDefault();
    signOutUser()
      .then(() => {
        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.alert('Failed Edit: error updating user');
      });
  };

  useEffect(() => {
    async function fetch() {
      await getUser(userId).then((userId) => setUser(userId));
      setVerify(await verifyUser());
    }

    const token = localStorage.getItem('myUserToken');
    if (token) {
      fetch();
    }
  }, [getUser, userId]);

  if (verify) {
    /* START render when user is SIGNED IN */
    return (
      <Navbar collapseOnSelect expand="sm" className="custom-navbar">
        <Navbar.Brand href="/">
          <LegaleaseLogo alt="" width="120" height="30" className="d-inline-block align-top" style={{ marginRight: '20px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <div className="d-flex align-items-center">
              <NavDropdown title={`Hello, ${user.firstName}`} id="collasible-nav-dropdown dropdown-menu-align-end" align="end">
                <NavDropdown.Item href="/displayprofile" className="custom-dropdown-item">
                  View Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/uploadfiles" className="custom-dropdown-item">
                  Upload Files
                </NavDropdown.Item>
                <NavDropdown.Item href="/viewallfiles" className="custom-dropdown-item">
                  View All Files
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut} className="custom-dropdown-item">
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
    /* END render when user is SIGNED IN */

    /* START no render when user is SIGNED OUT */
  } else {
    return (
      <Navbar collapseOnSelect expand="sm" className="custom-navbar">
        <Navbar.Brand href="/">
          <LegaleaseLogo alt="" width="120" height="30" className="d-inline-block align-top" style={{ marginRight: '20px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <div className="d-flex align-items-center">
              <Nav.Link href="/signin">Sign In</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  /* END no render when user is SIGNED OUT */
};

export default Header;
