import React from 'react';
import { connect } from 'react-redux';
import { getCompetitions } from '../../redux/app/selectors';
import List from './List';

const ListCompetitionsContainer = (props) => {
  const getLinkForTeam = (team) => {
    return ``
  }
  return (
    <List listItems={ props.listItems } getLinkForTeam={getLinkForTeam} />
  )
}

const mapStateToProps = (state) => ({
  listItems: getCompetitions(state),
})

export default connect(mapStateToProps)(ListCompetitionsContainer)