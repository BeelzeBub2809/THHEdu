import { Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from '../../../error/page-not-found';
import { link } from '../../../core/constants/link';
import TrainerListComponent from '../../../trainer/TraineeList/trainee-list.trainer';
import Header from './HeaderAndSidebar/header.trainer';
import Sidebar from './HeaderAndSidebar/sidebar.trainer';
import TrainerAssignment from '../../../trainer/Assignment/assignment.trainer';
import StudentAssignment from '../../../trainer/Assignment/StudentAssignment/studentAssignment.trainer';

function DefaultLayoutTrainer(){

    const location = useLocation();
    const isPracticeQuiz = location.pathname === `${link.trainee}${link.traineePracticeQuiz}`;
    
    return(
        <div className='container-fluid' style={{ padding: 0 }}>
            <Header />
            <div className='container-fluid' style={{flexDirection: 'row', padding: 0, gap : 50}}>
                <Sidebar />
                <div className='container-fluid'>
                    <Routes>
                        <Route path='/assignment' element={<TrainerAssignment />} />
                        <Route path='/traineeList' element={<TrainerListComponent/>}/>
                        <Route path='/studentAssignment' element={<StudentAssignment/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayoutTrainer;