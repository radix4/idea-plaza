import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import { generatePath, useHistory } from 'react-router'
import userService from '../services/users'
import backgroundImage from '../images/login.png'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()

  const backgroundImageStyle = {
    width: '100%',
    height: '946px',
  }

  const rightColStyle = {
    padding: '0px',
  }

  const leftColStyle = {
    padding: '30%',
  }

  const handleEmailChange = (event) => setEmail(event.target.value)

  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ email, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setEmail('')
      setPassword('')
      document.getElementById('login-form').reset()
      console.log('LoginPage: logged in', user)
      //Redirects to MainPage
      history.push('/')
    } catch (exception) {
      console.log('LoginPage: login fail, wrong credentials')
    }
  }

  return (
    <Container fluid>
      <Row className='align-items-center'>
        {/* =================LEFT COLUMN================ */}
        <Col md={4}>
          <Row style={leftColStyle}>
            <h2>Login</h2>
            <Form id='login-form' onSubmit={handleLogin}>
              {/* =============EMAIL============= */}
              <Form.Group
                as={Row}
                controlId='email'
                onChange={handleEmailChange}>
                <Form.Label column md={4}>
                  Email
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Email' />
                </Col>
              </Form.Group>

              {/* =============PASSWORD============= */}
              <Form.Group
                as={Row}
                controlId='password'
                onChange={handlePasswordChange}>
                <Form.Label column md={4}>
                  Password
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='password' placeholder='Password' />
                </Col>
              </Form.Group>

              {/* =============SUBMIT============= */}
              <Form.Group as={Row}>
                <Col md={{ span: 10, offset: 4 }}>
                  <Button type='submit'>Login</Button>
                </Col>
              </Form.Group>
            </Form>
            {/* ===============LINK================ */}
            {/* modify with Link component later */}
            Don't have an account?
            <a href='/Registration'>Create an account</a>
          </Row>
        </Col>
        {/* =================RIGHT COLUMN================ */}
        <Col md={8} style={rightColStyle}>
          <Image style={backgroundImageStyle} src={backgroundImage}></Image>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
