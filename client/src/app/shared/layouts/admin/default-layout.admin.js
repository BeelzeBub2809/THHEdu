import { Route, Routes } from 'react-router-dom';
import HeaderAdmin from './HeaderAndSidebar/header.admin';
import SidebarAdmin from './HeaderAndSidebar/sidebar.admin';
import DashboardAdmin from '../../../admin/DashBoard/dashboard';
import PageNotFound from '../../../error/page-not-found';
import UserManagement from '../../../admin/user/userManage';

function DefaultLayoutAdmin() {
    return (
        <div className='container-fluid' style={{ padding: 0 }}>
            <HeaderAdmin />
            <div className='container-fluid' style={{flexDirection: 'row', padding: 0, gap : 50}}>
                <SidebarAdmin />
                <div className='container-fluid'>
                    <Routes>
                        <Route path='/dashboard' element={<DashboardAdmin />} />
                        <Route path='/user' element={<UserManagement/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayoutAdmin;