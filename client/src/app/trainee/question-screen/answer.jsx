import React from 'react';
import { theme } from '../../shared/styles/theme.style';
import { questionType } from '../../core/constants/type';

const AnswerComponent = ({ index, answer, type, currentChoice, onChange}) => {
    
    const label = String.fromCharCode(65 + index);

    const highlightAnswer = currentChoice.includes(answer.answerContent);
    
    return (
        <div key = {index} style = {styles.answerStyle(highlightAnswer)}>
            <label style = {styles.answerLabel}>
                <span style = {styles.choiceLabel}>{label}.</span>
                <input
                    name = {answer.answerContent}
                    type = {type === questionType.MAQ ? 'checkbox' : 'radio'}
                    checked = {currentChoice.includes(answer.answerContent)}
                    onChange = {onChange}  
                    style = {{visibility: 'hidden' }}  
                />
                {answer.answerContent}
            </label>
        </div>
    )
}

const styles = {
    answerStyle: (highlightAnswer) => ({
        fontSize: 'clamp(18px, 4vw, 16px)',
        color: theme.colors.secondaryText,
        fontWeight: '400',
        border: `1px solid ${highlightAnswer ? theme.colors.themeColor : theme.colors.border}`,
        backgroundColor: `${highlightAnswer ? theme.colors.selectedAnswer : theme.colors.answerBg}`,
        borderRadius: '16px',
        marginTop: 'clamp(13px, calc(10px + 6 * ((100vw - 600px) / 1320)), 16px)',
        cursor: 'pointer',
        transition: highlightAnswer ? 'border 0.2s ease-in' : 'none',
        display: 'flex', // Ensure the div is a flex container to hold the label and input
        flexDirection: 'column' // Ensure the input and text stack vertically
    }),

    answerLabel: {
        padding: '18px',
        display: 'flex',
        cursor: 'pointer',
    },

    answerLabelMd: {
        padding: '14px',
    },

    choiceLabel: {},
    inputHidden: {
        visibility: 'hidden',
        margin: '0',
    }
}

export default AnswerComponent