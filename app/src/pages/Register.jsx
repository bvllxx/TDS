import React, {useState} from "react";
import { Link } from "react-router-dom";
import { signin } from "../api/AuthApi";

export function RegisterForm(){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submitRegistration(e) {
        e.preventDefault();
        const userData =
          {
            email: email,
            username: username,
            password: password
          };
        signin(userData);
      }
    
    return (
        <div
        className="sign-body">
            <div
            className="sign-container"
            >
                

                <form
                action=""
                className="sign-form"
                onSubmit={e => submitRegistration(e)}>
                    <h3>Registrarse</h3>
                    <label>Nombre</label>
                    <input 
                    type="text" 
                    placeholder="Primer nombre"
                    value={email} onChange={e => setEmail(e.target.value)}/>

                    <label>Rut</label>
                    <input 
                    type="text" 
                    placeholder="rut"/>

                    <label>Apellido paterno</label>
                    <input 
                    type="text" 
                    placeholder="Apellido paterno"/>

                    <label>Apellido materno</label>
                    <input 
                    type="text" 
                    placeholder="Apellido materno"/>

                    <label>Correo electronico</label>
                    <input 
                    type="text" 
                    placeholder="Correo electronico"/>

                    <label>Numero de telefono</label>
                    <input 
                    type="number"
                    placeholder="Numero de telefono"
                    value={password} onChange={e => setPassword(e.target.value)} />

                    <label>Contraseña</label>
                    <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password} onChange={e => setPassword(e.target.value)} />

                    <button
                    type="submit">
                    Registrarse
                    </button>

                    <p>
                      Ya posee una cuenta?
                      <Link
                      to="/login/">
                      Iniciar sesion
                      </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default RegisterForm