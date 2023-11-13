import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addTask } from "../api/TaskApi";

export function MainContent({children}){

    const {register,handleSubmit } = useForm();

    const onSubmit = handleSubmit( async data => {
        const res = await addTask(data);
        console.log(res);
    });

    return(
        
        <div className="container-fluid p-0">

            <section className="aside">

                <h1>Tareas</h1>

                <ul className="lmenu">
                    <li className="menu-item"><i className="bi bi-house-fill"></i><Link className="menu-link" to="/proyects">Proyectos</Link></li>
                    <li className="menu-item"><i className="bi bi-folder-fill"></i><Link className="menu-link" to="/dashboard">Tablero</Link></li>
                </ul>

                <hr className="separator" />

                <div className="menu-container">

                    <div className="btn-group dropup">
                        <i className="bi bi-person-circle dropdown-button" data-bs-theme="dark" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu text-bg-dark ">
                            <li><button className="dropdown-item text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Agregar proyecto</button></li>
                            <li><Link to="/login"><button className="dropdown-item text-white" type="button">Cerrar Sesion</button></Link></li>
                        </ul>
                    </div>

                    <div className="offcanvas offcanvas-top"  data-bs-theme="dark" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">

                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasTopLabel">Añadir un proyecto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body ">
                            <form onSubmit={onSubmit} className="form-container">
                                <input 
                                type="text"
                                placeholder="Nombre"
                                {...register("title", {required:true})}
                                />
                                <textarea name="" id="" rows="3" placeholder="Descripcion"></textarea>
                                <button className="btn-add">Enviar</button>
                            </form>
                        </div>

                    </div>
        
                </div>

            </section>

            <section className="content">

                <header className="header">
                    <div className="header-icon">
                        <h1>Fablab</h1>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" data-bs-theme="dark" placeholder="Buscar proyecto..." aria-label="Search" />
                        <button className="btn btn-dark" type="submit">Buscar</button>
                    </form>
                </header>

                <section className="main">
                    <div className="pcards-content">
                        {children}
                    </div>
                    
                </section>

                
            </section>          
        </div>
    )
}

export default MainContent;