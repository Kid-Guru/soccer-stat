import React from 'react';
import { connect } from 'react-redux';
import { getCompetitions } from '../../redux/app/selectors';
import List from './List';

const ListCompetitionsContainer = (props) => {
  const getLinkForCompetition = (comp) => {
    return `/competitions/${comp.id}`
  }
  return (
    <List listItems={ props.listItems } getLink={getLinkForCompetition} />
  )
}

const mapStateToProps = (state) => ({
  listItems: getCompetitions(state),
})

export default connect(mapStateToProps)(ListCompetitionsContainer)