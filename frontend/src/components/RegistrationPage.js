import React, { useState } from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import backgroundImage from '../images/registration.png'
import userService from '../services/users'
import { generatePath, useHistory } from 'react-router'

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  let history = useHistory()

  const backgroundImageStyle = {
    width: '100%',
    height: '946px',
  }

  const leftColStyle = {
    padding: '0px',
  }

  const rightColStyle = {
    padding: '20%',
  }

  const formStyle = {
    width: '90%',
    height: '90%',
    marginTop: '30px',
  }

  const handleFirstNameChange = (event) => setFirstName(event.target.value)

  const handleLastNameChange = (event) => setLastName(event.target.value)

  const handleEmailChange = (event) => setEmail(event.target.value)

  const handlePasswordChange = (event) => setPassword(event.target.value)

  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value)

  const addUser = async (event) => {
    event.preventDefault()

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }

    try {
      await userService.create(newUser).then((returnedUser) => {
        console.log('create user success!')
        //Redirects to Login
        history.push('/Login')
      })

      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      // clear react bootstrap form
      //document.getElementById('create-user-form').reset()
    } catch (exception) {
      console.log('Create user fail')
    }
  }

  return (
    <Container fluid>
      <Row className='align-items-center d-flex flex-wrap-reverse'>
        {/* =================LEFT COLUMN================ */}
        <Col style={leftColStyle} md={6}>
          <Image style={backgroundImageStyle} src={backgroundImage}></Image>
        </Col>

        {/* =================RIGHT COLUMN================ */}

        <Col md={6}>
          <Row style={rightColStyle}>
            <h1>Registration</h1>
            <Form style={formStyle} id='registration' onSubmit={addUser}>
              {/* ============= FIRST NAME ============= */}
              <Form.Group
                as={Row}
                controlId='firstName'
                onChange={handleFirstNameChange}>
                <Form.Label column md={4}>
                  First Name
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='First Name' />
                </Col>
              </Form.Group>

              {/* ============= LAST NAME ============= */}
              <Form.Group
                as={Row}
                controlId='lastName'
                onChange={handleLastNameChange}>
                <Form.Label column md={4}>
                  Last Name
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Last Name' />
                </Col>
              </Form.Group>

              {/* ============= EMAIL ============= */}
              <Form.Group
                as={Row}
                controlId='email'
                onChange={handleEmailChange}>
                <Form.Label column md={4}>
                  Email
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='email' placeholder='Email' />
                </Col>
              </Form.Group>

              {/* ============= PASSWORD ============= */}
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

              {/* ============= CONFIRM PASSWORD ============= */}
              <Form.Group
                as={Row}
                controlId='confirmPassword'
                onChange={handleConfirmPasswordChange}>
                <Form.Label column md={4}>
                  Confirm Password
                </Form.Label>
                <Col md={8}>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                  />
                </Col>
              </Form.Group>

              {/* =============SUBMIT============= */}
              <Form.Group as={Row}>
                <Col md={{ span: 10, offset: 4 }}>
                  <Button type='submit'>Register</Button>
                </Col>
              </Form.Group>

              {/* ===============LINK================ */}
              {/* modify with Link component later */}
              <div>Already have an account?</div>
              <div>
                <Link to='./Login'>Login here</Link>
              </div>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RegistrationPage
