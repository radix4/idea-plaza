import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
	Card,
	Row,
	Col,
	Container,
	Button,
	Form,
	Table,
	InputGroup,
} from 'react-bootstrap'
import MyNavbar from './MyNavbar'
import commentService from '../services/comments'
import axios from 'axios'

const styles = {
	circle: {
		backgroundColor: 'black',
		borderRadius: '50%',
		height: 100,
		width: 100,
	},
	buttonRight: {
		float: 'right',
		fontSize: 14,
	},
	votingButton: {
		float: 'left',
		padding: 10,
	},
}

const IdeaEditor = () => {
	const { ideaID } = useParams()

	// Define placeholders to be displayed until idea is retrieved
	const [ideaInfo, setIdeaInfo] = useState({
		title: 'Loading title...',
		problemStatement: {
			domain: '',
			stateOfTheArt: '',
			solution: '',
		},
		author: 'loading...',
		user: 'loading',
	})
	const [content, setContent] = useState('')

	// useEffect() is similar to componentDidMount()
	useEffect(() => {
		async function func() {
			try {
				const ideaResult = await axios.get(`/api/ideas/${ideaID}`)
				const authorResult = await axios.get(`/api/users/${ideaResult.data.user}`)

				setIdeaInfo({
					...ideaResult.data,
					user: authorResult.data.id,
				})
				document.getElementById('idea-title').value = ideaResult.data.title
			} catch (error) {
				console.log('error fetching idea info:', error.response || error)
			}
		}

		func()
	}, [])

	const handleContentChange = (event) => {
		setContent(event.target.value)
	}

	const submitChanges = async (event) => {
		event.preventDefault()
		console.log(event.target[0])
		const target = event.target
		document.querySelectorAll('button[type=submit]').forEach((elem) => {
			elem.disabled = true
		})
		try {
			await axios.post(`/api/ideas/edit/${ideaID}`, {
				title: target.title.value,
				problemStatement: {
					domain: target.domain.value,
					stateOfTheArt: target.stateOfTheArt.value,
					solution: target.solution.value,
				},
			})
			window.location.href = `/IdeaPage/${ideaID}`
		} catch (error) {
			console.log('Save changes fail\n', error.response || error)
			document.querySelectorAll('button[type=submit]').forEach((elem) => {
				elem.disabled = false
			})
		}
	}

	return (
		<Container className='mt-5 pt-5'>
			<MyNavbar />
			{/* Top row */}
			<Row>
				<Col md={8}>
					{/* =================IDEA================ */}
					<Card>
						<Form id='edit' onSubmit={submitChanges}>
							<Form.Group onChange={handleContentChange}>
								<Card.Header as='h2'>
									<InputGroup>
										<Form.Control
											id='idea-title'
											name='title'
											type='text'
											placeholder='Idea Title'
											defaultValue={ideaInfo.title}
										/>
										<Button type='submit' size='sm' style={styles.buttonRight}>
											Save changes
										</Button>
									</InputGroup>
								</Card.Header>
								<Card.Body>
									<Card.Text>
										<b>Domain</b>:
										<Form.Control
											name='domain'
											type='text'
											placeholder='Content...'
											defaultValue={ideaInfo.problemStatement.domain}
										/>
									</Card.Text>
									<Card.Text>
										<b>State of the art</b>:
										<Form.Control
											name='stateOfTheArt'
											type='text'
											placeholder='Content...'
											defaultValue={ideaInfo.problemStatement.stateOfTheArt}
										/>
									</Card.Text>
									<Card.Text>
										<b>Solution</b>:
										<Form.Control
											name='solution'
											type='text'
											placeholder='Content...'
											defaultValue={ideaInfo.problemStatement.solution}
										/>
									</Card.Text>
								</Card.Body>
							</Form.Group>
						</Form>
					</Card>
				</Col>
				{/* =============AUTHOR============ */}
				<Col md={2}>
					<div style={styles.circle} className='mb-3'></div>
					<Card>
						<Card.Header>Author</Card.Header>
						<Card.Body>
							<p>{ideaInfo.author}</p>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default IdeaEditor
