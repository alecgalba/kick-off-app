import React from 'react';
import { connect } from 'react-redux';
import { fetchCountryCompetitions } from '../../actions/competitions';
import CompetitionList from './CompetitionList';
import { Divider, Loader } from 'semantic-ui-react';

class CompetitionContainer extends React.Component {

  componentDidMount() {
    this.props.fetchCountryCompetitions(this.props.match.params.id)
  };

  render() {
    const name = this.props.match.params.country_name
    const id = this.props.match.params.id
    return(
      <div>
        <br />
        <Divider horizontal><h2>Competitions</h2></Divider>
          {this.props.compFetching ? <Loader active inline='centered' size='large' content='Working'/> : null }
          <CompetitionList country={name} id={id} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    compFetching: state.competition.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCountryCompetitions: (id) => {
      dispatch(fetchCountryCompetitions(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionContainer)
