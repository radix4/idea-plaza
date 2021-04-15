import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (
    message ===
    'Yay, account successfully created! Go to the login page to login.'
  ) {
    return <Alert variant='success'>{message}</Alert>
  }

  return <Alert variant='danger'>{message}</Alert>
}

export default Notification
