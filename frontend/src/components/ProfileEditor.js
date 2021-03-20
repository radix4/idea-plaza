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

  //Style

  const box = {
    float: 'left',
    height: '80px',
    width: '100%',
    marginBottom: '15px',
    clear: 'both',

    backgroundColor: '#2b7a98',
  }
  /* for EditProfile */
  const inputs = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    width: '800px',

    transform: 'translate(-50%, -50%)',
  }

  /* Location ProfilePic  */
  const container = {
    position: 'fixed',
    top: '5.5%',
    left: '40%',
  }
  // edits profile picture
  const clip = {
    position: 'absolute',
    clipPath: 'circle(40%)',
  }
  // Button to go back to Profile Page
  const EditPlacement = {
    position: 'absolute',

    top: '20%',
    left: '70%',
  }

  const scrolling = {
    paddingBottom: 'auto',
    overflowY: 'scroll',
    /* Disables left scrolling */
    maxWidth: '100%',
    overflowX: 'hidden',
  }

  return (
    <div style={scrolling}>
      {/* Background Box*/}
      <div style={box}></div>

      {/* ProfileImage */}
      <div style={container}>
        <img src={profileImage} alt='Image_file' style={clip} />
      </div>

      {/* Go to Profile page button */}
      <div style={EditPlacement}>
        <Button>Profile</Button>
      </div>

      {/* Input fields */}
      <div style={inputs}>
        <Form>
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
