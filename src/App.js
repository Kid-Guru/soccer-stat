import './App.css';
import { initializingApp } from './redux/app/actions';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AppBar from './components/AppBar/AppBar.jsx'
import ListCompetitionsContainer from './components/List/ListCompetitionsContainer';
import ListTeamsContainer from './components/List/ListTeamsContainer';
import TeamCalendar from './components/Calendar/TeamCalendar';
import * as to from '../src/utils/routes.js';
import { Redirect, Route, Switch } from 'react-router';

function App(props) {
  useEffect(() => {
    props.initializingApp()
  }, [])
  // console.log(props.competitions)
  // console.log(props.teams)
  // console.log(to.COMPETITIONS)
  return (
    <div className="App">
      <AppBar />
      <Switch>
        <Route path='/' exact render={() => <Redirect to={to.COMPETITIONS} />} />
        <Route path={to.COMPETITIONS } exact render={() => <ListCompetitionsContainer />} />
        <Route path={to.TEAMS } exact render={() => <ListTeamsContainer />} />
        <Route path={`${to.TEAMS}/:id`} exact render={() => <TeamCalendar />} />

      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    competitions: state.app.competitions,
    teams: state.app.teams,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializingApp: () => dispatch(initializingApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

{/* <Route exact path="/" render={() => <Redirect to='/list-of-leagues' />} />
<Route path="/list-of-leagues" render={() => <div>Список лиг</div>} />
<Route path="/command-list" render={() => <div>Список команд</div>} />
<Route path="/league-calendar" render={() => <div>Календарь лиги</div>} />
<Route path="/team-calendar" render={() => <div>Календарь команды</div>} /> */}

// [{ru:'Список лиг', path: 'list-of-leagues'}, {ru:'Список команд', path: 'command-list'}, {ru:'Календарь лиги', path:'league-calendar'}, {ru:'Календарь команды', path:'team-calendar'}]