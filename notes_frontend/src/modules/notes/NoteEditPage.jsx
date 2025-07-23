import React, { useState, useEffect } from "react";
import { fetchNote, updateNote } from "./api";
import { useParams, useNavigate } from "react-router-dom";

export default function NoteEditPage() {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(id)
      .then(data => setNote({ title: data.title, content: data.content }))
      .catch(() => setErr("Note not found"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateNote(id, note);
      setErr("");
      navigate(`/notes/${id}`);
    } catch {
      setErr("Failed to save changes.");
    }
    setSaving(false);
  }

  if (loading) return <div className="main-content">Loading...</div>;
  if (err)
    return (
      <div className="main-content">
        <div>{err}</div>
      </div>
    );
  return (
    <div className="main-content">
      <h2>Edit Note</h2>
      <form className="vertical-form" onSubmit={handleSave}>
        <input
          required
          value={note.title}
          onChange={e => setNote(n => ({ ...n, title: e.target.value }))}
          placeholder="Title"
        />
        <textarea
          required
          value={note.content}
          rows={8}
          onChange={e => setNote(n => ({ ...n, content: e.target.value }))}
          placeholder="Write your note here..."
        />
        <div>
          <button className="accent" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
