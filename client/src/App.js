import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './app/error/page-not-found';
import DefaultLayoutManager from './app/shared/layouts/manager/default-layout.manager';
import DefaultLayoutAdmin from './app/shared/layouts/admin/default-layout.admin';
import AuthRoutes from './app/auth/auth.routes';
import DefaultLayoutTrainee from './app/shared/layouts/trainee/default-layout.trainee';
import DefaultLayoutTrainer from './app/shared/layouts/trainer/default-layout.trainer';
import { link } from './app/core/constants/link';
import NoAccessPage from './app/auth/pages/errorPage/noPermission';
import PrivateRoute from './app/auth/pages/privateRoute/privateRoute';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/*' element={<AuthRoutes />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/manager/*' element={<PrivateRoute element={<DefaultLayoutManager />} allowedRoles={['manager']} />} />
          <Route path='/admin/*' element={<PrivateRoute element={<DefaultLayoutAdmin />} allowedRoles={['admin']} />} />
          <Route path='/trainer/*' element={<PrivateRoute element={<DefaultLayoutTrainer />} allowedRoles={['trainer']} />} />
          <Route path={`${link.trainee}/*`} element={<PrivateRoute element={<DefaultLayoutTrainee />} allowedRoles={['trainee']} />} />
          <Route path="/no-access" element={<NoAccessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
