import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import React from 'react';
import { Divider, Modal, Button, Transition } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCountry } from '../../actions/countries';
import { addCompetition, removeCompetition, fetchKickOff } from '../../actions/competitions';
require('react-big-calendar/lib/css/react-big-calendar.css');

BigCalendar.momentLocalizer(moment)

class ShowCalendar extends React.Component {
  state = { open: false }

  componentDidMount() {
    const userId = localStorage.getItem("id")
    this.props.fetchKickOff(userId)
  }

  handleAdd = (e, competition) => {
    e.preventDefault()
    let country = competition.competition.competition.country
    this.props.addCountry(country)
    let ep = JSON.stringify({competition: competition.competition.competition, country_id: country.id})
    setTimeout(() => this.addCompetition(ep), 2000)
    this.close()
  }

  addCompetition = (ep) => {
    this.props.addCompetition(ep)
  }

  handleRemove = (e, competition) => {
    e.preventDefault()
    let id = JSON.stringify({competition_id: competition.competition.id})
    this.props.removeCompetition(id)
    this.close()
  }

  country = competition => (e) => this.setState({ competition: e, open: true })
  close = () => this.setState({ open: false })

  eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: '#20b2aa',
      borderRadius: '5px',
      borderColor: 'white',
      color: 'white',
      display: 'block',
    }
    return {
      style: style
    }
  }

  render() {
    const { open, episode } = this.state

    let events = this.props.myEvents.map( event => {
      let d = new Date(event.match_date)
      let time = "Unavailable"
      event.time !== null ? time = formatTime(event.match_time) : null

      return {
        country: event.country_name
        league: event.league_name
        teams: event.hometeam_name + "vs." + event.awayteam_name
        startDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getDate(), d.getHours(), d.getMinutes()),
        endDate: new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()+event.match_time),
        status: event.match_status
        id: event.id
      }
    })
    let ids = this.props.myEvents.map(event => event.id)

    return(
      <div>
          <br />
        <Divider horizontal><h1>My Kickoff</h1></Divider>
        <Transition animation='fade' duration={800} transitionOnMount={true}>
          <BigCalendar
            popup
            onSelectEvent={this.country(competition)}
            events={events}
            views={['day', 'week', 'agenda']}
            defaultView='day'
            startAccessor='startDate'
            endAccessor='endDate'
            step={7.5}
            min={moment('10:00am', 'h:mma').toDate()}
            max={moment('11:59pm', 'h:mma').toDate()}
          />
        </Transition>

        <Modal size='tiny' event={event} open={open} onClose={this.close}>
          <Modal.Header>
            <{ competition !== undefined ? competition.league_name : null }
          </Modal.Header>
          <Modal.Content>
            <h4>{ event !== undefined ? `${event.hometeam_name} - ${event.awayteam_name}` : 'No Data Available' }</h4>
            <h5>{ event !== undefined ? `${moment(event.startDate).format('h:mm a')} - ${moment(event.endDate).format('h:mm a')}` : 'No Data Available' }</h5>
          </Modal.Content>
          <Modal.Actions>
            { event !== undefined ? ( !ids.includes(event.id) ? <Button icon='remove' labelPosition='right' onClick={this.close} content='Close'/> : <Button negative onClick={this.handleRemove} labelPosition='right' episode={episode} content='Remove from My KickOff'/> ) : null}
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    myEvents: state.competition.myEvents
  }
}


function mapDispatchToProps(dispatch) {
  return {
    addCountry: (id) => {
      dispatch(addCountry(id))
    },
    addCompetition: (id) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CountryCalendar)
