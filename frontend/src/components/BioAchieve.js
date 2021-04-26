import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import profileImage from '../images/DefaultE.jpg'
import axios from 'axios'

const BioAchieve = (props) => {
  const [bios, setBios] = useState(props.bios)
  const [achieve, setAchieve] = useState(props.achieve)
  const [edit, setEdit] = useState(false)
  const [oldbios, setOldBios] = useState(props.bios)
  const [oldachieve, setOldAchieve] = useState(props.bios)
  const [id, setId] = useState(props.id)
  const [update, setUpdate] = useState(true)

  useEffect(() => {
    if (update) {
      setBios(props.bios)
      setAchieve(props.achieve)
      setOldBios(props.bios)
      setOldAchieve(props.achieve)
      setId(props.id)
      setUpdate(false)
    }
  }, [props.bios, props.achieve, props.id, oldbios, oldachieve, id])

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
    console.log('Id: ' + id)
    setEdit(false)

    //setting new values as old values
    setOldAchieve(bios)
    setOldBios(achieve)
    // use axios to send values to the server
    const updateValues = {
      _id: id,
      biography: bios,
      achievements: achieve,
    }

    axios
      .post('http://localhost:3001/api/users/updateBios_Achieve', updateValues)
      .then((request) => {
        console.log(request)

        setBios(request.data.biography)
        setAchieve(request.data.achievements)
      })
      .catch((err) => {
        console.log(err)
      })

    // window.location.reload()
  }

  //Resets values when user cancels changes
  const resetValues = () => {
    setAchieve(oldachieve)
    setBios(oldbios)
    setEdit(false)
  }

  //Turns on editor
  const switchstateT = () => {
    setEdit(true)
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

    button = <Button onClick={resetValues}>Cancel</Button>

    submit = <Button onClick={handleSubmit}> Save </Button>
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
