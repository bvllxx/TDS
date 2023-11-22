import React, { useState} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://localhost:8000/api-auth/",
  withCredentials: true
});

export function Aut() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "No tiene una cuenta? Registrarse";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Iniciar sesion";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "register/",
      {
        email: email,
        username: username,
        password: password
      },
      {withCredentials: true}
    ).then(function(res) {
      client.post(
        "login/",
        {
          email: email,
          password: password
        },
        {withCredentials: true}
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "login/",
      {
        email: email,
        password: password
      },
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  if (currentUser) {
    return (
        <Navigate to="/proyects" />
    );
  }
  return (
    <div className="container-log">
      {
        registrationToggle ? (
          <div >
            <form className='login-form' onSubmit={e => submitRegistration(e)}>
              <label>Correo electronico</label>
              <input type="email" className='log-input' placeholder="Correo electronico" value={email} onChange={e => setEmail(e.target.value)} />
              <label>Primer nombre</label>
              <input type="text" className='log-input' placeholder="Nombre" value={username} onChange={e => setUsername(e.target.value)} />
              <label>Apellido</label>
              <input type="text" className='log-input' placeholder="Apellido" />
              <label>Numero de telefono</label>
              <input type="text" className='log-input' placeholder="Numero de telefono" />
              <label>Contraseña</label>
              <input type="password" className='log-input' placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
              <button className="btn-log" type="submit">Registrarse</button>
              <li className="form-link" id="form_btn" onClick={update_form_btn}>Ya posee una cuenta? Inicie sesion</li>
            </form>
          </div>
        ) : (
          <div >
            <form className='login-form' onSubmit={e => submitLogin(e)}>
              <input type="email" className='log-input' placeholder="Correo electronico" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" className='log-input' placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
              <button className="btn-log"  type="submit">Iniciar Sesion</button>
              <li className="form-link"id="form_btn" onClick={update_form_btn}>No tiene una cuenta? Registrarse</li>
            </form>
          </div>
        )
      }
    </div>
  );
}

export default Aut;
