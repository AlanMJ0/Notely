import { useEffect, useState } from "react";
import NoteForm from "./components/noteForm";
import NoteList from "./components/noteList";
import "./index.css";

const API_URL = "http://localhost:5000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError('Failed to connect to the server. Please check if backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (note) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });
    fetchNotes();
  };

  const updateNote = async (id, updatedNote) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div className="container">
      <h1>📝 Notely </h1>
      {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <NoteForm onAdd={addNote} />
          <NoteList notes={notes} onDelete={deleteNote} onUpdate={updateNote} />
        </>
      )}
    </div>
  );
}
