import React from 'react'
import { Card, Button, ButtonGroup, Image } from 'react-bootstrap'
import upvoteImage from '../images/upvote.png'
import downvoteImage from '../images/downvote.png'

const Idea = () => {
  return (
    <div className='mt-4 mb-4 d-flex justify-content-between'>
      <div className='mt-1 mr-1'>
        {/* =============UPVOTE/DOWNVOTE============ */}
        <ButtonGroup vertical>
          <Button variant='link'>
            <img src={upvoteImage} width='30' height='30' />
          </Button>
          <div className='col text-center'>
            <h5>51</h5>
          </div>
          <Button variant='link'>
            <img src={downvoteImage} width='30' height='30' />
          </Button>
        </ButtonGroup>
      </div>
      <Card border='primary'>
        {/* =============TITLE AND DATE============ */}
        <Card.Header>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>Idea Plaza</h5>
            <p>03/14/2021</p>
          </div>
        </Card.Header>
        {/* =============DESCRIPTION AND AUTHOR============ */}
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
          <div className='d-flex justify-content-between'>
            <Button variant='primary'>Go to the idea page</Button>
            <p>author: Jonathan Joestar</p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Idea
