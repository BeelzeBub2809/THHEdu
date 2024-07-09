import React, { Fragment, useEffect, useState }  from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { chapterType } from '../../core/constants/type';
import { AuthService } from '../../core/services/auth.service';
import { QuizService } from '../../core/services/quiz.service';
import { useNavigate } from 'react-router-dom';
import { link } from '../../core/constants/link';
import PageCenterGlobalComponent from '../../shared/global/page-center.global';
import VideoPlaying from '../../shared/components/video.playing'
import { MIN_TIME_LEARN_VIDEO } from '../../core/constants/config';
import { theme } from '../../shared/styles/theme.style';

const joinedSubjectDataTest = {
    subjectId: 1,
    traineeId: 1,
    learnedChapter:[
    ]
}

function LearnSubjectComponent(){
    const navigation = useNavigate();

    const { subjectId: subjectId } = useParams();

    const [isShowMenuChapter, setIsShowChaterList] = useState(true);
    const [currentChapter, setCurrentChapter] = useState(chapterMenuDataTest[0]);

    //WARNING: Delete after done backend: Call API to get data from with par: traineeId(userId), sujectId
    const [learnedChapters, setLeanredChapters] = useState(joinedSubjectDataTest.learnedChapter);
    const [listChapters, setListChapters] = useState(chapterMenuDataTest);

    const handleSelectChapter = (chapter) => {
        setCurrentChapter(chapterMenuDataTest.find(c => c.chapterId === chapter.chapterId));
    }

    const handleStartQuiz = (quiz) => {
        navigation(`${link.trainee}${link.traineePracticeQuiz}/${quiz.quizId}`)
    }

    const handleVideoProgress = (progress ) => {
        if(progress.played*100 > MIN_TIME_LEARN_VIDEO && !learnedChapters.includes(currentChapter.chapterId)){
            //TODO: Call api to save this chapter is learned to DbJoinedSubject

            submitLearnedChapter();
        }
    };

    const handleMarkCompleted = () => {
        submitLearnedChapter();
    }

    const submitLearnedChapter = () => {
        setLeanredChapters(prev => [...prev, currentChapter.chapterId]);
    }

    const menuComponent = () => {
        return(
            <Col className='col-3'>
                {
                    listChapters.map( (chapter, index ) => {
                        return (
                            <div key={index} >
                                <div className="btn btn-light w-100 text-start rounded-0 p-3 border-bottom d-flex"
                                    style={{backgroundColor: learnedChapters.includes(chapter.chapterId) ? theme.colors.successLight : ''}}
                                    onClick={() => handleSelectChapter(chapter)}
                                >
                                    <img src = {
                                        chapter.type == chapterType.LECTURE ? tempUrlIconDataTest.lecture
                                            : chapter.type == chapterType.VIDEO ? tempUrlIconDataTest.video
                                            : tempUrlIconDataTest.quiz
                                    } alt=""/>
                                    <h6 style={{marginLeft: 5}} className="text-uppercase">{chapter.title}</h6>
                                </div>
                            </div>
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
                <div className="text-center">
                    {
                        !learnedChapters.includes(currentChapter.chapterId) 
                            ? <Button onClick={()=>handleMarkCompleted()} variant="primary" size="lg">Mark Completed</Button>
                            : <Button disabled variant="primary" size="lg">Completed</Button>
                    }
                </div>
            </div>
        )
    }

    const videoComponent = () => {
        return(
            <Container className="mt-5">
                <VideoPlaying
                    url={currentChapter.attachment}  
                    handleVideoProgress={handleVideoProgress}              
                >
                </VideoPlaying>
            </Container>
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
        // let fetchCondition = {
        //     userId: 1,
        //     subjectId: 1,
        //     chapterId: 1
        // }
        // call api
        // let quizInfo =  await QuizService.getInfoQuiz(fetchCondition)
        let quizInfo = quizInfoConstDataTest;

        return(
            <Container className="mt-5">
                {
                    quizInfo.map( (quiz, index) => {
                        return (
                            <Fragment key={index}>
                                <h1 className="mb-4">{quiz.quizName}</h1>
                                <div className="mt-3 p-3 w-100">
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h6>Receive grade</h6>
                                            <p>To Pass <strong>80% or higher</strong></p>
                                            <p>Time <strong>{quiz.duration} minutes</strong></p>
                                        </div>
                                        <div className="text-center">
                                            <Button onClick={()=>handleStartQuiz(quiz)} variant="primary" size="lg">Start quiz</Button>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h6>Your grade</h6>
                                        </div>
                                        <div className="text-right">
                                            <strong>2/2 <strong className="text-success">Passed</strong></strong>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </Container>
        )
    }

    return ( 
        <Container fluid>
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
                <div className={isShowMenuChapter ? 'col-9' : 'col-12'}>
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

// Call API to get 2 list
const chapterMenuDataTest = [
    {
        chapterId: 1,
        title: 'Chapter 1',
        attachment: 'Link 1',
        type: chapterType.LECTURE,
    },
    {
        chapterId: 2,
        title: 'Chapter 2',
        attachment: '',
        type: chapterType.QUIZ,
    },
    { 
        chapterId: 3,
        title: 'Chapter 3',
        attachment: 'https://www.youtube.com/watch?v=-lgr5smz6BU',
        type: chapterType.VIDEO,
    }
]

const tempUrlIconDataTest = {
    lecture: '/assets/icons/lecture.svg',
    quiz: '/assets/icons/quiz.svg',
    video: '/assets/icons/video.svg'
}

const quizInfoConstDataTest = [
    {
        quizId: 1,
        quizName: 'Quiz 1',
        totalQuestion: 20,
        duration: 60,
        isActive: true,
        createdBy: 'FPT'
    },   
    {
        quizId: 2,
        quizName: 'Quiz 2',
        totalQuestion: 10,
        duration: 30,
        isActive: true,
        createdBy: 'NNN'
    }
]

export default LearnSubjectComponent;