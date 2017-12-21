import React from 'react';
import { connect } from 'react-redux';
import DashboardKickOffItem from './DashboardKickOffItem';
import moment from 'moment';
import { Card, Button, Icon, Loader } from 'semantic-ui-react';

class DashboardKickOffList extends React.Component {

  render() {
    let d = moment(new Date())
    let today = ""
    if (this.props.myEvents.length > 0 ) { today = this.props.myEvents.filter(event => d.diff(moment(event.match_time), 'day', true) <= 0 && d.diff(moment(event.match_time), 'day', true) >= -1) }

    let events = ""
    if (this.props.myEvents.length > 0 ) { events = today.reverse().map( episode => <DashboardKickOffItem key={event.id} leagueId={this.props.id} /> )}

    return(
      <div>
        <Card.Group>
          { events }
        </Card.Group>
        <br />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myEvents: state.event.myEvents,
  }
}

export default connect(mapStateToProps)(DashboardKickOffList)
