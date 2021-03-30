import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getTeamCalendar, cleanTeamCalendar } from '../../redux/app/actions'
import { getTeamCalendarStatus, getTeamCalendarList, currentTeam } from '../../redux/app/selectors';
import TeamTable from '../Tables/TeamTable';
import DateFilterForm from '../Forms/DateFilterForm';
import * as to from '../../utils/routes';

const TeamCalendar = (props) => {
  let { id, dateFrom, dateTo } = useParams();

  const getRedirectPath = (dateFrom, dateTo) => {
    return `${to.TEAMS}/${id}${to.PERIOD}/${dateFrom}/${dateTo}`
  }

  useEffect(() => {
    props.getTeamCalendar(id, dateFrom, dateTo)
    return () => {
      props.cleanTeamCalendar()
    }
  }, [id, dateFrom, dateTo])

  if (props.status === 'fetching') {
    return null
  }
  return (
    <Container >
      <h2 className={'text-center py-4'}>Календарь игр</h2>
      <Row>
        <Col lg={'6'} className={'mt-3'}>
          <Card className={'h-100'}>
            <Card.Body>
              <Row>
                <Col md={'auto'}>
                  <Card.Img src={props.currentTeam.crestUrl} style={{ width: 100 + 'px' }} />
                </Col>
                <Col>
                  <Card.Title>{props.currentTeam.name}</Card.Title>
                  <Card.Subtitle>{props.currentTeam.area.name}</Card.Subtitle>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={'6'} className={'mt-3'}>
          <Card className="text-center className={'h-100'}">
            <Card.Body>
              <Card.Title>Введите период</Card.Title>
              <DateFilterForm dateFrom={dateFrom} dateTo={dateTo} getRedirectPath={getRedirectPath} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className={'mt-3'}>
        <Col>
          <TeamTable list={props.list} />
        </Col>
      </Row>
    </Container>

  )
}

const mapStateToProps = (state) => ({
  status: getTeamCalendarStatus(state),
  list: getTeamCalendarList(state),
  currentTeam: currentTeam(state),
})

const mapDispatchToProps = ({
  getTeamCalendar,
  cleanTeamCalendar,
})


export default connect(mapStateToProps, mapDispatchToProps)(TeamCalendar);