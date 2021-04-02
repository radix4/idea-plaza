import React, { useState } from 'react'
import { Card, Row, Col, Container, Button, Form, Table } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import upvoteActiveImage from '../images/upvote_active.png'
import downvoteActiveImage from '../images/downvote_active.png'
import commentService from '../services/comments'

const styles = {
  circle: {
    backgroundColor: 'black',
    borderRadius: '50%',
    height: 100,
    width: 100,
  },
  buttonRight: {
    float: 'right',
    fontSize: 12,
  },
  votingButton: {
    float: 'left',
    padding: 10,
  },
}

const IdeaPage = () => {
  const [content, setContent] = useState('')
  const [replies, setReplies] = useState('')

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()

    const newComment = {
      content: content,
      replies: replies,
    }

    try {
      await commentService.create(newComment).then((returnedComment) => {
        console.log('create comment success!')
      })

      setContent('')
      setReplies('')

      // clear react bootstrap form
      //document.getElementById('create-user-form').reset()
    } catch (exception) {
      console.log('Create comment fail')
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
            {/* Will replace with actual title later */}
            <Card.Header as='h2'>Title of idea</Card.Header>
            <Card.Body>
              <Card.Text>
                This is where the description of the idea will go. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit. Mauris tortor leo,
                volutpat id ex sit amet, pretium lobortis lorem. Nunc mi nunc,
                mollis bibendum tincidunt ac, euismod et lorem. Donec ornare
                suscipit ex, at porttitor mauris ullamcorper a. Aliquam
                ullamcorper vestibulum ultricies. Nam at ornare turpis. In
                iaculis ex feugiat pulvinar feugiat. Donec ornare vel eros ut
                faucibus. Sed non orci at augue vehicula efficitur eget at
                magna.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          {/* =============POPULARITY============ */}
          <Card>
            <Card.Header> Popularity</Card.Header>
            <Card.Body>
              <div className='col text-center'>
                <div className='row mb-1'>
                  <Button variant='link'>
                    <img src={upvoteActiveImage} width='30' height='30' />
                  </Button>
                  <h6 className='mt-3'>420</h6>
                </div>
                <div className='row mb-1'>
                  <Button variant='link'>
                    <img src={downvoteActiveImage} width='30' height='30' />
                  </Button>
                  <h6 className='mt-2'>69</h6>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* =============AUTHOR============ */}
        <Col md={2}>
          <div style={styles.circle} className='mb-3'></div>
          <Card>
            <Card.Header>Bio</Card.Header>
            <Card.Body>Text</Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      {/* Bottom row */}
      <Row>
        <Col md={6}>
          {/* =============COMMENTS============ */}
          <Card>
            <Card.Header> Questions</Card.Header>
            <Card.Body>
              <Form id='question' onSubmit={addComment}>
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
                <Form.Group as={Row}></Form.Group>
              </Form>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td style={{ padding: 20 }}>new question</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new question</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new question</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new question</td>
                  </tr>{' '}
                </tbody>{' '}
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* =============CRITICISM============ */}
          <Card>
            <Card.Header> Criticisms</Card.Header>
            <Card.Body>
              <Form id='criticism' onSubmit={addComment}>
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
                <Form.Group as={Row}></Form.Group>
              </Form>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td style={{ padding: 20 }}>new criticism</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticism</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticism</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticism</td>
                  </tr>{' '}
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
