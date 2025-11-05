import { useState } from "react";

export default function NoteList({ notes, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = (id) => {
    onUpdate(id, { title: editTitle, content: editContent });
    setEditId(null);
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note">
          {editId === note._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={() => saveEdit(note._id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div>
                <button onClick={() => startEdit(note)}>Edit</button>
                <button onClick={() => onDelete(note._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
