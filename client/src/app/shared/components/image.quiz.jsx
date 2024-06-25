import React from 'react';

const ImageQuiz = ({image}) => {
    const Styles = {
        borderRadius: '10px',
        height: '400px',
        maxWidth: '100%',
        boxShadow: '6px 6px 2px #FFC0CB',
        marginBottom: '20px'
    }

    return (
        <img style = {Styles} src = {image}/>
    )
}

export default ImageQuiz