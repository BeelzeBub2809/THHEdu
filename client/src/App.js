import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageNotFound from './app/error/page-not-found';
import DefaultLayoutAdmin from './app/shared/layouts/admin/default-layout.admin'
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/*' element={<PageNotFound/>} />
          <Route path = 'manager/*' element = {< DefaultLayoutAdmin/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
