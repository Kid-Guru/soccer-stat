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

      <Form>
        <Form.Row className="justify-content-end">
          <Col xs="auto">
            <Form.Control type="text" placeholder="Поиск" />
          </Col>
          <Col xs="auto">
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