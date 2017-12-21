import React from 'react';
import { connect } from 'react-redux';
import { fetchCountryCompetitionEvents } from '../../actions/events';
import EventList from './EventList';
import { Divider, Loader } from 'semantic-ui-react';

class EventContainer extends React.Component {

  componentDidMount() {
    this.props.fetchCountryCompetitionEvents(this.props.match.params.id)
  };

  render() {
    const name = this.props.match.params.league_name
    const id = this.props.match.params.id
    return(
      <div>
        <br />
        <Divider horizontal><h2>Events</h2></Divider>
          {this.props.eventFetching ? <Loader active inline='centered' size='large' content='Working'/> : null }
          <EventList league={name} id={id} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    eventFetching: state.event.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCountryCompetitionEvents: (id) => {
      dispatch(fetchCountryCompetitionEvents(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer)
