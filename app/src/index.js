import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import './assets/style/login.css';
import './assets/style/project.css';
import './assets/style/register.css';
import 'bootstrap-icons/font/bootstrap-icons.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

