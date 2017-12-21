import React from 'react';
import { connect } from 'react-redux';
import SearchItem from './SearchItem';
import { Card, Divider, Loader } from 'semantic-ui-react';

class SearchResults extends React.Component {

  render() {
    const searchItems = this.props.results.map( country => {
      return <SearchItem key={country.country.id} country={country} history={this.props.history}/>
    })
    return(
      <div>
        {this.props.isFetching ? <Loader active inline='centered' size='large'/> : null }
          {this.props.results.length === 0 ? null : <div>
          <p></p>
          <Divider horizontal><h2>Search Results</h2></Divider
            <Card.Group>
              {searchItems}
            </Card.Group>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    results: state.search.results,
    isFetching: state.country.isFetching,
    myCountries: state.country.myCountries
  }
}

export default connect(mapStateToProps)(SearchResults)
