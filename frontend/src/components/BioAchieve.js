import React, { useState, useEffect } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import profileImage from '../images/DefaultE.jpg'
import axios from 'axios'

const BioAchieve = () => {
  const [bios, setBios] = useState()
  const [achieve, setAchieve] = useState()
  const [edit, setEdit] = useState(false)
  const [oldbios, setOldBios] = useState()
  const [oldachieve, setOldAchieve] = useState()
  const [id, setId] = useState()

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

          // For Bios_Achieve
          setBios(request.data.biography)
          setAchieve(request.data.achievements)
          setId(request.data.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

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
    setOldAchieve(achieve)
    setOldBios(bios)

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
    left: '60%',
    width: '800px',

    transform: 'translate(-50%, -50%)',
  }

  /* Location ProfilePic  */
  const container = {
    position: 'fixed',
    top: '10%',
    left: '50%',
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
