import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './app/error/page-not-found';
import DefaultLayoutManager from './app/shared/layouts/manager/default-layout.manager';
import DefaultLayoutAdmin from './app/shared/layouts/admin/default-layout.admin'
import AuthRoutes from './app/auth/auth.routes'
import DefaultLayoutTrainee from './app/shared/layouts/trainee/default-layout.trainee';
import DefaultLayoutTrainer from './app/shared/layouts/trainer/default-layout.trainer';
import { link } from './app/core/constants/link';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/*' element = {<AuthRoutes/>} />
          <Route path='*' element={<PageNotFound/>} />
          <Route path = '/manager/*' element = {< DefaultLayoutManager/>} />
          <Route path='/admin/*' element = {<DefaultLayoutAdmin/>}/>
          <Route path='/trainer/*' element = {<DefaultLayoutTrainer/>}/>
          <Route path={`${link.trainee}/*`} element = {<DefaultLayoutTrainee/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
