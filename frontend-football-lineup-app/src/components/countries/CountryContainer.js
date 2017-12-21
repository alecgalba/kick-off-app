import react from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { fetchCountries } from '../../actions/countries';
import { fetchKickOff } from '../../actions/competitions';
import { fetchMyKickOff } from '../../actions/events';
import CountryList from './CountryList';
import CountryPage from './CountryPage';
import CompetitionContainer from '../competitions/CompetitionContainer';

class CountryContainer extends React.Component {

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.myCountries.length > 0 ? null : this.props.fetchCountries(userId)
    this.props.myCompetitions.length > 0 ? null : this.props.fetchKickOff(userId)
    this.props.myEvents.length > 0 ? null : this.props.fetchMyKickOff(userId)
  }

  render() {
    return(
      <div>
        <Route exact path='/countries' component={CountryList} />
        </br />
        <Route exact path='/countries/:id/:name' component={CountryPage} />
        <Route exact path='/countries/:id/:name' component={CompetitionContainer} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCountries: (id) => {
      dispatch(fetchCountries(id))
    },
    fetchKickOff: (id) => {
      dispatch(fetchKickOff(id))
    },
    fetchMyKickOff: (id) => {
      dispatch(fetchMyKickOff(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myCountries: state.country.myCountries,
    myCompetitions: state.competition.myCompetitions,
    myEvents: state.event.myEvents
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryContainer)
