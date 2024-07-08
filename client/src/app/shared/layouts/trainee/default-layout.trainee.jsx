import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header.trainee';
import Sidebar from './sidebar.trainee';
import PageNotFound from '../../../error/page-not-found';
import DashboardTraineePage from '../../../trainee/dashboard/dashboard.trainee';
import MySubjectComponent from '../../../trainee/my-subject/my-subject.trainee';
import QuestionPracticeScreen from '../../../trainee/question-screen/index';
import { link } from '../../../core/constants/link';
import SubjectDetailComponent from '../../../trainee/subject-detail/subject-detail.trainee';
import LearnSubjectComponent from '../../../trainee/learning-subject';

function DefaultLayoutTrainee(){

    const location = useLocation();
    const isPracticeQuiz = location.pathname.includes(`${link.trainee}${link.traineePracticeQuiz}`);
    
    return(
        <div className = 'container-fluid' style = {{ padding: 0 }}>
            <Header/>
            <div className = 'container-fluid' style = {{flexDirection: 'row', padding: 0}}>
                {!isPracticeQuiz && (
                    <div>
                        <Sidebar />
                    </div>
                )}
                <div className = {`container-fluid ${ !isPracticeQuiz && `col-10` }`} style = {{paddingTop: '1em'}}>
                    <Routes>
                        <Route path = {link.traineeDashboard} element = {<DashboardTraineePage/>}/>
                        <Route path = {`${link.traineeMySubject}/*`} element = {<MySubjectComponent/>}/>
                        <Route path = "/*" element = {<PageNotFound/>}/>
                        <Route path = {`${link.traineePracticeQuiz}/:quizId`} element = {<QuestionPracticeScreen/>}/>
                        <Route path = {`${link.traineeSubjectDetail}/:subjectId`} element = {<SubjectDetailComponent/>}/>
                        <Route path = {`${link.traineeLearnSubject}/:subjectId`} element = {<LearnSubjectComponent/>}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    )
}

export default DefaultLayoutTrainee;