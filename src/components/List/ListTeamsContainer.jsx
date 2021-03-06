import React from 'react';
import { connect } from 'react-redux';
import { getTeams } from '../../redux/app/selectors';
import List from './List';

const ListTeamsContainer = (props) => {
  const getLinkForTeam = (team) => {
    return `/teams/${team.id}`
  }
  return (
    <>
      <h2 className={'text-center py-4'}>Список команд</h2>
      <List listItems={props.listItems} getLink={getLinkForTeam} />
    </>
  )
}



const mapStateToProps = (state) => ({
  listItems: getTeams(state),
})


export default connect(mapStateToProps)(ListTeamsContainer)