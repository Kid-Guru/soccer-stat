import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppBar = () => {
  return (
    <Navbar bg="success" variant="light" className="bg-success">
      <Container>
        <Navbar.Brand as={'h1'} className="mr-auto">SoccerStat App</Navbar.Brand>
        <Nav >
          <Nav.Link as={NavLink} to="/competitions">Турниры</Nav.Link>
          <Nav.Link as={NavLink} to="/teams">Команды</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AppBar