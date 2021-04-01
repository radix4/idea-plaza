/* This file is responsible for sending requests to the server */
import axios from 'axios'
const baseUrl = '/api/users'

/* This method creates a new user. */
const create = async (newUserObject) => {
  /* header is given as 3rd param of axios post method */
  const response = await axios.post(baseUrl, newUserObject)
  return response.data
}

export default { create }
