import React from 'react'
import './style.css'
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'

const MyNavbar = () => {
  return (
    <Navbar expand='lg' className='nav-bg fixed-top'>
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
            id='field-search'
          />
          <Button variant='outline-light'>Search</Button>
        </Form>
        <Nav className='mr-auto'>
          <NavDropdown title='Sort by' id='basic-nav-dropdown'>
            <NavDropdown.Item>Relevance</NavDropdown.Item>
            <NavDropdown.Item>Popularity</NavDropdown.Item>
            <NavDropdown.Item>Date</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className='mr-4'>
          <Button variant='outline-light' className='btn-login rounded-pill'>
            Login
          </Button>
        </Form>
        <Form>
          <Button variant='outline-light' className='btn-signup rounded-pill'>
            Sign Up
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default MyNavbar
