import React from "react";
import {Link} from 'react-router-dom';
import './App.css'


export function Nav(){
    return(
        <div>
            <hr class="separator"/>

            <ul class="lmenu">
                <li class="menu-item"><Link to="/tasks"><a class="menu-link">Tareas</a></Link></li>
                <li class="menu-item"> <Link to="/tasks-create"><a class="menu-link">Proyectos</a></Link></li>
            </ul>

            <hr class="separator"/>

            <div class="menu-container">
                <button class="dropdown-button" id="dropdownButton">Menú</button>
                <ul class="dropdown-menu" id="dropdownMenu">
                    <li><a href="#">Añadir Proyecto</a></li>
                    <li><a href="#">Configuracion</a></li>
                    <hr class="separator"/>
                    <li><a href="#">Cerrar Sesion</a></li>
                </ul>

                <div id="offcanvas" class="offcanvas">
                    <a href="#" class="close-button" id="closeOffcanvas">Cerrar</a>
                    <form action="">
                        <input type="text" placeholder="Nombre del proyecto" id="pname"/>
                        <button id="addBtn">Listo</button>
                    </form>
                </div>
            </div>
        </div>
    )
}