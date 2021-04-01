import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="bg-light">
      <div className="container navbar flex-column flex-md-row py-3">
        <Col className="col-md-auto order-1 order-md-0 text-md-left text-center mt-2 ">
        <small><a href="https://www.football-data.org/" target="_blank">Football data provided by the Football-Data.org API</a></small>
        </Col>
        <Col className="col-md-auto text-md-right text-center">
          <p className="m-0"><small>Разработал: Бирков Александр</small></p>
          <p className="m-0"><small>Email: <a href="mailto:birkov.alexandr@gmail.com" target="_blank">birkov.alexandr@gmail.com</a></small></p>
          <p className="m-0"><small>GitHub: <a href="https://github.com/Kid-Guru/soccer-stat" target="_blank">Kid-Guru/soccer-stat</a></small></p>
        </Col>
      </div>
    </div>

  )
}

export default Footer