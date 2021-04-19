import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import BioAchieve from './BioAchieve'
import ContactInfo from './ContactInfo'
import Password from './Password'
import MyNavbar from './MyNavbar'

const ProfileEditor = () => {
  const [page, setPage] = useState(<BioAchieve />)
  const [user, setUser] = useState()

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('front/component/HomePage.js: logged in user found', user)
    }
  }, [])

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
    setPage(<BioAchieve user={user} />)
  }

  const goContactInfo = () => {
    setPage(<ContactInfo />)
  }

  const goPassword = () => {
    setPage(<Password />)
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
        <Button onClick={goPassword}>Change Password</Button>
      </a>

      {/* Display different states */}
      {page}
    </Container>
  )
}

export default ProfileEditor
