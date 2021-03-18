import React from 'react'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'

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
      <Navbar.Brand>
        <img
          src='images/logo_white.png'
          width='120'
          height='30'
          alt='Idea Plaza'
          className='mb-0.5 mr-2'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
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
        <Nav className='mr-auto'>
          <NavDropdown title='Sort by' style={navDropdownStyle}>
            <NavDropdown.Item>Relevance</NavDropdown.Item>
            <NavDropdown.Item>Popularity</NavDropdown.Item>
            <NavDropdown.Item>Date</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className='mr-4'>
          <Button
            variant='info'
            className='rounded-pill'
            style={loginButtonStyle}>
            Login
          </Button>
        </Form>
        <Form>
          <Button
            variant='outline-light'
            className='rounded-pill'
            style={signupButtonStyle}>
            Sign Up
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
