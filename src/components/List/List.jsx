import React from 'react';
import { Col, Container, Row, Dropdown, Form, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const renderCards = (data, getLink) => {
  return data.map(item => {
    return (
      <Col sm={6} md={4} lg={3} className={'mb-3'}>
        <NavLink to={getLink(item)} className={'text-dark'}>
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Subtitle>{item.subtitle}</Card.Subtitle>
            </Card.Body>
          </Card>
        </NavLink>
      </Col>
    )
  })
}

const List = (props) => {
  return (
    <Container>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Выбрать
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>



      <Form inline>
        <Form.Row>
          <Col>
            <Form.Control type="text" placeholder="Поиск" />
          </Col>
          <Col sm={'auto'}>
            <Button variant="success" type="submit">Найти</Button>
          </Col>
        </Form.Row>
      </Form>


      <Row className="my-4">
        {renderCards(props.listItems, props.getLink)}
      </Row>
    </Container>
  )
}

export default List