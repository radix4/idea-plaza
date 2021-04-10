import React from 'react'
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

const MyNavbar = () => {
  const navbarStyle = {
    backgroundColor: '#2b7a98',
  }

  const searchFieldStyle = {
    width: '350px',
  }

  const loginButtonStyle = {
    width: '100px',
  }

  const signupButtonStyle = {
    width: '100px',
  }

  const navDropdownStyle = {
    color: 'white',
  }

  return (
    <Navbar expand='lg' className='fixed-top' style={navbarStyle}>
      {/* ============= LOGO ============= */}
      <Navbar.Brand>
        <img
          src={logoImage}
          width='120'
          height='30'
          alt='Idea Plaza'
          className='mb-0.5 mr-2'
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {/* ============= SEARCH ============= */}
        <Form inline className='mr-3'>
          <FormControl
            type='text'
            placeholder='Search'
            className='mr-sm-4'
            style={searchFieldStyle}
          />
          <Button variant='info' class='btn-info'>
            Search
          </Button>
        </Form>
        {/* ============= SORT BY ============= */}
        <Nav className='mr-auto'>
          <NavDropdown title='Sort by' style={navDropdownStyle}>
            <NavDropdown.Item>Relevance</NavDropdown.Item>
            <NavDropdown.Item>Popularity</NavDropdown.Item>
            <NavDropdown.Item>Date</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* ============= LOGIN ============= */}
        <Form className='mr-4'>
          <Link to='./Login'>
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
          <Link to='./Registration'>
            <Button
              variant='outline-light'
              className='rounded-pill'
              style={signupButtonStyle}>
              Sign Up
            </Button>
          </Link>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
