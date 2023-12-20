import { Link } from "react-router-dom";
import getProjects from "../api/ProyectsApi";
import { getUserInfo, logout } from "../api/AuthApi";
import React, { useEffect,useState } from "react";
import AddUser from "../components/AddUsers";
import thumbnail from "../assets/thumbnail.png"; // Importa la imagen

export function MainContent({children}){
    
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        
        async function fetchProjects() {
            const res = await getProjects();
            setProjects(res.data);
        }fetchProjects();

        async function fetchUserData() {
            try {
              const userResponse = await getUserInfo();
              setCurrentUser(userResponse.data.user); 
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

    const handleLogout = async () => {
        try {
          await logout();
          window.location.reload()
        } catch (error) {
          console.error('Error al cerrar sesión', error.message);
        }
      };
  
    return(
        <>
        <div className="container-fluid p-0">
            <header
            className="header justify-content-between">
                <div
                className="navbar-brand">
                    <img src={thumbnail} className="me-2" width="46px" height="46px"alt="" />
                    <h1>FABLAB</h1>
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
                        className="menu-item"
                        data-bs-toggle="offcanvas" 
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop">
                            <p className="menu-link">
                                <i className="bi bi-plus-square me-3"></i>
                                Añadir
                            </p>
                        </li>

                        {/* <li
                        className="menu-item">
                            <Link
                            className="menu-link"
                            to="/dashboard">
                                <i className="bi bi-folder me-3"></i>
                                Proyectos
                            </Link>
                        </li> */}
                    </ul>

                    <div className="menu-container">
                        {currentUser && (
                        <>
                        {currentUser.groups[0].name === "admins" && (
                        <ul className="bmenu p-0">
                            
                        </ul>
                        )} 
                        </>
                        )}
                        
                        <AddUser/>
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