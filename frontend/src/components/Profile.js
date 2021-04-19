import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import AllProjects from './AllProjects'
import profileImage from '../images/DefaultE.jpg'
import MyNavbar from './MyNavbar'
import axios from 'axios'
import { useHistory } from 'react-router'

const Profile = () => {
  const [bios, setBios] = useState()
  const [achieve, setAchieve] = useState()
  const [user, setUser] = useState()
  // First and Last Name
  const [first, setFirst] = useState()
  const [last, setLast] = useState()

  // Redirect
  let history = useHistory()

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('front/component/HomePage.js: logged in user found', user)

      const getInfo = { email: user.email }

      axios
        .post('http://localhost:3001/api/users/getUser', getInfo)
        .then((request) => {
          console.log(request)
          setFirst(request.data.firstName)
          setLast(request.data.lastName)

          setBios(request.data.biography)
          setAchieve(request.data.achievements)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  // Styles ----------

  /* display bios.. */
  const display = {
    position: 'absolute',

    top: '60%',
    left: '25%',
    width: '400px',

    transform: 'translate(-50%, -50%)',
  }

  /* for profile, need fix on card size */
  const cardPlacement = {
    position: 'absolute',

    top: '50%',
    left: '30%',
    width: '700px',
  }

  /* Location ProfilePic  */
  const container = {
    position: 'absolute',
    top: '13%',
    left: '12%',
  }
  // edits profile picture
  const clip = {
    position: 'absolute',
    clipPath: 'circle(50%)',
  }

  const scrolling = {
    paddingBottom: 'auto',
    overflowY: 'scroll',
    /* Disables left scrolling */
    maxWidth: '100%',
    overflowX: 'hidden',
  }

  const goProfileEdit = () => {
    history.push('/ProfileEditor')
  }

  return (
    <Container fluid style={scrolling}>
      {/* Navbar*/}
      <MyNavbar />

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

      {/* Input fields */}
      <div style={display}>
        <div style={{ fontSize: '40px' }}>
          {first} {last}
        </div>

        <br />
        <div style={{ fontWeight: 'bold' }}>Bios</div>

        <div>{bios}</div>
        <br />
        <div style={{ fontWeight: 'bold' }}>Achievements</div>
        <div>{achieve}</div>
        <br />
        <div>
          <Button onClick={goProfileEdit}>Edit Profile</Button>
        </div>
      </div>
      {/* displays list of projects */}
      <div style={cardPlacement}>
        <AllProjects />
      </div>
    </Container>
  )
}

export default Profile
