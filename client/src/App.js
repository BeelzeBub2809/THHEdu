import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './app/error/page-not-found';
import DefaultLayoutManager from './app/shared/layouts/manager/default-layout.manager';
import AuthRoutes from './app/auth/auth.routes'
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/*' element = {<AuthRoutes/>} />
          <Route path='*' element={<PageNotFound/>} />
          <Route path = '/manager/*' element = {< DefaultLayoutManager/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
