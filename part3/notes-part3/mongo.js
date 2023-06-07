const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// URL which defines Database
const url =
  `mongodb+srv://fullstack:${password}@fsodb.atiewsu.mongodb.net/noteApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)
// Schema which defines fields in a collection
// Schemas are a constructor function i.e. prototype
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
// Model which defines collections
const Note = mongoose.model('Note', noteSchema)
// Document
const note = new Note({
  content: 'This is my not important note',
  important: false,
})

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  for (let note of result) console.log(note);
  console.log('all notes fetched')
  mongoose.connection.close()
})
Note.find({important: false}).then(result => {
  for (let note of result) console.log(note);
  console.log('unimportant notes fetched')
  mongoose.connection.close()
})