import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import BioAchieve from './BioAchieve'
import ContactInfo from './ContactInfo'
import MyNavbar from './MyNavbar'
import axios from 'axios'
import { useHistory } from 'react-router'

const ProfileEditor = () => {
  const [bios, setBios] = useState()
  const [achieve, setAchieve] = useState()
  const [page, setPage] = useState()

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('front/component/HomePage.js: logged in user found', user)

      const getInfo = { email: user.email }

      axios
        .post('http://localhost:3001/api/users/getUser', getInfo)
        .then((request) => {
          console.log(request)
          setBios(request.data.biography)
          setAchieve(request.data.achievements)
          setPage(<BioAchieve bios={bios} achieve={achieve} />)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [bios, achieve])

  // Redirect
  let history = useHistory()

  //Style
  const scrolling = {
    paddingBottom: 'auto',
    overflowY: 'scroll',
    /* Disables left scrolling */
    maxWidth: '100%',
    overflowX: 'hidden',
  }

  const SelectionPos = {
    position: 'fixed',
    left: '10%',
    top: '30%',
  }

  const goBioAchieve = () => {
    setPage(<BioAchieve bios={bios} achieve={achieve} />)
  }

  const goContactInfo = () => {
    setPage(<ContactInfo />)
  }

  const goProfile = () => {
    history.push('/Profile')
  }

  return (
    <Container fluid style={scrolling}>
      {/* Navbar*/}
      <MyNavbar />

      <a style={SelectionPos}>
        <Button onClick={goBioAchieve}>
          View/Change Biography and Achievement
        </Button>
        <br />
        <br />
        <Button onClick={goContactInfo}>View Contact Info.</Button>
        <br />
        <br />
        <Button onClick={goProfile}>My Profile</Button>
      </a>

      {/* Display different states */}
      {page}
    </Container>
  )
}

export default ProfileEditor
