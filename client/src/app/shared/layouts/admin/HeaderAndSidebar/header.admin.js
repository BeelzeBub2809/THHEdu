import './style.css'
import { useState } from 'react'
import UserProfileModal from '../../common/userProfileModal'
import ChangePassModal from '../../common/changePassModal';
function HeaderAdmin() {
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showChangePassModal, setShowChangePassModal] = useState(false);

    const handleProfile = () => {
        setShowProfileModal(true)
    }

    const handleCloseProfileModal = () => {
        setShowProfileModal(false)
    }
    const handleChangePassword = () => {
        setShowChangePassModal(true)
    }

    const handleCloseChangePassModal = () => {
        setShowChangePassModal(false)
    };
    const handleLogout = () => {
        // Add your logout handling logic here
    }
    return (
        <header className="top-bar">
            <div className="branding">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc7dc39d00d63da08b7fdcc530c7414f7a40d73e60322090f7859388dffb44d?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                    alt="QuizGrad logo"
                />
                <div className="title">
                    <span className="title-main">Quiz</span>
                    <span className="title-highlight">Grad</span>
                </div>
            </div>
            <nav className="nav-icons">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c01d29b98cde4b0e720a481c4e62e7d971d61fccfc50f4db096281dccdb1aa13?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                    alt="Nav Icon 1"
                />
                <div className="dropdown">
                    <button
                        className="btn btn-link dropdown-toggle p-0"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee9dc0880c567c02d163d6c89d81d0b5a545bae6aa20d836e1d4e096f7740a28?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                            alt="User Avatar"
                            className="icon-3"
                        />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><button className="dropdown-item" onClick={handleProfile}>Profile</button></li>
                        <li><button className="dropdown-item" onClick={handleChangePassword}>Change Password</button></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </nav>
            <UserProfileModal showModal={showProfileModal} handleCloseModal={handleCloseProfileModal} />
            <ChangePassModal showModal={showChangePassModal} handleCloseModal={handleCloseChangePassModal} />
        </header>
    )
}

export default HeaderAdmin;