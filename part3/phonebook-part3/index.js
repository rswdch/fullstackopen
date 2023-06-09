const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/Person');
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

// Middleware
const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(cors()); // For development ports
// Custom Middleware
app.use(morgan('tiny', {
  skip: (req) => {
    return req.method === 'POST';
  }
}));
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :response-time ms :body', {
  skip: (req) => {
    return req.method !== 'POST';
  }
}));

// Express Routes
app.get('/info', (request, response) => {
  const body = `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date()}</p>`;

  console.log(body);
  response.send(body);
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  }).catch(error => next(error));
  // response.json(Person.find({})); // does not work
});

app.get('/api/persons/:id', (request, response, next) => {
  console.log('Getting Person');
  Person.findById(request.params.id)
    .then(foundPerson => {
      if (foundPerson) response.json(foundPerson);
      else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// DELETE Request
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  // Check if person exists. Not necessary but will return error if person does not exist.
  // const person = persons.find((entry) => entry.id === id);
  // if (!person) {
  //   return response.status(400).json({
  //     error: "person not found",
  //   });
  // }
  Person.findByIdAndRemove(id).then(result => {
    response.status(204).end();
  }).catch(error => next(error));
  // persons = persons.filter(entry => {
  //   return entry.id !== id;
  // });
  // response.json(persons);
});

// POST Request
// Posts a *new* person to database
// const generateId = () => {
//   return Math.round(Math.random() * 10000000);
// };
app.post('/api/persons', (request, response, next) => {
  // Check that all fields are filled -> Superseded by error handling middleware
  // if (!request.body.name || !request.body.number) {
  //   return response.status(400).json({
  //     error: 'content missing',
  //   });
  // }
  // check if person already exists

  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number,
  });
  newPerson.save().then(() => {
    console.log('New person added');
    response.json(newPerson);
  }).catch(error => next(error));

});

// PUT request
// Replaces the phone number of a person who is already in the database
app.put('/api/persons/:id', (request, response, next) => {
  const id = Number(request.params.id);
  const newPerson = {
    name: request.body.name,
    number: request.body.number
  };
  Person.findByIdAndUpdate(request.params.id, newPerson, { new: true })
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error));
});

// 404 Middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') { // MongoDB validation
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
// Error NEEDS TO BE last loaded middleware.
app.use(errorHandler);

// Start server
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
