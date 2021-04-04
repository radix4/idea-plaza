import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap'
import profileImage from '../images/background.png'
import BioAchieve from './BioAchieve'
import MyNavbar from './MyNavbar'

const ProfileEditor = () => {
  const [page, setPage] = useState('BioAch')

  const scrolling = {
    paddingBottom: 'auto',
    overflowY: 'scroll',
    /* Disables left scrolling */
    maxWidth: '100%',
    overflowX: 'hidden',
  }
  var thePage = 'hello'

  //Base Page edit Bio and Achievement
  if (page.localeCompare('BioArch')) {
    thePage = 'hello World'
  }

  return (
    <div style={scrolling}>
      {/* Navbar*/}
      <MyNavbar />

      <BioAchieve />
    </div>
  )
}

export default ProfileEditor
