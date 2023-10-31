import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route,Navigate} from "react-router-dom"
import { TaskSPage } from './pages/TaskPage';
import { ProyectPage } from './pages/Proyects'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/tasks"}/>} Route/>
        <Route path="/tasks" element={<TaskSPage/>} Route/>
        <Route path="/tasks-create" element={<ProyectPage/>} Route/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
