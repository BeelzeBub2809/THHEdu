import React from 'react';
import CounterTimeComponent from './counter-time.header';
import FlexGlobalComponent from '../../../shared/global/flex.global';
import { AddLeadingZero } from '../../../shared/extensions/helper.extension'
import { theme } from '../../../shared/styles/theme.style';

export default function HeaderQuizComponent ({activeQuestion, totalQuestions, timer}) {
    return (
        <FlexGlobalComponent spaceBetween gap="6px">
            <div>
                <span style = {styles.activeQuestionStyle}>{AddLeadingZero(activeQuestion+  1)}</span>
                <span style = {styles.totalQuestionStyle}>/{AddLeadingZero(totalQuestions)}</span>
            </div>
            <FlexGlobalComponent>
                <CounterTimeComponent time = {timer}/>
            </FlexGlobalComponent>
        </FlexGlobalComponent>
    )
}

const styles = {
    activeQuestionStyle : {
        fontSize: "clamp(40px, 5vw, 60px)",
        fontWeight: 500,
        color: theme.colors.themeColor,
    },
    totalQuestionStyle : {
        fontSize: "clamp(20px, 5vw, 30px)",
        fontWeight: 500,
        color: theme.colors.darkGray,
    }
};