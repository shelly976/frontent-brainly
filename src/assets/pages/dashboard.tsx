import React, { useState } from "react";
import axios from "axios";

type Note = {
  id: Number;
  Title: string;
  tags: string[];
  Content: string;
  createdAt: string;
};

export const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [Title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [Content, setContent] = useState("");

  const addNote = async () => {
    const noteData = {
      Title,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      Content,
    };
    try {
      const content = await axios.post(
        "http://localhost:3000/api/vi/content",
        { Title, tags, Link: "http://mongodb.com", Content },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      const newNote: Note = {
        ...noteData,
        id: content.data._id,
        createdAt: new Date().toLocaleDateString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const updateNote = async (id: number) => {
    const updatedData = {
      Title,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      Content,
    };
    try {
      await axios.put(
        "http://localhost:3000/api/vi/brain/update",
        { Title, tags, Content, id },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? { ...note, ...updatedData } : note))
      );
      resetForm();
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete("http://localhost:3000/api/vi/content", {
        headers: { authorization: localStorage.getItem("token") },
        data: { ContentId: id },
      });
      setNotes((prev) => prev.filter((note) => note.id !== id));
      if (editingId === id) resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editingId ? updateNote(editingId) : addNote();
  };

  const handleEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.Title);
    setTags(note.tags.join(", "));
    setContent(note.Content);
  };

  const resetForm = () => {
    setTitle("");
    setTags("");
    setContent("");
    setEditingId(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.dashboardContainer}>
        {/* Form */}
        <div style={styles.formWrapper}>
          <h2 style={styles.heading}>{editingId ? "Update Note" : "Create Note"}</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              style={styles.input}
            />
            <textarea
              placeholder="Content"
              value={Content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.primaryButton}>
              {editingId ? "Update Note" : "Add Note"}
            </button>
          </form>
        </div>

        {/* Notes */}
        <div style={styles.notesWrapper}>
          <h2 style={styles.heading}>Your Notes</h2>
          {notes.length === 0 && <p style={styles.emptyText}>No notes added yet.</p>}
          {notes.map((note) => (
            <div key={note.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{note.Title}</h3>
              <div style={styles.tagContainer}>
                {note.tags.map((tag, i) => (
                  <span key={i} style={styles.tag}>{tag}</span>
                ))}
              </div>
              <p style={styles.contentText}>{note.Content}</p>
              <small style={styles.dateText}>{note.createdAt}</small>
              <div style={styles.buttonRow}>
                <button style={styles.editButton} onClick={() => handleEdit(note)}>Edit</button>
                <button style={styles.deleteButton} onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    backgroundColor: "#eef2f7",
    minHeight: "100vh",
    padding: "50px 0",
    fontFamily: "'Inter', sans-serif",
  },
  dashboardContainer: {
    width: "1080px",
    margin: "0 auto",
    display: "flex",
    gap: "50px",
    alignItems: "flex-start",
  },
  formWrapper: {
    width: "350px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  formWrapperHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
  },
  notesWrapper: { flex: 1 },
  heading: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: 600,
    color: "#1f2937",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
  },
  textarea: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    minHeight: "140px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.2s",
  },
  primaryButton: {
    padding: "12px",
    background: "linear-gradient(90deg, #14b8a6, #06b6d4)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  card: {
    backgroundColor: "#fff",
    padding: "22px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    cursor: "pointer",
  },
  cardHover: { transform: "translateY(-3px)", boxShadow: "0 14px 35px rgba(0,0,0,0.1)" },
  cardTitle: { margin: 0, fontSize: "17px", fontWeight: 600, color: "#111827" },
  tagContainer: { display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" },
  tag: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  contentText: { marginTop: "10px", marginBottom: "10px", lineHeight: "1.6", color: "#374151" },
  dateText: { color: "#9ca3af", fontSize: "12px" },
  buttonRow: { display: "flex", gap: "10px", marginTop: "12px" },
  editButton: {
    backgroundColor: "#3b82f6",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    border: "none",
    padding: "6px 14px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s",
  },
  emptyText: { color: "#6b7280", fontStyle: "italic" },
};