import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addProject } from "../api/ProyectsApi";
import { logout } from "../api/AuthApi";
import { getUserInfo } from "../api/AuthApi";
import { useState,useEffect } from "react";

export function MainContent({children}){
    
    const {register,handleSubmit} = useForm();
    const [userInfo, setUserInfo] = useState([]); 

    useEffect(() => {
        async function fetchUserInfo(){
            const res = await getUserInfo();
            setUserInfo(res.data.user.groups);
        }fetchUserInfo();
    }, []);

    const onSubmit = async (data) => {
        try {
            await addProject(data)
          } catch (error) {
            console.error('Error al crear la tarea:', error.message);
          }
    };
  
    return(
        <>
        {console.log(userInfo)}
        <div className="container-fluid p-0">
            
            <section
            className="aside">
            <h1>Fablab</h1>
                <ul
                className="lmenu p-0">
                    <li 
                    className="menu-item">
                        <i
                        className="bi bi-house"></i>
                        <Link 
                        className="menu-link"
                        to="/proyects">Proyectos</Link>
                    </li>
                    <li
                    className="menu-item">
                        <i 
                        className="bi bi-folder"></i>
                        <Link
                        className="menu-link"
                        to="/dashboard">Tablero</Link>
                    </li>
                </ul>

                <div 
                className="menu-container d-flex justify-content-center mt-4">
                    <div
                    className="btn-add"
                    data-bs-toggle="offcanvas" 
                    data-bs-target="#offcanvasTop"
                    aria-controls="offcanvasTop">
                        <ul 
                        className="bmenu">
                            <li 
                            className="menu-item">
                                <i
                                className="bi bi-plus-circle menu-link">
                                    </i>Añadir</li>
                        </ul>
                    </div>
                    
                    <div
                    className="offcanvas offcanvas-end"
                    data-bs-theme="dark"
                    tabIndex="-1"
                    id="offcanvasTop"
                    aria-labelledby="offcanvasTopLabel">
                        <div 
                        className="offcanvas-header">
                            <h5 
                            className="offcanvas-title"
                            id="offcanvasTopLabel">Añadir un proyecto</h5>
                            <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                        </div>
                        <div
                        className="offcanvas-body ">
                            <form 
                            onSubmit={handleSubmit(onSubmit)}
                            className="">
                                <div
                                className="input-group flex-nowrap mb-3">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del proyecto"
                                    aria-describedby="addon-wrapping" 
                                    {...register("title", {required:true})}/>
                                </div>
                                <textarea
                                className="form-control mb-3"
                                placeholder="Descripcion"
                                id="floatingTextarea2"
                                {...register("description",
                                {required:true})} ></textarea>
                                
                                <hr />
                                
                                <label
                                className=""
                                >Fecha de inicio
                                </label>
                                <input
                                className="mb-3"
                                type="date"
                                {...register("begin_date",
                                {required:true})}
                                />

                                <label
                                className="">Fecha de termino</label>
                                <input
                                className="mb-3"
                                type="date"
                                {...register("end_date", {required:true})} />
                                
                                <hr />

                                <input
                                type="text"
                                {...register("founding_src_name", {required:true})}
                                className="form-control mb-3"
                                placeholder="Fuente de financiamiento"
                                aria-describedby="addon-wrapping" />

                                <select
                                className="form-select mb-3"
                                defaultValue={"Seleccione una opcion"}
                                aria-label="Fuente de financiamiento">
                                    <option
                                    >Inacap</option>
                                    <option
                                    value="1">Externa</option>
                                </select>
                                
                                <button
                                className="btn btn-outline-success"
                                data-bs-dismiss="offcanvas"
                                type="submit"
                                onClick={() => {window.location.reload()}} >Añadir</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section
            className="content">
                <header
                className="header">
                    <form
                    className="d-flex"
                    role="search" >
                        <input
                        className="form-control me-2"
                        type="search"
                        data-bs-theme="dark"
                        placeholder="Buscar proyecto..."
                        aria-label="Search" />
                        <button
                        className="btn btn-dark"
                        type="submit">Buscar</button>
                        <Link
                        className="text-white"
                        to="/"
                        onClick={logout}>
                            <i
                            className="bi bi-box-arrow-right"></i>
                        </Link>
                    </form>
                </header>
                <section
                className="main">
                    <div
                    className="pcards-content">
                        
                        {children}
                        
                    </div>
                </section>
            </section>          
        </div>
        </>
    )
}

export default MainContent;