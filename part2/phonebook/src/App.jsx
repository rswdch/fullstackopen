import { useState } from "react";
import "./App.css";

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
    setNewName(event.target.value);
  }
  function handleNumChange(event) {
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
      <form action="">
        <div>
          filter shown with{" "}
          <input type="text" value={filterText} onChange={handleFilterChange} />
        </div>
      </form>
      <h2>Add New Phonebook Entry</h2>
      <form>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="tel" value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>
            add
          </button>
        </div>
      </form>
      <h2>Phonebook Entries</h2>
      <ul>
        {filteredEntries.map((person) => (
          <li key={person.name} className="phonebook-numbers">
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
