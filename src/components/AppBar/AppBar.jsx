import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';

const AppBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link as={NavLink} to="/competitions">Турниры</Nav.Link>
          <Nav.Link as={NavLink} to="/teams">Команды</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default AppBar