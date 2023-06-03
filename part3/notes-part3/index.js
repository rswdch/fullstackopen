const express = require("express");
let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

const app = express();
app.use(express.json());
// Log every request
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

// Express Routes
app.get("/", (request, response) => {
  response.send(
    "<h1>Hello World!</h1><a href=/api/notes>Notes</a><br><a href=/404>404</a>"
  );
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });
  response.json(note);
});

// POST Logic
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  // Validation
  if (!request.body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    id: generateId(),
  };
  notes = notes.concat(note);
  response.json(note);
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
