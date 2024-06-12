import { Route, Routes } from 'react-router-dom';
import Header from './header.admin';
import Footer from './footer.admin';
import Sidebar from './sidebar.admin';
import PageNotFound from '../../../error/page-not-found';

function DefaultLayoutAdmin(){
    return(
        <>
            <div>
                <Sidebar/>
            </div>
            <div>
                <Header/>
                    <Routes>
                        <Route path="/*" element={<PageNotFound/>} />
                    </Routes>
                <Footer/>
            </div>
        </>
        
    )
}

export default DefaultLayoutAdmin;