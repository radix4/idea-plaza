/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = '/api/ideas'

/* This function creates a new idea. */
const create = async (newIdea) => {
  console.log('FE/ideas.js/create: ', newIdea)
  const response = await axios.post(baseUrl, newIdea)
  return response.data
}

/* This function renders all ideas*/
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
// Get user's Idea data by id
const getIdeas = async (id) => {
  console.log(id)

  const getId = {
    _id: id,
  }
  const response = await axios.post(`${baseUrl}/getUserIdea`, getId)
  return response.data
}

export default { create, getAll, getIdeas }
