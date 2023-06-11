const mongoose = require("mongoose");
require("dotenv").config();

// Connect to database
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(url);

// Define model and schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});
// Format the _id field to match frond end
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
// Place Model assignment after format!!
const Person = mongoose.model("Person", personSchema);

// Fetch all entries
// Warning: async code follows
// if (process.argv.length < 4) {
//     console.log('phonebook')
//     Person.find({}).then(result => {
//         for (let person of result) console.log(`${person.name} ${person.number}`);
//         mongoose.connection.close();
//         process.exit()
//     });
// }
// else {
//     // Create new entry
//     const newName = process.argv[3];
//     const newNumber = process.argv[4];
//
//     const person = new Person({
//         name: newName,
//         number: newNumber,
//     })
//
//     person.save().then(result => {
//         console.log(`Added ${newName} ${newNumber} to phonebook`);
//         mongoose.connection.close();
//     })
// }

module.exports = Person;
