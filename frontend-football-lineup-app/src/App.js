import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchContainer from './components/search/SearchContainer';
import CountryContainer from './components/countries/CountryContainer';
import CompetitionContainer from './components/competitions/CompetitionContainer';
import EventContainer from './components/events/EventContainer';
import DashboardContainer from './components/dashboard/DashboardContainer';
import Login from './components/users/login';
import Signup from './components/users/signup';
import Nav from './components/Nav';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Container text/>
        <Route path='/' component={Nav}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/search' render={(props) => <SearchContainer {...props} /> } />
        <Route path='/countries' render={(props) => <CountryContainer {...props} /> } />
        <Route path='/competitions' render={(props) => <CompetitionContainer {...props} /> } />
        <Route path='/events' render={(props) => <EventContainer {...props} /> } />
        <Route exact path='/kickoff' component={CountryCalendar}/>
        <Route exact path='/dashboard' component={DashboardContainer}/>
      <Container/>
      </div>
    );
  }
}

export default App;
