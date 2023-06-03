const express = require("express");
const morgan = require('morgan');
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Middleware
const app = express();
app.use(express.json());
// Custom Middleware
app.use(morgan('tiny', {
  skip: (req) => {
    return req.method === 'POST'
  }
}));
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :response-time ms :body', {
  skip: (req) => {
    return req.method !== 'POST'
  }
}))

// Express Routes
app.get("/", (request, response) => {
  response.send(
    `<h1>Hello World!</h1>
    <a href=/api/persons>View the phonebook</a><br>
    <a href=/404>404</a>`
  );
});

app.get("/info", (request, response) => {
  const body = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`;

  console.log(body);
  response.send(body);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  console.log("Getting Person");
  const id = Number(request.params.id);
  const person = persons.find((entry) => entry.id === id);
  if (!person) {
    return response.status(400).json({
      error: "person not found",
    });
  }
  response.json(person);
});

// DELETE Request
app.delete("/api/persons/:id", (request, response) =>{
  const id = Number(request.params.id);
  // Check if person exists. Not necessary but will return error if person does not exist.
  // const person = persons.find((entry) => entry.id === id);
  // if (!person) {
  //   return response.status(400).json({
  //     error: "person not found",
  //   });
  // }
  persons = persons.filter(entry => {
    return entry.id !== id;
  })
  response.json(persons);
})

// POST Request
const generateId = () => {
  return Math.round(Math.random() * 10000000);
}

app.post('/api/persons', (request, response) => {
  // Check that all fields are filled
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: "content missing",
    })
  }
  // check if person already exists
  if (persons.find((entry) => entry.name === request.body.name)){
    return response.status(400).json({
      error: "name must be unique",
    })
  }

  const newPerson = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number,
  }
  persons = persons.concat(newPerson);
  response.json(newPerson);
});

// 404 Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Start server
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
