import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import profileImage from '../images/background.png'

const ProfileEditor = () => {
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
        <img src={profileImage} alt='Image_file' id='clip' />
      </div>

      <div className='goBack_placement'></div>

      {/* Input fields */}
      <div className='inputs'>
        <Form>
          {/* ! Try to get rid of these line breaks */}
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

export default ProfileEditor
