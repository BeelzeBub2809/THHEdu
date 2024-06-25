import { React, useState } from 'react';
import PageCenterGlobalComponent from '../../shared/global/page-center.global';
import LogoComponent from '../../shared/icons/logo/logo.icons';
import { theme } from '../../shared/styles/theme.style';
import HeaderQuizComponent from './header/header';
import QuestionComponent from './question';
import { questionType } from '../../core/constants/type';

export default function QuestionPracticeScreen () {

    const [activeQuestion, setActiveQuestion] = useState(0);
    const [currentChoice, setCurrentChoice] = useState([]);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    
    const currentQuestion = questionList[activeQuestion];

    const handleSelectChoice = (e) => {
        const { name: newSelectedChoice, checked } = e.target;

        if (currentQuestion.type === questionType.MAQ) {
            if (currentChoice.includes(newSelectedChoice)) {
                setCurrentChoice((prevSelectedChoice) =>
                    prevSelectedChoice.filter((element) => element !== newSelectedChoice)
                )
            } else {
                setCurrentChoice((prevSelectedChoice) => [...prevSelectedChoice, newSelectedChoice])
            }
        }
        
        if (currentQuestion.type === questionType.MCQ || currentQuestion.type === questionType.BOOLEAN) {
            if (checked) {
                setCurrentChoice([newSelectedChoice]);
            }
        }
    };

    const onClickNext = () => {
        submittedQuiz.choice.push( { choicePerQuestion: currentChoice});

        if (activeQuestion !== questionList.length - 1) {
            setActiveQuestion((prev) => prev + 1)
        } else {
            const timeTaken = 10; // total time - remain time 
            submittedQuiz.time = timeTaken;
        }
        setCurrentChoice([]);
    };

    return (
        <PageCenterGlobalComponent>
            <div style = {styles.logoContainer}><LogoComponent isShowMenu = {(false)}/></div>
            <div style = {styles.quizContainer}>
                <HeaderQuizComponent
                    activeQuestion = {activeQuestion}
                    totalQuestions = {quizDetails.totalQuestions}
                    timer = {quizDetails.timer}
                />
                <QuestionComponent
                    questionContent = {currentQuestion.questionContent}
                    code = {currentQuestion.code}
                    image = {currentQuestion.image}
                    type = {currentQuestion.type}
                    answers = {currentQuestion.answer}
                    currentChoice = {currentChoice}
                    handleSelectChoice = {handleSelectChoice}
                />
                <div style = {styles.buttonWrapper}>
                    <button
                        style = {styles.button}
                        onClick = {onClickNext}
                        disabled = {currentChoice.length === 0}>
                            {activeQuestion === quizDetails.totalQuestions - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </PageCenterGlobalComponent>
    )
};

const styles = {
    quizContainer: {
        width: '900px',
        minHeight: '500px',
        background: theme.colors.cardBackground,
        borderRadius: '4px',
        padding: '30px 60px 80px 60px',
        marginBottom: '70px',
        position: 'relative',
        ...(window.innerWidth <= 768 && {
            width: '100%',
            padding: '15px 15px 80px 15px'
        }),
    },

    logoContainer: {
      marginTop: '50px',
      marginBottom: '50px',
      ...(window.innerWidth <= 768 && {
        marginTop: '10px',
        marginBottom: '20px'
      }),
      svg: {
        width: '185px',
        height: '80px'
      }
    },

    buttonWrapper: {
      position: 'absolute',
      right: '60px',
      bottom: '30px',
      display: 'flex',
      gap: '20px',
      ...(window.innerWidth <= 600 && {
        justifyContent: 'flex-end',
        width: '90%',
        right: '15px'
      })
    },

    button: {
        width: '195px',
        minHeight: '50px',
        color: theme.colors.outlineButtonText,
        background: theme.colors.cardBackground,
        fontSize: 'clamp(16px, 5vw, 24px)',
        border: `1px solid ${theme.colors.themeColor}`,
        fontWeight: '400',
        borderRadius: '9px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonIcon: (selectedAnswer) => ({
      fill: selectedAnswer ? theme.colors.buttonText : theme.colors.darkGray
    })
};

const questionList = [
    {
      questionContent: 'Khong lam ma doi co an thi an ..., an ...',
      code: '',
      image: '',
      answer: [
            {
                answerContent: 'chao/com',
                isCorrected: true
            },
            {
                answerContent: 'cut/duoi bau',
                isCorrected: false
            },
            {
                answerContent: 'mixue/com Mai Linh',
                isCorrected: false
            }
        ],
      type: 'MAQ',
    },
    {
        questionContent: 'React components must always return a single JSX element.',
        answer: [
            {
                answerContent: 'True',
                isCorrected: true
            },
            {
                answerContent: 'False',
                isCorrected: false
            }           
        ],
        type: 'boolean',
    },
    {
        questionContent: 'Which of the following are valid React lifecycle methods? (Select all that apply)',
        answer: [
            {
                answerContent: 'componentWillMount',
                isCorrected: false
            },
            {
                answerContent: 'componentDidMount', 
                isCorrected: true
            },
            {
                answerContent: 'componentWillUpdate',
                isCorrected: false
            },
            {
                answerContent: 'componentDidUpdate',
                isCorrected: true
            },
        ],
        type: 'MAQ',
    }
];

const quizDetails = {
    totalQuestions: questionList.length,
    timer: 10,
};

//data sau khi da hoan thanh quiz
const submittedQuiz = {
    choice: [
        // {
        //     choicePerQuestion: [ 'cut/duoi bau']
        // },
        // {
        //     choicePerQuestion: ['True']
        // },
        // {
        //     choicePerQuestion: ['componentWillUpdate','componentDidUpdate']
        // }
    ],
    time: 10,
};