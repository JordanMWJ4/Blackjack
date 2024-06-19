import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../blackjack.css'



function bjNavbar() {
  return (
    <Navbar className='nav' bg="orange" data-bs-theme="dark">
    <Container>
      <Nav className="nav-item">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="http://127.0.0.1:5500/cor-web-ft-02-2024/projects/projectThree/frontend/rules.html">Rules</Nav.Link>
        <Nav.Link href="https://buy.stripe.com/test_4gw14J0MgeVV85W5km">Donate</Nav.Link>
        <Nav.Link href="http://127.0.0.1:5500/cor-web-ft-02-2024/projects/projectThree/frontend/loginpage.html">Login</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}

export default bjNavbar