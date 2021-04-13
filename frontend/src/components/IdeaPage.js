import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Container, Button, Form, Table } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import upvoteActiveImage from '../images/upvote_active.png'
import downvoteActiveImage from '../images/downvote_active.png'
import commentService from '../services/comments'
import axios from 'axios'

const styles = {
  circle: {
    backgroundColor: 'black',
    borderRadius: '50%',
    height: 100,
    width: 100,
  },
  buttonRight: {
    float: 'right',
    fontSize: 14,
  },
  votingButton: {
    float: 'left',
    padding: 10,
  },
}

const IdeaPage = () => {
  const { ideaID } = useParams()

  // Define placeholders to be displayed until idea is retrieved
  const [ideaInfo, setIdeaInfo] = useState({
    title: 'Loading title...',
    problemStatement: {
      domain: '',
      stateOfTheArt: '',
      solution: '',
    },
    author: 'loading...',
    upVote: undefined,
    downVote: undefined,
    questions: [],
    criticisms: [],
    user: 'loading',
  })
  const [content, setContent] = useState('')
  //const [questions, setQuestions] = useState('')
  // const [replies, setReplies] = useState('')

  // useEffect() is similar to componentDidMount()
  useEffect(() => {
    async function func() {
      try {
        const ideaResult = await axios.get(`/api/ideas/${ideaID}`)
        const authorResult = await axios.get(
          `/api/users/${ideaResult.data.user}`
        )

        setIdeaInfo({
          ...ideaResult.data,
          user: authorResult.data.id,
        })
      } catch (error) {
        console.log('error fetching idea info:', error.response || error)
        // Update title on page
        setIdeaInfo({
          ...ideaInfo,
          title: 'Idea Not Found',
        })
      }
    }

    func()
  }, [])

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const addQuestion = async (event, type) => {
    event.preventDefault()
    document.querySelectorAll('button[type=submit]').forEach((elem) => {
      elem.disabled = true
    })

    const newQuestion = {
      type: 'question',
      content: content,
      idea: ideaID,
    }

    try {
      await commentService.create(newQuestion)
      console.log('addQuestion')
      window.location.reload()
    } catch (error) {
      console.log('Create question fail\n', error.response || error)
      document.querySelectorAll('button[type=submit]').forEach((elem) => {
        elem.disabled = false
      })
    }
  }

  const addCriticism = async (event, type) => {
    event.preventDefault()
    document.querySelectorAll('button[type=submit]').forEach((elem) => {
      elem.disabled = true
    })

    const newCriticism = {
      type: 'criticism',
      content: content,
      idea: ideaID,
    }

    try {
      await commentService.create(newCriticism)

      window.location.reload()
    } catch (error) {
      console.log('Create criticism fail\n', error.response || error)
      document.querySelectorAll('button[type=submit]').forEach((elem) => {
        elem.disabled = false
      })
    }
  }

  const addRating = async (event, type) => {
    event.preventDefault()

    try {
      await axios.post(`/api/ideas/${ideaID}/rating`, { type: type })
      window.location.reload()
    } catch (error) {
      console.log('Send rating fail\n', error.response || error)
    }
  }

  return (
    <Container className='mt-5 pt-5'>
      <MyNavbar />
      {/* Top row */}
      <Row>
        <Col md={8}>
          {/* =================IDEA================ */}
          <Card>
            <Card.Header as='h2'>
              {ideaInfo.title}{' '}
              <Button type='submit' size='sm' style={styles.buttonRight}>
                Edit idea
              </Button>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <b>Domain</b>: {ideaInfo.problemStatement.domain}
              </Card.Text>
              <Card.Text>
                <b>State of the art</b>:{' '}
                {ideaInfo.problemStatement.stateOfTheArt}
              </Card.Text>
              <Card.Text>
                <b>Solution</b>: {ideaInfo.problemStatement.solution}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          {/* =============POPULARITY============ */}
          <Card>
            <Card.Header>Popularity</Card.Header>
            <Card.Body>
              <div className='col text-center'>
                <div className='row mb-1'>
                  <Button
                    variant='link'
                    onClick={(e) => addRating(e, 'upVote')}>
                    <img src={upvoteActiveImage} width='30' height='30' />
                  </Button>
                  <h6 className='mt-3'>{ideaInfo.upVote || '--'}</h6>
                </div>
                <div className='row mb-1'>
                  <Button
                    variant='link'
                    onClick={(e) => addRating(e, 'downVote')}>
                    <img src={downvoteActiveImage} width='30' height='30' />
                  </Button>
                  <h6 className='mt-2'>{ideaInfo.downVote || '--'}</h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* =============AUTHOR============ */}
        <Col md={2}>
          <div style={styles.circle} className='mb-3'></div>
          <Card>
            <Card.Header>Author</Card.Header>
            <Card.Body>
              <a href={'/profile/' + ideaInfo.user}>{ideaInfo.author}</a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      {/* Bottom row */}
      <Row>
        <Col md={6}>
          {/* =============QUESTIONS============ */}
          <Card>
            <Card.Header> Questions</Card.Header>
            <Card.Body>
              <Form id='question' onSubmit={(e) => addQuestion(e, 'question')}>
                <Form.Group
                  as={Row}
                  controlId='content'
                  onChange={handleContentChange}>
                  <Col md={9}>
                    <Form.Control type='text' placeholder='Content...' />
                  </Col>
                  <Col>
                    <Button type='submit' size='sm' style={styles.buttonRight}>
                      Add question
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
              <Table bordered hover>
                <tbody>
                  {ideaInfo.questions.map((question, index) => (
                    <tr key={index}>
                      <td>{question} </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* =============CRITICISM============ */}
          <Card>
            <Card.Header> Criticisms</Card.Header>
            <Card.Body>
              <Form
                id='criticism'
                onSubmit={(e) => addCriticism(e, 'criticism')}>
                <Form.Group
                  as={Row}
                  controlId='content'
                  onChange={handleContentChange}>
                  <Col md={9}>
                    <Form.Control type='text' placeholder='Content...' />
                  </Col>
                  <Col>
                    <Button type='submit' size='sm' style={styles.buttonRight}>
                      Add criticism
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
              <Table bordered hover>
                <tbody>
                  {ideaInfo.criticisms.map((criticism, index) => (
                    <tr key={index}>
                      <td>{criticism}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IdeaPage
