import ReactDOM from "react-dom/client"
import axios from 'axios'

import App from "./App"

/* Fetching Examples */
// promise should fulfill since /notes exists
// const promise = axios.get('http://localhost:3001/notes')
// console.log(promise)
//
// // promise should reject since /foobar does not exist
// const promise2 = axios.get('http://localhost:3001/foobar')
//   .then((response) => console.log(response),
//     (response) => {
//     console.log('promise was rejected, next log is response');
//     console.log(response);
//       console.log("response was a stack trace");
//     })
// console.log(promise2)
// promise.then(response => {
//   console.log('promise was fulfilled, next log is response');
//   console.log(response)
// })

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
]

 ReactDOM.createRoot(document.getElementById("root")).render(
      <App notes={notes} />
)