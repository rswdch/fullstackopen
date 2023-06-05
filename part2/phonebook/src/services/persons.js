import axios from 'axios';
const baseUrl = "/api/persons";

// function getAll(){
//   const request = axios.get(baseUrl);
//   return request.then(response => response.data);
// }
async function getAll(){
  const request = await axios.get(baseUrl);
  return request.data;
}

async function create(newPerson){
  const request = await axios.post(baseUrl, newPerson)
  return request.data;
}

async function remove(id){
  // Exercise 3.4 was skipped
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data;
}

export default {
  getAll,
  create,
  remove,
}
