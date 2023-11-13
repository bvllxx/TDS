import MainContent from './pages/Base';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import React from 'react';
import ProyectContent from './components/ListProyects';
import DashboardContent from './components/Dashboard';
import LoginPage from './pages/Login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/proyects" element={  <MainContent> <ProyectContent /> </MainContent> } />
        <Route path="/dashboard" element={ <MainContent> <DashboardContent /> </MainContent> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
//        --></Routes><Route path="/del-id" element={ </> } />