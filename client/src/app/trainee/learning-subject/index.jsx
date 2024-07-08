import React, { Fragment, useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { chapterType } from '../../core/constants/type';
import { AuthService } from '../../core/services/auth.service';
import { QuizService } from '../../core/services/quiz.service';
import { useNavigate } from 'react-router-dom';
import { link } from '../../core/constants/link';
import PageCenterGlobalComponent from '../../shared/global/page-center.global';

function LearnSubjectComponent(){
    const navigation = useNavigate();

    const { subjectId: subjectId } = useParams();

    const [isShowMenuChapter, setIsShowChaterList] = useState(true);
    const [currentChapter, setCurrentChapter] = useState(chapterMenu[0]);
    const [currentQuiz, setCurrentQuiz] = useState(null);

    const handleSelectChapter = (chapter) => {
        setCurrentChapter(chapterMenu.find(c => c.chapterId === chapter.chapterId));
    }

    const handleStartQuiz = (quiz) => {
        navigation(`${link.trainee}${link.traineePracticeQuiz}/${quiz.quizId}`)
    }

    const menuComponent = () => {
        return(
            <Col className='col-3' style={{backgroundColor: 'green'}}>
                {
                    chapterMenu.map( (chapter ) => {
                        return (
                            <details>
                                <summary className="btn btn-light w-100 text-start rounded-0 p-3 border-bottom d-flex"
                                    onClick={() => handleSelectChapter(chapter)}>
                                    <img src = {
                                        chapter.type == chapterType.LECTURE ? tempUrlIcon.lecture
                                            : chapter.type == chapterType.VIDEO ? tempUrlIcon.video
                                            : tempUrlIcon.quiz
                                    } alt=""/>
                                    <h6 style={{marginLeft: 5}} className="text-uppercase">{chapter.title}</h6>
                                </summary>
                            </details>
                        );
                    })
                }
            </Col>
        )
    }

    const lectureComponent = () => {
        return(
            <div className="pt-5 pb-5">
                {
                    currentChapter.attachment
                }
            </div>
        )
    }

    const videoComponent = () => {
        return(
            <div>
                VIDEO
            </div>
        )
    }

    const quizComponent =  () => {
        //TODO:  change info when implement backend
        // let userDetail = AuthService.getUserDetail();

        //TODO:  change info when implement backend
        // if( userDetail === null || userDetail === '' ){
        //     return;
        // }
        
        //TODO:  change info when implement backend
        let fetchCondition = {
            userId: 1,
            subjectId: 1,
            chapterId: 1
        }
        // call api
        // let quizInfo =  await QuizService.getInfoQuiz(fetchCondition)
        let quizInfo = quizInfoConst;

        return(
            <Fragment>
                <Container className="mt-5">
                {
                    quizInfo.map( (quiz) => {
                        return (
                            <Fragment>
                                <h1 className="mb-4">{quiz.quizName}</h1>
                                <div className="mt-3 p-3 w-100">
                                    <Row className='d-flex'>
                                        <Col>
                                            <h6>Receive grade</h6>
                                            <p>To Pass <strong>80% or higher</strong></p>
                                            <p>Time <strong>{quiz.duration}</strong></p>
                                        </Col>
                                        <Col className="text-center">
                                            <Button onClick={()=>handleStartQuiz(quiz)} variant="primary" size="lg">Start assignment</Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col md={9}>
                                            <h6>Your grade</h6>
                                        </Col>
                                        <Col md={3} className="text-right">
                                            <p>2–2</p>
                                        </Col>
                                    </Row>
                                </div>
                            </Fragment>
                        )
                    })
                }
                </Container>
            </Fragment>
        )
    }

    return ( 
        <Container fluid style={{backgroundColor: 'wheat'}}>
            <Row style={{marginTop: '1.5em'}}>
                <div className='col-9'>
                    <h2>{currentChapter.title}</h2>
                </div>
                <div className='col-3'>
                    <Button onClick={() => setIsShowChaterList(!isShowMenuChapter)}>
                        {isShowMenuChapter ? `Hide menu` : `Show menu`}</Button>
                </div>
            </Row>
            <Row>
                <div className={isShowMenuChapter ? 'col-9' : 'col-12'} style={{backgroundColor: 'red'}}>
                <PageCenterGlobalComponent paddingTop={20}>
                    {
                        currentChapter.type === chapterType.LECTURE ? lectureComponent() 
                            : currentChapter.type === chapterType.VIDEO ? videoComponent() 
                            : quizComponent()  
                    }
                </PageCenterGlobalComponent>
                </div>
                {
                    isShowMenuChapter && menuComponent()
                }
            </Row>
        </Container>
    )
}

const chapterMenu = [
    {
        chapterId: 1,
        title: 'Hoc va hoc',
        attachment: 'Link 1',
        type: chapterType.LECTURE
    },
    {
        chapterId: 2,
        title: 'Chau ngoan Bac Ho',
        attachment: 'Link 2',
        type: chapterType.QUIZ,
    },
    { 
        chapterId: 3,
        title: 'Em cua ngay hom qua',
        attachment: 'Link 3',
        type: chapterType.VIDEO,
    }
]

const tempUrlIcon = {
    lecture: '/assets/icons/lecture.svg',
    quiz: '/assets/icons/quiz.svg',
    video: '/assets/icons/video.svg'
}

const quizInfoConst = [
    {
        quizId: 1,
        quizName: 'Kiem tra bai cu',
        totalQuestion: 20,
        duration: 60,
        isActive: true,
        createdBy: 'FPT'
    },   
    {
        quizId: 2,
        quizName: 'Kiem tra bai moi',
        totalQuestion: 10,
        duration: 30,
        isActive: true,
        createdBy: 'NNN'
    }
]
export default LearnSubjectComponent;