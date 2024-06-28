import React from 'react';
import TimerIcon from '../../../shared/icons/timer.icons';
import FlexGlobalComponent from '../../../shared/global/flex.global';
import { theme } from '../../../shared/styles/theme.style';

export default function CounterTimeComponent ({time}) {

    const mediaQueryStyle = window.matchMedia('(max-width: 900px)').matches
        ? { marginLeft: '5px', minWidth: '55px' }
        : {};

    return (
        <FlexGlobalComponent center> 
            <TimerIcon/>
            <span style={{ ...timerStyle, ...mediaQueryStyle }}>{time}</span>
        </FlexGlobalComponent>
    )
}

const timerStyle = {
    minWidth: '60px',
    fontSize: 'clamp(16px, 5vw, 24px)',
    fontWeight: 500,
    marginLeft: '8px',
    color: theme.colors.themeColor,
};