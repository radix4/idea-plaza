import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { Alert } from 'react-bootstrap'
import axios from 'axios'

const ContactInfo = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [currentpassword, setCurrentPassword] = useState('')
  const [oldpassword, setOldPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [id, setId] = useState()
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('front/component/HomePage.js: logged in user found', user)

      const getInfo = { email: user.email }

      axios
        .post('http://localhost:3001/api/users/getUser', getInfo)
        .then((request) => {
          console.log(request.data)
          setName(request.data.firstName + ' ' + request.data.lastName)
          setEmail(request.data.email)
          setCurrentPassword(request.data.password)
          setId(request.data.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  // updates on input
  const handleChangeOldPassword = ({ target }) => {
    setOldPassword(target.value)
  }

  const handleChangeNewPassword = ({ target }) => {
    setNewPassword(target.value)
  }

  const handleChangeConfirmPassword = ({ target }) => {
    setConfirmPassword(target.value)
  }

  // Checks Input

  const onSubmit = () => {
    if (currentpassword !== oldpassword) {
      setErrorMessage(
        <Alert variant='danger'>
          'Your Old Password Input does not fit with the database'
        </Alert>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (newpassword !== confirmpassword) {
      setErrorMessage(
        <Alert variant='danger'>
          'Your new password and confirm password are not the same'
        </Alert>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else if (currentpassword === newpassword) {
      setErrorMessage(
        <Alert variant='danger'>
          'Your new password is the same as the database'
        </Alert>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      // change password
      setErrorMessage(
        <Alert variant='success'>'Your new password has been changed'</Alert>
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      const update = {
        _id: id,
        password: newpassword,
      }

      axios
        .post('http://localhost:3001/api/users/updatePassword', update)
        .then((request) => {
          console.log(request)
        })

      // sets newpassword as current password
      setCurrentPassword(newpassword)

      // resets input fields
      document.getElementById('password').reset()
    }
  }

  //Style
  const inputs = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    width: '800px',

    transform: 'translate(-50%, -50%)',
  }

  //   placeholder to print out project ideas etc.
  const display = (
    <div>
      <div style={inputs}>
        {errorMessage}
        <Form id='password'>
          <Form.Group as={Row} controlId='Name'>
            <Form.Label column sm='2'>
              Name:
            </Form.Label>

            <Col sm='10'>
              <Form.Control plaintext readOnly defaultValue={name} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='Email'>
            <Form.Label column sm='2'>
              Email:
            </Form.Label>

            <Col sm='10'>
              <Form.Control plaintext readOnly defaultValue={email} />
            </Col>
          </Form.Group>

          {/* Old Password */}
          <Form.Group as={Row} controlId='OldPassword'>
            <Form.Label column sm='2'>
              Old Password:
            </Form.Label>

            <Col sm='10'>
              <Form.Control
                type='password'
                onChange={handleChangeOldPassword}
                placeholder='Old Password'
                required
              />
            </Col>
          </Form.Group>
          {/* New Password */}
          <Form.Group as={Row} controlId='NewPassword'>
            <Form.Label column sm='2'>
              New Password:
            </Form.Label>

            <Col sm='10'>
              <Form.Control
                type='password'
                onChange={handleChangeNewPassword}
                placeholder='New Password'
                required
              />
            </Col>
          </Form.Group>
          {/* Confirm Password */}
          <Form.Group as={Row} controlId='ConfirmPassword'>
            <Form.Label column sm='2'>
              Confirm Password:
            </Form.Label>

            <Col sm='10'>
              <Form.Control
                type='password'
                onChange={handleChangeConfirmPassword}
                placeholder='Confirm Password'
                required
              />
            </Col>
          </Form.Group>

          <Button onClick={onSubmit}> Change Password </Button>
        </Form>
      </div>
    </div>
  )
  return <div>{display}</div>
}

export default ContactInfo
