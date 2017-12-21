import React from 'react';
import { connect } from 'react-redux';
import { addCompetition, removeCompetition, fetchKickOff } from '../../actions/competitions';
import { Card, Button, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';

class CompetitionItem extends React.Component {

  addEvent = (e) => {
    e.preventDefault()
    let ev = this.props.event
    let id = this.props.competitionId
    const event = JSON.stringify({event: ev, competition_id: id})
    this.props.addEvent(event)
  }

  removeEvent = (e) => {
    e.preventDefault()
    const id = JSON.stringify({event_id: this.props.event.id})
    this.props.removeEvent(id)
  }

  render() {
    const ev = this.props.event

    return(
      <Transition animation='fly left' duration={1000} transitionOnMount={true}>
      <Card centered={true}>
        <Card.Content>
          <Card.Header as='h3'>{ev.league_name}</Card.Header>
          <Card.Description as='p'>{ev.hometeam_name} vs. {ev.awayteam_name}</Card.Description>
          <Card.Description as='p'>Day: {ev.match_date} Time: {ev.match_time}<Card.Description>
          <p></p>
        </Card.Content>
        <Card.Content extra>
          <div>
            {this.props.added.length ? <Button basic color='yellow' onClick={this.removeEvent} content='Remove' icon='remove from calendar'/> : <Button basic color='olive' onClick={this.addEvent} content='My KickOff' icon='add to calendar' /> }
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addEvent: (event) => {
      dispatch(addEvent(event))
    },
    removeEvent: (id) => {
      dispatch(removeEvent(id))
    },
    fetchMyKickOff: (id) => {
      dispatch(fetchMyKickOff(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    myEvents: state.event.myEvents,
    isFetching: state.event.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionItem)
