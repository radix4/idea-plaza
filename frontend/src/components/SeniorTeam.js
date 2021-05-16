import { Button, Form, Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import SeniorTeamPost from './SeniorTeamPost'
import MyNavbar from './MyNavbar'
import axios from 'axios'
import postService from '../services/posts'
import Notification from './Notification'

const HomePage = () => {
  /* User state */
  const [userID, setUserID] = useState()
  const [posts, setPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  /* Idea fields states */
  const [title, setTitle] = useState('')
  const [major, setMajor] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [strengths, setStrengths] = useState('')
  const [weaknesses, setWeaknesses] = useState('')
  const [author, setAuthor] = useState('')
  const [visible, setVisible] = useState(false)

  /* All state on change handlers */
  const handleTitleOnChange = (event) => setTitle(event.target.value)
  const handleMajorOnChange = (event) => setMajor(event.target.value)
  const handleTechnologiesOnChange = (event) =>
    setTechnologies(event.target.value)
  const handleStrengthsOnChange = (event) => setStrengths(event.target.value)
  const handleWeaknessesOnChange = (event) => setWeaknesses(event.target.value)

  const createIdeaFormStyle = {
    display: visible ? '' : 'none',
  }

  /* This function checks if the user is already logged in. */
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setAuthor(`${user.firstName} ${user.lastName}`)
      setVisible(true)
      console.log('front/component/HomePage.js: logged in user found', user)

      /* get user's ID */
      const getInfo = { email: user.email }
      axios
        .post('http://localhost:3001/api/users/getUser', getInfo)
        .then((request) => {
          console.log(request.data.id)
          setUserID(request.data.id)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  /* This function gets all posts */
  useEffect(() => {
    postService.getAll().then((posts) => {
      console.log('does this work?')
      setPosts(posts)
      console.log(posts)
    })
  }, [])

  /* This function handles create idea form upon submit. */
  const handleCreateIdea = async (event) => {
    event.preventDefault()

    if (
      title === '' ||
      major === '' ||
      technologies === '' ||
      strengths === '' ||
      weaknesses === ''
    ) {
      /* error message appears for 5s, then disappears */
      setErrorMessage('Oh no, fields cannot be empty! Please try again.')
      console.log('aaaaaa')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      return
    }

    const user = userID

    try {
      const post = await postService.create({
        title,
        major,
        technologies,
        strengths,
        weaknesses,
        author,
        user,
      })

      setPosts(posts.concat(post))
      document.getElementById('create-idea-form').reset()
    } catch (exception) {
      console.log('HomePage: fail to create idea')

      /* error message appears for 5s, then disappears */
      setErrorMessage('Error! Fail to create idea.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <MyNavbar onHomePage={false} />
      <div className='d-flex justify-content-between mt-4 pt-4 pl-5 ml-5 pr-4'>
        <div className='p-2 ml-5 pr-5 mr-5 w-75'>
          {/* ============= CREATE POST ============= */}

          <Form
            id='create-idea-form'
            className='border mt-4 p-3 w-100 border-info'
            onSubmit={handleCreateIdea}
            style={createIdeaFormStyle}>
            {/* ===== TITLE ===== */}
            <Notification message={errorMessage} />
            <Form.Group controlId='intention'>
              <Form.Label>
                Are you looking for team members or join a team?
              </Form.Label>
              <Form.Control type='text' onChange={handleTitleOnChange} />
            </Form.Group>

            {/* ===== MAJOR ===== */}
            <Form.Group controlId='major'>
              <Form.Label>What is your major?</Form.Label>
              <Form.Control as='textarea' onChange={handleMajorOnChange} />
            </Form.Group>

            {/* ===== TECHNOLOGIES ===== */}
            <Form.Group controlId='technologies'>
              <Form.Label>What technologies are you familiar with? </Form.Label>
              <Form.Control
                as='textarea'
                onChange={handleTechnologiesOnChange}
              />
            </Form.Group>

            {/* ===== STRENGTHS ===== */}
            <Form.Group controlId='strengths'>
              <Form.Label>What are your strengths?</Form.Label>
              <Form.Control as='textarea' onChange={handleStrengthsOnChange} />
            </Form.Group>

            {/* ===== WEAKNESSES ===== */}
            <Form.Group controlId='weaknesses'>
              <Form.Label>What are your weaknesses?</Form.Label>
              <Form.Control as='textarea' onChange={handleWeaknessesOnChange} />
            </Form.Group>

            {/* ===== BUTTON ===== */}
            <Button variant='info' type='submit'>
              Post
            </Button>
          </Form>

          {/* ============= DISPLAY ALL IDEAS ============= */}
          <div className='w-100'>
            {posts.map((post, i) => (
              <SeniorTeamPost key={i} seniorTeamPost={post} />
            ))}
          </div>
        </div>

        <div className='w-25 mt-4 p-2 pr-2'>
          {/* ============= SIDE TEXT ============= */}
          <Card bg='info' text='light' className='p-2'>
            <Card.Body>
              <Card.Header>IdeaPlaza Statement</Card.Header>
              <br></br>
              <Card.Title>The Importance of Ideas</Card.Title>
              <Card.Text>
                The modern world is powered by ideas. Without ideas, change does
                not happen and no human progress is possible. The good thing is
                that humans are inherently creators of ideas, but the bad thing
                is that not all ideas get shared.
              </Card.Text>
              <br></br>
              <Card.Title>The Goal of IdeaPlaza</Card.Title>

              <Card.Text>
                The goal of IdeaPlaza is to bring great ideas together and make
                them a reality with constructive criticism. Ultimately, in the
                hope that with many more great ideas generated throughout the
                world, many major issues will be solved and the world will
                become a happier and healthier place.
              </Card.Text>
              <br></br>
              <Card.Title>What Makes IdeaPlaza Stood Out?</Card.Title>
              <Card.Text>
                IdeaPlaza avoids the current state of the art polarization by
                having a feature specifically for developers to offer
                constructive criticism, as well as a voting system on projects
                but not on comments.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HomePage
