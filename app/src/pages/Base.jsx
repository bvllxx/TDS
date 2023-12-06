import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import getProjects, { addProject } from "../api/ProyectsApi";
import { getUserInfo, logout } from "../api/AuthApi";
import React, { useEffect,useState } from "react";

export function MainContent({children}){
    
    const {register,handleSubmit} = useForm();
    const [selectedOption, setSelectedOption] = useState("Inacap");
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const res = await getProjects();
            setProjects(res.data);
        }
        fetchProjects();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const results = projects.filter((project) =>
          project.title.includes(e.target.value)
        );
        setSearchResults(results);
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const onSubmit = async (data) => {
        try {
            await addProject(data)
          } catch (error) {
            console.error('Error al crear el proyecto', error.message);
          }
    };
  
    return(
        <>
        <div className="container-fluid p-0">
            <header
            className="header justify-content-between">
                <div
                className="navbar-brand">
                    <h1>Fablab</h1>
                </div>

                <form
                className="d-flex"
                role="search" >

                    <input
                    className="form-control me-2"
                    type="search"
                    data-bs-theme="dark"
                    placeholder="Buscar proyecto..."
                    aria-label="Search" 
                    value={searchTerm}
                    onChange={handleSearch}/>

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
            className="content">

                <section
                className="aside">
                    <ul
                    className="lmenu p-0">
                        <li 
                        className="menu-item">
                            <i class="bi bi-kanban"></i>
                            <Link 
                            className="menu-link"
                            to="/proyects">Tablero</Link>
                        </li>
                        <li
                        className="menu-item">
                            <i 
                            className="bi bi-folder"></i>
                            <Link
                            className="menu-link"
                            to="/dashboard">Proyectos</Link>
                        </li>
                    </ul>

                    <div className="menu-container d-flex">

                        <ul className="bmenu">
                            <li
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasTop"
                            aria-controls="offcanvasTop"
                            className="bmenu-item">
                                <i class="bi bi-plus-square"></i>
                                <p className="bmenu-link">Añadir</p>
                            </li>
                        </ul>
                        
                        
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

                                    <select
                                    className="form-select mb-3"
                                    value={selectedOption}
                                    onChange={handleChange}
                                    aria-label="Fuente de financiamiento">
                                        <option>Interna</option>
                                        <option>Externa</option>
                                    </select>

                                    {selectedOption === "Externa" && (
                                        <input
                                        type="text"
                                        {...register("founding_src_name", {required:true})}
                                        className="form-control mb-3"
                                        placeholder="Nombre de la empresa"
                                        aria-describedby="addon-wrapping" />
                                    )}

                                    <button
                                    className="btn btn-outline-success"
                                    data-bs-dismiss="offcanvas"
                                    type="submit"
                                    onClick={() => {window.location.reload()}} >Añadir</button>
                                </form>
                            </div>

                        </div>

                    </div>

                    <div
                    className="aside-footer"
                    >
                        <p className="fw-medium text-center pt-4">Bienvenido usuario</p>

                    </div>

                </section>
               
                <section
                className="main">
                    <div
                    className="pcards-content">

                    {searchTerm ? searchResults.map((project) => (
                    <div key={project.id} className="pcard">{project.title}</div>
                    )) : children}
                        
                    </div>
                </section>
            </section>          
        </div>
        </>
    )
}

export default MainContent;