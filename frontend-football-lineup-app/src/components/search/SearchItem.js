import React from 'react';
import { connect } from 'react-redux';
import { addCountry } from '../../actions/countries';
import { clearResults } from '../../actions/search';
import { formatTime } from '../../services/formatting';
import { Card, Button, Image, Transition } from 'semantic-ui-react';

class SearchItem extends React.Component {

  handleClick = (e) => {
    e.preventDefault()
    this.props.addCountry(this.props.country.country)
    this.props.clearResults()
    this.props.history.push('/countries')
  }

  render() {
    const s = this.props.country.country

    return(
      <Transition animation='vertical flip' duration={800} transitionOnMount={true}>
      <Card key = {s.id} centered={true}>
        <Card.Content>
          <h2>{s.country_name} - {s.league_name}</h2>
          <h3><strong>{s.match_status}</strong></h3>
          <h5>{s.match_hometeam_name} vs. {s.match_awayteam_name}</h5>
          { s.status === "FT" ? <h5>Home Team Score: {s.match_hometeam_score} Away Team Score: {s.match_awayteam_score}</h5> : null }
        </Card.Content>
        <Card.Content extra>
          <Button basic color='teal' onClick={this.handleClick} content='Add to My KickOff' attached='bottom'/>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCountry: (country) => {
      dispatch(addCountry(country))
    },
    clearResults: () => {
      dispatch(clearResults())
    }
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)
