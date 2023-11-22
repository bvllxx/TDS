import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from 'js-cookie';

const getCsrfTokenFromCookies = () => {
    return Cookies.get('csrftoken');
};

const csrfToken = getCsrfTokenFromCookies();

export const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api-auth/logout/');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
};

export function MainContent({children}){
    
    const {register,handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(
              "http://localhost:8000/tasks/create/",
              data,
              {
                headers: {
                  'X-CSRFToken': csrfToken,
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }

            );
          } catch (error) {
            console.error('Error al crear la tarea:', error.message);
            
          }
    };
  
    return(
        <div className="container-fluid p-0">
            <section className="aside">
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
                        <div className="offcanvas-body ">
                            <form onSubmit={handleSubmit(onSubmit)}className="">
                                <div className="input-group flex-nowrap mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre del proyecto" aria-describedby="addon-wrapping" {...register("title", {required:true})}/>
                                </div>
                                <textarea className="form-control mb-3" placeholder="Descripcion" id="floatingTextarea2" {...register("description", {required:true})} ></textarea>
                                <hr />
                                <label className="">Fecha de inicio</label>
                                <input className="mb-3" type="date"  {...register("begin_date", {required:true})} />

                                <label className="">Fecha de termino</label>
                                <input className="mb-3" type="date"  {...register("end_date", {required:true})} />
                                
                                <hr />

                                <input type="text"  {...register("founding_src_name", {required:true})} className="form-control mb-3" placeholder="Fuente de financiamiento" aria-describedby="addon-wrapping" />

                                <select class="form-select mb-3" aria-label="Fuente de financiamiento">
                                    <option selected>Inacap</option>
                                    <option value="1">Externa</option>
                                </select>


                                <button className="btn btn-outline-success" data-bs-dismiss="offcanvas" type="submit" onClick={() => {window.location.reload()}} >Añadir</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content">
                <header className="header">
                    <h1>Fablab</h1>
                    <form className="d-flex" role="search" >
                        <input className="form-control me-2" type="search" data-bs-theme="dark" placeholder="Buscar proyecto..." aria-label="Search" />
                        <button className="btn btn-dark" type="submit">Buscar</button>
                        <Link className="text-white" to="/" onClick={logout}><i className="bi bi-box-arrow-right"></i></Link>
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