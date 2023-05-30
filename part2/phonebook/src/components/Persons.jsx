function Persons({ entries, deletePerson }) {
  return (
    <ul>
      {entries.map((person) => (
        <li key={person.name} className="phonebook-numbers">
          {person.name} {person.number}
          <button type="submit" onClick={() => deletePerson(person.id)}> delete</button>
        </li>
      ))}
    </ul>
  );
}

function PersonForm({
  name,
  number,
  handleNameChange,
  handleNumChange,
  handleSubmission,
}) {
  return (
    <form>
      <div>
        name: <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        number: <input type="tel" value={number} onChange={handleNumChange} />
      </div>
      <div>
        <button type="submit" onClick={handleSubmission}>
          add
        </button>
      </div>
    </form>
  );
}

export { Persons, PersonForm };
