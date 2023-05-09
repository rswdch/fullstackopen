import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  // notes is being passed from index.js
  // notes<Array> = {id, content, important}
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  /* FUNCTION DEFINITIONS */

  // addNote function to add new note when submit is clicked
  // INPUT: event
  const addNote = (event) => {
    event.preventDefault();

    // Construct the new note object to register
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1 /* IMPORTANT: Assign ID */,
    };

    // Append the new note to notes<Array>: {content, important, id}
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  // handleNoteChange
  // Update the state of newNote when field is changed
  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  /* show only important = true notes */
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
  
        </button>
      </div>
      {/* Show all the note items */}
      <ul>
        {notesToShow.map((note) => (
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
