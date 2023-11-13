import React from "react";
import {Link} from "react-router-dom";

export function LoginPage(){

    return (
        <>
        <div className="container-fluid container-log">
            
            <form action="" className="login-form">
                <h1>Bienvenido a fablab</h1>
                <input type="text" className="log-input" placeholder="Usuario" />
                <input type="password" className="log-input" placeholder="Contraseña" />
                <Link to="/proyects">
                <button>Iniciar sesión</button>
                </Link>
                <a href="/" className="form-link">Crear una cuenta</a>
            </form>
        </div>
        </>
    )
}

export default LoginPage;
