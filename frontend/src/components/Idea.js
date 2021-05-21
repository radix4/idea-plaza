import React, { useState } from 'react'
import { Card, Button, ButtonGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Notification from './Notification'

const Idea = ({ idea }) => {
	let upVote = idea.upVote
	let downVote = idea.downVote
	const [errorMessage, setErrorMessage] = useState(null)

	/* initially idea vote state is neutral */
	const [neutral, setNeutral] = useState(true)
	const [upVoted, setUpVoted] = useState(false)
	const [downVoted, setDownVoted] = useState(false)

	const upVoteStyle = {
		marginBottom: '30px',
		color: upVoted ? 'black' : '',
	}

	const downVoteStyle = {
		color: downVoted ? 'black' : '',
	}

	const authorStyle = {
		color: '#2b7a98',
	}

	/* Handles upvoting. If user is logged in, and idea has not yet been
  upvoted, increments idea's upvote by 1 */
	const handleUpVote = async () => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')

		if (!loggedUserJSON) {
			setErrorMessage('Oh no! You must be logged in to vote on ideas.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			return
		}

		if (upVoted) return

		try {
			await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'upVote' })
			setUpVoted(true)
			if (downVoted) {
				await axios.post(`/api/ideas/${idea.id}/ratingDown`, {
					type: 'downVote',
				})
				setDownVoted(false)
			}
		} catch (error) {
			console.log('upvote error')
		}
	}

	/* Handles upvoting. If user is logged in, and idea has not yet been
  downvoted, increments idea's downvote by 1 */
	const handleDownVote = async () => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser')

		if (!loggedUserJSON) {
			setErrorMessage('Oh no! You must be logged in to vote on ideas.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
			return
		}
		if (downVoted) return

		try {
			await axios.post(`/api/ideas/${idea.id}/rating`, { type: 'downVote' })
			setDownVoted(true)

			if (upVoted) {
				await axios.post(`/api/ideas/${idea.id}/ratingDown`, {
					type: 'upVote',
				})
				setUpVoted(false)
			}
		} catch (error) {
			console.log('down vote error')
		}
	}

	const displayUpVote = () => {
		if (upVoted) upVote++

		return upVote
	}

	const displayDownVote = () => {
		if (downVoted) downVote++

		return downVote
	}

	return (
		<div className='mt-4 mb-4 d-flex justify-content-between'>
			<div className='mt-1 mr-1'>
				{/* =============UPVOTE/DOWNVOTE============ */}
				<Button
					className='fa fa-thumbs-up thumbs-up-button'
					style={upVoteStyle}
					onClick={handleUpVote}>
					{' ' + displayUpVote()}
				</Button>
				<Button
					variant='danger'
					className='fa fa-thumbs-down thumbs-down-button'
					style={downVoteStyle}
					onClick={handleDownVote}>
					{' ' + displayDownVote()}
				</Button>
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
