import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addTask} from "../api/TaskApi";
import axios from "axios";

export const logout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api-auth/logout/');
      console.log(response.data);
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  

export function MainContent({children}){

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = handleSubmit( async data => {
        await addTask(data);
    });

    return(
        
        <div className="container-fluid p-0">

            <section className="aside">

                <img className="header-icon"src="thumbnail.svg" alt="" />

                <ul className="lmenu">
                    <li className="menu-item"><i className="bi bi-house"></i><Link className="menu-link"  to="/proyects">Proyectos</Link></li>
                    <li className="menu-item"><i className="bi bi-folder"></i><Link className="menu-link" to="/dashboard">Tablero</Link></li>
                </ul>

                <hr className="separator" />

                <div className="menu-container d-flex justify-content-between mt-4">

                    <i className="bi bi-plus-circle" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"></i>
                    
                    <div className="offcanvas offcanvas-end"  data-bs-theme="dark" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">

                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasTopLabel">Añadir un proyecto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                        <div className="offcanvas-body">

                            <form onSubmit={onSubmit}className="">

                                <div className="input-group flex-nowrap mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre" aria-label="Username" aria-describedby="addon-wrapping" {...register("title", {required:true})}/>
                                </div>

                                <textarea className="form-control mb-3" placeholder="Descripcion" id="floatingTextarea2" {...register("description", {required:true})} ></textarea>
                                
                                <button className="btn btn-outline-success" data-bs-dismiss="offcanvas" onClick={() => window.location.reload()}>Añadir</button>

                            </form>
                        </div>

                    </div>
        
                </div>

            </section>

            <section className="content">

                <header className="header">
                        <h1>Fablab</h1>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" data-bs-theme="dark" placeholder="Buscar proyecto..." aria-label="Search" />
                        <button className="btn btn-dark" type="submit">Buscar</button>
                        <Link className="text-white" to="/login" onClick={logout}><i className="bi bi-box-arrow-right"></i></Link>
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