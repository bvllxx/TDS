import React from 'react';
import {Nav} from "../components/Nav";
import '../App.css'
import { getAllTasks } from '../api/TaskApi';


export function TaskSPage(){

    return(
        <div class="container">

        <section class="aside">

            <h1>Tareas</h1>
            <Nav/>

        </section>

        <section class="content">
            <header class="header">
                <div class="header-icon">
                    <h1>Fablab</h1>
                </div>
            </header>

            <section class="main">
                <div class="li-container ">
                    <h1 class="li-title">Pendientes</h1>
                    
                    <hr class="separator"/> 
                
                    <ul class="cards">

                        <div class="card">
                            <p>Proyecto con nombre generico</p>
                        </div>
                
                    </ul>
                </div>
            </section>

        </section>

    </div>
    )
}