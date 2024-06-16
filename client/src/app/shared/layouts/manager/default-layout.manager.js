import { Route, Routes } from 'react-router-dom';
import Header from './header.manager';
import Footer from './footer.manager';
import Sidebar from './sidebar.manager';
import SubjectRoutes from '../../../manager/subject/subject.routes';
import PageNotFound from '../../../error/page-not-found';
import DashboardManagerPage from '../../../manager/dashboard/dashboard.manager';

function DefaultLayoutManager(){
    return(
        <>
            <div>
                <Sidebar/>
                <Header/>
                    <Routes>
                        <Route path="/dashboard" element={<DashboardManagerPage/>} />
                        <Route path="/subject/*" element={<SubjectRoutes/>} />
                        <Route path="/*" element={<PageNotFound/>} />
                    </Routes>
                <Footer/>
            </div>
        </>
    )
}

export default DefaultLayoutManager;