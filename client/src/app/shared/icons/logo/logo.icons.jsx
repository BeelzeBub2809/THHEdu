import React from 'react';
import './logo.icon.css'

export default function LogoComponent({isShowMenu = true}) {

    return (
        <div className="branding">
            {
                isShowMenu && 
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5dc7dc39d00d63da08b7fdcc530c7414f7a40d73e60322090f7859388dffb44d?apiKey=5dd4f9cda63a40ecb7fdb7955805b9bd&"
                    alt="QuizGrad logo"
                />
            }
            
            <div className="title">
                <span className="title-main">Quiz</span>
                <span className="title-highlight">Grad</span>
            </div>
        </div>
    )
}