import { Routes, Route } from 'react-router-dom';
import LandingPage from '../shared/layouts/common/landingPage';
import LoginPage from './pages/login/login.page';
import RegisterPage from './pages/register/register.page';
import PageNotFound from '../error/page-not-found';
import ForgotPassPage from './pages/forgotPass/forgotPass'
function AuthRoutes(){
    return (
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path='/forgot-pass' element={<ForgotPassPage/>} />
            <Route path="/*" element={<PageNotFound />} />
        </Routes>
    )
}

export default AuthRoutes;