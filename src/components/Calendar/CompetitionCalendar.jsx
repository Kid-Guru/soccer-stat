import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { getTeamCalendar, cleanTeamCalendar } from '../../redux/app/actions'
import TeamTable from '../Tables/TeamTable';

const TeamCalendar = (props) => {
  let { id, dateFrom, dateTo } = useParams();

  useEffect(() => {
    props.getTeamCalendar(id)
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
      <TeamTable list={ props.list }/>
    </Container>

  )
}

const mapStateToProps = (state) => ({
  status: state.app.teamCalendar.status,
  list: state.app.teamCalendar.list,
  currentTeam: state.app.teamCalendar.currentTeam,
})

const mapDispatchToProps = ({
  getTeamCalendar,
  cleanTeamCalendar,
})


export default connect(mapStateToProps, mapDispatchToProps)(TeamCalendar);