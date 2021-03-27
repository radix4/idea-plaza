import React from 'react'
import { Card, Row, Col, Container, Button, Table } from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import upvoteActiveImage from '../images/upvote_active.png'
import downvoteActiveImage from '../images/downvote_active.png'

const styles = {
  circle: {
    backgroundColor: 'black',
    borderRadius: '50%',
    height: 100,
    width: 100,
  },
  buttonRight: {
    float: 'right',
  },
  votingButton: {
    float: 'left',
    padding: 10,
  },
}

const IdeaPage = () => {
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
              {/* <Table striped borderless hover>
                <tr>
                  <td>
                    <Button variant='link'>
                      <img src={upvoteActiveImage} width='30' height='30' />
                    </Button>
                  </td>
                  <td>+++</td>
                </tr>
                <tr>
                  <td>
                    <Button variant='link'>
                      <img src={downvoteActiveImage} width='30' height='30' />
                    </Button>
                  </td>
                  <td>---</td>
                </tr>
              </Table> */}
              Images
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
            <Card.Header>
              {' '}
              Comments
              <Button style={styles.buttonRight} size='sm'>
                Add new comment
              </Button>
            </Card.Header>
            <Card.Body>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td style={{ padding: 20 }}>new comment</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new comment</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new comment</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new comment</td>
                  </tr>{' '}
                </tbody>{' '}
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* =============CRITICISM============ */}
          <Card>
            <Card.Header>
              {' '}
              Criticisim
              <Button style={styles.buttonRight} size='sm'>
                Add new criticisim
              </Button>
            </Card.Header>
            <Card.Body>
              <Table bordered hover>
                <tbody>
                  <tr>
                    <td style={{ padding: 20 }}>new criticisim</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticisim</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticisim</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 20 }}>new criticisim</td>
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
