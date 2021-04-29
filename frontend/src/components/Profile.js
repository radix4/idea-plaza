import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Idea from './Idea'
import profileImage from '../images/DefaultE.jpg'
import MyNavbar from './MyNavbar'
import axios from 'axios'
import { useHistory } from 'react-router'
import ideaService from '../services/ideas'

const Profile = () => {
  const { ideaID } = useParams()

  //Display data from user
  const [bios, setBios] = useState()
  const [achieve, setAchieve] = useState()
  const [user, setUser] = useState()

  //Display Idea
  const [ideas, setIdeas] = useState([])

  // Data From NavBar
  const [first, setFirst] = useState()
  const [last, setLast] = useState()
  const [id, setId] = useState()

  //load page
  const [loading, setLoading] = useState(true)

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

          setId(request.data.id)

          setBios(request.data.biography)
          setAchieve(request.data.achievements)

          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  /* This function gets all ideas */
  useEffect(() => {
    ideaService.getAll().then((ideas) => {
      setIdeas(ideas)
      console.log('ideas: ', ideas)
    })
  }, [])

  // Styles ----------

  /* display bios.. */
  const display = {
    position: 'absolute',

    top: '60%',
    left: '20%',
    width: '250px',

    transform: 'translate(-50%, -50%)',
  }

  /* for profile, need fix on card size */
  const cardPlacement = {
    position: 'absolute',

    top: '15%',
    left: '40%',
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

  if (loading) {
    return <div>Loading...</div>
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
        {ideas.map((idea, i) => (
          <Idea key={i} idea={idea} />
        ))}
      </div>
    </Container>
  )
}

export default Profile
