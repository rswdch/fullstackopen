const express = require("express");
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

const app = express();
app.use(express.json());

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
  console.log(person);
  if (!person) {
    return response.status(400).json({
      error: "person not found",
    });
  }
  response.json(person);
});

// Start server
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
