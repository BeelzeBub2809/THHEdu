import './css/header.trainee.css'
import {link} from '../../../core/constants/link'
import LogoComponent from '../../icons/logo/logo.icons'

function HeaderTrainee(){
    return (
        <>
            <header className="top-bar">
                <LogoComponent/>
                <a href = {link.login} >
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
                </a>
            </header>
        </>
    )
}

export default HeaderTrainee;