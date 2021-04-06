/* This file is responsible for sending comments to the server */
import axios from 'axios'
const baseUrl = '/api/comments'

/* This method creates a new user. */
const create = async (newCommentObject) => {
  /* header is given as 3rd param of axios post method */
  const response = await axios.post(baseUrl, newCommentObject)
  return response.data
}

export default { create }
