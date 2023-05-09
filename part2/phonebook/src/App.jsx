import { useState } from 'react'
import "./App.css"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      num: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNum){
      console.log("Nothing entered");
      return ;
    }
    // check if name is in array already
    const isInArray = persons.some((person) => person.name === newName)
    if (isInArray){
      alert(`${newName} is already added to phonebook.`)
      return ;
    }

    setPersons(() => {
      let newPersons = persons.concat({name: newName, num: newNum});
      setNewName("");
      setNewNum("");
      return newPersons;
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form >
        <div>
          name: <input type="text" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          num: <input type="tel" value={newNum} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name} className="phonebook-numbers">{person.name} {person.num}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
