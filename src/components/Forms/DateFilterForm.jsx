import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useHistory } from 'react-router';

const DateFilterForm = ({ dateFrom: dateFromInitial = '', dateTo: dateToInitial = '', getRedirectPath }) => {
  let history = useHistory();
  const formik = useFormik({
    initialValues: {
      dateFrom: dateFromInitial,
      dateTo: dateToInitial,
    },
    onSubmit: (values) => {
      history.push(getRedirectPath(values.dateFrom, values.dateTo))
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group as={Row} controlId="dateFrom" className={'align-items-center'}>
        <Form.Label column="sm" className={"align-middle"}>Конец периода</Form.Label>
        <Col sm="8">
          <Form.Control type="date" placeholder="Enter email" name={"dateFrom"} onChange={formik.handleChange} value={formik.values.dateFrom} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" size="sm"/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="dateTo" className={'align-items-center'}>
        <Form.Label column="sm">Начало периода</Form.Label>
        <Col sm="8">
          <Form.Control type="date" placeholder="Enter email" name={"dateTo"} onChange={formik.handleChange} value={formik.values.dateTo} required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" size="sm"/>
        </Col>
      </Form.Group>

      <Button variant="success" type="submit">Показать</Button>
    </Form>
  )
}

export default DateFilterForm