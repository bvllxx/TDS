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
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchProjects() {
            const res = await getProjects();
            setProjects(res.data);
        }
        fetchProjects();
        async function fetchUserData() {
            try {
              // Obtener la información del usuario al iniciar sesión
              const userResponse = await getUserInfo();
              setCurrentUser(userResponse.data.user); // Almacenar la información del usuario en el estado
              // Lógica adicional de obtención de proyectos, si es necesario...
            } catch (error) {
              console.error('Error al obtener la información del usuario', error.message);
            }
          }fetchUserData()
        
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

    const handleLogout = async () => {
        try {
          await logout();
          window.location.reload()
        } catch (error) {
          console.error('Error al cerrar sesión', error.message);
        }
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
                    className="form-control me-4"
                    type="search"
                    data-bs-theme="dark"
                    placeholder="Buscar proyecto..."
                    aria-label="Search" 
                    value={searchTerm}
                    onChange={handleSearch}/>

                    <button
                    className="btn btn-dark me-4"
                    type="submit">Buscar</button>


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
                            <Link 
                            className="menu-link"
                            to="/proyects">
                                <i className="bi bi-kanban me-3"></i>
                                Tablero
                            </Link>
                        </li>

                        <li
                        className="menu-item">
                            <Link
                            className="menu-link"
                            to="/dashboard">
                                <i className="bi bi-folder me-3"></i>
                                Proyectos
                            </Link>
                        </li>
                    </ul>

                    <div className="menu-container">
                        {currentUser && (
                        <>
                        {currentUser.groups[0].name === "admins" && (
                        <ul className="bmenu p-0">
                            
                            
                            <li
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasTop"
                            aria-controls="offcanvasTop"
                            className="bmenu-item">
                                <p className="bmenu-link">
                                    <i className="bi bi-plus-square me-3"></i>
                                    Añadir
                                </p>
                            </li>

                        </ul>
                        )} 
                        </>
                        )}
                        
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
                                        <option value={"interna"}>Interna</option>
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
                                            onClick={() => {window.location.reload()}}>
                                                Añadir
                                            </button>
                                </form>
                            </div>

                        </div>

                    </div>

                    <div
                    className="aside-footer"
                    >
                        <div className="dropdown ">
                            <a href="/" className="d-flex align-items-center text-white text-decoration-none m-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                
                                {currentUser && (
                                <>
                                <img src={`http://localhost:8000/${currentUser.profile_picture}`} alt="" width="32" height="32" className="rounded-circle me-2"/>
                                <strong>{currentUser.first_name}</strong>
                                </>
                                )}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><Link className="text-white dropdown-item" to="/" onClick={handleLogout}>Cerrar sesion</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                            </ul>
                        </div>

                    </div>

                </section>
               
                <section
                className="main">
                    <div
                    className="pcards-content">

                        {searchTerm ? searchResults.map((project) => (
                        <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 justify-content-center" key={project.id} data-bs-theme="dark">
                            <div className="list-group">
                                <a href="/" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                        <h6 className="mb-0">{project.title} </h6>
                                        <p className="mb-0 opacity-75">{project.description}</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">{project.begin_date}</small>
                                    </div>
                                </a>
                            </div>
                        </div>
                        )) : children}
                        
                    </div>
                </section>
            </section>        

        </div>
        </>
    )
}

export default MainContent;