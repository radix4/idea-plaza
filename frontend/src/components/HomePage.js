import { Button, Form, Card } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Idea from './Idea'
import MyNavbar from './MyNavbar'
import axios from 'axios'
import ideaService from '../services/ideas'

const HomePage = () => {
  const [title, setTitle] = useState('')
  const [problemStatement, setProblemStatement] = useState({
    domain: '',
    stateOfTheArt: '',
    solution: '',
  })
  const [author, setAuthor] = useState('')
  const [upVote, setUpVote] = useState(0)
  const [downVote, setDownVote] = useState(0)
  const [questions, setQuestions] = useState()
  const [criticisms, setCriticisms] = useState()
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

  /* OnChange event functions for creating idea */
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleProblemStatementChange = (event) =>
    setProblemStatement(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)

  /* This function adds creates a new idea */
  const addIdea = async (event) => {
    event.preventDefault()

    const newIdea = {
      title: title,
      problemStatement: problemStatement,
      author: author,
      upVote: upVote,
      downVote: downVote,
      questions: questions,
      criticisms: criticisms,
      user: user,
    }

    try {
      await ideaService.create(newIdea).then((returnedIdea) => {
        console.log('create idea success!')
      })
      setTitle('')
      setProblemStatement()
    } catch (error) {
      console.log('create idea failed\n', error)
    }
  }

  return (
    <div>
      <MyNavbar />
      <div className='d-flex justify-content-between mt-4 pt-4 pl-5 ml-5 pr-4'>
        <div className='p-2 pr-4'>
          {/* ============= CREATE NEW IDEA ============= */}
          <Form className='border mt-4 p-3 border-info' onSubmit={addIdea}>
            <Form.Group controlId='formTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter the title of your idea'
                value={title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId='formDomain'>
              <Form.Label>Problem Domain</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter the domain of your idea'
                value={problemStatement.domain}
                onChange={handleProblemStatementChange}
              />
            </Form.Group>
            <Form.Group controlId='formStateOfTheArt'>
              <Form.Label>State of the Art</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter the state of the art'
                value={problemStatement.stateOfTheArt}
                onChange={handleProblemStatementChange}
              />
            </Form.Group>
            <Form.Group controlId='formSolution'>
              <Form.Label>Solution</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter the solution'
                value={problemStatement.solution}
                onChange={handleProblemStatementChange}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Post Your Idea
            </Button>
          </Form>

          {/* <Button variant='primary' className='btn-block mt-4'>
            Create New Idea
          </Button> */}

          {/* ============= IDEAS ============= */}

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
