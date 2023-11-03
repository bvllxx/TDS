import MainContent from './pages/Base';
import {BrowserRouter} from "react-router-dom";
import React from 'react';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainContent/>
    </BrowserRouter>
  );
}

export default App;
