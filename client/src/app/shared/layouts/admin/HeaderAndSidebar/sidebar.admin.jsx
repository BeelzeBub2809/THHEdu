import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function SidebarAdmin() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <aside className="sidebar">
      <Link
        to="/admin/dashboard"
        className={`sidebar-section ${activeSection === 'dashboard' ? 'active' : ''}`}
        onClick={() => handleSectionClick('dashboard')}
        style={{textDecoration: 'none', color:'black'}}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1170514c93b87b2f66d1a5f8546ed28c6542845d5b95a560fded4cc18694e75?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
          alt="Dashboard Icon"
        />
        <div className="sidebar-section-title">Dashboard</div>
      </Link>
      <Link
        to="/admin/user"
        className={`sidebar-section ${activeSection === 'user' ? 'active' : ''}`}
        onClick={() => handleSectionClick('user')}
        style={{textDecoration: 'none', color:'black'}}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/37929f9373142dc261b74b041b04d8e32cd3e0372b0471783ce8f7fcfb454075?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
          alt="User Icon"
        />
        <div className="sidebar-section-title">User</div>
      </Link>
    </aside>
  );
}
