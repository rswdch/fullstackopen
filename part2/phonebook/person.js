import axios from 'axios';
const baseUrl = "https://localhost:3001/persons";

function getAll(){
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

function create(){

}

export default {
  getAll,
  create,
}
