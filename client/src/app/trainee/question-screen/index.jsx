import { React, useState, useEffect } from 'react';
import PageCenterGlobalComponent from '../../shared/global/page-center.global';
import LogoComponent from '../../shared/icons/logo/logo.icons';
import { theme } from '../../shared/styles/theme.style';
import HeaderQuizComponent from './header/header';
import QuestionComponent from './question';
import { questionType } from '../../core/constants/type';
import { useParams } from 'react-router-dom';
import { QuizService } from '../../core/services/quiz.service';
import { SubmittedQuizService } from '../../core/services/submitted-quiz.service';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { link } from '../../core/constants/link';
import { AuthService } from '../../core/services/auth.service';

export default function QuestionPracticeScreen () {
    const navigation = useNavigate();

    const { subjectId, chapterId, quizId } = useParams();
    const [ questions, setQuestions ] = useState([]);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [currentQuestion, setCurrenQuestion] = useState();
    const [currentChoice, setCurrentChoice] = useState([]);
    const [showTimerModal, setShowTimerModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);

    useEffect ( () => {
        async function fetchQuestions(){
            let dataFetchQuestions = await QuizService.getQuestionByQuiz(quizId);
            if(dataFetchQuestions){
                setQuestions(dataFetchQuestions.questionId);
                console.log(dataFetchQuestions.questionId);
                setCurrenQuestion(dataFetchQuestions.questionId[activeQuestion])
            } else {
                setQuestions([]);
            }
        }
        if(quizId !== ''){
            fetchQuestions();
        }
    }, [quizId]);

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

    const onClickNext = (isGetChoice) => {
        submittedQuiz.choice.push( { questionId: currentQuestion._id, choicePerQuestion: isGetChoice ? currentChoice : []});
        
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion((prev) => prev + 1)
            setCurrenQuestion(questions[activeQuestion+1]);
            setCurrentChoice([]);
        } else {
            const timeTaken = 10; // total time - remain time 
            submittedQuiz.time = timeTaken;
            handleSubmitQuiz();
        }
    };

    async function submitQuizAsync(submitCondition){
        await SubmittedQuizService.submitQuiz(submitCondition);
    }

    const handleSubmitQuiz = () => {
        let submitCondition = {
            quizId: quizId,
            choice: submittedQuiz.choice,
            chapterId: chapterId,
            subjectId: subjectId,
            traineeId: AuthService.getUserId(),         
        };

        try{
            submitQuizAsync(submitCondition);
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
        // navigation(`${link.trainee}${link.traineeLearnSubject}/${subjectId}`)
    }
    

    return (
        <PageCenterGlobalComponent>
            {
                currentQuestion && (
                <div style = {styles.quizContainer}>
                        <HeaderQuizComponent
                            activeQuestion = {activeQuestion}
                            totalQuestions = {questions.length}
                            timer = {10}
                        />
                        <QuestionComponent
                            questionContent = {currentQuestion.questionName}
                            code = {currentQuestion.code}
                            image = {currentQuestion.image}
                            type = {currentQuestion.type}
                            answers = {currentQuestion.answer}
                            currentChoice = {currentChoice}
                            handleSelectChoice = {handleSelectChoice}
                        />
                        <div style = {styles.buttonWrapper}>
                        {
                            activeQuestion !== questions.totalQuestions - 1 && 
                                <button
                                    style = {styles.button}
                                    onClick = {() => onClickNext(false)}>
                                    {'Skip'}
                                </button>
                        }
                        <button 
                            style = {styles.button}
                            onClick = {() => onClickNext(true)}
                            disabled = { currentChoice.length === 0 }>
                            {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
                )
            }
            
        </PageCenterGlobalComponent>
    )
};

const styles = {
    quizContainer: {
        width: '60%',
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

//data sau khi da hoan thanh quiz
const submittedQuiz = {
    choice: [
        // {
        //     questionId: 1,
        //     choicePerQuestion: [ 'cut/duoi bau']
        // },
        // {
        //     questionId: 2,
        //     choicePerQuestion: ['True']
        // },
        // {
        //     questionId: 3,
        //     choicePerQuestion: ['componentWillUpdate','componentDidUpdate']
        // }
    ],
    time: 10,
};