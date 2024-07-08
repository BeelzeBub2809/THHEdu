import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <aside className="sidebar">
      <Link
        to="/trainer/Assignment"
        className={`sidebar-section ${activeSection === 'assignment' ? 'active' : ''}`}
        onClick={() => handleSectionClick('assignment')}
        style={{textDecoration: 'none', color:'black'}}
      >
        <img
          src="/assets/icons/book-reader.svg"
          alt="Book-Reader Icon"
        />
        <div className="sidebar-section-title">Assignment</div>
      </Link>
      <Link
        to="/trainer/traineeList"
        className={`sidebar-section ${activeSection === 'traineeList' ? 'active' : ''}`}
        onClick={() => handleSectionClick('traineeList')}
        style={{textDecoration: 'none', color:'black'}}
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/37929f9373142dc261b74b041b04d8e32cd3e0372b0471783ce8f7fcfb454075?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
          alt="User Icon"
        />
        <div className="sidebar-section-title">Trainee</div>
      </Link>
    </aside>
  );
}
