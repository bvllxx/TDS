import MainContent from './pages/Base';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import React from 'react';
import ProyectContent from './components/ListProyects';
import DashboardContent from './components/Dashboard';
import ProyectView from './components/ProyectView';
import Aut from './api/AuthApi';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signin' element={<RegisterForm/>}/>
        <Route path="/proyects" element={  <MainContent> <ProyectContent /> </MainContent> } />
        <Route path="/proyects/edit" element={  <MainContent> <ProyectView /> </MainContent> } />
        <Route path="/dashboard" element={ <MainContent> <DashboardContent /> </MainContent> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
//        --></Routes><Route path="/del-id" element={ </> } />