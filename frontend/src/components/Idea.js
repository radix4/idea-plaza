import React, { useState } from 'react'
import { Card, Button, ButtonGroup, Image } from 'react-bootstrap'
import upvoteImage from '../images/upvote.png'
import downvoteImage from '../images/downvote.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Notification from './Notification'

const Idea = ({ idea }) => {
  const [vote, setVote] = useState(idea.upVote - idea.downVote)
  const [errorMessage, setErrorMessage] = useState(null)

  /* initially idea vote state is neutral */
  const [neutral, setNeutral] = useState(true)
  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setDownVoted] = useState(false)

  const upVoteStyle = {
    width: '30px',
    height: '30px',
    filter: upVoted ? 'invert(100%)' : 'none',
  }

  const downVoteStyle = {
    width: '30px',
    height: '30px',
    filter: downVoted ? 'invert(100%)' : 'none',
  }

  const authorStyle = {
    color: '#2b7a98',
  }

  const handleUpVote = async () => {
    if (!neutral && upVoted) {
      setErrorMessage('Error! You already up-voted this idea.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      return
    }

    try {
      await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'upVote' })

      if (downVoted) {
        setDownVoted(false)
        setNeutral(true)
      } else {
        setUpVoted(true)
        setNeutral(false)
      }

      setVote(vote + 1)
    } catch (error) {
      console.log('upvote error')
    }
  }

  const handleDownVote = async () => {
    if (!neutral && downVoted) {
      setErrorMessage('Error! You already down-voted this idea.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      return
    }

    try {
      await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'downVote' })

      if (upVoted) {
        setUpVoted(false)
        setNeutral(true)
      } else {
        setDownVoted(true)
        setNeutral(false)
      }

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
            <Image style={upVoteStyle} src={upvoteImage}></Image>
          </Button>

          {/* === vote display === */}
          <div className='col text-center'>
            <h5>{vote}</h5>
          </div>

          {/* === downvote === */}
          <Button variant='link' onClick={handleDownVote}>
            <Image style={downVoteStyle} src={downvoteImage}></Image>
          </Button>
        </ButtonGroup>
      </div>

      <Card border='info' style={{ width: '100%' }}>
        <Notification message={errorMessage} />
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
