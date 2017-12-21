import React from 'react';
import { connect } from 'react-redux';
import { removeCountry, fetchCountries } from '../../actions/countries';
import { fetchKickOff } from '../../actions/competitions';
import { fetchMyKickOff } from '../../actions/events';
import { Grid Button, Icon, Image, Loader, Statistic, Rating, Transition } from 'semantic-ui-react';
import moment from 'moment';

class ShowPage extends React.Component {

  componentDidMount(){
    this.props.myCountries.length > 0 ? null : this.props.fetchCountries()
    this.props.myCompetitions.length > 0 ? null : this.props.fetchKickOff()
    this.props.myEvents.length > 0 ? null : this.props.fetchMyKickOff()
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.removeCountry({country_id: this.props.match.params.id})
    this.props.history.push('/countries')
  }

  render() {
    const id = this.props.match.params.id
    const country = (this.props.myCountries.filter( country => {return country.id == id}))[0]
    const competition = (this.props.myCompetitions.filter( competition => {return competition.league_name}))
    const event = (this.props.myEvents.filter(event => {return event.hometeam_name}))

    if (country === undefined) {
      return(<Loader active inline='centered' size='large'/>
    )} else {
      return(<Transition animation='fade' duration={800} transitionOnMount={true}><Grid celled id={country.id} verticalAlign='middle'>
      <Grid.Column>
        <Grid.Row>
          <h1>{country.country_name}</h1>
          <br />
        </Grid.Row>
        <Grid.Row>
          <h3>{competition.league_name}<h3>
        </Grid.Row>
        <Grid.Row>
          <p>{event.hometeam_name}<p>
        </Grid.Row>
        <Grid.Row>
          <br/>
          <Buttom basic color='yellow' icon='remove' content='Remove' onClick={this.handleClick}/>
        </Grid.Rowm>
      </Grid.Column>
      </Grid></Transition>)}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeCountry: (id) => {
      dispatch(removeCountry(id))
    },
    fetchCountries: () => {
      dispatch(fetchCountries())
    }
  }
}

function mapStateToProps(state) {
  return {
    myCountries: state.country.myCountries,
    myCompetitions: state.episode.myCompetitions,
    myEvents: state.event.myEvents,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage)
