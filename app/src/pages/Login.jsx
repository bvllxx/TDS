import React, {useState} from "react";
import { Link,Navigate } from "react-router-dom";
import login from "../api/AuthApi";

export function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    /*
    Esta funcion gestiona la accion del formulario al ser enviado, en este caso, inicia sesion
    al hacer click en el boton correspondiente

    Se captura el error 400 (bad request) si las credenciales son incorrectas
    
    */

    function submitLogin(e) {
        e.preventDefault();
        try {
            const userData = {
            email: email,
            password: password
        }
        login(userData)
        .then(function(res) {
          setCurrentUser(true);
        })
        .catch (function (error){
            if (error.response && error.response.status === 400) {
                setErrorMessage('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
              } else {
                setErrorMessage('Ha ocurrido un error. Inténtalo de nuevo más tarde.');
              }
        })
      } catch {
        setErrorMessage('Ha ocurrido un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    }

      if (currentUser) {
        return (
            <Navigate to="/proyects" />
        )
      }

    return(
        <>
        {errorMessage && <p>{errorMessage}</p>}
        <div
        className="log-body">
            <div
            className="row">
                <div
                className="log-container">
                   
                    <form 
                    className="log-form" data-bs-theme
                    onSubmit={e => submitLogin(e)}>
                      
                        <h3>Iniciar sesion</h3>

                        <label
                        className="form-label"
                        >Correo electronico</label>
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder="Correo electronico"
                        value={email} onChange={e => setEmail(e.target.value)}/>

                        <label
                        className="label-form"
                        >Contraseña</label>
                        <input
                        type="password" 
                        className="form-control"
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
                        className="btn-log"
                        type="submit">Iniciar sesion</button>
                    
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginForm;