import React from 'react';
import { connect } from 'react-redux';
import CompetitionItem from './CompetitionItem';
import { Card, Button, Icon, Loader } from 'semantic-ui-react';

class CompetitionList extends React.Component {

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
    let displayed = this.props.countryCompetitions.slice(begin, end)
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
    let competitions = ""
    if (this.state.displayedItems && this.props.myCompetitions) {competitions = this.state.displayedItems.map( competition => <CompetitionItem key={competition.id} competition={competition} countryId={this.props.id} added={this.props.myCompetitions.filter(myComp => myComp.id == competition.id)} /> )}

    return(
      <div>
        <Card.Group>
          { competitions }
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
    myCompetitions: state.competition.myCompetitions,
    countryCompetitions: state.competition.countryCompetitions,
  }
}

export default connect(mapStateToProps)(CompetitionList)
