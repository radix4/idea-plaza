/* This file is responsible for sending comments to the server */
import axios from 'axios'
const baseUrl = '/api/replys'

/* This method creates a new comment. */
const create = async (newReplyObject) => {
  console.log('services/replies.js create')
  /* header is given as 3rd param of axios post method */
  const response = await axios.post(baseUrl, newReplyObject)
  console.log('services/replies.js create + ' + response.data)
  return response.data
}

export default { create }
