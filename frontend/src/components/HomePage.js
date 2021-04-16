import { Button, Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Idea from './Idea'
import MyNavbar from './MyNavbar'

const HomePage = () => {
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

  return (
    <div>
      <MyNavbar />
      <div className='d-flex justify-content-between mt-5 pt-4 pl-5 ml-5 pr-4'>
        {/* ============= IDEAS ============= */}
        <div className='p-2 pr-4'>
          <Button variant='primary' className='btn-block'>
            Create New Idea
          </Button>
          <Idea />
          <Idea />
        </div>
        {/* ============= SIDE TEXT ============= */}

        <Card style={{ width: '100rem' }} bg='info' text='light'>
          <Card.Body>
            <Card.Header>IdeaPlaza Statement</Card.Header>
            <br></br>
            <Card.Title>The Importance of Ideas</Card.Title>
            <Card.Text>
              The modern world is powered by ideas. Without ideas, change does
              not happen and no human progress is possible. The good thing is
              that humans are inherently creators of ideas, but the bad thing is
              that not all ideas get shared.
            </Card.Text>
            <br></br>
            <Card.Title>The Goal of IdeaPlaza</Card.Title>

            <Card.Text>
              The goal of IdeaPlaza is to bring great ideas together and make
              them a reality with constructive criticism. Ultimately, in the
              hope that with many more great ideas generated throughout the
              world, many major issues will be solved and the world will become
              a happier and healthier place.
            </Card.Text>
            <br></br>
            <Card.Title>What Makes IdeaPlaza Stood Out?</Card.Title>
            <Card.Text>
              IdeaPlaza avoids the current state of the art polarization by
              having a feature specifically for developers to offer constructive
              criticism, as well as a voting system on projects but not on
              comments.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default HomePage
