import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SeniorTeamPost = ({ seniorTeamPost }) => {
  const authorStyle = {
    color: '#2b7a98',
  }

  return (
    <div className='mt-4 mb-4 d-flex justify-content-between'>
      <Card border='info' style={{ width: '100%' }}>
        {/* =============TITLE AND DATE============ */}
        <Card.Header>
          <div className='d-flex align-items-center justify-content-between'>
            <h5>{seniorTeamPost.title}</h5>
            <p>Created on: {seniorTeamPost.date.substring(0, 10)}</p>
          </div>
        </Card.Header>
        {/* =============DESCRIPTION AND AUTHOR============ */}
        <Card.Body>
          <Card.Text>
            <b>Major</b>: {seniorTeamPost.major}
          </Card.Text>
          <Card.Text>
            <b>Technologies</b>: {seniorTeamPost.technologies}
          </Card.Text>
          <Card.Text>
            <b>Strengths</b>: {seniorTeamPost.strengths}
          </Card.Text>
          <Card.Text>
            <b>Weaknesses</b>: {seniorTeamPost.weaknesses}
          </Card.Text>

          <div className='d-flex justify-content-between'>
            <p>
              <Link to={'/profile/' + seniorTeamPost.user} style={authorStyle}>
                <b>Author</b>: {seniorTeamPost.author}
              </Link>
            </p>
            <p></p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default SeniorTeamPost
