import React from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'

const IdeaPage = () => {
  return (
    <Container>
      {/* Top row */}
      <Row fluid>
        <Col xs={8}>
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
        <Col>
          <Card>
            <Card.Header> Popularity</Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header> Bio</Card.Header>
          </Card>
        </Col>
      </Row>
      <br />
      {/* Bottom row */}
      <Row>
        <Col>
          <Card>
            <Card.Header> Comments</Card.Header>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Header> Criticism</Card.Header>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IdeaPage
