import './css/header.manager.css'

function HeaderManager(){
    return (
        <>
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
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee9dc0880c567c02d163d6c89d81d0b5a545bae6aa20d836e1d4e096f7740a28?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                    alt="Nav Icon 2"
                    className="icon-3"
                />
            </nav>
            </header>
        </>
    )
}

export default HeaderManager;