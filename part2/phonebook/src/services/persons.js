import axios from 'axios';
const baseUrl = "http://localhost:3001/persons";

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

}

export default {
  getAll,
  create,
}
