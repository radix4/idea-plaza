import React from 'react'
import { Col, Row, Container, Image, Form, Button } from 'react-bootstrap'
import backgroundImage from '../images/login.png'

const LoginPage = () => {
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

  return (
    <Container fluid>
      <Row className='align-items-center'>
        {/* =================LEFT COLUMN================ */}
        <Col md={4}>
          <Row style={leftColStyle}>
            <h2>Login</h2>
            <Form>
              {/* =============USERNAME============= */}
              <Form.Group as={Row} controlId='email'>
                <Form.Label column md={4}>
                  Email
                </Form.Label>
                <Col md={8}>
                  <Form.Control type='text' placeholder='Email' />
                </Col>
              </Form.Group>

              {/* =============PASSWORD============= */}
              <Form.Group as={Row} controlId='password'>
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
            <a href='/'>Create an account</a>
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
