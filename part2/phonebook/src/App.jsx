import { useEffect, useState } from "react";
import "./App.css";
import Filter from "./components/Filter.jsx";
import { Persons, PersonForm } from "./components/Persons.jsx";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    const isInArray = persons.find((person) => person.name === newName);
    if (isInArray) {
      const replace = confirm(
        `${newName} is already added to phonebook. Do you want to replace?`
      );
      if (!replace) return;
      removePerson(isInArray.id);
      return;
    }

    let newPerson = {
      name: newName,
      number: newNum,
    };
    personsService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNum("");
      })
      .catch((err) => {
        console.log("Error in posting new person");
        console.log(err);
      });
  }

  function removePerson(id) {
    console.log(`Deleting person ${id}`);
    personsService
      .remove(id)
      .then(() => {
        // getAll returns a promise and response data, which is an array
        return personsService.getAll();
      })
      .then((response) => {
        setPersons(response);
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
      <Persons entries={filteredEntries} deletePerson={removePerson} />
    </div>
  );
};

export default App;
