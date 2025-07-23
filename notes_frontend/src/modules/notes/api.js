// Notes API service for CRUD and search
const API_BASE = "/api/";

function handleResponse(resp) {
  if (!resp.ok) throw new Error("API error");
  return resp.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes(search) {
  let url = API_BASE + "notes/";
  if (search) url += "?search=" + encodeURIComponent(search);
  return fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export async function fetchNote(id) {
  return fetch(API_BASE + `notes/${id}/`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export async function createNote(note) {
  return fetch(API_BASE + "notes/", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export async function updateNote(id, note) {
  return fetch(API_BASE + `notes/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  }).then(handleResponse);
}

// PUBLIC_INTERFACE
export async function deleteNote(id) {
  return fetch(API_BASE + `notes/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });
}
