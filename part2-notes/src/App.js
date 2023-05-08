import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  // notes is being passed from index.js
  // notes<Array> = {id, content, important}
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");

  // FUNCTION DEFINITIONS

  // addNote function to add new note
  // INPUT: event
  const addNote = (event) => {
    event.preventDefault();
    // Construct the new note object to register
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    // Append the new note to the notes object of state
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };
  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    // setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>{" "}
      {/* Form that calls the addNote function when submitted */}
      <form onSubmit={addNote}>
        {" "}
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>{" "}
      </form>
    </div>
  );
};

export default App;
