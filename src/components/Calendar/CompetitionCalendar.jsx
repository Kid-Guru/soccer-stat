import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getCompetitionCalendar, cleanCompetitionCalendar } from '../../redux/app/actions'
import { getCompetitionCalendarStatus, getCompetitionCalendarList, currentCompetition } from '../../redux/app/selectors';
import { getLastMonthPeriod } from '../../helpers/helpers';
import CompetitionTable from '../Tables/CompetitionTable';
import DateFilterForm from '../Forms/DateFilterForm';
import * as to from '../../utils/routes';

const CompetitionCalendar = (props) => {
  let { id, dateFrom, dateTo } = useParams();

  let lastMonthPeriod = getLastMonthPeriod()
  dateFrom = dateFrom || lastMonthPeriod.dateFrom
  dateTo = dateTo || lastMonthPeriod.dateTo

  const getRedirectPath = (dateFrom, dateTo) => {
    return `${to.COMPETITIONS}/${id}${to.PERIOD}/${dateFrom}/${dateTo}`
  }

  useEffect(() => {
      props.getCompetitionCalendar(id, dateFrom, dateTo)
    return () => {
      props.cleanCompetitionCalendar()
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
                <Col xs={'auto'}>
                  <Card.Img src={props.currentCompetition.emblemUrl} style={{ width: 100 + 'px' }} />
                </Col>
                <Col>
                  <Card.Title>{props.currentCompetition.name}</Card.Title>
                  <Card.Subtitle>{props.currentCompetition.area.name}</Card.Subtitle>
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
          <CompetitionTable list={props.list} />
        </Col>
      </Row>
    </Container>

  )
}

const mapStateToProps = (state) => ({
  status: getCompetitionCalendarStatus(state),
  list: getCompetitionCalendarList(state),
  currentCompetition: currentCompetition(state),
})

const mapDispatchToProps = ({
  getCompetitionCalendar,
  cleanCompetitionCalendar,
})


export default connect(mapStateToProps, mapDispatchToProps)(CompetitionCalendar);