/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = '/api/ideas'

/* This function creates a new idea. */
const create = async (newIdeaObject) => {
  /* header is given as 3rd param of axios post method */
  const response = await axios.post(baseUrl, newIdeaObject)
  return response.data
}

export default { create }
