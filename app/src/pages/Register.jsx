import React, {useState} from "react";
import { Link } from "react-router-dom";
import { signup } from "../api/AuthApi";
import { useEffect } from "react";

export function SignupForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rut, setRut] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [company, setCompanyName] = useState('');
    const [institution, setInstitution] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    useEffect(() => {
      const forms = document.querySelectorAll('.needs-validation');

      Array.from(forms).forEach(form => {
          form.addEventListener('submit', event => {
              if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
              }

              form.classList.add('was-validated');
          }, false);
      });
  }, []); 

    function submitRegistration(e) {
        e.preventDefault();
        const userData =
          {
            rut:rut,
            email: email,
            first_name:first_name,
            last_name:last_name,
            institution:institution,
            occupation:occupation,
            company:company,
            phone_number:phone_number,
            password: password
          };
        signup(userData);
      }
    
    return (
        <div
        className="sign-body">
            <div
            className="sign-container"
            >
              <form
              className="row g-3 needs-validation"
              noValidate
              data-bs-theme="dark"
              onSubmit={e => submitRegistration(e)}>

                <div
                  className="col-md-6">

                    <label
                    htmlFor="nameID"
                    className="form-label">
                      Nombre
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    required 
                    value={first_name} onChange={e => setFirstName(e.target.value)}/>

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-6">

                    <label
                    for="snameID"
                    className="form-label">
                      Apellido
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="snameID"
                    required
                    value={last_name} onChange={e => setLastName(e.target.value)}/>

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-4">

                    <label
                    for="nameID"
                    className="form-label">
                      Correo electronico
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    required
                    value={email} onChange={e => setEmail(e.target.value)} />

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-4">

                    <label
                    for="nameID"
                    className="form-label">
                      Numero telefonico
                    </label>

                    <input
                    type="number"
                    maxLength={12}
                    className="form-control"
                    id="nameID"
                    required
                    value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-4">

                    <label
                    for="nameID"
                    className="form-label">
                      Rut
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    required
                    value={rut} onChange={e => setRut(e.target.value)} />

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-5">

                    <label
                    for="validationCustom04"
                    className="form-label">
                      Ocupacion
                    </label>

                    <select
                    className="form-select"
                    id="validationCustom04"
                    required=""
                    value={occupation} onChange={e => setOccupation(e.target.value)}>
                      
                        <option
                        selected=""
                        disabled=""
                        value="">
                          Seleccione una opcion
                        </option>
                        <option>
                          Empresa
                        </option>
                        <option>
                          Estudiante o funcionario INACAP
                        </option>

                    </select>

                    <div
                    className="invalid-feedback">
                        Selecciona un estado válido.
                    </div>

                </div>

                <div
                  className="col-md-3">

                    <label
                    for="validationCustom04"
                    className="form-label">
                      Institucion
                    </label>

                    <select
                    className="form-select"
                    id="validationCustom04"
                    required=""
                    value={institution} onChange={e => setInstitution(e.target.value)}>

                        <option
                        selected=""
                        disabled=""
                        value="">
                          Seleccione una opcion
                        </option>
                        <option>
                          Instituto profesional
                        </option>

                        <option>
                          Centro de formacion tecnica (CFT)
                        </option>

                    </select>

                    <div
                    className="invalid-feedback">
                        Selecciona un estado válido.
                    </div>

                </div>

                <div
                  className="col-md-5">

                    <label
                    for="nameID"
                    className="form-label">
                      Nombre de la empresa
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    required
                    value={company} onChange={e => setCompanyName(e.target.value)}/>

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-9">

                    <label
                    for="nameID"
                    className="form-label">
                      Contraseña
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    minLength={8}
                    maxLength={30}
                    required
                    value={password} onChange={e => setPassword(e.target.value)}/>

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      Este campo es obligatorio!
                    </div>

                </div>

                <div
                  className="col-md-9">

                    <label
                    for="nameID"
                    className="form-label"
                    required
                    minLength={8}
                    maxLength={30}>
                      Repetir contraseña
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    required />

                    <div
                    className="valid-feedback"> 
                      Todo bien!
                    </div>

                    <div
                    className="invalid-feedback">
                      * La contraseña debe tener 8 caracteres como minimo
                    </div>

                </div>

                <button
                className="btn btn-success "
                type="submit">
                  Registrarse
                </button>

                <p
                className="text-center">
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

export default SignupForm