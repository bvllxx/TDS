import MainContent from './pages/Base';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import React from 'react';
import ProyectContent from './components/ListProyects';
import DashboardContent from './components/Dashboard';
import ProyectView from './components/ProyectView';
import LoginForm from './pages/Login';
import SignupForm from './pages/Register';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signin' element={<SignupForm/>}/>
        <Route path="/proyects" element={  <MainContent> <ProyectContent /> </MainContent> } />
        <Route path="/proyects/edit/:id" element={  <MainContent> <ProyectView /> </MainContent> } />
        <Route path="/dashboard" element={ <MainContent> <DashboardContent /> </MainContent> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
//        --></Routes><Route path="/del-id" element={ </> } />