import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
//import { Link } from 'react-router-dom'
import profile from './profilePics/background.jpeg'
import './Styles.css'

export default function SetupProfile() {
  const [bios, setBios] = useState('')
  const [achieve, setAchieve] = useState('')

  // updates on input
  const handleChangeB = ({ target }) => {
    setBios(target.value)
  }

  const handleChangeA = ({ target }) => {
    setAchieve(target.value)
  }

  const handleSubmit = () => {
    console.log('Bios : ' + bios)
    console.log('Achievements : ' + achieve)
  }

  return (
    <div className='scrolling'>
      {/* Background Box*/}
      <div className='box'></div>

      {/* ProfileImage */}
      <div className='container'>
        <img src={profile} alt='Image_file' id='clip' />
      </div>

      <div className='goBack_placement'>
        {/* <Link to='./'>
          <Button>Profile Page</Button>
        </Link> */}
      </div>

      {/* Input fields */}
      <div className='inputs'>
        <Form>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Form.Group as={Row} controlId='Bios'>
            <Form.Label column sm='2'>
              Biography
            </Form.Label>

            <Col sm='8'>
              <Form.Control
                type='text'
                as='textarea'
                placeholder='About Yourself'
                value={bios}
                onChange={handleChangeB}
                rows={3}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='Achievement'>
            <Form.Label column sm='2'>
              Achievements
            </Form.Label>

            <Col sm='8'>
              <Form.Control
                type='text'
                as='textarea'
                placeholder='Your Achievements'
                value={achieve}
                onChange={handleChangeA}
                rows={3}
              />
            </Col>
          </Form.Group>

          <Button onClick={handleSubmit}> Save </Button>
        </Form>
      </div>
    </div>
  )
}
