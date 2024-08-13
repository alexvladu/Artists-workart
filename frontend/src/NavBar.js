import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';

const NavigationBar = ({loggedIn, setLoggedIn, refreshKey, setRefreshKey}) => {
    const [showModal, setShowModal] = useState(false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3001/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  "username" : loginUsername,
                                    "password" : loginPassword
             }),
        }).then(response => {
            if (!response.ok)
                throw new Error(`Failed to login: ${response.statusText} (Status Code: ${response.status})`);
            return response.json();
        }).then(data=>{
            setLoggedIn(true);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            handleCloseModal();
        }).catch(error =>{
            console.log(error);
        })
    }
    return (
    <>
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">ArtWork</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
            {loggedIn ? (
                <>
                    <Nav.Link as={Link} to={`/profile/${localStorage.getItem("username")}`}>My Profile</Nav.Link>
                    <Nav.Link onClick={() => {setLoggedIn(false); localStorage.removeItem("user"); localStorage.removeItem("token"); setRefreshKey(refreshKey+1);} }>Log out</Nav.Link>
                </>
            ) : (
                <Nav.Link onClick={handleOpenModal}>Login</Nav.Link>
            )}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>




    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" onChange={(e) => setLoginUsername(e.target.value)} placeholder="Username" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" required />
                </Form.Group>

                <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                    Login
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    </>
  );
}

export default NavigationBar;