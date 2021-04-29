import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Container,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  Table,
} from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import upvoteActiveImage from '../images/upvote_active.png'
import downvoteActiveImage from '../images/downvote_active.png'
import commentService from '../services/comments'
import repliesService from '../services/replies'
import Notification from './Notification'

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
    date: 'loading...',
    user: 'loading',
    category: 'loading...',
  })
  const [user, setUser] = useState()
  const [isAuthor, setIsAuthor] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [loggedInEmail, setLoggedInEmail] = useState()
  const [authorBriefBio, setAuthorBriefBio] = useState()
  const [content, setContent] = useState('')
  const [visible, setVisible] = useState(true)
  const [ratingErrorMessage, setRatingErrorMessage] = useState(null)
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState(null)

  // useEffect() is similar to componentDidMount()
  useEffect(() => {
    async function func() {
      const loggedUserJSON = window.localStorage.getItem('loggedInUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        console.log('user is ' + loggedUserJSON)

        setVisible(true)
        setUser(user)
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setLoggedInEmail(user.email)
        console.log('front/component/IdeaPage.js: visible', visible)
        console.log('front/component/IdeaPage.js: logged in user found', user)
        console.log('logged in email is ' + user.email)
        console.log('setEmailAddress is ' + loggedInEmail)
      } else {
        const user = JSON.parse(loggedUserJSON)
        setVisible(false)
        setIsAuthor(false)

        console.log('front/component/IdeaPage.js: visible', visible)
        console.log('front/component/IdeaPage.js: logged in user found', user)
      }

      try {
        const ideaResult = await axios.get(`/api/ideas/${ideaID}`)
        const authorResult = await axios.get(
          `/api/users/${ideaResult.data.user}`
        )
        const authorEmailAddress = authorResult.data.email
        const user = JSON.parse(loggedUserJSON)
        setIdeaInfo({
          ...ideaResult.data,
          user: authorResult.data.id,
        })
        setAuthorBriefBio(authorResult.data.biography.substring(0, 150) + '...')

        if (user) {
          if (authorEmailAddress === user.email) {
            console.log(
              'Author email: ' +
                authorEmailAddress +
                ' Logged in email: ' +
                user.email
            )
            console.log('before setting author: visible is ' + visible)
            console.log(firstName + ' ' + lastName + ' ' + user.email)
            setIsAuthor(true)
            console.log('email addresses are equal')
          } else {
            setIsAuthor(false)
          }
        }
      } catch (error) {
        window.location.replace('/')
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

  const editIdea = async (event) => {
    event.preventDefault()
    if (!visible) {
      setFeedbackErrorMessage(
        'Oh no! You must be logged in order to edit an idea!'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    } else if (!isAuthor) {
      setFeedbackErrorMessage(
        'Oh no! You must be the author of this idea in order to edit it!'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    }

    window.location.replace('/IdeaEditor/' + ideaInfo.id)
  }

  const deleteIdea = async (event) => {
    console.log(ideaID)
    event.preventDefault()
    if (!visible) {
      setFeedbackErrorMessage(
        'Oh no! You must be logged in order to delete an idea!'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    } else if (!isAuthor) {
      setFeedbackErrorMessage(
        'Oh no! You must be the author of this idea in order to delete it!'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    }
    if (
      window.confirm(
        'Do you want to delete this idea? This action cannot be undone.'
      ) == true
    ) {
      try {
        await axios.delete(`/api/ideas/${ideaID}`)
        await window.location.replace('/')
        alert('Idea successfully deleted')
      } catch (error) {
        console.log('Deleting idea failedn', error.response || error)
      }
    } else {
    }
  }

  const editButtonStyle = {
    float: 'right',
    fontSize: 16,
  }

  const deleteButtonStyle = {
    float: 'right',
    fontSize: 16,
  }

  const toolbarStyle = {
    float: 'right',
  }
  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const addComment = async (event, type) => {
    event.preventDefault()

    if (!visible) {
      setFeedbackErrorMessage(
        'Oh no! You must be logged in to leave a question or criticism.'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    }
    document.querySelectorAll('button[type=submit]').forEach((elem) => {
      elem.disabled = true
    })

    const newComment = {
      feedbackType: type,
      content: content,
      replies: [],
      author: firstName + ' ' + lastName,
      idea: ideaID,
    }

    try {
      await commentService.create(newComment)
      console.log('addComment')
      window.location.reload()
    } catch (error) {
      console.log('Create question fail\n', error.response || error)
      document.querySelectorAll('button[type=submit]').forEach((elem) => {
        elem.disabled = false
      })
    }
  }

  const addReply = async (event, commentID) => {
    event.preventDefault()

    if (!visible) {
      setFeedbackErrorMessage(
        'Oh no! You must be logged in to reply to a question or comment.'
      )
      setTimeout(() => {
        setFeedbackErrorMessage(null)
      }, 5000)
      return
    }
    document.querySelectorAll('button[type=submit]').forEach((elem) => {
      elem.disabled = true
    })

    const newReply = {
      content: content,
      comment: commentID,
      idea: ideaID,
      author: firstName + ' ' + lastName,
    }
    console.log('addReply comment: ' + commentID)

    try {
      await repliesService.create(newReply)

      window.location.reload()
    } catch (error) {
      console.log('Create reply fail\n', error.response || error)
      document.querySelectorAll('button[type=submit]').forEach((elem) => {
        elem.disabled = false
      })
    }
  }

  const addRating = async (event, type) => {
    event.preventDefault()

    if (!visible) {
      setRatingErrorMessage(
        'Oh no! You must be logged in to vote up or down on ideas.'
      )
      setTimeout(() => {
        setRatingErrorMessage(null)
      }, 5000)
      return
    }
    try {
      event.preventDefault()
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
            <Card.Header>
              <div className='d-flex align-items-center justify-content-between'>
                <h5>{ideaInfo.title}</h5>
                <p>Category: {ideaInfo.category}</p>
                <p>Created on: {ideaInfo.date.substring(0, 10)}</p>
              </div>
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
              <Card.Text>
                <ButtonToolbar style={toolbarStyle}>
                  <ButtonGroup className='mr-2'>
                    <Link to={`/IdeaEditor/${ideaInfo.id}`}>
                      <Button
                        id='editIdeaBtn'
                        size='sm'
                        variant='primary'
                        style={editButtonStyle}
                        onClick={editIdea}>
                        Edit idea
                      </Button>
                    </Link>{' '}
                  </ButtonGroup>
                  <ButtonGroup className='mr-2'>
                    <Button
                      id='deleteIdeaBtn'
                      size='sm'
                      variant='danger'
                      style={deleteButtonStyle}
                      onClick={deleteIdea}>
                      Delete idea
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          {/* =============POPULARITY============ */}
          <Notification message={ratingErrorMessage} />
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
              <Link to={`/profile/${ideaInfo.user}`}>
                <p>{ideaInfo.author}</p>
              </Link>
              <p>
                <b>Bio: </b> {authorBriefBio}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      {/* Bottom row */}

      <Notification message={feedbackErrorMessage} />

      <Row>
        <Col md={6}>
          {/* =============QUESTIONS============ */}
          <Card>
            <Card.Header> Questions</Card.Header>
            <Card.Body>
              <Form id='question' onSubmit={(e) => addComment(e, 'question')}>
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
                  {ideaInfo.questions.map((question) => (
                    <React.Fragment key={question.id}>
                      {/* Question */}
                      <tr>
                        <td width='75%'>{question.content}</td>
                        <td width='15%' style={{ fontSize: '.7rem' }}>
                          <b>{question.author}</b>
                        </td>
                      </tr>
                      {/* Replies */}
                      {question.replies.map((reply) => (
                        <tr key={reply.id}>
                          <td
                            width='25%'
                            style={{ paddingLeft: '40px', fontSize: '.8rem' }}>
                            {reply.content}
                          </td>
                          <td width='15%' style={{ fontSize: '.7rem' }}>
                            <b>{reply.author}</b>
                          </td>
                        </tr>
                      ))}
                      {/* Add reply */}
                      <tr>
                        <td width='10%' style={{ paddingLeft: '40px' }}>
                          <Form
                            id='reply-question'
                            onSubmit={(e) => addReply(e, question.id)}>
                            <Form.Group
                              as={Row}
                              className='mb-0'
                              controlId='content'
                              onChange={handleContentChange}>
                              <Col md={9}>
                                <Form.Control
                                  type='text'
                                  size='sm'
                                  placeholder='Content...'
                                />
                              </Col>
                              <Col>
                                <Button
                                  type='Submit'
                                  style={styles.buttonRight}>
                                  Reply
                                </Button>
                              </Col>
                            </Form.Group>
                          </Form>
                        </td>
                      </tr>
                    </React.Fragment>
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
              <Form id='criticism' onSubmit={(e) => addComment(e, 'criticism')}>
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
                  {ideaInfo.criticisms.map((criticism) => (
                    <React.Fragment key={criticism.id}>
                      {/* Criticism */}
                      <tr>
                        <td>{criticism.content}</td>
                        <td style={{ fontSize: '.7rem' }}>
                          <b>{criticism.author}</b>
                        </td>
                      </tr>
                      {/* Replies */}
                      {criticism.replies.map((reply) => (
                        <tr key={reply.id}>
                          <td
                            style={{ paddingLeft: '40px', fontSize: '.8rem' }}>
                            {reply.content}
                          </td>
                          <td style={{ fontSize: '.7rem' }}>
                            <b>{reply.author}</b>
                          </td>
                        </tr>
                      ))}
                      {/* Add reply */}
                      <tr>
                        <td style={{ paddingLeft: '40px' }}>
                          <Form
                            id='reply-question'
                            onSubmit={(e) => addReply(e, criticism.id)}>
                            <Form.Group
                              as={Row}
                              className='mb-0'
                              controlId='content'
                              onChange={handleContentChange}>
                              <Col sm={6}>
                                <Form.Control
                                  type='text'
                                  size='sm'
                                  placeholder='Content...'
                                />
                              </Col>
                              <Col>
                                <Button
                                  type='Submit'
                                  style={styles.buttonRight}>
                                  Reply
                                </Button>
                              </Col>
                            </Form.Group>
                          </Form>
                        </td>
                      </tr>
                    </React.Fragment>
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
