import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import AllProjects from './AllProjects'
import profileImage from '../images/DefaultE.jpg'
import MyNavbar from './MyNavbar'

const Profile = () => {
  const [name, setName] = useState('Allen Baek')
  const [bios, setBios] = useState('My bios')
  const [achieve, setAchieve] = useState('My achievements')

  // Styles

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
    <Container fluid style={scrolling}>
      {/* Navbar*/}
      <MyNavbar />
      {/* Button */}
      <div style={EditPlacement}>
        <Button>Edit</Button>
      </div>
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
        <div style={{ fontSize: '40px' }}>{name}</div>

        <br />
        <div style={{ fontWeight: 'bold' }}>Bios</div>

        <div>{bios}</div>
        <br />
        <div style={{ fontWeight: 'bold' }}>Achievements</div>
        <div>{achieve}</div>
      </div>
      {/* displays list of projects */}
      <div style={cardPlacement}>
        <AllProjects />
      </div>
    </Container>
  )
}

export default Profile
