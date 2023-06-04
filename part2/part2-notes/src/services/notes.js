import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes' // frontend standalone
const baseUrl = '/api/notes' // connected front and backend

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const exports = {
  getAll: getAll,
  create: create,
  update: update
}
export default exports