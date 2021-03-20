import React from 'react'
import UpArrow from './uparrow.png'
import DownArrow from './downarrow.png'
import { Card, Row, Col, Container, Button, Table } from 'react-bootstrap'

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
    <Container>
      {/* Top row */}
      <Row>
        <Col md={8}>
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
          <Card>
            <Card.Header> Popularity</Card.Header>
            <Card.Body>
              <Table striped borderless hover>
                <tr>
                  <td>
                    <Button
                      img
                      src={UpArrow}
                      style={styles.votingButton}
                      size='sm'></Button>
                  </td>
                  <td>+++</td>
                </tr>
                <tr>
                  <td>
                    <Button
                      img
                      src={DownArrow}
                      style={styles.votingButton}
                      size='sm'></Button>
                  </td>
                  <td>---</td>
                </tr>
              </Table>
              Images
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <div style={styles.circle}></div>
          <Card>
            <Card.Header> Bio</Card.Header>
            <Card.Body>Text</Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
      {/* Bottom row */}
      <Row>
        <Col md={6}>
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
