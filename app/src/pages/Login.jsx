import React, {useState} from "react";
import { Link,Navigate } from "react-router-dom";
import login from "../api/AuthApi";
import thumbnail from "../assets/thumbnail.png"; // Importa la imagen


export function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    function submitLogin(e) {
      e.preventDefault();
  
      login({email,password})
        .then(function(res) {
          if (res && res.data && res.data.access) {
            localStorage.setItem('accessToken', res.data.access);
            setCurrentUser(true);
          } else {
            setErrorMessage('Error: Token de acceso no encontrado en la respuesta.');
          }
        })
        .catch(function(error) {
          if (error.response && error.response.status === 401) {
            setErrorMessage('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
          } else {
            setErrorMessage('Ha ocurrido un error al iniciar sesión.');
          }
        });
    }
    if (currentUser) {
      return (<Navigate to="/proyects" />)
    }

    return(
        <>
        <div className="custom-body">
          <div
              className="row">
                  <div
                  className="log-container">
                    
                      <form 
                      className="log-form" data-bs-theme="dark"
                      onSubmit={e => submitLogin(e)}>
                        
                          <h3
                          className="mb-5 text-center">Iniciar sesion</h3>

                          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                          <label
                          className="form-label mb-4"
                          >Correo electronico</label>
                          <input 
                          type="text" 
                          className="form-control mb-4"
                          placeholder="Correo electronico"
                          value={email} onChange={e => setEmail(e.target.value)}/>

                          <label
                          className="mb-4"
                          >Contraseña</label>
                          <input
                          type="password" 
                          className="form-control mb-4"
                          placeholder="Contraseña"
                          value={password} onChange={e => setPassword(e.target.value)}/>

                          <p
                          className="text-center mb-4">
                              No tiene una cuenta?
                              <Link 
                              className="pl-2 account-link"
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
              
          <div
          className="log-body">
              
              <div className="log-start">
                <h1 className="log-title">Bienvenido a Fablab</h1>
                <img src={thumbnail} alt="imagen" width="560" height="560" />
                <p className="log-subtitle">CONCEPCIÓN - TALCAHUANO</p>
              </div>
          </div>
        </div>

        </>
    )
}

export default LoginForm;