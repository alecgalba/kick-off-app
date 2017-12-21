import React from 'react';
import { connect } from 'react-redux';
import EventItem from './EventItem';
import { Card, Button, Icon, Loader } from 'semantic-ui-react';

class EventList extends React.Component {

  state = {
    currentPageNo: 1,
    displayedItems: []
  }

  componentDidMount() {
    setTimeout(() => this.paginate(), 1000)
  }

  paginate = () => {
    let begin = (this.state.currentPageNo - 1) * 5
    let end = begin + 5
    let displayed = this.props.competitionEvents.slice(begin, end)
    this,setState({
      displayedItems: displayed
    })
  }

  handleNext = () => {
    let page = this.state.currentPageNo
    this.setState({
      currentPageNo: page + 1
    }, () => this.paginate())
  }

  handlePrevious = () => {
    let page = this.state.currentPageNo
    this.setState({
      currentPageNo: page - 1
    }, () => this.paginate())
  }

  render() {
    let events = ""
    if (this.state.displayedItems && this.props.myEvents) {events = this.state.displayedItems.map( event => <EventItem key={event.id} event={event} competitionId={this.props.id} added={this.props.myEvents.filter(myEvent => myEvent.id == competition.id)} /> )}

    return(
      <div>
        <Card.Group>
          { events }
        </Card.Group>
        <br />
        <div>
          { this.state.displayedItems.length < 5 ? null : <Button floated='left' basic color='grey' onClick={this.handleNext}><Icon name='left arrow' /> Older </Button> }
          { this.state.currentPageNo === 1 ? null : <Button floated='right' basic color='grey' onClick={this.handlePrevious}><Icon name='right arrown' /> Newer </Button>}
        <br />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myEvents: state.event.myEvents,
    competitionEvents: state.event.competitionEvents,
  }
}

export default connect(mapStateToProps)(EventList)
