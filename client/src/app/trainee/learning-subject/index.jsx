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
import { ChapterService } from '../../core/services/chapter.service';
import { JoinedSubjectService } from '../../core/services/joined-subject.service';

function LearnSubjectComponent(){
    const navigation = useNavigate();

    const { subjectId: subjectId } = useParams();
    const [isShowMenuChapter, setIsShowChaterList] = useState(true);
    const [listChapters, setListChapters] = useState([]); 
    const [currentChapter, setCurrentChapter] = useState();
    const [learnedChapters, setLeanredChapters] = useState([]);
    const [reFetchLearnedChapter, setReFetchLearnedChapter] = useState(0);

    useEffect( () => {
        async function fetchChapter(){
            let dataChapterFetch = await ChapterService.getChaptersBySubject(subjectId);
            setListChapters(dataChapterFetch);
            setCurrentChapter(dataChapterFetch[0]);
        }
        fetchChapter();
    }, [subjectId]);


    useEffect( () => {
        async function fetchLearnedChapter(){
            if(subjectId){
                //TODO: Need update after change database model
                let learnedChapterData = await JoinedSubjectService.getLearnedChapterBySubject(AuthService.getUserId(), subjectId);
                if( learnedChapterData){
                    setLeanredChapters(learnedChapterData);
                } else {
                    setLeanredChapters([]);
                }
            }
        }
        fetchLearnedChapter();
    }, [reFetchLearnedChapter]);

    const handleSelectChapter = (_id) => {
        setCurrentChapter(listChapters.find(c => c._id === _id));
    }

    const handleStartQuiz = (_id) => {
        navigation(`${link.trainee}${link.traineePracticeQuiz}/${subjectId}/${currentChapter._id}/${_id}`)
    }

    const handleVideoProgress = (progress) => {
        if(progress.played*100 > MIN_TIME_LEARN_VIDEO){
            submitLearnedChapter();
        }
    };

    const handleMarkCompleted = () => {
        submitLearnedChapter();
    }

    const submitLearnedChapter = async () => {
        if( !learnedChapters.includes(currentChapter._id)){
            try{
                await JoinedSubjectService.markLearnedChapter(AuthService.getUserId(), subjectId, currentChapter._id);
            }
            catch (error) {
            }
            setReFetchLearnedChapter(prev => prev + 1);
        }
    }

    const menuComponent = () => {
        return(
            <Col className='col-3'>
                {
                    listChapters.length > 0 && listChapters.map( (chapter, index ) => {
                        return (
                            <div key={index} >
                                <div className="btn btn-light w-100 text-start rounded-0 p-3 border-bottom d-flex"
                                    style={{backgroundColor: learnedChapters.includes(chapter._id) ? theme.colors.successLight : ''}}
                                    onClick={() => handleSelectChapter(chapter._id)}
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
                    currentChapter.content
                }
                <div className="text-center">
                    {
                        !learnedChapters.includes(currentChapter._id) 
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
                    url={currentChapter.linkVideo}  
                    handleVideoProgress={handleVideoProgress}              
                >
                </VideoPlaying>
            </Container>
        )
    }

    const quizComponent =  () => {
        return(
            <Container className="mt-5">
                {
                    currentChapter.quizzes.map( (quiz, index) => {
                        return (
                            <Fragment key={index}>
                                <h1 className="mb-4">{quiz.quizName}</h1>
                                <div className="mt-3 p-3 w-100">
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h6>Receive grade</h6>
                                            <p>To Pass: <strong>{quiz.minMark}% or higher</strong></p>
                                            <p>Time <strong>{quiz.duration} minutes</strong></p>
                                        </div>
                                        <div className="text-center">
                                            <Button onClick={()=>handleStartQuiz(quiz._id)} variant="primary" size="lg">Start quiz</Button>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <h6>Your grade</h6>
                                        </div>
                                        <div className="text-right">
                                            {/* <strong>2/2 <strong className="text-success">Passed</strong></strong> */}
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
                    <h2>{ currentChapter && currentChapter.title}</h2>
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
                        currentChapter && (currentChapter.type === chapterType.LECTURE ? lectureComponent() 
                            : currentChapter.type === chapterType.VIDEO ? videoComponent() 
                            : quizComponent())  
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