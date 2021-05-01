import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Idea from './Idea'
import profileImage from '../images/DefaultE.jpg'
import MyNavbar from './MyNavbar'
import { useHistory } from 'react-router'
import ideaService from '../services/ideas'
import userService from '../services/users'

const Profile = () => {
  const { ideaID } = useParams()

  //Display Idea
  const [ideas, setIdeas] = useState([])

  // Data From Params
  const [name, setName] = useState()
  const [bios, setBios] = useState()
  const [achieve, setAchieve] = useState()

  // Check User is the same as NavBar User (so they can edit their profile)
  const [editbutton, setEditButton] = useState()

  //load page
  const [loading, setLoading] = useState(true)

  // Redirect
  let history = useHistory()

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    //User ID From Params
    const getInfo = { id: ideaID }

    userService.getData(getInfo).then((res) => {
      setName(res.firstName + ' ' + res.lastName)
      setBios(res.biography)
      setAchieve(res.achievements)
      setLoading(false)
    })

    // Retrieve Ideas created from the user
    ideaService.getIdeas(ideaID).then((response) => {
      console.log(response)
      setIdeas(response)
    })

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // console.log('front/component/HomePage.js: logged in user found', user)
      // If the id from params is the same as the user in the NavBar, They should be able to edit their profile
      if (ideaID === user.id) {
        setEditButton(<Button onClick={goProfileEdit}>Edit Profile</Button>)
      }
    }
  }, [])

  // Styles ----------

  /* display bios.. */
  const display = {
    position: 'absolute',

    top: '650px',
    left: '300px',
    width: '250px',
    overflowWrap: 'break-word',

    transform: 'translate(-50%, -50%)',
  }

  /* for profile information */
  const cardPlacement = {
    position: 'absolute',

    top: '15%',
    left: '40%',
    width: '700px',
  }

  /* Location ProfilePic  */
  const container = {
    position: 'absolute',
    top: '100px',
    left: '150px',
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

  if (loading) {
    return <div></div>
  }

  return (
    <Container fluid style={scrolling}>
      {/* Navbar*/}
      <MyNavbar onHomePage={false} />

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
        <br />
        <div>{editbutton}</div>
      </div>
      {/* displays list of projects */}
      <div style={cardPlacement}>
        {ideas.map((idea, i) => (
          <Idea key={i} idea={idea} />
        ))}
      </div>
    </Container>
  )
}

export default Profile
