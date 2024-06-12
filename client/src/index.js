import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './components/common/landingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery'; 
import Popper from 'popper.js'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>
);

