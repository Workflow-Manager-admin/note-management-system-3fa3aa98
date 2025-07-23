import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../modules/auth/context";

/**
 * SidebarLayout component provides sidebar navigation and main content region,
 * as well as topbar with account controls. Responsive and modern minimalistic.
 */
export default function SidebarLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const navItems = [
    { label: "Notes", to: "/" },
    // Can add more navigation items here
  ];

  return (
    <div className="layout-root">
      <aside className="sidebar">
        <div className="sidebar-header">📝 Notes App</div>
        <nav>
          {navItems.map(item => (
            <Link
              key={item.to}
              className={
                "sidebar-link" +
                (location.pathname === item.to ? " active" : "")
              }
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          {user ? (
            <div>
              <span className="sidebar-user">{user.username || "User"}</span>
              <button className="sidebar-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link className="sidebar-link" to="/login">
                Login
              </Link>
              <Link className="sidebar-link" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>
      <div className="content-area">{children}</div>
    </div>
  );
}
