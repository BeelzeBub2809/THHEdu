import { Route, Routes } from 'react-router-dom';
import Header from './header.manager';
import Sidebar from './sidebar.manager';
import SubjectRoutes from '../../../manager/subject/subject.routes';
import PageNotFound from '../../../error/page-not-found';
import DashboardManagerPage from '../../../manager/dashboard/dashboard.manager';

function DefaultLayoutManager(){
    return(
        <>
            <div className='container-fluid' style={{ padding: 0 }}>
                <Header/>
                <div className='container-fluid' style={{flexDirection: 'row', padding: 0, gap : 50}}>
                    <Sidebar/>
                    <div className='container-fluid'>
                        <Routes>
                            <Route path="/dashboard" element={<DashboardManagerPage/>} />
                            <Route path="/subject/*" element={<SubjectRoutes/>} />
                            <Route path="/*" element={<PageNotFound/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DefaultLayoutManager;