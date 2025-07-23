/**
 * Authentication API service functions for login, register, logout, and session check.
 * Endpoints use the /api/auth/ prefix.
 */
const API_BASE = "/api/";

function handleResponse(resp) {
  if (!resp.ok) throw new Error("API error");
  return resp.json();
}

export async function apiRegister({ username, password }) {
  return fetch(API_BASE + "auth/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);
}

export async function apiLogin({ username, password }) {
  return fetch(API_BASE + "auth/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  }).then(handleResponse);
}

export async function apiLogout() {
  return fetch(API_BASE + "auth/logout/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
}

export async function apiGetMe() {
  // optional: may need an endpoint like /api/me/ or a safe way to test session, fallback on /notes/
  return fetch(API_BASE + "notes/", {
    method: "GET",
    credentials: "include",
  }).then(res => {
    if (!res.ok) throw new Error("Not logged in");
    return { username: "User" }; // Fake user since no real /me/ endpoint; override with backend info if available
  });
}
