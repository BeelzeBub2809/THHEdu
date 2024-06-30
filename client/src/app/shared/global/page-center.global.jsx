import React from 'react';
import {theme} from '../styles/theme.style'

const PageCenterGlobalComponent = ({justifyCenter, children}) => {
    const baseStyle = {
        background: theme.colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        paddingTop: '50px',
        justifyCenter: justifyCenter ? 'center' : '',
    }

    return (
        <div style={baseStyle}>{children}</div>
    )
}

export default PageCenterGlobalComponent