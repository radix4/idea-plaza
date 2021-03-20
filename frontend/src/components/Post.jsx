import React from 'react'
import { Card, Button } from 'react-bootstrap'

const Post = () => {
  return (
    <div class='mt-4 mb-4'>
      <Card border='primary'>
        <Card.Header>
          <div class='d-flex align-items-center justify-content-between'>
            <h4>Idea Plaza</h4>
            <p>03/14/2021</p>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            A very cool Reddit-like website for posting startup/project ideas.
            Now, here me out, cause this project is definitely gonna get an A.
            OK, so Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of . . .
          </Card.Text>
          <div class='d-flex justify-content-between'>
            <Button variant='primary'>Go to the idea page</Button>
            <p>author: Jonathan Joestar</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Post
