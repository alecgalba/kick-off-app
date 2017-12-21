import React from 'react';
import { connect } from 'react-redux';
import DashboardKickOffList from './DashboardKickOffList';
import { fetchKickOff } from '../../actions/competitions';
import { fetchMyKickOff } from '../../actions/events';
import { Divider, Loader } from 'semantic-ui-react';

class DashboardContainer extends React.Component {

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.myCompetitions.length > 0 ? null : this.props.fetchKickOff(userId)
    this.props.myEvents.length > 0 ? null : this.props.fetchMyKickOff(userId)
  }

  render() {
    return(
      <div>
        <br />
        <Divider horizontal ><h1>My KickOff Tonight</h1></Divider>
          {this.props.isFetching ? <Loader active inline='centered' size='large' content='Working'/> : <DashboardKickOffList /> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myCompetitions: state.competition.myCompetitions
    myEvents: state.event.myEvents
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchKickOff: (id) => {
      dispatch(fetchKickOff(id))
    },
    fetchMyKickOff: (id) => {
      dispatch(fetchMyKickOff(id))
    }
  }
}

export default connnect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
