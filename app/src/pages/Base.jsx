import React from "react";
import '../App.css';
import ProyectContent from '../components/Proyects'
import DashboardContent from '../components/Dashboard'
import {Routes,Route,Link} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function MainContent(){
    return(
        <div className="container">

            <section className="aside">

                <h1>Tareas</h1>

                <ul className="lmenu">
                    <li className="menu-item">
                        
                        <i class="bi bi-house-fill"></i>
                        <Link className="menu-link" to="/">Proyectos</Link>
                    </li>
                    <li className="menu-item"><i class="bi bi-folder-fill"></i><Link className="menu-link" to="/dashboard">Tablero</Link></li>
                </ul>

                <hr className="separator" />

                <div className="menu-container">
                    
                    <div className="btn-group dropup">
                        <i className="bi bi-person-circle dropdown-button" data-bs-toggle="dropdown" aria-expanded="false"  id="dropdownButton"></i>
                        <ul className="dropdown-menu">
                            <a data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" href="">Cerrar Sesion</a>
                        </ul>
                    </div>

                    <div className="offcanvas offcanvas-end" tabIndex={-1}id="offcanvasRight"aria-labelledby="offcanvasRightLabel">

                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasRightLabel">
                            Offcanvas right
                            </h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body">...</div>
                    </div>



                </div>
            </section>

            <section className="content">

                <header className="header">
                <div className="header-icon">
                    <h1>Fablab</h1>
                </div>
                </header>

                <Routes>
                    <Route path="/" element={<ProyectContent />} />
                    <Route path="/dashboard" element={<DashboardContent />} />
                </Routes>
                
            </section>          
        </div>
    )
}

export default MainContent;