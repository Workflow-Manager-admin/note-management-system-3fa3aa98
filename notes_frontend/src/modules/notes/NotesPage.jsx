import React, { useEffect, useState } from "react";
import { fetchNotes, createNote } from "./api";
import { Link, useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function loadNotes() {
    setLoading(true);
    try {
      const result = await fetchNotes(search);
      setNotes(result);
      setError("");
    } catch {
      setError("Failed to load notes.");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadNotes();
  }, [search]);

  async function handleNewNote(e) {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;
    setCreating(true);
    try {
      const note = await createNote({ title: newNoteTitle, content: "" });
      setNewNoteTitle("");
      navigate(`/notes/${note.id}/edit`);
    } catch {
      setError("Failed to create note.");
    }
    setCreating(false);
  }

  return (
    <div className="main-content">
      <div className="panel-header">
        <h1 className="accent">Your Notes</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
            loadNotes();
          }}
          style={{ display: "flex", gap: 8 }}
        >
          <input
            className="search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>
      </div>
      <form className="inline-form" onSubmit={handleNewNote}>
        <input
          placeholder="New note title..."
          value={newNoteTitle}
          onChange={e => setNewNoteTitle(e.target.value)}
          style={{ flex: 1 }}
        />
        <button className="accent" type="submit" disabled={creating}>
          +
        </button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      <ul className="note-list" style={{ marginTop: 16 }}>
        {loading ? (
          <li>Loading notes...</li>
        ) : notes.length === 0 ? (
          <li>No notes found.</li>
        ) : (
          notes.map(note => (
            <li key={note.id} className="note-list-item">
              <Link className="note-link" to={`/notes/${note.id}`}>
                <strong>{note.title}</strong>
                <div className="note-date">
                  {(note.updated_at || note.created_at || "").split("T")[0]}
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
