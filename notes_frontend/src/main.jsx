import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import { AuthProvider, useAuth } from "./modules/auth/context";
import LoginPage from "./modules/auth/LoginPage";
import RegisterPage from "./modules/auth/RegisterPage";
import NotesPage from "./modules/notes/NotesPage";
import NoteDetailPage from "./modules/notes/NoteDetailPage";
import NoteEditPage from "./modules/notes/NoteEditPage";
import SidebarLayout from "./ui/SidebarLayout";

// Protected Route wrapper
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <SidebarLayout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <NotesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id"
              element={
                <PrivateRoute>
                  <NoteDetailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/:id/edit"
              element={
                <PrivateRoute>
                  <NoteEditPage />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </SidebarLayout>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
