import React from 'react'
import { Card, Button, ButtonGroup, Image } from 'react-bootstrap'
import upvoteImage from '../images/upvote.png'
import downvoteImage from '../images/downvote.png'

const Idea = ({ idea }) => {
  const voteStyle = {
    width: '30px',
    height: '30px',
  }

  return (
    <div className='mt-4 mb-4 d-flex justify-content-between'>
      <div className='mt-1 mr-1'>
        {/* =============UPVOTE/DOWNVOTE============ */}
        <ButtonGroup vertical>
          <Button variant='link'>
            {/* <Image style={voteStyle} src={upvoteImage}></Image> */}

            <img src={upvoteImage} width='30' height='30' />
          </Button>
          <div className='col text-center'>
            <h5>{idea.upVote - idea.downVote}</h5>
          </div>
          <Button variant='link'>
            {/* <Image style={voteStyle} src={downvoteImage}></Image> */}
            <img src={downvoteImage} width='30' height='30' />
          </Button>
        </ButtonGroup>
      </div>

      <Card border='primary'>
        {/* =============TITLE AND DATE============ */}
        <Card.Header>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>{idea.title}</h5>
            <p>04/20/2021</p>
          </div>
        </Card.Header>
        {/* =============DESCRIPTION AND AUTHOR============ */}
        <Card.Body>
          <Card.Text>{idea.problemStatement.domain}</Card.Text>
          <div className='d-flex justify-content-between'>
            <p>
              <b>Author</b>: {idea.author}
            </p>
          </div>

          <Button variant='primary'>Go to the idea page</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Idea
