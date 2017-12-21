import React from 'react';
import { connect } from 'react-redux';
import CountryItem from './CountryItem';
import { Card, Divider, Loader, Transition } from 'semantic-ui-react';

class CountryList extends React.Component {
  render() {
    const countries = this.props.myCountries.map( country => {
      return <CountryItem country={country} key={country.id} />
    })
    return(
      <div>
      <br />
      <Divider horizontal><h1>My Countries</h1></Divider>
        <Transition.Group as={Card.Group} children={countries} >
        { this.props.isFetching ? <Loader active inline='centered' size='large' content='Working'/> : countries }
        </Transition.Group>
      </div>
    )
  }
}

mapStateToProps(state) {
  return {
    isFetching: state.country.isFetching,
    myCountries: state.country.myCountries
  }
}

export default connect(mapStateToProps)(CountryList)
