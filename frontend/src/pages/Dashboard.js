import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome, {user?.fullName} 👋</h1>
        <p>You're signed in as <strong>{user?.email}</strong></p>
        <p>Role: <span className="role-badge">{user?.role}</span></p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}
