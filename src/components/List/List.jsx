import React from 'react';
import { Col, Container, Row, Dropdown, Form, Button, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import TermFilterForm from '../Forms/TermFilterForm';

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

const getRedirectPath = (getLink, listItems) => {
  return (term) => {
    const item = listItems.find(i => i.title.toLowerCase().includes(term.toLowerCase()))
    if (!item) return null
    return getLink(item)
  }
}

const List = (props) => {
  return (
    <Container>
      <TermFilterForm getRedirectPath={getRedirectPath(props.getLink, props.listItems)} />
      <Row className="my-4">
        {renderCards(props.listItems, props.getLink)}
      </Row>
    </Container>
  )
}

export default List