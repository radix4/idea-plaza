import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import profileImage from '../images/DefaultE.jpg'

const BioAchieve = () => {
  const [bios, setBios] = useState('My bios')
  const [achieve, setAchieve] = useState('My Achievements')
  const [edit, setEdit] = useState(false)

  // updates on input
  const handleChangeB = ({ target }) => {
    setBios(target.value)
  }

  const handleChangeA = ({ target }) => {
    setAchieve(target.value)
  }

  // Saves Input to database
  const handleSubmit = () => {
    console.log('Bios : ' + bios)
    console.log('Achievements : ' + achieve)

    // use axios to send values to the server
  }

  //Turns on editor
  const switchstateT = () => {
    setEdit(true)
  }
  //Turns off editor
  const switchstateF = () => {
    setEdit(false)
  }
  //Resets values when user cancels changes
  const resetValues = () => {
    // use axios to get values from the server
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
    top: '10%',
    left: '40%',
  }
  // edits profile picture
  const clip = {
    position: 'absolute',
    clipPath: 'circle(50%)',
  }
  // Button to go back to Profile Page
  const EditPlacement = {
    position: 'absolute',

    top: '20%',
    left: '70%',
  }

  //For Bios and Achievement access
  var input1 = <Form.Control />
  var input2 = <Form.Control />
  var button = <Button></Button>
  var submit = ''

  if (edit) {
    input1 = (
      <Form.Control
        type='text'
        as='textarea'
        placeholder='About Yourself'
        value={bios}
        onChange={handleChangeB}
        rows={3}
      />
    )

    input2 = (
      <Form.Control
        type='text'
        as='textarea'
        placeholder='Your Achievements'
        value={achieve}
        onChange={handleChangeA}
        rows={3}
      />
    )

    button = <Button onClick={(resetValues, switchstateF)}>Cancel</Button>

    submit = <Button onClick={(handleSubmit, switchstateF)}> Save </Button>
  } else {
    input1 = (
      <Form.Control
        type='text'
        as='textarea'
        placeholder='About Yourself'
        value={bios}
        onChange={handleChangeB}
        rows={3}
        disabled
      />
    )

    input2 = (
      <Form.Control
        type='text'
        as='textarea'
        placeholder='Your Achievements'
        value={achieve}
        onChange={handleChangeA}
        rows={3}
        disabled
      />
    )

    button = <Button onClick={switchstateT}>Edit</Button>

    submit = ''
  }

  //   placeholder to print out project ideas etc.
  const displayBioAchieve = (
    <div>
      {/* ProfileImage */}
      <div style={container}>
        <img
          src={profileImage}
          alt='Image_file'
          style={clip}
          width='300px'
          height='300px'
        />
      </div>
      {/* Go to Profile page button */}
      <div style={EditPlacement}>
        <Button>Profile</Button>
      </div>

      <div style={inputs}>
        <Form>
          <Form.Group as={Row} controlId='Bios'>
            <Form.Label column sm='2'>
              Biography
            </Form.Label>

            <Col sm='8'>{input1}</Col>
          </Form.Group>

          <Form.Group as={Row} controlId='Achievement'>
            <Form.Label column sm='2'>
              Achievements
            </Form.Label>

            <Col sm='8'>{input2}</Col>
          </Form.Group>
          {button}
          <br />
          <br />
          {submit}
          <br />
        </Form>
      </div>
    </div>
  )
  return <div>{displayBioAchieve}</div>
}

export default BioAchieve
