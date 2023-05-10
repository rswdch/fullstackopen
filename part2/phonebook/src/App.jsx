import { useState } from "react";
import "./App.css";
import Filter from "./components/Filter.jsx";
import { Persons, PersonForm } from "./components/Persons.jsx";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filterText, setFilter] = useState("");

  function addPerson(event) {
    event.preventDefault();

    if (!newName || !newNum) {
      console.log("Nothing entered");
      return;
    }
    // check if name is in array already
    const isInArray = persons.some((person) => person.name === newName);
    if (isInArray) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    setPersons(() => {
      let newPersons = persons.concat({
        name: newName,
        number: newNum,
        id: persons.length,
      });
      setNewName("");
      setNewNum("");
      return newPersons;
    });
  }

  function handleNameChange(event) {
    // console.log("Handling name change");
    setNewName(event.target.value);
  }
  function handleNumChange(event) {
    // console.log("Handling number change");
    setNewNum(event.target.value);
  }
  function handleFilterChange(event) {
    const newFilterText = event.target.value.toLowerCase();
    setFilter(newFilterText);
  }

  const filteredEntries = filterText
    ? // if filterText is not empty
      // return person that contains filterText
      persons.filter((person) => {
        return (
          person.name.toLowerCase().includes(filterText) ||
          person.number.includes(filterText)
        );
      })
    : // else return the whole obj
      persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        objArr={persons}
        filterText={filterText}
        onChange={handleFilterChange}
      ></Filter>
      <h2>Add New Phonebook Entry</h2>
      <PersonForm
        name={newName}
        number={newNum}
        handleNameChange={handleNameChange}
        handleNumChange={handleNumChange}
        handleSubmission={addPerson}
      ></PersonForm>
      <h2>Phonebook Entries</h2>
      <Persons entries={filteredEntries} />
    </div>
  );
};

export default App;
