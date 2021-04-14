/* This file is responsible for sending comments to the server */
import axios from 'axios'
const baseUrl = '/api/comments'

/* This method creates a new comment. */
const create = async (newCommentObject) => {
  console.log('services/comments.js create')
  /* header is given as 3rd param of axios post method */
  const response = await axios.post(baseUrl, newCommentObject)
  console.log('services/comments.js create + ' + response.data)
  return response.data
}

export default { create }
