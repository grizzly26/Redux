import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as noteActions from "../redux/actions";
import "./style.css";

const NoteList = ({ notes, setNotes, deleteNote }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5001/notes");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setNotes(data);
          } else {
            console.error("Error: Notes data is not an array.");
          }
        } else {
          console.error("Error fetching notes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [setNotes]);

  const handleDeleteNote = async (noteId) => {
    try {
      await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: "DELETE",
      });

      const updatedNotes = await fetch("http://localhost:5001/notes").then((response) => response.json());
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div>
      <div className="home-links-container">
        <Link to="/Home" className="home-link">
          Home
        </Link>
        <Link to="/Notes" className="home-link">
          Notes
        </Link>
        <Link to="/Login" className="home-link">
          Log out
        </Link>
      </div>
      <div className="container">
        <h2 className="notes-title"> Notes</h2>

        <button onClick={() => navigate("/CreateNote")} className="home">
          Create new note
        </button>

        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          <ul className="note-list">
 {notes.map((note) => (
  <li key={note.id} className="note-list-item">
    {note.title} - {note.text} - {new Date(note.createdAt).toLocaleDateString()}
    <Link to={`/notes/view/${note.id}`} className="note-list-link">
      👀
    </Link>
    <Link to={`/notes/edit/${note.id}`} className="note-list-link">
      ✍️
    </Link>
    <button onClick={() => handleDeleteNote(note.id)} className="note-list-button">
      🗑
    </button>
  </li>
))}


          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notes: state.notes,
});

const mapDispatchToProps = {
  setNotes: noteActions.setNotes,
  deleteNote: noteActions.deleteNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);