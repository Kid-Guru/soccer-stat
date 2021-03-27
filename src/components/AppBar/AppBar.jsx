import React from 'react';
import {NavLink} from "react-router-dom";
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { connect } from 'react-redux';

const AppBar = () => {
  return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link as={NavLink} to="/competitions">Турниры</Nav.Link>
          <Nav.Link as={NavLink} to="/teams">Команды</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar>
  )
}

export default AppBar