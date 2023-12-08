import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNote } from "../redux/actions";
import "./style.css";

const CreateNote = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Type a name of a note";
    }

    return errors;
  };

  const handleCreateNote = async () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch("http://localhost:5001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            text: content,
            createdAt: Date.now(),
            authorId: 1,
          }),
        });

        if (response.ok) {
          const createdNote = await response.json();
          console.log("Note created:", createdNote);

          
          addNote(createdNote);

          navigate(`/notes/view/${createdNote.id}`);
        } else {
          console.error("Error creating note:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating note:", error);
      }
    } else {
      setErrors(errors);
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
        <h2>Create a note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <br />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <br />
        <button onClick={handleCreateNote}>Create</button>
        <br />
        <Link to="/notes" style={{ color: "green" }}>
          Back to notes
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addNote,
};

export default connect(null, mapDispatchToProps)(CreateNote);
