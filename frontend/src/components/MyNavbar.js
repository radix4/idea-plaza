import React, { useState, useEffect } from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logoImage from '../images/logo_white.png'

const MyNavbar = ({ handleSearchSubmit, onChangeSearch }) => {
  const [user, setUser] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [visible, setVisible] = useState(true)

  const navbarStyle = {
    backgroundColor: '#2b7a98',
  }

  const searchFieldStyle = {
    width: '350px',
  }

  const loginButtonStyle = {
    width: '100px',
    display: visible ? '' : 'none',
  }

  const signupButtonStyle = {
    width: '100px',
    display: visible ? '' : 'none',
  }

  const userNameStyle = {
    display: visible ? 'none' : '',
    color: 'white',
    fontSize: 'large',
  }

  const logoutButtonStyle = {
    width: '100px',
    display: visible ? 'none' : '',
  }

  const navDropdownStyle = {
    color: 'white',
  }

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setVisible(false)
      console.log('front/component/HomePage.js: visible', visible)
      console.log('front/component/HomePage.js: logged in user found', user)
    }
  }, [])

  const handleBtnLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setVisible(false)
  }

  return (
    <Navbar expand='lg' className='fixed-top' style={navbarStyle}>
      {/* ============= LOGO ============= */}
      <Link to='/'>
        <Navbar.Brand>
          <img
            src={logoImage}
            width='120'
            height='30'
            alt='Idea Plaza'
            className='mb-0.5 mr-2'
          />
        </Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {/* ============= SEARCH ============= */}
        <Form inline className='mr-3' onSubmit={handleSearchSubmit}>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-4'
            style={searchFieldStyle}
            onChange={onChangeSearch}
          />
          <Button variant='info' className='btn-info' type='submit'>
            Search
          </Button>
        </Form>
        {/* ============= SORT BY ============= */}
        <Nav className='mr-auto'>
          <NavDropdown title='Sort by' style={navDropdownStyle}>
            <NavDropdown.Item>Most Recent</NavDropdown.Item>
            <NavDropdown.Item>Popularity</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* ============= LOGIN ============= */}
        <Form className='mr-4'>
          <Link to='/Login'>
            <Button
              variant='info'
              className='rounded-pill'
              style={loginButtonStyle}>
              Login
            </Button>
          </Link>
        </Form>
        {/* ============= SIGN UP ============= */}
        <Form>
          <Link to='/Registration'>
            <Button
              variant='outline-light'
              className='rounded-pill'
              style={signupButtonStyle}>
              Sign Up
            </Button>
          </Link>
        </Form>
        {/* ============= ACCOUNT ============= */}
        <Form style={userNameStyle}>
          <>
            Hello,{' '}
            <b>
              {firstName} {lastName}
            </b>{' '}
          </>{' '}
          <Link to='/Profile'>
            <Button
              variant='info'
              className='rounded-pill ml-4 mr-4'
              style={logoutButtonStyle}>
              Account
            </Button>
          </Link>
        </Form>
        {/* ============= LOGOUT ============= */}
        <Form style={userNameStyle}>
          <Button
            variant='outline-light'
            className='rounded-pill'
            style={logoutButtonStyle}
            type='submit'
            onClick={handleBtnLogout}>
            Logout
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
