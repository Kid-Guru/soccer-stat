import React from 'react';
import { Form, Button, Row, Col, Tooltip } from 'react-bootstrap';
import { useFormik, ErrorMessage } from 'formik';
import { useHistory } from 'react-router';

const TermFilterForm = ({ getRedirectPath }) => {
  let history = useHistory();
  const validate = values => {
    const errors = {};
    if (!getRedirectPath(values.term)) {
      errors.term = 'Ничего не найдено';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      term: '',
    },
    validate,
    onSubmit: (values) => {
      history.push(getRedirectPath(values.term))
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row className="justify-content-end">
        <Col sm={6} md={4} lg={3} className="mb-2 mb-sm-0">
          <Form.Control type="text" placeholder="Поиск" name="term" onChange={formik.handleChange} value={formik.values.term}
          isInvalid={!!formik.errors.term} autocomplete="off"/>
          <Form.Control.Feedback tooltip type="invalid">{formik.errors.term}</Form.Control.Feedback>
        </Col>
        <Col xs="auto">
          <Button variant="success" type="submit" className="ml-auto">Найти</Button>
        </Col>
      </Form.Row>
    </Form>
  )
}

export default TermFilterForm