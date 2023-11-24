import React, {useState} from "react";
import { Link,Navigate } from "react-router-dom";
import login from "../api/AuthApi";

export function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState();

    /*
    Esta funcion gestiona la accion del formulario al ser enviado, en este caso, inicia sesion
    al hacer click en el boton correspondiente
    */

    function submitLogin(e) {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        login(userData)
        .then(function(res) {
          setCurrentUser(true);
        });
      }

      if (currentUser) {
        return (
            <Navigate to="/proyects" />
        );
      }

    return(
        <>
        <div
        className="log-body">
            <div
            className="row">
                <div
                className="log-container">
                   
                    <form 
                    action=""
                    className="log-form"
                    data-bs-theme="dark"
                    onSubmit={e => submitLogin(e)}>

                        <h3>Iniciar sesion</h3>

                        <label
                        className="mb-3 "
                        >Correo electronico</label>
                        <input 
                        type="text" 
                        className="form-control mb-3"
                        placeholder="Correo electronico"
                        value={email} onChange={e => setEmail(e.target.value)}/>

                        <label
                        className="mb-3"
                        >Contraseña</label>
                        <input
                        type="password" 
                        className="form-control mb-3"
                        placeholder="Contraseña"
                        value={password} onChange={e => setPassword(e.target.value)}/>

                        <p
                        className="text-center">
                            No tiene una cuenta?
                            <Link 
                            to="/signin/">
                                Registrarse
                            </Link>
                        </p>

                        <button
                        className="btn btn-success"
                        type="submit">Iniciar sesion</button>
                    
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginForm;