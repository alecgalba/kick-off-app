import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

class Nav extends React.Component {

  handleLogout = () => {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("id")
  }

  render() {
    return(
      <div className='navbar'>
      <Menu color='teal' pointing secondary>
        <Menu.Item>
          //find and add logo image
        </Menu.Item>
        { localStorage.getItem('jwtToken') ? <div className='right menu'>
            <NavLink classname='item' to='/countries'>My Countries</NavLink>
            <NavLink className='item' to='/competitions'>MyCompetitions</NavLink>
            <NavLink className='item' to='/events'>My Events</NavLink>
            <NavLink className='item' to='/dashboard'>Dashboard</NavLink>
            <NavLink className='item' to='/search'>Search</Navlink>
            <NavLink className='item' to='/login' onClick={this.handleLogout}>Logout</NavLink>
          </div> : <div classname='right menu'><NavLink className='item' to='/login'>Login</NavLink><NavLink className='item' to='/signup'>Signup</NavLink></div>
        }
      </Menu>
      </div>
    )
  }
}

export default Nav
