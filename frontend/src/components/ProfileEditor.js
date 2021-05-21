import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import BioAchieve from './BioAchieve'
import ContactInfo from './ContactInfo'
import MyNavbar from './MyNavbar'
import { useHistory } from 'react-router'

const ProfileEditor = () => {
  const [page, setPage] = useState(<BioAchieve />)
  const [id, setID] = useState()

  useEffect(() => {
    //User ID From Params

    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setID(user.id)
    }
  }, [])

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
    left: '75px',
    top: '300px',
  }
  // Switches between functions between BioAchieve and ContactInfo
  const goBioAchieve = () => {
    setPage(<BioAchieve />)
  }

  const goContactInfo = () => {
    setPage(<ContactInfo />)
  }
  // Goes to Profile page
  const goProfile = () => {
    history.push(`/Profile/${id}`)
  }

  return (
    <Container fluid style={scrolling}>
      {/* Navbar*/}
      <MyNavbar onHomePage={false} />
      {/* For buttons on the left */}
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
