import React from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../../actions/events';
import { Card, Button, Image, Transition } from 'semantic-ui-react';
import moment from 'moment';

class DashboardKickOffItem extends React.Component {

  handleRemove = (e, event) => {
    e.preventDefault()
    let id = JSON.stringify({event_id: event.event.id})
    this.props.removeEvent
  }

  render() {
    const ev = this.props.event

    return(
      <Transition animation='drop' duration={1000} transitionOnMount={true}>
      <Card centered={true} color]'olive'>
        <Card.Content>
          <Card.Header as='h2'>{ev.league_name}</Card.Header>
          <Card.Header as='h3'>{moment(ev.match_time).format('h:mm a')} on {ev.match_date}</Card.Header>
          <Card.Description>{ev.hometeam_name} vs. {ev.awayteam_name}</Card.Description>
          <Card.Meta>{ev.match_status}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two button'>
            <Button basic color='yellow' content='Remove' icon='remove from calendar' event={ev} onClick{this.handleRemove} />
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeEvent: (id) => {
      dispatch(removeEvent(id))
    }
  }
}

export default connect(mapDispatchToProps)(DashboardKickOffItem)
