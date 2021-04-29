import React, { useState, useEffect } from 'react'
import { Card, Button, ButtonGroup, Image } from 'react-bootstrap'
import upvoteImage from '../images/upvote.png'
import downvoteImage from '../images/downvote.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Idea = ({ idea }) => {
  const [vote, setVote] = useState(idea.upVote - idea.downVote)

  const voteStyle = {
    width: '30px',
    height: '30px',
  }
  const authorStyle = {
    color: '#2b7a98',
  }

  const handleUpVote = async () => {
    try {
      await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'upVote' })
      setVote(vote + 1)
    } catch (error) {
      console.log('upvote error')
    }
  }

  const handleDownVote = async () => {
    try {
      await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'downVote' })
      setVote(vote - 1)
    } catch (error) {
      console.log('down vote error')
    }
  }

  return (
    <div className='mt-4 mb-4 d-flex justify-content-between'>
      <div className='mt-1 mr-1'>
        {/* =============UPVOTE/DOWNVOTE============ */}
        <ButtonGroup vertical>
          {/* === upvote === */}
          <Button variant='link' onClick={handleUpVote}>
            <Image style={voteStyle} src={upvoteImage}></Image>
          </Button>

          {/* === vote display === */}
          <div className='col text-center'>
            <h5>{vote}</h5>
          </div>

          {/* === downvote === */}
          <Button variant='link' onClick={handleDownVote}>
            <Image style={voteStyle} src={downvoteImage}></Image>
          </Button>
        </ButtonGroup>
      </div>

      <Card border='info' style={{ width: '100%' }}>
        {/* =============TITLE AND DATE============ */}
        <Card.Header>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>{idea.title}</h5>
            <p>Created on: {idea.date.substring(0, 10)}</p>
          </div>
        </Card.Header>
        {/* =============DESCRIPTION AND AUTHOR============ */}
        <Card.Body>
          <Card.Text>{idea.problemStatement.domain}</Card.Text>
          <div className='d-flex justify-content-between'>
            <p>
              <Link to={'/profile/' + idea.user} style={authorStyle}>
                <b>Author</b>: {idea.author}
              </Link>
            </p>
            <p>
              <b>Category:</b> {idea.category}
            </p>
          </div>
          <Link to={'/ideapage/' + idea.id}>
            <Button variant='info'>Go to the idea page</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Idea
