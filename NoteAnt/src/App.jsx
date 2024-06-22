import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './service/notes'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div className='container mt-5 align-center'>
      <h1 className='text-center'>Notes</h1>
      <Notification message={errorMessage} />
      <div className='d-grid col-4 gap-2 mx-auto'>
        <button className='btn btn-warning' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>

        <h1 className='text-center'>Add Notes</h1>
        <input className='form-control'
          value={newNote}
          onChange={handleNoteChange}
        />
        <div className='d-grid col-4 gap-2 mt-3 mx-auto'>
          <button className='btn btn-success' type="submit">save</button>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default App