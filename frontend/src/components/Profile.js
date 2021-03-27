import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import AllProjects from './AllProjects'
import profileImage from '../images/background.png'
import MyNavbar from './MyNavbar'

const Profile = () => {
  const [name, setName] = useState('Allen Baek')
  const [bios, setBios] = useState('My bios')
  const [achieve, setAchieve] = useState('My achievements')

  // Styles

  //Placeholder for Navigation bar
  const box = {
    float: 'left',
    height: '80px',
    width: '100%',
    marginBottom: '15px',
    clear: 'both',

    backgroundColor: '#2b7a98',
  }

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
    top: '50px',
    left: '100px',
  }
  // edits profile picture
  const clip = {
    position: 'absolute',
    clipPath: 'circle(40%)',
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
    <div style={scrolling}>
      {/* Navbar*/}
      <MyNavbar />
      {/* Button */}
      <div style={EditPlacement}>
        <Button>Edit</Button>
      </div>
      {/* ProfileImage */}
      <div style={container}>
        <img src={profileImage} alt='Image_file' style={clip} />
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
    </div>
  )
}

export default Profile
