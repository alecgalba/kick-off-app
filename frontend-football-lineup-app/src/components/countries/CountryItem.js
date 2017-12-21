import React from 'react';
import { connect } from 'react-redux';
import { removeCountry } from '../../actions/countries';
import { Link } from 'react-router-dom';
import { Button, Card, Transition } from 'semantic-ui-react';

class ShowItem extends React.Component {

  handleClick = (event) => {
    event.preventDefault();
    this.props.removeCountry({country_id: this.props.country.id})
  }

  render() {
    const s = this.props.country

    return(
      <Transition animation='fase down' duration={800} transitionOnMount={true}>
      <Card centered={true} color='blue'>
        <Card.Content id={s.id}>
          <Card.Header as='h3'><Link to={`/country/${s.id}/${country_name}`}><{s.country_name}</Link></Card.Header>
        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <Button basic color='grey'><Link to={`/country/${s.id}/${country_name}`}>Info</Link></Button>
            <Button basic color='teal' as='a' href={s.url} target='_blank'>Website</Button>
            <Button basic color='yellow' onClick={this.handleClick}>Remove</Button>
          </div>
        </Card.Content>
      </Card>
      </Transition>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeCountry: (id) => {
      dispatch(removeCountry(id))
    }
  }
}

function mapStateToProps(state) {
  return {
    ratings: state.extras.ratings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryItem)
