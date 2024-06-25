import React from 'react';
import ImageQuiz from '../../shared/components/image.quiz';
import AnswerComponent from './answer';

const QuestionComponent = ({questionContent, code, image, type, answers, currentChoice, handleSelectChoice}) => {

    return (
        <div style = {{...styles.questionContainer, ...styles.mediaQueryStyle}}>
            <h2 style = {styles.questionStyle}>{questionContent}</h2>
            {image && <ImageQuiz image = {image}/>}
            <div style = {styles.answersContainer}>
                {answers.map((answer, index) => (
                    <AnswerComponent
                        index = {index}
                        answer = {answer}
                        type = {type}
                        key = {index}
                        currentChoice = {currentChoice}
                        onChange = {(e) => handleSelectChoice(e, index)}
                    />
                ))}
            </div>
        </div>
    )
};

const styles = {
  questionContainer: {
    marginTop: '30px',
    marginBottom: '40px',
    maxWidth: '88%',
  },
  answersContainer: {
    maxWidth: '78%',
  },
  questionStyle: {
    fontSize: 'clamp(18px, 4vw, 28px)',
    fontWeight: '500',
    marginBottom: '25px',
    color: '#11052C',
    lineHeight: '1.3',
  },
  mediaQueryStyle : window.matchMedia('(max-width: 600px)').matches
    ? { maxWidth: '55px' }
    : {},
};

export default QuestionComponent;