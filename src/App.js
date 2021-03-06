import './App.css';
import { initializingApp } from './redux/app/actions';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import AppBar from './components/AppBar/AppBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import ListCompetitionsContainer from './components/List/ListCompetitionsContainer';
import ListTeamsContainer from './components/List/ListTeamsContainer';
import TeamCalendar from './components/Calendar/TeamCalendar';
import CompetitionCalendar from './components/Calendar/CompetitionCalendar';
import * as to from '../src/utils/routes.js';

function App(props) {
  useEffect(() => {
    props.initializingApp()
  }, [])
  if (!props.initialized) {
    return null
  }

  return (
    <div className="App min-vh-100 d-flex flex-column">
      <div class="flex-grow-1">
        <AppBar />
        <Switch>
          <Route path='/' exact render={() => <Redirect to={to.COMPETITIONS} />} />
          <Route path={to.COMPETITIONS} exact render={() => <ListCompetitionsContainer />} />
          <Route path={`${to.COMPETITIONS}/:id`} exact render={() => <CompetitionCalendar />} />
          <Route path={`${to.COMPETITIONS}/:id${to.PERIOD}/:dateFrom/:dateTo`} exact render={() => <CompetitionCalendar />} />
          <Route path={to.TEAMS} exact render={() => <ListTeamsContainer />} />
          <Route path={`${to.TEAMS}/:id`} exact render={() => <TeamCalendar />} />
          <Route path={`${to.TEAMS}/:id${to.PERIOD}/:dateFrom/:dateTo`} exact render={() => <TeamCalendar />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initializingApp: () => dispatch(initializingApp())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
