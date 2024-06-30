import { role } from "../../../core/constants/config";
import { menu } from "../../../core/constants/menu";
import { AuthService } from "../../../core/services/auth.service"
import './css/sidebar.trainee.css'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function SidebarTrainee(){

    const userRole = AuthService.getRole() || role.TRAINEE;

    const [activeSection, setActiveSection] = useState(null);

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };
    
    return (
        <>  
            <aside className="sidebar">
                { menu.map((item, index) => (
                    item.allowedRoles.includes(userRole) && (
                        <div>
                            <Link key = {index}
                                to = {item.url}
                                className = {`sidebar-section ${activeSection === item.label ? 'active' : ''}`}
                                onClick = {() => handleSectionClick(item.label)}
                                style = {{textDecoration: 'none', color:'black'}}
                            >
                                <img src = {item.iconUrl} alt="Dashboard Icon"/>
                                <div className ="sidebar-section-title">{item.label}</div>
                            </Link>
                        </div>
                    )
                ))}
            </aside>
        </>
    )
}

export default SidebarTrainee;