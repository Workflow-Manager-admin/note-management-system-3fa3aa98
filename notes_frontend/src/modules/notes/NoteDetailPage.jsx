import React, { useEffect, useState } from "react";
import { fetchNote, deleteNote } from "./api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function NoteDetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(id)
      .then(data => {
        setNote(data);
        setErr("");
      })
      .catch(() => setErr("Note not found."))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    if (window.confirm("Delete this note?")) {
      await deleteNote(id);
      navigate("/");
    }
  }

  if (loading) return <div className="main-content">Loading...</div>;
  if (err) return <div className="main-content">{err}</div>;
  if (!note) return null;
  return (
    <div className="main-content">
      <div className="panel-header">
        <h2>{note.title}</h2>
        <div className="button-set">
          <Link className="accent" to={`/notes/${id}/edit`}>
            Edit
          </Link>
          <button className="action-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div style={{ margin: "16px 0", minHeight: 150 }}>{note.content}</div>
      <div className="note-date">
        Created: {(note.created_at || "").split("T")[0]} <br />
        Last updated: {(note.updated_at || "").split("T")[0]}
      </div>
    </div>
  );
}
