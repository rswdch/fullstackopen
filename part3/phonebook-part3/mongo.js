const mongoose = require('mongoose');
const dbname = 'phonebookApp';

// Connect to database
if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}
let password = process.argv[2];
const url =
    `mongodb+srv://fullstack:${password}@fsodb.atiewsu.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model("Person", personSchema);

// Fetch all entries
// Warning: async code follows
if (process.argv.length < 4) {
    console.log('phonebook')
    Person.find({}).then(result => {
        for (let person of result) console.log(`${person.name} ${person.number}`);
        mongoose.connection.close();
        process.exit()
    });
}
else {
    // Create new entry
    const newName = process.argv[3];
    const newNumber = process.argv[4];

    const person = new Person({
        name: newName,
        number: newNumber,
    })

    person.save().then(result => {
        console.log(`Added ${newName} ${newNumber} to phonebook`);
        mongoose.connection.close();
    })

}