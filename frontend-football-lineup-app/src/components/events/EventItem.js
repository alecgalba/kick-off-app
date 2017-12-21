import React from 'react';
import { connect } from 'react-redux';
import { addEvent, removeEvent, fetchMyKickOff } from '../../actions/events';
import { Card, Button, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';

class EventItem extends React.Component {

  addCompetition = (e) => {
    e.preventDefault()
    let cp = this.props.competition
    let id = this.props.countryId
    const competition = JSON.stringify({competition: cp, country_id: id})
    this.props.addCompetition(competition)
  }

  removeCompetition = (e) => {
    e.preventDefault()
    const id = JSON.stringify({competition_id: this.props.competition.id})
    this.props.removeCompetition(id)
  }

  render() {
    const cp = this.props.competition

    return(
      <Transition animation='fly left' duration={1000} transitionOnMount={true}>
      <Card centered={true}>
        <Card.Content>
          <Card.Header as='h3'>{cp.league_name}</Card.Header>
          <Card.Description as='p'>{cp.hometeam_name} vs. {cp.awayteam_name}</Card.Description>
          <Card.Description as='p'>Day: {cp.match_date} Time: {cp.match_time}<Card.Description>
          <p></p>
        </Card.Content>
        <Card.Content extra>
          <div>
            {this.props.added.length ? <Button basic color='yellow' onClick={this.removeCompetition} content='Remove' icon='remove from calendar'/> : <Button basic color='olive' onClick={this.addCompetition} content='My KickOff' icon='add to calendar' /> }
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCompetition: (competition) => {
      dispatch(addCompetition(competition))
    },
    removeCompetition: (id) => {
      dispatch(removeCompetition(id))
    },
    fetchKickOff: (id) => {
      dispatch(fetchKickOff(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myCompetitions: state.competition.myCompetitions,
    isFetching: state.competition.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionItem)
