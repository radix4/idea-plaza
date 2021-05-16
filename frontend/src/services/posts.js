/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = '/api/seniorPosts'

/* This function creates a new idea. */
const create = async (newPost) => {
  const response = await axios.post(baseUrl, newPost)
  return response.data
}

/* This function renders all ideas*/
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { create, getAll }
