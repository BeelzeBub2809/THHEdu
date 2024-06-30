import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './header.trainee';
import Sidebar from './sidebar.trainee';
import PageNotFound from '../../../error/page-not-found';
import DashboardTraineePage from '../../../trainee/dashboard/dashboard.trainee';
import MySubjectComponent from '../../../trainee/my-subject/my-subject.trainee';
import QuestionPracticeScreen from '../../../trainee/question-screen/index';
import { link } from '../../../core/constants/link';

function DefaultLayoutTrainee(){

    const location = useLocation();
    const isPracticeQuiz = location.pathname === `${link.trainee}${link.traineePracticeQuiz}`;
    
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
                        <Route path = {link.traineePracticeQuiz} element = {<QuestionPracticeScreen/>}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    )
}

export default DefaultLayoutTrainee;