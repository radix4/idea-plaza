import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'

const ContactInfo = () => {
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
        <Form>
          <Form.Group as={Row} controlId='Name'>
            <Form.Label column sm='2'>
              Name:
            </Form.Label>

            <Col sm='10'>
              <Form.Control plaintext readOnly defaultValue='Allen Baek' />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='Email'>
            <Form.Label column sm='2'>
              Email:
            </Form.Label>

            <Col sm='10'>
              <Form.Control
                plaintext
                readOnly
                defaultValue='allen.baek@sjsu.edu'
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
  return <div>{display}</div>
}

export default ContactInfo
